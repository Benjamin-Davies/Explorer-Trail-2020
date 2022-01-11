import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private _progress$ = new BehaviorSubject<number>(0);
  public readonly progress$ = this._progress$.asObservable();

  constructor() {
    const savedProgress: number = Number(localStorage.getItem('progressCount'));
    this._progress$.next(savedProgress);
  }

  add(): void {
    const current = this._progress$.value;
    this._progress$.next(current + 1);
  }
}
