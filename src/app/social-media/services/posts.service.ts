import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post.model";
import {environnements} from "../../../environnements/environnements";

@Injectable()
export class PostsService {

  constructor(private _http : HttpClient,
              ) { }

  getPosts() : Observable<Post[]>{
    return this._http.get<Post[]>(`${environnements.apiUrl}/posts`);
  }
}
