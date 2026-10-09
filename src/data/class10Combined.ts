import { TestMetadata } from '../types';

export const CLASS_10_COMBINED: TestMetadata = {
  id: 'c10-comb',
  standard: 'Class 10',
  subject: 'Combined',
  title: 'Class 10 Combined: Physics & Mathematics',
  subtitle: 'Unified Assessment: Optics, Electrodynamics, Algebra & Trigonometry',
  description: 'Integrated dual-subject examination combining Class 10 Physics and Mathematics with dedicated subject sections and distinct MCQ/Numerical components.',
  syllabus: [
    'Physics: Ray Optics, Spherical Mirrors & Lens Equations',
    'Physics: Electric Circuits, Resistance & Power Calculations',
    'Mathematics: Real Numbers & Quadratic Equation Discriminants',
    'Mathematics: Arithmetic Progressions & Trigonometric Identites',
    'Mathematics: Coordinate Geometry & Tangents to Circles'
  ],
  totalMarks: 48,
  durationMinutes: 36, // 12 questions * 3 minutes
  questions: [
    // =========================================================================
    // PHYSICS — SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c10-comb-p-q1',
      subject: 'Physics',
      type: 'single',
      title: 'Convex Lens Image Formation',
      prompt: 'Where should an object be placed in front of a convex lens so that a real, inverted image of the exact same size as the object is formed on the other side?',
      imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80',
      imageCaption: 'Figure: Optical ray diagram for symmetric refraction through convex biconvex lens',
      options: ['At the principal focus (F₁)', 'At twice the focal length (2F₁)', 'At infinity', 'Between optical center and focus'],
      correctAnswer: 1, // At 2F1
      category: 'Optics',
      explanation: 'When an object is placed at 2F₁ in front of a convex lens, rays converge at 2F₂ on the opposite side, producing a real, inverted image with magnification m = -1 (identical size).'
    },
    {
      id: 'c10-comb-p-q2',
      subject: 'Physics',
      type: 'single',
      title: 'Current and Drift of Electrons',
      prompt: 'A steady current of 1.6 A flows through a copper conductor for 10 seconds. Given the fundamental electronic charge e = 1.6 × 10⁻¹⁹ C, how many conduction electrons cross the cross-section?',
      options: ['1.0 × 10¹⁹', '1.0 × 10²⁰', '1.6 × 10¹⁹', '2.5 × 10¹⁹'],
      correctAnswer: 1, // 1.0 x 10^20
      category: 'Current Electricity',
      explanation: 'Total charge Q = I * t = 1.6 A * 10 s = 16 Coulombs. Number of electrons n = Q / e = 16 / (1.6 × 10⁻¹⁹) = 1.0 × 10²⁰ electrons.'
    },
    {
      id: 'c10-comb-p-q3',
      subject: 'Physics',
      type: 'multiple',
      title: 'Factors Influencing Electrical Resistance',
      prompt: 'The electrical resistance R of a metallic conductor depends directly on which of the following physical parameters? (Select ALL that apply)',
      options: [
        'The length of the conductor (L)',
        'The cross-sectional area of the conductor (A)',
        'The nature of the material (Resistivity ρ)',
        'The operational temperature of the conductor'
      ],
      correctAnswers: [0, 1, 2, 3],
      category: 'Current Electricity',
      explanation: 'Resistance R = ρ·L / A. Hence it is proportional to length, inversely proportional to area, depends on the intrinsic material resistivity ρ, and increases with temperature for conductors.'
    },
    {
      id: 'c10-comb-p-q4',
      subject: 'Physics',
      type: 'single',
      title: 'Magnetic Field Around a Straight Conductor',
      prompt: 'Which physical rule determines the direction of the magnetic field lines around a straight current-carrying wire?',
      options: ["Fleming's Left-Hand Rule", "Fleming's Right-Hand Rule", "Maxwell's Right-Hand Thumb Rule", "Lenz's Law"],
      correctAnswer: 2, // Maxwell's Right-Hand Thumb Rule
      category: 'Magnetism',
      explanation: "According to Maxwell's Right-Hand Thumb Rule, pointing the right thumb in the direction of electric current curls the fingers in the direction of the concentric magnetic field lines."
    },

    // =========================================================================
    // PHYSICS — SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c10-comb-p-q5',
      subject: 'Physics',
      type: 'numerical',
      title: 'Mirror Formula & Image Distance',
      prompt: 'A convex mirror with focal length f = +15 cm forms an image of a vehicle situated 10 cm in front of the mirror (u = -10 cm). Calculate the image distance v in cm.',
      correctAnswer: 6.0,
      tolerance: 0.1,
      unit: 'cm',
      placeholder: 'e.g. 6.0',
      category: 'Optics',
      explanation: 'Mirror formula: 1/f = 1/v + 1/u => 1/v = 1/15 - 1/(-10) = 1/15 + 1/10 = (2 + 3)/30 = 5/30 = 1/6 => v = +6.0 cm.'
    },
    {
      id: 'c10-comb-p-q6',
      subject: 'Physics',
      type: 'numerical',
      title: 'Heat Dissipated in Resistor',
      prompt: 'A 20 Ω electric heater operates on a 100 V supply for 30 seconds. Calculate the total heat generated in Joules (J).',
      correctAnswer: 15000.0,
      tolerance: 100.0,
      unit: 'Joules (J)',
      placeholder: 'e.g. 15000',
      category: 'Joule Heating',
      explanation: 'Power P = V² / R = (100)² / 20 = 10,000 / 20 = 500 W. Heat H = P * t = 500 W * 30 s = 15,000 Joules.'
    },

    // =========================================================================
    // MATHEMATICS — SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c10-comb-m-q7',
      subject: 'Mathematics',
      type: 'single',
      title: 'Sum and Product of Quadratic Roots',
      prompt: 'For the quadratic equation 3x² - 5x + 2 = 0, what is the value of the product of its roots (α · β)?',
      options: ['5 / 3', '-5 / 3', '2 / 3', '-2 / 3'],
      correctAnswer: 2, // 2 / 3
      category: 'Quadratic Equations',
      explanation: 'For ax² + bx + c = 0, product of roots α · β = c / a. Here c = 2, a = 3, so α · β = 2/3.'
    },
    {
      id: 'c10-comb-m-q8',
      subject: 'Mathematics',
      type: 'single',
      title: 'General Term of Arithmetic Progression',
      prompt: 'If the nth term of an arithmetic progression is given by aₙ = 5n - 3, what is the common difference d of the sequence?',
      options: ['3', '-3', '5', '2'],
      correctAnswer: 2, // 5
      category: 'Arithmetic Progressions',
      explanation: 'a₁ = 5(1) - 3 = 2. a₂ = 5(2) - 3 = 7. Common difference d = a₂ - a₁ = 7 - 2 = 5.'
    },
    {
      id: 'c10-comb-m-q9',
      subject: 'Mathematics',
      type: 'multiple',
      title: 'Fundamental Trigonometric Identities',
      prompt: 'Which of the following mathematical identities are TRUE for all permissible acute angles θ? (Select ALL that apply)',
      options: [
        'sin² θ + cos² θ = 1',
        '1 + tan² θ = sec² θ',
        '1 + cot² θ = cosec² θ',
        'sin θ · cos θ = 1'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Trigonometry',
      explanation: 'The three standard Pythagorean identities are sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, and 1 + cot²θ = cosec²θ. Option 4 is false (tan θ · cot θ = 1, whereas sin θ · cos θ = (1/2)sin 2θ).'
    },
    {
      id: 'c10-comb-m-q10',
      subject: 'Mathematics',
      type: 'single',
      title: 'Distance Between Two Cartesian Points',
      prompt: 'What is the straight-line Euclidean distance between the points A(2, 3) and B(6, 6)?',
      options: ['4 units', '5 units', '7 units', '25 units'],
      correctAnswer: 1, // 5 units
      category: 'Coordinate Geometry',
      explanation: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(6 - 2)² + (6 - 3)²] = √[4² + 3²] = √[16 + 9] = √25 = 5 units.'
    },

    // =========================================================================
    // MATHEMATICS — SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c10-comb-m-q11',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Sum of First n Natural Numbers',
      prompt: 'Calculate the sum of the first 20 positive integers (1 + 2 + 3 + ... + 20).',
      correctAnswer: 210.0,
      tolerance: 0.1,
      unit: '',
      placeholder: 'e.g. 210',
      category: 'Arithmetic Progressions',
      explanation: 'Sum S = n(n + 1) / 2 = 20 * 21 / 2 = 10 * 21 = 210.'
    },
    {
      id: 'c10-comb-m-q12',
      subject: 'Mathematics',
      type: 'numerical',
      title: 'Area of a Circular Sector',
      prompt: 'A circular pizza sector has a radius of r = 6 cm and a central angle of 60°. Using π = 3.14, calculate the area of the sector in cm².',
      correctAnswer: 18.84,
      tolerance: 0.2,
      unit: 'cm²',
      placeholder: 'e.g. 18.84',
      category: 'Areas Related to Circles',
      explanation: 'Area of sector = (θ / 360°) * π * r² = (60 / 360) * 3.14 * 6² = (1 / 6) * 3.14 * 36 = 3.14 * 6 = 18.84 cm².'
    }
  ]
};
