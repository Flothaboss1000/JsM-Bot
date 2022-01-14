filterSelection("all");

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("cmdbtn");
console.log(btns);
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
window.onload = function () {
  // This code snippet controls when the console shoudl disappear from the screen
  setTimeout(() => {
    var loadscreen = document.getElementById("loading");
    loadscreen.style.animationName = "loadoutro";
    loadscreen.style.animationDuration = `1s`;
    loadscreen.style.animationFillMode = "forwards";
    setTimeout(() => {
      loadscreen.style.visibility = "hidden";
    }, 1000);
  }, 1500);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 1401);
};

fetch("./assets/update.json")
  .then((e) => e.json())
  .then((f) => {
    g = f.title.replace("Update ", "Site Version ");
    document.getElementById("ver").innerHTML = g;
  });

//Get the button:
var totop = document.getElementById("totop");
var navbar = document.getElementById("navbar");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (
    document.body.scrollTop > 590 ||
    document.documentElement.scrollTop > 590
  ) {
    totop.style.bottom = "20px";
    navbar.style.top = "5px";
  } else {
    totop.style.bottom = "-100px";
    navbar.style.top = "-150px";
  }
};

function scrollToTop() {
  window.scrollTo(0, 0);
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var slideIndex = [1, 1, 1, 1, 1, 1];
var slideId = [
  "mySlides1",
  "mySlides2",
  "mySlides3",
  "mySlides4",
  "mySlides5",
  "mySlides6",
];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);

function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}

var Typer = {
  text: null,
  accessCountimer: null,
  index: 0, // current cursor position
  speed: 1, // speed of the Typer
  file: "", //file, must be setted
  accessCount: 0, //times alt is pressed for Access Granted
  deniedCount: 0, //times caps is pressed for Access Denied
  init: function () {
    // inizialize Hacker Typer
    accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500); // inizialize timer for blinking cursor
    $.get(Typer.file, function (data) {
      // get the text file
      Typer.text = data; // save the textfile in Typer.text
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content: function () {
    return $("#console").html(); // get console content
  },

  write: function (str) {
    // append to console content
    $("#console").append(str);
    return false;
  },

  makeAccess: function () {
    //create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
    Typer.hidepop(); // hide all popups
    Typer.accessCount = 0; //reset count
    var ddiv = $("<div id='gran'>").html(""); // create new blank div and id "gran"
    ddiv.addClass("accessGranted"); // add class to the div
    ddiv.html("<h1>ACCESS GRANTED</h1>"); // set content of div
    $(document.body).prepend(ddiv); // prepend div to body
    return false;
  },
  makeDenied: function () {
    //create Access Denied popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
    Typer.hidepop(); // hide all popups
    Typer.deniedCount = 0; //reset count
    var ddiv = $("<div id='deni'>").html(""); // create new blank div and id "deni"
    ddiv.addClass("accessDenied"); // add class to the div
    ddiv.html("<h1>ACCESS DENIED</h1>"); // set content of div
    $(document.body).prepend(ddiv); // prepend div to body
    return false;
  },

  hidepop: function () {
    // remove all existing popups
    $("#deni").remove();
    $("#gran").remove();
  },

  addText: function (key) {
    //Main function to add the code
    if (key.keyCode == 18) {
      // key 18 = alt key
      Typer.accessCount++; //increase counter
      if (Typer.accessCount >= 3) {
        // if it's presed 3 times
        Typer.makeAccess(); // make access popup
      }
    } else if (key.keyCode == 20) {
      // key 20 = caps lock
      Typer.deniedCount++; // increase counter
      if (Typer.deniedCount >= 3) {
        // if it's pressed 3 times
        Typer.makeDenied(); // make denied popup
      }
    } else if (key.keyCode == 27) {
      // key 27 = esc key
      Typer.hidepop(); // hide all popups
    } else if (Typer.text) {
      // otherway if text is loaded
      var cont = Typer.content(); // get the console content
      if (cont.substring(cont.length - 1, cont.length) == "|")
        // if the last char is the blinking cursor
        $("#console").html(
          $("#console")
            .html()
            .substring(0, cont.length - 1)
        ); // remove it before adding the text
      if (key.keyCode != 8) {
        // if key is not backspace
        Typer.index += Typer.speed; // add to the index the speed
      } else {
        if (Typer.index > 0)
          // else if index is not less than 0
          Typer.index -= Typer.speed; //	remove speed for deleting text
      }
      var text = Typer.text.substring(0, Typer.index); // parse the text for stripping html enities
      var rtn = new RegExp("\n", "g"); // newline regex

      $("#console").html(text.replace(rtn, "<br/>")); // replace newline chars with br, tabs with 4 space and blanks with an html blank
      window.scrollBy(0, 50); // scroll to make sure bottom is always visible
    }
    if (key.preventDefault && key.keyCode != 122) {
      // prevent F11(fullscreen) from being blocked
      key.preventDefault();
    }
    if (key.keyCode != 122) {
      // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    // blinking cursor
    var cont = this.content(); // get console
    if (cont.substring(cont.length - 1, cont.length) == "|")
      // if last char is the cursor
      $("#console").html(
        $("#console")
          .html()
          .substring(0, cont.length - 1)
      );
    // remove it
    else this.write("|"); // else write it
  },
};

function replaceUrls(text) {
  var http = text.indexOf("http://");
  var space = text.indexOf(".me ", http);
  if (space != -1) {
    var url = text.slice(http, space - 1);
    return text.replace(url, '<a href="' + url + '">' + url + "</a>");
  } else {
    return text;
  }
}
Typer.speed = 11; //This is the actual variable to modify the speed
Typer.file = "./assets/consoletxt.txt";
Typer.init();

var timer = setInterval("t();", 30);
function t() {
  Typer.addText({ keyCode: 123748 });
  if (Typer.index > Typer.text.length) {
    clearInterval(timer);
  }
}
