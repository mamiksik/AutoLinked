// ==UserScript==
// @name             AutoLinked
// @description      One-click add matched LinkedIn "Recommended for you" people in the My Network page
// @namespace        ronald.luc
// @author           Ronald Luc,Martin Miksik
// @license          None for now
// @include          https://www.linkedin.com/*
// @version          2.3
// @match            https://www.linkedin.com/*
// @require          file:///home/martin/Documents/Dataport/AutoLinked/src/main.js
// @require          file:///home/martin/Documents/Dataport/AutoLinked/src/utilities.js
// @require          file:///home/martin/Documents/Dataport/AutoLinked/src/logic.js

// @noframes
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==


const searchResultMessage = (name) => {
    if (name.length > 10) name = '';
    return `Hi ${name}, \nI am a student at the University of Twente and I am researching what obstacles SW companies faced when dealing with ad-hoc data for data analytics. The ones that make you ask yourself “Why isn’t there a library for it?”. Would you have 5 minutes to fill in a survey for me?`
};

// Feel free to overwrite `settings` with your own settings by starting from the `default_settings` above
// Make sure to override whole key:value pairs (the whole values of the "top-level" keys get replaced
const settings = {
    delayBetweenConnections: [2001, 5003],                 // [from, to] range of delay between connection requests in ms
    batchDelay: [60 * 60 * 1000, 2 * 60 * 60 * 1000],      // [from, to] range of delay between connection sprees in ms
    limitPerBatch: [30, 36],                               // [from, to] range of  max people invited per spree
    limitPerDay: [250, 300],                               // [from, to] range of max people invited per day
    bathToDownload: 200,                                   // Once this limit is reached connections are exported to file
    pageLoadCooldown: [4500, 5000],                        // [from, to] range of waiting for page load
    searchPage: {
        includePattern: {                                  // RegExps of peoples bio, to be connected to (keys are for clarity and ignored)
            position: "data engineer|data scientist",
            keywords: "ETL|BI|data warehouse|data management|data analytics|big data|data pipelines|data solutions",
            other: "lab department"
        },
        excludePattern: {                                  // RegExps of peoples bio, to be always excluded from connecting to (keys are for clarity and ignored)
            hr: "headhunt|talent|trainer|sourcing|people|HR|recruit",
        },
        namePattern: /^([\w\-]+)/i,
    },
    messages: {
        search: searchResultMessage,
    }
};


// const iterMyNetworkPage = async () => {
//     // Make one connection
//     const {includePattern, excludePattern} = generateRegexps();
//     const profileToConnect = Array.from(
//         document.querySelectorAll(querySelectors.myNetwork.profileCard)
//     ).find(profile => {
//         const rawContent = profile.textContent;
//         const [include, exclude] = [rawContent.match(includePattern), rawContent.match(excludePattern)];
//         const connectButton = profile.querySelector(querySelectors.myNetwork.connectButton);
//         return (include !== null && exclude === null && connectButton !== null);
//     });
//
//     if (profileToConnect !== null) {
//         // Open the connection dialog
//         profileToConnect.querySelector(querySelectors.myNetwork.connectButton).click();
//
//         //TODO: Wait for delayBetweenConnections
//         const result = await connectToUser('', '');
//         if (result !== null) logConnection(result);
//         return 1;
//     }
//
//     return 0;
// }