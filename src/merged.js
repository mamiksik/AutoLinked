// ==UserScript==
// @name             AutoLinked
// @description      One-click add matched LinkedIn "Recommended for you" people in the My Network page
// @namespace        ronald.luc
// @author           Ronald Luc, Martin Miksik
// @license          None for now
// @include          https://www.linkedin.com/*
// @version          1.0

// @grant            none
// @icon             data:image/png;base64,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
// ==/UserScript==

'use strict';

window.clearTimeout = window.clearTimeout.bind(window);
window.clearInterval = window.clearInterval.bind(window);
window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);


function arrayToCSV(twoDiArray) {
    var csvRows = [];
    for (var i = 0; i < twoDiArray.length; ++i) {
        for (var j = 0; j < twoDiArray[i].length; ++j) {
            twoDiArray[i][j] = '\"' + twoDiArray[i][j] + '\"';  // Handle elements that contain commas
        }
        csvRows.push(twoDiArray[i].join(','));
    }

    var csvString = csvRows.join('\r\n');
    return csvString;
}

function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], {type: fileType});

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(',');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}

function getRandomInt(minMax, max = null) {
    let min = 0;
    if (max === null) {
        min = Math.ceil(minMax[0]);
        max = minMax[1];
    } else {
        min = Math.ceil(minMax);
    }
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTodayDate() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

function createButton(btnText, elementId, listener, offset = 0) {
    let div = document.createElement('div');
    div.innerHTML = '<a id="' + elementId + '">' + btnText + '</a>';

    div.style.display = "inline-block";
    div.style.position = "fixed";
    div.style.right = (3 + offset).toString() + "em";
    div.style.top = "5em";
    div.style.zIndex = '995';
    div.style.cursor = 'pointer';

    document.body.append(div);

    let btn = document.getElementById(elementId);

    btn.style.background = 'white';
    btn.style.color = 'blue';
    btn.style.fontWeight = '800';
    btn.style.padding = '5px';
    btn.style.border = 'solid 2px black';
    btn.style.borderRadius = '7px';
    btn.style.textDecoration = 'none';
    btn.style.fontSize = '0.8em';

    document.getElementById(elementId).addEventListener('click', () => {
        flashButton(elementId);
        listener();
    }, false);
}

function flashButton(elementId) {
    let btn = document.getElementById(elementId);
    btn.style.background = 'purple';
    btn.style.color = 'white';
    // flashes color on click
    setTimeout(function () {
        btn.style.background = 'white';
        btn.style.color = 'blue';
    }, 300);
}

function dateToString(date) {
    const today = new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return mm + '_' + dd + '_' + yyyy;
}

const delay = async (ms) => new Promise(res => setTimeout(res, ms));

const logConnection = (connection) => {
    let log = GM_getValue('invitation_logs', []);
    log.push(connection);

    if (log.size >= settings.bathToDownload) {
        saveDataToCsv(log);
        log = [];
    }

    GM_setValue(log);
}

const saveDataToCsv = (data, fileSuffix='connection-log') => {
    const date = (
        new Date(GM_getValue('day', 0))
        .toISOString()
        .slice(0,10)
    );

    const time = (
        new Date(GM_getValue('day', 0))
        .toISOString()
        .slice(11, 19)
    )

    const filename = `f${date}-${time}-${fileSuffix}.csv`
    let blob = new Blob(data, {type: 'csv'});

    // Prepare the download link
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.dataset.downloadurl = [fileType, a.download, a.href].join(',');
    downloadLink.style.display = 'none'

    // Download the file
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Final clean up
    setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
        document.body.removeChild(downloadLink);
    }, 500);
}

const querySelector = async (element, query) => {
    console.log(element);
    await delay(getRandomInt(5, 10));
    return element.querySelector(query);
}


