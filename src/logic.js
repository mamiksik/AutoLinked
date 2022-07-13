// ==UserScript==
// @name         AutoLinked v2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @require      https://raw.githubusercontent.com/mamiksik/AutoLinked/master/src/main.js
// @require      https://raw.githubusercontent.com/mamiksik/AutoLinked/master/src/utilities.js

// @noframes
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

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
        const message = "";

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