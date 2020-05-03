package com.ainur.broker.network;

import com.ainur.broker.models.messages.AddChannel;
import com.ainur.broker.models.messages.Subscribe;
import com.ainur.broker.models.User;
import com.ainur.broker.models.Token;
import com.ainur.broker.repository.MySQLRepository;
import com.google.gson.Gson;

import java.io.IOException;
import java.sql.SQLException;
import java.util.logging.Logger;
import javax.servlet.http.Cookie;
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


    /**
     * log in
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/sign-in")
    @GetMapping(
            produces = {"application/json"}
    )
    @ResponseBody
    public ResponseEntity signIn(HttpServletRequest request, HttpServletResponse response) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            User user = gson.fromJson(request.getReader(), User.class);
            log.info("AppRESTController.signIn() :" + user.getUsername());
            Token token = this.mySQLRepository.signIn(user);

            Cookie cookie = new Cookie("token", token.getToken());
            cookie.setMaxAge(10 * 60);
            cookie.setSecure(true);
            cookie.setPath("/");

            response.addCookie(cookie);
            return token.getToken() != null ?
                    new ResponseEntity(token, HttpStatus.OK) :
                    new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * sign up
     *
     * @param request
     * @return
     */
    @RequestMapping("/sign-up")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity signUp(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            User user = gson.fromJson(request.getReader(), User.class);
            log.info("AppRESTController.signUp() :" + user.getUsername());
            return this.mySQLRepository.signUp(user) ?
                    new ResponseEntity(HttpStatus.OK) :
                    new ResponseEntity(HttpStatus.UNAUTHORIZED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * get user channels
     *
     * @param request
     * @return
     */
    @RequestMapping("/get-user-channels")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity getUserChannels(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            Token token = gson.fromJson(request.getReader(), Token.class);
            log.info("AppRESTController.getUserChannels()");
            return new ResponseEntity(this.mySQLRepository.getUserChannels(token), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * add channel
     *
     * @param request
     * @return
     */
    @RequestMapping("/add-channel")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity addChannel(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            AddChannel addChannel = gson.fromJson(request.getReader(), AddChannel.class);
            log.info("AppRESTController.addChannel()");
            if (this.mySQLRepository.createChannel(addChannel)) {
                return new ResponseEntity(HttpStatus.OK);
            } else
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * subscribe to channel
     *
     * @param request
     * @return
     */
    @RequestMapping("/subscribe")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity subscribe(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            Subscribe subscribe = gson.fromJson(request.getReader(), Subscribe.class);
            log.info("AppRESTController.subscribe()");
            if (this.mySQLRepository.subscribe(subscribe)) {
                return new ResponseEntity(HttpStatus.OK);
            } else
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * is token valid
     *
     * @param request
     * @return
     */
    @RequestMapping("/is-token-valid")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity isTokenValid(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            Token token = gson.fromJson(request.getReader(), Token.class);
            log.info("AppRESTController.isTokenValid()");
            if (this.mySQLRepository.isTokenValid(token)) {
                return new ResponseEntity(HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * log out
     *
     * @param request
     * @return
     */
    @RequestMapping("/log-out")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity logOut(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            Token token = gson.fromJson(request.getReader(), Token.class);
            log.info("AppRESTController.logOut()");
            if (this.mySQLRepository.logOut(token)) {
                return new ResponseEntity(HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Get all channels
     *
     * @param request
     * @return
     */
    @RequestMapping("/get-all-channels")
    @PostMapping(produces = {"application/json"})
    @ResponseBody
    public ResponseEntity getAllChannels(HttpServletRequest request) {
        gson = new Gson();
        log = Logger.getLogger(AppRESTController.class.getName());
        try {
            Token token = gson.fromJson(request.getReader(), Token.class);
            log.info("AppRESTController.getAllChannels()");
            return new ResponseEntity(this.mySQLRepository.getAllChannels(token), HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
