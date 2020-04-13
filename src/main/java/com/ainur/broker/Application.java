package com.ainur.broker;
import com.ainur.broker.network.WSServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        WSServer wsServer = new WSServer();
        wsServer.start();
    }

}