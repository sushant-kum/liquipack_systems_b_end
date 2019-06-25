let router = require('express').Router();
let path = require('path');

const base_path = path.dirname(require.main.filename);

let AuthController = require(base_path + '/controllers/auth.controller.js');

let _get__login = require(base_path + '/handlers/GET/api/login/get__login');
let _get__login__token = require(base_path + '/handlers/GET/api/login/token/get__login__token');
// let _put__login__refreshtoken = require(base_path + '/handlers/PUT/api/login/refreshtoken/put__login__refreshtoken');
let _get__profile = require(base_path + '/handlers/GET/api/profile/:user_id/get__profile__:user_id');
let _get__users = require(base_path + '/handlers/GET/api/users/get__users');
let _post__users = require(base_path + '/handlers/POST/api/users/post__users');
let _get__users__user_id = require(base_path + '/handlers/GET/api/users/:user_id/get__users__:user_id');
let _put__users__user_id = require(base_path + '/handlers/PUT/api/users/:user_id/put__users__:user_id');
let _delete__users__user_id = require(base_path + '/handlers/DELETE/api/users/:user_id/delete__users__:user_id');

router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'Welcome to liquipack_systems APIs crafted with love!',
    });
});

router.route('/api/login').get(AuthController.isBasicAuthenticated, _get__login.handler);
router.route('/api/login/token').get(AuthController.isJWTAuthenticated, _get__login__token.handler);
// router.route('/api/login/refreshtoken').put(_put__login__refreshtoken.handler);

router.route('/api/users').get(AuthController.isJWTAuthenticated, _get__users.handler);
router.route('/api/users').post(AuthController.isJWTAuthenticated, _post__users.handler);

router.route('/api/users/:user_id').get(AuthController.isJWTAuthenticated, _get__users__user_id.handler);
router.route('/api/users/:user_id').put(AuthController.isJWTAuthenticated, _put__users__user_id.handler);
router.route('/api/users/:user_id').delete(AuthController.isJWTAuthenticated, _delete__users__user_id.handler);

router.route('/api/profile/:user_id').get(AuthController.isJWTAuthenticated, _get__profile.handler);

module.exports = router;