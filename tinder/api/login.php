<?php
//File that handles the login process of the user
  $sFileName = '../txt/users.txt';

  $sUsername = $_POST['username'];
  $sPassword = $_POST['password'];

  //If username and password field is set = NOT empty
  if(!empty($sUsername) && !empty($sPassword)) {
    
    //echo 'Okay a username and password has been filled out';   //Only for test
    
    $sajUsers = file_get_contents($sFileName);
    $ajUsers = json_decode($sajUsers);

    //Go through the users in the array to check
    for ($i = 0; $i < count($ajUsers); $i++) {   

      //Check if username and password combo does exist in file
      if($ajUsers[$i]->username == $sUsername && $ajUsers[$i]->password == $sPassword) {
        //echo 'Yes username and password combo exists';      //Only for test
        
        //Check if user is verified - Meaning that they have already confirmed through email link
        if($ajUsers[$i]->verification == true) {
          //User has already activated the account through email link
          echo 'Account is ready to go';    //Only for test

          //Check if an image is already set
          if($ajUsers[$i]->imageSet == true) {
            //User has an uploaded image
            //TODO: Redirect to page where users will be shown randomly
            echo 'Image has been set';    //Only for test
          } else {
            //User must upload an image
            //TODO: Redirect to user-profile page, where user must upload an image
            echo 'Image must be uploaded in order to continue';    //Only for test  
          }

        } else {
          //User must activate account first
          //TODO: Redirect to start page with modal/popup telling them, that they need to activate account through mail
          echo 'You must activate account first';   //Only for test    
        }
      }

    }

    //Check if user has an image set for them - Otherwise redirect to profile-page
    //TODO

  } else {
      echo '{"status" : "error", "message" : "Username or password was not field out"}';
      header('refresh: 3; url=http://localhost:8888/tinder/');
      exit;
  }

?>