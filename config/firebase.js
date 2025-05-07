const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json'); // Your downloaded service account

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'virtual-garden-24baf.firebasestorage.app'
});

module.exports = admin;
