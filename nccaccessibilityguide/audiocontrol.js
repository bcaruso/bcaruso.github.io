let audioQueue = new Array();

//Read the text in large print. Or read transcripts of audio only experiences.
addToReadQueue("Hello and Welcome to the National Comedy Center! This accessibility guide is design to let you experience the story of comedy. You can listen to the various printed texts throughout the museum. ");
addToReadQueue("We also provide audio descriptions to hear about the environment around you.","ad");
addToReadQueue("Swipe up and down on the left side of the screen explore the different exhibits. To play the narration for that exhibit, tap on the left of the screen. Tap on the right side of the screen to skip forward in the narration.");
addToReadQueue("Swipe up on the left side to the screen to begin.");

function addToReadQueue(text,type){
  if(audioQueue.length == 0){
    audioQueue.push({text:text,type:type});
    readQueue();
  }else{
    console.log('Added to Queue.');
    audioQueue.push({text:text,type:type});
  }
}

function addHighPriorityReadQueue(text,type){
  if(audioQueue.length == 0){
    audioQueue.unshift({text:text,type:type});
    readQueue();
  }else{
    console.log('Added High Priority to Queue.');
    audioQueue.unshift({text:text,type:type});
    readQueue();
  }
}

function readQueue(){
  console.log(audioQueue);
  if(audioQueue.length > 0){
    audio = audioQueue[0];
    if(audio.type == 'ad'){
      responsiveVoice.speak(audio.text, "US English Female", {rate: 1, onend:nextInQueue});
    }else{
      responsiveVoice.speak(audio.text, "US English Male", {rate: 1, onend:nextInQueue});
    }
  }
}

function nextInQueue(){
  audioQueue.shift();
  if(audioQueue.length > 0){
    readQueue();
  }else{
    //responsiveVoice.speak("End of Text", "US English Male", {rate: 1} );
    clear();
  }
}

function toggle(){
    responsiveVoice.speak("Invert Text and Background Color", "US English Male", {rate: 1} );
}

/*$('li').on('mouseenter', function (e) {
    console.log(e)
    e.preventDefault();
    clear();
    text = e.target.innerText;
    if(e.target.className == 'transcript'){
      text += " Transcript"
      responsiveVoice.speak(text,"US English Male", {rate: 1});
    }else if(e.target.className == 'ad'){
      text += " Audio Description";
      responsiveVoice.speak(text,"US English Female", {rate: 1});
    }else{
      responsiveVoice.speak(text,"US English Male", {rate: 1});
    }
});*/

$('#navZone').swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        responsiveVoice.speak("Swipe "+direction,"US English Male", {rate: 1});
}});

$('#navZone').swipe( {
        //Generic swipe handler for all directions
        tap:function(event, direction, distance, duration, fingerCount, fingerData) {
          responsiveVoice.speak("Tap","US English Male", {rate: 1});
}});


/*$('li').on('touchenter', function (e) {
    console.log(e)
    e.preventDefault();
    clear();
    text = e.target.innerText;
    if(e.target.className == 'transcript'){
      text += " Transcript"
      addHighPriorityReadQueue(text);
    }else if(e.target.className == 'ad'){
      text += " Audio Description";
      addHighPriorityReadQueue(text,'ad');
    }else{
      addHighPriorityReadQueue(text);
    }
});*/

function read(section){
  clear();
  $(section).children().each(function(){addToReadQueue(this.innerText,this.className);});
  //responsiveVoice.speak($(section).children().each(), "US English Female", {rate: 1});
}

function stop(){
  responsiveVoice.speak('Audio Stopped', 'US English Male', {rate: 1});
  clear();
}

function nextSection(){
  responsiveVoice.speak('Audio Stopped', 'US English Male', {rate: 1});
  clear();
}

function clear(){
  console.log("Queue Cleared")
  responsiveVoice.cancel();
  audioQueue.length = 0;
}
