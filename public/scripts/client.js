/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
  const defaultImg = "https://i.imgur.com/73hZDYK.png";
  const defaultName = 'DEV';
  const defaultHandle = '@DEV'
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
  </div>`);
  return newTweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const loadTweets = function() {
  $.get({
    url: 'http://localhost:8080/tweets'
  })
  .then(res => {
    renderTweets(res)
  })
}

$(() => {
  loadTweets()
  // renderTweets(tweetData);

  $("form").on("submit", (event) => {
    event.preventDefault();
    console.log($("form").serialize());
    $.post({
      // type: 'post',
      url: "/tweets",
    })
      // .then((res) => {
      //   createTweetElement(res.title);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  });
});
