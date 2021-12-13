interface FilterButton {
    category: string;
    value: number;
    colourClass: string;
}

export const FILTER_BUTTONS: FilterButton[] = [
    { category: 'Science', value: 0, colourClass: 'green' },
    { category: 'Engineering', value: 1, colourClass: 'blue' },
    { category: 'Technology', value: 2, colourClass: 'orange' },
    { category: 'Maths', value: 3, colourClass: 'purple' },
];
