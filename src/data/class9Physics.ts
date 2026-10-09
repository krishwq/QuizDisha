import { TestMetadata } from '../types';

export const CLASS_9_PHYSICS: TestMetadata = {
  id: 'c9-phy',
  standard: 'Class 9',
  subject: 'Physics',
  title: 'Class 9 Physics Examination',
  subtitle: 'Motion, Force, Gravitation & Work-Energy',
  description: 'Certified assessment covering kinematics equations, Newton’s laws of motion, universal law of gravitation, momentum conservation, and kinetic/potential energy.',
  syllabus: [
    'Equations of Uniformly Accelerated Motion',
    "Newton's Three Laws of Motion & Momentum",
    'Universal Gravitation & Free Fall',
    'Mass vs Weight & Acceleration due to Gravity',
    'Work, Kinetic Energy & Potential Energy',
    'Conservation of Mechanical Energy & Power'
  ],
  totalMarks: 32,
  durationMinutes: 24, // 8 questions * 3 minutes
  questions: [
    // =========================================================================
    // SECTION A: MULTIPLE CHOICE QUESTIONS (MCQ)
    // =========================================================================
    {
      id: 'c9-phy-q1',
      subject: 'Physics',
      type: 'single',
      title: 'Displacement vs Distance in Circular Motion',
      prompt: 'An athlete completes one round of a circular track of radius R = 70 m in 40 seconds. What is the magnitude of the displacement of the athlete at the end of 2 minutes 20 seconds?',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      imageCaption: 'Figure: Circular track trajectory with radius R = 70 m and diametrically opposite position',
      options: ['0 m', '140 m', '220 m', '440 m'],
      correctAnswer: 1, // 140 m
      category: 'Motion',
      explanation: 'Total time = 2 min 20 s = 140 s. Number of rounds = 140 / 40 = 3.5 rounds. After 3 complete rounds, displacement is 0. In the next 0.5 round, the athlete reaches the diametrically opposite point. Thus, displacement = 2 * R = 2 * 70 m = 140 m.'
    },
    {
      id: 'c9-phy-q2',
      subject: 'Physics',
      type: 'single',
      title: 'Newton’s Second Law of Motion',
      prompt: 'A force of 10 N acts on a body of mass 2 kg initially at rest for 4 seconds. What is the final velocity acquired by the body?',
      options: ['5 m/s', '10 m/s', '20 m/s', '40 m/s'],
      correctAnswer: 2, // 20 m/s
      category: 'Laws of Motion',
      explanation: 'Acceleration a = F / m = 10 N / 2 kg = 5 m/s². Final velocity v = u + at = 0 + (5 m/s² * 4 s) = 20 m/s.'
    },
    {
      id: 'c9-phy-q3',
      subject: 'Physics',
      type: 'multiple',
      title: 'Universal Law of Gravitation Characteristics',
      prompt: 'Which of the following statements regarding the Universal Gravitational Constant (G) and acceleration due to gravity (g) are correct? (Select ALL that apply)',
      options: [
        'The value of G remains constant throughout the universe and does not depend on the medium',
        'The SI unit of the Universal Gravitational Constant G is N·m²/kg²',
        'The value of g is zero at the center of the Earth',
        'The value of g is maximum at the equator and minimum at the poles'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Gravitation',
      explanation: 'G is an absolute universal constant (6.674 × 10⁻¹¹ N·m²/kg²). At Earth’s center, g = 0. Due to Earth’s flattened shape, radius is smaller at the poles, so g is MAXIMUM at the poles and minimum at the equator (statement 4 is inverted).'
    },
    {
      id: 'c9-phy-q4',
      subject: 'Physics',
      type: 'single',
      title: 'Conservation of Linear Momentum',
      prompt: 'A bullet of mass 20 g is horizontally fired with a velocity of 150 m/s from a pistol of mass 2 kg. What is the recoil velocity of the pistol?',
      options: ['-1.5 m/s', '+1.5 m/s', '-15 m/s', '-0.15 m/s'],
      correctAnswer: 0, // -1.5 m/s
      category: 'Laws of Motion',
      explanation: 'By conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂. Initially at rest: 0 = (0.02 kg * 150 m/s) + (2 kg * v₂). Thus 2v₂ = -3, giving v₂ = -1.5 m/s (negative sign denotes recoil in the opposite direction).'
    },
    {
      id: 'c9-phy-q5',
      subject: 'Physics',
      type: 'multiple',
      title: 'Work Done in Physical Systems',
      prompt: 'In which of the following scenarios is the net mechanical work done strictly equal to ZERO? (Select ALL that apply)',
      options: [
        'A satellite orbiting the Earth in a uniform circular orbit under gravitational force',
        'A coolie holding a luggage of 25 kg stationary on his head for 15 minutes',
        'A stone tied to a string rotated in a horizontal circle by centripetal tension',
        'A crane lifting a heavy concrete block vertically upwards against gravity'
      ],
      correctAnswers: [0, 1, 2],
      category: 'Work & Energy',
      explanation: 'Work W = F * s * cos(θ). In circular orbit and horizontal rotation, force is perpendicular to displacement (cos 90° = 0), so work is 0. When luggage is held stationary, displacement s = 0, so work is 0. Lifting upwards involves non-zero positive work against gravity.'
    },
    {
      id: 'c9-phy-q6',
      subject: 'Physics',
      type: 'single',
      title: 'Kinetic Energy vs Momentum',
      prompt: 'If the linear momentum of an object is doubled while keeping its mass constant, by what factor does its kinetic energy increase?',
      options: ['2 times', '4 times', '8 times', 'Remains unchanged'],
      correctAnswer: 1, // 4 times
      category: 'Work & Energy',
      explanation: 'Kinetic Energy KE = p² / (2m). If momentum p is doubled to 2p, KE\' = (2p)² / (2m) = 4 * (p² / 2m) = 4 * KE. Hence, kinetic energy quadruples.'
    },

    // =========================================================================
    // SECTION B: NUMERICAL VALUE QUESTIONS
    // =========================================================================
    {
      id: 'c9-phy-q7',
      subject: 'Physics',
      type: 'numerical',
      title: 'Height Reached in Vertical Projection',
      prompt: 'A ball is thrown vertically upwards with an initial velocity of 20 m/s. Taking acceleration due to gravity g = 10 m/s², calculate the maximum height reached by the ball in meters (m).',
      correctAnswer: 20.0,
      tolerance: 0.2,
      unit: 'meters (m)',
      placeholder: 'e.g. 20',
      category: 'Motion & Gravitation',
      explanation: 'At maximum height, v = 0. Using the kinematic formula v² = u² - 2gh: 0 = (20)² - 2(10)h => 20h = 400 => h = 20 m.'
    },
    {
      id: 'c9-phy-q8',
      subject: 'Physics',
      type: 'numerical',
      title: 'Electrical Power of an Immersion Rod',
      prompt: 'An electric water heater does 72,000 Joules of work in 2 minutes. Calculate the power delivered by the heater in Watts (W).',
      correctAnswer: 600.0,
      tolerance: 2.0,
      unit: 'Watts (W)',
      placeholder: 'e.g. 600',
      category: 'Work, Energy & Power',
      explanation: 'Time t = 2 min = 120 seconds. Power P = Work / Time = 72,000 J / 120 s = 600 W.'
    }
  ]
};
