//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class Firebase {

    constructor() {
        
        // initialize firebase app
		app.initializeApp({
            apiKey: "AIzaSyCYkmkP90UaPB1w9nNnv-ekyMkLweDpcks",
            authDomain: "health-application-cd5fd.firebaseapp.com",
            databaseURL: "https://health-application-cd5fd.firebaseio.com",
            projectId: "health-application-cd5fd",
            storageBucket: "health-application-cd5fd.appspot.com",
            messagingSenderId: "288812968362",
            appId: "1:288812968362:web:d8437c225ab7325275a3d3",
            measurementId: "G-D3TH8Q0037"
        });

        // get firebase authentication handle
        this.auth = app.auth();
        
        // get firebase database/firestore handle
		this.db = app.firestore();
    };

    get User() { return this.auth.currentUser; };

    get Username() { return this.User.displayName; };
    
    SignIn(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    SignOut() {
        return this.auth.signOut();
    };

    SignUp(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    };

    ResetPassword(email){
        return this.auth.sendPasswordResetEmail(email);
    };

    Collection(name) {
        return this.db.collection(name)
    };

    IsInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		});
    };
    
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new Firebase();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~