import * as express from 'express';
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import * as AuthController from '@app/controllers/auth.controller';
const router = express.Router();

import * as _get__login from '@app/handlers/GET/login/get__login.handler';
import * as _get__login__token from '@app/handlers/GET/login/token/get__login__token.handler';

import * as _get__profile from '@app/handlers/GET/profile/{user_id}/get__profile__{user_id}.handler';
import * as _put__profile from '@app/handlers/PUT/profile/{user_id}/put__profile__{user_id}.handler';

import * as _get__users from '@app/handlers/GET/users/get__users.handler';
import * as _post__users from '@app/handlers/POST/users/post__users.handler';

import * as _get__users__min from '@app/handlers/GET/users/min/get__users__min.handler';

import * as _get__users__user_id from '@app/handlers/GET/users/{user_id}/get__users__{user_id}.handler';
import * as _put__users__user_id from '@app/handlers/PUT/users/{user_id}/put__users__{user_id}.handler';
import * as _delete__users__user_id from '@app/handlers/DELETE/users/{user_id}/delete__users__{user_id}.handler';
import * as _patch__users__user_id__disable from '@app/handlers/PATCH/users/{user_id}/disable/patch__users__{user_id}__disable.handler';
import * as _patch__users__user_id__enable from '@app/handlers/PATCH/users/{user_id}/enable/patch__users__{user_id}__enable.handler';

import * as _get__quotations__configs from '@app/handlers/GET/quotations/configs/get__quotations__configs.handler';
import * as _post__quotations__configs from '@app/handlers/POST/quotations/configs/post__quotations__configs.handler';

import * as _get__quotations__configs__active from '@app/handlers/GET/quotations/configs/active/get__quotations__configs__active.handler';

import * as _get__quotations__configs__config_id from '@app/handlers/GET/quotations/configs/{config_id}/get__quotations__configs__{config_id}.handler';
import * as _put__quotations__configs__config_id from '@app/handlers/PUT/quotations/configs/{config_id}/put__quotations__configs__{config_id}.handler';
import * as _delete__quotations__configs__config_id from '@app/handlers/DELETE/quotations/configs/{config_id}/delete__quotations__configs__{config_id}.handler';
import * as _patch__quotations__configs__config_id__enable from '@app/handlers/PATCH/quotations/configs/{config_id}/enable/patch__quotations__configs__{config_id}__enable.handler';

import * as _get__quotations from '@app/handlers/GET/quotations/get__quotations.handler';
import * as _post__quotations from '@app/handlers/POST/quotations/post__quotations.handler';

import * as _get__quotations__quotation_id from '@app/handlers/GET/quotations/{quotation_id}/get__quotations__{quotation_id}.handler';
import * as _put__quotations__quotation_id from '@app/handlers/PUT/quotations/{quotation_id}/put__quotations__{quotation_id}.handler';
import * as _delete__quotations__quotation_id from '@app/handlers/DELETE/quotations/{quotation_id}/delete__quotations__{quotation_id}.handler';
import * as _patch__quotations__quotation_id__disable from '@app/handlers/PATCH/quotations/{quotation_id}/disable/patch__quotations__{quotation_id}__disable.handler';
import * as _patch__quotations__quotation_id__enable from '@app/handlers/PATCH/quotations/{quotation_id}/enable/patch__quotations__{quotation_id}__enable.handler';

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to liquipack_systems APIs crafted with love!'
  });
});

router.get('/db-ping', (req: Request, res: Response) => {
  const mongoose_state = mongoose.connection.readyState;
  if (mongoose_state === 1) {
    res.json({
      status: mongoose.connection.readyState,
      message: 'DB Connected'
    });
  } else {
    res.status(500).json({
      status: mongoose.connection.readyState,
      message: 'DB Not Connected'
    });
  }
});

router.route('/check-auth').get(AuthController.isBasicAuthenticated, (req: Request, res: Response) => {
  res.json({
    status: 'OK'
  });
});

router.route('/login').get(AuthController.isBasicAuthenticated, _get__login.handler);
router.route('/login/token').get(AuthController.isJWTAuthenticated, _get__login__token.handler);

router
  .route('/profile/:user_id')
  .get(AuthController.isJWTAuthenticated, _get__profile.handler)
  .put(AuthController.isJWTAuthenticated, _put__profile.handler);

router
  .route('/users')
  .get(AuthController.isJWTAuthenticated, _get__users.handler)
  .post(AuthController.isJWTAuthenticated, _post__users.handler);

router.route('/users/min').get(AuthController.isJWTAuthenticated, _get__users__min.handler);

router
  .route('/users/:user_id')
  .get(AuthController.isJWTAuthenticated, _get__users__user_id.handler)
  .put(AuthController.isJWTAuthenticated, _put__users__user_id.handler)
  .delete(AuthController.isJWTAuthenticated, _delete__users__user_id.handler);
router
  .route('/users/:user_id/disable')
  .patch(AuthController.isJWTAuthenticated, _patch__users__user_id__disable.handler);
router.route('/users/:user_id/enable').patch(AuthController.isJWTAuthenticated, _patch__users__user_id__enable.handler);

router
  .route('/quotations/configs')
  .get(AuthController.isJWTAuthenticated, _get__quotations__configs.handler)
  .post(AuthController.isJWTAuthenticated, _post__quotations__configs.handler);

router
  .route('/quotations/configs/active')
  .get(AuthController.isJWTAuthenticated, _get__quotations__configs__active.handler);

router
  .route('/quotations/configs/:config_id')
  .get(AuthController.isJWTAuthenticated, _get__quotations__configs__config_id.handler)
  .put(AuthController.isJWTAuthenticated, _put__quotations__configs__config_id.handler)
  .delete(AuthController.isJWTAuthenticated, _delete__quotations__configs__config_id.handler);
router
  .route('/quotations/configs/:config_id/enable')
  .patch(AuthController.isJWTAuthenticated, _patch__quotations__configs__config_id__enable.handler);

router
  .route('/quotations')
  .get(AuthController.isJWTAuthenticated, _get__quotations.handler)
  .post(AuthController.isJWTAuthenticated, _post__quotations.handler);

router
  .route('/quotations/:quotation_id')
  .get(AuthController.isJWTAuthenticated, _get__quotations__quotation_id.handler)
  .put(AuthController.isJWTAuthenticated, _put__quotations__quotation_id.handler)
  .delete(AuthController.isJWTAuthenticated, _delete__quotations__quotation_id.handler);
router
  .route('/quotations/:quotation_id/disable')
  .patch(AuthController.isJWTAuthenticated, _patch__quotations__quotation_id__disable.handler);
router
  .route('/quotations/:quotation_id/enable')
  .patch(AuthController.isJWTAuthenticated, _patch__quotations__quotation_id__enable.handler);

export { router };
