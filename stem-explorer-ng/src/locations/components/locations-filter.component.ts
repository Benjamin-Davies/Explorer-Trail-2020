import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Category } from '../../app/shared/enums/categories.enum';
import { LargeCategoryIcons } from '../../app/shared/enums/large-category-icons.enum';
import { FilterLocationsPipe } from '../pipes/filter-locations.pipe';
import { FILTER_BUTTONS } from '../constants/filter-buttons.constant';
import { LocationFilter } from '../models/location-filter.model';
import { Location } from '../models/location.model';

@Component({
    selector: 'app-locations-filter',
    templateUrl: './locations-filter.component.html'
})
export class LocationsFilterComponent implements OnInit {
    // @Input() locations: Location[];
    @Output() filterChanged = new EventEmitter<LocationFilter>();

    Category = Category;
    Icons = LargeCategoryIcons;

    filter: LocationFilter;
    buttons = FILTER_BUTTONS;

    constructor(
        private filterLocations: FilterLocationsPipe,
    ) {}

    ngOnInit(): void {
        const savedFilter: LocationFilter = JSON.parse(localStorage.getItem('filter'));
        this._setFilter(savedFilter);
    }

    categoryChanged(categories: number[]): void {
        // this.filter = { ... this.filter, categories };

        // const filtered = this.filterLocations.transform(this.locations, this.filter)
        this._setFilter({ ...this.filter, categories });
    }

    selectionChanged(event: MatCheckboxChange): void {
        this._setFilter({ ...this.filter, showCompleted: event.checked });
    }

    private _setFilter(newFilter: LocationFilter): void {
        this.filter = {
            categories: newFilter?.categories || [0, 1, 2, 3],
            showCompleted: newFilter?.showCompleted || true,
        };
        localStorage.setItem('filter', JSON.stringify(this.filter));
        this.filterChanged.emit(this.filter);
    }
}
