import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './store/app-state.interface';
import * as CustomersActions from './components/invoicer-customers/store/actions'
import * as SettingsActions from './components/invoicer-settings/store/actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Invoicer';

  constructor(private store: Store<AppStateInterface>) { }

  ngAfterViewInit(): void {
    this.initializeStoreData()
  }

  private initializeStoreData(): void {
    this.store.dispatch(CustomersActions.getGridData())
    this.store.dispatch(SettingsActions.getSettings())
  }
}
