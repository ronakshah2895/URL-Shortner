const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

app.use(bodyParser.json());

const {
  createUrl, editUrl, deleteUrl, redirectReq,
} = require('./routeHandler');

app.post('/create_url', createUrl);
app.post('/edit_url', editUrl);
app.post('/delete_url', deleteUrl);
app.get('/:identifier', redirectReq);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
