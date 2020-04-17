package com.ainur.broker.storages;


import org.java_websocket.WebSocket;

import java.util.concurrent.ConcurrentHashMap;


public class WebSocketsStorage {
    private ConcurrentHashMap<Integer, WebSocket> sockets;
    private static WebSocketsStorage webSocketsStorage;


    private WebSocketsStorage() {
        sockets = new ConcurrentHashMap<>();
    }

    public static WebSocketsStorage getWebSocketsStorage() {
        if (webSocketsStorage == null) {
            webSocketsStorage = new WebSocketsStorage();
        }
        return webSocketsStorage;
    }


    public boolean addSocket(int id, WebSocket socket) {
        if (sockets.containsKey(id))
            return false;
        sockets.put(id, socket);
        return true;
    }

    public WebSocket getSocket(int id) {
        return sockets.get(id);

    }

    public void removeSocket(int id) {
        sockets.remove(id);
    }

}
