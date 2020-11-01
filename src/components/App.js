import { useState } from 'react';
import './App.css';
import Header from './Header';
import Post from './Post';

function App() {
	const [posts, setPosts] = useState([
		{
			userAvatar:
				'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
			username: 'tester-user',
			postImage:
				'https://www.irishcentral.com/uploads/article/46825/Giant_s_Causeway_Antrim_getty.jpg?t=1601033990',
			postCaption: 'using props to add a post',
		},
		{
			userAvatar:
				'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
			username: 'second-user',
			postImage:
				'https://www.irishcentral.com/uploads/article/46825/Giant_s_Causeway_Antrim_getty.jpg?t=1601033990',
			postCaption: 'wow, nice work',
		},
		{
			userAvatar:
				'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
			username: 'third-user',
			postImage:
				'https://www.irishcentral.com/uploads/article/46825/Giant_s_Causeway_Antrim_getty.jpg?t=1601033990',
			postCaption: 'it seems as it is working',
		},
	]);
	return (
		<div className="app">
			<Header />

			{posts.map((post) => {
				return (
					<div key={post.username} className="app__body">
						<Post
							userAvatar={post.userAvatar}
							username={post.username}
							postImage={post.postImage}
							postCaption={post.postCaption}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default App;
