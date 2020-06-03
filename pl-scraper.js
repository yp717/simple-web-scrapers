// pl-scraper.js

// Promise based HTTP client for Node.js and the browser
const axios = require('axios');
// jQuery implementation for Node.js. Cheerio makes it easy to select, edit, and view DOM elements
const cheerio = require('cheerio');

// Puppeteer: A Node.js library for controlling Google Chrome or Chromium

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $('.statsTableContainer > tr');
        const topPremierLeagueScorers = [];

        statsTable.each(function () {
            const rank = $(this).find('.rank > strong').text();
            const playerName = $(this).find('.playerName > strong').text();
            const nationality = $(this).find('.playerCountry').text();
            const goals = $(this).find('.mainStat').text();

            topPremierLeagueScorers.push({ 
                rank,
                name: playerName,
                nationality,
                goals,
            });
        });  

        console.log(topPremierLeagueScorers);
    })
    .catch(console.error);


// Some websites rely exclusively on JavaScript to 
// load their content, so using an HTTP request library
// like axios to request the HTML will not work because
// it will not wait for any JavaScript to execute like
// a browser would before returning a response

// That's where Puppeteer comes in. It is a library
// that allows you to control a headless browser from
// a Node.js script. A perfect use case for this library
// is scraping pages that require JavaScript execution.

