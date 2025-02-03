import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerMainComponent } from './invoicer-main.component';

describe('InvoicerMainComponent', () => {
  let component: InvoicerMainComponent;
  let fixture: ComponentFixture<InvoicerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicerMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
