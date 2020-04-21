package com.ainur.broker.models;

import java.util.ArrayList;

public class Channels {
    private ArrayList<Channel> channels = new ArrayList<>();

    public ArrayList<Channel> getChannels() {
        return channels;
    }

    public void addChannel(Channel channel) {
        this.channels.add(channel);
    }
}
