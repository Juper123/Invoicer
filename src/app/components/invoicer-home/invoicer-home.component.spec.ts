import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerHomeComponent } from './invoicer-home.component';

describe('InvoicerHomeComponent', () => {
  let component: InvoicerHomeComponent;
  let fixture: ComponentFixture<InvoicerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
