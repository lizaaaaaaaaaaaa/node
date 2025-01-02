const express = require('express');
const bd = require("./database");
const app = express();

app.get('/', (req, res) => {
    res.send(bd);
});

app.post('/', (req, res) => {
    const newUser = {
        id: bd.length + 1,
        nickname: "helloWorld2000",
        login: "hello2000",
        password: "qwerty2000",
        age: 20
    };
    bd.push(newUser);
    res.send(bd)
});

app.patch('/:userId', (req, res) => {
    const id = req.params.userId;

    const wantedUser = bd.findIndex(user => +id === user.id);

    bd[wantedUser].password = "qqqqwwww1";
    res.send(bd);
});

app.delete('/:userId', (req, res) => {
    const id = req.params.userId;

    const newBd = bd.filter(user => +id !== user.id);
    res.send(newBd);
});

app.listen(8888);