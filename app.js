const express = require('express');

const postRouter = require('./routers/posts.js');
const categoryRouter = require('./routers/categories.js');
const tagRouter = require('./routers/tags.js');
const authRouter = require('./routers/auth.js');

const errorHandler = require('./middlewares/errorHandler.js');
const notFound = require('./middlewares/notFound.js');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const { PORT } = process.env;
const port = PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);

app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/tags', tagRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server avviato su: http://localhost:${port}`);
});
