package com.ainur.broker;

import com.ainur.broker.models.socketMessages.data.DistributedMessage;
import com.ainur.broker.models.socketMessages.data.ReceivedMessage;
import com.ainur.broker.models.socketMessages.Message;
import com.ainur.broker.repository.MySQLRepository;
import com.ainur.broker.storages.MessagesStorage;
import com.ainur.broker.storages.TokensStorage;
import com.ainur.broker.storages.WebSocketsStorage;
import com.ainur.broker.util.MessageTypes;
import com.google.gson.Gson;

import java.util.ArrayList;


public class Worker extends Thread {
    private MySQLRepository mySQLRepository;

    public Worker(MySQLRepository mySQLRepository) {
        this.mySQLRepository = mySQLRepository;
    }

    @Override
    public void run() {
        while (true) {
            try {
                ReceivedMessage receivedMessage = MessagesStorage.getMessagesStorage().takeMessage();
                mySQLRepository.publish(receivedMessage);
                sendMessage(receivedMessage, mySQLRepository.getSubscribers(receivedMessage.getChannelId()));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void sendMessage(ReceivedMessage receivedMessage, ArrayList<Integer> subscribers) {
        Gson gson = new Gson();

        for (int subscriber : subscribers) {
            if (WebSocketsStorage.getWebSocketsStorage().getSocket(subscriber) != null && WebSocketsStorage.getWebSocketsStorage().getSocket(subscriber).isOpen()) {
                WebSocketsStorage.getWebSocketsStorage().getSocket(subscriber).send(gson.toJson(createMessage(receivedMessage)));
            }
        }
    }

    private Message createMessage(ReceivedMessage receivedMessage) {
        Gson gson = new Gson();

        Message message = new Message();
        message.setType(MessageTypes.NEW_MESSAGE);
        message.setData(gson.toJson(createDistributedMessage(receivedMessage), DistributedMessage.class));

        return message;
    }

    private DistributedMessage createDistributedMessage(ReceivedMessage receivedMessage) {
        int userId = TokensStorage.getTokenStorage().getUserId(receivedMessage.getToken());
        String senderName = mySQLRepository.getUserName(userId);

        DistributedMessage distributedMessage = new DistributedMessage();
        distributedMessage.setChannelId(receivedMessage.getChannelId());
        distributedMessage.setDate(receivedMessage.getDate().getTime());
        distributedMessage.setMessage(receivedMessage.getMessage());
        distributedMessage.setSenderId(userId);
        distributedMessage.setSenderName(senderName);

        return distributedMessage;
    }


    public void stopWorker() {

    }
}
