import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  loading = false;

  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;

  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;

  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  phoneCtrl!: FormControl;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(private _fb: FormBuilder,
              private _complexFormService: ComplexFormService) {
  }

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm();
    this.initFormObservables()
  }

  private initFormControls() {
    this.personalInfoForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this._fb.control('email');//Pré-sélectionne une choix

    this.emailCtrl = this._fb.control('');
    this.confirmEmailCtrl = this._fb.control('');
    this.emailForm = this._fb.group({
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl
      }, {
        validators: [confirmEqualValidator('email', 'confirm')],
        updateOn: 'blur'
      }
    )

    this.passwordCtrl = this._fb.control('', Validators.required);
    this.confirmPasswordCtrl = this._fb.control('', Validators.required);
    this.loginInfoForm = this._fb.group({
        username: ['', Validators.required],
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
      }, {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
        updateOn: 'blur'
      }
    );

    this.phoneCtrl = this._fb.control('');
  }

  private initMainForm() {
    this.mainForm = this._fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    })
  }

// Display inputs for the choice in the radio button
  private initFormObservables() {
    // Observable for showing or hiding the email form group based on the radio button choice
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl)
      )
    );

    // Observable for showing or hiding the phone form field based on the radio button choice
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => this.setPhoneValidators(showPhoneCtrl))
    );


    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
        this.emailCtrl.value &&
        this.confirmEmailCtrl.value)
    )

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
        this.passwordCtrl.value &&
        this.confirmPasswordCtrl.value &&
        this.loginInfoForm.hasError('confirmEqual'))
    )

  }

  /**
   * Set validators for email-related form controls based on the value of showEmailCtrl.
   * @param showEmailCtrl A boolean indicating whether to show email-related controls.
   */
  private setEmailValidators(showEmailCtrl: boolean) {
    // If 'email' is selected, add validators to the email control and confirmEmail control; otherwise, clear validators
    if (showEmailCtrl) {
      this.emailCtrl.setValidators([
        Validators.required,
        Validators.email
      ]);
      this.confirmEmailCtrl.setValidators([
        Validators.required,
        Validators.email
      ]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }

    // Update the validity of the email control and confirmEmail control
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  /**
   * Set validators for phone-related form controls based on the value of showPhoneCtrl.
   * @param showPhoneCtrl A boolean indicating whether to show phone-related controls.
   */
  private setPhoneValidators(showPhoneCtrl: boolean) {
    // If 'phone' is selected, add validators to the phone control; otherwise, clear validators
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    // Update the validity of the phone control
    this.phoneCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champs est requis'
    } else if (ctrl.hasError(('email'))) {
      return 'Merci d\'entrer une adresse mail valide'
    } else if (ctrl.hasError('minlength')) {
      return 'La longueur minimale est de 10 chiffres'
    } else if (ctrl.hasError('maxlength')) {
      return 'La longueur maximale est de 10 chiffres'
    } else {
      return 'Ce champs contient une erreur'
    }
  }

  onSubmitForm() {
    this.loading = true;
    this._complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.resetForm();
        } else {
          console.log('Echec de l\'enregistrement ')
        }
      })
    )
  }

  private resetForm() {
    this.mainForm.reset()
    this.contactPreferenceCtrl.patchValue('email')
  }
}
