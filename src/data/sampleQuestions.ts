import { Question } from '../types';

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'single',
    title: 'Computer Science & Algorithms',
    prompt: 'What is the tightest worst-case time complexity of finding a median of an unsorted array of n elements using the Quickselect (Median of Medians) algorithm illustrated in the recursion tree below?',
    imageUrl: 'https://images.unsplash.com/photo-1516116211227-bbc006e872e4?auto=format&fit=crop&w=800&q=80',
    imageCaption: 'Figure 1: Divide-and-conquer recurrence structure showing subproblem partitioning (T(n) <= T(n/5) + T(7n/10) + O(n))',
    options: [
      'O(n log n)',
      'O(n)',
      'O(n²)',
      'O(log n)'
    ],
    correctAnswer: 1, // O(n)
    category: 'Computer Science',
    explanation: 'The Median of Medians deterministic selection algorithm guarantees linear time O(n) in the worst-case by carefully picking a balanced pivot.'
  },
  {
    id: 'q2',
    type: 'multiple',
    title: 'Web & Systems Architecture',
    prompt: 'Which of the following HTTP status codes indicate a client-side error (4xx) according to the RFC 9110 specification? (Select ALL that apply)',
    options: [
      '403 Forbidden',
      '502 Bad Gateway',
      '409 Conflict',
      '429 Too Many Requests',
      '504 Gateway Timeout'
    ],
    correctAnswers: [0, 2, 3], // 403, 409, 429
    category: 'Networking',
    explanation: '403 Forbidden, 409 Conflict, and 429 Too Many Requests belong to the 4xx client-error category. 502 Bad Gateway and 504 Gateway Timeout are 5xx server errors.'
  },
  {
    id: 'q3',
    type: 'numerical',
    title: 'Physics & Kinematics',
    prompt: 'A projectile is launched from ground level with an initial velocity of 20 m/s at an angle of 30° above the horizontal. Assuming standard gravitational acceleration g = 9.8 m/s² and negligible air resistance, calculate the maximum vertical height (in meters) reached by the projectile.',
    correctAnswer: 5.10,
    tolerance: 0.15, // Accept [4.95, 5.25]
    unit: 'meters (m)',
    placeholder: 'e.g. 5.10',
    category: 'Physics',
    explanation: 'Vertical component of velocity vy = 20 * sin(30°) = 10 m/s. Max height H = vy² / (2 * g) = 100 / (2 * 9.8) ≈ 5.102 meters. With tolerance ±0.15 m, values from 4.95 to 5.25 are accepted.'
  },
  {
    id: 'q4',
    type: 'single',
    title: 'Modern Cryptography',
    prompt: 'Which asymmetric cryptographic algorithm relies directly on the computational intractability of the Discrete Logarithm Problem over elliptic curves?',
    options: [
      'RSA (Rivest–Shamir–Adleman)',
      'ECDSA (Elliptic Curve Digital Signature Algorithm)',
      'AES (Advanced Encryption Standard)',
      'SHA-256 (Secure Hash Algorithm 256-bit)'
    ],
    correctAnswer: 1, // ECDSA
    category: 'Cybersecurity',
    explanation: 'ECDSA is an asymmetric digital signature algorithm based on elliptic curve cryptography, which relies on the hardness of the Elliptic Curve Discrete Logarithm Problem (ECDLP).'
  },
  {
    id: 'q5',
    type: 'multiple',
    title: 'Distributed Systems & Database Theory',
    prompt: 'According to Brewer\'s CAP Theorem, which fundamental guarantees can a distributed data store simultaneously satisfy in the presence of an active network partition? (Select ALL that apply)',
    options: [
      'Consistency (C)',
      'Availability (A)',
      'Partition Tolerance (P)',
      'Linearizability without latency penalties'
    ],
    correctAnswers: [0, 2], // Consistency + Partition Tolerance OR Availability + Partition Tolerance; in presence of partition (P), one can choose either C+P or A+P
    category: 'Distributed Systems',
    explanation: 'Under CAP theorem, when a network partition (P) occurs, the system must trade off between Consistency (C) or Availability (A). Thus, a system can either choose CP (Consistency + Partition Tolerance) or AP (Availability + Partition Tolerance).'
  },
  {
    id: 'q6',
    type: 'numerical',
    title: 'Applied Chemistry & Thermodynamics',
    prompt: 'Calculate the pH of an aqueous solution containing 0.05 mol/L of a strong monoprotic acid (HCl) at 25°C. [Recall: pH = -log10[H+], where log10(0.05) ≈ -1.301]',
    correctAnswer: 1.30,
    tolerance: 0.05, // Accept [1.25, 1.35]
    unit: 'pH units',
    placeholder: 'e.g. 1.30',
    category: 'Chemistry',
    explanation: 'For a strong monoprotic acid like HCl, [H+] = 0.05 M. pH = -log10(0.05) = -(-1.301) ≈ 1.30. With a margin of error of ±0.05, answers between 1.25 and 1.35 are correct.'
  }
];
