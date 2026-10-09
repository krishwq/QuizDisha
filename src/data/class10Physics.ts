import { TestMetadata } from '../types';

export const CLASS_10_PHYSICS: TestMetadata = {
  id: 'c10-phy',
  standard: 'Class 10',
  subject: 'Physics',
  title: 'Class 10 Physics Examination',
  subtitle: 'Optics, Human Eye, Electricity & Magnetism',
  description: 'Certified board-level examination covering spherical mirrors and lenses, refractive indices, dispersion, Ohm’s law circuits, and electromagnetic induction.',
  syllabus: [
    'Reflection of Light & Spherical Mirrors',
    'Refraction of Light, Snell’s Law & Lens Power',
    'Human Eye, Refractive Defects & Atmospheric Refraction',
    "Ohm's Law, Resistance, Resistivity & Circuit Combinations",
    "Joule's Heating Effect & Electric Power",
    'Magnetic Field of Current, Solenoid & Domestic Wiring'
  ],
  totalMarks: 32,
  durationMinutes: 24, // 8 questions * 3 minutes
  questions: [
    // =========================================================================
    // SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c10-phy-q1',
      subject: 'Physics',
      type: 'single',
      title: 'Focal Length of Concave Shaving Mirror',
      prompt: 'A concave mirror used for grooming has a radius of curvature of R = 30 cm. According to standard Cartesian sign convention, what is the focal length of this mirror?',
      imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'Figure: Concave spherical reflector showing Pole (P), Focus (F), and Radius (R = 30 cm)',
      options: ['+15 cm', '-15 cm', '+60 cm', '-30 cm'],
      correctAnswer: 1, // -15 cm
      category: 'Optics',
      explanation: 'For a spherical mirror, f = R/2. By the Cartesian sign convention, the focus of a concave mirror lies in front of the reflecting surface (to the left of the pole), so f = -30/2 = -15 cm.'
    },
    {
      id: 'c10-phy-q2',
      subject: 'Physics',
      type: 'multiple',
      title: 'Conditions for Total Internal Reflection',
      prompt: 'Which of the following conditions MUST be satisfied for Total Internal Reflection (TIR) to occur at an optical boundary? (Select ALL that apply)',
      options: [
        'Light must travel from an optically denser medium to an optically rarer medium',
        'Light must travel from an optically rarer medium to an optically denser medium',
        'The angle of incidence in the denser medium must exceed the critical angle',
        'The angle of refraction in the rarer medium reaches 90° or greater'
      ],
      correctAnswers: [0, 2, 3],
      category: 'Optics',
      explanation: 'TIR occurs only when light propagates from denser to rarer medium and the angle of incidence strictly exceeds the critical angle, preventing any refracted ray from emerging into the rarer medium.'
    },
    {
      id: 'c10-phy-q3',
      subject: 'Physics',
      type: 'single',
      title: 'Wire Resistance After Uniform Stretching',
      prompt: 'A cylindrical metal wire of uniform cross-section has resistance R. If the wire is uniformly stretched to double its original length without altering its volume or density, what will be its new resistance?',
      options: ['R / 2', '2R', '4R', 'R / 4'],
      correctAnswer: 2, // 4R
      category: 'Electricity',
      explanation: 'Volume V = A * L is constant. When length doubles (L\' = 2L), area halves (A\' = A/2). Resistance R\' = ρ(2L / (A/2)) = 4 * ρ(L/A) = 4R.'
    },
    {
      id: 'c10-phy-q4',
      subject: 'Physics',
      type: 'multiple',
      title: 'Magnetic Field Strength inside a Solenoid',
      prompt: 'Which of the following modifications will INCREASE the strength of the magnetic field inside a current-carrying solenoid? (Select ALL that apply)',
      options: [
        'Increasing the magnitude of electric current passing through the coil',
        'Increasing the number of turns per unit length of the solenoid',
        'Inserting a soft iron core inside the hollow core of the solenoid',
        'Reversing the direction of current with identical magnitude'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Magnetism',
      explanation: 'Magnetic field B = μ·n·I. Increasing current I, increasing turns density n, or introducing a ferromagnetic soft iron core (higher μ) substantially increases field intensity. Reversing current flips polarity but leaves magnitude unchanged.'
    },
    {
      id: 'c10-phy-q5',
      subject: 'Physics',
      type: 'single',
      title: 'Power Rating of Electrical Heater',
      prompt: 'An electric immersion heater draws a current of 5.0 A from a 220 V main power supply. What is the electrical power rating of the heater?',
      options: ['44 W', '550 W', '1100 W', '2200 W'],
      correctAnswer: 2, // 1100 W
      category: 'Electricity',
      explanation: 'Electrical power P = V * I = 220 V * 5.0 A = 1100 Watts (W).'
    },
    {
      id: 'c10-phy-q6',
      subject: 'Physics',
      type: 'multiple',
      title: 'Myopia (Near-Sightedness) & Correction',
      prompt: 'Which of the following statements concerning a myopic human eye are scientifically accurate? (Select ALL that apply)',
      options: [
        'Nearby objects are seen distinctly while distant objects appear blurred',
        'The image of distant objects is formed in front of the retina',
        'The defect is corrected using a concave (diverging) lens of suitable focal length',
        'The defect is caused by excessive shortening of the eyeball'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Human Eye',
      explanation: 'Myopia is caused by excessive curvature of the eye lens or elongation (not shortening) of the eyeball, focusing images in front of the retina. A diverging concave lens corrects this.'
    },

    // =========================================================================
    // SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c10-phy-q7',
      subject: 'Physics',
      type: 'numerical',
      title: 'Optical Power of Corrective Lens',
      prompt: 'An optometrist prescribes a corrective convex lens of focal length +50 cm for an eye with hypermetropia. Calculate the optical power of this lens in Diopters (D).',
      correctAnswer: 2.0,
      tolerance: 0.1,
      unit: 'Diopters (D)',
      placeholder: 'e.g. 2.0',
      category: 'Optics',
      explanation: 'Power P = 1 / f (in meters). f = +50 cm = +0.5 m => P = 1 / 0.5 = +2.0 Diopters (D).'
    },
    {
      id: 'c10-phy-q8',
      subject: 'Physics',
      type: 'numerical',
      title: 'Equivalent Resistance in Parallel',
      prompt: 'Two resistors of 6 Ω and 12 Ω are connected in parallel across a battery. Calculate the equivalent resistance of this parallel combination in Ohms (Ω).',
      correctAnswer: 4.0,
      tolerance: 0.1,
      unit: 'Ohms (Ω)',
      placeholder: 'e.g. 4.0',
      category: 'Current Electricity',
      explanation: '1/Req = 1/6 + 1/12 = 3/12 = 1/4 => Req = 4.0 Ω.'
    }
  ]
};
