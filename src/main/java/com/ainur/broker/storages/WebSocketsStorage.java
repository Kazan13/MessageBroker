package com.ainur.broker.storages;

import org.java_websocket.WebSocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketsStorage {
    private Map<Integer, WebSocket> sockets;
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


    public void addSocket(int id, WebSocket socket) {
        sockets.put(id, socket);
    }

    public WebSocket getSocket(int id) {
        return sockets.get(id);
    }

    public void removeSocket(int id) {
        sockets.remove(id);
    }

}
