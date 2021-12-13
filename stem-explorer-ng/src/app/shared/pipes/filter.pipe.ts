import { Pipe, PipeTransform } from '@angular/core';
import { LocationFilter } from '../../../locations/models/location-filter.model';
import { LocationChallenge } from '../../../locations/models/location-challenge.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: LocationChallenge[], filter: LocationFilter) {
    return value.filter(
      (item) =>
        filter.categories.includes(item.category) &&
        (filter.showCompleted ||
          !item['levels'].every((level) => level.complete))
    );
  }

}
