import { Document } from 'mongoose';
import * as AppsQuotationConfig from '@app/models/mongoose-db/apps-quotation-config.model';

export function findOne(
  query: any,
  callback: (err: any, quotation_config?: AppsQuotationConfig.MongooseDocumentSchema) => void
): void {
  AppsQuotationConfig.Model.findOne(query, (error, quotation_config: AppsQuotationConfig.MongooseDocumentSchema) => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_config);
    }
  });
}

export function index(
  callback: (err: any, quotation_configs?: AppsQuotationConfig.MongooseDocumentSchema[]) => void
): void {
  AppsQuotationConfig.get((error, quotation_configs: Document[]) => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_configs as AppsQuotationConfig.MongooseDocumentSchema[]);
    }
  });
}

export function create(
  new_quotation_config: AppsQuotationConfig.NativeScehma,
  callback: (err: any, quotation_config?: AppsQuotationConfig.MongooseDocumentSchema) => void
): void {
  const quotation_config = new AppsQuotationConfig.Model(new_quotation_config);
  quotation_config.save(error => {
    if (error) {
      callback(error);
    } else {
      callback(null, quotation_config as AppsQuotationConfig.MongooseDocumentSchema);
    }
  });
}

export function view(
  quotation_config_id: string,
  callback: (err: any, quotation_config?: AppsQuotationConfig.MongooseDocumentSchema) => void
): void {
  AppsQuotationConfig.Model.findById(
    quotation_config_id,
    (error, quotation_config: AppsQuotationConfig.MongooseDocumentSchema) => {
      if (error) {
        callback(error);
      } else {
        callback(null, quotation_config);
      }
    }
  );
}

export function update(
  quotation_config_id: string,
  update_quotation_config: AppsQuotationConfig.NativeScehma,
  callback: (err: any, quotation_config?: AppsQuotationConfig.MongooseDocumentSchema) => void
): void {
  AppsQuotationConfig.Model.findById(
    quotation_config_id,
    (error: any, quotation_config: AppsQuotationConfig.MongooseDocumentSchema) => {
      if (error) {
        callback(error);
      } else {
        quotation_config.speed = update_quotation_config.speed;
        quotation_config.no_of_washes = update_quotation_config.no_of_washes;
        quotation_config.industry = update_quotation_config.industry;
        quotation_config.gmp_requirement = update_quotation_config.gmp_requirement;
        quotation_config.bottle_moc = update_quotation_config.bottle_moc;
        quotation_config.water_saving = update_quotation_config.water_saving;
        quotation_config.filters_required = update_quotation_config.filters_required;
        quotation_config.illumination_required = update_quotation_config.illumination_required;
        quotation_config.auto_level_tank = update_quotation_config.auto_level_tank;
        quotation_config.extra_cups_sets = update_quotation_config.extra_cups_sets;
        quotation_config.save(errorquotation_configsave => {
          if (errorquotation_configsave) {
            callback(errorquotation_configsave);
          } else {
            callback(null, quotation_config);
          }
        });
      }
    }
  );
}

export function make_active(
  quotation_config_id: string,
  callback: (err: any, quotation_config?: AppsQuotationConfig.MongooseDocumentSchema) => void
): void {
  AppsQuotationConfig.Model.findById(
    quotation_config_id,
    (error, quotation_config: AppsQuotationConfig.MongooseDocumentSchema) => {
      if (error) {
        callback(error);
      } else {
        AppsQuotationConfig.Model.update(
          {
            is_active: true
          },
          {
            is_active: false
          },
          {
            multi: true
          },
          (err, q_configs) => {
            if (err) {
              callback(err);
            } else {
              quotation_config.is_active = true;
              quotation_config.save(errorquotation_configsave => {
                if (errorquotation_configsave) {
                  callback(errorquotation_configsave);
                } else {
                  callback(null, quotation_config);
                }
              });
            }
          }
        );
      }
    }
  );
}

export function remove(quotation_config_id: string, callback: (err: any) => void): void {
  AppsQuotationConfig.Model.deleteOne(
    {
      _id: quotation_config_id
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
