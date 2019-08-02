const db = require('_helpers/db');
const User = db.User;
const util = require('_helpers/util');
const ses = require('./../aws/ses');

module.exports = {
    getAll,
    sendEmail,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await User.find();
}

async function sendEmail(winner) {
    var mailOptions = util.setupMailOptions(
        '"Secret Friend Lottery" <secretfriendl0ttery@gmail.com>', 
        winner.email, 
        "Secret Friend Lottery - Lottery Winner", 
        "<p>Hi <h2>" + winner.data.user + "</h2></p>" + "<br />" +
        "The winning digits are..." + "<br />" +
        "<h2>" + winner.data.digits + "</h2>"
    );
    var transporter = ses.setupAWS();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Successfully sent");
      }
    });
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // save user
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}