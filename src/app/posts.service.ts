import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Post } from './post';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getPost() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        console.log('here');
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      });
  }
  DataTransformar(startDate: Date, endDate: Date) {}
  setPost(post: Post) {
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
  constractAddpost(
    id: string,
    engName: string,
    techName: string,
    track: string,
    startDate: string,
    endDate: string,
    Content: string
  ) {
    let stratDateToDB = String(
      this.datePipe.transform(startDate, 'yyyy-MM-dd')
    );
    let endDateToDB = String(this.datePipe.transform(endDate, 'yyyy-MM-dd'));
    const post: Post = {
      id: id,
      techName: techName,
      track: track,
      engName: engName,
      startDate: stratDateToDB,
      endDate: endDateToDB,
      content: Content,
    };

    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
  getPostUpdated() {
    return this.postUpdated.asObservable();
  }
}