const settings = {
    delayBetweenConnections: [2001, 5003],                 // [from, to] range of delay between connection requests in ms
    batchDelay: [60 * 60 * 1000, 2 * 60 * 60 * 1000],      // [from, to] range of delay between connection sprees in ms
    limitPerBatch: [30, 36],                               // [from, to] range of  max people invited per spree
    limitPerDay: [250, 300],                               // [from, to] range of max people invited per day
    bathToDownload: 200,                                   // Once this limit is reached connections are exported to file
    myNetwork: {
        includePattern: {                                  // RegExps of peoples bio, to be connected to (keys are for clarity and ignored)

        },
        excludePattern: {                                  // RegExps of peoples bio, to be always excluded from connecting to (keys are for clarity and ignored)

        },
    },
    jobPage: {
        namePattern: /([^,.\- ]+) [^,.\- ]+(,.+)? 2nd degree connection 2nd/i,
        employerPattern: /machine[a-z ]*learning .* at (\w+)/i
    },
//     'pruning': {
//         'old_patt': '\\d+ (week|month|year)',   // RegExp invitations to be withdrawn (proceeds once per day)
//     },
};

const main = () => {
    if (window.self !== window.top) {
        console.log("⛔ Window is not on top")
        return;
    }

    createButton('Connect!', 'connectBtn', () => connect());
    createButton('Export!', 'exportBtn', () => exportInvited(), 6);
    createButton('Reset!', 'resetBtn', () => GM_setValue('texts', []), 12);
    createButton('Prune!', 'pruneBtn', () => pruneInvitations(), 16);
    createPopup();
}

const createPopup = () => {
    let div = document.createElement('div');
    div.innerHTML = '<a id="popup">This button works on the "My Network" section only</a>';

    div.style.display = "none";
    div.style.position = "fixed";
    div.style.right = "3em";
    div.style.top = "7.5em";
    div.style.zIndex = '996';
    div.style.cursor = 'pointer';

    document.body.append(div);

    let btn = document.getElementById('popup');

    btn.style.background = 'palevioletred';
    btn.style.color = 'white';
    btn.style.marginTop = '0.5em';
    btn.style.padding = '4px';
    btn.style.borderRadius = '7px';
    btn.style.textDecoration = 'none';
    btn.style.fontSize = '1em';
}

const connect = () => {
    let url = location.pathname.split('/');

    // TODO: Check indexes
    if (url[1] === 'mynetwork' && url.length === 1) {
        return invitationCron();
    } else if (url[2].toLowerCase() === 'invite-connect') {
        console.log('🚧 This is unimplemented feature');
        // return clickThroughProfiles();
        return;
    } else if (url[1] === 'search' && url[2] === 'results') {
        return iterSearchPage();
    }

    const popup = document.getElementById('popup').parentNode;
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 4000)
}

function exportInvited() {
    saveCurrentDay();
}



const querySelectors = {
    myNetwork: {
        profileCard: 'discover-entity-type-card', //??
        connectButton: 'artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary',
    },
    jobPage: {
        profileCard: ".reusable-search__result-container",
        username: ".entity-result__title-text > a > span > span",
        connectButton: 'button[aria-label$="to connect"]', // Button with arial label that ends with 'to connect'
        nextPage: 'button[aria-label="Next"]'
    },
    invitationModel: {
        self: 'div[aria-labelledby="send-invite-modal"]',
        addCustomMessageButton: 'button[aria-label="Add a note"]',
        sendInviteButton: 'button[aria-label="Send now"]',
        messageTextfield: '#custom-message',
        continueButton: "artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view"
    }
}


const getCustomMessage = (name) => {
    // const name = contentRaw.match(regexPatterns.jobPage.name);
    // const company = contentRaw.match(regexPatterns.jobPage.employer);

    return ""
};

/**
 * Initialize day cycle.
 * Day cycle performs periodically connection sprees.
 */
