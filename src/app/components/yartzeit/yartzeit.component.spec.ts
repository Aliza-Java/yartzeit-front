import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YartzeitComponent } from './yartzeit.component';

describe('YartzeitComponent', () => {
  let component: YartzeitComponent;
  let fixture: ComponentFixture<YartzeitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YartzeitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YartzeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
