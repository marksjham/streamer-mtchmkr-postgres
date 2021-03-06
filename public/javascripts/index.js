$(()=>{
    // once page is loaded
    $("#streamer-quiz-form").steps({
      headerTag: "h3",
      bodyTag: "fieldset",
      transitionEffect: "fade",
      transitionEffectSpeed: 500,
      onStepChanging: function (event, currentIndex, newIndex) { 
        return true; },
      onStepChanged: function (event, currentIndex, priorIndex) { 
        return true;
    }, 
    });


    
    var minSlider = document.getElementById("minSlider");
    var minOutput = document.getElementById("minViewer");
    minOutput.innerHTML = minSlider.value;

    minSlider.oninput = function () {
	    minOutput.innerHTML = this.value;
	}
	
    var maxSlider = document.getElementById("maxSlider");
    var maxOutput = document.getElementById("maxViewer");
    maxOutput.innerHTML = maxSlider.value;

    maxSlider.oninput = function () {
    maxOutput.innerHTML = this.value;
}

});


function calculateQuizResult(){
  // Fake quiz results to force a streamer response 
  var quizResults = [
    true,
    false,
    4,
    5,
    "high",
    true,
    15
];
  
  // Send the results to the server
  $.ajax({
      beforeSend: displayResultMessage(`Sending Quiz Results ${JSON.stringify(quizResults)} to server...`),
      url:"/calculateStreamer",
      type: "POST",
      data: {quizResults},
      success: function (data) { 
          console.log(data)
          setSuccess(data.Error==null);
          if(data.Error != null){
              displayOutput(`<br/>${data.Error}`);
          } else {
              displayOutput(`<br/>Result: ${JSON.stringify(data.Results)}`);
          }
      },
      complete: function(xhr, status) {
        if (status == 'error') {
          console.log('error')
        }
      }
    });
}


function displayOutput(text){
  $('#quiz-results-display').append(text);
}

function setSuccess(success){
  if(success){
      $("#get-result-button").addClass("btn-success");
      $("#get-result-button").removeClass("btn-danger");
  } else {
      $("#get-result-button").addClass("btn-danger");
      $("#get-result-button").removeClass("btn-success");
  }
}

function displayResultMessage(message){
  $("#quiz-results-display").text(message);
}
