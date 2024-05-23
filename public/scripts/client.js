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
  <span><img src=${safeText(tweet.user.avatars)}/>${safeText(tweet.user.name)}</span>
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
    $('#tweets-container').empty();
    renderTweets(res);
  });
};

$(() => {
  loadTweets();

  // add event handler to leverage jQuery to hide and show compose tweet section
  $('.new-tweet-link').on('click', event => {
    $('.new-tweet').css('display', 'flex');
    $('#tweets-container').css('margin', 'auto')
  })

  $("form").on("submit", (event) => {
    event.preventDefault();
    console.log($("form").serialize());
    let tweetLength = $("#tweet-text").val().length;
    if (tweetLength > 140) {
      $('#error-message span').removeAttr('hidden').text("Sorry, that tweet is too long.\nPlease remove some text");
    } else if (tweetLength === 0) {
      $('#error-message span').removeAttr('hidden').text("Sorry, that tweet is too short.\nPlease enter some text");
    } else {
      $.post({
        url: "/tweets",
        data: $("form").serialize(),
      })
      .then(() => {
        loadTweets();
        $('form textarea').val('');
        $('#counter').val(140);
      });
    }
  });
});
