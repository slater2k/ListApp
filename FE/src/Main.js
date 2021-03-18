import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "./Navigation";
import List from "./List";
import Account from "./Account";
import ListUser from "./ListUser";

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
    }, {
        "id": 2,
        "first_name": "Robinia",
        "last_name": "Screaton",
        "email": "rscreaton1@ucla.edu",
        "profile_image": "http://dummyimage.com/183x226.bmp/ff4444/ffffff",
        "ip_address": "37.38.68.169",
        "list_rank": 5,
        "score": "339"
    }, {
        "id": 3,
        "first_name": "Michaeline",
        "last_name": "Walne",
        "email": "mwalne2@odnoklassniki.ru",
        "profile_image": "http://dummyimage.com/121x157.png/5fa2dd/ffffff",
        "ip_address": "27.236.108.254",
        "list_rank": 3,
        "score": "1,002"
    }, {
        "id": 4,
        "first_name": "Nichole",
        "last_name": "Chichgar",
        "email": "nchichgar3@cocolog-nifty.com",
        "profile_image": "http://dummyimage.com/148x121.bmp/cc0000/ffffff",
        "ip_address": "251.161.128.58",
        "list_rank": 2,
        "score": "1,224"
    }, {
        "id": 5,
        "first_name": "Farlie",
        "last_name": "Naile",
        "email": "fnaile4@earthlink.net",
        "profile_image": "http://dummyimage.com/189x239.jpg/dddddd/000000",
        "ip_address": "69.250.183.52",
        "list_rank": 1,
        "score": "22,739"
    }, {
        "id": 6,
        "first_name": "Linet",
        "last_name": "Djurisic",
        "email": "ldjurisic5@google.ca",
        "profile_image": "http://dummyimage.com/193x129.bmp/dddddd/000000",
        "ip_address": "55.198.201.71",
        "list_rank": 10,
        "score": "143"
    }, {
        "id": 7,
        "first_name": "Walker",
        "last_name": "Broader",
        "email": "wbroader6@squarespace.com",
        "profile_image": "http://dummyimage.com/198x127.bmp/dddddd/000000",
        "ip_address": "226.115.14.167",
        "list_rank": 9,
        "score": "183"
    }, {
        "id": 8,
        "first_name": "Scarlet",
        "last_name": "Linnemann",
        "email": "slinnemann7@mac.com",
        "profile_image": "http://dummyimage.com/218x116.jpg/ff4444/ffffff",
        "ip_address": "1.181.120.24",
        "list_rank": 6,
        "score": "300"
    }, {
        "id": 9,
        "first_name": "Johnny",
        "last_name": "Cookes",
        "email": "jcookes8@quantcast.com",
        "profile_image": "http://dummyimage.com/141x194.bmp/5fa2dd/ffffff",
        "ip_address": "207.218.17.96",
        "list_rank": 8,
        "score": "199"
    }, {
        "id": 10,
        "first_name": "Jaimie",
        "last_name": "Siege",
        "email": "jsiege9@cafepress.com",
        "profile_image": "http://dummyimage.com/127x171.png/dddddd/000000",
        "ip_address": "98.137.210.55",
        "list_rank": 7,
        "score": "202"
    },  {
        "id": 11,
        "first_name": "Jim",
        "last_name": "Jones",
        "email": "jj@earthlink.net",
        "profile_image": "http://dummyimage.com/189x239.jpg/dddddd/000000",
        "ip_address": "69.250.183.52",
        "list_rank": 12,
        "score": "122"
    }, {
        "id": 12,
        "first_name": "Dave",
        "last_name": "Dewsbury",
        "email": "dd@google.ca",
        "profile_image": "http://dummyimage.com/193x129.bmp/dddddd/000000",
        "ip_address": "55.198.201.71",
        "list_rank": 11,
        "score": "129"
    }, {
        "id": 13,
        "first_name": "Carl",
        "last_name": "Crowe",
        "email": "cc@squarespace.com",
        "profile_image": "http://dummyimage.com/198x127.bmp/dddddd/000000",
        "ip_address": "226.115.14.167",
        "list_rank": 13,
        "score": "100"
    }, {
        "id": 14,
        "first_name": "Sam",
        "last_name": "Spade",
        "email": "ss332343@mac.com",
        "profile_image": "http://dummyimage.com/218x116.jpg/ff4444/ffffff",
        "ip_address": "1.181.120.24",
        "list_rank": 15,
        "score": "18"
    }, {
        "id": 15,
        "first_name": "Dale",
        "last_name": "Doorknob",
        "email": "dd123@quantcast22.com",
        "profile_image": "http://dummyimage.com/141x194.bmp/5fa2dd/ffffff",
        "ip_address": "207.218.17.96",
        "list_rank": 14,
        "score": "31"
    }];

    return (
        <Router>
            <Navigation />
            <div id="main-container" className="container">
                <div className="content-inner pt-3 pb-5">
                    <Switch>
                        <Route exact path="/">
                            <List fakeListData={fakeListData} />
                        </Route>
                        <Route path="/user/:userId">
                            <ListUser fakeListData={fakeListData} />
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
