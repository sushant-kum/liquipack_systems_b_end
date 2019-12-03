import { model as mongoose__model, Document } from 'mongoose';

import { AppQuotationSchema } from '@app/schemas/mongoose-db/apps-quotation.schema';

export const Model = mongoose__model('apps-quotation', AppQuotationSchema);
export function get(callback: (err: any, res: Document[]) => void, limit?: number): void {
  if (limit) {
    Model.find(callback).limit(limit);
  } else {
    Model.find(callback);
  }
}
export interface MongooseDocumentSchema extends Document {
  quotation_num?: string;
  speed: {
    qty: number;
    price: number;
  };
  no_of_washes: {
    qty: number;
    price: number;
  };
  industry: {
    qty: string;
    price: number;
  };
  gmp_requirement: {
    qty: boolean;
    price: number;
  };
  bottle_moc: {
    qty: string;
    price: number;
  };
  water_saving: {
    qty: boolean;
    price: number;
  };
  filters_required: {
    qty: boolean;
    price: number;
  };
  illumination_required: {
    qty: boolean;
    price: number;
  };
  auto_level_tank: {
    qty: boolean;
    price: number;
  };
  extra_cups_sets: {
    qty: number;
    price: number;
  };
  other_details?: string;
  customer_details: {
    name: string;
    address: string;
    person_of_contact: {
      title: string;
      name: string;
    };
    contact_no: string;
  };
  created_by?: string;
  is_active?: boolean;
}

export interface NativeScehma {
  quotation_num?: string;
  speed: {
    qty: number;
    price: number;
  };
  no_of_washes: {
    qty: number;
    price: number;
  };
  industry: {
    qty: string;
    price: number;
  };
  gmp_requirement: {
    qty: boolean;
    price: number;
  };
  bottle_moc: {
    qty: string;
    price: number;
  };
  water_saving: {
    qty: boolean;
    price: number;
  };
  filters_required: {
    qty: boolean;
    price: number;
  };
  illumination_required: {
    qty: boolean;
    price: number;
  };
  auto_level_tank: {
    qty: boolean;
    price: number;
  };
  extra_cups_sets: {
    qty: number;
    price: number;
  };
  other_details?: string;
  customer_details: {
    name: string;
    address: string;
    person_of_contact: {
      title: string;
      name: string;
    };
    contact_no: string;
  };
  created_by?: string;
  is_active?: boolean;
}
