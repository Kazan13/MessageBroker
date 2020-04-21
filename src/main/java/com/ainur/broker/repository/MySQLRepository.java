package com.ainur.broker.repository;

import com.ainur.broker.models.Channel;
import com.ainur.broker.models.Channels;
import com.ainur.broker.storages.TokensStorage;
import com.ainur.broker.storages.WebSocketsStorage;
import com.ainur.broker.models.messages.AddChannel;
import com.ainur.broker.models.messages.Publish;
import com.ainur.broker.models.messages.Subscribe;
import com.ainur.broker.models.User;
import com.ainur.broker.models.Token;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.UUID;
import java.util.logging.Logger;


@Repository
public class MySQLRepository {

    @Autowired
    private DataSource dataSource;

    private static final String CREATE_USERS_TABLE =
            "CREATE TABLE if not exists users " +
                    "(id int AUTO_INCREMENT not null PRIMARY KEY, " +
                    "username varchar (30) not null, " +
                    "password varchar (30) not null);";
    private static final String CREATE_CHANNELS_TABLE =
            "CREATE TABLE if not exists channels " +
                    "(id int AUTO_INCREMENT not null PRIMARY KEY," +
                    "channel varchar (30) not null);";
    private static final String CREATE_SUBSCRIPTIONS_TABLE =
            "CREATE TABLE if not exists subscriptions " +
                    "(subscriber_id int not null," +
                    "channel_id int not null," +
                    "FOREIGN KEY (subscriber_id) REFERENCES users(id), " +
                    "FOREIGN KEY (channel_id) REFERENCES channels(id) );";
    private static final String CREATE_MESSAGES_TABLE =
            "CREATE TABLE if not exists messages " +
                    "(id int AUTO_INCREMENT NOT NULL  PRIMARY KEY," +
                    "sent_time datetime not null," +
                    "message TEXT not null," +
                    "sender_id int not null," +
                    "channel_id int not null," +
                    "FOREIGN KEY (sender_id) REFERENCES users(id), " +
                    "FOREIGN KEY (channel_id) REFERENCES channels(id) );";
    private static final String INSERT_USER = "insert into users " +
            "(username, password) values (?,?);";
    private static final String GET_ALL_CHANNELS =
            "select * from subscriptions where subscriber_id = ?";
    private static final String GET_USER =
            " select * from users where username = ?";
    private static final String INSERT_CHANNEL =
            "insert into channels (channel) values (?);";
    private static final String INSERT_SUBSCRIPTION =
            "insert into subscriptions (subscriber_id, channel_id) values (?, ?)";
    private static final String GET_CHANNEL_NAME =
            "select * from channels where channel = ? ";
    private static final String GET_CHANNEL_BY_ID =
            "select * from channels where id = ? ";
    private static final String INSERT_MESSAGE =
            "insert into messages (sender_id, channel_id, sent_time, message) values (?, ?, ?, ?)";


    @PostConstruct
    public void init() {
        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();
            statement.executeUpdate(CREATE_USERS_TABLE);
            statement.executeUpdate(CREATE_CHANNELS_TABLE);
            statement.executeUpdate(CREATE_SUBSCRIPTIONS_TABLE);
            statement.executeUpdate(CREATE_MESSAGES_TABLE);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Token signIn(User user) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        UUID uuid = UUID.randomUUID();
        Token token = new Token();
        if (isLoginPasswordValid(user)) {
            log.info("Sign In: " + user.getUsername());
            TokensStorage.getTokenStorage().addToken(uuid.toString(), getUserId(user));
            token.setToken(uuid.toString());
        }
        return token;
    }

    public boolean signUp(User user) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            if (!isUserExists(user)) {
                PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USER);
                preparedStatement.setString(1, user.getUsername());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.executeUpdate();
                log.info("Sign Up: " + user.getUsername());
                return true;
            } else
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Channels getAllChannels(Token token) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        int userId = TokensStorage.getTokenStorage().getUserId(token.getToken());
        Channels channels = new Channels();
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(GET_ALL_CHANNELS);
            preparedStatement.setInt(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                preparedStatement = connection.prepareStatement(GET_CHANNEL_BY_ID);
                preparedStatement.setInt(1, resultSet.getInt(1));
                resultSet = preparedStatement.executeQuery();
                if (resultSet.next()) {
                    Channel channel = new Channel();
                    channel.setChannelName(resultSet.getString(2));
                    channel.setId(resultSet.getInt(1));
                    channels.addChannel(channel);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return channels;
    }

    public boolean isUserExists(User user) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER);
            preparedStatement.setString(1, user.getUsername());
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isChannelExists(String channelName) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_NAME);
            preparedStatement.setString(1, channelName);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isLoginPasswordValid(User user) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
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
        }
    }

    public int getUserId(User user) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(GET_USER);
            preparedStatement.setString(1, user.getUsername());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getInt(1);
            return 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    public String getUserName(String sql) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getString(1);
            else
                return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getChannelId(String sql) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next())
                return resultSet.getString(1);
            else
                return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<Integer> getSubscribersId(String sql) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            ArrayList<Integer> subscribersId = new ArrayList<>();
            while (resultSet.next()) {
                subscribersId.add(resultSet.getInt(1));
            }
            return subscribersId;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void publish(Publish publish) {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        Gson gson = new Gson();
        int userId = TokensStorage.getTokenStorage().getUserId(publish.getToken());
        WebSocket socket = WebSocketsStorage.getWebSocketsStorage().getSocket(userId);
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_NAME);
            preparedStatement.setString(1, publish.getChannelName());
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int channelId = Integer.parseInt(resultSet.getString(1));
                preparedStatement = connection.prepareStatement(INSERT_MESSAGE);
                preparedStatement.setInt(1, userId);
                preparedStatement.setInt(2, channelId);
                preparedStatement.setString(3, publish.getDateString());
                preparedStatement.setString(4, publish.getMessage());
                preparedStatement.executeUpdate();
                socket.send(gson.toJson(HttpStatus.OK));
            } else {
                socket.send(gson.toJson(HttpStatus.CONFLICT));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean subscribe(Subscribe subscribe) throws SQLException {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        int userId = TokensStorage.getTokenStorage().getUserId(subscribe.getToken());
        Connection connection = dataSource.getConnection();
        PreparedStatement preparedStatement = connection.prepareStatement(GET_CHANNEL_NAME);
        preparedStatement.setString(1, subscribe.getChannelName());
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
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

    public boolean createChannel(AddChannel addChannel) throws SQLException {
        Logger log = Logger.getLogger(MySQLRepository.class.getName());
        Gson gson = new Gson();
        int userId = TokensStorage.getTokenStorage().getUserId(addChannel.getToken());
        Connection connection = dataSource.getConnection();
        if (!isChannelExists(addChannel.getChannelName())) {
            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_CHANNEL);
            preparedStatement.setString(1, addChannel.getChannelName());
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

