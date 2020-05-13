package com.ainur.broker.models;

import com.ainur.broker.models.socketMessages.DistributedMessage;

import java.util.ArrayList;

public class Messages {
    private ArrayList<DistributedMessage> messages = new ArrayList<>();

    public ArrayList<DistributedMessage> getMessages() {
        return messages;
    }

    public void addMessage(DistributedMessage message) {
        messages.add(message);
    }
}
