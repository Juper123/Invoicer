import { createReducer, on } from "@ngrx/store";
import * as InvoicesActions from './actions'
import { Invoice, InvoicesStateInterface } from "../types";
import { stopProgress } from "../../../store/shared-actions";
import { CreatedInvoice } from "../../../../../libs";


const initialState: InvoicesStateInterface = {
    invoices: [],
    selectedInvoice: null,
    onCreationError: null,
    createdInvoices: [],
    archivedCreatedInvoices: [],
    progressValue: 0,
}

export const reducers = createReducer(
    initialState,
    on(InvoicesActions.resetState, () => ({ ...initialState })),
    on(InvoicesActions.selectInvoiceSuccess, (state, action) => ({ ...state, selectedInvoice: action.selectedInvoice })),
    on(InvoicesActions.addInvoiceSuccess, (state, action) => ({ ...state, invoices: action.invoices })),
    on(InvoicesActions.deleteInvoiceSuccess, (state, action) => ({ ...state, invoices: action.invoices })),
    on(InvoicesActions.createInvoices, (state) => ({ ...state, progressValue: 1 })),
    on(InvoicesActions.createInvoiceSuccess, (state, action) => ({
        ...state,
        createdInvoices: [...state.createdInvoices, ...action.createdInvoice],
        progressValue: +(([...state.createdInvoices, ...action.createdInvoice].length / action.invoicesLength) * 100).toFixed(0),
        invoices: deleteInvoice(action.invoiceToDelete, state.invoices)
    })),
    on(InvoicesActions.createInvoiceFailure, (state, action) => ({ ...state, onCreationError: action.errorMessage, progressValue: 0 })),
    on(stopProgress, (state) => ({ ...state, progressValue: 0, archivedCreatedInvoices: state.createdInvoices, createdInvoices: [] as CreatedInvoice[] })),
);

function deleteInvoice(invoice: Invoice | null, invoices: Invoice[]): Invoice[] {
    if (invoice) {
        const index = invoices.indexOf(invoice)
        invoices = Object.assign([], invoices);
        invoices.splice(index, 1)
    }
    return invoices
}




