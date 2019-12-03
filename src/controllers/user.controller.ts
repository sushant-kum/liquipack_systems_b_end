import * as User from '@app/models/mongoose-db/user.model';
import { Document } from 'mongoose';

export function findOne(query: any, callback: (err: any, user?: User.MongooseDocumentSchema) => void): void {
  User.Model.findOne(query, (error: any, user: User.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
}

export function index(callback: (err: any, users?: User.MongooseDocumentSchema[]) => void): void {
  User.get((error: any, users: Document[]) => {
    if (error) {
      callback(error);
    } else {
      callback(null, users as User.MongooseDocumentSchema[]);
    }
  });
}

export function create(
  new_user: User.NativeScehma,
  callback: (err: any, user?: User.MongooseDocumentSchema) => void
): void {
  const user = new User.Model({
    username: new_user.username,
    password_hash: new_user.password_hash,
    app_permissions: new_user.app_permissions,
    name: new_user.name,
    gender: new_user.gender ? new_user.gender : null,
    email: new_user.email,
    phone: new_user.phone ? new_user.phone : null
  });
  user.save((error: any) => {
    if (error) {
      callback(error);
    } else {
      callback(null, user as User.MongooseDocumentSchema);
    }
  });
}

export function view(user_id: string, callback: (err: any, user?: User.MongooseDocumentSchema | null) => void): void {
  User.Model.findById(user_id, (error: any, user: User.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
}

export function update(
  user_id: string,
  update_user: User.NativeScehma,
  callback: (err: any, user?: User.MongooseDocumentSchema | null) => void
): void {
  User.Model.findById(user_id, (error: any, user: User.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      user.password_hash = update_user.password_hash;
      user.app_permissions = update_user.app_permissions;
      user.name = update_user.name;
      user.gender = update_user.gender;
      user.email = update_user.email;
      user.phone = update_user.phone;
      user.save((error_save: any) => {
        if (error_save) {
          callback(error_save);
        } else {
          callback(null, user);
        }
      });
    }
  });
}

export function make_inactive(
  user_id: string,
  callback: (err: any, user?: User.MongooseDocumentSchema | null) => void
): void {
  User.Model.findById(user_id, (error: any, user: User.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      user.is_active = false;
      user.save((error_save: any) => {
        if (error_save) {
          callback(error_save);
        } else {
          callback(null, user);
        }
      });
    }
  });
}

export function make_active(
  user_id: string,
  callback: (err: any, user?: User.MongooseDocumentSchema | null) => void
): void {
  User.Model.findById(user_id, (error: any, user: User.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      user.is_active = true;
      user.save((error_save: any) => {
        if (error_save) {
          callback(error_save);
        } else {
          callback(null, user);
        }
      });
    }
  });
}

export function remove(user_id: string, callback: (err: any) => void): void {
  User.Model.deleteOne(
    {
      _id: user_id
    },
    (error: any) => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    }
  );
}

export function checkCredentials(
  username: string,
  password_hash: string,
  callback: (err: any, user?: User.MongooseDocumentSchema | null) => void
): void {
  User.Model.findOne(
    {
      username,
      password_hash,
      is_active: true
    },
    'app_permissions',
    (error: any, user: User.MongooseDocumentSchema) => {
      if (error) {
        callback(error);
      } else {
        callback(null, user);
      }
    }
  );
}
