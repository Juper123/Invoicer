import { createAction, props } from "@ngrx/store";
import { Invoice } from "../types";
import { CreatedInvoice } from "../../../../../libs";

export const resetState = createAction(
    '[Invoices] Reset state',)
export const selectInvoice = createAction(
    '[Invoices] Select invoice',
    props<{
        selectedInvoice: Invoice | null
    }>())
export const selectInvoiceSuccess = createAction(
    '[Invoices] Select invoice success',
    props<{
        selectedInvoice: Invoice | null
    }>())
export const addInvoice = createAction(
    '[Invoices] Add invoice',
    props<{
        invoice: Invoice,
    }>())
export const addInvoiceSuccess = createAction(
    '[Invoices] Add invoice success',
    props<{
        invoices: Invoice[]
    }>())
export const deleteInvoice = createAction(
    '[Invoices] Delete invoice')
export const deleteInvoiceSuccess = createAction(
    '[Invoices] Delete invoice success',
    props<{
        invoices: Invoice[]
    }>())
export const setFormDefaults = createAction(
    '[Invoices] Set form defaults',
)
export const setFormDefaultsSuccess = createAction(
    '[Invoices] Set form defaults success',
)

export const createInvoices = createAction(
    '[Invoices] Create invoices',
)

export const createInvoicesSuccess = createAction(
    '[Invoices] Create invoices Success',
)

export const createInvoiceFailure = createAction(
    '[Invoices] Create invoice failure',
    props<{
        errorMessage: string
    }>()
)

export const createInvoiceSuccess = createAction(
    '[Invoices] Create invoice success',
    props<{
        createdInvoice: CreatedInvoice[],
        invoiceToDelete: Invoice,
        invoicesLength: number
    }>()
)

export const downloadInvoices = createAction(
    '[Invoices] Download invoices'
)

export const downloadInvoicesSuccess = createAction(
    '[Invoices] Download invoices success'
)
