var MessageList = React.createClass({displayName: "MessageList",
    getInitialState : function () {
        this.requestData();

        return {
            data : []
        };
    },

    render : function () {
        var messages = (
            React.createElement("p", null, 
                React.createElement("em", null, "There are no unread messages in your inbox.")
            )
        );

        if (this.state.data.length > 0) {
            messages = this.state.data.map(function (msg) {
                return (
                    React.createElement(Message, {title: msg.title, 
                             url: msg.link, 
                             date: msg.creation_date, 
                             type: msg.item_type})
                );
            });
        }

        return (
            React.createElement("div", {className: "inbox"}, 
                messages, 
                React.createElement("div", {className: "so_link"}, 
                    React.createElement("a", {target: "_blank", 
                       href: "http://stackoverflow.com/"}, "Open StackOverflow...")
                )
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