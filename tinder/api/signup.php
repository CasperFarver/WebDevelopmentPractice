<?php
//Signup API

  $sFileName = '../txt/users.txt';

  //Variables from signup-form
  $sFirstName = $_POST['firstName'];
  $sLastName = $_POST['lastName'];
  $iAge = $_POST['age'];
  $sGender = $_POST['gender'];
  $sInterestedIn = $_POST['interestedIn'];
  $sDescription = $_POST['description'];    //NOT a required field - OPTIONAL!
  $iPhoneNumber = $_POST['phoneNumber'];
  $sEmail = $_POST['email'];
  $sUsername = $_POST['username'];
  $sPassword = $_POST['password'];
  $sPasswordConfirm = $_POST['passwordConfirm'];

  //Check if required fields are set or not - If NOT:
  if(!isset($sFirstName) || !isset($sLastName) || !isset($iAge) || !isset($sGender)
    || !isset($sInterestedIn) || !isset($iPhoneNumber) || !isset($sEmail)
    || !isset($sUsername) || !isset($sPassword) || !isset($sPasswordConfirm)) {
      echo '{"status" : "error", "message" : "You are missing vital information!"}';
      exit;
  }

  //TODO: VALIDATION OF THE INPUT FIELDS - VALIDATE-SIGNUP SHOULD BE REQUIRED HERE!

  //Open file and decode it from string to array
  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //Loop through the array of users
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    //Check if username exists
    if($ajUsers[$i]->username == $sUsername) {
      echo '{"status" : "error", "message" : "Username already exists"}';
      exit;  
    }

    //Check if email exists
    if ($ajUsers[$i]->email == $sEmail) {
      echo '{"status" : "error", "message" : "Email already exists"}';
      exit;
    }
  }

  echo '{"status" : "success", "message" : "You are in!"}';

?>