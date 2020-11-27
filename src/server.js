import app from './app';

app.listen(process.env.API_PORT || 3333, () =>
  console.log(`Server is running on port ${process.env.API_PORT || 3333}`)
);
