import { createAction } from "@ngrx/store";

export const changeViewOptionToSettings = createAction(
    '[Main] Change view option to settings',)
export const changeViewOptionToHome = createAction(
    '[Main] Change view option to home',)
export const changeViewOptionToInvoices = createAction(
    '[Main] Change view option to invoices',)
export const changeViewOptionToCustomers = createAction(
    '[Main] Change view option to customers',)

