import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const config = {

  apiKey: "AIzaSyAxPcni0dh7GPjXAVtoFbW0w_GRZE4dAG0",
  authDomain: "profile-project-d8a90.firebaseapp.com",
  databaseURL: "https://profile-project-d8a90.firebaseio.com",
  projectId: "profile-project-d8a90",
  storageBucket: "profile-project-d8a90.appspot.com",
  messagingSenderId: "856720483154",
  appId: "1:856720483154:web:6cde8b8c89e18af4b0908b",
  measurementId: "G-8P9WRN6BJR",
  url: "http://localhost:3000"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storageRef = app.storage().ref();


  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: config.url
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Upload Image ***
  upload = (userID, file) => this.storageRef.child(`photo/${userID}_avatar`).put(file);

  // *** Update Database */
  update = (uid, data) => this.db.ref(`users/${uid}`).update(data);
}

export default Firebase;
