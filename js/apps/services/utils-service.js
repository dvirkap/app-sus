export default {
    makeId,
    validateEmail
}

function makeId(length) {

    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function validateEmail(email) {
    var regExp = /\S+@\S+\.\S+/;
    return regExp.test(email);
}