//~~ Dependencies ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Firebase from './Firebase'
//~~ Declarations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

class FirebaseMessages {

    constructor() {
        this.collection = Firebase.Collection("messages");
    };

    Get() {
        return this.collection.get();
    }

    Add(title, content) {
        return this.collection.add({
            title: title,
            content: content,
            timestamp: new Date()
            // timestamp: new Date().getUTCDate()
        })
    }

    OnSnapshot(observer) {
        return this.collection.onSnapshot(observer);
    }
    
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export default new FirebaseMessages();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~