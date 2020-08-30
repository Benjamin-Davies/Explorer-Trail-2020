import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  title = 'Are you ready to explore?';
  content = 'Unlock hidden science, technology, engineering, and mathematics (STEM) challenges and tasks within Tauranga’s CBD. The STEM Explorer Trail is a one of a kind app experience made by locals for our locals and visitors. Complete challenges as an individual or a team, unlock special tasks, explore our CBD and win some cool prizes!';
  TnCs = 'By using this website/app you agree to our Terms & Conditions.'

  constructor() { }

  ngOnInit(): void {
  }

}
