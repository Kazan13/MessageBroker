package com.ainur.broker.storages;

import java.util.concurrent.ConcurrentHashMap;

public class TokensStorage {
    private ConcurrentHashMap<String, Integer> tokens;
    private static TokensStorage tokensStorage;
    private TokensStorage() {
        tokens = new ConcurrentHashMap<>();
    }

    public static TokensStorage getTokenStorage() {
        if (tokensStorage == null) {
            tokensStorage = new TokensStorage();
        }
        return tokensStorage;
    }

    public boolean isTokenValid(String token) {
        return tokens.containsKey(token);
    }

    public boolean addToken(String token, int id) {
        if (tokens.containsKey(token))
            return false;
        tokens.put(token, id);
        return true;
    }

    public void removeToken(String token) {
        tokens.remove(token);
    }

    public int getUserId(String token) {
        return tokens.get(token);
    }
}