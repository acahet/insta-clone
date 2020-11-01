import React from 'react';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
function Post({ username, postImage, postCaption }) {
	return (
		<div className="post">
			<div className="post__header">
				<Avatar
					className="post__header_image"
					// src={userAvatar}
					src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
					alt="username"
				/>{' '}
				<strong>{username}</strong>
			</div>
			<div className="post__image">
				<img src={postImage} alt="random" />
				{/* <img
					src="https://www.irishcentral.com/uploads/article/46825/Giant_s_Causeway_Antrim_getty.jpg?t=1601033990"
					alt="random image"
				/> */}
			</div>
			<div className="post_caption">
				<h4>
					<strong>{username}</strong>: {postCaption}
				</h4>
			</div>
		</div>
	);
}
export default Post;
