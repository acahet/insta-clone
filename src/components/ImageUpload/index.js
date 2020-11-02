import React, { useState } from 'react';
import { Button, Input } from '@material-ui/core';
import { db, storage } from '../../firebase';
import firebase from 'firebase';

import './styles.css';

function ImageUpload({ user, setAddPost }) {
	const [caption, setCaption] = useState('');
	const [image, setImage] = useState(null);
	const [progressBar, setProgressBar] = useState(0);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};
	const handleUpload = () => {
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				//progress function...
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgressBar(progress);
			},
			(error) => {
				// Error function
				console.log(error);
				alert(error.message);
			},
			() => {
				//complete function
				storage
					.ref('images')
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						//post image inside db
						db.collection('posts').add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							postCaption: caption,
							postImage: url,
							username: user,
						});
						setProgressBar(0);
						setCaption('');
						setImage(null);
						setAddPost(false);
					});
			}
		);
	};
	return (
		<div className="imageUpload">
			<progress className="imageUpload__progress" value={progressBar} max="100" />
			<Input
				type="text"
				placeholder="Enter a caption..."
				onChange={(e) => {
					setCaption(e.target.value);
				}}
			/>
			<Input type="file" onChange={handleChange} />
			<Button onClick={handleUpload}>Add Post</Button>
		</div>
	);
}

export default ImageUpload;
