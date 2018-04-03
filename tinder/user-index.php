<?php
//Main page for users when logged in

  session_start();
  //echo $_SESSION['id'];   //Only for test

  //Check if session id is set or not empty
  if((!isset($_SESSION['id'])) || (empty($_SESSION['id']))) {
    echo '{"status" : "error", "message" : "Session ID was not set"}';    //Only for test

    //TODO: Show message telling that user did not get logged in.

    exit;

  } else {
      echo '{"status" : "success", "message" : "Session ID was set"}';    //Only for test

      echo '<script>console.log(' . $_SESSION['id'] . ')</script>';

      $sFileName = 'txt/users.txt';

      $sajUsers = file_get_contents($sFileName);
      $ajUsers = json_decode($sajUsers);

      for ($i=0; $i < count($ajUsers); $i++) { 
        if($_SESSION['id'] = $ajUsers[$i]->id) {
          echo '<br>User found<br>';      //Only for test
          
          if($ajUsers[$i]->imageSet == false) {

            //TODO: Return status - pending and let FE handle the redirect/AJAX for image upload 

            echo '{"status" : "pending", "message" : "Image must be uploaded"}';   

          } else if($ajUsers[$i]->imageSet == true) {

            //TODO: Return status - success and let FE handle the redirect/AJAX for showing the main user page

            echo '{"status" : "success", "message" : "Image has been set! You are all good"}';    

          } else {

            echo '{"status" : "error", "message" : "imageSet is neither true or false"}';

          }

          exit;
        } else {
          echo '{"status" : "error", "message" : "No match between userID and sessionID was found!"}';
        }
      }
  }



?>