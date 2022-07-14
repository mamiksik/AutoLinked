// ==UserScript==
// @name             AutoLinked
// @description      One-click add matched LinkedIn "Recommended for you" people in the My Network page
// @namespace        ronald.luc
// @author           Ronald Luc,Martin Miksik
// @license          None for now
// @include          https://www.linkedin.com/*
// @version          2.2
// @match            https://www.linkedin.com/*
// @require          https://raw.githubusercontent.com/mamiksik/AutoLinked/master/src/main.js
// @require          https://raw.githubusercontent.com/mamiksik/AutoLinked/master/src/utilities.js
// @require          https://raw.githubusercontent.com/mamiksik/AutoLinked/master/src/logic.js

// @noframes
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

console.log("Base script loaded");

// Feel free to overwrite `settings` with your own settings by starting from the `default_settings` above
// Make sure to override whole key:value pairs (the whole values of the "top-level" keys get replaced
const settings = {
    delayBetweenConnections: [2001, 5003],                 // [from, to] range of delay between connection requests in ms
    batchDelay: [60 * 60 * 1000, 2 * 60 * 60 * 1000],      // [from, to] range of delay between connection sprees in ms
    limitPerBatch: [30, 36],                               // [from, to] range of  max people invited per spree
    limitPerDay: [250, 300],                               // [from, to] range of max people invited per day
    bathToDownload: 200,                                   // Once this limit is reached connections are exported to file
    pageLoadCooldown: [4500, 5000],                        // [from, to] range of waiting for page load
    myNetwork: {
        includePattern: {                                  // RegExps of peoples bio, to be connected to (keys are for clarity and ignored)

        },
        excludePattern: {                                  // RegExps of peoples bio, to be always excluded from connecting to (keys are for clarity and ignored)

        },
    },
    jobPage: {
        namePattern: /^([\w\-]+)/i,
    },
    messages: {
        search: (firstName) => `Hi, ${firstName}`,
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