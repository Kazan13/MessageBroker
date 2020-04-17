package com.ainur.broker;


import com.ainur.broker.storages.TokensStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.logging.Logger;


@Component
public class WorkersStarter {
    private ArrayList<Worker> workers = new ArrayList<>();

    public WorkersStarter() {
        TokensStorage.getTokenStorage();
    }

    @PostConstruct
    public void init() {
        startWorkers();
    }

    @Autowired
    WorkerFactory workerFactory;

    public void startWorkers() {
        for (int i = 0; i < 10; i++) {
            Worker worker = workerFactory.getWorker();
            workers.add(worker);
            worker.start();
        }
    }

    public void stopWorkers() {
        for (Worker worker : workers) {
            worker.stopWorker();
        }
    }
}