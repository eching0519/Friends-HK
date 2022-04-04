const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', '_file/profilePicture'),
    filename: function (req, file, cb) {
        if(!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg|pdf|gif)$/)) {
            var err = new Error();
            err.code = 'filetype'; // to check on file type
            return cb(err);
        } else {
            var picName
            const loginSession = req.session.verification;
            if (loginSession)
                picName = req.session.verification.id
            else
                picName = 'temp'

            const ext = path.extname(file.originalname)
            var fileNamee = picName + ext;
            console.log("filename produced is: " + fileNamee);
            cb(null, fileNamee);
        }
    }
});

module.exports = multer({ storage });