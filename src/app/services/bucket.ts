import * as Bucket from '@spica-devkit/bucket';
  /**
   * Call this method before interacting with buckets.
   * @param initOptions Initialize options to initialize the '@spica-devkit/bucket'.
   */
  export function initialize(
    ...initOptions: Parameters<typeof Bucket.initialize>
  ) {
    initOptions[0].publicUrl = 'https://seto-staging-30ad7.hq.spicaengine.com/api';
    Bucket.initialize(...initOptions);
  }

type Rest<T extends any[]> = ((...p: T) => void) extends ((p1: infer P1, ...rest: infer R) => void) ? R : never;
type getArgs = Rest<Parameters<typeof Bucket.data.get>>;
type getAllArgs = Rest<Parameters<typeof Bucket.data.getAll>>;
type realtimeGetArgs = Rest<Parameters<typeof Bucket.data.realtime.get>>;
type realtimeGetAllArgs = Rest<Parameters<typeof Bucket.data.realtime.getAll>>;
type id = { _id: string };

export interface Users{
  _id?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  image?: string;
  mobile_number?: string;
  mobile_verified?: number;
  active?: number;
  confirmation_code?: string;
  confirmed?: number;
  fcm_registration_id?: string;
  refer_code?: string;
  remember_token?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  fcm_registration_id_driver?: string;
  language?: string;
  role?: ('administrator'|'driver'|'customer');
  identity_id?: string;
  ratings?: number;
  stripe_customer_id?: string;
}
export namespace users {
  const BUCKET_ID = '6274e65152b22a002c579e65';
      export function get (...args: getArgs) {
        return Bucket.data.get<Users & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Users & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Users, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Users & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Users> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Users & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Users & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Drivers{
  _id?: string;
  user?: (Users & id | string);
  car?: (Cars & id | string);
  is_verified?: number;
  is_online?: number;
  is_riding?: number;
  location?: { type: "Point", coordinates: [number,number]};
  taxi_number?: string;
  document_url?: string;
  license_url?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  meta?: {
  driver_payout?: {
  bic_swift?: string;
  bank_number?: string;
  recipient_name?: string;};
  driver_billing?: {
  company_mail?: string;
  company_name?: string;
  company_address?: string;
  company_reg?: string;};
  driver_licence?: {
  licence_expiry_month?: string;
  licence_expiry_year?: string;
  licence_number?: string;};};
  document?: string;
  license?: string;
  company?: (Company & id | string);
  online_times?: {
  online_at?: Date | string;
  offline_at?: Date | string;}[];
}
export namespace drivers {
  const BUCKET_ID = '6274e65252b22a002c579e72';
      export function get (...args: getArgs) {
        return Bucket.data.get<Drivers & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Drivers & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Drivers, "_id">) {
        ['user','car','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Drivers & id) {
        ['user','car','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Drivers> & id
      ) {
        ['user','car','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Drivers & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Drivers & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Ride_Requests{
  _id?: string;
  driver?: (Drivers & id | string);
  ride?: (Rides & id | string);
  status?: ('pending'|'accepted'|'rejected'|'complete'|'received'|'timeouted');
  created_at?: Date | string;
  updated_at?: Date | string;
  estimated_fare?: number;
}
export namespace ride_requests {
  const BUCKET_ID = '6274e65352b22a002c579e7f';
      export function get (...args: getArgs) {
        return Bucket.data.get<Ride_Requests & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Ride_Requests & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Ride_Requests, "_id">) {
        ['driver','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Ride_Requests & id) {
        ['driver','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Ride_Requests> & id
      ) {
        ['driver','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Ride_Requests & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Ride_Requests & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Rides{
  _id?: string;
  user?: (Users & id | string);
  driver?: (Drivers & id | string);
  car?: (Cars & id | string);
  location_from?: { type: "Point", coordinates: [number,number]};
  location_to?: { type: "Point", coordinates: [number,number]};
  address_from?: string;
  address_to?: string;
  ride_on?: Date | string;
  ride_start_at?: Date | string;
  ride_ends_at?: Date | string;
  estimated_pickup_distance?: number;
  estimated_pickup_time?: number;
  estimated_distance?: number;
  estimated_time?: number;
  estimated_fare?: number;
  final_distance?: number;
  final_time?: number;
  final_fare?: number;
  cancelled_by?: ('customer'|'driver');
  status?: ('pending'|'accepted'|'onway'|'ongoing'|'complete'|'cancelled'|'rejected'|'processing_payment'|'pending_accept'|'accept_payment');
  created_at?: Date | string;
  updated_at?: Date | string;
  coupon_code?: string;
  discount?: number;
  payment_status?: ('paid'|'unpaid');
  payment_method?: (Payment_Methods & id | string);
  card_id?: string;
}
export namespace rides {
  const BUCKET_ID = '6274e65352b22a002c579e79';
      export function get (...args: getArgs) {
        return Bucket.data.get<Rides & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Rides & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Rides, "_id">) {
        ['user','driver','car','payment_method'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Rides & id) {
        ['user','driver','car','payment_method'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Rides> & id
      ) {
        ['user','driver','car','payment_method'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Rides & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Rides & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Addresses{
  _id?: string;
  title?: string;
  address?: string;
  location?: { type: "Point", coordinates: [number,number]};
  created_at?: Date | string;
  updated_at?: Date | string;
  user?: (Users & id | string);
}
export namespace addresses {
  const BUCKET_ID = '6274e65152b22a002c579e6b';
      export function get (...args: getArgs) {
        return Bucket.data.get<Addresses & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Addresses & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Addresses, "_id">) {
        ['user'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Addresses & id) {
        ['user'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Addresses> & id
      ) {
        ['user'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Addresses & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Addresses & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Settings{
  _id?: string;
  key?: string;
  value?: string;
}
export namespace settings {
  const BUCKET_ID = '6274e65252b22a002c579e76';
      export function get (...args: getArgs) {
        return Bucket.data.get<Settings & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Settings & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Settings, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Settings & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Settings> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Settings & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Settings & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Cars{
  _id?: string;
  vehicle_type?: (Vehicle_Types & id | string);
  model?: string;
  construction_year?: string;
  vehicle_number?: string;
  color?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  assigned?: boolean;
  company?: (Company & id | string);
  image?: string;
}
export namespace cars {
  const BUCKET_ID = '6274e65452b22a002c579e94';
      export function get (...args: getArgs) {
        return Bucket.data.get<Cars & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Cars & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Cars, "_id">) {
        ['vehicle_type','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Cars & id) {
        ['vehicle_type','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Cars> & id
      ) {
        ['vehicle_type','company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Cars & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Cars & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Vehicle_Types{
  _id?: string;
  title?: string;
  base_fare?: number;
  distance_charges_per_unit?: number;
  time_charges_per_minute?: number;
  other_charges?: number;
  seats?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  image?: string;
  prices?: {
  day?: {
  fee_per_min?: number;
  base_fee?: number;
  fee_per_km_between1_6_km?: number;
  fee_per_km_after_6_km?: number;};
  night?: {
  fee_per_min?: number;
  base_fee?: number;
  fee_per_km_between1_6_km?: number;
  fee_per_km_after_6_km?: number;};};
}
export namespace vehicle_types {
  const BUCKET_ID = '6274e65252b22a002c579e6f';
      export function get (...args: getArgs) {
        return Bucket.data.get<Vehicle_Types & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Vehicle_Types & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Vehicle_Types, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Vehicle_Types & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Vehicle_Types> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Vehicle_Types & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Vehicle_Types & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Company{
  _id?: string;
  name?: string;
}
export namespace company {
  const BUCKET_ID = '628e42bcf06ab6002d3c2c3d';
      export function get (...args: getArgs) {
        return Bucket.data.get<Company & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Company & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Company, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Company & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Company> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Company & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Company & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Supports{
  _id?: string;
  email?: string;
  name?: string;
  message?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
export namespace supports {
  const BUCKET_ID = '6274e65352b22a002c579e82';
      export function get (...args: getArgs) {
        return Bucket.data.get<Supports & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Supports & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Supports, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Supports & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Supports> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Supports & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Supports & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Coupons{
  _id?: string;
  code?: string;
  reward?: number;
  type?: ('fixed'|'percent');
  data?: string;
  expires_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
export namespace coupons {
  const BUCKET_ID = '6274e65352b22a002c579e88';
      export function get (...args: getArgs) {
        return Bucket.data.get<Coupons & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Coupons & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Coupons, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Coupons & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Coupons> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Coupons & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Coupons & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Coupon_Usages{
  _id?: string;
  user_coupon?: string;
  user?: (Users & id | string);
  coupon?: (Coupons & id | string);
  used_at?: Date | string;
}
export namespace coupon_usages {
  const BUCKET_ID = '6274e65452b22a002c579e97';
      export function get (...args: getArgs) {
        return Bucket.data.get<Coupon_Usages & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Coupon_Usages & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Coupon_Usages, "_id">) {
        ['user','coupon'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Coupon_Usages & id) {
        ['user','coupon'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Coupon_Usages> & id
      ) {
        ['user','coupon'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Coupon_Usages & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Coupon_Usages & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Ratings{
  _id?: string;
  rating?: number;
  review?: string;
  rating_to?: (Users & id | string);
  rating_from?: (Users & id | string);
  created_at?: Date | string;
  updated_at?: Date | string;
  ride?: (Rides & id | string);
}
export namespace ratings {
  const BUCKET_ID = '6274e65352b22a002c579e8b';
      export function get (...args: getArgs) {
        return Bucket.data.get<Ratings & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Ratings & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Ratings, "_id">) {
        ['rating_to','rating_from','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Ratings & id) {
        ['rating_to','rating_from','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Ratings> & id
      ) {
        ['rating_to','rating_from','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Ratings & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Ratings & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Payment_Methods{
  _id?: string;
  slug?: string;
  title?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
export namespace payment_methods {
  const BUCKET_ID = '6274e65352b22a002c579e7c';
      export function get (...args: getArgs) {
        return Bucket.data.get<Payment_Methods & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Payment_Methods & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Payment_Methods, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Payment_Methods & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Payment_Methods> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Payment_Methods & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Payment_Methods & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Transactions{
  _id?: string;
  method?: ('cash'|'stripe');
  currency?: string;
  amount?: number;
  ride?: (Rides & id | string);
  created_at?: Date | string;
}
export namespace transactions {
  const BUCKET_ID = '6274e65452b22a002c579e91';
      export function get (...args: getArgs) {
        return Bucket.data.get<Transactions & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Transactions & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Transactions, "_id">) {
        ['ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Transactions & id) {
        ['ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Transactions> & id
      ) {
        ['ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Transactions & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Transactions & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Faqs{
  _id?: string;
  title?: string;
  short_description?: string;
  description?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
export namespace faqs {
  const BUCKET_ID = '6274e65352b22a002c579e85';
      export function get (...args: getArgs) {
        return Bucket.data.get<Faqs & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Faqs & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Faqs, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Faqs & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Faqs> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Faqs & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Faqs & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Card{
  _id?: string;
  customer: (STRIPE_Customer & id | string);
  card_id?: string;
  status?: ('creating'|'done'|'error');
  token: string;
}
export namespace stripe_card {
  const BUCKET_ID = '6274e65052b22a002c579e56';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Card & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Card & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Card, "_id">) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Card & id) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Card> & id
      ) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Card & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Card & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Payment_Method{
  _id?: string;
  customer: (STRIPE_Customer & id | string);
  payment_method_id: string;
  status?: ('creating'|'done'|'error');
  default?: boolean;
}
export namespace stripe_payment_method {
  const BUCKET_ID = '6274e65052b22a002c579e59';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Payment_Method & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Payment_Method & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Payment_Method, "_id">) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Payment_Method & id) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Payment_Method> & id
      ) {
        ['customer'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Payment_Method & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Payment_Method & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Product{
  _id?: string;
  name: string;
  status?: ('creating'|'done'|'error');
  product_id?: string;
}
export namespace stripe_product {
  const BUCKET_ID = '6274e65152b22a002c579e5c';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Product & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Product & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Product, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Product & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Product> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Product & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Product & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Plan{
  _id?: string;
  product: (STRIPE_Product & id | string);
  interval: ('day'|'week'|'month'|'year');
  amount: number;
  currency: string;
  status?: ('creating'|'done'|'error');
  price_id?: string;
}
export namespace stripe_plan {
  const BUCKET_ID = '6274e65152b22a002c579e5f';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Plan & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Plan & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Plan, "_id">) {
        ['product'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Plan & id) {
        ['product'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Plan> & id
      ) {
        ['product'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Plan & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Plan & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Payment{
  _id?: string;
  customer?: (STRIPE_Customer & id | string);
  payment_method?: (STRIPE_Payment_Method & id | string);
  payment_type: ('subscribe'|'invoice'|'charge');
  token?: string;
  price?: number;
  currency?: string;
  status?: ('creating'|'done'|'error');
  plan?: (STRIPE_Plan & id | string);
  subscribe_id?: string;
  ride?: (Rides & id | string);
  card_id?: string;
  charge_id?: string;
}
export namespace stripe_payment {
  const BUCKET_ID = '6274e65152b22a002c579e63';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Payment & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Payment & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Payment, "_id">) {
        ['customer','payment_method','plan','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Payment & id) {
        ['customer','payment_method','plan','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Payment> & id
      ) {
        ['customer','payment_method','plan','ride'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Payment & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Payment & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Onesignal_Notifications{
  _id?: string;
  title?: string;
  body?: string;
  url?: string;
  included_segments?: string[];
  excluded_segments?: string[];
  include_player_ids?: string[];
  data?: string;
}
export namespace onesignal_notifications {
  const BUCKET_ID = '627cc6990b8548002f0f6abe';
      export function get (...args: getArgs) {
        return Bucket.data.get<Onesignal_Notifications & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Onesignal_Notifications & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Onesignal_Notifications, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Onesignal_Notifications & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Onesignal_Notifications> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Onesignal_Notifications & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Onesignal_Notifications & id>(BUCKET_ID, ...args);
        };
  }
}

export interface STRIPE_Customer{
  _id?: string;
  name?: string;
  email: string;
  stripe_customer_id?: string;
  status?: ('creating'|'done'|'error');
}
export namespace stripe_customer {
  const BUCKET_ID = '6274e65052b22a002c579e53';
      export function get (...args: getArgs) {
        return Bucket.data.get<STRIPE_Customer & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<STRIPE_Customer & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<STRIPE_Customer, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: STRIPE_Customer & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<STRIPE_Customer> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<STRIPE_Customer & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<STRIPE_Customer & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Driver_Applications{
  _id?: string;
  driver?: {
  licences?: {
  driving?: {
  id?: string;
  pictures?: string[];
  expiration?: Date | string;};
  taxi?: {
  expiration?: Date | string;
  id?: string;
  pictures?: string[];};};
  identity?: {
  id?: string;
  pictures?: string[];};};
  user?: {
  name?: string;
  surname?: string;
  email?: string;
  mobile_number?: string;};
  status?: ('pending'|'rejected'|'accepted');
  status_message?: string;
  company?: (Company & id | string);
}
export namespace driver_applications {
  const BUCKET_ID = '62b46e3c35f791002ce08db6';
      export function get (...args: getArgs) {
        return Bucket.data.get<Driver_Applications & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Driver_Applications & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Driver_Applications, "_id">) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Driver_Applications & id) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Driver_Applications> & id
      ) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Driver_Applications & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Driver_Applications & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Car_Applications{
  _id?: string;
  model?: string;
  year?: number;
  licence_plate?: string;
  color?: string;
  vehicle_licence_pictures?: string[];
  status?: ('pending'|'accepted'|'rejected');
  status_message?: string;
  company?: (Company & id | string);
}
export namespace car_applications {
  const BUCKET_ID = '62b4758f35f791002ce08def';
      export function get (...args: getArgs) {
        return Bucket.data.get<Car_Applications & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Car_Applications & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Car_Applications, "_id">) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Car_Applications & id) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Car_Applications> & id
      ) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Car_Applications & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Car_Applications & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Company_Applications{
  _id?: string;
  company?: {
  name?: string;
  short_name?: string;};
  admin?: {
  email?: string;
  name?: string;
  surname?: string;
  phone_number?: string;};
  created_at?: Date | string;
  identity_id?: string;
  status?: ('pending'|'accepted'|'rejected');
}
export namespace company_applications {
  const BUCKET_ID = '62b5c7c60276c6002c67547a';
      export function get (...args: getArgs) {
        return Bucket.data.get<Company_Applications & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Company_Applications & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Company_Applications, "_id">) {
        
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Company_Applications & id) {
        
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Company_Applications> & id
      ) {
        
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Company_Applications & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Company_Applications & id>(BUCKET_ID, ...args);
        };
  }
}

export interface Company_Admins{
  _id?: string;
  name?: string;
  surname?: string;
  phone_number?: string;
  company?: (Company & id | string);
  identity_id?: string;
  email?: string;
}
export namespace company_admins {
  const BUCKET_ID = '62b5c94a0276c6002c675496';
      export function get (...args: getArgs) {
        return Bucket.data.get<Company_Admins & id>(BUCKET_ID, ...args);
      };
      export function getAll (...args: getAllArgs) {
        return Bucket.data.getAll<Company_Admins & id>(BUCKET_ID, ...args);
      };
      export function insert (document: Omit<Company_Admins, "_id">) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.insert(BUCKET_ID, document);
      };
      export function update (document: Company_Admins & id) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.update(
          BUCKET_ID,
          document._id,
          document
        );
      };  
      export function patch (
        document: Partial<Company_Admins> & id
      ) {
        ['company'].forEach((field) => {
        if (typeof document[field] == 'object') {
          document[field] = Array.isArray(document[field])
            ? document[field].map((v) => v._id || v)
            : document[field]._id;
        }
      });
        return Bucket.data.patch(BUCKET_ID, document._id, document);
      };  
      export function remove (documentId: string) {
        return Bucket.data.remove(BUCKET_ID, documentId);
      };
  export namespace realtime {
        export function get (...args: realtimeGetArgs) {
          return Bucket.data.realtime.get<Company_Admins & id>(BUCKET_ID, ...args);
        };
        export function getAll (...args: realtimeGetAllArgs) {
          return Bucket.data.realtime.getAll<Company_Admins & id>(BUCKET_ID, ...args);
        };
  }
}