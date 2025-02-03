import { Injectable } from "@angular/core";
import { Invoice } from "../types";
import { InvoicesAction } from "../enums";

@Injectable({
    providedIn: 'root',
})
export class GridDataOperationsService {


    getUpdatedGridData(
        invoice: Invoice | null,
        invoices: Invoice[],
        invoicesAction: InvoicesAction,
        selectedInvoice: Invoice | null): Invoice[] {

        invoices = Object.assign([], invoices);
        switch (invoicesAction) {
            case InvoicesAction.AddEdit:
                return this.addEditInvoice(invoice, invoices, selectedInvoice)
            case InvoicesAction.Delete:
                return this.deleteInvoice(invoice, invoices)
            default:
                return []
        }
    }

    private addEditInvoice(invoice: Invoice | null, invoices: Invoice[], selectedInvoice: Invoice | null): Invoice[] {
        if (selectedInvoice) {
            return this.editInvoice(invoice, invoices)
        }
        return this.addInvoice(invoice, invoices)
    }

    private deleteInvoice(invoice: Invoice | null, invoices: Invoice[]): Invoice[] {
        if (invoice) {
            const index = invoices.indexOf(invoice)
            invoices = Object.assign([], invoices);
            invoices.splice(index, 1)
        }
        return invoices
    }

    private addInvoice(invoice: Invoice | null, invoices: Invoice[]): Invoice[] {
        if (invoice) {
            invoices = Object.assign([], invoices);
            invoices.push(invoice)
        }
        return invoices
    }

    private editInvoice(invoice: Invoice | null, invoices: Invoice[]): Invoice[] {
        let editedInvoiceIndex = invoices.indexOf(invoice as Invoice)
        invoices.splice(editedInvoiceIndex, 1, invoice as Invoice)
        return invoices
    }
}