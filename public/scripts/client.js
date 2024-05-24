/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/**
 * This function is designed to take in input from the user and render it safe
 * to post to the website to prevent malicious text being passed through
 * 
 * @param {string} str - the given input from a user
 * @returns {string} - the sanatized text ready to posted to the website
 */

const safeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * This function extracts each value from the passed in object, leverages the safeText
 * function to clean that value, then interoplates those cleaned values in the HTML
 * skeleton for a new tweet
 * 
 * @param {object} tweet - an object containing the user's name, avatar, handle, and
 * tweet content
 * @returns newTweet - a variable representing a interpolated HTML article element with the
 * values passed in from the tweet object
 */

const createTweetElement = function(tweet) {
  const newTweet = $(`
  <article class="tweet">
  <header>
  <span><img src=${safeText(tweet.user.avatars)}/>
  ${safeText(tweet.user.name)}</span>
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

/**
 * This function loops through the array of tweets, leverages the createTweetElement 
 * function then adds each tweet to the HTML section responsible for displaying all
 * tweets using jQuery
 * 
 * @param {array} tweets - an array containing objects where each object contains user info
 */

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

/**
 * This function uses jQuery to get the array of tweets from the database, then leverages
 * the renderTweets function and jQuery to clear and render all tweets from the database.
 * Tweets are cleared and reloaded to ensure accurate data is presented to the user
 */

const loadTweets = function() {
  $.get({
    url: "http://localhost:8080/tweets",
  }).then((res) => {
    $("#tweets-container").empty();
    renderTweets(res);
  });
};

/**
 * This function uses jQuery methods to show and hide the section containing the form
 * used to create new tweets
 */

const toggleNewTweet = function() {
  if ($(".new-tweet").is(":visible")) {
    $(".new-tweet").slideUp(1000);
  } else {
    $(".new-tweet").slideDown(1000);
    $("#tweets-container").css("margin-top", "0");
    $("#tweet-text").focus();
  }
};

/**
 * This function checks the length of a submitted tweet. If the tweet is too long or
 * too short, then a relevent error message is displayed and a timer is set to clear
 * that error after a delay. If the tweet passes length checks, a value of true is returned
 * 
 * @param {number} length - a number representing the character length of the tweet 
 * the user has submitted to be posted
 * @returns - true if the tweet is more than 0 characters and 140 characters or less
 * @returns - false if the tweet is 0 characters or more than 140 characters
 */

const validateTweet = function(length) {
  if (length > 140) {
    $("#error-message span")
      .css("display", "block")
      .text("Sorry, that tweet is too long.\nPlease remove some text");
    setTimeout(() => {
      $("#error-message span").css("display", "none");
    }, 6000);
    return false;
  } else if (length === 0) {
    $("#error-message span")
      .css("display", "block")
      .text("Sorry, that tweet is too short.\nPlease enter some text");
    setTimeout(() => {
      $("#error-message span").css("display", "none");
    }, 6000);
    return false;
  }
  return true;
};

$(() => {
  loadTweets();

  $(".new-tweet-link").on("click", () => {
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
