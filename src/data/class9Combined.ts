import { TestMetadata } from '../types';

export const CLASS_9_COMBINED: TestMetadata = {
  id: 'c9-comb',
  standard: 'Class 9',
  subject: 'Combined',
  title: 'Class 9 Combined: Physics & Mathematics',
  subtitle: 'Unified Assessment: Motion, Force, Algebra & Geometry',
  description: 'Comprehensive evaluation combining foundational Physics mechanics and core Mathematics algebraic reasoning with structured subject and question-type sections.',
  syllabus: [
    'Motion & Forces',
    'Work, power & Energy',
    'Sound',
    'Progression',
    'Perimeter and Area',
  ],
  totalMarks: 120,
  durationMinutes: 90, // 12 questions * 3 minutes
  questions: [
  {
    "id": "c9-comb-p-q1",
    "subject": "Physics",
    "type": "single",
    "title": "Work Done by Upward Force",
    "prompt": "A girl carries a heavy box and walks horizontally at a constant velocity. What is the work done by the upward force she applies on the box?",
    "options": [
      "Negative work.",
      "Positive work.",
      "Zero work.",
      "Undefined work."
    ],
    "correctAnswer": 2,
    "category": "Work and Energy",
    "explanation": "When the applied force (upward) and the displacement (horizontal) are perpendicular to each other, the work done by that force is exactly zero."
  },
  {
    "id": "c9-comb-p-q2",
    "subject": "Physics",
    "type": "single",
    "title": "Maximum Kinetic Energy in a Pendulum",
    "prompt": "In a simple pendulum system, at which point does the pendulum bob possess the maximum kinetic energy?",
    "options": [
      "Exactly halfway up the path.",
      "At the lowest central point.",
      "At the highest extreme points.",
      "Just before the release point."
    ],
    "correctAnswer": 1,
    "category": "Work and Energy",
    "explanation": "As the bob falls from its highest point, its potential energy is converted entirely into kinetic energy, reaching a maximum at the lowest point of its swing."
  },
  {
    "id": "c9-comb-p-q3",
    "subject": "Physics",
    "type": "single",
    "title": "Comparing Power of Two Machines",
    "prompt": "Machine A and Machine B perform the exact same amount of work, but Machine A completes the task in half the time it takes Machine B. How do their powers compare?",
    "options": [
      "Both have the exact same power.",
      "Machine A has half the power.",
      "Machine A has quadruple power.",
      "Machine A has double the power."
    ],
    "correctAnswer": 3,
    "category": "Work and Energy",
    "explanation": "Power is defined as the rate of doing work. Because Machine A completes the exact same amount of work in half the time, its power output is double that of Machine B."
  },
  {
    "id": "c9-comb-p-q4",
    "subject": "Physics",
    "type": "single",
    "title": "Conservation of Mechanical Energy",
    "prompt": "If an object falls freely under the influence of gravity alone (ignoring air resistance), its total mechanical energy:",
    "options": [
      "Continuously decreases.",
      "Continuously increases.",
      "Fluctuates unpredictably.",
      "Remains strictly constant."
    ],
    "correctAnswer": 3,
    "category": "Work and Energy",
    "explanation": "According to the principle of conservation of mechanical energy, when an object falls freely under gravity with no non-conservative forces like air resistance acting on it, its total mechanical energy remains strictly constant."
  },
  {
    "id": "c9-comb-p-q5",
    "subject": "Physics",
    "type": "single",
    "title": "Effect of Velocity on Kinetic Energy",
    "prompt": "If the velocity of a moving bicycle is tripled, how does its kinetic energy change?",
    "options": [
      "It increases by 3 times.",
      "It increases by 12 times.",
      "It increases by 9 times.",
      "It increases by 6 times."
    ],
    "correctAnswer": 2,
    "category": "Work and Energy",
    "explanation": "Kinetic energy is proportional to the square of velocity ($K = \\frac{1}{2}mv^2$). If velocity is multiplied by 3, kinetic energy is multiplied by $3^2 = 9$."
  },
  {
    "id": "c9-comb-p-q6",
    "subject": "Physics",
    "type": "single",
    "title": "Sound in a Vacuum",
    "prompt": "Why does a ringing electric bell become completely silent when the air is pumped out of a sealed bell jar?",
    "options": [
      "The wave requires a medium to propagate.",
      "The bell absorbs its own kinetic energy.",
      "The vacuum stops the mechanical hammer.",
      "The glass jar blocks the sound frequencies."
    ],
    "correctAnswer": 0,
    "category": "Sound",
    "explanation": "Sound is a mechanical wave that requires a material medium to propagate. When air is pumped out, a vacuum is created, and sound can no longer travel."
  },
  {
    "id": "c9-comb-p-q7",
    "subject": "Physics",
    "type": "single",
    "title": "Crests in Sound Waves",
    "prompt": "In a graphical representation of a sound wave plotting density against distance, what does a crest represent?",
    "options": [
      "A region of maximum compression.",
      "A region of average air density.",
      "A region of zero wave amplitude.",
      "A region of maximum rarefaction."
    ],
    "correctAnswer": 0,
    "category": "Sound",
    "explanation": "In a density-distance graph for a longitudinal sound wave, a crest represents the region of highest density, which corresponds to maximum compression."
  },
  {
    "id": "c9-comb-p-q8",
    "subject": "Physics",
    "type": "single",
    "title": "Echo in a Small Room",
    "prompt": "Why is an echo generally not heard by a person standing in a very small, empty room?",
    "options": [
      "The walls completely absorb all sound energy.",
      "The reflections arrive in more than 0.1 s.",
      "The reflections arrive in less than 0.1 s.",
      "The room completely lacks a dense medium."
    ],
    "correctAnswer": 2,
    "category": "Sound",
    "explanation": "For a distinct echo to be heard, the reflected sound must reach the ear at least 0.1 seconds after the original sound. In a small room, the distance is too short, so reflections arrive in less than 0.1 s."
  },
  {
    "id": "c9-comb-p-q9",
    "subject": "Physics",
    "type": "single",
    "title": "Time Period of a Tuning Fork",
    "prompt": "If a tuning fork vibrates at a frequency of 250 Hz, what is its time period?",
    "options": [
      "4.000 s",
      "2.500 s",
      "0.040 s",
      "0.004 s"
    ],
    "correctAnswer": 3,
    "category": "Sound",
    "explanation": "Time period (T) is the reciprocal of frequency (f). Using the formula T = 1 / f, we get T = 1 / 250 Hz = 0.004 s."
  },
  {
    "id": "c9-comb-p-q10",
    "subject": "Physics",
    "type": "single",
    "title": "Distance of a Cliff by Echo",
    "prompt": "If an echo is heard exactly 3.0 s after shouting near a cliff, how far away is the cliff? (Assume speed of sound is 340 m s⁻¹)",
    "options": [
      "510 m",
      "340 m",
      "170 m",
      "1020 m"
    ],
    "correctAnswer": 0,
    "category": "Sound",
    "explanation": "The sound travels to the cliff and back, covering twice the distance (2d). The total distance is speed × time = 340 m/s × 3.0 s = 1020 m. Therefore, the distance to the cliff is half of that, which is 510 m."
  },
  {
    "id": "c9-comb-p-q11",
    "subject": "Physics",
    "type": "numerical",
    "title": "Work Done by Frictional Force",
    "prompt": "A frictional force of 40 N acts on a sliding box, bringing it to a stop over a distance of 5 m. What is the work done by the frictional force?",
    "correctAnswer": -200,
    "tolerance": 0.01,
    "unit": "J",
    "placeholder": "e.g. 000",
    "category": "Work and Energy",
    "explanation": "Friction acts in the opposite direction of displacement. Therefore, work = 40 N * (-5 m) = -200 J."
  },
  {
    "id": "c9-comb-p-q12",
    "subject": "Physics",
    "type": "numerical",
    "title": "Power Output of an Electric Motor",
    "prompt": "An electric motor performs 1200 J of work in 1 minute. What is the power output of the motor?",
    "correctAnswer": 20,
    "tolerance": 0.01,
    "unit": "W",
    "placeholder": "e.g. 70",
    "category": "Work and Energy",
    "explanation": "Power is defined as work done per unit time (P = W / t). First, convert time to seconds: 1 minute = 60 seconds. Then, P = 1200 J / 60 s = 20 W."
  },
  {
    "id": "c9-comb-p-q13",
    "subject": "Physics",
    "type": "numerical",
    "title": "Maximum Load of a Lever",
    "prompt": "A lever has an effort arm of 4 m and a load arm of 0.5 m. If an effort of 50 N is applied, what is the maximum load that can be lifted?",
    "correctAnswer": 400,
    "tolerance": 0.01,
    "unit": "N",
    "placeholder": "e.g. 100",
    "category": "Simple Machines",
    "explanation": "Using the principle of moments: Effort * Effort Arm = Load * Load Arm. Thus, 50 * 4 = Load * 0.5, which makes Load = 400 N."
  },
  {
    "id": "c9-comb-p-q14",
    "subject": "Physics",
    "type": "numerical",
    "title": "Ratio of Sound Speeds in Air and Water",
    "prompt": "Two identical sound sources are placed at A and B—one in air and one submerged in water (Fig. 10.34). Both produce sounds at the same time, which travel horizontally to the vertical side of the cliff and come back. If the time taken by the sound to return to A is 4.5 times than that of B, what is the ratio between the speeds of sound in air and water?",
    "imageUrl": "https://drive.google.com/thumbnail?id=1U6tczCtWpx2gRs6dFVAmcjhHj-jdiv7e&sz=w1200",
    "imageCaption": "Figure: Sender and Receiver in Air and Water",
    "correctAnswer": 0.222,
    "tolerance": 0.01,
    "unit": "",
    "placeholder": "e.g. 000",
    "category": "Sound",
    "explanation": "Let the distance to the cliff be d. The time taken for sound to return in air is t_A = 2d / v_A, and in water is t_B = 2d / v_B. The problem states t_A = 4.5 * t_B. Substituting the expressions gives 2d / v_A = 4.5 * (2d / v_B). Canceling 2d from both sides gives 1 / v_A = 4.5 / v_B. Rearranging for the ratio of speeds (v_A / v_B) yields 1 / 4.5, which simplifies to 2 / 9 or approximately 0.222."
  },
  {
    "id": "c9-comb-p-q15",
    "subject": "Physics",
    "type": "numerical",
    "title": "Distance to Underwater Cliff using Sonar",
    "prompt": "A naval destroyer is moving directly towards a vertical underwater cliff at a constant velocity of 15 m/s. The ship emits a horizontal sonar pulse straight ahead towards the cliff, and the receiver detects the echo exactly 2.5 seconds later. Assuming the speed of sound in seawater is 1530 m/s, calculate the distance between the ship and the cliff at the exact moment the sonar pulse was received.",
    "correctAnswer": 1893.75,
    "tolerance": 0.1,
    "unit": "m",
    "placeholder": "e.g. 1111",
    "category": "Sound",
    "explanation": "Let x be the distance between the ship and the cliff exactly when the echo is received. During the 2.5 seconds, the ship moves a distance of 15 m/s * 2.5 s = 37.5 m towards the cliff. Therefore, the distance to the cliff when the pulse was emitted was (x + 37.5) m. The total distance the sound wave traveled is the forward trip to the cliff plus the return trip to the ship's new position: (x + 37.5) + x = 2x + 37.5. The total distance traveled by the sound is also equal to its speed multiplied by time: 1530 m/s * 2.5 s = 3825 m. Equating the two distances gives 2x + 37.5 = 3825. Solving for x yields 2x = 3787.5, so x = 1893.75 m."
  },
  {
    "id": "c9-comb-m-q1",
    "subject": "Mathematics",
    "type": "single",
    "title": "Recursive Sequence Term",
    "prompt": "A sequence is generated by the recursive rule u₁ = 1 and uₙ = 2uₙ₋₁ + 3 for n ≥ 2. What is the value of the 4ᵗʰ term?",
    "options": [
      "11",
      "13",
      "29",
      "61"
    ],
    "correctAnswer": 2,
    "category": "Sequences and Series",
    "explanation": "Given u₁ = 1. The second term is u₂ = 2(1) + 3 = 5. The third term is u₃ = 2(5) + 3 = 13. Finally, the fourth term is u₄ = 2(13) + 3 = 29."
  },
  {
    "id": "c9-comb-m-q2",
    "subject": "Mathematics",
    "type": "single",
    "title": "Arithmetic Progression Term",
    "prompt": "An arithmetic progression has 50 terms. If the 3ʳᵈ term is 12 and the last term is 106, what is the value of the 29ᵗʰ term?",
    "options": [
      "58",
      "60",
      "64",
      "72"
    ],
    "correctAnswer": 2,
    "category": "Sequences and Series",
    "explanation": "Let the first term be a and the common difference be d. We have a + 2d = 12 and a + 49d = 106. Subtracting the equations gives 47d = 94, meaning d = 2. Substituting d back gives a + 4 = 12, so a = 8. The 29th term is calculated as a + 28d = 8 + 28(2) = 64."
  },
  {
    "id": "c9-comb-m-q3",
    "subject": "Mathematics",
    "type": "single",
    "title": "Area of a Cyclic Quadrilateral",
    "prompt": "A cyclic quadrilateral has side lengths a = 3, b = 4, c = 5, and d = 6. Using Brahmagupta's formula, what is the area of this quadrilateral?",
    "options": [
      "6√10",
      "10√6",
      "18",
      "36"
    ],
    "correctAnswer": 0,
    "category": "Geometry",
    "explanation": "First, find the semi-perimeter s = (3 + 4 + 5 + 6)/2 = 9. Applying Brahmagupta's formula, Area = √((9-3)(9-4)(9-5)(9-6)) = √(6 × 5 × 4 × 3) = √360 = 6√10."
  },
  {
    "id": "c9-comb-m-q4",
    "subject": "Mathematics",
    "type": "single",
    "title": "Bouncing Ball Maximum Height",
    "prompt": "A ball is dropped from a height of 24 feet. Each time it hits the ground, it bounces up to 3/4 of its previous height. What is the maximum height the ball reaches after its 3ʳᵈ bounce?",
    "options": [
      "7.59 feet",
      "10.125 feet",
      "13.5 feet",
      "18 feet"
    ],
    "correctAnswer": 1,
    "category": "Sequences and Series",
    "explanation": "The maximum height forms a geometric sequence. After the 1st bounce, the height is 24 × (3/4) = 18 feet. After the 2nd bounce, it is 18 × (3/4) = 13.5 feet. After the 3rd bounce, it is 13.5 × (3/4) = 10.125 feet."
  },
  {
    "id": "c9-comb-m-q5",
    "subject": "Mathematics",
    "type": "single",
    "title": "Perimeter of Intersecting Circles",
    "prompt": "Two circles, each of radius r, are located such that each circle passes through the center of the other. What is the total perimeter of the shape formed by the outer boundaries of these two intersecting circles?",
    "options": [
      "4/3 πr",
      "2πr",
      "8/3 πr",
      "3πr"
    ],
    "correctAnswer": 2,
    "category": "Geometry",
    "explanation": "The centers of the circles and their intersection points form two equilateral triangles, meaning the intersecting arcs subtend 120° at each center. The outer boundary consists of two major arcs, each subtending 240° (360° - 120°). The length of one major arc is (240/360) × 2πr = (4/3)πr. Therefore, the total perimeter is 2 × (4/3)πr = (8/3)πr."
  },
  {
    "id": "c9-comb-m-q6",
    "subject": "Mathematics",
    "type": "single",
    "title": "Area of a Triangular Plot",
    "prompt": "The sides of a triangular plot are in the ratio 3 : 5 : 7 and its total perimeter is 300 m. Using Heron's formula, what is the area of the plot?",
    "options": [
      "1500√3",
      "3000√3",
      "4500√2",
      "6000√2"
    ],
    "correctAnswer": 0,
    "category": "Geometry",
    "explanation": "Let the sides be 3x, 5x, and 7x. Their sum is 15x = 300, which gives x = 20. The side lengths are 60 m, 100 m, and 140 m, with a semi-perimeter s = 150 m. Using Heron's formula: Area = √(150 × (150-60) × (150-100) × (150-140)) = √(150 × 90 × 50 × 10) = √6750000 = 1500√3."
  },
  {
    "id": "c9-comb-m-q7",
    "subject": "Mathematics",
    "type": "single",
    "title": "Perimeter of a Sector",
    "prompt": "A sector of a circle with a radius of 14 cm has a sector angle of 75°. What is the total perimeter of this sector? (Use π ≈ 22/7)",
    "options": [
      "18.33 cm",
      "28.66 cm",
      "46.33 cm",
      "52.33 cm"
    ],
    "correctAnswer": 2,
    "category": "Geometry",
    "explanation": "The arc length l is calculated as (75/360) × 2πr = (5/24) × 2 × (22/7) × 14 = (5/24) × 88 = 55/3 ≈ 18.33 cm. The total perimeter includes the arc and the two bounding radii, resulting in 18.33 cm + 14 cm + 14 cm = 46.33 cm."
  },
  {
    "id": "c9-comb-m-q8",
    "subject": "Mathematics",
    "type": "single",
    "title": "Position Index of an AP Term",
    "prompt": "The nᵗʰ term of an arithmetic progression is given by tₙ = 5n - 3. If a specific term in this sequence equals 607, what is its position index n?",
    "options": [
      "120",
      "121",
      "122",
      "123"
    ],
    "correctAnswer": 2,
    "category": "Sequences and Series",
    "explanation": "Set the nth term equation equal to 607: 5n - 3 = 607. Adding 3 to both sides yields 5n = 610. Dividing by 5 gives the position index n = 122."
  },
  {
    "id": "c9-comb-m-q9",
    "subject": "Mathematics",
    "type": "single",
    "title": "Geometric Progression Term",
    "prompt": "Which term of the geometric progression 2, 6, 18, 54, ... is equal to 4374?",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "category": "Sequences and Series",
    "explanation": "The first term is a = 2 and the common ratio is r = 3. The formula for the nth term is arⁿ⁻¹. Setting this to 4374 yields 2 × 3ⁿ⁻¹ = 4374, simplifying to 3ⁿ⁻¹ = 2187. Because 3⁷ = 2187, we get n - 1 = 7, so n = 8."
  },
  {
    "id": "c9-comb-m-q10",
    "subject": "Mathematics",
    "type": "single",
    "title": "Perimeter of Intersecting Circles",
    "prompt": "Two circles, each of radius r, are located such that each circle passes through the center of the other. What is the total perimeter of the shape formed by the outer boundaries of these two intersecting circles?",
    "options": [
      "4/3 πr",
      "2πr",
      "8/3 πr",
      "3πr"
    ],
    "correctAnswer": 2,
    "category": "Geometry",
    "explanation": "The centers of the circles and their intersection points form two equilateral triangles, meaning the intersecting arcs subtend 120° at each center. The outer boundary consists of two major arcs, each subtending 240° (360° - 120°). The length of one major arc is (240/360) × 2πr = (4/3)πr. Therefore, the total perimeter is 2 × (4/3)πr = (8/3)πr."
  },
  {
    "id": "c9-comb-m-q11",
    "subject": "Mathematics",
    "type": "numerical",
    "title": "Perimeter of a Composite Semicircular Shape",
    "prompt": "Find the total perimeter of the given shape. The shape is bounded by one large semicircle spanning the total width of 20 cm, and two smaller semicircles each with a diameter of 10 cm.",
    "imageUrl": "https://drive.google.com/thumbnail?id=1K5HAX_6YRP5M6u8mPZY_ym11msYeUeH3&sz=w1200",
    "imageCaption": "Figure: Diagram of a Composite Semicircular Shape",
    "correctAnswer": 62.83,
    "tolerance": 0.5,
    "unit": "cm",
    "placeholder": "e.g. 00.00",
    "category": "Geometry",
    "explanation": "The perimeter of the shape consists of three semicircular arcs. The large upper semicircle has a diameter of 20 cm (10 cm + 10 cm), so its arc length is (1/2) × π × 20 = 10π cm. The two smaller semicircles each have a diameter of 10 cm, so their combined arc length is 2 × ((1/2) × π × 10) = 10π cm. The total perimeter is 10π + 10π = 20π cm. Using π ≈ 3.14159, the perimeter is approximately 62.83 cm."
  },
  {
    "id": "c9-comb-m-q12",
    "subject": "Mathematics",
    "type": "numerical",
    "title": "Extrapolating AP and GP from a Graph",
    "prompt": "The provided graph shows a sequence of points plotted on a Cartesian plane. The x-coordinates form an Arithmetic Progression (AP) and the y-coordinates form a Geometric Progression (GP). Based on the pattern of the plotted points (2, 5), (5, 10), (8, 20), and (11, 40), what will be the exact y-coordinate of the point when its x-coordinate reaches 20?",
    "imageUrl": "https://drive.google.com/thumbnail?id=1DvT4-X7KqO59sdH5LMqfyUO8Z8fJHqr9&sz=w1200",
    "imageCaption": "Figure: Graph of AP and GP Sequences",
    "correctAnswer": 320,
    "tolerance": 0.1,
    "unit": "",
    "placeholder": "e.g. 000",
    "category": "Sequences and Series",
    "explanation": "From the graph, the x-coordinates are 2, 5, 8, 11 (an AP with a=2, d=3). The y-coordinates are 5, 10, 20, 40 (a GP with first term 5, r=2). To find the position term where x=20, set 2 + (n-1)3 = 20. Solving gives n=7. The 7th y-coordinate is calculated as 5 * 2^(7-1) = 5 * 2^6 = 5 * 64 = 320."
  },
  {
    "id": "c9-comb-m-q13",
    "subject": "Mathematics",
    "type": "numerical",
    "title": "Combined Area of AP Circles",
    "prompt": "A sequence of seven concentric circles is drawn such that their radii form an arithmetic progression. The radius of the first circle is 5 cm, and the common difference is 3.5 cm. Calculate the combined total area of the 4ᵗʰ and 7ᵗʰ circles in the sequence.",
    "correctAnswer": 2878.48,
    "tolerance": 3.0,
    "unit": "cm²",
    "placeholder": "e.g. 0000",
    "category": "Geometry and Sequences",
    "explanation": "The radii form an arithmetic progression with first term a = 5 and common difference d = 3.5. The radius of the 4th circle is r₄ = 5 + 3(3.5) = 15.5 cm. The radius of the 7th circle is r₇ = 5 + 6(3.5) = 26 cm. The combined area is π(15.5)² + π(26)² = 240.25π + 676π = 916.25π cm². Approximating π as 3.14159, the area is approximately 2878.48 cm²."
  },
  {
    "id": "c9-comb-m-q14",
    "subject": "Mathematics",
    "type": "numerical",
    "title": "Area of a Triangle in a Recursive Sequence",
    "prompt": "A sequence of right-angled triangles is constructed where the height of every triangle is fixed at 12 cm. The base length of the first triangle is 3 cm. The base length of each subsequent triangle is determined by the recursive rule bₙ = 2bₙ₋₁ - 1. Calculate the area of the 5ᵗʰ triangle in this sequence.",
    "correctAnswer": 198,
    "tolerance": 0.1,
    "unit": "cm²",
    "placeholder": "e.g. 000",
    "category": "Sequences and Series",
    "explanation": "First, find the base of the 5th triangle using the recursive rule: b₁ = 3, b₂ = 2(3) - 1 = 5, b₃ = 2(5) - 1 = 9, b₄ = 2(9) - 1 = 17, and b₅ = 2(17) - 1 = 33 cm. The area of a right-angled triangle is (1/2) × base × height. For the 5th triangle, Area = 0.5 × 33 × 12 = 198 cm²."
  },
  {
    "id": "c9-comb-m-q15",
    "subject": "Mathematics",
    "type": "numerical",
    "title": "Area of Square from Intersecting Circles Perimeter",
    "prompt": "Two circles, each with a radius of 21 cm, pass through each other's centers. Calculate the perimeter of the shape formed by the two circles. Then, find the area of a square that has the exact same perimeter as this shape.",
    "correctAnswer": 1936,
    "tolerance": 2.0,
    "unit": "cm²",
    "placeholder": "e.g. 000",
    "category": "Geometry",
    "explanation": "The outer perimeter of two circles of radius r passing through each other's centers consists of two major arcs, each subtending 240° (or 4π/3 radians). The total perimeter is 2 × (240/360) × 2πr = (8/3)πr. For r = 21 cm, Perimeter = (8/3)π(21) = 56π. Using π ≈ 22/7, the perimeter is 56 × (22/7) = 176 cm. A square with this perimeter has a side length of 176 / 4 = 44 cm. The area of the square is 44² = 1936 cm²."
  }
]
};
