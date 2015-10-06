var MessageList = React.createClass({
    getInitialState : function () {
        this.requestData();

        return {
            data : []
        };
    },

    render : function () {
        var messages = (
            <p>
                <em>There are no unread messages in your inbox.</em>
            </p>
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

        return (
            <div className="inbox">
                {messages}
                <div className="so_link">
                    <a target="_blank"
                       href="http://stackoverflow.com/">Open StackOverflow...</a>
                </div>
            </div>
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