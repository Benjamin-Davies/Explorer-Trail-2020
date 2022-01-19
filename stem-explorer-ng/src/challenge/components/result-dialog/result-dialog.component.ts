import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Colour } from '../../../app/shared/enums/stem-colours.enum';
import { RESULT_FAIL, RESULT_SUCCESS } from '../../constants/results-message';
import { CompletedDialogComponent } from '../completed-dialog/completed-dialog.component';

export interface ResultDialogData {
  difficulty: number;
  title: string;
  category: number;
  isCorrect: boolean;
  hasNext: boolean;
  allComplete: boolean;
  answerBlurb: string;
}

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
})
export class ResultDialogComponent implements OnInit {
  message = '';
  Colour = Colour;

  options = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    emitters: [
      {
        direction: 'top-right',
        rate: {
          delay: 0.1,
          quantity: 10,
        },
        position: {
          x: 0,
          y: 100,
        },
        size: {
          width: 0,
          height: 0,
        },
      },
      {
        direction: 'top-left',
        rate: {
          delay: 0.1,
          quantity: 10,
        },
        position: {
          x: 100,
          y: 100,
        },
        size: {
          width: 0,
          height: 0,
        },
      },
    ],
    fullScreen: {
      enable: true,
    },
    particles: {
      color: {
        value: ['#99cc33', '#3babe2', '#f9b335', '#672784'],
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: 'max',
          destroy: 'min',
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: 'random',
        move: true,
        animation: {
          enable: true,
          speed: 40,
        },
      },
      tilt: {
        direction: 'random',
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      shape: {
        type: ['cirlce', 'square', 'triangle'],
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 20,
        },
        speed: 50,
        decay: 0.05,
        direction: 'none',
        outModes: {
          default: 'destroy',
          top: 'none',
        },
      },
      life: {
        duration: {
          sync: true,
          value: 5,
        },
        count: 1,
      },
      size: {
        value: 7,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: 'max',
          destroy: 'min',
        },
      },
    },
    detectRetina: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ResultDialogData,
    private dialog: MatDialog,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {}

  ngOnInit() {
    this._setMessage();
  }

  /**
   * Navigate to home
   */
  buttonClick() {
    this.gtmService.pushTag({
      event: this.data.allComplete ? 'All challenges complete' : 'Scan next challenge',
      challenge: this.data.title,
    });
    return this.data.allComplete ? this.dialog.open(CompletedDialogComponent) : this.router.navigate(['camera']);
  }

  private _setMessage() {
    const possibleMsgs = this.data.isCorrect ? RESULT_SUCCESS : RESULT_FAIL;
    this.message = possibleMsgs[Math.floor(Math.random() * possibleMsgs.length)];
  }
}
