const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

/* ---env configuration--- */
require('dotenv').config();

const cors = require('cors'); /* ----It makes connection between client side (port: 3000) and server side (port: 5000)----  */
app.use(cors());

app.use(express.json());
/*----------------------------------------------
         user:       dbuser1
         password:   kQy8VZ31fZZ4V7kn
----------------------------------------------------------------*/

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; /*----- It's for finding a user by id--------- */

const uri = "mongodb+srv://dbuser1:kQy8VZ31fZZ4V7kn@cluster0.m8chh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("Node-Express-MongoDB").collection("users");
//     console.log('MongoDB is Connected');  /* I write this line*/
//     // perform actions on the collection object
//     client.close();
// });       /*----- Atlas theke------- */

/* ------mongoDB docs theke---- */
async function run() {

    try {
        await client.connect();
        const userCollection = client.db("Node-Express-MongoDB").collection("users");
        // const user = { name: 'secondPerson', email: 'second@gmail.com' };

        // const result = await userCollection.insertOne(user);
        // console.log(`Inserted user's ID: ${result.insertedId}`);

        /* ------------------------------------------------------------------------------
                    Ekhn client side the data niye database e CRUD operation  calabo
        --------------------------------------------------------------------------------------------- */
        // POST API : ( Data added process to the server )
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('Adding New User : ', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
            /*-----frontend theke jei data ta asche seta hocche json--> .then(res => res.json()) . Ar amra jani json array / object akare data pathay. tai ekhane res.send er moddhe object akare output dekhate hoyeche.-----  */
        });

        // GET API : ( front end theke pathano data jeta, mongo database e stored chilo seta, niye ese Node er server-->localhost:5000 dekhano )
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        // Delete a user :
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // GET API: ( sudhu ekta user er data load korbo tar _id diye  )
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // PUT API: ( exsisting data ke update korar jonno )
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            console.log(updatedUser);

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });
    }
    finally {
        // await client.close();  
        /* ---ekbar operation hobar por o connection active rakhte cai. er jonno ei code ta ke comment out kore rakha hoyeche--------- */
    }
};
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running my CRUD server')
});


app.listen(port, () => {
    console.log('Node-Express-MongoDB --> Server : ', port);
});

/* -----heroku deployment steps----- */