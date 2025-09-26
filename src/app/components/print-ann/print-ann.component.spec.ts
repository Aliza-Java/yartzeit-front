import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAnnComponent } from './print-ann.component';

describe('PrintAnnComponent', () => {
  let component: PrintAnnComponent;
  let fixture: ComponentFixture<PrintAnnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintAnnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintAnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
