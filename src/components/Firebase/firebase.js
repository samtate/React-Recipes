import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBKS2yF_mmi1NKJzMUTQ8ALci4CwZZL7ek",
  authDomain: "recipe-tracker-app.firebaseapp.com",
  databaseURL: "https://recipe-tracker-app.firebaseio.com",
  projectId: "recipe-tracker-app",
  storageBucket: "recipe-tracker-app.appspot.com",
  messagingSenderId: "890535629212",
  appId: "1:890535629212:web:7f96097d97dabcea8db859"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doSignInWithGoogle = (email, password) => {
    var provider = new app.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  doSignOut = () => this.auth.signOut();

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  recipe = (authUser, uid) => this.db.ref(`recipes/${authUser.uid}/${uid}`);
  recipes = authUser => this.db.ref(`recipes/${authUser.uid}`);
}
export default Firebase;
