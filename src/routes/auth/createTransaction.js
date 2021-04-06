import * as api from 'api.js';

export function post(req, res) {
    const transaction = req.body;

    api.post('transactions', transaction, req.session.token).then(response => {
        if (response.token) req.session.token = response.token;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
}