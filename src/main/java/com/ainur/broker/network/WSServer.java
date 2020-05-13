package com.ainur.broker.network;

import com.ainur.broker.models.Token;
import com.ainur.broker.models.socketMessages.Message;
import com.ainur.broker.models.socketMessages.Pocket;
import com.ainur.broker.storages.MessagesStorage;
import com.ainur.broker.storages.TokensStorage;
import com.ainur.broker.storages.WebSocketsStorage;
import com.ainur.broker.util.MessageTypes;
import com.google.gson.Gson;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.springframework.http.HttpStatus;

import java.net.InetSocketAddress;
import java.util.logging.Logger;


public class WSServer {
    private Logger log;
    private Gson gson;
    private final String HOST = "localhost";
    private final int PORT = 8090;
    public WSServer() {
        TokensStorage.getTokenStorage();
        this.log  = Logger.getLogger(WSServer.class.getName());
        gson = new Gson();
    }

    public void start() {
        log.info("Сокет сервер запущен");
        try {
            WebSocketServer webSocketServer = new WebSocketServer(new InetSocketAddress(HOST, PORT)) {
                @Override
                public void onOpen(WebSocket conn, ClientHandshake handshake) {
                    log.info("Connection opened: "	+ conn.getRemoteSocketAddress());
                }

                @Override
                public void onClose(WebSocket conn, int code, String reason, boolean remote) {
                    log.info("Connection closed: " + conn.getRemoteSocketAddress());
                }

                @Override
                public void onMessage(WebSocket conn, String message) {
                    Pocket pocket = gson.fromJson(message, Pocket.class);
                    log.info("received message from "	+ conn.getRemoteSocketAddress());
                    sortMessage(pocket, conn);
                }
                @Override
                public void onError(WebSocket conn, Exception ex) {
                    log.info("Ошибка: " + ex);
                }
            };
            webSocketServer.run();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sortMessage (Pocket pocket, WebSocket conn) {
        Gson gson = new Gson();
        switch (pocket.getType()) {
            case MessageTypes.AUTH: {
                Token token = gson.fromJson(pocket.getData(), Token.class);
                WebSocketsStorage.getWebSocketsStorage().addSocket(
                        TokensStorage.getTokenStorage().getUserId(token.getToken()) , conn);
                break;
            }
            case MessageTypes.PUBLISH: {
                Message message = gson.fromJson(pocket.getData(), Message.class);
                addMessage(message, conn);
                break;
            }
        }
    }

    private void addMessage(Message message, WebSocket socket) {
        log.info("WSServer().addMessage()");
        if (message.getToken() != null && TokensStorage.getTokenStorage().isTokenValid(message.getToken())) {
            MessagesStorage.getMessagesStorage().addMessage(message);
            socket.send(gson.toJson(HttpStatus.OK));
        } else {
            socket.send(gson.toJson(HttpStatus.CONFLICT));
        }
    }
}
