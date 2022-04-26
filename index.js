const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors'); /* ----It makes connection between client side (port: 3000) and server side (port: 5000)----  */
app.use(cors());

app.use(express.json());
/*----------------------------------------------
         user:       dbuser1
         password:   kQy8VZ31fZZ4V7kn
----------------------------------------------------------------*/

const { MongoClient, ServerApiVersion } = require('mongodb');

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
        app.post('/user', (req, res) => {
            const newUser = req.body;
            console.log('Adding New User : ', newUser);
            res.send({ result: 'Backend received data from Frontend' })  /*-----frontend theke jei data ta asche seta hocche json--> .then(res => res.json()) . Ar amra jani json array / object akare data pathay. tai ekhane res.send er moddhe object akare output dekhate hoyeche.-----  */
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
