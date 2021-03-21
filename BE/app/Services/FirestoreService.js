const admin = require('firebase-admin');
const serviceAccount = require('../../../secrets/serviceAccount.json');

class FirebaseService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        this.db = admin.firestore();
    }

    getDefaultValues() {
        return {
            created: admin.firestore.Timestamp.now(),
            isTest: true,
        };
    }

    async addUser(user) {
        user = Object.assign(this.getDefaultValues(), user);
        const docId = user.username.toLowerCase();

        // Check if the username can be used
        const existingUser = await this.db.collection('users').doc(docId).get();

        if (existingUser.exists) {
            throw 'Username taken';
        }

        await this.db.collection('users').doc(docId).set(user);

        // Return the user doc but without the pw
        delete user.password;
        return user;
    }

    async authUser(username, hashedPassword) {
        await this.db
            .collection('users')
            .where('username', '==', username)
            .where('password', '==', hashedPassword);
    }
}

let firebaseService = new FirebaseService();
module.exports = firebaseService;
