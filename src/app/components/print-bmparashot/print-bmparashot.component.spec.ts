import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBmparashotComponent } from './print-bmparashot.component';

describe('PrintBmparashotComponent', () => {
  let component: PrintBmparashotComponent;
  let fixture: ComponentFixture<PrintBmparashotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintBmparashotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintBmparashotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
