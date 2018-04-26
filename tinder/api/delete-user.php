<?php

  $sUserID = $_POST['sessionID'];
  $sFileName = '../txt/users.txt';

  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  
  //DOES NOT WORK
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    //Check if ID matches
    if($sUserID == $ajUsers[$i]->id) {

      array_slice($ajUsers, 0, 1);
      
      $sajUsers = json_encode($ajUsers);
      file_put_contents($sFileName, $sajUsers);
      
      break;

    }

  }

  

  echo $sajUsers;
  exit;

?>