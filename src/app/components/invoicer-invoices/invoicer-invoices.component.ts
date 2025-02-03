import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControlsType, GenericFormGroup } from '../../models';
import { Invoice } from './types';
import { InvoicesFormControls, InvoicesFormLabels, InvoicesTitle } from './enums';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/app-state.interface';
import { FormsService } from '../../services';
import { FormGroupTypes } from '../../enums';
import { combineLatest, map, Observable, startWith, } from 'rxjs';
import {
  ButtonConfig,
  CardConfig,
  ComboboxItemConfig,
  DatabaseService,
  FormFieldInputMask,
  FormFieldInputType,
  GridConfig,
  parseDate,
  TextFieldPlaceHolder
} from '../../../../libs';
import * as InvoiceActions from './store/actions'
import * as InvoiceSelectors from './store/selectors'
import { CURRENCY_ITEMS, TAX_ITEMS } from '../../consts';
import { getCustomersSelector, getProgressBarValueSelector } from '../../store/shared-selectors';
import { Customer } from '../../models/types';
import {
  ADD_INVOICE_BUTTON_CONFIG,
  ADD_INVOICE_MODE_BUTTON_CONFIG,
  CREATE_BUTTON_CONFIG,
  DELETE_BUTTON_CONFIG,
  DOWNLOAD_INVOICE_BUTTON_CONFIG,
  INVOICES_FORM_CONTROLS,
  INVOICES_GRID_CARD_CONFIG,
  INVOICES_GRID_CONFIG
} from './consts';



@Component({
  selector: 'app-invoicer-invoices',
  standalone: false,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoicer-invoices.component.html',
  styleUrl: './invoicer-invoices.component.scss'
})
export class InvoicerInvoicesComponent implements OnInit, AfterViewInit {

  readonly invoicesGridData$: Observable<Invoice[]>
  readonly selectedInvoice$: Observable<Invoice | null>
  readonly createButtonDisabled$: Observable<boolean>
  readonly deleteButtonDisabled$: Observable<boolean>
  readonly downloadButtonDisabled$: Observable<boolean>
  readonly addInvoiceModeButtonDisabled$: Observable<boolean>
  readonly customers$: Observable<ComboboxItemConfig<string>[]>
  readonly invoicesTitle$: Observable<string>
  addInvoiceButtonDisabled$: Observable<boolean>

  invoicesFormControls = InvoicesFormControls
  invoicesFormLabels = InvoicesFormLabels

  formGroup: GenericFormGroup<Invoice, Invoice>;

  downloadButtonConfig: ButtonConfig = DOWNLOAD_INVOICE_BUTTON_CONFIG
  deleteButtonConfig: ButtonConfig = DELETE_BUTTON_CONFIG
  createButtonConfig: ButtonConfig = CREATE_BUTTON_CONFIG
  addInvoiceModeButtonConfig: ButtonConfig = ADD_INVOICE_MODE_BUTTON_CONFIG
  addInvoiceButtonConfig: ButtonConfig = ADD_INVOICE_BUTTON_CONFIG
  gridConfig: GridConfig = INVOICES_GRID_CONFIG
  gridCardConfig: CardConfig = INVOICES_GRID_CARD_CONFIG
  currencyItems = CURRENCY_ITEMS
  taxItems = TAX_ITEMS
  inputTypeNumber = FormFieldInputType.Number
  inputMaskDate = FormFieldInputMask.Date
  datePlaceholder = TextFieldPlaceHolder.Date

