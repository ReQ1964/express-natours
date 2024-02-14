import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
dotenv.config();

const DB = process.env['DATABASE'].replace('<PASSWORD>', process.env['DATABASE_PASSWORD']);

mongoose.connect(DB).then(() => console.log('DB Connection successful!'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
