import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  percentage$ = new BehaviorSubject<number>(0);

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.progressService.progress$.subscribe((p) => {
      this.percentage$.next(p / 9);
    });
  }
}
