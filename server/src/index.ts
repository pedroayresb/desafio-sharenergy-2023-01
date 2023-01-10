import express  from  'express';
import mongoose from 'mongoose';
import Users from './models/Users';
import userRouter from './routes/user.router';
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//mongodb+srv://pedroayresb:9TQy2uxfb7lq1XIp@sharecluster.czmz1fl.mongodb.net/?retryWrites=true&w=majority

mongoose
  .connect('mongodb+srv://pedroayresb:9TQy2uxfb7lq1XIp@sharecluster.czmz1fl.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
