<?php

ini_set("default_charset", 'utf-8');
date_default_timezone_set('Europe/Kiev');
$post = !empty($_POST);
if ($post) {
    $quiz_data = $_POST['quiz_data'];

    $sub = "Quiz Data";
    $error = '';

    if (!$quiz_data) {
        $error .= 'Вкажiть data. ';
    }

    if (!$error) {
        $address = "yalunin077@gmail.com";
        $mes = "Date: " . date('d.m.y H:i') .
            "\nQuizData: " . $quiz_data;
        $send = mail($address, $sub, $mes);
        if ($send) {
            echo "success";
        } else {
            echo $error;
        }
    } else {
        echo $error;
    }
}


?>