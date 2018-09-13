let audioQueue = new Array();
let currentSection = '#lobby';
let sectionIndex = 0;
let sections = new Array();

//Read the text in large print. Or read transcripts of audio only experiences.
addToReadQueue("Hello and Welcome to the National Comedy Center! This accessibility guide is design to let you experience the story of comedy. You can listen to the various printed texts throughout the museum. ");
addToReadQueue("We also provide audio descriptions to hear about the environment around you.","ad");
addToReadQueue("Swipe up and down on the left side of the screen to explore the different exhibits.");
addToReadQueue("When an exhibit is selected, to play the narration, tap on the left of the screen.");
addToReadQueue("While the narration is playing you can skip ahead by, tapping on the right side of the screen.");
addToReadQueue("Let's Get Laughing! Swipe up on the left side to the screen to begin.");

//Set Sections
console.log($('nav ol').children().each(function(){ sections.push($(this).attr('href'))}));
currentSection = sections[sectionIndex];

console.log(currentSection);
console.log(sections);

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

function readLi(id){
    clear();
    target = $('a[href="'+id+'"]').children()[0];
    text = target.innerText;
    if(target.className == 'transcript'){
      text += " Transcript"
      responsiveVoice.speak(text,"US English Male", {rate: 1});
    }else if(target.className == 'ad'){
      text += " Audio Description";
      responsiveVoice.speak(text,"US English Female", {rate: 1});
    }else{
      responsiveVoice.speak(text,"US English Male", {rate: 1});
    }
};

function nextSection(){
  if(sectionIndex >= 0 && sectionIndex <= sections.length-2){
    sectionIndex++;
    //Swap what is shown
    $('a[href="'+currentSection+'"]').toggle();
    $('a[href="'+sections[sectionIndex]+'"]').toggle();
    readLi(sections[sectionIndex]);
    //Change currentSection
    currentSection=sections[sectionIndex];
  }else{
    readLi(currentSection);
  }
}

function previousSection(){
  if(sectionIndex > 0 && sectionIndex <= sections.length){
    sectionIndex--;
    //Swap what is shown
    $('a[href="'+currentSection+'"]').toggle();
    $('a[href="'+sections[sectionIndex]+'"]').toggle();
    readLi(sections[sectionIndex]);
    //Change currentSection
    currentSection=sections[sectionIndex];
  }
}

$('#navZone').swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          console.log(direction);
          if(direction === 'up'){
            nextSection();
          }else if (direction === 'down'){
            previousSection();
          }
}});

$('#navZone').swipe( {
        //Generic swipe handler for all directions
        tap:function(event, direction, distance, duration, fingerCount, fingerData) {
          read(currentSection);
        }});

$('#audioZone').swipe( {
        //Generic swipe handler for all directions
        tap:function(event, direction, distance, duration, fingerCount, fingerData) {nextInQueue();}});

document.addEventListener("touchstart", function(){}, true);

function read(section){
  clear();
  $(section).children().each(function(){addToReadQueue(this.innerText,this.className);});
}

function stop(){
  responsiveVoice.speak('Audio Stopped', 'US English Male', {rate: 1});
  clear();
}

function clear(){
  console.log("Queue Cleared")
  responsiveVoice.cancel();
  audioQueue.length = 0;
}
