import storageService from '../../services/storage-service.js';
const EMAILS_KEY = 'emails';

export default {
    getEmails: getEmails,
    getEmailById: getEmailById,
    deleteEmail: deleteEmail,
    addEmail: addEmail,
    updateEmail: updateEmail
}
var gNextId = 1;
var gEmails;

_createEmails();

function _createEmails() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        var body = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil laborum reiciendis a, unde sequi dolore fuga ipsam vitae at suscipit ea iste tempore cupiditate, earum iusto voluptas ipsa quo! Eaque.'
        var emails = [
            _createEmail('user1@gmail.com', 'nirfuchs@appsus.com', 'This is a test email 1', '1' + body, 1551267824290),
            _createEmail('user2@gmail.com', 'nirfuchs@appsus.com', 'This is a test email 2', '2' + body, 1551133930594),
            _createEmail('user3@gmail.com', 'nirfuchs@appsus.com', 'This is a test email 3', '3' + body, 1551133930594),
        ];
        storageService.store(EMAILS_KEY, emails);
    } else {
        gNextId = findNextId(emails);
    }
    gEmails = emails;
}

function getEmails() {
    return Promise.resolve(gEmails);
}

function deleteEmail(emailId) {
    var emailIdx = gEmails.findIndex(email => emailId === email.id);
    gEmails.splice(emailIdx, 1);
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve();
}

function addEmail(subject, body, sentAt) {
    var email = _createEmail(subject, body, sentAt);
    gEmails.push(email);
    storageService.store(EMAILS_KEY, gEmails);
    return Promise.resolve(email);
}

function _createEmail(from, to, subject, body, sentAt) {
    var email = {
        id: gNextId++,
        from: from,
        to: to,
        subject: subject,
        body: body,
        sentAt: sentAt,
        isRead: false
    };
    return email;
}

function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return emailId === email.id;
    });

    return Promise.resolve(email);
}

function findNextId(emails) {
    var max = 0;
    emails.forEach(function (email) {
        if (email.id > max) max = email.id;
    })
    return max + 1;
}

function updateEmail(emailId, newBody) {
    var email = gEmails.find(email => email.id === emailId)
    email.body = newBody;
    storageService.store(EMAILS_KEY, gEmails);

    return Promise.resolve(email);
}





