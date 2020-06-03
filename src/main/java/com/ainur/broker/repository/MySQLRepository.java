package com.ainur.broker.repository;

import com.ainur.broker.models.*;
import com.ainur.broker.models.socketMessages.data.DistributedMessage;
import com.ainur.broker.models.socketMessages.data.ReceivedMessage;
import com.ainur.broker.storages.TokensStorage;
import com.ainur.broker.storages.WebSocketsStorage;
import com.ainur.broker.models.httpRequests.AddChannel;
import com.ainur.broker.models.httpRequests.Subscribe;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;
import java.util.logging.Logger;


@Repository
public class MySQLRepository {

    @Autowired
    private DataSource dataSource;
    private static final Logger log = Logger.getLogger(MySQLRepository.class.getName());

    private static final String CREATE_USERS_TABLE =
            "CREATE TABLE if not exists users " +
                    "(id int AUTO_INCREMENT not null PRIMARY KEY, " +
                    "username varchar (30) not null, " +
                    "password varchar (30) not null);";
    private static final String CREATE_CHANNELS_TABLE =
            "CREATE TABLE if not exists channels " +
                    "(id int AUTO_INCREMENT not null PRIMARY KEY," +
                    "channel varchar (30) not null," +
                    "admin_id int not null," +
                    "FOREIGN KEY (admin_id) REFERENCES users(id) );";
    private static final String CREATE_SUBSCRIPTIONS_TABLE =
            "CREATE TABLE if not exists subscriptions " +
                    "(subscriber_id int not null," +
                    "channel_id int not null," +
                    "FOREIGN KEY (subscriber_id) REFERENCES users(id), " +
                    "FOREIGN KEY (channel_id) REFERENCES channels(id) );";
    private static final String CREATE_MESSAGES_TABLE =
            "CREATE TABLE if not exists messages " +
                    "(id int AUTO_INCREMENT NOT NULL  PRIMARY KEY," +
                    "sent_time timestamp not null," +
                    "message TEXT not null," +
                    "sender_id int not null," +
                    "channel_id int not null," +
                    "FOREIGN KEY (sender_id) REFERENCES users(id), " +
                    "FOREIGN KEY (channel_id) REFERENCES channels(id) );";

    private static final String INSERT_USER =
            "insert into users (username, password) values (?,?);";
    private static final String INSERT_CHANNEL =
            "insert into channels (channel, admin_id) values (?, ?);";
    private static final String INSERT_SUBSCRIPTION =
            "insert into subscriptions (subscriber_id, channel_id) values (?, ?)";
    private static final String INSERT_MESSAGE =
            "insert into messages (sender_id, channel_id, sent_time, message) values (?, ?, ?, ?)";

    private static final String GET_USER_CHANNELS =
            "select * from subscriptions where subscriber_id = ?";
    private static final String GET_ALL_CHANNELS =
            "select * from channels";
    private static final String GET_USER =
            "select * from users where username = ?";
    private static final String GET_USER_NAME_BY_ID =
            "select * from users where id = ?";
    private static final String GET_CHANNEL_NAME =
            "select * from channels where channel = ? ";
    private static final String GET_CHANNEL_BY_ID =
            "select * from channels where id = ? ";
    private static final String GET_SUBSCRIBER =
            "select * from subscriptions where channel_id = ? and subscriber_id = ?";
    private static final String GET_SUBSCRIBERS =
            "select * from subscriptions where channel_id = ?";
    private static final String GET_MESSAGES =
            "select * from messages where channel_id = ?";


