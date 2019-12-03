import * as AppsQuotation from '@app/models/mongoose-db/apps-quotation.model';
import { Document } from 'mongoose';

export function findOne(
  query: any,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  AppsQuotation.Model.findOne(query, (error: any, quotation: AppsQuotation.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation);
    }
  });
}

export function index(callback: (err: any, quotations?: AppsQuotation.MongooseDocumentSchema[]) => void): void {
  AppsQuotation.get((error: any, quotations: Document[]) => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotations as AppsQuotation.MongooseDocumentSchema[]);
    }
  });
}

export function create(
  new_quotation: AppsQuotation.NativeScehma,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  const quotation = new AppsQuotation.Model(new_quotation);
  quotation.save(error => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation as AppsQuotation.MongooseDocumentSchema);
    }
  });
}

export function view(
  quotation_id: string,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  AppsQuotation.Model.findById(quotation_id, (error: any, quotation: AppsQuotation.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation);
    }
  });
}

export function update(
  quotation_id: string,
  update_quotation: AppsQuotation.NativeScehma,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  AppsQuotation.Model.findById(quotation_id, (error: any, quotation: AppsQuotation.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      quotation.speed = update_quotation.speed;
      quotation.no_of_washes = update_quotation.no_of_washes;
      quotation.industry = update_quotation.industry;
      quotation.gmp_requirement = update_quotation.gmp_requirement;
      quotation.bottle_moc = update_quotation.bottle_moc;
      quotation.water_saving = update_quotation.water_saving;
      quotation.filters_required = update_quotation.filters_required;
      quotation.illumination_required = update_quotation.illumination_required;
      quotation.auto_level_tank = update_quotation.auto_level_tank;
      quotation.extra_cups_sets = update_quotation.extra_cups_sets;
      quotation.other_details = update_quotation.other_details;
      quotation.customer_details = update_quotation.customer_details;
      quotation.save((errorquotationsave: any) => {
        if (errorquotationsave) {
          callback(errorquotationsave);
        } else {
          callback(null, quotation);
        }
      });
    }
  });
}

export function make_inactive(
  quotation_id: string,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  AppsQuotation.Model.findById(quotation_id, (error: any, quotation: AppsQuotation.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      quotation.is_active = false;
      quotation.save((errorquotationsave: any) => {
        if (errorquotationsave) {
          callback(errorquotationsave);
        } else {
          callback(null, quotation);
        }
      });
    }
  });
}

export function make_active(
  quotation_id: string,
  callback: (err: any, quotation?: AppsQuotation.MongooseDocumentSchema) => void
): void {
  AppsQuotation.Model.findById(quotation_id, (error: any, quotation: AppsQuotation.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      quotation.is_active = true;
      quotation.save((errorquotationsave: any) => {
        if (errorquotationsave) {
          callback(errorquotationsave);
        } else {
          callback(null, quotation);
        }
      });
    }
  });
}

export function remove(quotation_id: string, callback: (err: any) => void): void {
  AppsQuotation.Model.deleteOne(
    {
      _id: quotation_id
    },
    error => {
      if (error) {
        callback(error);
      } else {
        callback(null);
      }
    }
  );
}
