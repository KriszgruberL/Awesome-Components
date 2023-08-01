import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../models/post.model";
import {Observable} from "rxjs";
// @ts-ignore
import Promise from '$GLOBAL$';
import {PostsService} from "../services/posts.service";

@Injectable()
export class PostsResolver implements Resolve<Post[]>{

  constructor(private _postService : PostsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this._postService.getPosts()
  }

}
