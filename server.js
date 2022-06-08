const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '.', 'build')));
app.listen(process.env.PORT || 8080);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join('build', 'index.html'));
    });
}