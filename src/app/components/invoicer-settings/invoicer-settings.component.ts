import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControlsType, GenericFormGroup } from '../../models';
import { Settings } from '../../models/types/settings.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/app-state.interface';
import { FormsService } from '../../services';
import { FormGroupTypes } from '../../enums';
import { SAVE_BUTTON_CONFIG, SETTINGS_FORM_CONTROLS } from './consts';
import { SettingsFormControls, SettingsFormLabels, } from './enums';
import { combineLatest, map, Observable, takeUntil, tap } from 'rxjs';
import * as SettingsActions from './store/actions'
import { CURRENCY_ITEMS, TAX_ITEMS } from '../../consts';
import { getSettingsSelector } from '../../store';
import { FormFieldInputType } from '../../../../libs';
import { InvoicerUnsubscribe } from '../invoicer-unsubscribe';

@Component({
  selector: 'app-invoicer-settings',
  standalone: false,

  templateUrl: './invoicer-settings.component.html',
  styleUrl: './invoicer-settings.component.scss'
})
export class InvoicerSettingsComponent extends InvoicerUnsubscribe implements OnInit, AfterViewInit {

  saveSettingsButtonDisabled$: Observable<boolean>
  saveSuccess$: Observable<boolean>

  formGroup: GenericFormGroup<Settings, Settings>;
  settingsFormControls = SettingsFormControls
  settingsFormLabels = SettingsFormLabels
  saveSettingsButtonConfig = SAVE_BUTTON_CONFIG
  currencyItems = CURRENCY_ITEMS
  taxItems = TAX_ITEMS
  inputTypeNumber = FormFieldInputType.Number

  constructor(
    private store: Store<AppStateInterface>,
    private formsService: FormsService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.initFormGroup()

    this.saveSettingsButtonDisabled$ = combineLatest([
      this.formGroup.valueChanges,
      this.store.pipe(select(getSettingsSelector))
    ]).pipe(map(([, settings]) => this.checkIfSaveSettingsButtonDisabled(settings)))
  }

  ngAfterViewInit(): void {
    this.initializeSubscriptions()
  }

  saveSettings(): void {
    this.store.dispatch(SettingsActions.saveSettings())
  }

  private checkIfSaveSettingsButtonDisabled(settings: Settings): boolean {
    return (JSON.stringify(this.formsService.getFormValues<Settings>(FormGroupTypes.Settings)) === JSON.stringify(settings)) || !this.formGroup.valid
  }

  private initializeSubscriptions(): void {
    this.store.pipe(select(getSettingsSelector))
      .pipe(takeUntil(this.unsubscribe$), tap(settings => this.formsService.setFormValues(settings, FormGroupTypes.Settings))).subscribe()
  }

  private initFormGroup(): void {
    this.formsService.setFormControls(FormGroupTypes.Settings, SETTINGS_FORM_CONTROLS)
    this.formGroup = this.formsService.getForm(FormGroupTypes.Settings) as GenericFormGroup<FormControlsType<Settings>, Settings>
  }
}
