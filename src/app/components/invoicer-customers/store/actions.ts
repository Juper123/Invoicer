import { createAction, props } from "@ngrx/store";
import { Customer } from "../../../models/types/customer.interface";
import { SaveResponse } from "../../../../../libs";
import { SaveCustomersAction } from "../enums";

export const resetState = createAction(
    '[Customers] Reset state',)

export const getGridData = createAction(
    '[Customers] Get grid data',)
export const getGridDataSuccess = createAction(
    '[Customers] Get grid data success',
    props<{ actionResult: SaveResponse<Customer[]> }>())
export const saveCustomers = createAction(
    '[Customers] Save customers',
    props<{
        saveCustomersAction: SaveCustomersAction
    }>())
export const saveCustomersSuccess = createAction(
    '[Customers] Save customers success',
    props<{
        actionResult: SaveResponse<Customer[]>
    }>())
export const saveCustomersError = createAction(
    '[Customers] Save customers error',
    props<{
        actionResult: SaveResponse<Customer[]>
    }>())
export const selectCustomer = createAction(
    '[Customers] Select Customer',
    props<{
        selectedCustomer: Customer | null
    }>())
export const selectCustomerSuccess = createAction(
    '[Customers] Select Customer Success',
    props<{
        selectedCustomer: Customer | null
    }>())