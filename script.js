// script here

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const NextQuote = document.getElementById("next-quote");
const loader = document.getElementById("loader");

let apiQuotes = [] 

//loading icon show
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

//finished loading
function finishedLoading(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// rendering quote
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // checking if the author is unlnown or not
    if (!quote.author) {
     authorText.textContent = 'Anonymous';
    } else {
     authorText.textContent = quote.author;
    }
    
    //checking if the quote length is equal according to the screen window
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    finishedLoading();
};

// fetching data from the api
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error){
    }
}

//working on buttons
function tweetThis (){
    const twUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twUrl, '_blank');
}

//adding event listeners
NextQuote.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetThis);

getQuotes();  
