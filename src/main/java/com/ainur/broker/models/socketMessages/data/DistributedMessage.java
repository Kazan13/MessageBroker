package com.ainur.broker.models.socketMessages.data;
import java.util.Date;

public class DistributedMessage {
    private String senderName;
    private int senderId;
    private int channelId;
    private String message;
    private long date;

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String userName) {
        this.senderName = userName;
    }

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
