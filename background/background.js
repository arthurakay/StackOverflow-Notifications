STACK_APP = {
    id           : 5125,
    scope        : 'read_inbox,no_expiry',
    key          : 'emLP89HI9*sP8VujNBW*Eg((',

    request_uri  : 'https://stackexchange.com/oauth/dialog',
    redirect_uri : chrome.identity.getRedirectURL("oauth2")
};

STACK_API = {
    token   : null,
    user_id : null,

    getMyInfo          : 'https://api.stackexchange.com/2.2/me?order=desc&sort=reputation&site=stackoverflow',
    getMyNotifications : 'https://api.stackexchange.com/2.2/users/'
};

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
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.create({
            'url' : 'http://stackoverflow.com/'
        });
    });

    $.ajax({
        type  : 'GET',
        url   : `${STACK_API.getMyInfo}&key=${STACK_APP.key}&access_token=${STACK_API.token}`,

        async       : false,
        crossDomain : true,

        jsonpCallback : 'jsonCallback',
        contentType   : "application/json",
        dataType      : 'jsonp',

        success : function(json) {
            STACK_API.user_id = json.items[0 ].user_id;
            STACK_API.getMyNotifications += `${STACK_API.user_id}/notifications?site=stackoverflow`;

            getNotifications();

            setInterval(
                getNotifications,
                (1000 * 60) //once per minute
            );
        },
        error: function(e) {
            console.error(e.message);
        }
    });
}

function getNotifications() {
    console.log('API call');

    $.ajax({
        type  : 'GET',
        url   : `${STACK_API.getMyNotifications}&key=${STACK_APP.key}&access_token=${STACK_API.token}`,

        async       : false,
        crossDomain : true,

        jsonpCallback : 'jsonCallback',
        contentType   : "application/json",
        dataType      : 'jsonp',

        success : function(json) {
            setBadgeCount(getUnreadCount(json.items));
        },
        error: function(e) {
            console.error(e.message);
        }
    });
}

function getUnreadCount(data) {
    var count = 0;

    for (var i=0; i<data.length; i++) {
        if (!data[i].is_unread) {
            break;
        }

        count++;
    }

    return "" + count; //expects a string
}

function setBadgeCount(count) {
    if (count === '0') {
        count = '';
    }

    chrome.browserAction.setBadgeText({
        text : count
    });
}


//ready, set, go!
init();