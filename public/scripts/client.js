/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const safeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  const newTweet = $(`
  <article class="tweet">
  <header>
  <span><img src=${safeText(tweet.user.avatars)}/>${safeText(
    tweet.user.name
  )}</span>
  ${safeText(tweet.user.handle)}
  </header>
  <p>
  ${safeText(tweet.content.text)}
  </p>
  <footer>
  ${safeText(timeago.format(tweet.created_at))}
  <div class="icons">
  <div>
  <i class="fa-solid fa-heart"></i>
  </div>
  <div>
  <i class="fa-solid fa-retweet"></i>
  </div>
  <div>
  <i class="fa-solid fa-flag"></i>
  </div>
  </div>`);
  return newTweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const loadTweets = function () {
  $.get({
    url: "http://localhost:8080/tweets",
  }).then((res) => {
    $("#tweets-container").empty();
    renderTweets(res);
  });
};

const toggleNewTweet = function () {
  if ($(".new-tweet").is(":visible")) {
    $(".new-tweet").slideUp(2000);
  } else {
    $(".new-tweet").slideDown(1000);
    $("#tweets-container").css("margin-top", "0");
    $("#tweet-text").focus();
  }
};

const validateTweet = function (length) {
  if (length > 140) {
    $("#error-message span")
      .css("display", "block")
      .text("Sorry, that tweet is too long.\nPlease remove some text");
    setTimeout(() => {
      $("#error-message span").css("display", "none");
    }, 6000);
  } else if (length === 0) {
    $("#error-message span")
      .css("display", "block")
      .text("Sorry, that tweet is too short.\nPlease enter some text");
    setTimeout(() => {
      $("#error-message span").css("display", "none");
      $("#counter").css("color", "#333");
    }, 6000);
    return true;
  }
};

$(() => {
  loadTweets();

  $(".new-tweet-link").on("click", (event) => {
    toggleNewTweet();
  });

  $("form").on("submit", (event) => {
    event.preventDefault();

    let tweetLength = $("#tweet-text").val().length;
    if (validateTweet(tweetLength)) {
      $.post({
        url: "/tweets",
        data: $("form").serialize(),
      }).then(() => {
        loadTweets();
        $("form textarea").val("");
        $("#counter").val(140);
      });
    }
  });
});
