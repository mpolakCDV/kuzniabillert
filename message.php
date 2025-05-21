<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(!empty($email) && !empty($message)) {
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $receiver = "kuznia.billert@gmail.com";
        $subject = "Wiadomość od $email z formularza na stronie kuzniabillert.pl:";
        $body = "Imię: $name\nEmail: $email\n\nTreść wiadomości:\n$message";
        $sender = "From: $email";
        if(mail($receiver, $subject, $body, $sender)) {
            echo "Twoja wiadomość została wysłana.";
        } else {
            echo "Błąd przy wysyłaniu wiadomości!";
        }
    } else {
        echo "Wprowadź poprawny adres email!";
    }
} else {
    echo "Pole email i wiadomość są wymagane!";
}

?>
