import { ChangeDetectorRef, Component, computed, Input, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { delay, interval, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { InvoicerUnsubscribe } from '../../../src/app/components/invoicer-unsubscribe';

@Component({
  selector: 'app-progress-bar',
  standalone: false,

  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent extends InvoicerUnsubscribe {

  private readonly _valueResetter$: Subject<void> = new Subject()
  readonly valueResetter$ = this._valueResetter$.asObservable()
    .pipe(takeUntil(this.unsubscribe$), delay(2000))
    .subscribe(() => {
      this._value = 0
    })

  @Input() set mode(mode: ProgressBarMode) {
    this._mode = mode
  }
  @Input() set value(value: number) {
    this._value = value
  }

  get mode(): ProgressBarMode {
    return this._mode
  }

  get value(): number {
    return this._value
  }

  getValue(): number {
    if (this.value === 100) {
      this._valueResetter$.next()
    }

    return this.value
  }

  private _mode: ProgressBarMode
  private _value: number

}
