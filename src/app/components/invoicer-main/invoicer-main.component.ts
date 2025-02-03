import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { delay, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import * as Actions from './store/actions'
import { ViewOptionEnum } from '../../enums/view-option.enum';
import { AppStateInterface } from '../../store/app-state.interface';
import { getProgressBarModeSelector, viewOptionSelectedSelector } from './store/selectors';
import { SIDEBAR_CONFIG } from './consts/sidebar-config.const';
import { SidebarButtonLabelsEnum } from './enums';
import { ProgressBarModeEnum } from '../../../../libs';
import { getProgressBarValueSelector } from '../../store/shared-selectors';
import { InvoicerUnsubscribe } from '../invoicer-unsubscribe';
import { stopProgress } from '../../store/shared-actions';


@Component({
  selector: 'app-invoicer-main',
  standalone: false,
  templateUrl: './invoicer-main.component.html',
  styleUrl: './invoicer-main.component.scss'
})
export class InvoicerMainComponent extends InvoicerUnsubscribe {

  readonly isHomeSelected$: Observable<boolean>
  readonly isInvoicesSelected$: Observable<boolean>
  readonly isCustomersSelected$: Observable<boolean>
  readonly isSettingsSelected$: Observable<boolean>
  readonly progressBarMode$: Observable<ProgressBarModeEnum>
  readonly progressBarValue$: Observable<number | null>
  private readonly _valueResetter$: Subject<void> = new Subject()
  readonly valueResetter$ = this._valueResetter$.asObservable()
    .pipe(takeUntil(this.unsubscribe$), delay(2000))
    .subscribe(() => {
      this.store.dispatch(stopProgress())
    })

  private readonly viewOptionSelected$: Observable<ViewOptionEnum>

  sidebarConfig = SIDEBAR_CONFIG


  constructor(private store: Store<AppStateInterface>) {
    super();
    this.viewOptionSelected$ = this.store.pipe(select(viewOptionSelectedSelector))
    this.isSettingsSelected$ = this.viewOptionSelected$.pipe(map(value => value === ViewOptionEnum.Settings))
    this.isHomeSelected$ = this.viewOptionSelected$.pipe(map(value => value === ViewOptionEnum.Home))
    this.isInvoicesSelected$ = this.viewOptionSelected$.pipe(map(value => value === ViewOptionEnum.Invoices))
    this.isCustomersSelected$ = this.viewOptionSelected$.pipe(map(value => value === ViewOptionEnum.Customers))
    this.progressBarMode$ = this.store.pipe(select(getProgressBarModeSelector))
    this.progressBarValue$ = this.store.pipe(select(getProgressBarValueSelector)).pipe(tap((value) => {
      if (value === 100) {
        this._valueResetter$.next()
      }
    }))
  }

  onSidebarBtnClick(label: string): void {
    switch (label) {
      case SidebarButtonLabelsEnum.Home:
        this.store.dispatch(Actions.changeViewOptionToHome())
        break;
      case SidebarButtonLabelsEnum.Customers:
        this.store.dispatch(Actions.changeViewOptionToCustomers())
        break;
      case SidebarButtonLabelsEnum.Invoices:
        this.store.dispatch(Actions.changeViewOptionToInvoices())
        break;
      case SidebarButtonLabelsEnum.Settings:
        this.store.dispatch(Actions.changeViewOptionToSettings())
        break;

      default:
        break;
    }
  }
}
