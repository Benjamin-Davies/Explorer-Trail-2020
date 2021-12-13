import { LocationInfoType } from '../constants/location-info-type.enum';

export interface LocationInfo {
    type: LocationInfoType;
    label: string;
    class?: string;
}
