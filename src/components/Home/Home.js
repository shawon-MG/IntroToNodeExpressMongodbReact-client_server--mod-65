import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/user')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    const handleDeleteUser = (_id) => {
        const proceed = window.confirm('Are you sure you want to delete?');  /* delete hobar age ekta alert massage debe */
        if (proceed) {
            console.log('Delete', _id);
            const url = `http://localhost:5000/user/${_id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) { /* check browser console to understand better why-->.deleteCount*/
                        console.log('Deleted : ', data);
                        const remainingData = users.filter(user => user._id !== _id);  /* means, deleted _id ta ke filter kore baki remaining _id guloke remaining variable e rakhbe...NOTE: erpor ekate users e set kore dite hobe  */
                        setUsers(remainingData);
                    }
                })
        };
    };

    return (
        <div>
            <h1> Users Number : {users.length} </h1>
            <ul>
                {
                    users.map(user =>
                        <div key={user._id}>
                            <li> Name : {user.name}</li>
                            <li> Email : {user.email}</li>
                            <Link to={`/update/${user._id}`}><button> Update </button> </Link>
                            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            <br /> <br />
                        </div>
                    )
                }
            </ul>
        </div>
    );
};

export default Home;