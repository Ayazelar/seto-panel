import { Company } from "./company"
import { User } from "./user"

export interface Driver {
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
  company_name: string
}

interface Licence {
  id: string;
  pictures: string[];
  expiration: Date;
}