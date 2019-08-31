let router = require('express').Router();
let path = require('path');

const base_path = path.dirname(require.main.filename);

let AuthController = require(base_path + '/controllers/auth.controller.js');

let _get__login = require(base_path + '/handlers/GET/api/login/get__login');
let _get__login__token = require(base_path + '/handlers/GET/api/login/token/get__login__token');
// let _put__login__refreshtoken = require(base_path + '/handlers/PUT/api/login/refreshtoken/put__login__refreshtoken');

let _get__profile = require(base_path + '/handlers/GET/api/profile/:user_id/get__profile__:user_id');
let _put__profile = require(base_path + '/handlers/PUT/api/profile/:user_id/put__profile__:user_id');

let _get__users = require(base_path + '/handlers/GET/api/users/get__users');
let _post__users = require(base_path + '/handlers/POST/api/users/post__users');

let _get__users__min = require(base_path + '/handlers/GET/api/users/min/get__users__min');

let _get__users__user_id = require(base_path + '/handlers/GET/api/users/:user_id/get__users__:user_id');
let _put__users__user_id = require(base_path + '/handlers/PUT/api/users/:user_id/put__users__:user_id');
let _delete__users__user_id = require(base_path + '/handlers/DELETE/api/users/:user_id/delete__users__:user_id');
let _patch__users__user_id__disable = require(base_path + '/handlers/PATCH/api/users/:user_id/disable/patch__users__:user_id__disable');
let _patch__users__user_id__enable = require(base_path + '/handlers/PATCH/api/users/:user_id/enable/patch__users__:user_id__enable');

let _get__quotations = require(base_path + '/handlers/GET/api/quotations/get__quotations');
let _post__quotations = require(base_path + '/handlers/POST/api/quotations/post__quotations');

let _get__quotations__quotation_id = require(base_path + '/handlers/GET/api/quotations/:quitation_id/get__quotations__:quotation_id');
let _put__quotations__quotation_id = require(base_path + '/handlers/PUT/api/quotations/:quotation_id/put__quotations__:quotation_id');
let _delete__quotations__quotation_id = require(base_path + '/handlers/DELETE/api/quotations/:quotation_id/delete__quotations__:quotation_id');
let _patch__quotations__quotation_id__disable = require(base_path + '/handlers/PATCH/api/quotations/:quotation_id/disable/patch__quotations__:quotation_id__disable');
let _patch__quotations__quotation_id__enable = require(base_path + '/handlers/PATCH/api/quotations/:quotation_id/enable/patch__quotations__:quotation_id__enable');

let _get__quotations__configs = require(base_path + '/handlers/GET/api/quotations/configs/get__quotations__configs');
let _post__quotations__configs = require(base_path + '/handlers/POST/api/quotations/configs/post__quotations__configs');

let _get__quotations__configs__active = require(base_path + '/handlers/GET/api/quotations/configs/active/get__quotations__configs__active');

let _get__quotations__configs__config_id = require(base_path + '/handlers/GET/api/quotations/configs/:config_id/get__quotations__configs__:config_id');
let _put__quotations__configs__config_id = require(base_path + '/handlers/PUT/api/quotations/configs/:config_id/put__quotations__configs__:config_id');
let _delete__quotations__configs__config_id = require(base_path + '/handlers/DELETE/api/quotations/configs/:config_id/delete__quotations__configs__:config_id');
let _patch__quotations__configs__config_id__enable = require(base_path + '/handlers/PATCH/api/quotations/configs/:config_id/enable/patch__quotations__configs__:config_id__enable');

router.get('/', function (req, res) {
  res.json({
    status: 'success',
    message: 'Welcome to liquipack_systems APIs crafted with love!',
  });
});

router.route('/api/login').get(AuthController.isBasicAuthenticated, _get__login.handler);
router.route('/api/login/token').get(AuthController.isJWTAuthenticated, _get__login__token.handler);
// router.route('/api/login/refreshtoken').put(_put__login__refreshtoken.handler);

router.route('/api/profile/:user_id').get(AuthController.isJWTAuthenticated, _get__profile.handler);
router.route('/api/profile/:user_id').put(AuthController.isJWTAuthenticated, _put__profile.handler);

router.route('/api/users').get(AuthController.isJWTAuthenticated, _get__users.handler);
router.route('/api/users').post(AuthController.isJWTAuthenticated, _post__users.handler);

router.route('/api/users/min').get(AuthController.isJWTAuthenticated, _get__users__min.handler);

router.route('/api/users/:user_id').get(AuthController.isJWTAuthenticated, _get__users__user_id.handler);
router.route('/api/users/:user_id').put(AuthController.isJWTAuthenticated, _put__users__user_id.handler);
router.route('/api/users/:user_id').delete(AuthController.isJWTAuthenticated, _delete__users__user_id.handler);
router.route('/api/users/:user_id/disable').patch(AuthController.isJWTAuthenticated, _patch__users__user_id__disable.handler);
router.route('/api/users/:user_id/enable').patch(AuthController.isJWTAuthenticated, _patch__users__user_id__enable.handler);

router.route('/api/quotations/configs').get(AuthController.isJWTAuthenticated, _get__quotations__configs.handler);
router.route('/api/quotations/configs').post(AuthController.isJWTAuthenticated, _post__quotations__configs.handler);

router.route('/api/quotations/configs/active').get(AuthController.isJWTAuthenticated, _get__quotations__configs__active.handler);

router.route('/api/quotations/configs/:config_id').get(AuthController.isJWTAuthenticated, _get__quotations__configs__config_id.handler);
router.route('/api/quotations/configs/:config_id').put(AuthController.isJWTAuthenticated, _put__quotations__configs__config_id.handler);
router.route('/api/quotations/configs/:config_id').delete(AuthController.isJWTAuthenticated, _delete__quotations__configs__config_id.handler);
router.route('/api/quotations/configs/:config_id/enable').patch(AuthController.isJWTAuthenticated, _patch__quotations__configs__config_id__enable.handler);

router.route('/api/quotations').get(AuthController.isJWTAuthenticated, _get__quotations.handler);
router.route('/api/quotations').post(AuthController.isJWTAuthenticated, _post__quotations.handler);

router.route('/api/quotations/:quotation_id').get(AuthController.isJWTAuthenticated, _get__quotations__quotation_id.handler);
router.route('/api/quotations/:quotation_id').put(AuthController.isJWTAuthenticated, _put__quotations__quotation_id.handler);
router.route('/api/quotations/:quotation_id').delete(AuthController.isJWTAuthenticated, _delete__quotations__quotation_id.handler);
router.route('/api/quotations/:quotation_id/disable').patch(AuthController.isJWTAuthenticated, _patch__quotations__quotation_id__disable.handler);
router.route('/api/quotations/:quotation_id/enable').patch(AuthController.isJWTAuthenticated, _patch__quotations__quotation_id__enable.handler);

module.exports = router;