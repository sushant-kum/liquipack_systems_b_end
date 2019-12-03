import { model as mongoose__model, Document } from 'mongoose';

import { UserSchema } from '@app/schemas/mongoose-db/user.schema';

export const Model = mongoose__model('user', UserSchema);
export function get(callback: (err: any, res: Document[]) => void, limit?: number): void {
  if (limit) {
    Model.find(callback).limit(limit);
  } else {
    Model.find(callback);
  }
}
export interface MongooseDocumentSchema extends Document {
  username: string;
  password_hash: string;
  app_permissions: {
    app: string;
    permissions: string[];
  }[];
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'others';
  created_date?: Date;
  is_active?: boolean;
}

export interface NativeScehma {
  username?: string;
  password_hash: string;
  app_permissions: {
    app: string;
    permissions: string[];
  }[];
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'others';
  created_date?: Date;
  is_active?: boolean;
}
