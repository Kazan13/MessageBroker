package com.ainur.broker;

import com.ainur.broker.models.messages.Message;
import com.ainur.broker.repository.MySQLRepository;
import com.ainur.broker.storages.MessagesStorage;
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
                mySQLRepository.publish(message);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void stopWorker() {

    }
}
