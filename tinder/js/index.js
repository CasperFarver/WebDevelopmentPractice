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
  //Keyup on username input field - login
  $('#input-login-username').keyup(function() {
    validateUsernameLogin();
  });

  //Keyup on username input field - signup
  $('#input-signup-username').keyup(function() {
    validateUsernameSignup();
  });

  //Keyup on password input field - login
  $('#input-login-password').keyup(function() {
    validatePasswordLogin();
  });

  //Keyup on password input field - signup
  $('#input-signup-password').keyup(function() {
    validatePasswordSignup();
  });

  //Keyup on password input field - signup
  $('#input-signup-passwordConfirm').keyup(function() {
    validatePasswordConfirm();
  });

  //Keyup on firstName field - signup
  $('#input-signup-firstName').keyup(function() {
    validateFirstName();
  });

  //Keyup on lastName field - signup
  $('#input-signup-lastName').keyup(function() {
    validateLastName();
  });

  //Keyup on email field - signup
  $('#input-signup-email').keyup(function() {
    validateEmail();
  });


  //ON SUBMIT
  //---------
  //On submit for frm-login
  $('#frm-login').submit(function(event) {
    event.preventDefault();
    validateLogin();
  });

  //On submit for frm-forgot-password
  $('#frm-forgot-password').submit(function(event) {
    event.preventDefault();
    forgotPassword();
  });


  //FUNCTIONS
  //---------

  //LOGIN
  //Function that validates the username - login
  function validateUsernameLogin() {

    //Regex that checks username: only letters, numbers, dashes and underscores. Between 6 and 16 chars.
    var usernameRegex = /^[a-zA-ZæøåÆØÅ0-9_-]{5,16}$/;

    if($('#input-login-username').val().match(usernameRegex)) {
      $('#input-login-username').css('border-color', 'green');
    } else {
      $('#input-login-username').css('border-color', 'red');
    }
  }

  //Function that validate the password - login
  function validatePasswordLogin() {
    
    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    if($('#input-login-password').val().match(passwordRegex)) {
      $('#input-login-password').css('border-color', 'green');
    } else {
      $('#input-login-password').css('border-color', 'red');
    }
  }

  //SIGNUP
  //Function that validates firstName - signup  
  function validateFirstName() {

    //Regex that checks firstName: only letters and between 2 and 20 characters
    var nameRegex = /^[a-zA-ZæøåÆØÅ]{2,20}$/;

    if($('#input-signup-firstName').val().match(nameRegex)) {
      $('#input-signup-firstName').css('border-color', 'green'); 
    } else {
      $('#input-signup-firstName').css('border-color', 'red');
    }
  }

  //Function that validates lastName - signup 
  function validateLastName() {

    //Regex that checks firstName: only letters and between 2 and 20 characters
    var nameRegex = /^[a-zA-ZæøåÆØÅ]{2,20}$/;

    if($('#input-signup-lastName').val().match(nameRegex)) {
      $('#input-signup-lastName').css('border-color', 'green'); 
    } else {
      $('#input-signup-lastName').css('border-color', 'red'); 
    }
  }

  //Function that validates email
  function validateEmail() {
    
    //Regex that checks email
    var emailRegex= /^[a-zA-ZæøåÆØÅ0-9._%+-]+@[a-zA-ZæøåÆØÅ0-9.-]+\.[a-z]{2,3}$/;

    if($('#input-signup-email').val().match(emailRegex)) {
      $('#input-signup-email').css('border-color', 'green'); 
    } else {
      $('#input-signup-email').css('border-color', 'red'); 
    }
  }  
    

  //Function that validates the username - signup
  function validateUsernameSignup() {

    //Regex that checks username: only letters, numbers, dashes and underscores. Between 6 and 16 chars.
    var usernameRegex = /^[a-zA-ZæøåÆØÅ0-9_-]{5,16}$/;

    if($('#input-signup-username').val().match(usernameRegex)) {
      $('#input-signup-username').css('border-color', 'green');
    } else {
      $('#input-signup-username').css('border-color', 'red');
    }
  }

  //Function that validates the password - signup
  function validatePasswordSignup() {
    
    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    if($('#input-signup-password').val().match(passwordRegex)) {
      $('#input-signup-password').css('border-color', 'green');
    } else {
      $('#input-signup-password').css('border-color', 'red');
    }
  }

  //Function that validates that passwordConfirm and password are alike
  function validatePasswordConfirm() {

    if($('#input-signup-password').val() == $('#input-signup-passwordConfirm').val()) {
      $('#input-signup-passwordConfirm').css('border-color', 'green');  
    } else {
      $('#input-signup-passwordConfirm').css('border-color', 'red'); 
    }
  }


  //Function that validates the login info all together does the combo of username and password exists?
  function validateLogin() {
    
    var form = $('#frm-login');
    
    $.ajax({
      "method" : "POST",
      "url" : "../tinder/api/validate-login.php",
      "data" : form.serialize(),    //Encodes a set of form elements (in this case the form element it self) as a string for submission - What we sent to the API
      "dataType" : "JSON",    //What type we expect to receive from the API      
    }).done(function(data) {
      console.log(data);
      if(data.status == 'success') {
        //console.log('YAY');   //Only for test

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
          //console.log('Activation is required');    //Only for test

          swal({
            title: "Activation required!",
            text: "You need to activate your account.",
            icon: "info",
            button: "Roger that!"
          });

      } else {
          //console.log('DANG IT');   //Only for test

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
        })
      } else {

        //Sweet Alert
        swal({
          title: "Error",
          text: "No user with that username/email exists",
          icon: "error",
          button: "Try agian"
        })
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

