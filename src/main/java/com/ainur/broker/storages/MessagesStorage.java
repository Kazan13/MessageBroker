package com.ainur.broker.storages;

import com.ainur.broker.models.socketMessages.data.ReceivedMessage;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class MessagesStorage {
    private BlockingQueue<ReceivedMessage> receivedMessages;
    private static MessagesStorage messagesStorage;

    private MessagesStorage() {
        receivedMessages = new ArrayBlockingQueue<>(1024);
    }

    public ReceivedMessage takeMessage() throws InterruptedException {
        return receivedMessages.take();
    }

    public void addMessage(ReceivedMessage receivedMessage) {
        receivedMessages.add(receivedMessage);
    }

    public BlockingQueue<ReceivedMessage> getReceivedMessages() {
        return receivedMessages;
    }

    public static MessagesStorage getMessagesStorage() {
        if (messagesStorage == null)
            messagesStorage = new MessagesStorage();
        return messagesStorage;
    }

}
