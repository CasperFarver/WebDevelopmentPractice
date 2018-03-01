//Function that runs when document is loaded
$(document).ready(function() {
  $.ajax({
    "method" : "GET",
    "url" : "../tinder/api/get-recommendations.php",
    "dataType" : "JSON",
  }).done(function(data){
    
    //Template - {{}} is a placeholder
    var sTemplate = `
                      <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="{{imageURL}}" alt="User image">
                        <div class="card-body">
                          <h5 class="card-title">{{firstName}}</h5>
                          <p class="card-text">{{description}}</p>
                          <img src="{{recommendation}}" alt="recommendation">
                        </div>
                      </div>
                    `;

    //Looping through the first 3 in the recommendation list                
    for (i = 0; i < data.length; i++) {
      
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
      
      if (data[i].recommendation == 5) {
        sTemplateCopy = sTemplateCopy.replace( '{{recommendation}}', '../tinder/img/5-stars.png');    
      }

      //Append the sTemplateCopy to the div with id
      $('#users').append(sTemplateCopy);
    }  
  
  }).fail(function(){
    console.log('{"status" : "error", "message" : "Something went wrong, trying to retrieve the data"}');
  });
});