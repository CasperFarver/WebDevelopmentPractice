<?php
//Validate the login information

  session_start();

  $sFileName = '../txt/users.txt';

  $sUsername = $_POST['username'];
  $sPassword = $_POST['password'];

  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //If the input fields are not empty - should not be possible - due to validation in frontend. But just to ensure.
  if(!empty($sUsername) && !empty($sPassword)) {
    
    //Check username and password combo
    for ($i=0; $i < count($ajUsers); $i++) { 
      if($ajUsers[$i]->username == $sUsername && $ajUsers[$i]->password == $sPassword) {
          
          if($ajUsers[$i]->verification == true) {
            $_SESSION['id'] = $ajUsers[$i]->id;
            echo '{"status" : "success", "message" : "Username and password match is found"}';
            exit;
          } else {
            echo '{"status" : "pending", "message" : "Username and password is correct, but account needs to be activated"}';
            exit;
          }
          
      } 
    }
    echo '{"status" : "error", "message" : "Username and/or password do not match!"}';
    exit;
  }


  




?>