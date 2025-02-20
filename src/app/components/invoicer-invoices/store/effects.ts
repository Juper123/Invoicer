import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as InvoiceActions from './actions'
import * as InvoiceSelectors from './selectors'
import { catchError, concatMap, exhaustMap, from, map, merge, of, tap, withLatestFrom } from "rxjs";
import { select, Store } from "@ngrx/store";
import { Invoice } from "../types";
import { InvoicesAction } from "../enums";
import { FormsService } from "../../../services";
import { FormGroupTypes } from "../../../enums";
import { getSettingsSelector } from "../../../store";
import { AppStateInterface } from "../../../store";
import { GridDataOperationsService, InvoicesDomainService } from "../services";
import { Settings } from "../../../models/types";
import { getCustomersSelector } from "../../../store/shared-selectors";
import { DatabaseService, modifyInvoiceNumber } from "../../../../../libs";


@Injectable()
export class InvoicesEffects {

    selectInvoice$ = createEffect(() =>
        this.actions$.pipe(ofType(InvoiceActions.selectInvoice), map((selectedInvoice) => {
            return InvoiceActions.selectInvoiceSuccess(selectedInvoice)
        }))
    )

    addInvoice$ = createEffect(() =>
        this.actions$.pipe(ofType(InvoiceActions.addInvoice),
            withLatestFrom(
                this.store.pipe(select(InvoiceSelectors.getGridDataSelector)),
                this.store.pipe(select(InvoiceSelectors.selectedInvoiceSelector))),
            map(([{ invoice }, invoices, selectedInvoice]) => {
                return InvoiceActions.addInvoiceSuccess({
                    invoices: this.gridDataOperationsService.getUpdatedGridData(invoice, invoices, InvoicesAction.AddEdit, selectedInvoice)
                })
            }))
    )

    deleteInvoice$ = createEffect(() =>
        this.actions$.pipe(ofType(InvoiceActions.deleteInvoice),
            withLatestFrom(
                this.store.pipe(select(InvoiceSelectors.selectedInvoiceSelector)),
                this.store.pipe(select(InvoiceSelectors.getGridDataSelector))),
            map(([, invoice, invoices]) => {
                return InvoiceActions.deleteInvoiceSuccess({
                    invoices: this.gridDataOperationsService.getUpdatedGridData(invoice, invoices, InvoicesAction.Delete, null)
                })
            }))
    )

    setFormDefaults$ = createEffect(() =>
        merge(
            this.actions$.pipe(ofType(InvoiceActions.setFormDefaults)),
            this.addInvoice$,
            this.deleteInvoice$)
            .pipe(
                withLatestFrom(
                    this.store.pipe(select(getSettingsSelector))),
                tap(([_, settings]) => {
                    this.setFormDefaults(settings)
                }),
                map(() => {
                    return InvoiceActions.setFormDefaultsSuccess()
                }))
    )

    createInvoices$ = createEffect(() =>
        this.actions$.pipe(ofType(InvoiceActions.createInvoices)).pipe(
            withLatestFrom(
                this.store.pipe(select(InvoiceSelectors.getGridDataSelector)),
                this.store.pipe(select(getSettingsSelector)),
                this.store.pipe(select(getCustomersSelector))
            ),
            exhaustMap(([_, invoices, settings, customers]) => {
                return from(invoices).pipe(concatMap((invoice) =>
                    this.invoicesDomainService.postInvoice(invoice, settings, customers)
                        .pipe(map((postInvoiceBlob) => {
                            return InvoiceActions.createInvoiceSuccess(
                                {
                                    createdInvoice: [{ number: modifyInvoiceNumber(invoice.orderNumber), blob: postInvoiceBlob }],
                                    invoiceToDelete: invoice,
                                    invoicesLength: invoices.length
                                })
                        }),
                            catchError((error) => of(InvoiceActions.createInvoiceFailure({ errorMessage: error.message }))))
                ),
                )
            })
        )
    )

    downloadInvoices$ = createEffect(() =>
        this.actions$.pipe(ofType(InvoiceActions.downloadInvoices)).pipe(
            withLatestFrom(
                this.store.pipe(select(InvoiceSelectors.getArchivedCreatedInvoices))
            ),
            map(([_, invoices]) => {
                this.databaseService.downloadInvoices(invoices)
                return InvoiceActions.downloadInvoicesSuccess()
            }))
    )



    constructor(
        private actions$: Actions,
        private store: Store<AppStateInterface>,
        private formsService: FormsService,
        private gridDataOperationsService: GridDataOperationsService,
        private invoicesDomainService: InvoicesDomainService,
        private databaseService: DatabaseService
    ) { }



    private setFormDefaults(settings: Settings): void {
        let defaultInvoice: Invoice = {
            orderNumber: '',
            price: null,
            sellDate: '',

            customerTaxNumber: '',
            tax: settings.tax,
            paymentPeriod: settings.paymentPeriod,
            exchangeCurrency: settings.exchangeCurrency,
            currency: settings.currency,
            description: settings.description,
            quantity: settings.quantity,
            quantityUnit: settings.quantityUnit,
        }
        this.formsService.setFormValues(defaultInvoice, FormGroupTypes.Invoices)
    }
}