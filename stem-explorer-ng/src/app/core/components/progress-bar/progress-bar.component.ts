import { Component, OnInit } from "@angular/core";
import { ProgressService } from "../../services/progress.service";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
})
export class ProgressBarComponent implements OnInit {
  percentage: number;
  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.progressService.progress$.subscribe((p) => {
      console.warn(p, "updated");
      this.percentage = p / 9;
      console.warn(this.percentage);
    });
  }
}
