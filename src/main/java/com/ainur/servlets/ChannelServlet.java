package com.ainur.servlets;

import com.ainur.ResponseManager;
import com.ainur.SQLWorker;
import com.ainur.model.Channels;
import com.ainur.model.messages.Message;
import com.ainur.util.ErrorMessage;
import com.ainur.util.HttpStatus;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ChannelServlet extends HttpServlet {
    SQLWorker sqlWorker;
    Gson gson = new Gson();

    public ChannelServlet() {
        sqlWorker = new SQLWorker();
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        try {
            Channels channels = new Channels();
            channels.setArrayList(sqlWorker.getAllChannels());
            String jsonString = gson.toJson(channels, Channels.class);
            new ResponseManager(HttpStatus.OK, resp, jsonString);
        } catch (Exception e) {
            resp.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            ErrorMessage errorMessage = new ErrorMessage();
            errorMessage.setMessage(e.getMessage());
            resp.getWriter().println(errorMessage.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
