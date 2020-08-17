import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Location } from 'src/app/shared/models/location';
import { ApiService } from 'src/app/shared/services/api.service';
import { FilterLocations, LoadLocationsData } from './locations.actions';

export interface LocationsStateModel {
  locations: Location[];
  fetched: boolean;
  filter: number[];
}

const LOCATIONS_TOKEN: StateToken<LocationsStateModel> = new StateToken('locations');

@State<LocationsStateModel>({
  name: LOCATIONS_TOKEN,
  defaults: {
    locations: [],
    fetched: false,
    filter: [0, 1, 2, 3]
  },
  children: [],
})
@Injectable()
export class LocationsState {
  constructor(
    private apiService: ApiService,
  ) { }

  @Selector()
  public static locations(state: LocationsStateModel): Location[] {
    return state.locations;
  }

  @Selector()
  public static locationFilter(state: LocationsStateModel): number[] {
    return state.filter;
  }

  @Action(LoadLocationsData)
  public loadData(ctx: StateContext<LocationsStateModel>) {
    const state = ctx.getState();
    if (!state.fetched) {
      return this.apiService.getLocations().pipe(
        tap((data) => ctx.patchState({
          locations: data['location'],
          fetched: true,
        })),
      );
    }
  }

  @Action(FilterLocations)
  public filterLocations(
    { patchState }: StateContext<LocationsStateModel>,
    action: FilterLocations
  ) {
    patchState({
      filter: action.filter
    });
  }
}
