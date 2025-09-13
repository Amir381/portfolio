<?php
   // Simple email sending using PHP's mail() function
  // Replace with your real receiving email address
  $receiving_email_address = 'amir581@gmail.com';

  header('Content-Type: application/json');

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validate inputs
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
      echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
      exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo json_encode(['status' => 'error', 'message' => 'Invalid email format.']);
      exit;
    }

    // Prepare email
    $to = $receiving_email_address;
    $email_subject = "Contact Form: " . $subject;
    $email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
      echo json_encode(['status' => 'success', 'message' => 'Your message has been sent. Thank you!']);
    } else {
      echo json_encode(['status' => 'error', 'message' => 'Failed to send email.']);
    }
  } else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
  }
?>
