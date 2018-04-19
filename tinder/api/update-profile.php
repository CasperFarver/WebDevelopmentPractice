<?php
//Update profile details API

  $sFileName = '../txt/users.txt';

  //Variables from 'frm-updateProfile'
  $sDescription = $_POST['description'];  //NOT a mandatory/required field
  $sUsername = $_POST['username']; //Hidden input field - automatically fetches the value via JS.
  $sFirstName = $_POST['firstName'];
  $sLastName = $_POST['lastName'];
  $iAge = $_POST['age'];
  $sGender = $_POST['gender'];
  $sInterestedIn = $_POST['interestedIn'];
  $iPhoneNumber = $_POST['phoneNumber'];
  
  //Check if required fields are filled out
  if(!isset($sUsername) || !isset($sFirstName) || !isset($sLastName) 
    || !isset($iAge) || !isset($sGender) || !isset($sInterestedIn)
    || !isset($iPhoneNumber)) {
      echo '{"status" : "error", "message" : "Missing required fields"}';
      exit;
  }

  //Open file of users and decode it from a string to array
  $sajUsers = file_get_contents($sFileName);
  $ajUsers = json_decode($sajUsers);

  //Loop through the array to find a match
  for ($i=0; $i < count($ajUsers); $i++) { 
    
    //Check if username exists - It should unless, user has manipulated with the dev tool.
    if($ajUsers[$i]->username == $sUsername) {

      //Set/save new values
      $ajUsers[$i]->description = $sDescription;
      $ajUsers[$i]->firstName = $sFirstName;
      $ajUsers[$i]->lastName = $sLastName;
      $ajUsers[$i]->age = $iAge;
      $ajUsers[$i]->gender = $sGender;
      $ajUsers[$i]->interestedIn = $sInterestedIn;
      $ajUsers[$i]->phoneNumber = $iPhoneNumber;

      //Update array and turn it back into a string
      $sajUsers = json_encode($ajUsers);
      file_put_contents($sFileName, $sajUsers);

      echo '{"status" : "success", "message" : "User details have been updated"}';
      exit;
        
    }
  }
  echo '{"status" : "error", "message" : "Username does not exist"}';
  exit; 

?>