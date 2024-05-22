/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const createTweetElement = function(tweet) {
    const newTweet = $(`
    <article class="tweet">
    <header>
      <span><img src=${tweet.user.avatar}/> and ${tweet.user.name}</span>
      ${tweet.user.handle}
    </header>
      <p>
       ${tweet.content.text}
      </p>
    <footer>
      ${tweet.created_at}
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
      </div>`)
  }




})