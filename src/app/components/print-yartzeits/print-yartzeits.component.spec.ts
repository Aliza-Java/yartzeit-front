import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintYartzeitsComponent } from './print-yartzeits.component';

describe('PrintYartzeitsComponent', () => {
  let component: PrintYartzeitsComponent;
  let fixture: ComponentFixture<PrintYartzeitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintYartzeitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintYartzeitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
