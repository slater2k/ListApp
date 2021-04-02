import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import ListUser from "./ListUser";
import { useEffect, useState } from 'react';

function Main() {

    const fakeListData = [{
        "id": 1,
        "first_name": "Antonetta",
        "last_name": "Beyne",
        "email": "abeyne0@imdb.com",
        "profile_image": "http://dummyimage.com/198x196.bmp/ff4444/ffffff",
        "ip_address": "153.132.139.63",
        "list_rank": 4,
        "score": "739"
    }];
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await (await fetch('http://35.178.75.202:13337/users')).json();
            let counter = 1;
            setUsers(res.map((user) => {
                return {
                    "id": user.id,
                    "first_name": user.username,
                    "last_name": "",
                    "email": user.email,
                    "profile_image": "http://dummyimage.com/198x196.bmp/ff4444/ffffff",
                    "ip_address": "",
                    "list_rank": counter++,
                    "score": 100 - counter
                }
            }));
        }
        getUsers();
    }, []);


    return (
        <Router>
            <Navigation />
            <div id="main-container" className="container">
                <div className="content-inner pt-3 pb-5">
                    <Switch>
                        <Route exact path="/">
                            <List fakeListData={users} />
                        </Route>
                        <Route path="/user/:userId">
                            <ListUser fakeListData={users} />
                        </Route>
                        <Route path="/account">
                            <Account />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default Main;
