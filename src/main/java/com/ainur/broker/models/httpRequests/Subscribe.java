package com.ainur.broker.models.httpRequests;


public class Subscribe {
    private String token;
    private int channelId;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public int getChannelId() {
        return channelId;
    }

    public void setChannelId(int channelId) {
        this.channelId = channelId;
    }
}
