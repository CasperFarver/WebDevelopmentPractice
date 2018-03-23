//Function that runs when document is loaded
$(document).ready(function() {
  
  //Gets called when document has loaded
  $.ajax({
    "method" : "GET",
    "url" : "../api/get-recommendations.php",
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
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/5-stars.png');
          break;
        case 4:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/4-stars.png');
          break;
        case 3:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/3-stars.png');
          break;
        case 2:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/2-stars.png');
          break;
        case 1:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/1-star.png');
          break;
        case 0:
          sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../img/0-star.png');
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

  swal({
    title: "Error!",
    text: "There is no user with such a verification code registred! Please contact the administrator.",
    icon: "error",
    buttons: "Okay"
  }).then(function(){
      //TODO: Redirect to user-profile page
      //Need to start a session somewhere
      //Need to bring the userID along aswell somehow
      window.location.href = '../index.html';
  });
  
});

