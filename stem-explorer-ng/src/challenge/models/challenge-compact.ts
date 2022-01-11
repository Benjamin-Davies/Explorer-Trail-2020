import { StemCategory } from '../../app/shared/enums/stem-cateogry.enum';

export interface ChallengeCompact {
  id: number;
  title: string;
  category: StemCategory;
  question: string;
  instructions: string;
  hint: string;
  possibleAnswers: { idx: number; label: string }[];
  answer: number;
  answerBlurb: string;
  isComplete: boolean;
}
