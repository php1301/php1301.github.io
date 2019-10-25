
// var myFunc1 = function(event) {
//     alert(1);
//     if (something) {
//         event.cancel = true;
//     }
// }
// var myFunc2 = function(event) {
//     if (event.cancel) {
//         return;
//     }
//     alert(2);
// }

// document.body.addEventListener('click', myFunc1, false);
// document.body.addEventListener('click', myFunc2, false);
// ...
var fbOnFire = false;
var myFrameReq;
function facebookFrame(){
 // array with texts to type in typewriter
 var dataText1 = [ "I'm Pham Hoang Phuc", "A junior front-end Developer and UI/UX designer", " I can develop the theme and interface of websites and applications besides", "I have trained and experienced well for Front-end", "Hence, my expertises has been strengthened with technologies and academical models", "Such as: Object-oriented Program, ReactJS, Design Pattern Responsive, Algorithm building, Material Design"];
 // type one text in the typwriter
 // keeps calling itself until the text is finished
 function typeWriter(text, i, fnCallback) {
   // chekc if text isn't finished yet
   if (i < (text.length)) {
     // add next character to h1
    document.querySelector("blockquote").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

     // wait for a while and call this function again for next character
     setTimeout(function() {
       typeWriter(text, i + 1, fnCallback)
     }, 100);
   }
   // text finished, call callback if there is a callback function
   else if (typeof fnCallback == 'function') {
     // call callback after timeout
     setTimeout(fnCallback, 700);
   }
 }
 // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText1[i] == 'undefined'){
       setTimeout(function() {
         StartTextAnimation(0);
       }, 20000);
    }
    // check if dataText[i] exists
   if (i < dataText1[i].length) {
     // text exists! start typewriter animation
    typeWriter(dataText1[i], 0, function(){
      // after callback (and whole text has been animated), start next text
      StartTextAnimation(i + 1);
    });
   }
 }
 // start the text animation
 StartTextAnimation(0);
 myFrameReq = requestAnimationFrame(StartTextAnimation)
}
document.getElementById("facebook").addEventListener('click',facebookFrame());
document.getElementById("twitter").addEventListener('click',function(event2){
    event2.preventDefault();
    console.log("ok");
    // array with texts to type in typewriter
    var dataText2 = [ "Amsterdam.", "Full Service.", "Webdevelopment.", "Wij zijn Occhio!"];
    // check if any animationr unning
    // document.getElementById("facebook").onanimationcancel = function(){return ;}
    cancelAnimationFrame(myFrameReq)

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter2(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("blockquote").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter2(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation2(i) {
       if (typeof dataText2[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation2(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText2[i].length) {
        // text exists! start typewriter animation
       typeWriter2(dataText2[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation2(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation2(0);
  });
document.getElementById("linkedin").addEventListener('click',function(event){
    console.log("ok");
    // array with texts to type in typewriter
    var dataText1 = [ "Amsterdam.", "Full Service.", "Webdevelopment.", "Wij zijn Occhio!"];
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("blockquote").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText1[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText1[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText1[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });
document.getElementById("google-plus").addEventListener('click',function(event){
    console.log("ok");
    // array with texts to type in typewriter
    var dataText1 = [ "Amsterdam.", "Full Service.", "Webdevelopment.", "Wij zijn Occhio!"];
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("blockquote").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText1[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText1[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText1[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });