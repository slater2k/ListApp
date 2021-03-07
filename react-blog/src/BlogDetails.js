import {useHistory, useParams} from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

	const { id } = useParams();
	const { data: blog, error, isLoading } = useFetch('http://localhost:8000/blogs/' + id, 'Error fetching blog id: ' +  id);
	const history = useHistory();

	const handleClick = () => {
		// Delete request to this url + blog id will remove from db.json
		fetch('http://localhost:8000/blogs/' + blog.id, {
			method: 'DELETE'
		}).then(() => {
			history.push("/");
		})
	}

	return (
		<div className="blog-details">
			{ isLoading && <div className="blog-isLoading">Loading...</div>}
			{ error && <div className="blog-error">{ error }.</div>}
			{ blog && (
				<article className="blog-content">
					<h2>{blog.title}</h2>
					<p>Written by {blog.author}</p>
					<div>{blog.body}</div>
					<button onClick={handleClick}>Delete</button>
				</article>
			)}
		</div>
	);
}

export default BlogDetails;