//Function that runs when document is loaded
$(document).ready(function() {
  
  //Gets called when document has loaded
  $.ajax({
    "method" : "GET",
    "url" : "../tinder/api/get-recommendations.php",
    "dataType" : "JSON",
  }).done(function(data){
    
    //console.log(data);  //Only for test
    
    //Shuffles the array
    var shuffledArray = data.sort(function() {
      return .5 - Math.random();
    });

    //Selects 3 elements: 0, 1 & 2
    var selectedElements = shuffledArray.slice(0, 3);
    
    //Template - {{}} is a placeholder
    var sTemplate = `
                      <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="{{imageURL}}" alt="User image">
                        <div class="card-body">
                          <h5 class="card-title">{{firstName}}</h5>
                          <p class="card-text">{{description}}</p>
                          <img class="img-recommendation" src="{{recommendation}}" alt="recommendation">
                        </div>
                      </div>
                    `;

    //Looping through the first 3 in the recommendation list                
    for (i = 0; i < 3; i++) {
      
      //Copy of the template
      var sTemplateCopy = sTemplate;

      //Replacing the placeholder-elements in the template with values from the users
      sTemplateCopy = sTemplateCopy.replace( '{{imageURL}}', data[i].imageURL);
      sTemplateCopy = sTemplateCopy.replace( '{{firstName}}', data[i].firstName);
      sTemplateCopy = sTemplateCopy.replace( '{{description}}', data[i].description);
      
      switch (data[i].recommendation) {
        case 5:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/5-stars.png');
          break;
        case 4:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/4-stars.png');
          break;
        case 3:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/3-stars.png');
          break;
        case 2:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/2-stars.png');
          break;
        case 1:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/1-star.png');
          break;
        case 0:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/0-star.png');
          break;
        default:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '#');  
      }

      //Append the sTemplateCopy to the div with id
      $('#users').append(sTemplateCopy);
    }  
  
  }).fail(function(){
    console.log('{"status" : "error", "message" : "Something went wrong, trying to retrieve the data"}');
  });


  //KEYUP
  //---------
  //input-login-username & input-login-password
  $('#input-login-username, #input-login-password').keyup(function() {
    validateLogin();
  });

  //all required input fields in signup
  $('#input-signup-firstName, #input-signup-lastName, #input-signup-age, #input-signup-phoneNumber, #input-signup-email, #input-signup-username, #input-signup-password, #input-signup-passwordConfirm').keyup(function() {
    validateSignup();
  });

  //to select elements in signup
  $('#sel-gender, #sel-interestedIn').change(function() {
    validateSignup();
  });


  //ON SUBMIT
  //---------
  //frm-login
  $('#frm-login').submit(function(event) {
    event.preventDefault();
    login();
  });

  //frm-forgot-password
  $('#frm-forgot-password').submit(function(event) {
    event.preventDefault();
    forgotPassword();
  });

  //frm-signup
  $('#frm-signup').submit(function(event) {
    event.preventDefault();
    signup();
  });


  //FUNCTIONS
  //---------

  //LOGIN
  //Validation for username and password - login
  function validateLogin() {

    //REGEX
    //-----
    //Regex that checks username: only letters, numbers, dashes and underscores. Between 6 and 16 chars.
    var usernameRegex = /^[a-zA-ZæøåÆØÅ0-9_-]{5,16}$/;

    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    //username
    if($('#input-login-username').val().match(usernameRegex)) {
      $('#input-login-username').css('border-color', 'green');
    } else {
      $('#input-login-username').css('border-color', 'red');
    }

    //password
    if($('#input-login-password').val().match(passwordRegex)) {
      $('#input-login-password').css('border-color', 'green');
    } else {
      $('#input-login-password').css('border-color', 'red');
    }

    //Enable submit button when fields are correctly filled out
    if($('#input-login-username').val().match(usernameRegex) && $('#input-login-password').val().match(passwordRegex)) {
      $('#btn-login-submit').prop('disabled', false);
    } else {
      $('#btn-login-submit').prop('disabled', true);
    }
  }

  //Login - Does the combo of username and password exists?
  function login() {
    
    var form = $('#frm-login');
    
    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/login.php",
      "data" : form.serialize(),    //Encodes a set of form elements (in this case the form element it self) as a string for submission - What we sent to the API
      "dataType" : "JSON",    //What type we expect to receive from the API      
    }).done(function(data) {
      console.log(data);
      if(data.status == 'success') {

        swal({
          title: "Success!",
          text: "You have successfully been logged in.",
          icon: "success",
          timer: 2500,
          buttons: false
        }).then(function(){
            //TODO: Redirect to user-profile page
            //Need to start a session somewhere
            //Need to bring the userID along aswell somehow
            window.location.href = '../tinder/user-index.php';
        }); 

      } else if(data.status == 'pending'){

          swal({
            title: "Activation required!",
            text: "You need to activate your account.",
            icon: "info",
            button: "Roger that!"
          });

      } else {

          //Sweet Alert
          swal({
            title: "Woops",
            text: "Wrong username and/or password!",
            icon: "error",
            button: "Try again"
          });
      }
    }).fail(function() {
      console.log('{"status" : "error", "message" : "Some error occured in backend"}');

      //Sweet Alert
      swal({
        title: "Error!",
        text: "An error occured on the server - Try again later.",
        icon: "error",
        button: "Okay"
      });

    });
  };


  //SIGNUP
  //Validation all input fields - signup  
  function validateSignup() {

    //REGEX
    //-----
    //Regex that checks firstName & lastName: only letters and between 2 and 20 characters
    var nameRegex = /^[a-zA-ZæøåÆØÅ]{2,20}$/;

    //Regex for age - between 2 and 3 digits
    var ageRegex = /^\d{2}$/;

    //Regex that check for exactly 8 digits
    var phoneNumberRegex = /^\d{8}$/;

    //Regex that checks email
    var emailRegex= /^[a-zA-ZæøåÆØÅ0-9._%+-]+@[a-zA-ZæøåÆØÅ0-9.-]+\.[a-z]{2,3}$/;

    //Regex that checks username: only letters, numbers, dashes and underscores. Between 6 and 16 chars.
    var usernameRegex = /^[a-zA-ZæøåÆØÅ0-9_-]{5,16}$/;

    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    //description - Not mandatory, so will always have a green border-color
    $('#txt-signup-description').css('border-color', 'green');

    //firstName
    if($('#input-signup-firstName').val().match(nameRegex)) {
      $('#input-signup-firstName').css('border-color', 'green'); 
    } else {
      $('#input-signup-firstName').css('border-color', 'red');
    }

    //lastName
    if($('#input-signup-lastName').val().match(nameRegex)) {
      $('#input-signup-lastName').css('border-color', 'green'); 
    } else {
      $('#input-signup-lastName').css('border-color', 'red'); 
    }
    
    //age - must be  more than 17 years old
    if($('#input-signup-age').val().match(ageRegex) && $('#input-signup-age').val() > 17) {
      $('#input-signup-age').css('border-color', 'green'); 
    } else {
      $('#input-signup-age').css('border-color', 'red'); 
    }

    //gender - must be filled out
    if($('#sel-gender').val() !== '') {
      $('#sel-gender').css('border-color', 'green'); 
    } else {
      $('#sel-gender').css('border-color', 'red'); 
    }

    //interestedIn - must be filled out
    if($('#sel-interestedIn').val() !== '') {
      $('#sel-interestedIn').css('border-color', 'green'); 
    } else {
      $('#sel-interestedIn').css('border-color', 'red'); 
    }

    //phoneNumber
    if($('#input-signup-phoneNumber').val().match(phoneNumberRegex)) {
      $('#input-signup-phoneNumber').css('border-color', 'green'); 
    } else {
      $('#input-signup-phoneNumber').css('border-color', 'red');
    }

    //email
    if($('#input-signup-email').val().match(emailRegex)) {
      $('#input-signup-email').css('border-color', 'green'); 
    } else {
      $('#input-signup-email').css('border-color', 'red'); 
    }

    //username
    if($('#input-signup-username').val().match(usernameRegex)) {
      $('#input-signup-username').css('border-color', 'green');
    } else {
      $('#input-signup-username').css('border-color', 'red');
    }

    //password
    if($('#input-signup-password').val().match(passwordRegex)) {
      $('#input-signup-password').css('border-color', 'green');
    } else {
      $('#input-signup-password').css('border-color', 'red');
    }

    //confirmPassword
    if($('#input-signup-passwordConfirm').val().match(passwordRegex) && $('#input-signup-password').val() == $('#input-signup-passwordConfirm').val()) {
      $('#input-signup-passwordConfirm').css('border-color', 'green');  
    } else {
      $('#input-signup-passwordConfirm').css('border-color', 'red'); 
    }

    //Enable submit button when fields are correctly filled out
    if($('#input-signup-firstName').val().match(nameRegex) && $('#input-signup-lastName').val().match(nameRegex)
        && $('#input-signup-age').val() > 17 && $('#sel-gender').val() !== '' && $('#sel-interestedIn').val() !== ''
        && $('#input-signup-phoneNumber').val().match(phoneNumberRegex) && $('#input-signup-email').val().match(emailRegex)
        && $('#input-signup-username').val().match(usernameRegex) && $('#input-signup-password').val().match(passwordRegex)
        && ($('#input-signup-passwordConfirm').val().match(passwordRegex) && $('#input-signup-passwordConfirm').val() == $('#input-signup-password').val())) {
          $('#btn-signup-submit').prop('disabled', false);  
        } else {
          $('#btn-signup-submit').prop('disabled', true);
        }
  }

  //Signup
  function signup() {

    var form = $('#frm-signup');

    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/signup.php",
      "data" : form.serialize(),
      "dataType" : "JSON",
    }).done(function(data) {
      
      console.log(data);    //Only for test

      if(data.message == 'Username already exists') {
        
        //Sweet Alert
        swal({
          title: "Ooops!",
          text: "This username is already taken! Please try with another.",
          icon: "error",
          button: "Okay"
        });
      } else if (data.message == 'Email already exists') {
        
        //Sweet Alert
        swal({
          title: "Ooops!",
          text: "This email has already been used! Please try with another.",
          icon: "error",
          button: "Okay"
        });
      } else if (data.message == 'You are missing vital information!') {
        
        //Sweet Alert
        swal({
          title: "Ooops!",
          text: "You are missing to fill out vital information!",
          icon: "error",
          button: "Okay"
        });
      } else if (data.message == 'Message could not be sent. Mailer Error.'){
        
        //Sweet Alert
        swal({
          title: "Ooops!",
          text: "An error occured when we tried to sent you the verification mail. Please contact administrator!",
          icon: "error",
          button: "Okay"
        });
      } else if (data.status == 'success') {
        
        //Sweet Alert
        swal({
          title: "Wohoo!",
          text: "Your account has been created! Please activate your accout through the link we sent.",
          icon: "success",
          timer: 3500,
          button: false
        }).then(function() {
            window.location.href = '../tinder/index.html';
        });
      }

    }).fail(function() {

      console.log('{"status" : "error", "message" : "Some error occured in backend"}');

      //Sweet Alert
      swal({
        title: "Error!",
        text: "An error occured on the server - Try again later.",
        icon: "error",
        button: "Okay"
      });

    });
  };

  //Forgot password
  function forgotPassword() {
    
    var form = $('#frm-forgot-password');

    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/forgot-password.php",
      "data" : form.serialize(),
      "dataType" : "JSON",
    }).done(function(data) {
      console.log(data);    //Only for test

      if(data.status == 'success') {
        
        //Sweet Alert
        swal({
          title: "Email has been sent",
          text: "An email to reset password has been sent",
          icon: "success",
          button: "Okay"
        }).then(function() {
          //Closes modal
          $('#forgot-password-modal').modal('hide');
        });
      } else {

        //Sweet Alert
        swal({
          title: "Error",
          text: "No user with that username/email exists",
          icon: "error",
          button: "Try agian"
        });
      }

    }).fail(function() {
      console.log('{"status" : "error", "message" : "Some error occured when we tried to send a reset email"}');

      //Sweet Alert
      swal({
        title: "Error!",
        text: "An error occured on the server - Try again later.",
        icon: "error",
        button: "Okay"
      });

    });
  };

  //Remember me checkbox - functionality
  $(function() {
    if(localStorage.chkbx && localStorage.chkbx != '') {
      $('#remember-me-check').attr('checked', 'checked');
      $('#input-login-username').val(localStorage.username);
      $('#input-login-password').val(localStorage.password);
    } else {
      $('#remember-me-check').removeAttr('checked');
      $('#input-login-username').val('');
      $('#input-login-password').val('');
    }

    $('#remember-me-check').click(function() {
      if($('#remember-me-check').is(':checked')) {
        //Save username and password
        localStorage.username = $('#input-login-username').val();
        localStorage.password = $('#input-login-password').val();
        localStorage.chkbx = $('#remember-me-check').val();
      } else {
        localStorage.username = '';
        localStorage.password = '';
        localStorage.chkbx = '';
      }
    });
  });
  
});

