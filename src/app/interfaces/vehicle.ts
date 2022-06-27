export interface Vehicle {
    model: string,
    year:string,
    color:string,
    licence_plate: string,
    vehicle_licence_pictures: string[],
    status?:'pending'|'accepted'|'rejected',
    status_message?:string
}