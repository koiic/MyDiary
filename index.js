import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import entryRoute from './server/routes/entryRoute';
import authenticationRoute from './server/routes/authenticationRoute';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5000;
// Log Requests


// Stream request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors());
// Base Routes
app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome To MyDiary... Write Your Intentions And Emotions!',
}));
app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/entries', entryRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});


export default app;
