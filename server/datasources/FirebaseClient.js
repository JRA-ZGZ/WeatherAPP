const firebase = require('firebase');
let firebaseConfig = {
    apiKey: "AIzaSyC-f5jJVrV7OgbZargyA0NCHXYQfWwEL3Y",
    authDomain: "weatherapp-jrazgz.firebaseapp.com",
    databaseURL: "https://weatherapp-jrazgz.firebaseio.com",
    projectId: "weatherapp-jrazgz",
    storageBucket: "weatherapp-jrazgz.appspot.com",
    messagingSenderId: "569709047887",
    appId: "1:569709047887:web:a3af90bec0a2482dc9fa3a"
  };
  // Initialize Firebase

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