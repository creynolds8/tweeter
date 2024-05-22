/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
  const defaultImg = "https://i.imgur.com/73hZDYK.png";
  const defaultName = "DEV";
  const defaultHandle = "@DEV";
  const newTweet = $(`
  <article class="tweet">
  <header>
  <span><img src=${tweet.user.avatars}/>${tweet.user.name}</span>
  ${tweet.user.handle}
  </header>
  <p>
  ${tweet.content.text}
  </p>
  <footer>
  ${timeago.format(tweet.created_at)}
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
    renderTweets(res);
  });
};

$(() => {
  loadTweets();

  $("form").on("submit", (event) => {
    event.preventDefault();
    console.log($("form").serialize());
    let tweetLength = $("#tweet-text").val().length;
    if (tweetLength > 140) {
      alert("Sorry, that tweet is too long.\nPlease remove some text");
    } else if (tweetLength === 0) {
      alert("Sorry, that tweet is too short.\nPlease enter some text");
    } else {
      $.post({
        url: "/tweets",
        data: $("form").serialize(),
      })
      .then(() => {
        loadTweets();
        $('form textarea').val('');
      });
    }
  });
});
