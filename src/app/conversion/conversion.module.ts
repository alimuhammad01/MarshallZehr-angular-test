import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { ConversionRoutingModule } from './conversion-routing.module';
import { DecimalPipe } from '@angular/common';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConversionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ConversionModule { }
