import React from 'react';

const AddUser = () => {

    const handleAddUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };
        // console.log(user);

        // Sending data to the server from here :
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Success : ', data);
                alert('User added to the mongodb-atlas server successfully');

                event.target.reset();/* -----input field take faka kore felbe data input debar por------ */
            })
    };

    return (
        <div>
            <h1> Adding Users</h1>

            <form onSubmit={handleAddUser}>
                <input type="text" name="name" id="" placeholder='Name' required />
                <br />
                <input type="email" name="email" id="" placeholder='Add Email Address' required />
                <br /> <br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;