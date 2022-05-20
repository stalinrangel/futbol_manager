import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScootingComponent } from './scooting.component';

describe('ScootingComponent', () => {
  let component: ScootingComponent;
  let fixture: ComponentFixture<ScootingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScootingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
