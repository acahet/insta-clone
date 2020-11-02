import React, { useEffect, useState } from 'react';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
import { Button, Input } from '@material-ui/core';
import { db } from '../../firebase';
import firebase from 'firebase';
function Post({ user, postId, username, postImage, postCaption }) {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');

	const handlePostComment = (e) => {
		e.preventDefault();
		db.collection('posts').doc(postId).collection('comments').add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment('');
	};

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection('posts')
				.doc(postId)
				.collection('comments')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}
		return () => {
			unsubscribe();
		};
	}, [postId]);

	return (
		<div className="post">
			<div className="post__header">
				<Avatar
					className="post__header_image"
					src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
					alt="username"
				/>{' '}
				<strong>{username}</strong>
			</div>
			<div className="post__image">
				<img src={postImage} alt="random" />
			</div>
			<div className="post__caption">
				<h4>
					<strong>{username}</strong>: {postCaption}
				</h4>
			</div>
			<div className="post__commentsTotal">
				<span>
					{' '}
					View all {comments.length} {comments.length > 1 || comments.length === 0 ? 'comments' : 'comment'}
				</span>
			</div>
			<div className="post__comments">
				{comments.length === 0 ? (
					<p>no comments</p>
				) : (
					comments.map((comment) => {
						return (
							<p>
								<strong>{comment.username}</strong> {comment.text}
							</p>
						);
					})
				)}
			</div>
			{/* {JSON.stringify(db.collection('posts'))} */}
			<form className="post__commentBox">
				<Input
					className="post__input"
					type="text"
					placeholder="add a comment..."
					value={comment}
					onChange={(e) => {
						setComment(e.target.value);
					}}
				/>
				<Button type="submit" className="post__button" disabled={!comment} onClick={handlePostComment}>
					Post
				</Button>
			</form>
		</div>
	);
}
export default Post;
