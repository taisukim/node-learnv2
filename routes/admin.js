const express = require('express');
const router = express.Router();

function testMiddleware(req, res, next) {
    console.log('first middle ware');
    next();
}

router.get('/', testMiddleware,  (req, res) => {
    res.send('admin 이후 url');
});

router.get('/products', (req, res) => {
    // res.send('admin products');
    res.render('admin/products.html', {
        message : "<h1>hello!!!!123123</h1>",
        online : "this is express"
    })
});

router.get('/products/write', (req, res) => {
    res.render('admin/write.html');
});

router.post('/products/write', (req, res) => {
    res.send(req.body);
});

module.exports = router;