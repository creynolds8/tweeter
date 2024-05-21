$(() => {
  console.log('loaded!');

  $('form textarea').on('input', () => {
    let tweetLength = $('#tweet-text').val().length
    let counter = document.getElementById('counter')
    counter.innerHTML = 140 - tweetLength;
  })

})