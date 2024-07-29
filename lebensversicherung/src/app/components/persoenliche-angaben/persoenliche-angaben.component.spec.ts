import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoenlicheAngabenComponent } from './persoenliche-angaben.component';
import { AnzalKinder } from '../../enums/anzal-kinder';
import { Raucherstatus } from '../../enums/raucherstatus';
import { AntragService } from '../../services/antrag.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Validators } from '@angular/forms';

describe('PersoenlicheAngabenComponent', () => {
  let component: PersoenlicheAngabenComponent;
  let fixture: ComponentFixture<PersoenlicheAngabenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoenlicheAngabenComponent],
      providers: [AntragService,HttpClient,HttpHandler],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoenlicheAngabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate form', () => {
   

    expect(component.antragService.formAntrag().formallgemainKundInfo.valid).toBeFalsy();

    component.validateForm.beruf.setValue("Nothing");
    component.validateForm.anzahlKinder.setValue(AnzalKinder.EIN_K)
    component.validateForm.geburtsDatum.setValue(("12-12-2000"))
    component.validateForm.raucher.setValue(Raucherstatus.NIE_RUCHER)

    expect(component.antragService.formAntrag().formallgemainKundInfo.valid).toBeTruthy();


    expect(component.antragService.formAntrag().formallgemainKundInfo.controls.geburtsDatum6.hasValidator(Validators.required)).toBeFalsy()
    expect(component.antragService.formAntrag().formallgemainKundInfo.controls.vornamBaby.hasValidator(Validators.required)).toBeFalsy()

    component.validateForm.seaugling.setValue("true")

    component.hasSeaugling()


    expect(component.antragService.formAntrag().formallgemainKundInfo.controls.geburtsDatum6.hasValidator(Validators.required)).toBeTruthy();
    expect(component.antragService.formAntrag().formallgemainKundInfo.controls.vornamBaby.hasValidator(Validators.required)).toBeTruthy()

    component.validateForm.geburtsDatum6.setValue("12-12-2023")
    component.validateForm.vornamBaby.setValue("Ahmed")

    expect(component.antragService.formAntrag().formallgemainKundInfo.valid).toBeTruthy();




    
    
  });
});
