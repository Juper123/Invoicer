import { Customer } from "../../../models/types";

export interface CustomerStateInterface {
    customersGridData: Customer[]
    succesfullySaved: boolean
    selectedCustomer: Customer | null
    error: any
}