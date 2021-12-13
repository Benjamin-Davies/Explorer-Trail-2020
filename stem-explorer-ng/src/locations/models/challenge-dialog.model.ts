import { LocationChallenge } from './location-challenge.model';
import { Location } from './location.model';

export interface ChallengeDialogData {
    challenge: LocationChallenge;
    location: Location;
}
