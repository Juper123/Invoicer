import { CreatedInvoice } from "../../../../../libs";
import { PostInvoiceDto } from "../../../models";
import { Invoice } from "./invoice.interface";

export interface InvoicesStateInterface {
    invoices: Invoice[]
    selectedInvoice: Invoice | null
    onCreationError: string | null
    createdInvoices: CreatedInvoice[]
    archivedCreatedInvoices: CreatedInvoice[]
    progressValue: number
}