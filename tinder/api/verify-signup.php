<?php
//API that verifies the user when they click on the verification link.

  //verificationString received from the URL through the GET method
  $sVerificationString = $_GET['verificationString'];

  $sFileName = '../txt/users.txt';

  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //Loop through the list of users to find the verification string
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    if($ajUsers[$i]->verificationString == $sVerificationString && $ajUsers[$i]->verification == false) {
      
      $ajUsers[$i]->verification = true;

      $sajUsers = json_encode($ajUsers);
      file_put_contents($sajUsers);

      echo '{"status":"success", "message":"Your account has successfully been verfied and activated!"}';   //Only used for test

      //Redirect to index-verified.html
      header('Location: index-verified.html');
      exit;
    } else if($ajUsers[$i]->verificationString == $sVerificationString && $ajUsers[$i]->verification == true) {

      echo '{"status":"success", "message":"Your account has already been activated!"}';   //Only used for test

      //Redirect to index-verified-already.html
      header('Location: index-verified-already.html');
      exit;
    }  
  }

  echo '{"status":"success", "message":"No user with that verification string exists"}';   //Only used for test

  //Redirect to index-verified-error.html
  header('Location: index-verified-error.html');
  exit;

//TODO: SHOULD REDIRECT USER TO PAGE WITH SWEET ALERT SAYING THEY CAN NOW LOG IN.
//WHEN CLICKING ON BUTTON, REDIRECT TO HOME PAGE! - INDEX-VERIFIED.HTML THAT LOOKS LIKE INDEX.HTML 
//BUT POPS UP WITH SWEET ALERT SAYING YOU NOW CAN LOG IN AND WHEN CLICKING ON BUTTON YOU WILL BE REDIRECTED TO INDEX.HTML


?>