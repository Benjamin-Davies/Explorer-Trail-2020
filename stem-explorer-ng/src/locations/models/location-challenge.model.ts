import { Category } from '../../app/shared/enums/categories.enum';

export interface LocationChallenge {
    id: number;
    category: Category;
    description: string;
    title: string;
    difficulty: number;
    complete: boolean;
}
