import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerInvoicesComponent } from './invoicer-invoices.component';

describe('InvoicerInvoicesComponent', () => {
  let component: InvoicerInvoicesComponent;
  let fixture: ComponentFixture<InvoicerInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicerInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicerInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
