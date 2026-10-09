import { TestMetadata } from '../types';
import { CLASS_9_PHYSICS } from './class9Physics';
import { CLASS_9_MATH } from './class9Math';
import { CLASS_9_COMBINED } from './class9Combined';
import { CLASS_10_PHYSICS } from './class10Physics';
import { CLASS_10_MATH } from './class10Math';
import { CLASS_10_COMBINED } from './class10Combined';

export {
  CLASS_9_PHYSICS,
  CLASS_9_MATH,
  CLASS_9_COMBINED,
  CLASS_10_PHYSICS,
  CLASS_10_MATH,
  CLASS_10_COMBINED,
};

export const EXAM_CATALOG: TestMetadata[] = [
  // Class 9 Papers
  CLASS_9_PHYSICS,
  CLASS_9_MATH,
  CLASS_9_COMBINED,

  // Class 10 Papers
  CLASS_10_PHYSICS,
  CLASS_10_MATH,
  CLASS_10_COMBINED,
];
