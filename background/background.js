STACK_APP = {
    id    : 5125,
    scope : 'read_inbox,no_expiry',
    key   : 'emLP89HI9*sP8VujNBW*Eg((',

    request_uri  : 'https://stackexchange.com/oauth/dialog',
    redirect_uri : chrome.identity.getRedirectURL("oauth2")
};

STACK_API = {
    token   : null,
    user_id : null,

    getMyInfo          : 'https://api.stackexchange.com/2.2/me?order=desc&sort=reputation&site=stackoverflow',
    getMyNotifications : 'https://api.stackexchange.com/2.2/users/'
};

//use this to avoid polluting the global namespace
JSONP_ID = 0;

function jsonp(url, callback) {
    var callbackName = `cb_${JSONP_ID}`,
        script;

    window[ callbackName ] = function (data) {
        delete window[ callbackName ];
        document.body.removeChild(script);
        callback(data);
    };

    script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    //increment for the next request
    JSONP_ID++;
}

var inboxMessages = [];

function init() {
    //ES6 template string!
    var requestUrl = `${STACK_APP.request_uri}?client_id=${STACK_APP.id}&scope=${STACK_APP.scope}&redirect_uri=${STACK_APP.redirect_uri}`;
    console.log('requesting from: ' + requestUrl);

    chrome.identity.launchWebAuthFlow({
        url         : requestUrl,
        interactive : true
    }, function (url) {
        STACK_API.token = url.substr(url.indexOf('=') + 1);

        getUserInfo();
    });
}


function getUserInfo() {
    console.log('getUserInfo()');

    var cb = function (json) {
        STACK_API.user_id = json.items[ 0 ].user_id;
        STACK_API.getMyNotifications += `${STACK_API.user_id}/inbox/unread?site=stackoverflow`;

        getNotifications();

        setInterval(
            getNotifications,
            (1000 * 60) //once per minute
        );
    };

    jsonp(
        `${STACK_API.getMyInfo}&key=${STACK_APP.key}&access_token=${STACK_API.token}`,
        cb
    );
}

function getNotifications() {
    console.log('getNotifications()');

    var cb = function (json) {
        setBadgeCount("" + json.items.length);
        inboxMessages = json.items;
    };

    jsonp(
        `${STACK_API.getMyNotifications}&key=${STACK_APP.key}&access_token=${STACK_API.token}`,
        cb
    );
}

function setBadgeCount(count) {
    if (count === '0') {
        count = '';
    }

    chrome.browserAction.setBadgeText({
        text : count
    });
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    sendResponse(inboxMessages);
});

//ready, set, go!
init();