  constructor(
    private store: Store<AppStateInterface>,
    private formsService: FormsService,
  ) {
    this.invoicesGridData$ = this.store.pipe(select(InvoiceSelectors.getGridDataSelector), map((data) => this.sortBySellDate(data)))
    this.selectedInvoice$ = this.store.pipe(select(InvoiceSelectors.selectedInvoiceSelector))
    this.addInvoiceModeButtonDisabled$ = this.selectedInvoice$.pipe(map(selectedInvoice => !selectedInvoice))
    this.deleteButtonDisabled$ = this.selectedInvoice$.pipe(map(selectedInvoice => !selectedInvoice))
    this.downloadButtonDisabled$ = this.store.pipe(select(InvoiceSelectors.getArchivedCreatedInvoices), map((invoices) => !invoices.length))
    this.invoicesTitle$ = this.selectedInvoice$.pipe(map(selectedInvoice => this.getInvoicesTitle(selectedInvoice)))
    this.customers$ = this.store.pipe(select(getCustomersSelector),
      map((customers) => this.getCustomersComboboxValues(customers)))
    this.createButtonDisabled$ = combineLatest([
      this.invoicesGridData$,
      this.store.pipe(select(getProgressBarValueSelector))
    ]).pipe(map(([invoices, progressValue]) => this.isCreateButtonDisabled(invoices, progressValue)))

  }

  ngOnInit(): void {
    this.initFormGroup()
    this.addInvoiceButtonDisabled$ = combineLatest([
      this.formGroup.valueChanges,
      this.selectedInvoice$]).pipe(map(([_, selectedInvoice]) =>
        this.checkIfAddButtonDisabled(selectedInvoice)), startWith(true))
  }

  ngAfterViewInit(): void {
    this.store.dispatch(InvoiceActions.setFormDefaults())
  }

  downloadInvoices(): void {
    this.store.dispatch(InvoiceActions.downloadInvoices())
  }

  createInvoices(): void {
    this.store.dispatch(InvoiceActions.createInvoices())
  }

  deleteInvoice(): void {
    this.store.dispatch(InvoiceActions.deleteInvoice())
  }

  addInvoice(): void {
    let invoice = this.formsService.getFormValues<Invoice>(FormGroupTypes.Invoices)
    this.store.dispatch(InvoiceActions.addInvoice({ invoice }))
  }

  addInvoiceMode(): void {
    this.store.dispatch(InvoiceActions.setFormDefaults())
    this.store.dispatch(InvoiceActions.selectInvoice({ selectedInvoice: null }))
  }

  selectedRowChange(selectedInvoice: Invoice): void {
    this.store.dispatch(InvoiceActions.selectInvoice({ selectedInvoice }))
    this.formsService.setFormValues(selectedInvoice, FormGroupTypes.Invoices)
  }

  private getCustomersComboboxValues(customers: Customer[]): ComboboxItemConfig<string>[] {
    return customers?.map(customer => { return { value: customer?.taxNumber, valueLabel: customer?.name } })
  }

  private initFormGroup(): void {
    this.formsService.setFormControls(FormGroupTypes.Invoices, INVOICES_FORM_CONTROLS)
    this.formGroup = this.formsService.getForm(FormGroupTypes.Invoices) as GenericFormGroup<FormControlsType<Invoice>, Invoice>
  }

  private getInvoicesTitle(selectedInvoices: Invoice | null): InvoicesTitle {
    return selectedInvoices ? InvoicesTitle.Edit : InvoicesTitle.Add
  }

  private checkIfAddButtonDisabled(selectedInvoice: Invoice | null): boolean {
    return !selectedInvoice ? !this.formGroup.valid :
      (JSON.stringify(selectedInvoice) ===
        JSON.stringify(this.formsService.getFormValues<Invoice>(FormGroupTypes.Invoices)) || !this.formGroup.valid)
  }

  private isCreateButtonDisabled(invoices: Invoice[], progressValue: number): boolean {
    return (!invoices.length && progressValue === 0) || progressValue !== 0
  }

  private sortBySellDate(
    invoices: Invoice[]
  ): Invoice[] {

    invoices = Object.assign([], invoices);
    return invoices.sort(
      (a, b) => new Date(parseDate(a.sellDate)).getTime() - new Date(parseDate(b.sellDate)).getTime()
    );
  }
}
