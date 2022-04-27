import React, { useEffect, useState } from 'react';

const Home = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    return (
        <div>
            <h1> Users: {users.length} </h1>
            <ul>
                {
                    users.map(user =>
                        <div key={user._id}>
                            <li> Name : {user.name}</li>
                            <li> Email : {user.email}</li>
                            <button>Delete</button>
                            <br /> <br />
                        </div>
                    )
                }
            </ul>
        </div>
    );
};

export default Home;