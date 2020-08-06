const express = require('express');
const bodyParser = require('body-parser');
import routes from '../routes'

export default function () {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes);
    return app;
}
