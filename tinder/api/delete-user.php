<?php

  $sUserID = $_POST['sessionID'];
  $sFileName = '../txt/users.txt';

  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  
  //DOES NOT WORK
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    //Check if ID matches
    if($sUserID == $ajUsers[$i]->id) {

      array_splice($ajUsers, $i, 1);
      
      break;
    }
  }

  $sajUsers = json_encode($ajUsers, JSON_UNESCAPED_UNICODE);
  file_put_contents($sFileName, $sajUsers);

  echo '{"status" : "success", "message" : "User with id: ' . $sUserID . ' has been deleted."}';

?>