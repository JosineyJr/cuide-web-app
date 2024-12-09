import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css'],
})
export class ShowMoreComponent<T> {
  @Input() entity!: 'places' | 'segments';
  @Output() result = new EventEmitter<any>();

  page = 2;
  hasMore = true;

  constructor(private readonly http: HttpClient) {}

  load(): void {
    if (!this.entity) {
      throw new Error('loaderFn is required.');
    }

    this.http
      .get<any>('/' + this.entity, { params: { page: this.page } })
      .subscribe({
        next: (data: any) => {
          this.hasMore = data.metadata.pages > this.page;
          this.page++;
          this.result.emit(data);
        },
        error: (err) => {
          console.error('Error loading data:', err);
        },
      });
  }
}
