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

<!doctype html>
<html lang="en">
  <head>
    <title>Tinder 2.0</title>
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
        <form action="" method="post" enctype="multipart/form-data" id="frm-imageUpload">
          <div class="form-group">
            <img id="img-profile" src="img/placeholder.jpg" alt="profile image">
            <div class="flex-inline">
              <input type="file" id="imgToUpload" name="imgToUpload" style="display: none;"/>
              <input type="button" id="btn-browse" class="btn btn-primary form-control" value="Browse..." onclick="document.getElementById('imgToUpload').click();">
              <input type="button" class="btn btn-info form-control" value="Upload" id="btn-upload"/>
            </div>
          </div>
        </form>

        <form id="frm-updateProfile">
          <div class="form-group">
            <label for="txt-profile-description">Description</label>
            <textarea name="description" id="txt-profile-description" class="form-control" cols="30" rows="8"></textarea>
          </div>
        </div>
        
        <div class="flex-rows">
          <h5>Profile details</h5>  
          <input id="txt-username1" name="username" type="hidden" value="">
          <div class="form-group">
            <label for="txt-firstName">First name</label>
            <input name="firstName" id="txt-firstName" class="form-control input" type="text" value="first name" required>
          </div>

          <div class="form-group">
            <label for="txt-lastName">Last name</label>
            <input name="lastName" id="txt-lastName" class="form-control" type="text" value="last name" required>
          </div>

          <div class="form-group">
            <label for="num-age">Age</label>
            <input name="age" id="num-age" class="form-control" type="number" value="25" min="18" max="99" required>
          </div>  
          
          <div class="form-group">
            <label>Gender & Interested in</label>
            <div class="flex-inline">
              <select name="gender" class="form-control" id="sel-gender" required>
                <option id="opt-gender-firstValue" value="firstOption">Male</option>
                <option id="opt-gender-secondValue" value="firstOption">Female</option>
              </select>
              <select name="interestedIn" class="form-control" id="sel-interestedIn" required>
                <option id="opt-interestedIn-firstValue" value="firstOption">Male</option>
                <option id="opt-interestedIn-secondValue" value="secondOption">Female</option>
                <option id="opt-interestedIn-thirdValue" value="thirdOption">Both</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="num-phuneNumber">Phone number</label>
            <input name="phoneNumber" id="num-phoneNumber" class="form-control" type="number" value="12345678" min="11111111" max="99999999" required>
          </div>

          <div class="form-group">
            <button id="btn-saveProfile-submit" type="submit" class="form-control btn btn-success" disabled>Save</button>
          </div>
        </form>
      </div>
      
      
      <!-- Empty row to make space -->
      <div class="flex-rows form-group"></div>
      
      
      <div id="flex-save" class="flex-rows form-group">
        <form id="frm-updatePassword">
          <h5>Change password</h5>  
          <input id="txt-username2" name="username" type="hidden" value="">
          <div class="form-group">
            <label for="txt-password">Password</label>
            <input name="password" id="txt-password" class="form-control" type="password" required>
          </div>
          <div class="form-group">
            <label for="txt-passwordConfirm">Confirm password</label>
            <input name="passwordConfirm" id="txt-passwordConfirm" class="form-control" type="password" required>
          </div>
          <button type="submit" id="btn-changePassword-submit" class="form-control btn btn-primary" disabled>Change Password</button>
        </form>
      </div>
      
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="js/user-index.js"></script>
  </body>
</html>



