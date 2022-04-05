
class Chatbox {
    constructor(senderId, message, timeElapse = Date.now()) {
        this.senderId = senderId;
        this.message = message;
        this.timeElapse = timeElapse;
    }
}

module.exports = Chatbox