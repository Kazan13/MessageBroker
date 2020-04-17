package com.ainur;

import com.ainur.models.message.data.MessagePocket;
import com.ainur.models.message.data.Publish;
import com.ainur.repository.MySQLRepository;
import com.ainur.storages.TokensStorage;
import com.ainur.storages.WebSocketsStorage;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class MessageBroker {
    Publish message;
    @Autowired
    MySQLRepository mySQLRepository;
    Gson gson;

    public MessageBroker(Publish message) {
        this.message = message;
        gson = new Gson();
    }

    private void SendMessage() {
        MessagePocket messagePocket = new MessagePocket();
        String sqlString = "select * from users where id = '" + TokensStorage.getTokenStorage().getUserId(message.getToken()) + "'";

        messagePocket.setSender(mySQLRepository.getUserName(sqlString));
        messagePocket.setChannelName(message.getChannelName());
        messagePocket.setMessage(message.getMessage());
        messagePocket.setSendDateString(message.getDateString());
        String jsonString = gson.toJson(messagePocket, MessagePocket.class);


        sqlString = "select * from channels where channel = '" + message.getChannelName() + "'";

        sqlString = "select * from subscriptions where channel_id = '" + mySQLRepository.getChannelId(sqlString) + "'";
        ArrayList<Integer> subscribersId = mySQLRepository.getSubscribersId(sqlString);
        for (int id : subscribersId) {
            WebSocketsStorage.getWebSocketsStorage().getSocket(id).send(jsonString);
        }
    }
}
