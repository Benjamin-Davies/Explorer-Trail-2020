import { Component, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AnswerType } from "src/app/shared/enums/answer-type.enum";
import { Levels } from "src/app/shared/enums/levels.enum";
import { Colour } from "src/app/shared/enums/stem-colours.enum";

/*
 * Component for the list view dialog for more information
 */
@Component({
  selector: "app-answer-dialog",
  templateUrl: "./answer-dialog.component.html",
  styleUrls: ["./answer-dialog.component.scss"],
})
export class AnswerDialogComponent {
  answer = new FormControl("");

  Levels: any = Levels;
  AnswerType: any = AnswerType;
  Colour = Colour;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
