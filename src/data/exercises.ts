import { Exercise } from '../types';
import { SECTION_1_EXERCISES } from './exercises/section1';
import { SECTION_2_EXERCISES } from './exercises/section2';
import { SECTION_3_EXERCISES } from './exercises/section3';

export const EXERCISES_DATABASE: Exercise[] = [
  ...SECTION_1_EXERCISES,
  ...SECTION_2_EXERCISES,
  ...SECTION_3_EXERCISES,
];
