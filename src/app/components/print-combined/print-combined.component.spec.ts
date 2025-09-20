import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCombinedComponent } from './print-combined.component';

describe('PrintCombinedComponent', () => {
  let component: PrintCombinedComponent;
  let fixture: ComponentFixture<PrintCombinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintCombinedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
