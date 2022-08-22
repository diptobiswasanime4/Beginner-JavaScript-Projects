function displayDateTime() {
  var currentDateTime = new Date();
  var dateTime =
    "Last Sync: " +
    currentDateTime.getDate() +
    "/" +
    (currentDateTime.getMonth() + 1) +
    "/" +
    currentDateTime.getFullYear() +
    " @ " +
    currentDateTime.getHours() +
    ":" +
    currentDateTime.getMinutes() +
    ":" +
    currentDateTime.getSeconds();
  var dateTime = `<h2>${dateTime}</h2>`;
  document.getElementById("time").innerHTML = dateTime;
}

setInterval(displayDateTime, 10);
