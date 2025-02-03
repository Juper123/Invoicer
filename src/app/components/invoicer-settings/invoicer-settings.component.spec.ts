import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerSettingsComponent } from './invoicer-settings.component';

describe('InvoicerSettingsComponent', () => {
  let component: InvoicerSettingsComponent;
  let fixture: ComponentFixture<InvoicerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicerSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
