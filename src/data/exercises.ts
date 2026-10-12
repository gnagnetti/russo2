import { Exercise } from '../types';
import { SECTION_1_EXERCISES } from './exercises/section1';
import { SECTION_1_EXTRA_EXERCISES } from './exercises/section1_extra';
import { SECTION_2_EXERCISES } from './exercises/section2';
import { SECTION_2_EXTRA_EXERCISES } from './exercises/section2_extra';
import { SECTION_2_EXTRA2_EXERCISES } from './exercises/section2_extra2';
import { SECTION_3_EXERCISES } from './exercises/section3';
import { SECTION_3_EXTRA_EXERCISES } from './exercises/section3_extra';

export const EXERCISES_DATABASE: Exercise[] = [
  ...SECTION_1_EXERCISES,
  ...SECTION_1_EXTRA_EXERCISES,
  ...SECTION_2_EXERCISES,
  ...SECTION_2_EXTRA_EXERCISES,
  ...SECTION_2_EXTRA2_EXERCISES,
  ...SECTION_3_EXERCISES,
  ...SECTION_3_EXTRA_EXERCISES,
];
