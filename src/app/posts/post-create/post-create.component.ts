import { Component } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  errorMsg = 'please enter valid value in the field!';
  engNameOptions: string[] = ['Bassem', 'brdo bassem', 'NARGSYA'];
  trackOptions: string[] = ['SQL', 'System', 'ForntEnd'];
  techOptions: string[] = ['Mysql', 'Dockers', 'Angular'];
  engName = '';
  track = '';
  tech = '';
  //--------------- Variables ---------------------//

  constructor(public postService: PostsService) {}
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  validName = new FormControl('', Validators.required);
  validTrack = new FormControl('', Validators.required);
  validtech = new FormControl('', Validators.required);
  getErrorMessage() {
    if (this.validName.hasError('required')) {
      return this.errorMsg;
    } else if (this.validTrack.hasError('required')) {
      return this.errorMsg;
    } else if (this.validtech.hasError('required')) {
      return this.errorMsg;
    }
    return;
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postService.constractAddpost(
      postForm.value.id,
      this.engName,
      this.track,
      this.tech,
      postForm.value.startDate,
      postForm.value.endDate,
      postForm.value.content
    );

    postForm.resetForm();
  }
}
