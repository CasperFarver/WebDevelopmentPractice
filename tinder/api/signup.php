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

  //Create an empty JSON objcet
  //Same as:
  //$obj = '{}'
  //$jObj = json_decode($obj)
  $jUser = new stdClass();

  //Filling the empty object with relevant user data
  $jUser->id = uniqid();
  $jUser->firstName = $sFirstName;
  $jUser->lastName = $sLastName;
  $jUser->age = $iAge;
  $jUser->gender = $sGender;
  $jUser->interestedIn = $sInterestedIn;
  $jUser->description = $sDescription;
  $jUser->phoneNumber = $iPhoneNumber;
  $jUser->email = $sEmail;
  $jUser->username = $sUsername;
  $jUser->password = $sPassword;
  $jUser->imageSet = false;
  $jUser->imageURL = '';
  $jUser->verification = false;
  $jUser->verificationString = uniqid();
  $jUser->likes = [];
  $jUser->currentWatching = '';

  //Push new user to array - array_push() - pushes element to array
  array_push($ajUsers, $jUser);

  //Convert from array to string - json_encode converts a PHP value into a JSON value.
  //For example: From a PHP array to a JSON representation of that array.
  $sajUsers = json_encode($ajUsers);

  //Writes a string to a file - file_put_contents() overwrites the file when no mode (FILE_APPEND or LOCK_EX) has been set.
  file_put_contents($sFileName, $sajUsers);

  //Store variables for send-verification-email.php
  $sMessageSubject = 'Welcome ' . $jUser->firstName . '. Please activate your account!';
  $sMessageBody = '<a href="http://localhost:8888/WebDevelopmentPractice/tinder/api/verify-signup.php?verificationString='. $jUser->verificationString .'">Verify your account</a>';

  //Require verification API
  require_once('send-verification-email.php');

?>