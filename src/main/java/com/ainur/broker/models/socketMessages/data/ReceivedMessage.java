package com.ainur.broker.models.socketMessages.data;

import java.util.Date;

public class ReceivedMessage {
    private int channelId;
    private String message;
    private long date;
    private String token;

    public int getChannelId() {
        return channelId;
    }

    public void setChannelId(int channelId) {
        this.channelId = channelId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return new Date(this.date);
    }

    public void setDate(long date) {
        this.date = date;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
