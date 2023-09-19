import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComplexFormValue} from "../models/complex-form-value";
import {catchError, delay, map, Observable, of} from "rxjs";
import {environnements} from "../../../environnements/environnements";

@Injectable({
  providedIn: 'root'
})
export class ComplexFormService {

  constructor(private _http : HttpClient) {
  }

  saveUserInfo(formValue : ComplexFormValue) : Observable<boolean>{
    return this._http.post(`${environnements.apiUrl}/users`, formValue).pipe(
      map(() => true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    )
  }
}
