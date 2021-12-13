import { Pipe, PipeTransform } from '@angular/core';
import { LocationFilter } from '../models/location-filter.model';
import { Location } from '../models/location.model';

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {

  transform(value: Location[], filter: LocationFilter): Location[] {
    return value.filter((item) =>
      item['locationChallenges'].some(
        (challenge) =>
          filter.categories.includes(challenge.challengeCategory) &&
          (filter.showCompleted ||
            !challenge.levels.every((level) => level.complete))
      )
    );
  }

}
