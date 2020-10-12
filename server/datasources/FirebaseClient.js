const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id",
};
  
class FirebaseClient {
    static getClient(){
        if(!this.client){
            this.client = firebase.initializeApp(firebaseConfig).database();
        }
        return this.client;
    }
    static async set(key,data){
        return FirebaseClient.getClient().ref('weather/' + key).set(data)
    }
    static async get(key){
        return FirebaseClient.getClient().ref('weather/' + key).once('value').then(function(snapshot) {
            return snapshot.val();    
        })        
    }
    static async getAll(){
        return FirebaseClient.getClient().ref('weather').once('value').then(function(snapshot) {
            return snapshot.val();    
        })        
    }
    static async clean(){
        return FirebaseClient.getClient().ref('weather').remove();
    }
}

module.exports = FirebaseClient;