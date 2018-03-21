<?php
//API that sends out the verification email to the user

  // Import PHPMailer classes into the global namespace
  // These must be at the top of your script, not inside a function
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer/src/Exception.php';
  require 'PHPMailer/src/PHPMailer.php';
  require 'PHPMailer/src/SMTP.php';

  $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
  try {
      //Server settings
      // $mail->SMTPDebug = 2;                                 // Enable verbose debug output
      $mail->isSMTP();                                      // Set mailer to use SMTP
      $mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
      $mail->SMTPAuth = true;                               // Enable SMTP authentication
      $mail->Username = 'casperfarver.kea@gmail.com' ;           // SMTP username
      // $mail->Password = file_get_contents('mail.txt');      // SMTP password
      $mail->Password = 'kea091091#';                       // SMTP password
      $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
      $mail->Port = 587;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom('casperfarver.kea@gmail.com', 'Tinder 2.0');
      // insert dynamic mail & name
      $mail->addAddress($sEmail, $sFirstName);                               //Received from 'signup.php'
      // $mail->addAddress('dittechristensen@live.dk', 'Joe User');          // Add a recipient
      //$mail->addReplyTo('dittechristensen@live.dk', 'Information');
      //$mail->addAddress('casperfarver@hotmail.com');                       // Name is optional
      //$mail->addCC('cc@example.com');
      //$mail->addBCC('bcc@example.com');

      //Attachments
      //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
      //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

      //Content
      $mail->isHTML(true);                                    // Set email format to HTML
      
      // Insert dynamic subject
      $mail->Subject = $sMessageSubject;                      //Received from 'signup.php'
      // $mail->Subject = 'Velkommen til festudvalget';
      
      // Insert dynamic message body
      $mail->Body    =  $sMessageBody ;                       //Received from 'signup.php'
      //$mail->Body    = 'This is a test. Body of email sent';
      //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

      // var_dump($mail);
      $mail->send();
      echo '{"status":"success", "message":"An email has been sent to you. Please verify your account"}';

  } catch (Exception $e) {
      echo '{ "status" : "error" , "message" : "Message could not be sent. Mailer Error."}';  
  }

?>