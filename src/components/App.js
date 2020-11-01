import './App.css';
import Header from './Header';
import Post from './Post';

function App() {
	return (
		<div className="app">
			<Header />
			<div className="app__body">
				<Post />
			</div>
		</div>
	);
}

export default App;
