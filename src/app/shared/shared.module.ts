import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { SharedRoutingModule } from './shared-routing.module';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteComponent
  ]
})
export class SharedModule { }
