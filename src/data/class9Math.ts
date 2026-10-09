import { TestMetadata } from '../types';

export const CLASS_9_MATH: TestMetadata = {
  id: 'c9-math',
  standard: 'Class 9',
  subject: 'Mathematics',
  title: 'Class 9 Mathematics Examination',
  subtitle: 'Algebra, Geometry, Coordinate Systems & Mensuration',
  description: 'Rigorous assessment covering rationalization of surds, remainder theorem, linear equations in two variables, Euclidean geometry theorems, and surface areas.',
  syllabus: [
    'Irrational Numbers & Real Exponents',
    'Polynomial Factorization & Algebraic Identities',
    'Linear Equations in Two Variables & Graphs',
    'Lines, Angles & Transversals',
    'Congruence of Triangles (SAS, ASA, SSS, RHS)',
    'Heron’s Formula & Surface Areas & Volumes'
  ],
  totalMarks: 32,
  durationMinutes: 24, // 8 questions * 3 minutes
  questions: [
    // =========================================================================
    // SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c9-math-q1',
      subject: 'Mathematics',
      type: 'single',
      title: 'Rationalizing the Denominator',
      prompt: 'Simplify the real number expression by rationalizing the denominator: 1 / (3 + √8). Which of the following is equivalent?',
      options: ['3 - 2√2', '3 + 2√2', '1 / (3 - 2√2)', '2√2 - 3'],
      correctAnswer: 0, // 3 - 2√2
      category: 'Number Systems',
      explanation: 'Note that √8 = 2√2. Multiply numerator and denominator by conjugate (3 - √8): 1*(3 - √8) / ((3 + √8)(3 - √8)) = (3 - 2√2) / (9 - 8) = 3 - 2√2.'
    },
    {
      id: 'c9-math-q2',
      subject: 'Mathematics',
      type: 'single',
      title: 'Remainder Theorem & Polynomial Divisibility',
      prompt: 'If the polynomial P(x) = x³ - 3x² + kx - 6 is exactly divisible by (x - 2), what is the value of the constant k?',
      options: ['k = 2', 'k = 5', 'k = -5', 'k = 10'],
      correctAnswer: 1, // k = 5
      category: 'Polynomials',
      explanation: 'By the Factor Theorem, P(2) = 0: (2)³ - 3(2)² + k(2) - 6 = 0 => 8 - 12 + 2k - 6 = 0 => 2k - 10 = 0 => k = 5.'
    },
    {
      id: 'c9-math-q3',
      subject: 'Mathematics',
      type: 'multiple',
      title: 'Linear Equations in Two Variables',
      prompt: 'Consider the linear equation 2x + 3y = 12 in two variables. Which of the following ordered pairs (x, y) represent valid solutions on its Cartesian graph? (Select ALL that apply)',
      options: [
        '(0, 4)',
        '(6, 0)',
        '(3, 2)',
        '(-3, 6)'
      ],
      correctAnswers: [0, 1, 2, 3],
      category: 'Coordinate Geometry',
      explanation: 'Testing each point: (0, 4): 2(0)+3(4)=12 (valid); (6, 0): 2(6)+3(0)=12 (valid); (3, 2): 2(3)+3(2)=6+6=12 (valid); (-3, 6): 2(-3)+3(6)=-6+18=12 (valid). All four are collinear solutions.'
    },
    {
      id: 'c9-math-q4',
      subject: 'Mathematics',
      type: 'single',
      title: 'Parallel Lines & Transversals',
      prompt: 'Two parallel lines l and m are intersected by a transversal t. If one interior angle on the same side of the transversal is 65°, what is the measure of the consecutive interior angle?',
      options: ['65°', '115°', '125°', '25°'],
      correctAnswer: 1, // 115°
      category: 'Lines and Angles',
      explanation: 'Consecutive interior angles on the same side of a transversal intersecting parallel lines are supplementary: 180° - 65° = 115°.'
    },
    {
      id: 'c9-math-q5',
      subject: 'Mathematics',
      type: 'multiple',
      title: 'Criteria for Congruence of Triangles',
      prompt: 'Which of the following geometric criteria guarantee that two Euclidean triangles are congruent? (Select ALL that apply)',
      options: [
        'Side-Angle-Side (SAS) Congruence Criterion',
        'Angle-Side-Angle (ASA) Congruence Criterion',
        'Angle-Angle-Angle (AAA) Criterion',
        'Right angle-Hypotenuse-Side (RHS) Congruence Criterion'
      ],
      correctAnswers: [0, 1, 3],
      category: 'Triangles',
      explanation: 'SAS, ASA, and RHS establish full congruence (identical size and shape). AAA establishes similarity only, not congruence.'
    },
    {
      id: 'c9-math-q6',
      subject: 'Mathematics',
      type: 'single',
      title: 'Heron’s Formula for Area of Triangle',
      prompt: 'The sides of a triangular garden are in the ratio 3 : 4 : 5 and its perimeter is 144 meters. What is the area of the triangle in square meters (m²)?',
      options: ['864 m²', '432 m²', '1728 m²', '576 m²'],
      correctAnswer: 0, // 864 m²
      category: 'Heron\'s Formula',
      explanation: 'Let sides be 3x, 4x, 5x. Perimeter = 12x = 144 => x = 12 m. The sides are 36 m, 48 m, 60 m. Since 36² + 48² = 1296 + 2304 = 3600 = 60², this is a right-angled triangle. Area = (1/2) * 36 * 48 = 864 m².'
    },

    // =========================================================================
    // SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c9-math-q7',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Evaluating Algebraic Identity',
      prompt: 'If a + b + c = 9 and ab + bc + ca = 26, calculate the numerical value of (a² + b² + c²).',
      correctAnswer: 29.0,
      tolerance: 0.1,
      unit: '',
      placeholder: 'e.g. 29',
      category: 'Algebraic Identities',
      explanation: 'Using the identity (a + b + c)² = a² + b² + c² + 2(ab + bc + ca): 9² = (a² + b² + c²) + 2(26) => 81 = (a² + b² + c²) + 52 => a² + b² + c² = 81 - 52 = 29.'
    },
    {
      id: 'c9-math-q8',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Total Surface Area of Hemisphere',
      prompt: 'A solid hemispherical paperweight has a base radius of r = 7 cm. Using π = 22/7, calculate the total surface area of the solid hemisphere in cm².',
      correctAnswer: 462.0,
      tolerance: 1.0,
      unit: 'cm²',
      placeholder: 'e.g. 462',
      category: 'Mensuration',
      explanation: 'Total surface area of a solid hemisphere = 3 * π * r² = 3 * (22/7) * 7² = 3 * 22 * 7 = 462 cm².'
    }
  ]
};
