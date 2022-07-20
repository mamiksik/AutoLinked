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

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTodayDate() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
}

function createButton(btnText, elementId, listener, offset = 0) {
    console.log('Creating a button');
    console.log(btnText, elementId, listener, offset);
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
    await delay(getRandomInt(5, 10));
    return element.querySelector(query);
}


const matchPatterns = (textContent, includePatterns, excludePatters) => {
    includePatterns = Object.values(includePatterns).reduce((acc, val) => (acc.length > 0 ? acc + "|" : acc) + val, "");
    excludePatters = Object.values(excludePatters).reduce((acc, val) => (acc.length > 0 ? acc + "|" : acc) + "|" + val, "");

    const includeReq = new RegExp(includePatterns, "i");
    const excludeReq = new RegExp(excludePatters, "i");

    return textContent.match(includeReq) !== null && textContent.match(excludeReq) === null;
}