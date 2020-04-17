package com.ainur.broker;

import com.ainur.broker.models.message.data.CreateChannel;
import com.ainur.broker.models.message.Message;
import com.ainur.broker.models.message.data.Publish;
import com.ainur.broker.models.message.data.Subscribe;
import com.ainur.broker.models.responses.Token;
import com.ainur.broker.repository.MySQLRepository;
import com.ainur.broker.storages.MessagesStorage;
import com.ainur.broker.util.MessageType;
import com.google.gson.Gson;


public class Worker extends Thread {
    private Gson gson;
    private MySQLRepository mySQLRepository;

    public Worker(MySQLRepository mySQLRepository) {
        this.mySQLRepository = mySQLRepository;
        gson = new Gson();
    }

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
                    case MessageType.GET_CHANNELS: {
                        getChannels(message);
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
        Publish publish = gson.fromJson(message.getData(), Publish.class);
        mySQLRepository.publish(publish);
    }

    private void subscribe(Message message) {
        Subscribe subscribe = gson.fromJson(message.getData(), Subscribe.class);
        mySQLRepository.subscribe(subscribe);
    }

    private void createChannel(Message message) {
        CreateChannel createChannel = gson.fromJson(message.getData(), CreateChannel.class);
        Token token = new Token();
        token.setToken(message.getToken());
        mySQLRepository.createChannel(createChannel, token);
    }

    private void getChannels(Message message) {
        mySQLRepository.getAllChannels(message.getToken());
    }
}
