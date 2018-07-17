import express from 'express';
import bodyParser from 'body-parser';
import logger from 'volleyball';
import entryRoute from './server/routes/entryRoute';


const app = express();

const port = process.env.PORT || 5555;
// Log Requests
app.use(logger);

// Stream request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Base Routes
app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome To MyDiary... Write Your Intentions And Emotions!',
}));
// app.use('/api/v1/auth', authRoute);
app.use('/api/v1/entries', entryRoute);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
export default app;