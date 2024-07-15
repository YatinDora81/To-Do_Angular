import { Component, Input } from '@angular/core';
import { History } from '../../History';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  @Input() historyArray : History[] = [];

}
