<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();
$action = $_GET['action'];
if ($action == 'login') {
    if (isset($_SESSION['username'])) {
        $resul = array(
            'success' => true,
            'username' => $_SESSION['username']
        );
    } else {
        $resul = array(
            'success' => false
        );
    }
    echo json_encode($resul);
}
if ($action == 'logout') {
    unset($_SESSION['username']);
    $str = array(
        'success' => true,
        'message' => "已注销"
    );
    echo json_encode($str);
}
?>