package com.ainur.broker;

import com.ainur.broker.models.socketMessages.DistributedMessage;
import com.ainur.broker.models.socketMessages.Message;
import com.ainur.broker.models.socketMessages.Pocket;
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
                Message message = MessagesStorage.getMessagesStorage().takeMessage();
                mySQLRepository.publish(message);
                sendMessage(message, mySQLRepository.getSubscribers(message.getChannelId()));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private void sendMessage(Message message, ArrayList<Integer> subscribers) {
        Gson gson = new Gson();

        for (int subscriber : subscribers) {
            if (WebSocketsStorage.getWebSocketsStorage().getSocket(subscriber) != null) {
                WebSocketsStorage.getWebSocketsStorage().getSocket(subscriber).send(gson.toJson(createPocket(message)));
            }
        }
    }

    private Pocket createPocket(Message message) {
        Gson gson = new Gson();

        Pocket pocket = new Pocket();
        pocket.setType(MessageTypes.NEW_MESSAGE);
        pocket.setData(gson.toJson(createDistributedMessage(message), DistributedMessage.class));

        return pocket;
    }

    private DistributedMessage createDistributedMessage(Message message) {
        int userId = TokensStorage.getTokenStorage().getUserId(message.getToken());

        DistributedMessage distributedMessage = new DistributedMessage();
        distributedMessage.setChannelId(message.getChannelId());
        distributedMessage.setDate(message.getDate().getTime());
        distributedMessage.setMessage(message.getMessage());
        distributedMessage.setSenderId(userId);

        return distributedMessage;
    }


    public void stopWorker() {

    }
}
