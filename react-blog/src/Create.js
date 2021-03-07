import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Create = () => {

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState('mario');
	const [isLoadingAddBlog, setIsLoadingAddBlog] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = {title, body, author};

		setIsLoadingAddBlog(true);

		// This endpoint when posted to will "add" to the db.json file
		fetch('http://localhost:8000/blogs', {
			method: 'POST',
			headers: {"Content-Type" : "application/json"},
			body: JSON.stringify(blog),
		}).then(() => {
			setIsLoadingAddBlog(false);
			history.push('/');
		})
	};

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog title:</label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>

				<label>Blog body:</label>
				<textarea value={body} onChange={(e) => {setBody(e.target.value)}} required/>

				<label>Blog author:</label>
				<select value={author} onChange={(e) => setAuthor(e.target.value)}>
					<option value="mario">Mario</option>
					<option value="luigi">Luigi</option>
					<option value="yoshi">Yoshi</option>
				</select>

				{!isLoadingAddBlog && <button>Add Blog</button>}
				{isLoadingAddBlog && <button disabled>Adding Blog...</button>}
			</form>
		</div>
	);
}

export default Create;