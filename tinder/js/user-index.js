$(document).ready(function() {

  $.ajax({
    "method" : "GET",
    "url" : "../tinder/api/get-users.php",
    "dataType" : "JSON",
  }).done(function(data) {
    
    //Storing sessionID (which is = to userID) from localStorage into variable
    var sUserID = localStorage.getItem("sessionID");

    //Looping through the list of users                
    for (let i = 0; i < data.length; i++) {
      if (sUserID == data[i].id) {
        console.log(sUserID);   //Only for test
        
        //Makes link in navbar visible, if imageSet is true
        if (data[i].imageSet == true) {
          $(".navbar-brand").css({"visibility" : "visible"}) ;
          //Fetch image if it is set
          $('#img-profile').attr("src", data[i].imageURL); 
        } else {
          swal({
            title: "Attention!",
            text: "You must upload an image in order to see other users.",
            icon: "info",
            button: "I understand!"
          });
        }
        
        //Fetch other values for profile for specific user and change them in the markup
        //----------
        //Insert username in value for 'txt-username1' input field - It is a hidden field
        //Useful for api/update-profile.php
        $('#txt-username1').attr("value", data[i].username);
        
        //Check if description is set - NOT mandatory
        if (data[i].description !== '') {
          $('#txt-profile-description').html(data[i].description);  
        }
        $('#txt-firstName').attr("value", data[i].firstName);
        $('#txt-lastName').attr("value", data[i].lastName);
        
        //Check if female or male
        if (data[i].gender == 'male') {
          $('#img-gender').attr("src", "img/male.png");  
        } else {
          $('#img-gender').attr("src", "img/female.png");
        }
        
        //Check gender - male or female
        if (data[i].gender == 'male') {
          $('#opt-gender-firstValue').html("<option>Male</option>");
          $('#opt-gender-secondValue').html("<option>Female</option>");
        } else {
          $('#opt-gender-firstValue').html("<option>Female</option>");
          $('#opt-gender-secondValue').html("<option>Male</option>"); 
        }
        
        //Check interested in - male, female or both
        if (data[i].interestedIn == 'male') {
          $('#opt-interestedIn-firstValue').html("<option>Male</option>");
          $('#opt-interestedIn-secondValue').html("<option>Female</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Both</option>");  
        } else if (data[i].interestedIn == 'female') {
          $('#opt-interestedIn-firstValue').html("<option>Female</option>");
          $('#opt-interestedIn-secondValue').html("<option>Male</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Both</option>");  
        } else {
          $('#opt-interestedIn-firstValue').html("<option>Both</option>");
          $('#opt-interestedIn-secondValue').html("<option>Male</option>");
          $('#opt-interestedIn-thirdValue').html("<option>Female</option>"); 
        }
        
        //Fetch age, phoneNumber and email
        $('#num-age').attr("value", data[i].age);
        $('#num-phoneNumber').attr("value", data[i].phoneNumber);
        $('#txt-email').attr("value", data[i].email);
        
        //Insert username in value for 'txt-username1' input field - It is a hidden field
        //Useful for api/update-password.php
        $('#txt-username2').attr("value", data[i].username);

        break;
      } 
    }

  }).fail(function() {
    console.log('{"status" : "error", "message" : "Something went wrong, trying to retrieve the data"}');
  });


  //ON SUBMIT
  //----------
  //frm-updateProfile
  $('#frm-updateProfile').submit(function(event) {
    event.preventDefault();
    updateProfile();
  });

  //frm-updatePassword
  $('#frm-updatePassword').submit(function(event) {
    event.preventDefault();
    updatePassword();
  });


  //KEYUP
  //----------
  //txt-password & txt-confirmPassword fields
  $('#txt-password, #txt-passwordConfirm').keyup(function() {
    validatePassword();
  });

  //FUNCTIONS
  //----------
  //Validate the updated profile details
  //TODO: function
  
  //Update Profile informations
  function updateProfile() {

    var form = $('#frm-updateProfile');

    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/update-profile.php",
      "data" : form.serialize(),
      "dataType" : "JSON", 
    }).done(function(data) {

    }).fail(function(data) {

    });
  };

  //Validate the updated password
  function validatePassword() {

    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    //password
    if($('#txt-password').val().match(passwordRegex)){
      $('#txt-password').css('border-color', 'green');
    } else {
      $('#txt-password').css('border-color', 'red');
    }

    //passwordConfirm
    if($('#txt-passwordConfirm').val().match(passwordRegex) && $('#txt-passwordConfirm').val() == $('#txt-password').val()) {
      $('#txt-passwordConfirm').css('border-color', 'green');
    } else {
      $('#txt-passwordConfirm').css('border-color', 'red');
    }

    //Enable submit, when fields are correctly filled out
    if($('#txt-password').val().match(passwordRegex) && $('#txt-passwordConfirm').val().match(passwordRegex)
        && $('#txt-password').val() == $('#txt-passwordConfirm').val()) {
          $('#btn-changePassword-submit').prop('disabled', false);
        } else {
          $('#btn-changePassword-submit').prop('disabled', true);
    }
  };

  //Update Password
  function updatePassword() {

    var form = $('#frm-updatePassword');

    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/update-password.php",
      "data" : form.serialize(),
      "dataType" : "JSON",
    }).done(function(data) {

      console.log(data);    //Only for test
      if(data.status == 'success') {
        swal({
          title : "Success!",
          text : "Your password has successfully been updated.",
          icon : "success",
          button : "Okay"
        }).then(function() {
          window.location.href = '../tinder/user-index.php';
        });
      }
    }).fail(function(data) {

    });
  };

});