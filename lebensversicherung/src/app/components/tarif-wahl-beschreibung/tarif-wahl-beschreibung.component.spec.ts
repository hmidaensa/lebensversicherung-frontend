import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifWahlBeschreibungComponent } from './tarif-wahl-beschreibung.component';

describe('TarifWahlBeschreibungComponent', () => {
  let component: TarifWahlBeschreibungComponent;
  let fixture: ComponentFixture<TarifWahlBeschreibungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifWahlBeschreibungComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifWahlBeschreibungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
