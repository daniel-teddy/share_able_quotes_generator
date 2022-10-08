const quoteText = document.querySelector(".quote-text"),
quoteBtn = document.querySelector("button"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
tweetBtn = document.querySelector(".tweet"),
quoteAuth = document.querySelector(".name");

// randomquote function

function randomQuote(){
    quoteBtn.classList.add("active");
    quoteBtn.innerHTML = "Loading ..."; // changes the text when loading
    // fetch data from the API and parse it inyo the JS object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{

       
        // now we take the content from the api directly into our html
        quoteText.innerHTML = result.content;
        quoteAuth.innerHTML = result.author;
        quoteBtn.innerHTML = "Refresh"; // to change back the text when done loading
        quoteBtn.classList.remove("active");
    });
}




soundBtn.addEventListener("click", () => {
    // the speechfSynthesisUtterance is a web api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${quoteAuth.innerHTML}`);
    speechSynthesis.speak(utterance); // method from speechSynthesis to speak the utterance
});

copyBtn.addEventListener("click", () => {
    // this method allows us to copy the text when the event listener detects a click
    // the writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerHTML);
});

tweetBtn.addEventListener("click", () => {
    //defining the twitter url to be used when we click on the button 
    // this could have been done easilly in html but we preffered to use javascript to be able to
    // open in a new tab
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerHTML}
    ~ ${quoteAuth.innerHTML}`;
    window.open(tweetUrl, "_blank"); 
    // here above we tell the programm to open a new tab with the quote passed in the url
    // to auto write it as a new tweet
});

quoteBtn.addEventListener("click", randomQuote);