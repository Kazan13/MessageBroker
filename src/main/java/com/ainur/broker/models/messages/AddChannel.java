package com.ainur.broker.models.messages;


public class AddChannel {
    private String token;
    private String channelName;

    public String getChannelName() {
        return channelName;
    }

    public String getToken() {
        return token;
    }
}
