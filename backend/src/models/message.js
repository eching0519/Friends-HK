class Message {
    constructor(text) {
        this.text = text
        this.createdAt = new Date().getTime()
    }
}

module.exports = Message