const app = require('./config/express').default();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

module.exports = app;
