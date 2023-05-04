const {Router} = require('express');
const router = Router();
const ctrl = require('./admin.ctrl');

// router.get('/', (req,res) => {
//     res.send('admin app');
// });

router.get('/products', ctrl.get_products);

module.exports = router;