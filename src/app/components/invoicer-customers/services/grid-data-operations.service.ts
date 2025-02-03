import { Injectable } from "@angular/core";
import { Customer } from "../../../models/types";
import { SaveCustomersAction } from "../enums";
import { FormsService } from "../../../services";
import { FormGroupTypes } from "../../../enums";


@Injectable({
    providedIn: 'root',
})
export class GridDataOperationsService {

    constructor(private formsService: FormsService,) { }

    updateGridData(
        saveCustomersAction: SaveCustomersAction,
        customersGridData: Customer[],
        selectedCustomer: Customer | null
    ): Customer[] {
        customersGridData = Object.assign([], customersGridData);
        return saveCustomersAction === SaveCustomersAction.AddEdit ?
            this.onActionAddEdit(customersGridData, selectedCustomer) :
            this.onActionDelete(customersGridData, selectedCustomer)
    }

    private onActionAddEdit(customersGridData: Customer[], selectedCustomer: Customer | null): Customer[] {
        if (selectedCustomer) {
            return this.onEdit(customersGridData, selectedCustomer)
        }
        return this.onAdd(customersGridData)
    }

    private onEdit(customersGridData: Customer[], selectedCustomer: Customer): Customer[] {
        let editedCustomerIndex = customersGridData.indexOf(selectedCustomer)
        customersGridData.splice(editedCustomerIndex, 1, this.formsService.getFormValues<Customer>(FormGroupTypes.Customers))
        return customersGridData
    }

    private onAdd(customersGridData: Customer[]): Customer[] {
        customersGridData.push(this.formsService.getFormValues<Customer>(FormGroupTypes.Customers))
        return customersGridData
    }

    private onActionDelete(customersGridData: Customer[], selectedCustomer: Customer | null): Customer[] {
        let deletedCustomerIndex = customersGridData.indexOf(selectedCustomer as Customer)
        customersGridData.splice(deletedCustomerIndex, 1,)
        return customersGridData
    }
}