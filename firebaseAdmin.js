const admin = require("firebase-admin");
const serviceAccount = require("./secret.json");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};

export const createCustomToken = (uid) => {
  // if (!admin.apps.length) {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount),
  //   });
  // }
  // const expiresIn = 60 * 60 * 24 * 1 * 1000;

  // return admin
  // .auth()
  // .createCustomToken(uid, {expiresIn})
  // .catch((error) => {
  //   console.log('Error creating custom token:', error);
  // });
};
