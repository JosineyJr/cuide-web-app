import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css'],
  imports: [LoadingComponent, CommonModule],
})
export class ShowMoreComponent<T> {
  @Input() entity!: 'places' | 'segments' | 'filter';
  @Input() query: Map<string, Array<number | string>> = new Map();
  @Output() result = new EventEmitter<any>();

  page = 2;
  hasMore = true;
  loading = false;

  constructor(private readonly http: HttpClient) {}

  buildQuery(): string {
    const params = new URLSearchParams();
    params.append('page', this.page.toString());

    for (const [filterName, filterValues] of this.query.entries()) {
      for (const value of filterValues) {
        params.append(filterName, value.toString());
      }
    }

    return params.toString();
  }

  load(): void {
    console.log(this.query);

    this.loading = true;

    if (!this.entity) {
      throw new Error('loaderFn is required.');
    }

    this.http
      .get<any>(
        `/${this.entity}${
          this.query.size > 0 ? '/filter' : ''
        }?${this.buildQuery()}`
      )
      .subscribe({
        next: (data: any) => {
          this.hasMore = data.metadata.pages > this.page;
          this.page++;
          this.result.emit(data);
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar nova página:', err);
          this.loading = false;
        },
      });
  }
}
