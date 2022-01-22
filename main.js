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
let navbar = {
  self: document.getElementById("navbar"),
  text: document.getElementById("announce"),
  icon: document.getElementById("navicon"),
};
const statusmsg = {
  1: "There is currently an outage with the bot. Please bear with us.",
  2: "The bot is currently down for a fix or an update.",
  3: "We've updated the bot! Check out its new features!",
  4: "Update coming soon...",
  5: "Event coming soon...",
  6: "We are about to reach a new milestone!",
  7: "An internal API is down, some commands won't work.",
  8: "Like the bot? Support us by voting for the bot or boosting our support server!",
  9: "Internal error, bot will stay online, might not respond.",
  99: "Welcome to JsM Bot. Happy to serve you!",
};
const statusicon = {
  1: "report_gmailerrorred",
  2: "construction",
  3: "new_releases",
  4: "update",
  5: "event",
  6: "celebration",
  7: "error",
  8: "campaign",
  9: "warning",
  99: "announcement",
};

window.onload = async function () {
  fetch("./assets/consoletxt.txt")
    .then((res) => res.text())
    .then((res) => typer(res));

  function typer(res) {
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      setTimeout(() => {
        document.getElementById("console").innerHTML =
          res.substr(0, i + 1) + `<span id="cursor">|</span>`;
      }, 3 * (i + 1));
    }
  }

  await fetch("https://jsmapi.jsmsj.repl.co/announce")
    .then((e) => e.json())
    .then(async (japi) => {
      console.log(japi);
      if (japi.status === 0) {
        navbar.self.remove();
      }
      if (japi.text === "") {
        navbar.text.innerHTML = statusmsg[japi.status];
      } else {
        navbar.text.innerHTML = japi.text;
      }
      navbar.icon.innerHTML = statusicon[japi.status];
    });

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
};

fetch("./assets/update.json")
  .then((e) => e.json())
  .then((f) => {
    g = f.title.replace("Update ", "Site Version ");
    document.getElementById("ver").innerHTML = g;
  });

// jsmsj API

//Get the button:
var totop = document.getElementById("totop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (
    document.body.scrollTop > 590 ||
    document.documentElement.scrollTop > 590
  ) {
    totop.style.bottom = "20px";
  } else {
    totop.style.bottom = "-100px";
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
