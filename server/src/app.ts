import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import api from './routes/api';
import path from 'path';

const app = express();
const basePath = process.cwd();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(basePath, 'public')));
app.use('/api/v1', api);
app.get('/*', (req, res) => {
  res.sendFile(path.join(basePath, 'public', 'index.html'));
});
export default app;