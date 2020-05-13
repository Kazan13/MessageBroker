package com.ainur.broker.models.socketMessages;
import java.util.Date;

public class DistributedMessage {
    private int senderId;
    private int channelId;
    private String message;
    private long date;

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

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
}
