import { TestMetadata } from '../types';

export const CLASS_10_MATH: TestMetadata = {
  id: 'c10-math',
  standard: 'Class 10',
  subject: 'Mathematics',
  title: 'Class 10 Mathematics Examination',
  subtitle: 'Quadratic Equations, AP, Coordinate Geometry & Trigonometry',
  description: 'Comprehensive standard evaluation on discriminant analysis, nth term and sum of AP, section formula, trigonometric identities, and areas related to circles.',
  syllabus: [
    'Fundamental Theorem of Arithmetic & HCF-LCM Relation',
    'Roots of Quadratic Equations & Nature of Roots (Discriminant)',
    'Arithmetic Progressions (General Term & Sum of n Terms)',
    'Coordinate Geometry: Distance & Section Formulas',
    'Trigonometric Ratios & Pythagorean Identities',
    'Areas Related to Circles & Tangents to a Circle'
  ],
  totalMarks: 32,
  durationMinutes: 24, // 8 questions * 3 minutes
  questions: [
    // =========================================================================
    // SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c10-math-q1',
      subject: 'Mathematics',
      type: 'single',
      title: 'HCF and LCM Relation',
      prompt: 'If the HCF of two positive integers 306 and 657 is 9, what is their Least Common Multiple (LCM)?',
      options: ['22338', '21338', '23338', '22438'],
      correctAnswer: 0, // 22338
      category: 'Real Numbers',
      explanation: 'HCF(a, b) * LCM(a, b) = a * b. LCM = (306 * 657) / 9 = 34 * 657 = 22,338.'
    },
    {
      id: 'c10-math-q2',
      subject: 'Mathematics',
      type: 'single',
      title: 'Nature of Roots & Discriminant',
      prompt: 'For what condition on the discriminant D = b² - 4ac does the quadratic equation ax² + bx + c = 0 (a ≠ 0) possess two real and distinct roots?',
      options: ['D < 0', 'D = 0', 'D > 0', 'D ≤ 0'],
      correctAnswer: 2, // D > 0
      category: 'Quadratic Equations',
      explanation: 'A quadratic equation has two real and distinct roots if and only if the discriminant D = b² - 4ac > 0.'
    },
    {
      id: 'c10-math-q3',
      subject: 'Mathematics',
      type: 'multiple',
      title: 'Properties of Arithmetic Progressions',
      prompt: 'Consider the arithmetic progression: 7, 13, 19, 25, ... Which of the following statements are mathematically TRUE? (Select ALL that apply)',
      options: [
        'The common difference d of this AP is +6',
        'The 10th term a₁₀ of this AP is 61',
        'The sum of the first 10 terms S₁₀ is 340',
        'The term 150 belongs to this sequence'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Arithmetic Progressions',
      explanation: 'd = 13 - 7 = 6. a₁₀ = 7 + (10-1)*6 = 7 + 54 = 61. S₁₀ = (10/2)*(2*7 + 9*6) = 5*(14 + 54) = 5*68 = 340. For 150: 7 + 6(n-1) = 150 => 6(n-1) = 143 (not divisible by 6, so 150 is not a term).'
    },
    {
      id: 'c10-math-q4',
      subject: 'Mathematics',
      type: 'single',
      title: 'Pythagorean Trigonometric Identity',
      prompt: 'If tan θ = 4/3 where θ is an acute angle, what is the value of (sin θ + cos θ)?',
      options: ['5 / 7', '7 / 5', '1', '12 / 25'],
      correctAnswer: 1, // 7/5
      category: 'Trigonometry',
      explanation: 'In a right triangle with opposite = 4 and adjacent = 3, hypotenuse = √(4² + 3²) = 5. Therefore sin θ = 4/5, cos θ = 3/5. sin θ + cos θ = 4/5 + 3/5 = 7/5.'
    },
    {
      id: 'c10-math-q5',
      subject: 'Mathematics',
      type: 'multiple',
      title: 'Theorems on Tangents to a Circle',
      prompt: 'Which of the following geometric properties regarding tangents to a circle are valid? (Select ALL that apply)',
      options: [
        'The tangent at any point of a circle is perpendicular to the radius through the point of contact',
        'The lengths of tangents drawn from an external point to a circle are strictly equal',
        'From a point inside a circle, exactly two tangents can be drawn to the circle',
        'A circle can have at most two parallel tangents at opposite ends of a diameter'
      ],
      correctAnswers: [0, 1, 3],
      category: 'Circles & Geometry',
      explanation: 'A tangent is perpendicular to radius at contact; external tangent lengths are equal; parallel tangents occur at diameter endpoints. From inside a circle, NO tangent can be drawn (statement 3 is false).'
    },
    {
      id: 'c10-math-q6',
      subject: 'Mathematics',
      type: 'single',
      title: 'Section Formula & Midpoint Coordinates',
      prompt: 'Find the coordinates of the midpoint of the line segment joining the points P(-2, 8) and Q(-6, -4).',
      options: ['(-4, 2)', '(-2, 4)', '(-4, -2)', '(4, 2)'],
      correctAnswer: 0, // (-4, 2)
      category: 'Coordinate Geometry',
      explanation: 'Midpoint M = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((-2 + -6)/2, (8 + -4)/2) = (-8/2, 4/2) = (-4, 2).'
    },

    // =========================================================================
    // SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c10-math-q7',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Evaluating Trigonometric Expression',
      prompt: 'Evaluate the exact numerical value of: 2 sin²(30°) + 3 tan²(45°) - cos²(60°). (Enter as a decimal number)',
      correctAnswer: 3.25,
      tolerance: 0.05,
      unit: '',
      placeholder: 'e.g. 3.25',
      category: 'Trigonometry',
      explanation: 'sin 30° = 1/2, tan 45° = 1, cos 60° = 1/2. Expression = 2*(1/2)² + 3*(1)² - (1/2)² = 2*(1/4) + 3 - 1/4 = 0.5 + 3 - 0.25 = 3.25.'
    },
    {
      id: 'c10-math-q8',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Discriminant of Quadratic Equation',
      prompt: 'Calculate the numerical value of the discriminant D = b² - 4ac for the quadratic equation: 2x² - 6x + 3 = 0.',
      correctAnswer: 12.0,
      tolerance: 0.1,
      unit: '',
      placeholder: 'e.g. 12',
      category: 'Quadratic Equations',
      explanation: 'a = 2, b = -6, c = 3. Discriminant D = (-6)² - 4(2)(3) = 36 - 24 = 12.'
    }
  ]
};
