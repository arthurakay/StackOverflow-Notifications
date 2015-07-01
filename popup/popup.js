function contactSenchaInspector() {
    var form = document.getElementsByTagName('form')[ 0 ],
        port = form.elements[ 'port' ].value;

    chrome.tabs.query({
        active        : true,
        currentWindow : true
    }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[ 0 ].id,
            { port : port }
        );
    });

    return false;
}

document.getElementsByTagName('form')[ 0 ].onsubmit = contactSenchaInspector;