package com.ainur.broker;

import com.ainur.broker.models.Message;
import com.ainur.broker.models.messages.Publish;
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
}
