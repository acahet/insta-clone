import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyCBxch5c2fkeEYXgBrNRf35zGzoQS826PE',
	authDomain: 'react-insta-clone-9725a.firebaseapp.com',
	databaseURL: 'https://react-insta-clone-9725a.firebaseio.com',
	projectId: 'react-insta-clone-9725a',
	storageBucket: 'react-insta-clone-9725a.appspot.com',
	messagingSenderId: '890278582496',
	appId: '1:890278582496:web:928f50dd0c74016bcf1885',
	measurementId: 'G-06S3T47Q24',
});

const db = firebaseApp.firestore();

export { db };
