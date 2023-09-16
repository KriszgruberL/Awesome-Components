import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {MatLineModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {NameFormatPipe} from "./pipes/name-format.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {HighlightDirective} from "./directives/highlight.directive";


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    NameFormatPipe,
    TimeAgoPipe,
    HighlightDirective,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports : [
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    NameFormatPipe,
    TimeAgoPipe,
    HighlightDirective,


  ]
})
export class SharedModule { }
