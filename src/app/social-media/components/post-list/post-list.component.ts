import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit{
  $posts!: Observable<Post[]>

  constructor(private _route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.$posts = this._route.data.pipe(
      // L'Observable data émet l'objet créé dans la configuration de route, et donc vous récupérez les données du resolver avec la clé posts .
      map(data => data['posts'])
    )
  }

}
