import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

class Post {
  id: number;
  content: string;
  createdAt: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public posts: Post[];

  public form: FormGroup;

  constructor(private http: HttpClient) {
    this.loadPosts();
    this.form = this.buildForm();
  }

  public onSubmit(): void {
    this.http.post('/post-app/post', this.form.value).subscribe(() => {
      this.form.reset();
      this.form.get('content').setErrors(null);
      this.loadPosts();
    });
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      content: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });
  }

  private loadPosts(): void {
    this.http.get<Post[]>('/post-app/posts').subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
