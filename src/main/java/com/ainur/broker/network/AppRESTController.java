package com.ainur.broker.network;

import com.ainur.broker.models.message.data.User;
import com.ainur.broker.models.responses.Token;
import com.ainur.broker.repository.MySQLRepository;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"*"})
public class AppRESTController {
    @Autowired
    private MySQLRepository mySQLRepository;
    private Gson gson;
    private Logger log;

    @RequestMapping("/sign-in")
    @GetMapping(
            produces = {"application/json"}
    )
    @ResponseBody
    public ResponseEntity<Token> signIn(HttpServletRequest request, HttpServletResponse response) {
        gson = new Gson();
        log  = Logger.getLogger(AppRESTController.class.getName());
        try {
            User user = gson.fromJson(request.getReader(), User.class);
            log.info("sign in message from user: " + user.getUsername());
            Token token = this.mySQLRepository.signIn(user);
            return token.getToken() != null ? new ResponseEntity(token, HttpStatus.OK) : new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/sign-up")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity signUp(HttpServletRequest request) {
        gson = new Gson();
        log  = Logger.getLogger(AppRESTController.class.getName());
        try {
            User user = gson.fromJson(request.getReader(), User.class);
            log.info("sign up message from user:" + user.getUsername());
            return this.mySQLRepository.signUp(user) ? new ResponseEntity(HttpStatus.OK) : new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
