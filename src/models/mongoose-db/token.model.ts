import { model as mongoose__model, Document } from 'mongoose';

import { TokenSchema } from '@app/schemas/mongoose-db/token.schema';

export const Model = mongoose__model('token', TokenSchema);
export function get(callback: (err: any, res: Document[]) => void, limit?: number): void {
  if (limit) {
    Model.find(callback).limit(limit);
  } else {
    Model.find(callback);
  }
}
export interface MongooseDocumentSchema extends Document {
  username?: string;
  token: string;
  uuid: string;
  created_timestamp?: Date;
  last_updated_timestamp?: Date;
  is_active?: boolean;
}

export interface NativeSchema {
  username?: string;
  token: string;
  uuid: string;
  created_timestamp?: Date;
  last_updated_timestamp?: Date;
  is_active?: boolean;
}
