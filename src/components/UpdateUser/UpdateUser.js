import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {

    const { id } = useParams();

    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, []);


    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        // updating data to the server from here :
        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success : ', data);
                alert('User updated to the mongodb-atlas via backend server successfully');

                event.target.reset();/* -----input field take faka kore felbe data input debar por------ */
            });
    };

    return (
        <div>
            <h1> Update Users </h1>
            <h2> User Name : {user.name}</h2>
            {/* <ul>
                <li>Name : {user.name}</li>
                <li>Email : {user.email}</li>
                <br />
            </ul> */}


            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" id="" placeholder='Name' required />
                <br />
                <input type="email" name="email" id="" placeholder='Add Email Address' required />
                <br /> <br />
                <input type="submit" value="UpdateUser" />
            </form>
        </div>
    );
};

export default UpdateUser;
