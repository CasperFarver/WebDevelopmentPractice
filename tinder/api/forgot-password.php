<?php

  // Import PHPMailer classes into the global namespace
  // These must be at the top of your script, not inside a function
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  $sFileName = '../txt/users.txt';

  $sUsernameOrEmail = $_POST['forgot-password'];

  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //If input field is not empty - Used required in frontent so should not be possible
  if(!empty($sUsernameOrEmail)) {

    //Check if a user with the existing email or username exists
    for ($i=0; $i < count($ajUsers); $i++) { 
      if($ajUsers[$i]->username == $sUsernameOrEmail || $ajUsers[$i]->email == $sUsernameOrEmail) {

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
            $mail->addAddress($ajUsers[$i]->email, $ajUsers[$i]->firstName);                               
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
            $mail->Subject = 'Forgot Password';                      
            
            //Store a uniqueID/Password
            $sNewPassword = uniqid();

            // Insert dynamic message body
            $mail->Body    =  'You have forgotten your password, so we have provided a new one for you!<br><br>Your new password is: <b>' . $sNewPassword . '</b><br>Remember to change it!<br><br><br>Kindly Regards<br>Tinder 2.0';                       
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            //TODO: Set new password for user and update it to text file.
            //But keep all other fields for the user, as they are.
            $ajUsers[$i]->password = $sNewPassword;

            file_put_contents($sFileName, json_encode($ajUsers));

            // var_dump($mail);
            $mail->send();
            echo '{"status" : "success", "message" : "User found. Email to reset password will be send"}';
            exit;
        } catch (Exception $e) {
            echo '{ "status" : "error" , "message" : "Message could not be sent. Mailer Error:'. $mail->ErrorInfo .'" }';  
        }
      } 
    }
    echo '{"status" : "error", "message" : "No user with that username/email exists"}';
    exit;
  }


?>