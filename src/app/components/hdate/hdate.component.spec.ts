import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdateComponent } from './hdate.component';

describe('HdateComponent', () => {
  let component: HdateComponent;
  let fixture: ComponentFixture<HdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
