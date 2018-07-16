import express from 'express';
import bodyParser from 'body-parser';


// instantiate a new express object
const app = express();
const port = 5000;

// body parser to parse request in urlencoded and jsonformat
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// base path for routes
app.get('/', (request, response) => response.send('just created my server'));

app.listen(port, () => console.log(`server started at port ${port}`));


export default app;
