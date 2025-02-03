import { Component, OnInit } from '@angular/core';
import { CUSTOMERS_GRID_CONFIG } from './consts/customers-grid-config.const';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/app-state.interface';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Customer } from '../../models/types';
import * as CustomersSelectors from './store/selectors';
import * as CustomersActions from './store/actions'
import { FormsService } from '../../services';
import { FormGroupTypes, } from '../../enums';
import {
  ADD_CUSTOMER_BUTTON_CONFIG,
  CUSTOMERS_FORM_CONTROLS,
  CUSTOMERS_GRID_CARD_CONFIG,
  DELETE_BUTTON_CONFIG,
  SAVE_BUTTON_CONFIG
} from './consts';
import { FormControlsType, GenericFormGroup } from '../../models';
import { CustomersFormControls, CustomersFormLabels, FormTitle, SaveCustomersAction } from './enums';
import { ButtonConfig, CardConfig, GridConfig } from '../../../../libs';
import { getCustomersSelector } from '../../store';




@Component({
  selector: 'app-invoicer-customers',
  standalone: false,

  templateUrl: './invoicer-customers.component.html',
  styleUrl: './invoicer-customers.component.scss'
})
export class InvoicerCustomersComponent implements OnInit {

  readonly customersGridData$: Observable<Customer[]>
  readonly succesfullySaved$: Observable<boolean>
  readonly deleteCustomerButtonDisabled$: Observable<boolean>
  readonly selectedCustomer$: Observable<Customer | null>
  readonly formTitle$: Observable<FormTitle>
  readonly addCustomerButtonDisabled$: Observable<boolean>
  saveCustomerButtonDisabled$: Observable<boolean>

  formGroup: GenericFormGroup<Customer, Customer>;
  customersFormControls = CustomersFormControls
  customersFormLabels = CustomersFormLabels

  gridConfig: GridConfig = CUSTOMERS_GRID_CONFIG
  saveCustomerButtonConfig: ButtonConfig = SAVE_BUTTON_CONFIG
  deleteCustomerButtonConfig: ButtonConfig = DELETE_BUTTON_CONFIG
  addCustomerButtonConfig: ButtonConfig = ADD_CUSTOMER_BUTTON_CONFIG
  gridCardConfig: CardConfig = CUSTOMERS_GRID_CARD_CONFIG

  constructor(
    private store: Store<AppStateInterface>,
    private formsService: FormsService,
  ) {
    this.selectedCustomer$ = this.store.pipe(select(CustomersSelectors.selectedCustomerSelector))
    this.customersGridData$ = this.store.pipe(select(getCustomersSelector))
    this.succesfullySaved$ = this.store.pipe(select(CustomersSelectors.succesfullySavedSelector))
    this.formTitle$ = this.selectedCustomer$.pipe(map(selectedCustomer => this.getFormTitle(selectedCustomer)))
    this.deleteCustomerButtonDisabled$ = this.selectedCustomer$.pipe(map(selectedCustomer => !selectedCustomer))
    this.addCustomerButtonDisabled$ = this.selectedCustomer$.pipe(map(selectedCustomer => !selectedCustomer))
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.saveCustomerButtonDisabled$ = combineLatest([
      this.formGroup.valueChanges,
      this.selectedCustomer$]).pipe(map(([_, selectedCustomer]) =>
        this.checkIfAddButtonDisabled(selectedCustomer)), startWith(true))
  }

  addCustomer(): void {
    this.store.dispatch(CustomersActions.saveCustomers({ saveCustomersAction: SaveCustomersAction.AddEdit }))
  }

  deleteCustomer(): void {
    this.store.dispatch(CustomersActions.saveCustomers({ saveCustomersAction: SaveCustomersAction.Delete }))
  }

  selectedRowChange(selectedCustomer: Customer): void {
    this.store.dispatch(CustomersActions.selectCustomer({ selectedCustomer }))
    this.formsService.setFormValues(selectedCustomer, FormGroupTypes.Customers)
  }

  addCustomerButtonClick(): void {
    this.store.dispatch(CustomersActions.selectCustomer({ selectedCustomer: null }))
    this.formsService.resetForm(FormGroupTypes.Customers)
  }

  private initFormGroup(): void {
    this.formsService.setFormControls(FormGroupTypes.Customers, CUSTOMERS_FORM_CONTROLS)
    this.formGroup = this.formsService.getForm(FormGroupTypes.Customers) as GenericFormGroup<FormControlsType<Customer>, Customer>
  }

  private getFormTitle(selectedCustomer: Customer | null): FormTitle {
    return selectedCustomer ? FormTitle.Edit : FormTitle.Add
  }

  private checkIfAddButtonDisabled(selectedCustomer: Customer | null): boolean {
    return !selectedCustomer ? !this.formsService.formHasValue(FormGroupTypes.Customers) || !this.formGroup.valid :
      (JSON.stringify(selectedCustomer) === JSON.stringify(this.formsService.getFormValues<Customer>(FormGroupTypes.Customers)) || !this.formGroup.valid)
  }
}
