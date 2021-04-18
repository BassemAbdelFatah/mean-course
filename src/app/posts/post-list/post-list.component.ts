import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/post';
import { Subscription } from 'rxjs';

import { PostsService } from 'src/app/posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  subscribed = new Subscription();
  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postService.getPost();
    this.subscribed = this.postService
      .getPostUpdated()
      .subscribe((post: Post[]) => (this.posts = post));
  }
  ngOnDestroy() {
    this.subscribed.unsubscribe();
  }
}
