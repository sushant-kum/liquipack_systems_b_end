const router = require("express").Router();
const path = require("path");

const base_path = path.dirname(require.main.filename);

const AuthController = require(base_path + "/controllers/auth.controller.js");

const _get__login = require(base_path + "/handlers/GET/api/login/get__login");
const _get__login__token = require(base_path +
  "/handlers/GET/api/login/token/get__login__token");
// let _put__login__refreshtoken = require(base_path + '/handlers/PUT/api/login/refreshtoken/put__login__refreshtoken');

const _get__profile = require(base_path +
  "/handlers/GET/api/profile/:user_id/get__profile__:user_id");
const _put__profile = require(base_path +
  "/handlers/PUT/api/profile/:user_id/put__profile__:user_id");

const _get__users = require(base_path + "/handlers/GET/api/users/get__users");
const _post__users = require(base_path +
  "/handlers/POST/api/users/post__users");

const _get__users__min = require(base_path +
  "/handlers/GET/api/users/min/get__users__min");

const _get__users__user_id = require(base_path +
  "/handlers/GET/api/users/:user_id/get__users__:user_id");
const _put__users__user_id = require(base_path +
  "/handlers/PUT/api/users/:user_id/put__users__:user_id");
const _delete__users__user_id = require(base_path +
  "/handlers/DELETE/api/users/:user_id/delete__users__:user_id");
const _patch__users__user_id__disable = require(base_path +
  "/handlers/PATCH/api/users/:user_id/disable/patch__users__:user_id__disable");
const _patch__users__user_id__enable = require(base_path +
  "/handlers/PATCH/api/users/:user_id/enable/patch__users__:user_id__enable");

const _get__quotations = require(base_path +
  "/handlers/GET/api/quotations/get__quotations");
const _post__quotations = require(base_path +
  "/handlers/POST/api/quotations/post__quotations");

const _get__quotations__quotation_id = require(base_path +
  "/handlers/GET/api/quotations/:quitation_id/get__quotations__:quotation_id");
const _put__quotations__quotation_id = require(base_path +
  "/handlers/PUT/api/quotations/:quotation_id/put__quotations__:quotation_id");
const _delete__quotations__quotation_id = require(base_path +
  "/handlers/DELETE/api/quotations/:quotation_id/delete__quotations__:quotation_id");
const _patch__quotations__quotation_id__disable = require(base_path +
  "/handlers/PATCH/api/quotations/:quotation_id/disable/patch__quotations__:quotation_id__disable");
const _patch__quotations__quotation_id__enable = require(base_path +
  "/handlers/PATCH/api/quotations/:quotation_id/enable/patch__quotations__:quotation_id__enable");

const _get__quotations__configs = require(base_path +
  "/handlers/GET/api/quotations/configs/get__quotations__configs");
const _post__quotations__configs = require(base_path +
  "/handlers/POST/api/quotations/configs/post__quotations__configs");

const _get__quotations__configs__active = require(base_path +
  "/handlers/GET/api/quotations/configs/active/get__quotations__configs__active");

const _get__quotations__configs__config_id = require(base_path +
  "/handlers/GET/api/quotations/configs/:config_id/get__quotations__configs__:config_id");
const _put__quotations__configs__config_id = require(base_path +
  "/handlers/PUT/api/quotations/configs/:config_id/put__quotations__configs__:config_id");
const _delete__quotations__configs__config_id = require(base_path +
  "/handlers/DELETE/api/quotations/configs/:config_id/delete__quotations__configs__:config_id");
const _patch__quotations__configs__config_id__enable = require(base_path +
  "/handlers/PATCH/api/quotations/configs/:config_id/enable/patch__quotations__configs__:config_id__enable");

router.get("/", function(req, res) {
  res.json({
    status: "success",
    message: "Welcome to liquipack_systems APIs crafted with love!"
  });
});

router
  .route("/api/login")
  .get(AuthController.isBasicAuthenticated, _get__login.handler);
router
  .route("/api/login/token")
  .get(AuthController.isJWTAuthenticated, _get__login__token.handler);
// router.route('/api/login/refreshtoken').put(_put__login__refreshtoken.handler);

router
  .route("/api/profile/:user_id")
  .get(AuthController.isJWTAuthenticated, _get__profile.handler);
router
  .route("/api/profile/:user_id")
  .put(AuthController.isJWTAuthenticated, _put__profile.handler);

router
  .route("/api/users")
  .get(AuthController.isJWTAuthenticated, _get__users.handler);
router
  .route("/api/users")
  .post(AuthController.isJWTAuthenticated, _post__users.handler);

router
  .route("/api/users/min")
  .get(AuthController.isJWTAuthenticated, _get__users__min.handler);

router
  .route("/api/users/:user_id")
  .get(AuthController.isJWTAuthenticated, _get__users__user_id.handler);
router
  .route("/api/users/:user_id")
  .put(AuthController.isJWTAuthenticated, _put__users__user_id.handler);
router
  .route("/api/users/:user_id")
  .delete(AuthController.isJWTAuthenticated, _delete__users__user_id.handler);
router
  .route("/api/users/:user_id/disable")
  .patch(
    AuthController.isJWTAuthenticated,
    _patch__users__user_id__disable.handler
  );
router
  .route("/api/users/:user_id/enable")
  .patch(
    AuthController.isJWTAuthenticated,
    _patch__users__user_id__enable.handler
  );

router
  .route("/api/quotations/configs")
  .get(AuthController.isJWTAuthenticated, _get__quotations__configs.handler);
router
  .route("/api/quotations/configs")
  .post(AuthController.isJWTAuthenticated, _post__quotations__configs.handler);

router
  .route("/api/quotations/configs/active")
  .get(
    AuthController.isJWTAuthenticated,
    _get__quotations__configs__active.handler
  );

router
  .route("/api/quotations/configs/:config_id")
  .get(
    AuthController.isJWTAuthenticated,
    _get__quotations__configs__config_id.handler
  );
router
  .route("/api/quotations/configs/:config_id")
  .put(
    AuthController.isJWTAuthenticated,
    _put__quotations__configs__config_id.handler
  );
router
  .route("/api/quotations/configs/:config_id")
  .delete(
    AuthController.isJWTAuthenticated,
    _delete__quotations__configs__config_id.handler
  );
router
  .route("/api/quotations/configs/:config_id/enable")
  .patch(
    AuthController.isJWTAuthenticated,
    _patch__quotations__configs__config_id__enable.handler
  );

router
  .route("/api/quotations")
  .get(AuthController.isJWTAuthenticated, _get__quotations.handler);
router
  .route("/api/quotations")
  .post(AuthController.isJWTAuthenticated, _post__quotations.handler);

router
  .route("/api/quotations/:quotation_id")
  .get(
    AuthController.isJWTAuthenticated,
    _get__quotations__quotation_id.handler
  );
router
  .route("/api/quotations/:quotation_id")
  .put(
    AuthController.isJWTAuthenticated,
    _put__quotations__quotation_id.handler
  );
router
  .route("/api/quotations/:quotation_id")
  .delete(
    AuthController.isJWTAuthenticated,
    _delete__quotations__quotation_id.handler
  );
router
  .route("/api/quotations/:quotation_id/disable")
  .patch(
    AuthController.isJWTAuthenticated,
    _patch__quotations__quotation_id__disable.handler
  );
router
  .route("/api/quotations/:quotation_id/enable")
  .patch(
    AuthController.isJWTAuthenticated,
    _patch__quotations__quotation_id__enable.handler
  );

module.exports = router;
