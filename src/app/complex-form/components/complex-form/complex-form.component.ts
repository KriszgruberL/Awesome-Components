import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit{

  mainForm! : FormGroup;

  constructor(private _fb : FormBuilder) {
  }

  ngOnInit(): void {
    this.mainForm = this._fb.group({

    })
  }


  onSubmitForm() {

  }
}
