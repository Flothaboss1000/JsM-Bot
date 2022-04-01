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

function typer(res) {
  for (let i = 0; i < res.length; i++) {
    setTimeout(() => {
      document.getElementById("console").innerHTML =
        res.substr(0, i + 1) + `<span id="cursor">|</span>`;
    }, 3 * (i + 1));
  }
}

// var userdata = {
//   ip: "",
//   pings: 0,
//   interactions: {
//     clicks: 0,
//     scrolls: 0,
//     errors: 0,
//   },
//   duration: null,
// };

window.onload = async function () {
  await fetch("./assets/consoletxt.txt")
    .then((res) => res.text())
    .then((res) => {
      if (document.getElementById("console") != null) typer(res);
    });

  await fetch("https://jsmapi.jsmsj.repl.co/announce")
    .then((e) => e.json())
    .then(async (japi) => {
      console.log(japi.status);
      console.log(`Text: ${japi.text}`);
      if (japi.status === 0) {
        navbar.self.remove();
      }
      if (japi.text === "") {
        navbar.text.innerHTML = japi.statusmsg[japi.status];
      } else {
        navbar.text.innerHTML = japi.text;
      }
      navbar.icon.innerHTML = japi.statusicon[japi.status];

      if (japi.status != 0) {
        navbar.self.style.backgroundColor = japi.statuspalette[japi.status][0];
        navbar.icon.style.backgroundColor = japi.statuspalette[japi.status][1];
        navbar.icon.style.color = japi.statuspalette[japi.status][2];
        navbar.text.style.color = japi.statuspalette[japi.status][2];
      }
    });
  // userdata.duration = Date.now();

  // This code snippet controls when the console shoudl disappear from the screen
  if (document.getElementById("console") != null) {
    setTimeout(() => {
      var loadscreen = document.getElementById("loading");
      loadscreen.style.animationName = "loadoutro";
      loadscreen.style.animationDuration = `1s`;
      loadscreen.style.animationFillMode = "forwards";
      setTimeout(() => {
        loadscreen.style.visibility = "hidden";
      }, 1000);
    }, 1500);
  }
};
fetch("https://ipadd.jsmsj.repl.co/")
  .catch((err) => err)
  .then((e) => e.text())
  .then(async (ipres) => {
    // userdata.ip = ipres;
    if (
      window.location.href.startsWith("https://flothaboss1000.github.io/") ||
      window.location.href.startsWith("http://127.0.0.1")
    ) {
      return;
    }
    await fetch("https://jsmapi.jsmsj.repl.co/logfile", {
      method: "POST",
      body: JSON.stringify({ ip: ipres }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "TzpN2HM2.%#+QrBp",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  })
  .catch((err) =>
    fetch("https://jsmapi.jsmsj.repl.co/logfile", {
      method: "POST",
      body: JSON.stringify({ ip: "IP Not Received" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "TzpN2HM2.%#+QrBp",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  );

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
var slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4", "mySlides6"];
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);

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

function loadwidget(self) {
  document.getElementById("widgetbot").innerHTML =
    "<iframe src='https://e.widgetbot.io/channels/915922698230726667/916674642545086484' height='600' width='100%'></iframe>";
  self.remove();
}

function navbarclose() {
  document.getElementById("navbar").style.animation =
    "navbarclose 1s ease 0.5s 1 normal";
  document.getElementById("navbar").style.animationFillMode = "forwards";
  document.getElementById("navbar").style.filter = "saturate(0)";
}

navbar.self.collapsed = false;
function bannerexpandcollapse() {
  if (!navbar.self.collapsed) {
    navbar.self.style.width = "95vw";
    navbar.self.style.height = "fit-content";
    navbar.self.collapsed = true;
    navbar.text.style.visibility = "visible";
    setTimeout(() => {
      navbar.text.style.opacity = "1";
    }, 500);
    // document.getElementById("announcetext").style.visibility = "visible";
    document.getElementById("navclose").style.visibility = "visible";
    navbar.self.style.animation = "unset";
  } else {
    navbar.self.style.width = "75px";
    navbar.self.style.height = "75px";
    navbar.self.collapsed = false;
    navbar.text.style.opacity = "0";
    navbar.text.style.visibility = "hidden";
    // document.getElementById("announcetext").style.visibility = "hidden";
    document.getElementById("navclose").style.visibility = "hidden";
  }
}

// window.addEventListener("click", async () => userdata.interactions.clicks++);
// window.addEventListener("scroll", async () => userdata.interactions.scrolls++);
// window.addEventListener("error", async () => userdata.interactions.errors++);

// setInterval(async () => {
//   console.log(userdata.pings);
//   userdata.duration = Date.now() - userdata.duration;
//   if (
//     window.location.href.startsWith("https://flothaboss1000.github.io/") ||
//     window.location.href.startsWith("http://127.0.0.1")
//   )
//     return;
//   await fetch("https://jsmapi.jsmsj.repl.co/session", {
//     method: "POST",
//     body: JSON.stringify({ data: userdata }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: ")<Pu2VM[6^ubmnM#",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => console.log(res));
//   userdata.pings++;
// }, 30000);
