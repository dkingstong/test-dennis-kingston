const express = require('express');
const bodyParser = require('body-parser');

export default function () {
    const app = express();
    app.use(bodyParser.json());
    return app;
}
