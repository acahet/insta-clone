import React, { useEffect, useState } from 'react';
import { getPostFromDb } from '../../helpers/api';
import Header from '../Header';
import Post from '../Post';

function Dashboard() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPostFromDb('posts', setPosts);
	}, []);

	return (
		<div className="dashboard">
			<Header />

			{posts.map(({ id, post }) => {
				const { postCaption, postImage, username } = post;
				console.log(' POST ', post);
				return (
					<div key={id} className="dashboard__body">
						<Post username={username} postImage={postImage} postCaption={postCaption} />
					</div>
				);
			})}
		</div>
	);
}

export default Dashboard;
