import { Component, Input } from '@angular/core';

@Component({
  selector: 'sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.scss']
})
export class SortIconComponent {
  @Input()
  sortOrder: string = "asc";
}
