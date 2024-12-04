import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() currentPage: 'about' | 'places' | 'management' | null = null;

  expand = false;

  toggleMenu() {
    this.expand = !this.expand;
  }

  isCurrent(page: string): boolean {
    return page == this.currentPage;
  }
}
