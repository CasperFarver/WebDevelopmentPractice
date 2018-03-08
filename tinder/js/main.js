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

  
  //Keyup on username input field for login
  $('#input-login-username').keyup(function() {
    validateUsername();
  });

  //Keyup on password input field for login
  $('#input-login-password').keyup(function() {
    validatePassword();
  });

  //On submit, call/run the validateLogin()
  $('#frm-login').submit(function(event) {
    validateLogin();
    event.preventDefault();
  });

  //FUNCTIONS
  //---------
  //Function that validates the username
  function validateUsername() {

    //Regex that checks username: only letters, numbers, dashes and underscores. Between 6 and 16 chars.
    var usernameRegex = /^[a-zA-Z0-9_-]{5,16}$/;

    if($('#input-login-username').val().match(usernameRegex)) {
      $('#input-login-username').css('border-color', 'green');
    } else {
      $('#input-login-username').css('border-color', 'red');
    }
  }

  //Function that validate the password
  function validatePassword() {
    
    //Match 6 to 15 character string with at least one upper case letter, one lower case letter, and one digit
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,15}$/;

    if($('#input-login-password').val().match(passwordRegex)) {
      $('#input-login-password').css('border-color', 'green');
    } else {
      $('#input-login-password').css('border-color', 'red');
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
          text: "You have successfully been logged in",
          icon: "success",
          timer: 2500,
          buttons: false
        }).then(function(){
            //TODO: Redirect to user-profile page
            //Need to start a session somewhere
            //Need to bring the userID along aswell somehow
            window.location.href = '';
        }); 

      } else if(data.status == 'pending'){
          //console.log('Activation is required');    //Only for test

          swal({
            title: "Activation required!",
            text: "You need to activate your account through the link we sent you in an email during the signup process. ",
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
    });
  }

  
});

