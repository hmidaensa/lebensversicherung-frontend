import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AntragService } from '../services/antrag.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
 
})
export class SharedModule { }
