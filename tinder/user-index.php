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

    
    <form class="container flex-container" action="">
      <div class="flex-rows">
        <div class="form-group">
          <img id="img-profile" src="img/placeholder.jpg" alt="profile image">
          <input type="file" type="file"></input>
        </div>

        <div class="form-group">
          <label for="txt-profile-description">Description</label>
          <textarea name="profile-description" id="txt-profile-description" class="form-control" cols="30" rows="10">Description...</textarea>
        </div>
      </div>
      <div class="flex-rows">
        <div class="form-group">
          <label for="txt-firstName">First name</label>
          <input id="txt-firstName" class="form-control" type="text" value="first name">
        </div>

        <div class="form-group">
          <label for="txt-lastName">Last name</label>
          <input id="txt-lastName" class="form-control" type="text" value="last name">
        </div>

        <div class="form-group">
          <label for="num-age">Age</label>
          <input id="num-age" class="form-control" type="number" value="25">
        </div>  
        
        <div class="form-group">
          <label>Gender & Interested in</label>
          <div id="flex-gender">
            <select name="sel-gender" class="form-control" id="sel-gender">
              <option id="opt-gender-firstValue" value="firstOption">Male</option>
              <option id="opt-gender-secondValue" value="firstOption">Female</option>
            </select>
            <select name="sel-interestedIn" class="form-control" id="sel-interestedIn">
              <option id="opt-interestedIn-firstValue" value="firstOption">Male</option>
              <option id="opt-interestedIn-secondValue" value="secondOption">Female</option>
              <option id="opt-interestedIn-thirdValue" value="thirdOption">Both</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="num-phuneNumber">Phone number</label>
          <input id="num-phoneNumber" class="form-control" type="number" value="12345678">
        </div>

        <div class="form-group">
          <label for="txt-email">Email</label>
          <input id="txt-email" class="form-control" type="email" value="hans@hansen.dk">
        </div>

      </div>

      <div class="flex-rows form-group">
        <button type="button" class="form-control btn btn-primary" data-toggle="modal" data-target"#change-password-modal">Change password</button>
      </div>
      <div id="flex-save" class="flex-rows form-group">
        <button type="submit" class="form-control btn btn-success">Save</button>
      </div>
    </form>
    
    <!-- Change password modal -->
    <div class="modal fade" id="change-password-modal" tabindex="-1" role="dialog" aria-labelledby="change-password-modal-label" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="change-password-modal-label">Change password</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form id="frm-change-password">
            <div class="modal-body">
              <div class="form-group">
                  <label for="input-change-password">Enter new password</label>
                  <input type="password" name="change-password" class="form-control" id="input-change-password" placeholder="Pass1234" required>
              </div>
              <div class="form-group">
                  <label for="input-change-password-confirm">Confirm new password</label>
                  <input type="password" name="change-password-confirm" class="form-control" id="input-change-password-confirm" placeholder="Pass1234" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-info">Submit</button>
            </div>
          </form>
        </div>
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

