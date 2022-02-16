
class User {
    constructor(email, name, username, password) {
        this._id = username
        this.email = email
        this.name = name
        this.password = password
    }
}

module.exports = User;