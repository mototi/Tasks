<?php

    require_once UTILS . 'Router.php';

    Router::get('/home', function() {
        require_once VIEWS . 'home.php';
    });
    
    Router::get('/profile', function() {
        $path = STORAGE . 'profile.json';
        $data = fopen($path, "r") ;
        if(filesize($path) == 0){
            echo "empty file";
            return;
        }
        $content = fread($data, filesize($path));
        $jsonData = json_decode($content, true);
        extract($jsonData);
        require_once VIEWS . 'profile.php';
    });

    Router::get('/skills', function() {
        $path = STORAGE . 'skills.json';
        $data = fopen($path, "r") ;
        if(filesize($path) == 0){
            echo "empty file";
            return;
        }
        $content = fread($data, filesize($path));
        $jsonData = json_decode($content, true);
        extract($jsonData);
        require_once VIEWS . 'skills.php';
    });