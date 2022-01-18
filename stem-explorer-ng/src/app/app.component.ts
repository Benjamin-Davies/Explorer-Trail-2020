import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIcon } from './shared/enums/icons.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'STEMFest Explorer Trail';

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    registerIcons(matIconRegistry, domSanitizer);
  }
}

function registerIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  const iconArr: { name: SvgIcon; file: string }[] = [
    { name: 'FILTER-filter', file: 'FILTER-filter.svg' },
    { name: 'FILTER-S', file: 'FILTER-S.svg' },
    { name: 'FILTER-T', file: 'FILTER-T' },
    { name: 'FILTER-E', file: 'FILTER-E' },
    { name: 'FILTER-M', file: 'FILTER-M.svg' },
    { name: 'CAT-science', file: 'CAT-science.svg' },
    { name: 'CAT-technology', file: 'CAT-technology.svg' },
    { name: 'CAT-engineering', file: 'CAT-engineering.svg' },
    { name: 'CAT-maths', file: 'CAT-maths.svg' },
    { name: 'STEM-beaker', file: 'STEM-beaker.svg' },
    { name: 'STEM-Nut', file: 'STEM-Nut.svg' },
    { name: 'STEM-plus-sign', file: 'STEM-plus-sign.svg' },
    { name: 'STEM-robot', file: 'STEM-robot.svg' },
    { name: 'QR-Code', file: 'QR-Code.svg' },
    { name: 'QR-Code-2', file: 'QR-Code-2.svg' },
    { name: 'MAP-light-blue-point', file: 'MAP-light-blue-point.svg' },
    { name: 'MAP-light-green-point', file: 'MAP-light-green-point.svg' },
    { name: 'MAP-light-orange-point', file: 'MAP-light-orange-point.svg' },
    { name: 'MAP-purple-point', file: 'MAP-purple-point.svg' },
    { name: 'MAP-red-point', file: 'MAP-red-point.svg' },
    { name: 'map-white', file: 'map-marker-white.svg' },
    { name: 'AMEN-food', file: 'AMEN-food.svg' },
    { name: 'AMEN-magnifying-glass', file: 'AMEN-magnifying-glass.svg' },
    { name: 'AMEN-mail', file: 'AMEN-mail.svg' },
    { name: 'AMEN-phone', file: 'AMEN-phone.svg' },
    { name: 'AMEN-toilet', file: 'AMEN-toilet.svg' },
    { name: 'AMEN-water-refill', file: 'AMEN-water-refill.svg' },
    { name: 'AMEN-wheelchair', file: 'AMEN-wheelchair.svg' },
    { name: 'AMEN-wifi', file: 'wifi-food.svg' },
    { name: 'google-login', file: 'google-login.svg' },
    { name: 'facebook-login', file: 'facebook-login.svg' },
    { name: 'list-view', file: 'list-view.svg' },
  ];

  iconArr.forEach((item) => {
    matIconRegistry.addSvgIcon(
      item.name,
      domSanitizer.bypassSecurityTrustResourceUrl(`app/../assets/icons/${item.file}`)
    );
  });
}
