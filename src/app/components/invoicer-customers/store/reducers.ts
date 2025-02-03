import { createReducer, on } from "@ngrx/store";
import * as CustomerActions from './actions'
import { CustomerStateInterface } from "../types/customer-state.interface";

const initialState: CustomerStateInterface = {
    customersGridData: [],
    succesfullySaved: false,
    selectedCustomer: null,
    error: null
}

export const reducers = createReducer(
    initialState,
    on(CustomerActions.resetState, () => ({ ...initialState })),
    on(CustomerActions.getGridData, (state) => ({ ...state })),
    on(CustomerActions.getGridDataSuccess, (state, action) => ({
        ...state,
        customersGridData: action.actionResult.data,
        error: action.actionResult.err
    })),
    on(CustomerActions.saveCustomers, (state) => ({ ...state, succesfullySaved: false })),
    on(CustomerActions.saveCustomersSuccess, (state, action) => ({
        ...state,
        customersGridData: action.actionResult.data,
        succesfullySaved: action.actionResult.success,
        selectedCustomer: null as any,
        error: action.actionResult.err

    })),
    on(CustomerActions.selectCustomerSuccess, (state, action) => ({
        ...state,
        selectedCustomer: action.selectedCustomer,
    })),
);