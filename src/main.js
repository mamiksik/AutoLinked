// ==UserScript==
// @name             AutoLinked
// @description      One-click add matched LinkedIn "Recommended for you" people in the My Network page
// @namespace        ronald.luc
// @author           Ronald Luc
// @license          None for now
// @include          https://www.linkedin.com/*
// @version          0.2
// @require          deepmerge

// @grant            none
// @icon             data:image/png;base64,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
// ==/UserScript==

'use strict';

window.clearTimeout = window.clearTimeout.bind(window);
window.clearInterval = window.clearInterval.bind(window);
window.setTimeout = window.setTimeout.bind(window);
window.setInterval = window.setInterval.bind(window);

const main = () => {
    if (window.self !== window.top) {
        console.log("⛔ Window is not on top")
        return;
    }

    // const settings = {
    //     ...default_settings,
    //     ...user_settings
    // };

    createButton('Connect!', 'connectBtn', () => connect());
    createButton('Export!', 'exportBtn', () => exportInvited(), 6);
    createButton('Reset!', 'resetBtn', () => GM_setValue('texts', []), 12);
    createButton('Prune!', 'pruneBtn', () => pruneInvitations(), 16);
    createPopup();
}

function createPopup() {

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

function connect() {
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

window.onload = () => {
    console.log("💡 AutoLinked Loaded");
    main();
};
