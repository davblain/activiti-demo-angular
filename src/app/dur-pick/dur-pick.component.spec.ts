import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurPickComponent } from './dur-pick.component';

describe('DurPickComponent', () => {
  let component: DurPickComponent;
  let fixture: ComponentFixture<DurPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
