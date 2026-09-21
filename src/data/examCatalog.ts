import { TestMetadata, ExamStandard, ExamSubject } from '../types';

export const EXAM_CATALOG: TestMetadata[] = [
  // ============================================================================
  // CLASS 10 TESTS
  // ============================================================================

  // 1. Class 10 - Physics - Set 1
  {
    id: 'c10-phy-s1',
    standard: 'Class 10',
    subject: 'Physics',
    setNumber: 1,
    title: 'Class 10 Physics — Set 1',
    subtitle: 'Light: Reflection, Refraction & Optical Power',
    description: 'Master ray optics, spherical mirrors, lens formulas, magnification, and human eye refractive defects.',
    syllabus: ['Reflection of Light', 'Spherical Mirrors', 'Refractive Index', 'Lens Formula & Magnification', 'Power of a Lens', 'Myopia & Hypermetropia'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-phy-s1-q1',
        type: 'single',
        title: 'Focal Length & Radius of Curvature',
        prompt: 'A concave shaving mirror has a radius of curvature of 30 cm as shown in the optical geometry diagram. According to standard Cartesian sign conventions, what is the focal length of this mirror?',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Figure: Concave spherical reflector geometry showing Pole (P), Principal Axis, and Radius of Curvature (R = 30 cm)',
        options: ['+15 cm', '-15 cm', '+60 cm', '-30 cm'],
        correctAnswer: 1, // -15 cm
        category: 'Optics',
        explanation: 'For a spherical mirror, f = R/2. By the Cartesian sign convention, the focus of a concave mirror lies in front of the reflecting surface (to the left of the pole), so f = -30/2 = -15 cm.'
      },
      {
        id: 'c10-phy-s1-q2',
        type: 'multiple',
        title: 'Total Internal Reflection & Critical Angle',
        prompt: 'Which of the following conditions MUST be satisfied for Total Internal Reflection (TIR) to take place at an optical interface? (Select ALL that apply)',
        options: [
          'Light must travel from an optically denser medium to an optically rarer medium',
          'Light must travel from an optically rarer medium to an optically denser medium',
          'The angle of incidence in the denser medium must exceed the critical angle',
          'The angle of refraction must be exactly 45 degrees'
        ],
        correctAnswers: [0, 2],
        category: 'Optics',
        explanation: 'TIR occurs only when light propagates from an optically denser medium to a rarer medium, and the angle of incidence in the denser medium is strictly greater than the critical angle for the given pair of media.'
      },
      {
        id: 'c10-phy-s1-q3',
        type: 'numerical',
        title: 'Optical Power of a Lens',
        prompt: 'An optometrist prescribes a corrective convex lens of focal length +40 cm for a hypermetropic eye. Calculate the optical power of this lens in Diopters (D).',
        correctAnswer: 2.50,
        tolerance: 0.1,
        unit: 'Diopters (D)',
        placeholder: 'e.g. 2.5',
        category: 'Optics',
        explanation: 'Power P = 1 / f (in meters). Since f = +40 cm = +0.40 m, P = 1 / 0.40 = +2.50 D.'
      },
      {
        id: 'c10-phy-s1-q4',
        type: 'single',
        title: 'Refraction through a Glass Slab',
        prompt: 'Which diagram accurately illustrates the lateral displacement of a monochromatic light ray passing obliquely through a rectangular glass slab with parallel faces?',
        options: [
          {
            text: 'Emergent ray parallel to incident ray with lateral displacement d',
            imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80',
            caption: 'Ray enters glass with angle i and emerges parallel with lateral shift'
          },
          {
            text: 'Emergent ray deviates at 90 degrees without displacement',
            imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
            caption: 'Ray deviates perpendicularly at interface'
          },
          {
            text: 'Total absorption inside slab with zero emergence',
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
            caption: 'Light undergoes complete attenuation'
          },
          {
            text: 'Emergent ray converges toward normal at 0 degrees',
            imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
            caption: 'Normal convergence without refraction'
          }
        ],
        correctAnswer: 0,
        category: 'Optics',
        explanation: 'When light passes through a rectangular glass slab with parallel refracting surfaces, the angle of emergence equals the angle of incidence (r1 = r2), causing the emergent ray to be parallel to the incident ray but laterally displaced.'
      },
      {
        id: 'c10-phy-s1-q5',
        type: 'multiple',
        title: 'Human Eye & Vision Correction',
        prompt: 'Which statements correctly characterize a myopic (near-sighted) eye? (Select ALL that apply)',
        options: [
          'The individual can see nearby objects clearly but cannot see distant objects distinctly',
          'The image of a distant object is focused in front of the retina rather than on it',
          'The defect is corrected using a suitable cylindrical lens only',
          'The defect is corrected using a concave lens of suitable focal length'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Human Eye',
        explanation: 'In myopia, near objects are clear while distant objects blur because incoming parallel rays converge in front of the retina due to excessive curvature of the eye lens or elongation of the eyeball. A concave (diverging) lens is used for correction.'
      },
      {
        id: 'c10-phy-s1-q6',
        type: 'numerical',
        title: 'Magnification by Spherical Mirror',
        prompt: 'An object of height 4.0 cm is placed at a distance of 20 cm in front of a concave mirror. If a real and inverted image is formed at 40 cm in front of the mirror, calculate the magnitude of the image height in cm.',
        correctAnswer: 8.0,
        tolerance: 0.2,
        unit: 'cm',
        placeholder: 'e.g. 8.0',
        category: 'Optics',
        explanation: 'Magnification m = -v/u = -(-40)/(-20) = -2. Image height h\' = m * h = -2 * 4.0 = -8.0 cm. The magnitude of image height is 8.0 cm.'
      }
    ]
  },

  // 2. Class 10 - Physics - Set 2
  {
    id: 'c10-phy-s2',
    standard: 'Class 10',
    subject: 'Physics',
    setNumber: 2,
    title: 'Class 10 Physics — Set 2',
    subtitle: 'Electricity, Circuits & Magnetic Effects',
    description: 'Solve problems on Ohm’s law, series/parallel combinations, Joule heating, and electromagnetic induction.',
    syllabus: ["Ohm's Law", 'Resistivity & Factors', 'Series & Parallel Circuits', "Joule's Law of Heating", 'Magnetic Field of Solenoid', 'Right Hand Thumb Rule'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-phy-s2-q1',
        type: 'single',
        title: "Ohm's Law & Resistance",
        prompt: "A cylindrical metal wire of uniform cross-section has resistance R. If the wire is uniformly stretched to double its original length without altering its mass or density, what will be its new resistance?",
        options: ['R/2', '2R', '4R', 'R/4'],
        correctAnswer: 2, // 4R
        category: 'Electricity',
        explanation: 'When stretched to twice length (L\' = 2L), its cross-sectional area halves (A\' = A/2) because volume is constant. New resistance R\' = ρ(L\'/A\') = ρ(2L / (A/2)) = 4 * ρ(L/A) = 4R.'
      },
      {
        id: 'c10-phy-s2-q2',
        type: 'multiple',
        title: 'Magnetic Field inside a Solenoid',
        prompt: 'Which of the following modifications will INCREASE the strength of the magnetic field inside a current-carrying solenoid? (Select ALL that apply)',
        options: [
          'Increasing the magnitude of electric current passing through the coil',
          'Increasing the number of turns per unit length of the solenoid',
          'Inserting a soft iron core inside the hollow core of the solenoid',
          'Replacing the copper wire with an insulating plastic thread'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Magnetism',
        explanation: 'Magnetic field B inside a long solenoid is given by B = μ·n·I. Increasing current (I), increasing turns per unit length (n), or introducing a ferromagnetic soft iron core (higher μ) substantially intensifies B.'
      },
      {
        id: 'c10-phy-s2-q3',
        type: 'numerical',
        title: 'Equivalent Resistance in Parallel',
        prompt: 'Two resistors of resistance 6 Ω and 12 Ω are connected in parallel across a constant DC potential difference. Calculate the equivalent resistance of the parallel combination in Ohms (Ω).',
        correctAnswer: 4.0,
        tolerance: 0.1,
        unit: 'Ohms (Ω)',
        placeholder: 'e.g. 4.0',
        category: 'Electricity',
        explanation: 'For two resistors in parallel: 1/Req = 1/R1 + 1/R2 = 1/6 + 1/12 = 3/12 = 1/4. Hence, Req = 4.0 Ω.'
      },
      {
        id: 'c10-phy-s2-q4',
        type: 'single',
        title: 'Joule’s Law of Heating',
        prompt: 'An electric heater draws a current of 5.0 A from a 220 V main power supply. What is the electrical power rating of the heater?',
        options: ['44 W', '550 W', '1100 W', '2200 W'],
        correctAnswer: 2, // 1100 W
        category: 'Electricity',
        explanation: 'Power P = V * I = 220 V * 5.0 A = 1100 Watts (W).'
      },
      {
        id: 'c10-phy-s2-q5',
        type: 'multiple',
        title: 'Safety Devices in Domestic Circuits',
        prompt: 'Which of the following statements about domestic electric circuits and electrical safety are scientifically correct? (Select ALL that apply)',
        options: [
          'An electric fuse is always connected in series with the live wire',
          'Earthing protects users from severe electric shocks in case of metal insulation leakage',
          'All household appliances are connected in series so they share the same current',
          'The standard frequency of AC electric supply in Indian domestic circuits is 50 Hz'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Domestic Electricity',
        explanation: 'Domestic circuits run appliances in parallel (not series) so each receives full 220 V. Fuses must be in series with the live wire, earth wire protects against insulation faults, and AC frequency is 50 Hz.'
      },
      {
        id: 'c10-phy-s2-q6',
        type: 'numerical',
        title: 'Heat Dissipated by a Resistor',
        prompt: 'A current of 2.0 A flows through an electric resistor of 15 Ω for a duration of 10 seconds. Calculate the total heat energy dissipated in Joules (J).',
        correctAnswer: 600.0,
        tolerance: 5.0,
        unit: 'Joules (J)',
        placeholder: 'e.g. 600',
        category: 'Electricity',
        explanation: "By Joule's Heating Law, H = I² * R * t = (2.0)² * 15 * 10 = 4 * 15 * 10 = 600 Joules."
      }
    ]
  },

  // 3. Class 10 - Chemistry - Set 1
  {
    id: 'c10-chem-s1',
    standard: 'Class 10',
    subject: 'Chemistry',
    setNumber: 1,
    title: 'Class 10 Chemistry — Set 1',
    subtitle: 'Chemical Reactions, Acids, Bases & Salts',
    description: 'Test your understanding of balancing equations, redox mechanisms, indicators, and salt preparations.',
    syllabus: ['Types of Chemical Reactions', 'Oxidation & Reduction', 'pH Scale & Indicators', 'Chlor-Alkali Process', 'Baking & Washing Soda', 'Plaster of Paris'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-chem-s1-q1',
        type: 'single',
        title: 'Redox Identification',
        prompt: 'In the chemical reaction: CuO + H₂ → Cu + H₂O, which substance acts as the REDUCING AGENT?',
        options: ['CuO', 'H₂', 'Cu', 'H₂O'],
        correctAnswer: 1, // H2
        category: 'Chemical Reactions',
        explanation: 'H₂ gains oxygen to form H₂O (gets oxidized); thus H₂ is the reducing agent that reduces copper(II) oxide to copper.'
      },
      {
        id: 'c10-chem-s1-q2',
        type: 'multiple',
        title: 'Chlor-Alkali Electrolysis Products',
        prompt: 'During the electrolysis of concentrated aqueous sodium chloride solution (brine), which products are formed at the electrodes and solution? (Select ALL that apply)',
        options: [
          'Chlorine gas (Cl₂) is released at the anode',
          'Hydrogen gas (H₂) is released at the cathode',
          'Sodium hydroxide (NaOH) solution is formed near the cathode',
          'Oxygen gas (O₂) is released at the cathode'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Acids, Bases & Salts',
        explanation: 'In the chlor-alkali process, Cl₂ gas is produced at the anode (+), H₂ gas at the cathode (-), and a caustic soda (NaOH) solution forms near the cathode.'
      },
      {
        id: 'c10-chem-s1-q3',
        type: 'numerical',
        title: 'Water of Crystallization in Washing Soda',
        prompt: 'Washing soda has the chemical formula Na₂CO₃·xH₂O. What is the integer value of x (number of water of crystallization molecules)?',
        correctAnswer: 10,
        tolerance: 0,
        unit: 'molecules',
        placeholder: 'e.g. 10',
        category: 'Salts',
        explanation: 'Washing soda is sodium carbonate decahydrate, Na₂CO₃·10H₂O. Hence, x = 10.'
      },
      {
        id: 'c10-chem-s1-q4',
        type: 'single',
        title: 'pH Value & Acidity',
        prompt: 'Four aqueous solutions A, B, C, and D have pH values of 2.0, 7.0, 9.0, and 12.0 respectively. Which solution contains the highest concentration of hydrogen ions [H⁺]?',
        options: ['Solution A (pH = 2.0)', 'Solution B (pH = 7.0)', 'Solution C (pH = 9.0)', 'Solution D (pH = 12.0)'],
        correctAnswer: 0, // Solution A
        category: 'Acids and Bases',
        explanation: 'pH is inversely proportional to hydrogen ion concentration: lower pH represents higher [H⁺]. Solution A with pH = 2.0 has [H⁺] = 10⁻² mol/L, the highest.'
      },
      {
        id: 'c10-chem-s1-q5',
        type: 'multiple',
        title: 'Plaster of Paris & Gypsum',
        prompt: 'Which of the following facts regarding Plaster of Paris (POP) and Gypsum are accurate? (Select ALL that apply)',
        options: [
          'Plaster of Paris is chemically Calcium Sulphate Hemihydrate (CaSO₄·½H₂O)',
          'Heating gypsum at 373 K yields Plaster of Paris',
          'When mixed with water, Plaster of Paris sets into a hard solid mass by converting back to gypsum',
          'Plaster of Paris is formed by dehydrating baking soda at 100°C'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Salts',
        explanation: 'Plaster of Paris is CaSO₄·½H₂O produced by heating gypsum (CaSO₄·2H₂O) to 373 K. Re-hydration converts it back into gypsum.'
      },
      {
        id: 'c10-chem-s1-q6',
        type: 'numerical',
        title: 'Neutralization of Calcium Carbonate',
        prompt: 'How many moles of hydrochloric acid (HCl) are stoichiometrically required to completely react with 1.0 mole of calcium carbonate (CaCO₃)?',
        correctAnswer: 2.0,
        tolerance: 0,
        unit: 'moles',
        placeholder: 'e.g. 2',
        category: 'Stoichiometry',
        explanation: 'Balanced equation: CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O. Thus, exactly 2 moles of HCl react with 1 mole of CaCO₃.'
      }
    ]
  },

  // 4. Class 10 - Chemistry - Set 2
  {
    id: 'c10-chem-s2',
    standard: 'Class 10',
    subject: 'Chemistry',
    setNumber: 2,
    title: 'Class 10 Chemistry — Set 2',
    subtitle: 'Metals, Non-Metals & Carbon Compounds',
    description: 'Deep dive into metallurgy, reactivity series, allotropes of carbon, functional groups, and saponification.',
    syllabus: ['Reactivity Series', 'Ionic vs Covalent Bonds', 'Allotropes of Carbon', 'Homologous Series', 'Ethanol & Ethanoic Acid', 'Soaps & Detergents'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-chem-s2-q1',
        type: 'single',
        title: 'Metal Displacement Reaction',
        prompt: 'An iron nail is dipped in a blue copper sulphate (CuSO₄) solution. After 30 minutes, what observable change occurs?',
        options: [
          'Solution turns light green and a reddish-brown deposit of copper forms on the nail',
          'Solution turns dark blue and no deposit forms',
          'Solution turns completely colorless with evolution of chlorine gas',
          'No reaction occurs because copper is more reactive than iron'
        ],
        correctAnswer: 0,
        category: 'Metals & Non-metals',
        explanation: 'Iron is more reactive than copper. It displaces copper from CuSO₄ forming pale green ferrous sulphate (FeSO₄) and reddish-brown copper deposits on the iron nail: Fe + CuSO₄ → FeSO₄ + Cu.'
      },
      {
        id: 'c10-chem-s2-q2',
        type: 'multiple',
        title: 'Oxygen-Containing Organic Functional Groups',
        prompt: 'Which of the following organic functional groups contain at least one oxygen atom? (Select ALL that apply)',
        options: [
          'Carboxylic Acid (-COOH)',
          'Aldehyde (-CHO)',
          'Alkene (-C=C-)',
          'Ketone (>C=O)'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Carbon Compounds',
        explanation: 'Carboxylic acids (-COOH), aldehydes (-CHO), and ketones (>C=O) all contain oxygen. Alkenes consist exclusively of carbon and hydrogen.'
      },
      {
        id: 'c10-chem-s2-q3',
        type: 'numerical',
        title: 'Covalent Bonds in Pentane',
        prompt: 'Calculate the total number of single covalent bonds present in one molecule of saturated hydrocarbon pentane (C₅H₁₂).',
        correctAnswer: 16,
        tolerance: 0,
        unit: 'covalent bonds',
        placeholder: 'e.g. 16',
        category: 'Carbon Compounds',
        explanation: 'In pentane (CH₃-CH₂-CH₂-CH₂-CH₃), there are 4 C-C single bonds and 12 C-H single bonds. Total single covalent bonds = 4 + 12 = 16.'
      },
      {
        id: 'c10-chem-s2-q4',
        type: 'single',
        title: 'Amphoteric Oxides',
        prompt: 'Which of the following metallic oxides is AMPHOTERIC (reacts with both acids and bases to yield salt and water)?',
        options: ['Na₂O', 'CaO', 'Al₂O₃', 'K₂O'],
        correctAnswer: 2, // Al2O3
        category: 'Metals & Non-metals',
        explanation: 'Aluminium oxide (Al₂O₃) and zinc oxide (ZnO) are classic amphoteric oxides that react with both mineral acids (like HCl) and strong bases (like NaOH).'
      },
      {
        id: 'c10-chem-s2-q5',
        type: 'multiple',
        title: 'Characteristics of Ionic Compounds',
        prompt: 'Which of the following are characteristic physical and chemical properties of ionic compounds? (Select ALL that apply)',
        options: [
          'High melting and boiling points due to strong electrostatic forces of attraction',
          'Conduct electricity in aqueous solutions and in molten state',
          'Readily conduct electricity in the solid crystalline state',
          'Generally brittle and break into pieces when pressure is applied'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Chemical Bonding',
        explanation: 'Ionic solids cannot conduct electricity because ions are locked in rigid lattice positions. They conduct only when molten or dissolved in water where ions become mobile.'
      },
      {
        id: 'c10-chem-s2-q6',
        type: 'numerical',
        title: 'Homologous Series Molecular Mass Difference',
        prompt: 'In any homologous series of organic compounds, by how many atomic mass units (u) do two successive neighbouring members differ in molecular mass?',
        correctAnswer: 14,
        tolerance: 0,
        unit: 'u (atomic mass units)',
        placeholder: 'e.g. 14',
        category: 'Carbon Compounds',
        explanation: 'Successive homologous members differ by one -CH₂- unit. Carbon has mass 12 u and two Hydrogens have mass 2 u; 12 + 2 = 14 u.'
      }
    ]
  },

  // 5. Class 10 - Mathematics - Set 1
  {
    id: 'c10-math-s1',
    standard: 'Class 10',
    subject: 'Mathematics',
    setNumber: 1,
    title: 'Class 10 Mathematics — Set 1',
    subtitle: 'Quadratic Equations & Arithmetic Progressions',
    description: 'Evaluate roots, discriminant criteria, nature of roots, nth term of AP, and summation formulas.',
    syllabus: ['Discriminant (D = b² - 4ac)', 'Nature of Quadratic Roots', 'AP General Term aₙ', 'Sum of First n Terms Sₙ', 'Real Numbers & Fundamental Theorem of Arithmetic'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-math-s1-q1',
        type: 'single',
        title: 'Nature of Quadratic Roots',
        prompt: 'For the quadratic equation 2x² - 4x + 3 = 0, what is the nature of its roots?',
        options: [
          'Two distinct real roots',
          'Two equal real roots',
          'No real roots (imaginary / complex roots)',
          'One real root and one zero root'
        ],
        correctAnswer: 2, // No real roots
        category: 'Quadratic Equations',
        explanation: 'Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8 < 0. Since D < 0, the equation has no real roots.'
      },
      {
        id: 'c10-math-s1-q2',
        type: 'multiple',
        title: 'Arithmetic Progression Fundamentals',
        prompt: 'Consider an Arithmetic Progression with first term a = 5 and common difference d = 3. Which of the following numbers are terms of this AP? (Select ALL that apply)',
        options: ['14', '20', '26', '35'],
        correctAnswers: [0, 1, 2, 3],
        category: 'Arithmetic Progressions',
        explanation: 'General term aₙ = 5 + (n-1)*3 = 3n + 2. Testing values: for 14, 3n=12 => n=4; for 20, 3n=18 => n=6; for 26, 3n=24 => n=8; for 35, 3n=33 => n=11. All give integer values for n ≥ 1.'
      },
      {
        id: 'c10-math-s1-q3',
        type: 'numerical',
        title: '15th Term of an Arithmetic Progression',
        prompt: 'Find the 15th term (a₁₅) of the Arithmetic Progression: 3, 7, 11, 15, 19, ...',
        correctAnswer: 59,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 59',
        category: 'Arithmetic Progressions',
        explanation: 'First term a = 3, common difference d = 7 - 3 = 4. a₁₅ = a + (15 - 1)d = 3 + 14 * 4 = 3 + 56 = 59.'
      },
      {
        id: 'c10-math-s1-q4',
        type: 'single',
        title: 'HCF and LCM Relation',
        prompt: 'The HCF of two positive integers is 12 and their product is 2160. What is their LCM?',
        options: ['120', '180', '240', '360'],
        correctAnswer: 1, // 180
        category: 'Real Numbers',
        explanation: 'Product of two numbers = HCF × LCM. Hence, LCM = 2160 / 12 = 180.'
      },
      {
        id: 'c10-math-s1-q5',
        type: 'multiple',
        title: 'Quadratic Equation Properties',
        prompt: 'For a standard quadratic equation ax² + bx + c = 0 (a ≠ 0) with roots α and β, which relations are ALWAYS true? (Select ALL that apply)',
        options: [
          'α + β = -b / a',
          'α · β = c / a',
          'The roots are real and equal if and only if b² - 4ac = 0',
          'α + β = b / a'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Algebra',
        explanation: 'By Vieta’s formulas, sum of roots α + β = -b/a and product α·β = c/a. Equal real roots occur precisely when the discriminant D = b² - 4ac = 0.'
      },
      {
        id: 'c10-math-s1-q6',
        type: 'numerical',
        title: 'Sum of First 20 Natural Numbers',
        prompt: 'Calculate the sum of the first 20 positive integers (1 + 2 + 3 + ... + 20).',
        correctAnswer: 210,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 210',
        category: 'Arithmetic Progressions',
        explanation: 'Sₙ = n(n + 1) / 2 = 20 * 21 / 2 = 10 * 21 = 210.'
      }
    ]
  },

  // 6. Class 10 - Mathematics - Set 2
  {
    id: 'c10-math-s2',
    standard: 'Class 10',
    subject: 'Mathematics',
    setNumber: 2,
    title: 'Class 10 Mathematics — Set 2',
    subtitle: 'Trigonometry & Coordinate Geometry',
    description: 'Solve problems using trigonometric identities, heights & distances, distance formula, and section formula.',
    syllabus: ['Trigonometric Ratios (0° - 90°)', 'Trigonometric Identities', 'Heights and Distances', 'Distance Formula', 'Section Formula & Centroid'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-math-s2-q1',
        type: 'single',
        title: 'Trigonometric Identity Evaluation',
        prompt: 'What is the simplified numerical value of: 9 sec²A - 9 tan²A?',
        options: ['1', '9', '0', '-9'],
        correctAnswer: 1, // 9
        category: 'Trigonometry',
        explanation: 'Using the fundamental trigonometric identity sec²A - tan²A = 1: 9(sec²A - tan²A) = 9(1) = 9.'
      },
      {
        id: 'c10-math-s2-q2',
        type: 'multiple',
        title: 'Trigonometric Values at Specific Angles',
        prompt: 'Which of the following trigonometric statements are true? (Select ALL that apply)',
        options: [
          'sin 30° = 1/2',
          'cos 60° = 1/2',
          'tan 45° = 1',
          'sin 90° = 0'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Trigonometry',
        explanation: 'sin 30° = 1/2, cos 60° = 1/2, and tan 45° = 1. However, sin 90° = 1 (not 0).'
      },
      {
        id: 'c10-math-s2-q3',
        type: 'numerical',
        title: 'Distance Formula in 2D Plane',
        prompt: 'Find the straight-line Euclidean distance between Point P(2, 3) and Point Q(10, 9) in coordinate units.',
        correctAnswer: 10,
        tolerance: 0,
        unit: 'units',
        placeholder: 'e.g. 10',
        category: 'Coordinate Geometry',
        explanation: 'Distance d = √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(10 - 2)² + (9 - 3)²] = √[8² + 6²] = √[64 + 36] = √100 = 10 units.'
      },
      {
        id: 'c10-math-s2-q4',
        type: 'single',
        title: 'Height of a Tower',
        prompt: 'A vertical tower casts a shadow on level ground. When the angle of elevation of the sun is 45°, the length of the shadow is 25 meters. What is the height of the tower?',
        options: ['12.5 m', '25 m', '25√3 m', '50 m'],
        correctAnswer: 1, // 25 m
        category: 'Heights & Distances',
        explanation: 'tan(45°) = Height / Shadow Length => 1 = Height / 25 => Height = 25 meters.'
      },
      {
        id: 'c10-math-s2-q5',
        type: 'multiple',
        title: 'Coordinates of Midpoint and Centroid',
        prompt: 'Given line segment AB with endpoints A(-4, 6) and B(8, 2), which of the following statements are correct? (Select ALL that apply)',
        options: [
          'The x-coordinate of the midpoint is 2',
          'The y-coordinate of the midpoint is 4',
          'The midpoint lies in the second quadrant',
          'The midpoint lies in the first quadrant'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Coordinate Geometry',
        explanation: 'Midpoint M = ((-4 + 8)/2, (6 + 2)/2) = (4/2, 8/2) = (2, 4). Since both x > 0 and y > 0, it lies in the first quadrant.'
      },
      {
        id: 'c10-math-s2-q6',
        type: 'numerical',
        title: 'Trigonometric Ratio Calculation',
        prompt: 'If tan θ = 3/4 for an acute angle θ, calculate the exact decimal value of sin θ.',
        correctAnswer: 0.60,
        tolerance: 0.02,
        unit: '',
        placeholder: 'e.g. 0.6',
        category: 'Trigonometry',
        explanation: 'Opposite = 3, Adjacent = 4. Hypotenuse = √(3² + 4²) = 5. sin θ = Opposite / Hypotenuse = 3/5 = 0.60.'
      }
    ]
  },

  // 7. Class 10 - All in One - Set 1
  {
    id: 'c10-aio-s1',
    standard: 'Class 10',
    subject: 'All in One',
    setNumber: 1,
    title: 'Class 10 All-in-One — Set 1',
    subtitle: 'Integrated Board Mock (Physics + Chemistry + Math)',
    description: 'Comprehensive assessment synthesizing core Class 10 concepts across Physics, Chemistry, and Mathematics.',
    syllabus: ['Optics & Electricity', 'Chemical Reactions & pH', 'Quadratic Equations & Trigonometry'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-aio-s1-q1',
        type: 'single',
        title: 'Physics: Ohm’s Law & Power',
        prompt: 'An electric bulb is rated 220 V and 100 W. When operated on 110 V, what is the actual power consumed?',
        options: ['100 W', '75 W', '50 W', '25 W'],
        correctAnswer: 3, // 25 W
        category: 'Physics',
        explanation: 'Resistance of bulb R = V² / P = (220)² / 100 = 484 Ω. At 110 V, power P\' = (V\')² / R = (110)² / 484 = 12100 / 484 = 25 W.'
      },
      {
        id: 'c10-aio-s1-q2',
        type: 'multiple',
        title: 'Chemistry: Precipitation & Double Displacement',
        prompt: 'When aqueous sodium sulphate (Na₂SO₄) reacts with aqueous barium chloride (BaCl₂), which of the following occur? (Select ALL that apply)',
        options: [
          'A white insoluble precipitate of barium sulphate (BaSO₄) is formed',
          'Sodium chloride (NaCl) remains dissolved in the solution',
          'The reaction is classified as a double displacement reaction',
          'A reddish brown copper precipitate settles at the bottom'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Chemistry',
        explanation: 'Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq). It is a classic double displacement reaction producing a white precipitate of BaSO₄.'
      },
      {
        id: 'c10-aio-s1-q3',
        type: 'numerical',
        title: 'Math: Discriminant Calculation',
        prompt: 'Find the numerical value of the discriminant (D = b² - 4ac) for the quadratic equation: 3x² - 5x + 2 = 0.',
        correctAnswer: 1,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 1',
        category: 'Mathematics',
        explanation: 'a = 3, b = -5, c = 2. D = (-5)² - 4(3)(2) = 25 - 24 = 1.'
      },
      {
        id: 'c10-aio-s1-q4',
        type: 'single',
        title: 'Physics: Mirror Formula',
        prompt: 'Which equation correctly represents the mirror formula relating object distance u, image distance v, and focal length f?',
        options: ['1/v - 1/u = 1/f', '1/v + 1/u = 1/f', 'v + u = f', '1/f + 1/v = 1/u'],
        correctAnswer: 1, // 1/v + 1/u = 1/f
        category: 'Physics',
        explanation: 'The mirror formula for spherical mirrors is 1/v + 1/u = 1/f. (1/v - 1/u = 1/f is the lens formula).'
      },
      {
        id: 'c10-aio-s1-q5',
        type: 'multiple',
        title: 'Chemistry: Neutralization & pH',
        prompt: 'Which of the following substances will produce a basic solution (pH > 7) when dissolved in water? (Select ALL that apply)',
        options: [
          'Sodium carbonate (Na₂CO₃)',
          'Potassium hydroxide (KOH)',
          'Hydrochloric acid (HCl)',
          'Ammonium chloride (NH₄Cl)'
        ],
        correctAnswers: [0, 1],
        category: 'Chemistry',
        explanation: 'KOH is a strong base. Na₂CO₃ is the salt of a weak acid (H₂CO₃) and strong base (NaOH), creating an alkaline solution. HCl is acidic and NH₄Cl is an acidic salt.'
      },
      {
        id: 'c10-aio-s1-q6',
        type: 'numerical',
        title: 'Math: Trigonometric Evaluation',
        prompt: 'Evaluate the exact numerical value of: 2 sin(30°) + 4 cos(60°).',
        correctAnswer: 3.0,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 3',
        category: 'Mathematics',
        explanation: 'sin 30° = 1/2, cos 60° = 1/2. 2*(1/2) + 4*(1/2) = 1 + 2 = 3.'
      }
    ]
  },

  // 8. Class 10 - All in One - Set 2
  {
    id: 'c10-aio-s2',
    standard: 'Class 10',
    subject: 'All in One',
    setNumber: 2,
    title: 'Class 10 All-in-One — Set 2',
    subtitle: 'Integrated Board Mock (Physics + Chemistry + Math)',
    description: 'Second full-spectrum mock examining magnetism, carbon functional chemistry, coordinate geometry, and arithmetic sequences.',
    syllabus: ['Electromagnetism', 'Carbon Compounds', 'Coordinate Geometry & AP'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c10-aio-s2-q1',
        type: 'single',
        title: 'Physics: Fleming’s Left-Hand Rule',
        prompt: 'According to Fleming’s Left-Hand Rule used in electric motors, which finger indicates the direction of the magnetic field?',
        options: ['Thumb', 'Forefinger (Index finger)', 'Middle finger', 'Ring finger'],
        correctAnswer: 1, // Forefinger
        category: 'Physics',
        explanation: 'Forefinger represents Magnetic Field (F-Field), Middle finger represents Current (C-Current), and Thumb represents Force or Motion (T-Thrust).'
      },
      {
        id: 'c10-aio-s2-q2',
        type: 'multiple',
        title: 'Chemistry: Saturated vs Unsaturated Hydrocarbons',
        prompt: 'Which of the following compounds will decolorize bromine water (undergo addition reactions characteristic of unsaturated hydrocarbons)? (Select ALL that apply)',
        options: [
          'Ethene (C₂H₄)',
          'Ethyne (C₂H₂)',
          'Methane (CH₄)',
          'Ethane (C₂H₆)'
        ],
        correctAnswers: [0, 1],
        category: 'Chemistry',
        explanation: 'Ethene (alkene) and ethyne (alkyne) are unsaturated hydrocarbons containing double and triple bonds, readily undergoing addition with bromine water to decolorize it.'
      },
      {
        id: 'c10-aio-s2-q3',
        type: 'numerical',
        title: 'Math: Sum of First 10 Odd Numbers',
        prompt: 'Calculate the sum of the first 10 positive odd integers: 1 + 3 + 5 + ... + 19.',
        correctAnswer: 100,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 100',
        category: 'Mathematics',
        explanation: 'The sum of first n odd natural numbers is n². For n = 10, Sum = 10² = 100.'
      },
      {
        id: 'c10-aio-s2-q4',
        type: 'single',
        title: 'Physics: Commercial Unit of Energy',
        prompt: '1 kilowatt-hour (1 kWh), commonly called one "unit" of electrical energy in domestic billing, equals how many Joules?',
        options: ['3.6 × 10⁵ J', '3.6 × 10⁶ J', '3.6 × 10⁷ J', '1.0 × 10³ J'],
        correctAnswer: 1, // 3.6 * 10^6 J
        category: 'Physics',
        explanation: '1 kWh = 1000 W × 3600 s = 3,600,000 J = 3.6 × 10⁶ Joules.'
      },
      {
        id: 'c10-aio-s2-q5',
        type: 'multiple',
        title: 'Chemistry: Corrosion Prevention',
        prompt: 'Which methods are commonly employed to protect iron articles from rusting? (Select ALL that apply)',
        options: [
          'Galvanization (coating with a thin layer of molten Zinc)',
          'Applying paint, grease, or oil on the metal surface',
          'Alloying iron with chromium and nickel to create stainless steel',
          'Exposing the metal to continuous warm moist air'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Chemistry',
        explanation: 'Galvanization, painting/greasing, and alloying with Cr and Ni prevent oxygen and moisture from reaching iron. Exposing to moist air accelerates rusting.'
      },
      {
        id: 'c10-aio-s2-q6',
        type: 'numerical',
        title: 'Math: Slope / Coordinates',
        prompt: 'If the midpoint between (a, 4) and (-2, 8) is (2, 6), calculate the value of a.',
        correctAnswer: 6,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 6',
        category: 'Mathematics',
        explanation: '(a + (-2)) / 2 = 2 => a - 2 = 4 => a = 6.'
      }
    ]
  },

  // ============================================================================
  // CLASS 9 TESTS
  // ============================================================================

  // 9. Class 9 - Physics - Set 1
  {
    id: 'c9-phy-s1',
    standard: 'Class 9',
    subject: 'Physics',
    setNumber: 1,
    title: 'Class 9 Physics — Set 1',
    subtitle: 'Motion, Force & Newton’s Laws',
    description: 'Solve questions on velocity, acceleration, distance-time graphs, momentum, and Newton’s second law.',
    syllabus: ['Uniform & Non-Uniform Motion', 'Equations of Motion', 'Inertia & Mass', 'Momentum (p = mv)', "Newton's 2nd Law (F = ma)"],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-phy-s1-q1',
        type: 'single',
        title: 'Distance vs Displacement',
        prompt: 'A particle moves along a circular path of radius 7.0 meters. After completing one full revolution, what is the magnitude of its displacement?',
        options: ['44.0 m', '22.0 m', '14.0 m', '0.0 m'],
        correctAnswer: 3, // 0.0 m
        category: 'Motion',
        explanation: 'Displacement is the shortest distance between initial and final positions. When an object completes one full revolution, it returns to its starting point, so displacement is 0.0 m.'
      },
      {
        id: 'c9-phy-s1-q2',
        type: 'multiple',
        title: 'Newton’s First Law of Motion',
        prompt: 'Which of the following phenomena directly demonstrate Newton’s First Law of Motion (Inertia)? (Select ALL that apply)',
        options: [
          'Passengers lurch forward when a moving bus applies sudden brakes',
          'Dust particles fall off a carpet when it is beaten with a stick',
          'A rocket accelerates upwards by ejecting exhaust gases downwards',
          'Leaves detach from tree branches when vigorously shaken'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Force & Laws of Motion',
        explanation: 'Passengers leaning forward, dust shaking off a carpet, and leaves falling off branches are examples of inertia of motion and rest (Newton’s 1st Law). Rocket propulsion illustrates Newton’s 3rd Law.'
      },
      {
        id: 'c9-phy-s1-q3',
        type: 'numerical',
        title: 'Calculation of Acceleration',
        prompt: 'A car starts from rest (u = 0) and accelerates uniformly to acquire a velocity of 20 m/s in 5.0 seconds. What is the magnitude of its acceleration in m/s²?',
        correctAnswer: 4.0,
        tolerance: 0.1,
        unit: 'm/s²',
        placeholder: 'e.g. 4.0',
        category: 'Motion',
        explanation: 'Acceleration a = (v - u) / t = (20 - 0) / 5 = 4.0 m/s².'
      },
      {
        id: 'c9-phy-s1-q4',
        type: 'single',
        title: 'Linear Momentum Formula',
        prompt: 'An object of mass 10 kg moves with a uniform velocity of 3 m/s. What is its linear momentum?',
        options: ['3.33 kg·m/s', '30 kg·m/s', '90 kg·m/s', '300 kg·m/s'],
        correctAnswer: 1, // 30
        category: 'Momentum',
        explanation: 'Momentum p = mass × velocity = 10 kg × 3 m/s = 30 kg·m/s.'
      },
      {
        id: 'c9-phy-s1-q5',
        type: 'multiple',
        title: 'Equations of Uniformly Accelerated Motion',
        prompt: 'Which of the following are valid equations of motion for an object moving with uniform acceleration a? (Select ALL that apply)',
        options: [
          'v = u + at',
          's = ut + ½at²',
          'v² = u² + 2as',
          'v = ut + a'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Kinematics',
        explanation: 'The three fundamental kinematic equations for constant acceleration are: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as.'
      },
      {
        id: 'c9-phy-s1-q6',
        type: 'numerical',
        title: 'Force Calculation (Newton’s 2nd Law)',
        prompt: 'Calculate the net force (in Newtons) required to impart an acceleration of 2.5 m/s² to a cart of mass 40 kg.',
        correctAnswer: 100,
        tolerance: 1.0,
        unit: 'Newtons (N)',
        placeholder: 'e.g. 100',
        category: 'Force',
        explanation: 'By Newton’s 2nd Law, F = m * a = 40 kg * 2.5 m/s² = 100 N.'
      }
    ]
  },

  // 10. Class 9 - Physics - Set 2
  {
    id: 'c9-phy-s2',
    standard: 'Class 9',
    subject: 'Physics',
    setNumber: 2,
    title: 'Class 9 Physics — Set 2',
    subtitle: 'Gravitation, Work, Energy & Sound',
    description: 'Solve questions on universal gravitation, free fall, kinetic vs potential energy, work done, and sound waves.',
    syllabus: ['Universal Law of Gravitation', 'Acceleration due to Gravity (g)', 'Mass vs Weight', 'Work Done (W = F·s)', 'Kinetic & Potential Energy', 'Sound Waves'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-phy-s2-q1',
        type: 'single',
        title: 'Weight on the Moon',
        prompt: 'An astronaut has a mass of 60 kg on Earth. What is their MASS on the surface of the Moon?',
        options: ['10 kg', '60 kg', '360 kg', '0 kg'],
        correctAnswer: 1, // 60 kg
        category: 'Gravitation',
        explanation: 'Mass is the fundamental quantity of matter and remains invariant anywhere in the universe. While the astronaut’s weight reduces to 1/6th on the Moon, their mass remains exactly 60 kg.'
      },
      {
        id: 'c9-phy-s2-q2',
        type: 'multiple',
        title: 'Factors Influencing Gravitational Force',
        prompt: 'According to Newton’s Universal Law of Gravitation, the mutual force F between two point masses m₁ and m₂ separated by distance r is: (Select ALL that apply)',
        options: [
          'Directly proportional to the product of their masses (m₁ · m₂)',
          'Inversely proportional to the square of the distance between them (1/r²)',
          'Dependent on the intervening medium between the two masses',
          'Acting along the line joining the centres of the two masses'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Gravitation',
        explanation: 'F = G(m₁m₂)/r². Gravitational force is independent of the intervening medium, acts along the center-to-center line, is proportional to the mass product, and inversely proportional to r².'
      },
      {
        id: 'c9-phy-s2-q3',
        type: 'numerical',
        title: 'Work Done Calculation',
        prompt: 'A horizontal force of 25 N pulls a box across a smooth level floor through a distance of 4.0 meters in the direction of the force. Calculate the work done in Joules (J).',
        correctAnswer: 100.0,
        tolerance: 1.0,
        unit: 'Joules (J)',
        placeholder: 'e.g. 100',
        category: 'Work & Energy',
        explanation: 'Work W = Force × Displacement × cos(0°) = 25 N × 4.0 m = 100 Joules.'
      },
      {
        id: 'c9-phy-s2-q4',
        type: 'single',
        title: 'Kinetic Energy vs Speed',
        prompt: 'If the speed of a moving body is doubled while its mass remains constant, its kinetic energy becomes:',
        options: ['Half', 'Double', 'Four times', 'Remains unchanged'],
        correctAnswer: 2, // Four times
        category: 'Work & Energy',
        explanation: 'Kinetic Energy KE = ½mv². If velocity v becomes 2v, KE\' = ½m(2v)² = 4 * (½mv²) = 4 * KE. It quadruples.'
      },
      {
        id: 'c9-phy-s2-q5',
        type: 'multiple',
        title: 'Characteristics of Sound Waves',
        prompt: 'Which of the following statements concerning sound waves are physically accurate? (Select ALL that apply)',
        options: [
          'Sound waves are mechanical waves and strictly require a material medium to propagate',
          'Sound waves can travel effortlessly through a complete vacuum',
          'Sound travels faster in solids than in air at normal room temperature',
          'Pitch of sound is directly related to the frequency of vibration'
        ],
        correctAnswers: [0, 2, 3],
        category: 'Sound',
        explanation: 'Sound is a mechanical wave requiring an elastic medium (it cannot travel through vacuum). Sound travels fastest in solids, and pitch depends on frequency.'
      },
      {
        id: 'c9-phy-s2-q6',
        type: 'numerical',
        title: 'Gravitational Potential Energy',
        prompt: 'A brick of mass 2.0 kg is elevated to the roof of a building at a vertical height of 10 meters above ground level. Taking g = 9.8 m/s², compute its potential energy in Joules (J).',
        correctAnswer: 196.0,
        tolerance: 2.0,
        unit: 'Joules (J)',
        placeholder: 'e.g. 196',
        category: 'Work & Energy',
        explanation: 'Gravitational Potential Energy PE = m * g * h = 2.0 kg * 9.8 m/s² * 10 m = 196.0 Joules.'
      }
    ]
  },

  // 11. Class 9 - Chemistry - Set 1
  {
    id: 'c9-chem-s1',
    standard: 'Class 9',
    subject: 'Chemistry',
    setNumber: 1,
    title: 'Class 9 Chemistry — Set 1',
    subtitle: 'Matter in Our Surroundings & Mixtures',
    description: 'Test fundamentals of kinetic theory, states of matter, sublimation, solutions, colloids, and suspensions.',
    syllabus: ['States of Matter', 'Evaporation & Latent Heat', 'Sublimation', 'True Solutions vs Colloids', 'Tyndall Effect', 'Concentration of Solutions'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-chem-s1-q1',
        type: 'single',
        title: 'Sublimation Phenomenon',
        prompt: 'Which of the following substances undergoes SUBLIMATION (changes directly from solid to gaseous state without passing through the liquid state) upon heating?',
        options: ['Sodium Chloride', 'Ammonium Chloride', 'Calcium Carbonate', 'Copper Sulphate'],
        correctAnswer: 1, // Ammonium Chloride
        category: 'Matter',
        explanation: 'Ammonium chloride (NH₄Cl), camphor, naphthalene, and iodine sublime directly from solid to vapor upon heating.'
      },
      {
        id: 'c9-chem-s1-q2',
        type: 'multiple',
        title: 'Properties of Colloidal Solutions',
        prompt: 'Which of the following are distinct characteristics of a colloidal system? (Select ALL that apply)',
        options: [
          'A colloid is a heterogeneous mixture appearing deceptively homogeneous',
          'Particles scatter a beam of light passing through it (Tyndall effect)',
          'Colloidal particles settle down immediately when left undisturbed',
          'Colloidal particles pass through ordinary filter paper'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Mixtures',
        explanation: 'Colloids are stable heterogeneous mixtures whose particles do not settle on standing. They scatter light (Tyndall effect) and pass through standard filter paper because particle diameter is between 1 nm and 1000 nm.'
      },
      {
        id: 'c9-chem-s1-q3',
        type: 'numerical',
        title: 'Mass Concentration of Solution',
        prompt: 'A solution is prepared by dissolving 40 g of common salt in 360 g of water. Calculate the mass percentage concentration of the salt solution (in %).',
        correctAnswer: 10.0,
        tolerance: 0.1,
        unit: '%',
        placeholder: 'e.g. 10.0',
        category: 'Solutions',
        explanation: 'Mass of solute = 40 g. Mass of solution = 40 + 360 = 400 g. Mass % = (40 / 400) * 100 = 10.0%.'
      },
      {
        id: 'c9-chem-s1-q4',
        type: 'single',
        title: 'Evaporation and Cooling Effect',
        prompt: 'Why does water kept in an earthen pot (matka) become cool during hot summer days?',
        options: [
          'Earthen pot material chemically absorbs heat energy from the water',
          'Continuous evaporation of water seeping through porous walls absorbs latent heat',
          'Earthen walls reflect radiant solar heat outward',
          'Convection currents within the water decrease its thermal density'
        ],
        correctAnswer: 1,
        category: 'Matter',
        explanation: 'Water continuously seeps through microscopic pores in the clay pot and evaporates. The heat energy required for evaporation (latent heat of vaporization) is drawn from the remaining water, cooling it down.'
      },
      {
        id: 'c9-chem-s1-q5',
        type: 'multiple',
        title: 'Physical vs Chemical Changes',
        prompt: 'Which of the following processes are classified as PHYSICAL CHANGES? (Select ALL that apply)',
        options: [
          'Melting of ice into liquid water',
          'Dissolving sugar in water',
          'Rusting of an iron bicycle frame',
          'Boiling of water to form water vapor'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Chemical Changes',
        explanation: 'Melting, dissolving, and boiling do not alter the chemical identity of molecules (H₂O and C₁₂H₂₂O₁₁). Rusting forms a new chemical compound (hydrated iron oxide), which is a chemical change.'
      },
      {
        id: 'c9-chem-s1-q6',
        type: 'numerical',
        title: 'Kelvin to Celsius Conversion',
        prompt: 'The boiling point of water is 373 K on the Kelvin thermodynamic scale. What is this temperature in degrees Celsius (°C)?',
        correctAnswer: 100,
        tolerance: 0,
        unit: '°C',
        placeholder: 'e.g. 100',
        category: 'Temperature Scales',
        explanation: 'T(°C) = T(K) - 273.15. 373 - 273 = 100 °C.'
      }
    ]
  },

  // 12. Class 9 - Chemistry - Set 2
  {
    id: 'c9-chem-s2',
    standard: 'Class 9',
    subject: 'Chemistry',
    setNumber: 2,
    title: 'Class 9 Chemistry — Set 2',
    subtitle: 'Atoms, Molecules & Atomic Structure',
    description: 'Master laws of chemical combination, mole concepts, subatomic particles, Rutherford and Bohr models, and valency.',
    syllabus: ['Law of Conservation of Mass', 'Law of Constant Proportions', 'Molecular Mass Calculation', 'Bohr Model of Atom', 'Valency of Elements', 'Isotopes & Isobars'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-chem-s2-q1',
        type: 'single',
        title: 'Subatomic Particle Discovery',
        prompt: 'Which British physicist discovered the Neutron in 1932 by bombarding light beryllium elements with alpha particles?',
        options: ['J.J. Thomson', 'Ernest Rutherford', 'James Chadwick', 'Niels Bohr'],
        correctAnswer: 2, // James Chadwick
        category: 'Structure of Atom',
        explanation: 'James Chadwick discovered the neutral subatomic particle, the neutron, in 1932, for which he was awarded the Nobel Prize in Physics.'
      },
      {
        id: 'c9-chem-s2-q2',
        type: 'multiple',
        title: 'Isotopes & Isobars',
        prompt: 'Which statements correctly distinguish isotopes from isobars? (Select ALL that apply)',
        options: [
          'Isotopes of an element possess identical atomic numbers (Z) but different mass numbers (A)',
          'Isobars possess identical mass numbers (A) but different atomic numbers (Z)',
          'Isotopes exhibit nearly identical chemical properties because they have the same electron configuration',
          'Isobars always belong to the exact same chemical element'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Atomic Structure',
        explanation: 'Isotopes have the same atomic number Z and same chemical properties. Isobars have the same mass number A but different atomic numbers Z, meaning they belong to completely different chemical elements (e.g., ⁴⁰Ar and ⁴⁰Ca).'
      },
      {
        id: 'c9-chem-s2-q3',
        type: 'numerical',
        title: 'Molecular Mass of Calcium Carbonate',
        prompt: 'Calculate the molecular mass of Calcium Carbonate (CaCO₃) in atomic mass units (u). (Atomic masses: Ca = 40, C = 12, O = 16)',
        correctAnswer: 100,
        tolerance: 0,
        unit: 'u',
        placeholder: 'e.g. 100',
        category: 'Molecules',
        explanation: 'Molecular mass = 40(Ca) + 12(C) + 3*16(O) = 40 + 12 + 48 = 100 u.'
      },
      {
        id: 'c9-chem-s2-q4',
        type: 'single',
        title: 'Law of Constant Proportions',
        prompt: 'In pure water (H₂O), what is the fixed ratio by mass of Hydrogen to Oxygen according to the Law of Constant Proportions?',
        options: ['1 : 2', '1 : 8', '2 : 1', '1 : 16'],
        correctAnswer: 1, // 1 : 8
        category: 'Chemical Laws',
        explanation: 'H₂O contains 2 atoms of H (mass = 2) and 1 atom of O (mass = 16). Ratio by mass = 2 : 16 = 1 : 8.'
      },
      {
        id: 'c9-chem-s2-q5',
        type: 'multiple',
        title: 'Bohr’s Model of the Atom',
        prompt: 'Which postulates form the bedrock of Niels Bohr’s atomic model? (Select ALL that apply)',
        options: [
          'Electrons revolve only in discrete, non-radiating circular orbits called energy levels or shells',
          'While revolving in discrete orbits, electrons do not radiate energy',
          'Electrons radiate energy continuously while orbiting, quickly spiraling into the nucleus',
          'The energy levels are represented by letters K, L, M, N... or numbers n = 1, 2, 3, 4...'
        ],
        correctAnswers: [0, 1, 3],
        category: 'Atomic Models',
        explanation: 'Bohr resolved Rutherford’s instability flaw by asserting that electrons inhabit stable, discrete, non-radiating stationary orbits (K, L, M, N shells) where energy radiation only occurs during inter-orbit transitions.'
      },
      {
        id: 'c9-chem-s2-q6',
        type: 'numerical',
        title: 'Maximum Electrons in M-Shell',
        prompt: 'According to the 2n² Bohr-Bury rule, what is the maximum number of electrons that can be accommodated in the M-shell (where principal quantum number n = 3)?',
        correctAnswer: 18,
        tolerance: 0,
        unit: 'electrons',
        placeholder: 'e.g. 18',
        category: 'Electron Configuration',
        explanation: 'Maximum capacity = 2n². For M-shell, n = 3, so capacity = 2 * (3)² = 2 * 9 = 18 electrons.'
      }
    ]
  },

  // 13. Class 9 - Mathematics - Set 1
  {
    id: 'c9-math-s1',
    standard: 'Class 9',
    subject: 'Mathematics',
    setNumber: 1,
    title: 'Class 9 Mathematics — Set 1',
    subtitle: 'Number Systems & Polynomials',
    description: 'Explore irrational numbers, laws of exponents, rationalization, polynomial zeros, and factor theorem.',
    syllabus: ['Real Numbers & Irrationals', 'Rationalizing Denominators', 'Laws of Exponents', 'Degree of Polynomials', 'Remainder & Factor Theorem', 'Algebraic Identities'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-math-s1-q1',
        type: 'single',
        title: 'Irrational Numbers',
        prompt: 'Which of the following numbers is an IRRATIONAL NUMBER?',
        options: ['√16', '0.3333... (0.3̄)', '√7', '22/7'],
        correctAnswer: 2, // √7
        category: 'Number Systems',
        explanation: '√16 = 4 is an integer. 0.3̄ and 22/7 are rational numbers (p/q form with repeating decimals). √7 is non-terminating and non-repeating, hence irrational.'
      },
      {
        id: 'c9-math-s1-q2',
        type: 'multiple',
        title: 'Degree of Polynomials',
        prompt: 'Which of the following algebraic expressions are POLYNOMIALS in one variable x? (Select ALL that apply)',
        options: [
          '3x² + 5x - 7',
          '4x³ - 2x + 1',
          'x + 1/x',
          '√x + 5'
        ],
        correctAnswers: [0, 1],
        category: 'Polynomials',
        explanation: 'In a polynomial, the exponent of the variable must be a non-negative whole integer. 1/x = x⁻¹ and √x = x^(1/2) have non-whole exponents, disqualifying them.'
      },
      {
        id: 'c9-math-s1-q3',
        type: 'numerical',
        title: 'Value of Polynomial at a Point',
        prompt: 'Find the numerical value of the polynomial p(x) = 2x³ - 3x² + 4x - 5 at x = 2.',
        correctAnswer: 7,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 7',
        category: 'Polynomials',
        explanation: 'p(2) = 2(2)³ - 3(2)² + 4(2) - 5 = 2(8) - 3(4) + 8 - 5 = 16 - 12 + 8 - 5 = 7.'
      },
      {
        id: 'c9-math-s1-q4',
        type: 'single',
        title: 'Laws of Exponents',
        prompt: 'What is the simplified numerical value of (64)^(1/3)?',
        options: ['2', '4', '8', '16'],
        correctAnswer: 1, // 4
        category: 'Number Systems',
        explanation: '64 = 4³. Therefore, (64)^(1/3) = (4³)^(1/3) = 4.'
      },
      {
        id: 'c9-math-s1-q5',
        type: 'multiple',
        title: 'Algebraic Identities',
        prompt: 'Which algebraic identity expansions are mathematically TRUE? (Select ALL that apply)',
        options: [
          '(x + y)³ = x³ + y³ + 3xy(x + y)',
          'x² - y² = (x - y)(x + y)',
          'x³ + y³ = (x + y)(x² - xy + y²)',
          '(x - y)² = x² - y²'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Algebra',
        explanation: '(x + y)³, x² - y², and x³ + y³ are classic verified algebraic identities. (x - y)² = x² - 2xy + y², not x² - y².'
      },
      {
        id: 'c9-math-s1-q6',
        type: 'numerical',
        title: 'Zero of Linear Polynomial',
        prompt: 'Find the zero of the linear polynomial p(x) = 4x - 12 (i.e. the value of x such that p(x) = 0).',
        correctAnswer: 3,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 3',
        category: 'Polynomials',
        explanation: 'Set 4x - 12 = 0 => 4x = 12 => x = 3.'
      }
    ]
  },

  // 14. Class 9 - Mathematics - Set 2
  {
    id: 'c9-math-s2',
    standard: 'Class 9',
    subject: 'Mathematics',
    setNumber: 2,
    title: 'Class 9 Mathematics — Set 2',
    subtitle: 'Coordinate Geometry, Lines, Angles & Triangles',
    description: 'Solve problems involving Cartesian planes, parallel lines, angle sum property, congruence criteria, and Heron’s formula.',
    syllabus: ['Cartesian Plane & Quadrants', 'Linear Equations in Two Variables', 'Lines & Transversals', 'Angle Sum Property', 'Triangle Congruence', "Heron's Formula"],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-math-s2-q1',
        type: 'single',
        title: 'Cartesian Quadrants',
        prompt: 'In which quadrant of the Cartesian coordinate plane does the point (-5, 3) lie?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correctAnswer: 1, // Quadrant II
        category: 'Coordinate Geometry',
        explanation: 'For (-5, 3), x < 0 (negative) and y > 0 (positive), which places the point in Quadrant II.'
      },
      {
        id: 'c9-math-s2-q2',
        type: 'multiple',
        title: 'Triangle Congruence Criteria',
        prompt: 'Which of the following are valid congruence criteria for pairs of triangles in Euclidean geometry? (Select ALL that apply)',
        options: [
          'SAS (Side-Angle-Side)',
          'ASA (Angle-Side-Angle)',
          'SSS (Side-Side-Side)',
          'AAA (Angle-Angle-Angle)'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Triangles',
        explanation: 'SAS, ASA, SSS, and RHS establish full congruence. AAA establishes similarity of triangles, but does not guarantee congruence.'
      },
      {
        id: 'c9-math-s2-q3',
        type: 'numerical',
        title: 'Area of Triangle via Heron’s Formula',
        prompt: 'Find the area (in cm²) of a triangle whose three side lengths are 3 cm, 4 cm, and 5 cm.',
        correctAnswer: 6.0,
        tolerance: 0.1,
        unit: 'cm²',
        placeholder: 'e.g. 6.0',
        category: "Heron's Formula",
        explanation: 'Semi-perimeter s = (3 + 4 + 5)/2 = 6 cm. Area = √[s(s-a)(s-b)(s-c)] = √[6(3)(2)(1)] = √36 = 6 cm².'
      },
      {
        id: 'c9-math-s2-q4',
        type: 'single',
        title: 'Linear Equation in Two Variables',
        prompt: 'How many distinct solutions does a linear equation in two variables, such as 2x + 3y = 12, possess in the real number system?',
        options: ['A unique solution', 'Only two solutions', 'Infinitely many solutions', 'Zero solutions'],
        correctAnswer: 2, // Infinitely many solutions
        category: 'Linear Equations',
        explanation: 'A linear equation in two variables represents a continuous line in the Cartesian coordinate plane, which consists of infinitely many points (x, y).'
      },
      {
        id: 'c9-math-s2-q5',
        type: 'multiple',
        title: 'Parallel Lines Cut by a Transversal',
        prompt: 'When two parallel straight lines are intersected by a transversal line, which pairs of angles are equal? (Select ALL that apply)',
        options: [
          'Pairs of alternate interior angles',
          'Pairs of corresponding angles',
          'Pairs of vertically opposite angles',
          'Pairs of interior angles on the same side of the transversal'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Lines & Angles',
        explanation: 'Alternate interior angles, corresponding angles, and vertically opposite angles are equal. Interior angles on the same side of the transversal are supplementary (sum to 180°), not equal.'
      },
      {
        id: 'c9-math-s2-q6',
        type: 'numerical',
        title: 'Angle Sum Property of a Triangle',
        prompt: 'In a triangle ABC, angle A = 55° and angle B = 65°. Calculate the measure of angle C in degrees.',
        correctAnswer: 60,
        tolerance: 0,
        unit: 'degrees (°)',
        placeholder: 'e.g. 60',
        category: 'Triangles',
        explanation: 'The sum of the three interior angles of a triangle is 180°. Angle C = 180° - (55° + 65°) = 180° - 120° = 60°.'
      }
    ]
  },

  // 15. Class 9 - All in One - Set 1
  {
    id: 'c9-aio-s1',
    standard: 'Class 9',
    subject: 'All in One',
    setNumber: 1,
    title: 'Class 9 All-in-One — Set 1',
    subtitle: 'Foundation STEM Mock (Physics + Chemistry + Math)',
    description: 'Comprehensive test spanning foundational mechanics, laws of chemical combination, and coordinate geometry.',
    syllabus: ['Laws of Motion', 'Evaporation & Mixtures', 'Polynomials & Number Systems'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-aio-s1-q1',
        type: 'single',
        title: 'Physics: Newton’s Third Law',
        prompt: 'When a gun is fired, it recoils backward. Which principle or law explains this backward recoil velocity of the gun?',
        options: [
          'Newton’s Third Law of Motion & Conservation of Momentum',
          'Newton’s First Law of Motion only',
          'Law of Universal Gravitation',
          'Archimedes Principle'
        ],
        correctAnswer: 0,
        category: 'Physics',
        explanation: 'For every action, there is an equal and opposite reaction (Newton’s 3rd Law). The forward momentum acquired by the bullet equals the backward recoil momentum of the gun.'
      },
      {
        id: 'c9-aio-s1-q2',
        type: 'multiple',
        title: 'Chemistry: Factors Accelerating Evaporation',
        prompt: 'Which of the following environmental factors increase the rate of evaporation of a liquid? (Select ALL that apply)',
        options: [
          'An increase of exposed surface area',
          'An increase in ambient temperature',
          'An increase in wind speed',
          'An increase in ambient humidity'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Chemistry',
        explanation: 'Higher surface area, temperature, and wind speed increase the rate of evaporation. Higher humidity decreases evaporation rate because air is already saturated with moisture.'
      },
      {
        id: 'c9-aio-s1-q3',
        type: 'numerical',
        title: 'Math: Degree of Polynomial',
        prompt: 'What is the degree of the polynomial: P(x) = 7x⁴ - 3x² + 8x - 11?',
        correctAnswer: 4,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 4',
        category: 'Mathematics',
        explanation: 'The degree of a polynomial is the highest power of the variable x, which is 4 in 7x⁴.'
      },
      {
        id: 'c9-aio-s1-q4',
        type: 'single',
        title: 'Physics: Free Fall Acceleration',
        prompt: 'During free fall near the surface of the Earth, the acceleration experienced by an object is independent of:',
        options: ['Mass of the object', 'Gravitational constant G', 'Mass of the Earth', 'Radius of the Earth'],
        correctAnswer: 0, // Mass of the object
        category: 'Physics',
        explanation: 'Acceleration due to gravity g = G·M_earth / R_earth². It does not depend on the mass of the falling object.'
      },
      {
        id: 'c9-aio-s1-q5',
        type: 'multiple',
        title: 'Chemistry: True Solutions vs Suspensions',
        prompt: 'Which of the following are true solutions (homogeneous mixtures)? (Select ALL that apply)',
        options: [
          'Salt dissolved in pure water',
          'Sugar syrup dissolved in water',
          'Chalk powder stirred in water',
          'Muddy river water'
        ],
        correctAnswers: [0, 1],
        category: 'Chemistry',
        explanation: 'Salt water and sugar water are homogeneous true solutions. Chalk powder in water and muddy water are heterogeneous suspensions.'
      },
      {
        id: 'c9-aio-s1-q6',
        type: 'numerical',
        title: 'Math: Linear Equation Solution',
        prompt: 'In the equation 3x + 2y = 18, if y = 3, what is the value of x?',
        correctAnswer: 4,
        tolerance: 0,
        unit: '',
        placeholder: 'e.g. 4',
        category: 'Mathematics',
        explanation: '3x + 2(3) = 18 => 3x + 6 = 18 => 3x = 12 => x = 4.'
      }
    ]
  },

  // 16. Class 9 - All in One - Set 2
  {
    id: 'c9-aio-s2',
    standard: 'Class 9',
    subject: 'All in One',
    setNumber: 2,
    title: 'Class 9 All-in-One — Set 2',
    subtitle: 'Foundation STEM Mock (Physics + Chemistry + Math)',
    description: 'Second foundation mock synthesizing work-energy principles, atomic models, and Euclidean triangle geometry.',
    syllabus: ['Work, Energy & Sound', 'Atoms & Molecules', 'Lines, Angles & Triangles'],
    totalMarks: 24,
    durationMinutes: 12,
    questions: [
      {
        id: 'c9-aio-s2-q1',
        type: 'single',
        title: 'Physics: Power Definition & Units',
        prompt: 'Power is defined as the rate of doing work. 1 Watt (W) of power is equivalent to:',
        options: ['1 Joule per second (1 J/s)', '1 Newton per meter (1 N/m)', '1 Joule-second (1 J·s)', '1 Kilogram-meter (1 kg·m)'],
        correctAnswer: 0, // 1 J/s
        category: 'Physics',
        explanation: 'Power = Work / Time = 1 Joule / 1 second = 1 J/s = 1 Watt.'
      },
      {
        id: 'c9-aio-s2-q2',
        type: 'multiple',
        title: 'Chemistry: Subatomic Particles Properties',
        prompt: 'Which statements correctly describe subatomic particles? (Select ALL that apply)',
        options: [
          'Protons carry a positive charge of +1.6 × 10⁻¹⁹ C',
          'Electrons carry a negative charge of -1.6 × 10⁻¹⁹ C',
          'Neutrons possess zero electric charge (neutral)',
          'Electrons are substantially more massive than protons'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Chemistry',
        explanation: 'Protons have +e charge, electrons have -e charge, and neutrons are neutral. Protons are approximately 1836 times heavier than electrons (not the other way around).'
      },
      {
        id: 'c9-aio-s2-q3',
        type: 'numerical',
        title: 'Math: Complementary Angles',
        prompt: 'Two angles are complementary if their sum is 90°. If one angle measures 38°, calculate the measure of its complement in degrees (°).',
        correctAnswer: 52,
        tolerance: 0,
        unit: 'degrees (°)',
        placeholder: 'e.g. 52',
        category: 'Mathematics',
        explanation: 'Complement = 90° - 38° = 52°.'
      },
      {
        id: 'c9-aio-s2-q4',
        type: 'single',
        title: 'Physics: Audible Frequency Range for Humans',
        prompt: 'What is the standard audible frequency sound spectrum detectable by normal human ears?',
        options: ['20 Hz to 20,000 Hz', '2 Hz to 2,000 Hz', '200 Hz to 200,000 Hz', '50 Hz to 5,000 Hz'],
        correctAnswer: 0, // 20 Hz to 20 kHz
        category: 'Physics',
        explanation: 'The average human hearing range spans from 20 Hz to 20,000 Hz (20 kHz). Frequencies below 20 Hz are infrasonic, and above 20 kHz are ultrasonic.'
      },
      {
        id: 'c9-aio-s2-q5',
        type: 'multiple',
        title: 'Chemistry: Valency of Elements',
        prompt: 'Which of the following element-valency pairings are correct based on their electron configurations? (Select ALL that apply)',
        options: [
          'Sodium (Na, Z = 11) has a valency of 1',
          'Magnesium (Mg, Z = 12) has a valency of 2',
          'Chlorine (Cl, Z = 17) has a valency of 1',
          'Oxygen (O, Z = 8) has a valency of 4'
        ],
        correctAnswers: [0, 1, 2],
        category: 'Chemistry',
        explanation: 'Na (2,8,1) has valency 1; Mg (2,8,2) has valency 2; Cl (2,8,7) needs 1 electron, valency 1; Oxygen (2,6) needs 2 electrons to complete octet, so its valency is 2 (not 4).'
      },
      {
        id: 'c9-aio-s2-q6',
        type: 'numerical',
        title: 'Math: Supplementary Angles',
        prompt: 'Two angles form a linear pair and are supplementary (sum = 180°). If one angle is 115°, what is the measure of the other angle in degrees (°)?',
        correctAnswer: 65,
        tolerance: 0,
        unit: 'degrees (°)',
        placeholder: 'e.g. 65',
        category: 'Mathematics',
        explanation: 'Supplementary angle = 180° - 115° = 65°.'
      }
    ]
  }
];

// Helper functions
export function getTestById(testId: string): TestMetadata | undefined {
  return EXAM_CATALOG.find((t) => t.id === testId);
}

export function getTestsByStandard(standard: ExamStandard): TestMetadata[] {
  return EXAM_CATALOG.filter((t) => t.standard === standard);
}

export function getTestsBySubject(standard: ExamStandard, subject: ExamSubject): TestMetadata[] {
  return EXAM_CATALOG.filter((t) => t.standard === standard && t.subject === subject);
}
