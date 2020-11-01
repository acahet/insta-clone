import { db } from '../firebase';
import firebase from 'firebase';

export const getTodosFromDb = (collection, setState, collectionValue) => {
	db.collection(collection)
		.orderBy('timestamp', 'desc')
		.onSnapshot((snapshot) => {
			setState(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data()`.${collectionValue}` })));
		});
};

export const addToCollection = (collection, field, value) => {
	db.collection(collection).add({
		[field]: value,
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
	});
};

export const deletePost = (collection, id) => {
	db.collection(collection).doc(id).delete();
};

export const updatePost = (collection, id, collectionValue, input) => {
	db.collection(collection)
		.doc(id)
		.set(
			{
				[collectionValue]: input,
			},
			{ merge: true }
		);
};
