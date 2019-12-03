import { model as mongoose__model, Document } from 'mongoose';

import { AppsQuotationConfigSchema } from '@app/schemas/mongoose-db/apps-quotation-config.schema';

export const Model = mongoose__model('apps-quotation-config', AppsQuotationConfigSchema);
export function get(callback: (err: any, res: Document[]) => void, limit?: number): void {
  if (limit) {
    Model.find(callback).limit(limit);
  } else {
    Model.find(callback);
  }
}
export interface MongooseDocumentSchema extends Document {
  config_name?: string;
  speed: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  no_of_washes: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  industry: {
    options: {
      qty: string;
      price: number;
    }[];
    default_option_index: number;
  };
  gmp_requirement: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  bottle_moc: {
    options: {
      qty: string;
      price: number;
    }[];
    default_option_index: number;
  };
  water_saving: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  filters_required: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  illumination_required: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  auto_level_tank: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  extra_cups_sets: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  created_by?: string;
  is_active?: boolean;
}

export interface NativeScehma {
  config_name?: string;
  speed: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  no_of_washes: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  industry: {
    options: {
      qty: string;
      price: number;
    }[];
    default_option_index: number;
  };
  gmp_requirement: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  bottle_moc: {
    options: {
      qty: string;
      price: number;
    }[];
    default_option_index: number;
  };
  water_saving: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  filters_required: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  illumination_required: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  auto_level_tank: {
    options: {
      qty: boolean;
      price: number;
    }[];
    default_option_index: number;
  };
  extra_cups_sets: {
    options: {
      qty: number;
      price: number;
    }[];
    default_option_index: number;
  };
  created_by?: string;
  is_active?: boolean;
}
