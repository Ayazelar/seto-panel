import { Company } from "./company"
import { User } from "./user"

export interface Driver {
  _id?: string,
  user?: (User),
  is_verified?: number,
  is_online?: number,
  is_riding?: number,
  location?: any,
  company?: (Company | string),
}
export interface DriverApplication {
  driver: {
    licences: {
      driving: Licence;
      taxi: Licence;
    };
    identity: {
      id: string;
      pictures: string[];
    };
    profile_picture: string;
  };
  user: {
    name: string;
    surname: string;
    email: string;
    mobile_number: string;
  };
  status?: "pending" | "accepted" | "rejected";
  status_message?: string;
  company: string
}

interface Licence {
  id: string;
  pictures: string[];
  expiration: Date;
}