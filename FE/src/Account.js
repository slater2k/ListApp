import { useContext } from "react";
import { AuthContext } from "./Contexts/AuthContext";

const Account = () => {
    const {auth} = useContext(AuthContext);
	return (
		<div className="account">
			My account panel
			My user:
			<pre>{JSON.stringify(auth.user, null, 4)}</pre>
		</div>
	);
}

export default Account;