const invitationCron = async (forQuery) => {
    const connectionToday = GM_getValue('conn_day', 0);
    console.log('⏰ Running invitation cron');
    console.log('📈 Invited today: ', connectionToday);

    if (Number(GM_getValue('day', 0)) !== Number(getTodayDate())) {
        saveCurrentDay()
        initNewDay();
    }

    let batchConnectionCount = 0;
    const batchLimit = getRandomInt(settings.limitPerBatch);
    while (batchConnectionCount < batchLimit) {
        batchConnectionCount += await iterSearchPage();
    }

    GM_setValue('conn_day', connectionToday + batchConnectionCount);
    if (GM_getValue('conn_day', 0) >= GM_getValue('conn_day_max', 9999)) {
        console.log('🎉 We are done for today! ');
        saveCurrentDay();
        return;
    }

    const delay = getRandomInt(settings.batchDelay);
    console.log('🕑 Next batch will run in ', delay, 'ms');
    setTimeout(() => invitationCron(), delay);
}

/**
 * Initialize the day (once a day).
 *
 * Check if now is a new day.
 * Set up old invitation pruning in the next spree waiting period.
 * Reset day parameters. Set today as the new date.
 */
const initNewDay = () => {
    console.log('🌞 Initializing new day (last_day=', Number(GM_getValue('day', 0)), ', current_day=', Number(getTodayDate()), ')');

    // TODO Fix
    // setTimeout(() => {
    //     pruneInvitations(settings, () => {
    //         gotoElementByText('My Network', 0, 'span')
    //     });
    // }, Math.floor(settings['spree_delay'][0] / 2));

    GM_setValue('conn_day', 0);
    GM_setValue('conn_day_max', getRandomInt(settings.limitPerDay));
    GM_setValue('invitation_logs', []);
    GM_setValue('day', Number(getTodayDate()));

    console.debug('🔧 Cleaning stats', {
        connectionDay: GM_getValue('conn_day'),
        connectionToday: GM_getValue('conn_today'),
        connectionDayMax: GM_getValue('conn_day_max')
    });
}

const saveCurrentDay = () => {
    console.log("💾 Saving today's invitations to csv...");
    let logs = GM_getValue('invitation_logs', []);

    if (logs.length > 0) {
        console.log(logs.length, ' connections to be saved')
        downloadString(arrayToCSV(logs), "csv", dateToString(GM_getValue('day', 0)) + '_AutoLinked_' + texts.length + '.csv');
    }
}

const iterSearchPage = async () => {
    let connectionCount = 0;
    const profiles = document.querySelectorAll(querySelectors.jobPage.profileCard);


    for (const profile of profiles) {
        const name = profile.textContent.match(settings.jobPage.namePattern);
        const message = "sf";

        // Open "send invitation" dialog
        const connectButton = profile.querySelector(querySelectors.jobPage.connectButton);
        if (connectButton === null) continue;
        connectButton.click();

        const result = await connectToUser(name, message);
        if (result !== null) logConnection(result);
        connectionCount++;
    }

    document.querySelector(querySelectors.jobPage.nextPage).click();
    return connectionCount;
}


const connectToUser = async (name, message) => {
    const invitationDialog = await querySelector(document, querySelectors.invitationModel.self);

    // Open custom message sub dialog
    const addCustomMessageButton = await querySelector(invitationDialog, querySelectors.invitationModel.addCustomMessageButton);
    if (addCustomMessageButton === null) return;
    addCustomMessageButton.click();

    const customMessageTextBox = await querySelector(invitationDialog, querySelectors.invitationModel.messageTextfield);
    customMessageTextBox.value = message;

    // Send the invite
    // const sendInviteButton = querySelector(invitationDialog, querySelectors.invitationModel.sendInviteButton);
    const sendInviteButton = await querySelector(invitationDialog, 'button[aria-label="Dismiss"]');
    console.log(sendInviteButton);
    if (sendInviteButton === null) return;

    await delay(getRandomInt(settings.delayBetweenConnections));
    sendInviteButton.click();

    console.log('🔄 ', name, " was invited")
    return [
        name
    ];
}


window.onload = () => {
    console.log("💡 AutoLinked Loaded");
    main();
};
