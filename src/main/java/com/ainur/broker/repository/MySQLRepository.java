package com.ainur.broker.repository;

import com.ainur.broker.storages.TokensStorage;
import com.ainur.broker.storages.WebSocketsStorage;
import com.ainur.broker.model.messages.CreateChannelMessage;
import com.ainur.broker.model.messages.PublishMessage;
import com.ainur.broker.model.messages.SubscribeMessage;
import com.ainur.broker.model.messages.User;
import com.ainur.broker.model.responses.Token;
import org.java_websocket.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.UUID;


@Repository
public class MySQLRepository {

    @Autowired
    DataSource dataSource;


    private static final String CREATE_DATABASE =
            "create database IF NOT EXISTS brokerdb;";


    private static final String USING_DATABASE =
            "use brokerdb;";


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


    private static final String ADD_USER = "insert into users " +
            "(username, password) values (?,?);";


    @PostConstruct
    public void init() {
        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();
            statement.executeUpdate(CREATE_DATABASE);
            statement.executeUpdate(USING_DATABASE);
            statement.executeUpdate(CREATE_USERS_TABLE);
            statement.executeUpdate(CREATE_CHANNELS_TABLE);
            statement.executeUpdate(CREATE_SUBSCRIPTIONS_TABLE);
            statement.executeUpdate(CREATE_MESSAGES_TABLE);


        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Token signIn(User user) {
        UUID uuid = UUID.randomUUID();
        Token token = new Token();
        if (isLoginPasswordValid(user)) {
            TokensStorage.getTokenStorage().addToken(uuid.toString(), getUserId(user.getUsername()));
            token.setToken(uuid.toString());
        }
        return token;
    }

    public boolean signUp(User user) {
        try (Connection connection = dataSource.getConnection()) {
            if (!isUserExists(user.getUsername())) {
                PreparedStatement preparedStatement = connection.prepareStatement(ADD_USER);
                preparedStatement.setString(1, user.getUsername());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.executeUpdate();
                return true;
            } else
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    public ArrayList<String> getAllChannels() {
        ArrayList<String> channels = new ArrayList<>();
        String sql = "select * from channels";

        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                channels.add(resultSet.getString(2));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return channels;
    }


    public boolean isUserExists(String username) {
        try (Connection connection = dataSource.getConnection()) {
            String sql = " select * from users where username = '" + username + "'";
            Statement statement;

            statement = connection.createStatement();
            statement.executeUpdate("use brokerdb");
            ResultSet resultSet = statement.executeQuery(sql);

            if (resultSet.next()) {
                return true;
            } else
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isLoginPasswordValid(User user) {
        try (Connection connection = dataSource.getConnection()) {
            String sql = "select * from users where username = '" + user.getUsername() + "'";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                if (resultSet.getString(2).equals(user.getUsername()) && resultSet.getString(3).equals(user.getPassword()))
                    if (resultSet.getString(2).equals(user.getUsername()) &&
                            resultSet.getString(3).equals(user.getPassword()))
                        return true;
                    else
                        return false;
            } else
                return false;
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }


    public String getUserId(String username) {
        try (Connection connection = dataSource.getConnection()) {
            String sql = "select * from users where username = '" + username + "'";
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


    public String getUserName(String sql) {
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


    public ArrayList<String> getSubscribersId(String sql) {
        try (Connection connection = dataSource.getConnection()) {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            ArrayList<String> subscribersId = new ArrayList<>();
            while (resultSet.next()) {
                subscribersId.add(resultSet.getString(1));
            }
            return subscribersId;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    public void addMessage(PublishMessage publishMessage) {


        try (Connection connection = dataSource.getConnection()) {
            String userId = TokensStorage.getTokenStorage().getUserId(publishMessage.getToken());
            WebSocket socket = WebSocketsStorage.getWebSocketsStorage().getSocket(userId);
            String sql = "select * from channels where channel = '" + publishMessage.getChannelName() + "'";

            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            int channelId;
            if (resultSet.next()) {
                channelId = Integer.parseInt(resultSet.getString(1));
                System.out.println(publishMessage.getDateString());
                sql = "insert into messages (sender_id, channel_id, sent_time, message) values ('"
                        + userId + "','"
                        + channelId + "','"
                        + publishMessage.getDateString() + "','"
                        + publishMessage.getMessage() + "');";
                preparedStatement.executeQuery(sql);
            } else {

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void subscribe(SubscribeMessage subscribeMessage) {
        String userId = TokensStorage.getTokenStorage().getUserId(subscribeMessage.getToken());
        try (Connection connection = dataSource.getConnection()) {
            WebSocket socket = WebSocketsStorage.getWebSocketsStorage().getSocket(userId);
            String sql = "select * from channels where channel = '" + subscribeMessage.getChannelName() + "'";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            int channelId;
            if (resultSet.next()) {
                channelId = Integer.parseInt(resultSet.getString(1));
                sql = "insert into subscriptions (subscriber_id, channel_id) values ('"
                        + TokensStorage.getTokenStorage().getUserId(subscribeMessage.getToken())
                        + "','" + channelId + "');";
                preparedStatement.executeQuery(sql);
            } else {

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public void createChannel(CreateChannelMessage createChannelMessage, Token token) {
        System.out.println("REPOSITORY CNCH");
        String userId = TokensStorage.getTokenStorage().getUserId(token.getToken());
        try (Connection connection = dataSource.getConnection()) {
            WebSocket socket = WebSocketsStorage.getWebSocketsStorage().getSocket(userId);
            String sql = "insert into channels (channel) values ('" + createChannelMessage.getChannelName() + "');";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();

            sql = "select * from channels where channel = '" + createChannelMessage.getChannelName() + "'";
            preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {

            } else {

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

