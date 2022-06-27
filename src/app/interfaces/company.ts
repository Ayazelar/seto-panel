export interface Company {
    name?: string,
    short_name?: string
}
export interface CompanyApplication {
    company: {
        name: string;
        short_name: string;
    };
    admin: {
        name: string;
        surname: string;
        phone_number: string;
        email: string;
        password?:string;
    };
}