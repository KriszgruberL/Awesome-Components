import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../../core/models/comment.model';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit
{
  @Input() comments! : Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl! : FormControl;

  constructor(private _fb : FormBuilder) {
  }

  ngOnInit(): void {
    this.commentCtrl = this._fb.control('', [Validators.required, Validators.minLength(10)])
  }

  onLeaveComment() {
    if(this.commentCtrl.valid){
      this.newComment.emit(this.commentCtrl.value);
      this.commentCtrl.reset();
    }
    this.commentCtrl.markAsTouched();
  }
}