    @PostConstruct
    public void init()  {
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            Statement statement = connection.createStatement();
            statement.executeUpdate(CREATE_USERS_TABLE);
            statement.executeUpdate(CREATE_CHANNELS_TABLE);
            statement.executeUpdate(CREATE_SUBSCRIPTIONS_TABLE);
            statement.executeUpdate(CREATE_MESSAGES_TABLE);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean isTokenValid(Token token) {
        return TokensStorage.getTokenStorage().isTokenValid(token.getToken());
    }

    public HashMap<Integer, ArrayList<DistributedMessage>> getMessages(Token token) {
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            Channels channels = getUserChannels(token);
            HashMap <Integer, ArrayList<DistributedMessage>> messagesMap = new HashMap<>();

            for (Channel channel : channels.getChannels()) {
                PreparedStatement statement = connection.prepareStatement(GET_MESSAGES);
                statement.setInt(1, channel.getId());
                ResultSet resultSet = statement.executeQuery();
                Messages messages = new Messages();
                while(resultSet.next()) {
                    DistributedMessage message = new DistributedMessage();
                    message.setSenderName(getUserName(resultSet.getInt(4)));
                    message.setDate(resultSet.getTimestamp(2).getTime());
                    message.setMessage(resultSet.getString(3));
                    message.setSenderId(resultSet.getInt(4));
                    message.setChannelId(resultSet.getInt(5));
                    messages.addMessage(message);
                }
                messagesMap.put(channel.getId(), messages.getMessages());
            }
            return messagesMap;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
        finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public Token signIn(User user) {
         
        UUID uuid = UUID.randomUUID();
        Token token = new Token();
        if (isLoginPasswordValid(user)) {
            log.info("MySQLRepository.signIn(): username:" + user.getUsername());
            TokensStorage.getTokenStorage().addToken(uuid.toString(), getUserId(user));
            token.setToken(uuid.toString());
        }
        return token;
    }

    public boolean signUp(User user) {

        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            if (!isUserExists(user)) {
                PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USER);
                preparedStatement.setString(1, user.getUsername());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.executeUpdate();
                log.info("MySQLRepository.signUp(): username: " + user.getUsername());
                return true;
            } else
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean logOut(Token token) {
         
        log.info("MySQLRepository.logOut(): userId:"
                + TokensStorage.getTokenStorage().getUserId(token.getToken()));
        if (isTokenValid(token)) {
            int userId = TokensStorage.getTokenStorage().getUserId(token.getToken());

            TokensStorage.getTokenStorage().removeToken(token.getToken());
            WebSocketsStorage.getWebSocketsStorage().removeSocket(userId);
        }
        return true;
    }

    public Channels getUserChannels(Token token) {
         
        int userId = TokensStorage.getTokenStorage().getUserId(token.getToken());
        log.info("MySQLRepository.getUserChannels(): userId:" + userId);
        Channels channels = new Channels();
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER_CHANNELS);
            preparedStatement.setInt(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                preparedStatement = connection.prepareStatement(GET_CHANNEL_BY_ID);
                preparedStatement.setInt(1, resultSet.getInt(2));
                ResultSet result = preparedStatement.executeQuery();
                if (result.next()) {
                    Channel channel = new Channel();
                    channel.setChannelName(result.getString(2));
                    channel.setId(result.getInt(1));
                    channels.addChannel(channel);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return channels;
    }


    public Channels getAllChannels(Token token) {
        Channels channels = new Channels();
        log.info("MySQLRepository.getAllChannels(): userId:" + TokensStorage.getTokenStorage().getUserId(token.getToken()));
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_ALL_CHANNELS);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Channel channel = new Channel();
                channel.setChannelName(resultSet.getString(2));
                channel.setId(resultSet.getInt(1));
                channels.addChannel(channel);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return channels;
    }

    public boolean isUserExists(User user) {
         
        log.info("MySQLRepository.isUserExists(): userName:" + user.getUsername());
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER);
            preparedStatement.setString(1, user.getUsername());
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean isChannelExists(String channelName) {
         
        log.info("MySQLRepository.isChannelExists()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_NAME);
            preparedStatement.setString(1, channelName);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean isLoginPasswordValid(User user) {
         
        log.info("MySQLRepository.isLoginPasswordValid()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER);
            preparedStatement.setString(1, user.getUsername());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getString(2).equals(user.getUsername()) &&
                        resultSet.getString(3).equals(user.getPassword());
            } else
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public int getUserId(User user) {
         
        log.info("MySQLRepository.getUserId()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER);
            preparedStatement.setString(1, user.getUsername());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getInt(1);
            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public String getUserName(int id) {
         
        log.info("MySQLRepository.getUserName()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER_NAME_BY_ID);
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getString(2);
            else
                return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public String getChannelId(String sql) {
         
        log.info("MySQLRepository.getChannelId()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getString(1);
            else
                return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public ArrayList<Integer> getSubscribers(int channelId) {
         
        log.info("MySQLRepository.getSubscribersId()");
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_SUBSCRIBERS);
            preparedStatement.setInt(1, channelId);
            ResultSet resultSet = preparedStatement.executeQuery();
            ArrayList<Integer> subscribers = new ArrayList<>();
            while (resultSet.next()) {
                subscribers.add(resultSet.getInt(1));
            }
            return subscribers;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void publish(ReceivedMessage receivedMessage) {
         
        log.info("MySQLRepository.publish()");
        java.sql.Timestamp date = new java.sql.Timestamp(receivedMessage.getDate().getTime());
        Gson gson = new Gson();
        int userId = TokensStorage.getTokenStorage().getUserId(receivedMessage.getToken());
        WebSocket socket = WebSocketsStorage.getWebSocketsStorage().getSocket(userId);
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_BY_ID);
            preparedStatement.setInt(1, receivedMessage.getChannelId());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int channelId = Integer.parseInt(resultSet.getString(1));
                preparedStatement = connection.prepareStatement(INSERT_MESSAGE);
                preparedStatement.setInt(1, userId);
                preparedStatement.setInt(2, channelId);
                preparedStatement.setTimestamp(3, date, java.util.Calendar.getInstance());
                preparedStatement.setString(4, receivedMessage.getMessage());
                preparedStatement.executeUpdate();
                socket.send(gson.toJson(HttpStatus.OK));
            } else {
                socket.send(gson.toJson(HttpStatus.CONFLICT));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if(connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public boolean subscribe(Subscribe subscribe) throws SQLException {
        log.info("MySQLRepository.subscribe()");
        int userId = TokensStorage.getTokenStorage().getUserId(subscribe.getToken());

        Connection connection = dataSource.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_BY_ID);
        preparedStatement.setString(1, subscribe.getChannelId());
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next() && !isUserSubscribedToChannel(userId, Integer.parseInt(subscribe.getChannelId()))) {
            int channelId = Integer.parseInt(resultSet.getString(1));
            preparedStatement = connection.prepareStatement(INSERT_SUBSCRIPTION);
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, channelId);
            preparedStatement.executeUpdate();
            return true;
        } else {
            return false;
        }
    }

    public boolean isUserSubscribedToChannel(int userId, int channelId) throws SQLException {
            Connection connection = dataSource.getConnection();
            PreparedStatement statement = connection.prepareStatement(GET_SUBSCRIBER);
            statement.setInt(1, channelId);
            statement.setInt(2, userId);
            ResultSet resultSet = statement.executeQuery();
            if(resultSet.next()) {
                    return true;
            }
            return false;
    }

    public boolean createChannel(AddChannel addChannel) throws SQLException {
        log.info("MySQLRepository.createChannel()");
        Gson gson = new Gson();
        int userId = TokensStorage.getTokenStorage().getUserId(addChannel.getToken());
        Connection connection = dataSource.getConnection();
        if (!isChannelExists(addChannel.getChannelName())) {
            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_CHANNEL);
            preparedStatement.setString(1, addChannel.getChannelName());
            preparedStatement.setInt(2, userId);
            preparedStatement.executeUpdate();
            preparedStatement = connection.prepareStatement(GET_CHANNEL_NAME);
            preparedStatement.setString(1, addChannel.getChannelName());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int channelId = Integer.parseInt(resultSet.getString(1));
                preparedStatement = connection.prepareStatement(INSERT_SUBSCRIPTION);
                preparedStatement.setInt(1, userId);
                preparedStatement.setInt(2, channelId);
                preparedStatement.executeUpdate();
            }
            return true;
        } else {
            return false;
        }
    }
}

