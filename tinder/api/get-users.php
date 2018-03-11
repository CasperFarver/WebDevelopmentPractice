<?php
  //API for getting all the users
  
  //Start a session - used in all PHP files that are required when logged in
  session_start();

  $sFileName = '../txt/users.txt';
  
  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //Check if the data is actually an array
  if (!is_array) {
    echo '{"status" : "error", "message" : "The data is not an array"}';
    exit;
  }

  //Converts back to a string, but that is visible as a JSON array
  $sajUsers = json_encode($ajUsers, JSON_UNESCAPED_UNICODE);
  
  //Echo back
  echo $sajUsers; 
  
?>