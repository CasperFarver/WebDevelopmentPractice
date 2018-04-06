<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/user-index.css"> 
  </head>
  <body>
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#" style="visibility:hidden;">Profile</a>
        <a class="navbar-brand" href="#" style="visibility:hidden;">Explore</a>
        <a class="navbar-brand" href="#" style="visibility:hidden;">Matches</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>
          <form class="form-inline my-2 my-lg-0">
            <button id="btn-logout" class="btn btn-outline-danger my-2 my-sm-0" type="button">Logout</button>
          </form>
        </div>
      </div>
    </nav>

    <div class="container flex-container">
      <div class="flex-rows">
        <img id="img-profile" src="img/placeholder.jpg" alt="profile image">
        <input type="file"></input>
        <textarea name="profile-description" id="txt-profile-decription" cols="30" rows="10">description...</textarea>
      </div>
      <div class="flex-rows">
        <input type="text" value="first name">
        <input type="text" value="last name">
        <div class="flex-hori">
          <img id="img-gender" src="img/male.png" alt="gender">
          <input type="number" value="25">  
        </div>
        <input type="number" value="12345678">
        <input type="email" value="hans@hansen.dk">
        <input type="password">
        <input type="password">
      </div>
      <div id="flex-save" class="flex-rows">
        <button>Save</button>
      </div>
    </div>


    <!--<div id="profile">
      TODO: MAKE ALL THE MARKUP HERE FIRST. AS SEPERATE ITEMS WITH ID'S/CLASSES
      THEN AFTERWARDS USE .HTML() IN JQUERY TO OVERWRITE THE CONTENT.
    </div>-->

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="js/user-index.js"></script>
  </body>
</html>

<?php
//Main page for users when logged in

  session_start();

  //Check if session id is set or not empty
  if((!isset($_SESSION['id'])) || (empty($_SESSION['id']))) {
    
    //echo '{"status" : "error", "message" : "Session ID was not set"}';    //Only for test
    exit;

  } else {
      
    //echo '{"status" : "success", "message" : "Session ID was set"}';    //Only for test

      //Store sessionID (which is equal to userID) in localStorage
      //This is overwriting any existing value stored.
      echo '<script>localStorage.sessionID = "' . $_SESSION['id'] . '"</script>';

      //Store sessionID (which is equal to userID) in sessionStorage
      //Makes more sense to store it in sessionStorage - but requirement was localStorage.
      //echo '<script>sessionStorage.sessionID = "' . $_SESSION['id'] . '"</script>';    
  }

?>

