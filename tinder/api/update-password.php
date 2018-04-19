<?php
//Update Password API

  $sFileName = '../txt/users.txt';

  //Variables from 'frm-updatePassword'
  $sPassword = $_POST['password'];
  $sPasswordConfirm = $_POST['passwordConfirm'];
  $sUsername = $_POST['username']; //Hidden input field - automatically fetches the value via JS.

  //Check if required fields are filled out or not
  if(!isset($sPassword) || !isset($sPasswordConfirm) || !isset($sUsername)) {
    echo '{"status" : "error", "message" : "Missing required fields"}';
    exit;
  }

  //Open file of users and decode it from a string to array
  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //Loop through the array of users to find a match
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    //Check if username exists - It should unless, user has manipulated with the dev tool
    if($ajUsers[$i]->username == $sUsername) {
      
      //Set new password value
      $ajUsers[$i]->password = $sPassword;

      //Update the array and turn it back into a string
      $sajUsers = json_encode($ajUsers);
      file_put_contents($sFileName, $sajUsers);

      echo '{"status" : "success", "message" : "Password has been updated"}';
      exit;  
    }
  }
  echo '{"status" : "error", "message" : "Username does not exist"}';
  exit; 

?>