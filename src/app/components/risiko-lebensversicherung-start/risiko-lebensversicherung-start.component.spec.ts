import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisikoLebensversicherungStartComponent } from './risiko-lebensversicherung-start.component';

describe('RisikoLebensversicherungStartComponent', () => {
  let component: RisikoLebensversicherungStartComponent;
  let fixture: ComponentFixture<RisikoLebensversicherungStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisikoLebensversicherungStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisikoLebensversicherungStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
