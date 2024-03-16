<?php

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$city = $_POST['city'];
$password = $_POST['password'];


$subject = 'User Data Form Submission';


$message = "Name: $name\n";
$message .= "Email: $email\n";
$message .= "Phone: $phone\n";
$message .= "City: $city\n";


if(mail($email, $subject, $message)) {
    echo 'Form submitted successfully. Check your email for confirmation.';
} else {
    echo 'Error sending email.';
}
?>
