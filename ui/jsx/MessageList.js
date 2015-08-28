var MessageList = React.createClass({
    getInitialState : function () {
        this.requestData();

        return {
            data : []
        };
    },

    render : function () {
        var messages = this.state.data.map(function (msg) {
            return (
                <Message title={msg.title}
                         url={msg.link}
                         date={msg.creation_date}
                         type={msg.item_type} />
            );
        });

        return (
            <div className="inbox">
                {messages}
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