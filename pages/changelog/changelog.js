window.onload = async function () {
  await fetch("https://jsmapi.jsmsj.repl.co/changelog")
    .then((e) => e.json())
    .then(async (japi) => {
      console.log(japi);
      japi.changelog.forEach((jlog) => {
        var item = document.createElement("div");
        item.className = "container";
        var list = jlog.changes.join("</li>\n<li>");
        item.innerHTML = `
        <div id='ts'>
        <h3>${jlog.date}</h3>
        <h3>${jlog.time}</h3>
        <h4>${timeDifference(Date.now(), jlog.timestamp * 1000)}</h4>
        </div>
        <h2>${jlog.version}</h2>
        <ul>
        <li>${list}</li>
          </ul>
          `;
        document.getElementById("main").appendChild(item);
      });
    });
};
function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;
  var tsmsg = "";

  if (elapsed < msPerMinute) {
    tsmsg = Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    tsmsg = Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    tsmsg = Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    tsmsg = Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    tsmsg = Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    tsmsg = Math.round(elapsed / msPerYear) + " years ago";
  }
  if (tsmsg.startsWith("1 ")) tsmsg = tsmsg.replace("s ago", " ago");
  return tsmsg;
}
