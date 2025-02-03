import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../../store/app-state.interface";

const selectFeature = (state: AppStateInterface) => state.invoicesState

export const selectedInvoiceSelector = createSelector(selectFeature, (state) => state.selectedInvoice)
export const getGridDataSelector = createSelector(selectFeature, (state) => state.invoices)
export const getOnCreationError = createSelector(selectFeature, (state) => state.onCreationError)
export const createdInvoicesSelector = createSelector(selectFeature, (state) => state.createdInvoices)
export const getArchivedCreatedInvoices = createSelector(selectFeature, (state) => state.archivedCreatedInvoices)