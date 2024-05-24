$(() => {
  $("form textarea").on("input", function() {
    let tweetLength = $(this).val().length;
    let counter = $(this).siblings("#button-counter").find("#counter");
    counter.html(140 - tweetLength);
    if (counter.html() <= 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "inherit");
    }
  });
});
