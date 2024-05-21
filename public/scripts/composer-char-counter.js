$(() => {
  console.log("loaded!");

  $("form textarea").on("input", () => {
    let tweetLength = $("#tweet-text").val().length;
    let counter = document.getElementById("counter");
    counter.innerHTML = 140 - tweetLength;
    if (counter.innerHTML <= 0) {
      document.getElementById("counter").style.color = "red";
    } else {
      document.getElementById("counter").style.color = "inherit";
    }
  });
});
