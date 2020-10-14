import { Levels } from 'src/app/shared/enums/levels.enum';
import { QuestionType } from 'src/app/shared/enums/answer-type.enum';
import { SafeResourceUrl } from '@angular/platform-browser';

export interface Challenge {
    id: number;
    title: string;
    description: string;
    category: number;
    locationId: number;
    challengeLevels: ChallengeLevel[];
}

export interface ChallengeLevel {
    id: number;
    question: string;
    instructions: string;
    difficulty: Levels;
    hint: string;
    questionType: QuestionType;
    answer: string[];
    possibleAnswers?: string[];
    complete?: boolean;
    videoEmbedUrl: SafeResourceUrl;
}
