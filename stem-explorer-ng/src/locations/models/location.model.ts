import { LocationChallenge } from './location-challenge.model';

export interface Location {
    uid: string;
    name: string;
    position: LocationPosition;
    link?: string;
    phone?: string;
    email?: string;
    address: string;
    challenge: LocationChallenge;
}

interface LocationPosition {
    lat: number;
    lng: number;
}
