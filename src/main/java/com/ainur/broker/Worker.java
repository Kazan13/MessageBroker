package com.ainur.broker;

import com.ainur.broker.storages.MessagesStorage;
import com.ainur.broker.util.MessageType;
import com.ainur.broker.model.messages.CreateChannelMessage;
import com.ainur.broker.model.messages.Message;
import com.ainur.broker.model.messages.PublishMessage;
import com.ainur.broker.model.messages.SubscribeMessage;
import com.ainur.broker.model.responses.Token;
import com.ainur.broker.repository.MySQLRepository;
import com.google.gson.Gson;


public class Worker extends Thread {

    private Gson gson;
    private MySQLRepository mySQLRepository;


    public Worker(MySQLRepository mySQLRepository) {
        this.mySQLRepository = mySQLRepository;
        gson = new Gson();
    }


    /**
     *
     */
    @Override
    public void run() {
        while (true) {
            try {
                Message message = MessagesStorage.getMessagesStorage().takeMessage();
                switch (message.getCommand()) {
                    case MessageType.PUBLISH: {
                        publish(message);
                        break;
                    }

                    case MessageType.SUBSCRIBE: {
                        subscribe(message);
                        break;
                    }

                    case MessageType.CREATE_CHANNEL: {
                        createChannel(message);
                        break;
                    }
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void stopWorker() {

    }


    private void publish(Message message) {
        PublishMessage publishMessage = gson.fromJson(message.getData(), PublishMessage.class);
        mySQLRepository.addMessage(publishMessage);
    }

    private void subscribe(Message message) {
        SubscribeMessage subscribeMessage = gson.fromJson(message.getData(), SubscribeMessage.class);
        mySQLRepository.subscribe(subscribeMessage);
    }

    private void createChannel(Message message) {
        CreateChannelMessage createChannelMessage = gson.fromJson(message.getData(), CreateChannelMessage.class);
        Token token = new Token();
        token.setToken(message.getToken());
        mySQLRepository.createChannel(createChannelMessage, token);
    }
}
