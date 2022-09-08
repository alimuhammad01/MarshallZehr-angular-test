import { Component, OnInit } from '@angular/core';
import { Observation } from '../api/interfaces/observation';
import { ConversionService } from '../api/services/conversion.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  observation?: Observation
  CurrenciesList = [ 'EUR', 'JPY', 'GBP', 'AUD', 'CHF', 'CNY', 'HKD', 'MXN', 'INR','USD']
  selectedCurrRate = 0
  netRate: number = 0;
  currentDate: Date = new Date();

  inputForm = new FormGroup({
    cadAmount: new FormControl(0, [Validators.required]),
    nonCadAmount: new FormControl(0, [Validators.required]),
    currency: new FormControl('USD', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  })

  constructor(public conversionService: ConversionService) { 

  }

  ngOnInit(): void {
    //Canadian Amount to Others
    this.inputForm?.get("cadAmount")?.valueChanges.subscribe(() => this.setNetRate('CAD'));

    //Others Amount to Canadian
    this.inputForm?.get("nonCadAmount")?.valueChanges.subscribe(() => this.setNetRate('nonCadAmount'));

    //Change of Currency
    this.inputForm?.get("currency")?.valueChanges.subscribe((currency) => this.getCurrency(currency, undefined));

    //Amount w.r.t Date
    this.inputForm?.get("date")?.valueChanges.subscribe((date) => {
      this.currentDate = new Date();
      this.getCurrency(this.inputForm.get('currency')?.value, date)
    });

    //Initial Currency Call
    this.getCurrency(this.inputForm.get('currency')?.value,'')

  }

  //currency change function
  getCurrency(currency: string, date: string | undefined) {
    if (currency) {
      this.conversionService.getRate(currency, date).subscribe(res => {
        let val = Object.keys(res.observations[0]).map(val => res.observations[0][val]);
        this.selectedCurrRate = parseFloat(Object.values(val[1])[0]);
        this.setNetRate('CAD')
      })
    }
  }

  //calculate output
  setNetRate(action: string) {
    if (action === 'CAD') {
      this.inputForm.controls['nonCadAmount'].setValue(this.transformDecimal(this.inputForm.get('cadAmount')?.value * this.selectedCurrRate), { emitEvent: false })
    } else {
      this.inputForm.controls['cadAmount'].setValue(this.transformDecimal(this.inputForm.get('nonCadAmount')?.value / this.selectedCurrRate), { emitEvent: false })
    }
  }

  transformDecimal(num:number) {
    return num.toFixed(4)
  }

}