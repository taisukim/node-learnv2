const express = require('express');
const app = express();
const nunjucks = require('nunjucks').configure('template', {
    //autoEscape 를 true 로 하면 html 테그를 무효화한다
    autoescape : false,
    express : app
});
const logger = require('morgan');

const bodyParser = require('body-parser');
const port = 3000;

//nunjucks ( view engine )
// nunjucks.configure('template', {
//     //autoEscape 를 true 로 하면 html 테그를 무효화한다
//     autoescape : false,
//     express : app
// });

//미들웨어 setting
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    app.locals.isLogin = false;
    app.locals.req_path = req.path;
    next();
});

//router
const adminRouter = require('./routes/admin');

//router
app.use('/admin', vipMiddleware, adminRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

function vipMiddleware(req, res, next) {
    console.log('최우선 미들웨어');
    next();
}

app.get('/fastcampus', (req, res) => {
    res.send('hello fastcampus');
});

app.use((req, res, _) => {
    res.status(400).render('common/404.html');
});

app.use((req, res, _) => {
    res.status(500).render('common/500.html');
});

app.listen(port, () => {
    console.log('express listening on port', port);
});