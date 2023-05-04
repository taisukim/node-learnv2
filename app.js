const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

class App {
    constructor() {
        this.app = express();
        //뷰엔진
        this.setViewEngine();
        //middle ware
        this.setMiddleWare();
        //static dir
        this.setStatic();
        //local variable
        this.setLocals();
        //routing
        this.getRouting();
        //404
        this.status404();
        //error
        this.errorHandle();
    }

    setViewEngine() {
        //nunjucks ( view engine )
        nunjucks.configure('template', {
            //autoEscape 를 true 로 하면 html 테그를 무효화한다
            autoescape : true,
            express : this.app
        });
    }

    setMiddleWare() {
        //미들웨어 setting
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        // function vipMiddleware(req, res, next) {
        //     console.log('최우선 미들웨어');
        //     next();
        // }
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals() {
        this.app.use((req, res, next) => {
            this.app.locals.isLogin = false;
            this.app.locals.req_path = req.path;
            next();
        });
    }

    getRouting() {
        this.app.use(require('./controllers'))
        //router
        // this.app.use('/admin', require('./controller/admin/index'));
        //
        // this.app.get('/', (req, res) => {
        //     res.send('hello world');
        // });
        //
        // this.app.get('/fastcampus', (req, res) => {
        //     res.send('hello fastcampus');
        // });
        //

    }

    status404() {
        this.app.use((req, res, _) => {
            res.status(400).render('common/404.html');
        });
    }

    errorHandle() {
        this.app.use((req, res, _) => {
            res.status(500).render('common/500.html');
        });
    }
}

module.exports = new App().app;