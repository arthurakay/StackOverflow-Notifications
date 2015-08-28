var Message = React.createClass({displayName: "Message",
    render: function() {
        return (
            React.createElement("div", {className: "inboxMsg"}, 
                React.createElement("div", {className: "inboxMsgMeta"}, 
                    React.createElement("div", {className: "inboxMsgMeta-left"}, 
                        this.props.type
                    ), 

                    React.createElement("div", {className: "inboxMsgMeta-right"}, 
                        new Date(this.props.date * 1000).toUTCString()
                    )
                ), 

                React.createElement("div", {className: "inboxMsgContent"}, 
                    React.createElement("a", {href: this.props.url, target: "_blank"}, this.props.title)
                )
            )
        );
    }
});