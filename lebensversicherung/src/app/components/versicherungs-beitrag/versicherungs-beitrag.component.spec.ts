import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersicherungsBeitragComponent } from './versicherungs-beitrag.component';

describe('VersicherungsBeitragComponent', () => {
  let component: VersicherungsBeitragComponent;
  let fixture: ComponentFixture<VersicherungsBeitragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersicherungsBeitragComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersicherungsBeitragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
