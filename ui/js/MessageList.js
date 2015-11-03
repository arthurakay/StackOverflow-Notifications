var MessageList = React.createClass({
    getInitialState: function () {
        this.requestData();

        return {
            data: [],
            userId: null
        };
    },

    render: function () {
        var messages = React.createElement(
            "p",
            null,
            React.createElement(
                "em",
                null,
                "There are no unread messages in your inbox."
            )
        );

        var so_link = React.createElement(
            "a",
            { target: "_blank",
                href: "http://stackoverflow.com/" },
            "Open StackOverflow..."
        );

        if (this.state.data.length > 0) {
            messages = this.state.data.map(function (msg) {
                return React.createElement(Message, { title: msg.title,
                    url: msg.link,
                    date: msg.creation_date,
                    type: msg.item_type });
            });
        }

        if (this.state.userId) {
            so_link = React.createElement(
                "a",
                { href: "http://stackoverflow.com/users/" + this.state.userId,
                    target: "_blank" },
                React.createElement("img", { src: "http://stackoverflow.com/users/flair/" + this.state.userId + ".png?theme=clean",
                    width: "208",
                    height: "58" })
            );
        }

        return React.createElement(
            "div",
            { className: "inbox" },
            messages,
            React.createElement(
                "div",
                { className: "so_link" },
                so_link
            )
        );
    },

    requestData: function () {
        chrome.runtime.sendMessage('requestData', this.updateData);
    },

    updateData: function (data) {
        this.setState({
            data: data.messages,
            userId: data.userId
        });
    }
});