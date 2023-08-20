<?php

    class Router {
        public static function get  ( $route, $callback ) {
            $request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            if( $request == $route && $_SERVER['REQUEST_METHOD'] == 'GET' ) {
                $callback();
                exit();
            }
        }
    }