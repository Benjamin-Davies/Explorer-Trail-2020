import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengeViewComponent } from './components/challenge-view/challenge-view.component';
import { AnswerDialogComponent } from './components/answer-dialog/answer-dialog.component';
import { HintDialogComponent } from './components/hint-dialog/hint-dialog.component';
import { ResultDialogComponent } from './components/result-dialog/result-dialog.component';
import { CommonModule } from '@angular/common';
import { NgParticlesModule } from 'ng-particles';
import { CompletedDialogComponent } from './components/completed-dialog/completed-dialog.component';

@NgModule({
  imports: [CommonModule, SharedModule, ChallengeRoutingModule, NgParticlesModule],
  declarations: [
    ChallengeViewComponent,
    AnswerDialogComponent,
    HintDialogComponent,
    ResultDialogComponent,
    CompletedDialogComponent,
  ],
})
export class ChallengeModule {}
