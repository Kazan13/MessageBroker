//package com.ainur.broker;
//
//import com.ainur.broker.models.messages.Message;
//import com.ainur.broker.repository.MySQLRepository;
//import com.ainur.broker.storages.TokensStorage;
//import com.ainur.broker.storages.WebSocketsStorage;
//import com.google.gson.Gson;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.ArrayList;
//
//public class MessageBroker {
//    Publish message;
//    @Autowired
//    MySQLRepository mySQLRepository;
//    Gson gson;
//
//    public MessageBroker(Publish message) {
//        this.message = message;
//        gson = new Gson();
//    }
//
//    private void SendMessage() {
//        Message messagePocket = new Message();
//        String sqlString = "select * from users where id = '" + TokensStorage.getTokenStorage().getUserId(message.getToken()) + "'";
//
//        messagePocket.setSender(mySQLRepository.getUserName(sqlString));
//        messagePocket.setChannelId(message.getChannelName());
//        messagePocket.setMessage(message.getMessage());
//        messagePocket.setSendDateString(message.getDateString());
//        String jsonString = gson.toJson(messagePocket, Message.class);
//
//
//        sqlString = "select * from channels where channel = '" + message.getChannelName() + "'";
//
//        sqlString = "select * from subscriptions where channel_id = '" + mySQLRepository.getChannelId(sqlString) + "'";
//        ArrayList<Integer> subscribersId = mySQLRepository.getSubscribersId(sqlString);
//        for (int id : subscribersId) {
//            WebSocketsStorage.getWebSocketsStorage().getSocket(id).send(jsonString);
//        }
//    }
//}
