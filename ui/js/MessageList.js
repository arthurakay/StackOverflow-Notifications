var MessageList = React.createClass({displayName: "MessageList",
    getInitialState : function () {
        this.requestData();

        return {
            data : []
        };
    },

    render : function () {
        var messages = this.state.data.map(function (msg) {
            return (
                React.createElement(Message, {title: msg.title, 
                         url: msg.link, 
                         date: msg.creation_date, 
                         type: msg.item_type})
            );
        });

        return (
            React.createElement("div", {className: "inbox"}, 
                messages
            )
        );
    },

    requestData : function() {
        chrome.runtime.sendMessage('requestData', this.updateData);
    },

    updateData : function(data) {
        this.setState({
            data : data
        });
    }
});