import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CustomersActions from './actions'
import { exhaustMap, from, map, mergeMap, tap, withLatestFrom } from "rxjs";
import { Context, DatabaseService } from "../../../../../libs/data";
import { select, Store } from "@ngrx/store";
import { AppStateInterface } from "../../../store/app-state.interface";
import { selectedCustomerSelector } from "./selectors";
import { GridDataOperationsService } from "../services/grid-data-operations.service";
import { Customer } from "../../../models/types/customer.interface";
import { FormsService } from "../../../services";
import { FormGroupTypes } from "../../../enums";
import { getCustomersSelector } from "../../../store";




@Injectable()
export class CustomersEffects {
    getGridData$ = createEffect(() =>
        this.actions$.pipe(ofType(CustomersActions.getGridData), mergeMap(() => {
            return from(this.databaseService.getFromDatabase<Customer[]>(Context.Customers)).pipe(
                map(actionResult => CustomersActions.getGridDataSuccess({ actionResult })))
        })))

    selectedCustomerId$ = createEffect(() =>
        this.actions$.pipe(ofType(CustomersActions.selectCustomer), map((selectedCustomerId) => {
            return CustomersActions.selectCustomerSuccess(selectedCustomerId)
        }))
    )

    saveCustomers$ = createEffect(() =>
        this.actions$.pipe(ofType(CustomersActions.saveCustomers),
            withLatestFrom(this.store.pipe(select(selectedCustomerSelector)), this.store.pipe(select(getCustomersSelector))),
            exhaustMap(([{ saveCustomersAction }, selectedCustomer, customersGridData]) => {
                return from(this.databaseService.saveToDatabase(
                    this.gridDataOperationsService.updateGridData(
                        saveCustomersAction,
                        customersGridData,
                        selectedCustomer),
                    Context.Customers
                )).pipe(
                    tap((actionResult) => {
                        if (actionResult.success) {
                            this.formsService.resetForm(FormGroupTypes.Customers)
                        }
                    }),
                    map(actionResult => actionResult.success ?
                        CustomersActions.saveCustomersSuccess({ actionResult }) :
                        CustomersActions.saveCustomersError({ actionResult })))
            })))

    constructor(
        private actions$: Actions,
        private databaseService: DatabaseService,
        private gridDataOperationsService: GridDataOperationsService,
        private store: Store<AppStateInterface>,
        private formsService: FormsService,

    ) { }



}