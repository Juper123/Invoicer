import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerCustomersComponent } from './invoicer-customers.component';

describe('InvoicerCustomersComponent', () => {
  let component: InvoicerCustomersComponent;
  let fixture: ComponentFixture<InvoicerCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicerCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicerCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
