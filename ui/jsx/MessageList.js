var MessageList = React.createClass({
    getInitialState : function () {
        this.requestData();

        return {
            data   : [],
            userId : null
        };
    },

    render : function () {
        var messages = (
            <p>
                <em>There are no unread messages in your inbox.</em>
            </p>
        );

        var so_link = (
            <a target="_blank"
               href="http://stackoverflow.com/">Open StackOverflow...</a>
        );

        if (this.state.data.length > 0) {
            messages = this.state.data.map(function (msg) {
                return (
                    <Message title={msg.title}
                             url={msg.link}
                             date={msg.creation_date}
                             type={msg.item_type}/>
                );
            });
        }

        if (this.state.userId) {
            so_link = (
                <a href={"http://stackoverflow.com/users/" + this.state.userId }
                   target="_blank">
                    <img src={"http://stackoverflow.com/users/flair/" + this.state.userId + ".png?theme=clean"}
                         width="208"
                         height="58"/>
                </a>
            );
        }

        return (
            <div className="inbox">
                {messages}
                <div className="so_link">
                    {so_link}
                </div>
            </div>
        );
    },

    requestData : function () {
        chrome.runtime.sendMessage('requestData', this.updateData);
    },

    updateData : function (data) {
        this.setState({
            data   : data.messages,
            userId : data.userId
        });
    }
});