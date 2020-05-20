let Message = {
    receiver: String,
    sender: '+12019756633',
    siteName: String,
    status: Number,
    timeStamp: function () {
        let date = new Date().toLocaleString();
        return date;
    },
    msgFormat: function () {
        let msg;
        if (this.status != 200) {
            msg = `\n\nYour requested site (${this.siteName}) is currently NOT responding to the request. The server returns a (${this.status}).\n\nSent at:\n${this.timeStamp()}`
        } else {
            msg = `\n\nYour requested site (${this.siteName}) is currently UP and Running.\n\nSent at:\n${this.timeStamp()}`
        }
        return msg;
    }
}

module.exports = Message;