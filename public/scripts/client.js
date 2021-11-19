/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import { format, render, cancel, register } from 'timeago.js';
const data = [
    {
        "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
        },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    },
    {
        "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd"
        },
        "content": {
            "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
    }
]
const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    for (const tweetdata of tweets) {
        let tweetElement = createTweetElement(tweetdata);
        $(".article-tweet").prepend(tweetElement);
    }
}
const createTweetElement = function (tweet) {
    let $tweet = $(
        `<div class="allData">
        <div class="toptweet">
        <div class="headertweet">
          <img src="${escape(tweet.user.avatars)}" class="img" height="50px" width="50px">
          <label class="name">${escape(tweet.user.name)}</label>
          </div>
          <label class="handle">${escape(tweet.user.handle)}</label> 
        </div>
        <label class="text">${escape(tweet.content.text)}</label> 
        <hr>
        <footer class="footer">
        <span class="manage-day"><b>${escape(timeago.format(tweet.created_at))}</b></span>
        <span class="icon">
        <i class="fas fa-flag" id="flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
        </span>    
        </footer>
        <div>`);

    return $tweet;
}
const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};
$(document).ready(function () {
    // renderTweets(data);
    $("#target").submit(function (event) {
        //   alert("hello");
        event.preventDefault();
        const text = $("#tweet-text").first().val();
        if (text === "") {
            $(".new-tweet .error").text("please enter some textÍ");
            $(".new-tweet .error").slideDown("slow");
        } else if (text.length > 140) {
            $(".new-tweet .error").text("length is to longÍ");
            $(".new-tweet .error").slideDown("slow");
            // alert("length is to long");
        } else {
            const time = event.timeStamp;
            //   alert(`Handler for .submit() called.${text}${time}` );
            const value = $(this).serialize();
            console.log(value);
            $.post("/tweets", value, function (data) {
            })
                .done(function () {
                    $("#target").trigger("reset");
                    $(".counter").html(140);
                    $(".new-tweet .error").hide();
                    loadTweets();

                })
        }
    });
    const loadTweets = function () {
        $.ajax('/tweets', { method: 'GET' })
            .then(function (tweets) {
                console.log(tweets)
                renderTweets(tweets);
            });
    }
    loadTweets();
});

// const createTweetElement = function(tweetData) {

// }
//const $tweet = createTweetElement(tweetData);
 // Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

