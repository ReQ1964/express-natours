import app from './app';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
