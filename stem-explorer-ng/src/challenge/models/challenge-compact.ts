import { Category } from "../../app/shared/enums/categories.enum";

export interface ChallengeCompact {
  id: number;
  title: string;
  category: Category;
  question: string;
  intructions?: string;
  hint: string;
  possibleAnswers: { idx: number; label: string }[];
  answer: number;
  answerBlurb: string;
  isComplete: boolean;
  latitude: number;
  longitude: number;
}
