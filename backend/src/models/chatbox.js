
class Chatbox {
    constructor(sender, message, timeElapse = Date.now()) {
        this.sender = sender;
        this.message = message;
        this.timeElapse = timeElapse;
    }
}

module.exports = Chatbox