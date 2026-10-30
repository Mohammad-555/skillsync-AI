// Comprehensive Mock Exam & Skill Test Database
// Each exam contains 5 distinct sets of 5 questions each (25 questions total per exam)
// Non-repeating rotation guarantees fresh questions on every test session

export const ALL_MOCK_EXAMS = [
  /* =========================================================================
     GOVERNMENT SECTOR EXAMS (8 COMPREHENSIVE EXAMS, 5 SETS EACH = 200 QS)
     ========================================================================= */
  {
    id: 'upsc-gs',
    name: 'UPSC Civil Services General Studies Paper-I',
    category: 'Government Exams',
    sector: 'government',
    icon: '🏛️',
    timeLimit: 180,
    description: 'Indian Polity, Governance, Modern History, Economy, Environment, and Geography for UPSC CSE.',
    questionSets: [
      // SET 1
      [
        {
          id: 'upsc-1-1',
          question: 'Which constitutional body recommends the distribution of tax revenues between the Union and the States in India?',
          options: [
            'NITI Aayog',
            'Finance Commission of India (Article 280)',
            'Union Ministry of Finance',
            'Reserve Bank of India'
          ],
          correct: 1,
          explanation: 'Article 280 of the Constitution mandates the Finance Commission to recommend tax devolution and revenue distribution between Centre and States.'
        },
        {
          id: 'upsc-1-2',
          question: 'The "Monetary Policy Committee" (MPC) in India consists of how many members, and who is its ex-officio Chairperson?',
          options: [
            '5 members, chaired by the Finance Minister',
            '6 members, chaired by the RBI Governor',
            '7 members, chaired by the Cabinet Secretary',
            '4 members, chaired by the Chief Economic Advisor'
          ],
          correct: 1,
          explanation: 'The MPC comprises 6 members (3 from RBI and 3 nominated by Central Government) and is chaired by the Governor of the Reserve Bank of India.'
        },
        {
          id: 'upsc-1-3',
          question: 'Which Indus Valley Civilization site is renowned for its world-famous tidal dockyard and maritime trade connection?',
          options: [
            'Mohenjo-daro',
            'Kalibangan',
            'Lothal (Gujarat)',
            'Rakhigarhi'
          ],
          correct: 2,
          explanation: 'Lothal in Gujarat contains the world’s oldest known tidal dockyard, connecting Harappan maritime trade with ancient Mesopotamia.'
        },
        {
          id: 'upsc-1-4',
          question: 'Under which Article of the Constitution can the Supreme Court issue Writs for the enforcement of Fundamental Rights?',
          options: [
            'Article 32',
            'Article 226',
            'Article 143',
            'Article 131'
          ],
          correct: 0,
          explanation: 'Article 32 gives citizens the Right to Constitutional Remedies to approach the Supreme Court directly for the enforcement of Fundamental Rights.'
        },
        {
          id: 'upsc-1-5',
          question: 'Which of the following is known as the "Ramsar Convention" in international environmental governance?',
          options: [
            'Convention on International Trade in Endangered Species',
            'Convention on Wetlands of International Importance',
            'Convention on Biological Diversity',
            'Convention on Combating Desertification'
          ],
          correct: 1,
          explanation: 'The Ramsar Convention (1971) is an international treaty for the conservation and sustainable utilization of designated wetlands.'
        }
      ],
      // SET 2
      [
        {
          id: 'upsc-2-1',
          question: 'Which Schedule of the Indian Constitution contains provisions regarding the disqualification of members on grounds of defection (Anti-Defection Law)?',
          options: [
            'Seventh Schedule',
            'Eighth Schedule',
            'Tenth Schedule',
            'Eleventh Schedule'
          ],
          correct: 2,
          explanation: 'The Tenth Schedule was inserted by the 52nd Constitutional Amendment Act of 1985 to curb political defections.'
        },
        {
          id: 'upsc-2-2',
          question: 'In the context of Indian economy, what does "Core Inflation" measure?',
          options: [
            'Headline inflation excluding volatile Food and Fuel components',
            'Inflation calculated exclusively for manufacturing commodities',
            'Wholesale Price Index for agricultural crops',
            'The inflation rate reported by the World Bank for India'
          ],
          correct: 0,
          explanation: 'Core Inflation excludes transitory and volatile price shocks from Food and Fuel sectors to measure underlying economic inflation trends.'
        },
        {
          id: 'upsc-2-3',
          question: 'Who among the following presided over the historic 1929 Lahore Session of the Indian National Congress where "Purna Swaraj" was declared?',
          options: [
            'Mahatma Gandhi',
            'Jawaharlal Nehru',
            'Subhas Chandra Bose',
            'Sardar Vallabhbhai Patel'
          ],
          correct: 1,
          explanation: 'Jawaharlal Nehru presided over the 1929 Lahore Session where the resolution for Complete Independence (Purna Swaraj) was adopted.'
        },
        {
          id: 'upsc-2-4',
          question: 'Which Article of the Indian Constitution provides for the establishment of the Inter-State Council to foster cooperative federalism?',
          options: [
            'Article 263',
            'Article 280',
            'Article 312',
            'Article 356'
          ],
          correct: 0,
          explanation: 'Article 263 empowers the President to establish an Inter-State Council to investigate and discuss subjects of common interest between Union and States.'
        },
        {
          id: 'upsc-2-5',
          question: 'The "Western Ghats" in India are classified as which category of global ecological recognition?',
          options: [
            'UNESCO World Biosphere Reserve & Global Biodiversity Hotspot',
            'Ramsar Marine Sanctuaries Only',
            'Trans-Himalayan Cold Desert',
            'IUCN Category IV Protected Wetland'
          ],
          correct: 0,
          explanation: 'The Western Ghats are recognized as one of the world’s eight "hottest hotspots" of biological diversity and a UNESCO World Heritage Site.'
        }
      ],
      // SET 3
      [
        {
          id: 'upsc-3-1',
          question: 'The "Directive Principles of State Policy" (Part IV) in the Indian Constitution were inspired by the Constitution of which country?',
          options: [
            'United States of America',
            'Ireland (Irish Constitution)',
            'United Kingdom',
            'Australia'
          ],
          correct: 1,
          explanation: 'The framers of the Constitution borrowed the Directive Principles of State Policy from the Irish Constitution of 1937.'
        },
        {
          id: 'upsc-3-2',
          question: 'What is the primary function of the "NITI Aayog" compared to the erstwhile Planning Commission?',
          options: [
            'Direct financial allocation of capital funds to states',
            'Policy think-tank fostering cooperative and competitive federalism',
            'Constitutional regulatory authority over public sector banks',
            'Sole executor of five-year economic plans'
          ],
          correct: 1,
          explanation: 'NITI Aayog acts as the premier policy think-tank of the Government of India, providing directional inputs and promoting cooperative federalism.'
        },
        {
          id: 'upsc-3-3',
          question: 'The famous "Poona Pact" of 1932 was signed between Mahatma Gandhi and which prominent Indian leader?',
          options: [
            'Dr. B.R. Ambedkar',
            'Muhammad Ali Jinnah',
            'Maulana Abul Kalam Azad',
            'Bal Gangadhar Tilak'
          ],
          correct: 0,
          explanation: 'The Poona Pact (1932) was an agreement between Dr. B.R. Ambedkar and Mahatma Gandhi providing reserved seats for depressed classes in provincial legislatures.'
        },
        {
          id: 'upsc-3-4',
          question: 'Which of the following ocean currents is a cold current in the Atlantic Ocean?',
          options: [
            'Gulf Stream',
            'Benguela Current',
            'Brazil Current',
            'North Atlantic Drift'
          ],
          correct: 1,
          explanation: 'The Benguela Current is a cold, nutrient-rich ocean current flowing northward along the south-western coast of Africa in the South Atlantic.'
        },
        {
          id: 'upsc-3-5',
          question: 'In India, the power to increase the number of Judges in the Supreme Court is vested exclusively in:',
          options: [
            'The President of India',
            'The Parliament of India (by law)',
            'The Chief Justice of India',
            'The Union Law Commission'
          ],
          correct: 1,
          explanation: 'Under Article 124(1), Parliament has the constitutional power to prescribe and augment the number of Supreme Court judges through legislation.'
        }
      ],
      // SET 4
      [
        {
          id: 'upsc-4-1',
          question: 'Which Constitutional Amendment Act lowered the voting age for Lok Sabha and State Legislative Assemblies from 21 to 18 years?',
          options: [
            '42nd Amendment Act',
            '44th Amendment Act',
            '61st Amendment Act (1988)',
            '73rd Amendment Act'
          ],
          correct: 2,
          explanation: 'The 61st Constitutional Amendment Act, 1988 amended Article 326 to lower the voting age from 21 to 18 years.'
        },
        {
          id: 'upsc-4-2',
          question: 'The term "Giffen Goods" in microeconomics refers to goods for which:',
          options: [
            'Demand increases when income increases',
            'Demand increases as the price of the good rises due to extreme income effect',
            'Demand remains constant regardless of price variations',
            'Supply is completely inelastic'
          ],
          correct: 1,
          explanation: 'Giffen goods are non-luxury goods whose demand increases as price increases, violating the fundamental law of demand because of strong negative income effects.'
        },
        {
          id: 'upsc-4-3',
          question: 'The "Keshvananda Bharati v. State of Kerala (1973)" verdict is historic because it established the doctrine of:',
          options: [
            'Basic Structure of the Constitution',
            'Absolute Parliamentary Sovereignty',
            'Judicial Inviolability of Ninth Schedule',
            'Separation of Powers between States and Union'
          ],
          correct: 0,
          explanation: 'The Supreme Court ruled that while Parliament can amend any part of the Constitution, it cannot alter its "Basic Structure".'
        },
        {
          id: 'upsc-4-4',
          question: 'Which of the following passes connects Srinagar with Leh across the Great Himalayan Range?',
          options: [
            'Zoji La Pass',
            'Nathu La Pass',
            'Rohtang Pass',
            'Shipki La Pass'
          ],
          correct: 0,
          explanation: 'Zoji La is a high mountain pass in the Himalayas connecting the Kashmir Valley (Srinagar) to Dras and Leh.'
        },
        {
          id: 'upsc-4-5',
          question: 'The Montreal Protocol (1987) is an international environmental treaty designed to protect:',
          options: [
            'Global Forest Canopy Cover',
            'The Stratospheric Ozone Layer',
            'Coral Reef Habitats',
            'Arctic Sea Ice Thickness'
          ],
          correct: 1,
          explanation: 'The Montreal Protocol phased out the production of numerous ozone-depleting substances (ODSs) like Chlorofluorocarbons (CFCs).'
        }
      ],
      // SET 5
      [
        {
          id: 'upsc-5-1',
          question: 'Which writ is issued by a higher court to a lower judicial or quasi-judicial body to quash an order passed without jurisdiction?',
          options: [
            'Habeas Corpus',
            'Mandamus',
            'Certiorari',
            'Quo-Warranto'
          ],
          correct: 2,
          explanation: 'The Writ of Certiorari is issued by higher courts to quash orders of inferior courts or tribunals that act without or in excess of jurisdiction.'
        },
        {
          id: 'upsc-5-2',
          question: 'In India, the concept of "Fiscal Deficit" is best defined as:',
          options: [
            'Total Expenditure minus Total Revenue Receipts',
            'Total Expenditure minus Total Non-Debt Receipts (Revenue + Capital recovery)',
            'Revenue Deficit minus Interest Payments',
            'Gross Borrowings minus Foreign Aid'
          ],
          correct: 1,
          explanation: 'Fiscal Deficit is the excess of total budget expenditure over total non-debt creating receipts, representing the government’s total borrowing requirements.'
        },
        {
          id: 'upsc-5-3',
          question: 'The "Cabinet Mission Plan" of 1946 proposed the creation of a Constituent Assembly consisting of how many total seats?',
          options: [
            '299 seats',
            '389 seats',
            '450 seats',
            '543 seats'
          ],
          correct: 1,
          explanation: 'The Cabinet Mission Plan allotted 389 seats to the Constituent Assembly (296 from British Indian Provinces and 93 from Princely States).'
        },
        {
          id: 'upsc-5-4',
          question: 'Which layer of the atmosphere contains the majority of atmospheric mass and is where all weather phenomena occur?',
          options: [
            'Stratosphere',
            'Troposphere',
            'Mesosphere',
            'Thermosphere'
          ],
          correct: 1,
          explanation: 'The Troposphere extends up to ~18 km at the equator and contains approximately 75% of atmospheric mass and all cloud/weather dynamics.'
        },
        {
          id: 'upsc-5-5',
          question: 'Which of the following financial institutions acts as the "Lender of Last Resort" in the Indian financial ecosystem?',
          options: [
            'State Bank of India',
            'Reserve Bank of India (RBI)',
            'National Bank for Agriculture and Rural Development (NABARD)',
            'Life Insurance Corporation of India (LIC)'
          ],
          correct: 1,
          explanation: 'As the central bank, RBI functions as the Lender of Last Resort to provide emergency liquidity support to solvent commercial banks during liquidity crises.'
        }
      ]
    ]
  },

  {
    id: 'ssc-cgl',
    name: 'SSC CGL Tier-1 Quantitative & Reasoning Test',
    category: 'Government Exams',
    sector: 'government',
    icon: '📊',
    timeLimit: 180,
    description: 'Arithmetic, Speed Math, Series Completion, and Logical Deductions for SSC CGL.',
    questionSets: [
      // SET 1
      [
        {
          id: 'ssc-1-1',
          question: 'If a train 150 meters long passes a telegraph post in 10 seconds, what is the speed of the train in km/h?',
          options: ['45 km/h', '54 km/h', '60 km/h', '72 km/h'],
          correct: 1,
          explanation: 'Speed = Distance / Time = 150m / 10s = 15 m/s. In km/h: 15 × (18 / 5) = 54 km/h.'
        },
        {
          id: 'ssc-1-2',
          question: 'Find the odd one out among the given numbers: 27, 64, 125, 144, 216.',
          options: ['64', '125', '144', '216'],
          correct: 2,
          explanation: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is 12² (a square, not a cube).'
        },
        {
          id: 'ssc-1-3',
          question: 'If A can complete a work in 12 days and B in 24 days, how many days will they take working together?',
          options: ['6 days', '8 days', '10 days', '18 days'],
          correct: 1,
          explanation: 'Combined 1-day work = (1/12) + (1/24) = 3/24 = 1/8. Together they take 8 days.'
        },
        {
          id: 'ssc-1-4',
          question: 'In a code language, if "SMART" is written as "TNBUS", how will "BRAIN" be coded?',
          options: ['CSBJO', 'CUBJO', 'CSBIP', 'DQCKP'],
          correct: 0,
          explanation: 'Each letter is shifted forward by +1 position: B->C, R->S, A->B, I->J, N->O = CSBJO.'
        },
        {
          id: 'ssc-1-5',
          question: 'A shopkeeper marks an article at 20% above cost price and allows a 10% discount. What is his net profit percentage?',
          options: ['8%', '10%', '12%', '15%'],
          correct: 0,
          explanation: 'Let CP = 100. MP = 120. SP after 10% discount = 120 - 12 = 108. Net Profit = 8%.'
        }
      ],
      // SET 2
      [
        {
          id: 'ssc-2-1',
          question: 'What is the compound interest on ₹10,000 for 2 years at 10% per annum, compounded annually?',
          options: ['₹2,000', '₹2,100', '₹2,200', '₹2,500'],
          correct: 1,
          explanation: 'Amount = 10,000 × (1.10)² = ₹12,100. CI = Amount - Principal = 12,100 - 10,000 = ₹2,100.'
        },
        {
          id: 'ssc-2-2',
          question: 'Complete the series: 3, 8, 18, 38, 78, ?',
          options: ['156', '158', '162', '148'],
          correct: 1,
          explanation: 'Pattern is (Number × 2) + 2: 3×2+2=8, 8×2+2=18, 18×2+2=38, 38×2+2=78, 78×2+2 = 158.'
        },
        {
          id: 'ssc-2-3',
          question: 'The average age of a class of 30 students is 15 years. If the teacher’s age is included, the average becomes 16 years. What is the teacher’s age?',
          options: ['40 years', '45 years', '46 years', '50 years'],
          correct: 2,
          explanation: 'Sum of 30 students = 30 × 15 = 450. Sum of 31 people = 31 × 16 = 496. Teacher’s age = 496 - 450 = 46 years.'
        },
        {
          id: 'ssc-2-4',
          question: 'Pointing to a man in a photograph, a woman said, "His brother’s father is the only son of my grandfather." How is the woman related to the man?',
          options: ['Mother', 'Sister', 'Aunt', 'Daughter'],
          correct: 1,
          explanation: 'Only son of woman’s grandfather = woman’s father. His brother’s father = the man’s father. So they are siblings (Sister).'
        },
        {
          id: 'ssc-2-5',
          question: 'If x + (1/x) = 4, what is the value of x² + (1/x²)?',
          options: ['14', '16', '18', '12'],
          correct: 0,
          explanation: '(x + 1/x)² = x² + 1/x² + 2 = 16. Therefore, x² + 1/x² = 16 - 2 = 14.'
        }
      ],
      // SET 3
      [
        {
          id: 'ssc-3-1',
          question: 'A boat travels 24 km downstream in 2 hours and 16 km upstream in 2 hours. What is the speed of the current?',
          options: ['2 km/h', '4 km/h', '6 km/h', '8 km/h'],
          correct: 0,
          explanation: 'Downstream speed = 24/2 = 12 km/h. Upstream speed = 16/2 = 8 km/h. Speed of current = (12 - 8) / 2 = 2 km/h.'
        },
        {
          id: 'ssc-3-2',
          question: 'Find the missing number in the matrix: [ [2, 3, 13], [4, 5, 41], [3, 4, ?] ]',
          options: ['25', '27', '29', '32'],
          correct: 0,
          explanation: 'Row pattern is a² + b² = c. 2² + 3² = 4 + 9 = 13. 4² + 5² = 16 + 25 = 41. 3² + 4² = 9 + 16 = 25.'
        },
        {
          id: 'ssc-3-3',
          question: 'The ratio of the radii of two circles is 3:4. What is the ratio of their areas?',
          options: ['3:4', '6:8', '9:16', '27:64'],
          correct: 2,
          explanation: 'Area is proportional to r². Ratio of areas = 3² : 4² = 9 : 16.'
        },
        {
          id: 'ssc-3-4',
          question: 'Statements: All Mangoes are Fruits. All Fruits are Sweet. Conclusion: I. All Mangoes are Sweet. II. Some Sweet things are Fruits.',
          options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both conclusions I and II follow', 'Neither follows'],
          correct: 2,
          explanation: 'Since Mangoes ⊂ Fruits ⊂ Sweet, All Mangoes are Sweet (I) and Some Sweet are Fruits (II) both logically follow.'
        },
        {
          id: 'ssc-3-5',
          question: 'What is the single discount equivalent to two successive discounts of 20% and 10%?',
          options: ['30%', '28%', '25%', '22%'],
          correct: 1,
          explanation: 'Equivalent discount = d1 + d2 - (d1×d2/100) = 20 + 10 - (200/100) = 30 - 2 = 28%.'
        }
      ],
      // SET 4
      [
        {
          id: 'ssc-4-1',
          question: 'Two pipes A and B can fill a cistern in 20 and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the cistern?',
          options: ['10 minutes', '12 minutes', '15 minutes', '18 minutes'],
          correct: 1,
          explanation: '1-minute filling rate = 1/20 + 1/30 = 5/60 = 1/12. Time required = 12 minutes.'
        },
        {
          id: 'ssc-4-2',
          question: 'If "EARTH" is coded as 5-1-18-20-8, what is the code for "MARS"?',
          options: ['13-1-18-19', '14-1-19-20', '13-2-18-19', '12-1-17-18'],
          correct: 0,
          explanation: 'Letters are directly represented by their alphabetical indices: M=13, A=1, R=18, S=19.'
        },
        {
          id: 'ssc-4-3',
          question: 'A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times itself?',
          options: ['10 years', '15 years', '20 years', '25 years'],
          correct: 1,
          explanation: 'Interest for 1x increase = 5 years. For 4 times (3x interest), Time = 3 × 5 = 15 years.'
        },
        {
          id: 'ssc-4-4',
          question: 'Find the angle between the hour hand and the minute hand of a clock at 3:30.',
          options: ['60°', '75°', '85°', '90°'],
          correct: 1,
          explanation: 'Angle = |30H - 5.5M| = |30(3) - 5.5(30)| = |90 - 165| = 75°.'
        },
        {
          id: 'ssc-4-5',
          question: 'The value of sin 30° + cos 60° + tan 45° is equal to:',
          options: ['1', '2', '1.5', '0.5'],
          correct: 1,
          explanation: 'sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1. Sum = 0.5 + 0.5 + 1 = 2.'
        }
      ],
      // SET 5
      [
        {
          id: 'ssc-5-1',
          question: 'In an election between two candidates, the winner gets 65% of the total votes and wins by a majority of 1,500 votes. What was the total number of votes polled?',
          options: ['4,500', '5,000', '6,000', '7,500'],
          correct: 1,
          explanation: 'Difference in vote % = 65% - 35% = 30%. 30% of Total = 1,500. Total votes = (1,500 × 100) / 30 = 5,000.'
        },
        {
          id: 'ssc-5-2',
          question: 'If NORTH-EAST becomes SOUTH, and SOUTH-EAST becomes WEST, what will WEST become?',
          options: ['NORTH-EAST', 'SOUTH-WEST', 'NORTH-WEST', 'SOUTH-EAST'],
          correct: 0,
          explanation: 'Each direction is rotated 135° clockwise. WEST rotated 135° clockwise becomes NORTH-EAST.'
        },
        {
          id: 'ssc-5-3',
          question: 'The diagonal of a square is 10√2 cm. What is the perimeter of the square?',
          options: ['30 cm', '40 cm', '50 cm', '80 cm'],
          correct: 1,
          explanation: 'Diagonal = side × √2 = 10√2 => side = 10 cm. Perimeter = 4 × 10 = 40 cm.'
        },
        {
          id: 'ssc-5-4',
          question: 'A can run 1 km in 4 minutes and B in 5 minutes. By how many meters does A beat B in a 1 km race?',
          options: ['100 m', '150 m', '200 m', '250 m'],
          correct: 2,
          explanation: 'In 4 minutes (when A finishes), B covers (1000m / 5) × 4 = 800m. A beats B by 1000 - 800 = 200m.'
        },
        {
          id: 'ssc-5-5',
          question: 'Which number replaces the question mark: 2, 6, 12, 20, 30, 42, ?',
          options: ['52', '54', '56', '60'],
          correct: 2,
          explanation: 'Differences are +4, +6, +8, +10, +12, +14. Next number = 42 + 14 = 56.'
        }
      ]
    ]
  },

  {
    id: 'banking-po',
    name: 'Banking & Financial Awareness (IBPS / SBI PO)',
    category: 'Government Exams',
    sector: 'government',
    icon: '🏦',
    timeLimit: 180,
    description: 'Banking regulations, RBI policies, Financial inclusion, and Current Economic Affairs.',
    questionSets: [
      // SET 1
      [
        {
          id: 'bank-1-1',
          question: 'What is the minimum paid-up equity capital required to establish a Small Finance Bank in India as per RBI guidelines?',
          options: ['₹100 Crore', '₹200 Crore', '₹300 Crore', '₹500 Crore'],
          correct: 1,
          explanation: 'As per RBI guidelines, the minimum paid-up voting equity capital for small finance banks is ₹200 crore.'
        },
        {
          id: 'bank-1-2',
          question: 'Which of the following rates is defined as the rate at which the RBI lends short-term money to commercial banks against government securities?',
          options: ['Reverse Repo Rate', 'Repo Rate', 'Bank Rate', 'Marginal Standing Facility (MSF)'],
          correct: 1,
          explanation: 'Repo Rate is the benchmark rate at which RBI lends liquidity to commercial banks against pledged collateral.'
        },
        {
          id: 'bank-1-3',
          question: 'What does the abbreviation "CRAR" stand for in banking supervisory standards (Basel III)?',
          options: ['Credit Risk Asset Ratio', 'Capital to Risk-Weighted Assets Ratio', 'Commercial Return on Asset Reserves', 'Cash Reserve Asset Ratio'],
          correct: 1,
          explanation: 'CRAR (Capital to Risk-Weighted Assets Ratio) measures a bank’s capital adequacy relative to its risk-weighted credit exposure.'
        },
        {
          id: 'bank-1-4',
          question: 'Which entity regulates credit rating agencies and stock exchanges in India?',
          options: ['Reserve Bank of India (RBI)', 'Securities and Exchange Board of India (SEBI)', 'Insurance Regulatory and Development Authority (IRDAI)', 'PFRDA'],
          correct: 1,
          explanation: 'SEBI is the statutory regulatory body for securities markets, stock exchanges, and credit rating agencies in India.'
        },
        {
          id: 'bank-1-5',
          question: 'What is the maximum insurance cover provided per depositor per bank by DICGC in India?',
          options: ['₹1,00,000', '₹2,00,000', '₹5,00,000', '₹10,00,000'],
          correct: 2,
          explanation: 'DICGC insures bank deposits up to ₹5 lakh per depositor per insured bank.'
        }
      ],
      // SET 2
      [
        {
          id: 'bank-2-1',
          question: 'What is "NPA" in commercial banking, and after how many days of overdue interest/principal does a loan become an NPA?',
          options: ['Non-Performing Asset; 90 days', 'Non-Performing Asset; 180 days', 'Net Performing Account; 30 days', 'Non-Payment Account; 60 days'],
          correct: 0,
          explanation: 'An asset becomes a Non-Performing Asset (NPA) when it ceases to generate income for the bank, typically after interest or principal remains overdue for 90 days.'
        },
        {
          id: 'bank-2-2',
          question: 'Which committee recommended the introduction of the Financial Sector Legislative Reforms Commission and Payment Banks in India?',
          options: ['Narasimham Committee', 'Nachiket Mor Committee', 'Urjit Patel Committee', 'Rangarajan Committee'],
          correct: 1,
          explanation: 'The Nachiket Mor Committee (2014) on Comprehensive Financial Services for Small Businesses and Low Income Households recommended Payment Banks.'
        },
        {
          id: 'bank-2-3',
          question: 'What is the primary objective of "Prompt Corrective Action" (PCA) framework enforced by the RBI?',
          options: ['To shut down failing banks immediately', 'To restore financial health of banks with deteriorating capital, asset quality, and profitability', 'To fix interest rates for retail depositors', 'To regulate international Forex remittances'],
          correct: 1,
          explanation: 'The PCA framework is a supervisory tool under which RBI monitors banks that become weak in terms of capital, asset quality, or profitability.'
        },
        {
          id: 'bank-2-4',
          question: 'The "Real Time Gross Settlement" (RTGS) system in India operates on which availability schedule?',
          options: ['Only on working weekdays (9 AM to 5 PM)', '24x7x365 round the clock', 'Every day except bank holidays', 'From 8 AM to 8 PM on all days'],
          correct: 1,
          explanation: 'RBI made the RTGS system operational 24x7x365 on all days with effect from December 2020.'
        },
        {
          id: 'bank-2-5',
          question: 'What does the acronym "CASA" ratio indicate in bank financial statements?',
          options: ['Current Account & Savings Account deposit share', 'Capital Adequacy & Solvency Assets', 'Credit Allocation for Sustainable Agriculture', 'Central Account Settlement Agency'],
          correct: 0,
          explanation: 'CASA ratio represents the proportion of low-cost Current and Savings Account deposits in a bank’s total deposit base.'
        }
      ],
      // SET 3
      [
        {
          id: 'bank-3-1',
          question: 'Under the Priority Sector Lending (PSL) norms, what percentage of Adjusted Net Bank Credit (ANBC) must domestic commercial banks lend to priority sectors?',
          options: ['25%', '33%', '40%', '50%'],
          correct: 2,
          explanation: 'Domestic commercial banks and foreign banks with 20+ branches must allocate 40% of their ANBC to designated priority sectors.'
        },
        {
          id: 'bank-3-2',
          question: 'Which of the following instruments is an uncollateralized, unsecured short-term debt instrument issued by top-rated corporations?',
          options: ['Treasury Bills (T-Bills)', 'Commercial Paper (CP)', 'Certificate of Deposit (CD)', 'Collateralized Borrowing & Lending Obligation (CBLO)'],
          correct: 1,
          explanation: 'Commercial Paper (CP) is an unsecured money market instrument issued as a promissory note by highly rated corporate borrowers.'
        },
        {
          id: 'bank-3-3',
          question: 'What is the full form of "SWIFT" code used for cross-border international interbank payments?',
          options: ['Society for Worldwide Interbank Financial Telecommunication', 'Standard Worldwide International Funds Transfer', 'System for World Interbank Foreign Transactions', 'Secure Wireless Interbank Financial Terminal'],
          correct: 0,
          explanation: 'SWIFT stands for Society for Worldwide Interbank Financial Telecommunication, providing secure messaging for global transactions.'
        },
        {
          id: 'bank-3-4',
          question: 'What is the tenure range for Treasury Bills (T-Bills) issued by the Government of India through RBI auctions?',
          options: ['30 days, 60 days, 90 days', '91 days, 182 days, 364 days', '1 year, 3 years, 5 years', '14 days, 28 days, 56 days'],
          correct: 1,
          explanation: 'Treasury Bills are short-term government debt securities issued in three standard tenures: 91 days, 182 days, and 364 days.'
        },
        {
          id: 'bank-3-5',
          question: 'Which specialized financial institution is the apex regulatory body for Rural & Agricultural credit in India?',
          options: ['SIDBI', 'NABARD', 'EXIM Bank', 'NHB'],
          correct: 1,
          explanation: 'NABARD (National Bank for Agriculture and Rural Development) is the apex development bank for agriculture and rural development.'
        }
      ],
      // SET 4
      [
        {
          id: 'bank-4-1',
          question: 'Under the Pradhan Mantri Jan Dhan Yojana (PMJDY), what is the maximum overdraft facility available to eligible account holders?',
          options: ['₹2,000', '₹5,000', '₹10,000', '₹20,000'],
          correct: 2,
          explanation: 'The overdraft limit under PMJDY was enhanced from ₹5,000 to ₹10,000 for accounts maintained with satisfactory transactions.'
        },
        {
          id: 'bank-4-2',
          question: 'What is "Statutory Liquidity Ratio" (SLR) in banking?',
          options: ['The cash reserve banks must keep at RBI without earning interest', 'The minimum proportion of Net Demand and Time Liabilities (NDTL) banks must maintain in liquid assets like Gold and Govt Securities', 'The ratio of NPA to total loans', 'The maximum limit on foreign currency lending'],
          correct: 1,
          explanation: 'SLR mandates commercial banks to preserve a prescribed percentage of NDTL in approved liquid assets (cash, gold, sovereign bonds).'
        },
        {
          id: 'bank-4-3',
          question: 'Which institution developed the Unified Payments Interface (UPI) and Bharat Bill Payment System (BBPS)?',
          options: ['Reserve Bank of India (RBI)', 'National Payments Corporation of India (NPCI)', 'State Bank of India', 'Indian Banks’ Association (IBA)'],
          correct: 1,
          explanation: 'NPCI, an umbrella organization founded by RBI and IBA, developed UPI, IMPS, RuPay, and BBPS.'
        },
        {
          id: 'bank-4-4',
          question: 'What is the validity period of a standard Cheque or Bank Demand Draft in India?',
          options: ['1 month from the date of issuance', '3 months from the date of issuance', '6 months from the date of issuance', '12 months from the date of issuance'],
          correct: 1,
          explanation: 'With effect from April 1, 2012, the validity of cheques and bank drafts in India is 3 months from the date of issue.'
        },
        {
          id: 'bank-4-5',
          question: 'What does "CAMELS" rating stand for in bank supervisory audit systems?',
          options: ['Capital, Assets, Management, Earnings, Liquidity, Sensitivity', 'Credit, Audit, Money, Economy, Liabilities, Securities', 'Cash, Account, Mortgage, Equity, Lending, Solvency', 'Capital, Assets, Margin, Expenditure, Loss, Sanctions'],
          correct: 0,
          explanation: 'CAMELS evaluates Capital Adequacy, Asset Quality, Management Capabilities, Earnings Quality, Liquidity, and Sensitivity to market risk.'
        }
      ],
      // SET 5
      [
        {
          id: 'bank-5-1',
          question: 'Which of the following is NOT a feature of a Payments Bank in India?',
          options: ['Can accept demand deposits (Savings/Current) up to ₹2 Lakh', 'Can issue debit cards and offer remittance services', 'Can issue credit cards and extend home/personal loans', 'Can distribute insurance and mutual fund products'],
          correct: 2,
          explanation: 'Payments Banks are strictly prohibited from lending operations and cannot issue credit cards or grant loans.'
        },
        {
          id: 'bank-5-2',
          question: 'What does "LIBOR" (which transitioned globally to SOFR) stand for?',
          options: ['London Interbank Offered Rate', 'Liquidity in Banking Operations Reserve', 'Long-term Interbank Official Ratio', 'London International Borrowing Organization Rate'],
          correct: 0,
          explanation: 'LIBOR stood for London Interbank Offered Rate, the historic global benchmark interest rate for interbank lending.'
        },
        {
          id: 'bank-5-3',
          question: 'What is the maximum limit of investment for a retail investor under the RBI Retail Direct Scheme?',
          options: ['₹5 Lakhs per auction', '₹10 Lakhs per financial year', 'No upper ceiling for non-competitive bidding up to 2 crore per security', '₹50 Lakhs lifetime limit'],
          correct: 2,
          explanation: 'Under RBI Retail Direct, individual retail investors can participate in government securities auctions up to ₹2 Crore per auction without upper aggregate limits.'
        },
        {
          id: 'bank-5-4',
          question: 'The Insolvency and Bankruptcy Code (IBC) was enacted in India in which year?',
          options: ['2014', '2016', '2018', '2020'],
          correct: 1,
          explanation: 'The IBC was enacted in 2016 to consolidate and streamline the legal framework for resolving corporate insolvencies and NPAs.'
        },
        {
          id: 'bank-5-5',
          question: 'What is the role of the "Banking Ombudsman" appointed by the Reserve Bank of India?',
          options: ['To audit financial statements of foreign banks', 'To resolve customer grievances and complaints against deficient banking services', 'To determine daily foreign exchange conversion rates', 'To approve bank mergers and acquisitions'],
          correct: 1,
          explanation: 'The Banking Ombudsman is a senior official appointed by RBI to redress customer complaints against bank service deficiencies.'
        }
      ]
    ]
  },

  {
    id: 'rrb-railway',
    name: 'RRB NTPC General Awareness & Science Test',
    category: 'Government Exams',
    sector: 'government',
    icon: '🚆',
    timeLimit: 180,
    description: 'Everyday Science, Indian Railways facts, Geography, and General Awareness for RRB NTPC.',
    questionSets: [
      // SET 1
      [
        {
          id: 'rrb-1-1',
          question: 'Where is the National Rail and Transportation Institute (India’s first Rail University) located?',
          options: ['New Delhi', 'Vadodara, Gujarat', 'Kolkata, West Bengal', 'Varanasi, Uttar Pradesh'],
          correct: 1,
          explanation: 'The National Rail and Transportation Institute (now Gati Shakti Vishwavidyalaya) was established in Vadodara, Gujarat.'
        },
        {
          id: 'rrb-1-2',
          question: 'Which device is used to measure electric current flowing in a circuit?',
          options: ['Voltmeter', 'Ammeter', 'Galvanometer', 'Ohmmeter'],
          correct: 1,
          explanation: 'An Ammeter is connected in series with a circuit to measure electric current in amperes.'
        },
        {
          id: 'rrb-1-3',
          question: 'Which gas is predominantly responsible for the greenhouse effect on Earth?',
          options: ['Carbon Dioxide (CO₂)', 'Water Vapor & Carbon Dioxide', 'Oxygen (O₂)', 'Nitrogen (N₂)'],
          correct: 1,
          explanation: 'Water vapor is the most abundant natural greenhouse gas, while CO₂ is the primary anthropogenic greenhouse gas driving warming.'
        },
        {
          id: 'rrb-1-4',
          question: 'In Indian Railways, what is the standard track width for Broad Gauge (BG)?',
          options: ['1,000 mm', '1,676 mm (5 ft 6 in)', '762 mm', '1,435 mm'],
          correct: 1,
          explanation: 'Broad Gauge in Indian Railways has a standard width of 1,676 mm (5 ft 6 in).'
        },
        {
          id: 'rrb-1-5',
          question: 'Which human organ produces bile juice necessary for fat digestion?',
          options: ['Pancreas', 'Gallbladder', 'Liver', 'Stomach'],
          correct: 2,
          explanation: 'The Liver produces bile juice, which is stored in the Gallbladder until needed for fat emulsification.'
        }
      ],
      // SET 2
      [
        {
          id: 'rrb-2-1',
          question: 'Where was India’s first commercial passenger train operated in 1853?',
          options: ['Bombay (Bori Bunder) to Thane (34 km)', 'Calcutta to Howrah', 'Madras to Arkonam', 'Delhi to Agra'],
          correct: 0,
          explanation: 'The first passenger train in India ran on 16 April 1853 between Bori Bunder (Mumbai) and Thane, covering 34 km with 14 carriages.'
        },
        {
          id: 'rrb-2-2',
          question: 'What is the chemical name of "Baking Soda"?',
          options: ['Sodium Carbonate', 'Sodium Bicarbonate (NaHCO₃)', 'Sodium Chloride', 'Calcium Oxychloride'],
          correct: 1,
          explanation: 'Baking soda is Sodium Bicarbonate (NaHCO₃), whereas washing soda is Sodium Carbonate (Na₂CO₃).'
        },
        {
          id: 'rrb-2-3',
          question: 'Which railway zone is the largest in terms of route kilometer network in India?',
          options: ['Northern Railway (New Delhi)', 'Western Railway (Mumbai)', 'Eastern Railway (Kolkata)', 'Southern Railway (Chennai)'],
          correct: 0,
          explanation: 'Northern Railway, headquartered at New Delhi, is the largest railway zone in terms of route network.'
        },
        {
          id: 'rrb-2-4',
          question: 'What is the unit of power of a lens in optics?',
          options: ['Lumen', 'Dioptre (D)', 'Candela', 'Joule'],
          correct: 1,
          explanation: 'The power of an optical lens is measured in Dioptres (D), defined as 1 / focal length in meters.'
        },
        {
          id: 'rrb-2-5',
          question: 'What is the SI unit of Force in the International System of Units?',
          options: ['Dyne', 'Newton (N)', 'Pascal', 'Watt'],
          correct: 1,
          explanation: 'The SI unit of force is the Newton (N), which equals 1 kg⋅m/s².'
        }
      ],
      // SET 3
      [
        {
          id: 'rrb-3-1',
          question: 'Which indigenous automatic train protection system is deployed by Indian Railways to prevent signal passing at danger and head-on collisions?',
          options: ['Raksha Guard', 'KAVACH', 'TrainGuard-AI', 'Shakti Shield'],
          correct: 1,
          explanation: 'KAVACH (Train Collision Avoidance System) is the indigenously developed ATP system certified for Safety Integrity Level 4 (SIL-4).'
        },
        {
          id: 'rrb-3-2',
          question: 'Which planet in our solar system is known as the "Red Planet"?',
          options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
          correct: 1,
          explanation: 'Mars appears reddish due to the high concentration of iron oxide (rust) on its surface regolith.'
        },
        {
          id: 'rrb-3-3',
          question: 'What is the chemical formula of "Heavy Water" used as a moderator in nuclear reactors?',
          options: ['H₂O₂', 'D₂O (Deuterium Oxide)', 'T₂O', 'H₃O⁺'],
          correct: 1,
          explanation: 'Heavy water is Deuterium Oxide (D₂O), where the hydrogen atoms are the heavier isotope deuterium (²H).'
        },
        {
          id: 'rrb-3-4',
          question: 'Where is the headquarters of the South Central Railway (SCR) zone located?',
          options: ['Hyderabad', 'Secunderabad', 'Vijayawada', 'Hubballi'],
          correct: 1,
          explanation: 'The South Central Railway zone is headquartered at Rail Nilayam in Secunderabad.'
        },
        {
          id: 'rrb-3-5',
          question: 'Which vitamin is essential for normal blood clotting and coagulation in the human body?',
          options: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Vitamin D'],
          correct: 2,
          explanation: 'Vitamin K is required for the hepatic synthesis of prothrombin and coagulation factors II, VII, IX, and X.'
        }
      ],
      // SET 4
      [
        {
          id: 'rrb-4-1',
          question: 'The famous "Integral Coach Factory" (ICF), creator of the Vande Bharat Express, is situated at:',
          options: ['Kapurthala, Punjab', 'Perambur (Chennai), Tamil Nadu', 'Raebareli, Uttar Pradesh', 'Bengaluru, Karnataka'],
          correct: 1,
          explanation: 'ICF Perambur in Chennai is the premier rail coach manufacturing unit in India, which built Train 18 (Vande Bharat).'
        },
        {
          id: 'rrb-4-2',
          question: 'What is the speed of light in vacuum?',
          options: ['3 × 10⁸ m/s (300,000 km/s)', '3 × 10⁶ m/s', '1.5 × 10⁸ m/s', '3 × 10¹⁰ m/s'],
          correct: 0,
          explanation: 'Light travels in vacuum at approximately 299,792,458 m/s (rounded to 3 × 10⁸ m/s).'
        },
        {
          id: 'rrb-4-3',
          question: 'Which hormone regulates the level of sugar (glucose) in human blood?',
          options: ['Thyroxine', 'Insulin', 'Adrenaline', 'Estrogen'],
          correct: 1,
          explanation: 'Insulin, secreted by the beta cells of the Islets of Langerhans in the pancreas, lowers blood glucose levels.'
        },
        {
          id: 'rrb-4-4',
          question: 'Where is the world’s highest railway bridge (Chenab Bridge) located?',
          options: ['Uttarakhand', 'Jammu & Kashmir (Reasi district)', 'Himachal Pradesh', 'Sikkim'],
          correct: 1,
          explanation: 'The Chenab Bridge in Reasi district of J&K stands 359 meters above the river bed, making it the highest arch rail bridge on Earth.'
        },
        {
          id: 'rrb-4-5',
          question: 'Sound waves cannot travel through which of the following media?',
          options: ['Water', 'Steel', 'Air', 'Vacuum'],
          correct: 3,
          explanation: 'Sound is a mechanical longitudinal wave requiring a material medium for particle oscillation and cannot propagate in vacuum.'
        }
      ],
      // SET 5
      [
        {
          id: 'rrb-5-1',
          question: 'What is the primary constituent of Natural Gas and Compressed Natural Gas (CNG)?',
          options: ['Propane', 'Methane (CH₄)', 'Butane', 'Ethane'],
          correct: 1,
          explanation: 'Methane (CH₄) accounts for 85-95% of the composition of Compressed Natural Gas.'
        },
        {
          id: 'rrb-5-2',
          question: 'Which Indian railway station has the distinction of having the longest railway platform in the world (1,507 m)?',
          options: ['Gorakhpur Railway Station', 'Shree Siddharoodha Swamiji Hubballi Station', 'Kollam Junction', 'Kharagpur Station'],
          correct: 1,
          explanation: 'Hubballi Junction (SSS Hubballi) in Karnataka holds the Guinness World Record for the longest railway platform at 1,507 meters.'
        },
        {
          id: 'rrb-5-3',
          question: 'What is the pH value of pure distilled water at standard 25°C temperature?',
          options: ['0', '5.5', '7.0 (Neutral)', '9.0'],
          correct: 2,
          explanation: 'Pure water has equal concentrations of H⁺ and OH⁻ ions, giving it a neutral pH of exactly 7.0.'
        },
        {
          id: 'rrb-5-4',
          question: 'Which disease is caused by the deficiency of Vitamin C in human diet?',
          options: ['Rickets', 'Beriberi', 'Scurvy', 'Night Blindness'],
          correct: 2,
          explanation: 'Scurvy is caused by Vitamin C (ascorbic acid) deficiency, leading to bleeding gums and impaired wound healing.'
        },
        {
          id: 'rrb-5-5',
          question: 'What is the acceleration due to gravity (g) on the surface of Earth approximately?',
          options: ['8.2 m/s²', '9.8 m/s²', '11.2 m/s²', '6.67 m/s²'],
          correct: 1,
          explanation: 'Standard gravity at Earth’s surface is approximately 9.80665 m/s² (commonly taken as 9.8 m/s²).'
        }
      ]
    ]
  },

  {
    id: 'defence-nda',
    name: 'NDA & CDS Defence Services Examination',
    category: 'Government Exams',
    sector: 'government',
    icon: '🛡️',
    timeLimit: 180,
    description: 'General Ability, Indian Defence Strategy, Military History, and National Security Affairs for NDA & CDS.',
    questionSets: [
      // SET 1
      [
        {
          id: 'def-1-1',
          question: 'Who is the Supreme Commander of the Indian Armed Forces under Article 53 of the Constitution?',
          options: ['The Prime Minister of India', 'The President of India', 'The Defence Minister', 'The Chief of Defence Staff (CDS)'],
          correct: 1,
          explanation: 'Under Article 53(2) of the Indian Constitution, the Supreme Command of the Defence Forces of the Union is vested in the President.'
        },
        {
          id: 'def-1-2',
          question: 'Where is the National Defence Academy (NDA) located in India?',
          options: ['Dehradun, Uttarakhand', 'Khadakwasla (Pune), Maharashtra', 'Dundigal, Hyderabad', 'Ezhimala, Kerala'],
          correct: 1,
          explanation: 'The National Defence Academy (NDA) is located at Khadakwasla near Pune, Maharashtra, training cadets of Army, Navy, and Air Force together.'
        },
        {
          id: 'def-1-3',
          question: 'What is the highest wartime gallantry award in India?',
          options: ['Maha Vir Chakra', 'Param Vir Chakra (PVC)', 'Ashoka Chakra', 'Kirti Chakra'],
          correct: 1,
          explanation: 'Param Vir Chakra (PVC) is India’s highest military decoration awarded for highest degree of valour in the presence of the enemy.'
        },
        {
          id: 'def-1-4',
          question: 'Which tri-services command is the only integrated operational command of the Indian Armed Forces?',
          options: ['Northern Command', 'Andaman and Nicobar Command (Port Blair)', 'Western Naval Command', 'Strategic Forces Command'],
          correct: 1,
          explanation: 'The Andaman and Nicobar Command (ANC) in Port Blair is the first and only integrated tri-service theatre command of India.'
        },
        {
          id: 'def-1-5',
          question: 'What is the name of India’s first indigenously designed and built aircraft carrier commissioned in 2022?',
          options: ['INS Vikramaditya', 'INS Vikrant (IAC-1)', 'INS Viraat', 'INS Arihant'],
          correct: 1,
          explanation: 'INS Vikrant, built by Cochin Shipyard Limited, was commissioned into the Indian Navy in September 2022 as India’s first indigenous carrier.'
        }
      ],
      // SET 2
      [
        {
          id: 'def-2-1',
          question: 'Where is the Indian Military Academy (IMA) situated?',
          options: ['Dehradun, Uttarakhand', 'Chennai, Tamil Nadu', 'Mhow, Madhya Pradesh', 'Gaya, Bihar'],
          correct: 0,
          explanation: 'The Indian Military Academy (IMA) was established in 1932 in Dehradun, Uttarakhand.'
        },
        {
          id: 'def-2-2',
          question: 'Which missile is an Indian medium-range nuclear-capable submarine-launched ballistic missile (SLBM)?',
          options: ['BrahMos', 'K-15 Sagarika / K-4', 'Prithvi-II', 'Akash-1S'],
          correct: 1,
          explanation: 'The K-15 Sagarika and K-4 are submarine-launched ballistic missiles developed for INS Arihant class SSBNs.'
        },
        {
          id: 'def-2-3',
          question: 'What is the equivalent rank in the Indian Navy for an Indian Army Colonel?',
          options: ['Commander', 'Captain', 'Commodore', 'Rear Admiral'],
          correct: 1,
          explanation: 'In military hierarchy, an Army Colonel equates to a Navy Captain and an Air Force Group Captain.'
        },
        {
          id: 'def-2-4',
          question: 'Operation Vijay (1999) was conducted by the Indian Armed Forces to clear Pakistani infiltrators from which sector?',
          options: ['Siachen Glacier', 'Kargil Sector (Drass, Batalik & Tiger Hill)', 'Chumar Sector', 'Uri Sector'],
          correct: 1,
          explanation: 'Operation Vijay was the Indian military operation during the 1999 Kargil War to recapture intruded heights in J&K.'
        },
        {
          id: 'def-2-5',
          question: 'What is the primary supersonic cruise missile jointly developed by India (DRDO) and Russia (NPO Mashinostroyeniya)?',
          options: ['Nirbhay', 'BrahMos', 'Astra', 'Nag'],
          correct: 1,
          explanation: 'BrahMos (named after Brahmaputra and Moskva rivers) is the world’s fastest operational supersonic cruise missile.'
        }
      ],
      // SET 3
      [
        {
          id: 'def-3-1',
          question: 'What is the highest peacetime gallantry award conferred in India?',
          options: ['Vir Chakra', 'Ashoka Chakra', 'Shaurya Chakra', 'Sena Medal'],
          correct: 1,
          explanation: 'Ashoka Chakra is the peacetime equivalent of the Param Vir Chakra, awarded for most conspicuous bravery away from the battlefield.'
        },
        {
          id: 'def-3-2',
          question: 'Where is the Indian Naval Academy (INA) located?',
          options: ['Kochi, Kerala', 'Ezhimala (Kannur), Kerala', 'Visakhapatnam, Andhra Pradesh', 'Goa'],
          correct: 1,
          explanation: 'The Indian Naval Academy is situated at Ezhimala in Kannur district, Kerala.'
        },
        {
          id: 'def-3-3',
          question: 'What is the name of the main battle tank (MBT) indigenously developed by DRDO for the Indian Army?',
          options: ['T-90 Bhishma', 'Arjun MBT Mk-1A', 'Vijayanta', 'T-72 Ajeya'],
          correct: 1,
          explanation: 'Arjun MBT is India’s indigenously developed 3rd-generation main battle tank designed by CVRDE/DRDO.'
        },
        {
          id: 'def-3-4',
          question: 'The "Siachen Glacier", the highest active battlefield in the world, was secured by the Indian Army under which operation in 1984?',
          options: ['Operation Meghdoot', 'Operation Safed Sagar', 'Operation Cactus', 'Operation Pawan'],
          correct: 0,
          explanation: 'Operation Meghdoot was launched on 13 April 1984 to establish Indian military control over the entire Siachen Glacier.'
        },
        {
          id: 'def-3-5',
          question: 'Which radar-evading stealth multirole fighter jet entered Indian Air Force service with the Golden Arrows squadron?',
          options: ['HAL Tejas Mk1', 'Dassault Rafale', 'Sukhoi Su-30MKI', 'Mirage 2000'],
          correct: 1,
          explanation: 'The Dassault Rafale 4.5-generation fighter aircraft was inducted into No. 17 Squadron (Golden Arrows) at Ambala AFS.'
        }
      ],
      // SET 4
      [
        {
          id: 'def-4-1',
          question: 'Who was the first Chief of Defence Staff (CDS) of independent India?',
          options: ['General K.M. Cariappa', 'General Bipin Rawat', 'General Sam Manekshaw', 'General Manoj Pande'],
          correct: 1,
          explanation: 'General Bipin Rawat was appointed as India’s first Chief of Defence Staff on 1 January 2020.'
        },
        {
          id: 'def-4-2',
          question: 'Where is the Officers Training Academy (OTA) for training Short Service Commission officers located?',
          options: ['Chennai, Tamil Nadu', 'Pune, Maharashtra', 'Dehradun, Uttarakhand', 'Bangalore, Karnataka'],
          correct: 0,
          explanation: 'OTA Chennai trains gentlemen and lady cadets for Short Service Commission in the Indian Army.'
        },
        {
          id: 'def-4-3',
          question: 'Which air defence missile system developed by DRDO can engage multiple aerial targets simultaneously up to 25 km?',
          options: ['Trishul', 'Akash Surface-to-Air Missile System', 'Prithvi Air Defence', 'Barak-8'],
          correct: 1,
          explanation: 'Akash is a medium-range mobile surface-to-air missile defence system with automated multi-target tracking.'
        },
        {
          id: 'def-4-4',
          question: 'What is the motto of the Indian Air Force (IAF)?',
          options: ['Sham No Varunah', 'Nabhaḥ Sprśaṁ Dīptam (Touch the Sky with Glory)', 'Seva Paramo Dharma', 'Valour and Faith'],
          correct: 1,
          explanation: 'The IAF motto "Nabhaḥ Sprśaṁ Dīptam" is taken from the eleventh chapter of the Bhagavad Gita.'
        },
        {
          id: 'def-4-5',
          question: 'What is the name of India’s nuclear-powered ballistic missile submarine (SSBN)?',
          options: ['INS Arihant', 'INS Chakra', 'INS Kalvari', 'INS Shishumar'],
          correct: 0,
          explanation: 'INS Arihant is India’s lead ship of nuclear-powered ballistic missile submarines, completing India’s nuclear triad.'
        }
      ],
      // SET 5
      [
        {
          id: 'def-5-1',
          question: 'What is the primary role of the Defence Research and Development Organisation (DRDO)?',
          options: ['Recruiting Army personnel', 'Design and development of military hardware, munitions, and strategic defence technologies', 'Formulating national taxation policies', 'Managing airport border security'],
          correct: 1,
          explanation: 'DRDO is India’s premier agency under the Ministry of Defence charged with the R&D of military technologies.'
        },
        {
          id: 'def-5-2',
          question: 'The Line of Actual Control (LAC) is the effective ceasefire boundary between India and which country?',
          options: ['Pakistan', 'China', 'Myanmar', 'Bangladesh'],
          correct: 1,
          explanation: 'The Line of Actual Control (LAC) separates Indian-controlled territory from Chinese-controlled territory across Ladakh, Uttarakhand, and Arunachal Pradesh.'
        },
        {
          id: 'def-5-3',
          question: 'What is the equivalent rank in the Indian Air Force for an Army Major General?',
          options: ['Air Commodore', 'Air Vice Marshal', 'Air Marshal', 'Air Chief Marshal'],
          correct: 1,
          explanation: 'Major General (Army) = Rear Admiral (Navy) = Air Vice Marshal (Air Force).'
        },
        {
          id: 'def-5-4',
          question: 'What is the name of the light combat helicopter (LCH) developed by Hindustan Aeronautics Limited (HAL)?',
          options: ['Prachand', 'Rudra', 'Dhruv', 'Chetak'],
          correct: 0,
          explanation: 'LCH Prachand is India’s indigenous dedicated multirole attack helicopter capable of operating at extreme high altitudes in the Himalayas.'
        },
        {
          id: 'def-5-5',
          question: 'Which commando force of the Indian Navy is specialized in maritime special operations and counter-terrorism?',
          options: ['Garud Commandos', 'MARCOS (Marine Commandos)', 'Para SF', 'National Security Guard (NSG)'],
          correct: 1,
          explanation: 'MARCOS (Marine Commandos) is the elite special operations unit of the Indian Navy trained for sea, air, and land combat.'
        }
      ]
    ]
  },

  {
    id: 'state-psc',
    name: 'State Public Service Commission (State PSC / Group-1)',
    category: 'Government Exams',
    sector: 'government',
    icon: '⚖️',
    timeLimit: 180,
    description: 'State Administration, Panchayati Raj, Land Reforms, State Revenue Policies, and Regional Governance.',
    questionSets: [
      // SET 1
      [
        {
          id: 'spsc-1-1',
          question: 'Under which Article of the Constitution are State Public Service Commissions (SPSC) established?',
          options: ['Article 280', 'Article 315', 'Article 324', 'Article 356'],
          correct: 1,
          explanation: 'Article 315 provides for the creation of the Union Public Service Commission and State Public Service Commissions.'
        },
        {
          id: 'spsc-1-2',
          question: 'Which constitutional amendment granted constitutional recognition and 3-tier structure to Panchayati Raj Institutions (PRIs)?',
          options: ['42nd Amendment', '44th Amendment', '73rd Amendment Act (1992)', '86th Amendment'],
          correct: 2,
          explanation: 'The 73rd Constitutional Amendment Act, 1992 inserted Part IX and the Eleventh Schedule containing 29 subjects for Panchayats.'
        },
        {
          id: 'spsc-1-3',
          question: 'Who appoints the Chairman and Members of a State Public Service Commission?',
          options: ['The Chief Minister of the State', 'The Governor of the State', 'The President of India', 'The Chief Justice of the High Court'],
          correct: 1,
          explanation: 'The Chairman and Members of an SPSC are appointed by the Governor, although they can be removed only by the President of India.'
        },
        {
          id: 'spsc-1-4',
          question: 'What is the role of a "District Collector / Magistrate" in the state administrative hierarchy?',
          options: ['Chief judicial magistrate only', 'Head of district general administration, law & order, and revenue collection', 'Appointed municipal council president', 'Auditor of state legislative funds'],
          correct: 1,
          explanation: 'The District Collector is the principal officer in charge of revenue administration, development coordination, and executive magisterial law & order.'
        },
        {
          id: 'spsc-1-5',
          question: 'The "Consolidated Fund of the State" is established under which Article of the Constitution?',
          options: ['Article 266(1)', 'Article 267', 'Article 280', 'Article 360'],
          correct: 0,
          explanation: 'Article 266(1) provides for the Consolidated Fund of India as well as the Consolidated Fund of each State.'
        }
      ],
      // SET 2
      [
        {
          id: 'spsc-2-1',
          question: 'What is the minimum age prescribed in the Constitution for a candidate to contest elections for a Village Panchayat Sarpanch?',
          options: ['18 years', '21 years', '25 years', '30 years'],
          correct: 1,
          explanation: 'Under Article 243F, the minimum age requirement for contesting Panchayat elections is 21 years.'
        },
        {
          id: 'spsc-2-2',
          question: 'Which Article empowers the Governor of a State to promulgate Ordinances during the recess of the State Legislature?',
          options: ['Article 123', 'Article 213', 'Article 161', 'Article 200'],
          correct: 1,
          explanation: 'Article 213 empowers the Governor to promulgate ordinances when the State Legislative Assembly is not in session.'
        },
        {
          id: 'spsc-2-3',
          question: 'The 74th Constitutional Amendment Act, 1992 deals with which administrative tier?',
          options: ['Village Panchayats', 'Urban Local Bodies (Municipalities & Corporations)', 'Tribal Autonomous Districts', 'Inter-State Water Tribunals'],
          correct: 1,
          explanation: 'The 74th Amendment Act added Part IX-A and the Twelfth Schedule (18 functional items) for Municipalities.'
        },
        {
          id: 'spsc-2-4',
          question: 'Who conducts elections to Panchayats and Municipalities in a State?',
          options: ['Election Commission of India (ECI)', 'State Election Commission (SEC)', 'District Magistrate', 'State Legislative Secretariat'],
          correct: 1,
          explanation: 'Article 243K and 243ZA vest the superintendence, direction, and conduct of local body elections in the autonomous State Election Commission.'
        },
        {
          id: 'spsc-2-5',
          question: 'What is the term of office for a member of a State Public Service Commission?',
          options: ['5 years or up to 60 years of age', '6 years or up to 62 years of age', '6 years or up to 65 years of age', '4 years fixed tenure'],
          correct: 1,
          explanation: 'SPSC members hold office for a term of 6 years or until they attain the age of 62 years (whereas UPSC members hold until 65 years).'
        }
      ],
      // SET 3
      [
        {
          id: 'spsc-3-1',
          question: 'Which committee first recommended the establishment of a 3-tier Panchayati Raj system (Gram, Block, and Zilla) in India in 1957?',
          options: ['Balwant Rai Mehta Committee', 'Ashok Mehta Committee', 'L.M. Singhvi Committee', 'Sarkaria Commission'],
          correct: 0,
          explanation: 'The Balwant Rai Mehta Committee (1957) submitted the foundational blueprint for "Democratic Decentralisation" with 3-tier PRIs.'
        },
        {
          id: 'spsc-3-2',
          question: 'Which list under the Seventh Schedule of the Indian Constitution contains "Public Health and Sanitation, Hospitals and Dispensaries"?',
          options: ['Union List (List I)', 'State List (List II)', 'Concurrent List (List III)', 'Residuary Powers'],
          correct: 1,
          explanation: 'Public health, sanitation, agriculture, police, and prisons are exclusively placed under the State List (List II).'
        },
        {
          id: 'spsc-3-3',
          question: 'The office of the "Advocate General for the State" is provided under which Article of the Constitution?',
          options: ['Article 76', 'Article 165', 'Article 148', 'Article 324'],
          correct: 1,
          explanation: 'Article 165 mandates that each State have an Advocate General appointed by the Governor to give legal advice to the State Government.'
        },
        {
          id: 'spsc-3-4',
          question: 'Under Article 356, President’s Rule in a State can be imposed on the report of the:',
          options: ['Chief Justice of the High Court', 'Governor of the State', 'State Assembly Speaker', 'Chief Secretary'],
          correct: 1,
          explanation: 'If the Governor satisfies the President that the governance of the State cannot be carried on in accordance with the Constitution, President’s Rule may be proclaimed.'
        },
        {
          id: 'spsc-3-5',
          question: 'What is the constitutional requirement for reservation of seats for Women in Panchayati Raj Institutions under Article 243D?',
          options: ['Not less than 15%', 'Not less than 25%', 'Not less than one-third (33%) of total seats', '50% mandatory in all states'],
          correct: 2,
          explanation: 'Article 243D mandates that not less than one-third (33%) of the total number of seats to be filled by direct election in every Panchayat shall be reserved for women.'
        }
      ],
      // SET 4
      [
        {
          id: 'spsc-4-1',
          question: 'Which body is constituted by the Governor under Article 243-I every 5 years to review the financial position of Panchayats?',
          options: ['State Planning Board', 'State Finance Commission', 'Public Accounts Committee', 'State Revenue Board'],
          correct: 1,
          explanation: 'The State Finance Commission is constituted every 5 years under Article 243-I to recommend distribution of net tax proceeds between State and PRIs.'
        },
        {
          id: 'spsc-4-2',
          question: 'What is the maximum strength of the Council of Ministers in a State as mandated by the 91st Constitutional Amendment Act (2003)?',
          options: ['10% of total Assembly strength', '15% of total Assembly strength (minimum 12 ministers including CM)', '20% of total Assembly strength', 'No upper numerical ceiling'],
          correct: 1,
          explanation: 'Article 164(1A) limits the total number of Ministers in a State to 15% of the total number of members of the Legislative Assembly (with a minimum of 12).'
        },
        {
          id: 'spsc-4-3',
          question: 'Which of the following taxes is levied, collected, and retained entirely by the State Governments in India?',
          options: ['Corporation Tax', 'Land Revenue & Stamp Duty', 'Customs Duty', 'Goods & Services Tax (Integrated GST)'],
          correct: 1,
          explanation: 'Land revenue, agricultural income tax, stamp duty on property transactions, and state excise on alcohol belong exclusively to States.'
        },
        {
          id: 'spsc-4-4',
          question: 'The "Gram Sabha" under Article 243(b) consists of:',
          options: ['All elected ward panchayat members only', 'All persons registered in the electoral rolls relating to a village comprised within the area of Panchayat', 'All land-owning farmers in the village', 'Elected Sarpanch and Up-Sarpanch'],
          correct: 1,
          explanation: 'Gram Sabha is the grassroots body comprising all adult persons registered in the electoral rolls of the village.'
        },
        {
          id: 'spsc-4-5',
          question: 'In state legislative procedure, can the Legislative Council (Vidhan Parishad) permanently veto an ordinary bill passed by the Legislative Assembly?',
          options: ['Yes, it has absolute co-equal veto power', 'No, it can delay an ordinary bill for a maximum period of 4 months (3 months in 1st instance, 1 month in 2nd)', 'It can reject money bills unconditionally', 'It has equal powers to Lok Sabha'],
          correct: 1,
          explanation: 'The Legislative Council has only dilatory power and can delay an ordinary bill for at most 4 months in aggregate; it cannot veto legislation.'
        }
      ],
      // SET 5
      [
        {
          id: 'spsc-5-1',
          question: 'Who is the administrative head of the State Secretariat (Civil Services) in a State Government?',
          options: ['The Chief Minister', 'The Chief Secretary', 'The Principal Secretary to Governor', 'The Director General of Police'],
          correct: 1,
          explanation: 'The Chief Secretary is the highest-ranking executive civil servant and administrative head of the state administrative apparatus.'
        },
        {
          id: 'spsc-5-2',
          question: 'Which Article provides that High Courts in India shall be Courts of Record with power to punish for contempt of itself?',
          options: ['Article 215', 'Article 226', 'Article 227', 'Article 129'],
          correct: 0,
          explanation: 'Article 215 declares every High Court to be a Court of Record having all powers of such a court including the power to punish for its contempt.'
        },
        {
          id: 'spsc-5-3',
          question: 'The "PESA Act" (Panchayats Extension to Scheduled Areas Act, 1996) extends Part IX of the Constitution to:',
          options: ['Urban metropolitan areas', 'Fifth Schedule Scheduled Areas with predominant tribal populations', 'Coastal regulatory zones', 'Union Territories with legislatures'],
          correct: 1,
          explanation: 'PESA (1996) recognized the traditional rights of tribal communities over natural resources through Gram Sabhas in Fifth Schedule areas.'
        },
        {
          id: 'spsc-5-4',
          question: 'What is the role of a "Lokayukta" in Indian State Governance?',
          options: ['To supervise municipal elections', 'An anti-corruption ombudsman investigating allegations against public functionaries', 'To audit state government borrowings', 'To appoint High Court judges'],
          correct: 1,
          explanation: 'The Lokayukta is an independent statutory anti-corruption ombudsman established at the State level to investigate corruption complaints.'
        },
        {
          id: 'spsc-5-5',
          question: 'Which Schedule of the Indian Constitution contains the list of 29 administrative and development subjects transferred to Panchayats?',
          options: ['Ninth Schedule', 'Tenth Schedule', 'Eleventh Schedule', 'Twelfth Schedule'],
          correct: 2,
          explanation: 'The Eleventh Schedule, inserted by the 73rd Amendment, lists 29 functional matters (agriculture, rural housing, drinking water, roads) for PRIs.'
        }
      ]
    ]
  },

  {
    id: 'rbi-grade-b',
    name: 'RBI Grade B & SEBI Economic & Financial Management',
    category: 'Government Exams',
    sector: 'government',
    icon: '📜',
    timeLimit: 180,
    description: 'Macroeconomics, Financial Markets, Monetary Policies, Corporate Governance, and Balance of Payments.',
    questionSets: [
      // SET 1
      [
        {
          id: 'rbi-1-1',
          question: 'What is the primary target variable under the Flexible Inflation Targeting (FIT) framework established by the RBI and Government of India?',
          options: ['Consumer Price Index (Combined) at 4% with a tolerance band of ±2%', 'Wholesale Price Index at 5%', 'GDP Deflator at 3%', 'Core WPI inflation at 4%'],
          correct: 0,
          explanation: 'Under the RBI Act amendment (2016), the inflation target is 4% CPI (Combined) with an upper tolerance limit of 6% and lower limit of 2%.'
        },
        {
          id: 'rbi-1-2',
          question: 'What is the "Trilemma / Impossible Trinity" in open-economy international macroeconomics?',
          options: ['A country cannot simultaneously maintain Fixed Exchange Rate, Free Capital Movement, and Independent Monetary Policy', 'A bank cannot balance High Profitability, Low Liquidity, and High Solvency', 'A government cannot run zero fiscal deficit, low tax rates, and high public investments', 'An economy cannot achieve low unemployment, zero inflation, and high wage growth'],
          correct: 0,
          explanation: 'The Mundell-Fleming Trilemma posits that an economy can choose at most two of the following three: free capital mobility, fixed exchange rates, and autonomous monetary policy.'
        },
        {
          id: 'rbi-1-3',
          question: 'What does "Sterilization" mean in central banking operations?',
          options: ['Clearing bad debts from bank balance sheets', 'Central bank operations (e.g. Open Market Sales of bonds) to neutralize the impact of Forex market interventions on domestic money supply', 'Printing new currency notes to replace soiled ones', 'Freezing bank accounts of delinquent borrowers'],
          correct: 1,
          explanation: 'Sterilization involves offsetting foreign exchange inflows/outflows via domestic open market operations to insulate domestic money supply and inflation.'
        },
        {
          id: 'rbi-1-4',
          question: 'Which curve illustrates the theoretical inverse relationship between the rate of unemployment and the rate of wage/price inflation?',
          options: ['Lorenz Curve', 'Phillips Curve', 'Kuznets Curve', 'Laffer Curve'],
          correct: 1,
          explanation: 'The Phillips Curve demonstrates that in the short run, lower unemployment is associated with higher rates of wage/price inflation.'
        },
        {
          id: 'rbi-1-5',
          question: 'What is the role of the "Standing Deposit Facility" (SDF) introduced by RBI in 2022?',
          options: ['To provide subsidized credit to MSME exporters', 'An uncollateralized liquidity absorption facility allowing banks to park surplus funds with RBI at a rate higher than reverse repo without collateral', 'To fund central government infrastructure deficit', 'To guarantee retail fixed deposits'],
          correct: 1,
          explanation: 'SDF absorbs liquidity from commercial banks without requiring the RBI to pledge government securities as collateral, operating as the floor of the LAF corridor.'
        }
      ],
      // SET 2
      [
        {
          id: 'rbi-2-1',
          question: 'What is the "Marginal Standing Facility" (MSF) rate in RBI monetary operations?',
          options: ['The rate at which scheduled banks can borrow overnight emergency funds from RBI against eligible SLR securities exceeding normal borrowing limits', 'The minimum interest rate for retail savings accounts', 'The penal rate charged on tax evaders', 'The exchange rate for buying Special Drawing Rights'],
          correct: 0,
          explanation: 'MSF is a penal rate at which commercial banks can borrow overnight funds from RBI by dipping up to a prescribed percentage into their SLR quota.'
        },
        {
          id: 'rbi-2-2',
          question: 'The "Laffer Curve" in public finance depicts the relationship between:',
          options: ['Income inequality and economic development', 'Tax rates and total tax revenue collected by the government', 'Inflation and unemployment', 'Foreign exchange reserves and import cover'],
          correct: 1,
          explanation: 'The Laffer Curve shows that beyond an optimal tax rate, higher tax rates diminish economic activity and lower overall tax revenue collected.'
        },
        {
          id: 'rbi-2-3',
          question: 'In the Balance of Payments (BoP) accounting, which account records Foreign Direct Investment (FDI) and External Commercial Borrowings (ECB)?',
          options: ['Current Account', 'Capital and Financial Account', 'Merchandise Trade Account', 'Invisibles Transfer Account'],
          correct: 1,
          explanation: 'FDI, FPI/FII investments, external commercial borrowings, and NRI bank deposits are recorded in the Capital and Financial Account.'
        },
        {
          id: 'rbi-2-4',
          question: 'What is "Moral Suasion" when used as a qualitative credit control instrument by a central bank?',
          options: ['Legal prosecution of defaulting bank directors', 'Persuasion, informal advice, and requests made by the central bank to commercial banks to adhere to monetary directives', 'Imposing direct fines on depositors', 'Statutory revision of Cash Reserve Ratio'],
          correct: 1,
          explanation: 'Moral Suasion is a qualitative method wherein the central bank uses advisory communication to convince banks to align with policy goals.'
        },
        {
          id: 'rbi-2-5',
          question: 'What is the "Liquidity Coverage Ratio" (LCR) requirement under Basel III banking guidelines?',
          options: ['Banks must maintain sufficient High-Quality Liquid Assets (HQLA) to survive a 30-day severe liquidity stress scenario', 'Banks must lend 40% of their assets to agricultural sectors', 'Banks must maintain 100% cash backing for all savings accounts', 'Banks cannot borrow more than 10% of their equity capital'],
          correct: 0,
          explanation: 'LCR requires banks to hold an adequate stock of unencumbered HQLA that can be converted to cash to meet 30-day net cash outflows.'
        }
      ],
      // SET 3
      [
        {
          id: 'rbi-3-1',
          question: 'What does "Gross Value Added" (GVA) at basic prices measure in national income accounting?',
          options: ['GDP minus Depreciation', 'Total value of goods and services produced in an economy minus intermediate consumption, plus production taxes less production subsidies', 'Gross national product plus foreign remittances', 'Total household consumption expenditure'],
          correct: 1,
          explanation: 'GVA measures the sector-wise value generated in an economy: GVA at basic prices = Output - Intermediate consumption + Production taxes - Production subsidies.'
        },
        {
          id: 'rbi-3-2',
          question: 'Which indicator is used to measure income or wealth inequality within a country, where 0 indicates perfect equality and 1 indicates perfect inequality?',
          options: ['Human Development Index (HDI)', 'Gini Coefficient', 'Misery Index', 'Consumer Confidence Index'],
          correct: 1,
          explanation: 'The Gini Coefficient, derived from the Lorenz Curve, quantifies economic dispersion with 0 being absolute equality and 1 being complete inequality.'
        },
        {
          id: 'rbi-3-3',
          question: 'What is an "Open Market Operation" (OMO) conducted by the Reserve Bank of India?',
          options: ['Selling shares of public sector banks to the general public', 'Outright purchase or sale of government securities in the open market to expand or contract rupee liquidity', 'Regulating daily stock exchange opening hours', 'Fixing statutory minimum export prices for wheat'],
          correct: 1,
          explanation: 'OMOs are market operations where RBI buys sovereign bonds to inject liquidity or sells bonds to absorb surplus cash from the market.'
        },
        {
          id: 'rbi-3-4',
          question: 'In Corporate Governance, what is the role of an "Independent Director" on the board of a listed company under the Companies Act 2013?',
          options: ['To manage daily factory operations', 'To provide unbiased, objective judgement and protect the interests of minority shareholders without pecuniary ties to promoters', 'To represent government trade unions', 'To audit company tax returns'],
          correct: 1,
          explanation: 'Independent directors bring independent perspective and safeguard the rights of minority shareholders and institutional stakeholders.'
        },
        {
          id: 'rbi-3-5',
          question: 'What is the "Current Account Deficit" (CAD) in the external economic sector?',
          options: ['When total value of imported goods and services exceeds total value of exported goods, services, and net international transfers', 'When government budget expenditure exceeds tax receipts', 'When total foreign exchange reserves decline to zero', 'When banking NPAs exceed capital reserves'],
          correct: 0,
          explanation: 'CAD occurs when a nation imports more goods, services, and capital transfers than it exports to the rest of the world.'
        }
      ],
      // SET 4
      [
        {
          id: 'rbi-4-1',
          question: 'What are "Special Drawing Rights" (SDRs) created by the International Monetary Fund (IMF)?',
          options: ['An international supplementary reserve asset defined as a basket of five major currencies', 'A physical gold-backed cryptocurrency', 'Direct commercial loans granted to private corporations', 'Bilateral trade vouchers between emerging economies'],
          correct: 0,
          explanation: 'SDRs are an international reserve currency unit created by IMF based on a weighted basket of US Dollar, Euro, Chinese Yuan, Japanese Yen, and British Pound.'
        },
        {
          id: 'rbi-4-2',
          question: 'What is the "Net Stable Funding Ratio" (NSFR) introduced under Basel III framework?',
          options: ['Requires banks to maintain a stable funding profile in relation to the composition of their assets and off-balance sheet activities over a 1-year horizon', 'Requires 100% gold reserves for international branches', 'Limits bank dividend payouts to 5% of profit', 'Mandates zero exposure to corporate debt'],
          correct: 0,
          explanation: 'NSFR aims to ensure banks maintain resilient long-term funding to support their assets and activities over an extended 1-year time horizon.'
        },
        {
          id: 'rbi-4-3',
          question: 'What does "Crowding Out Effect" mean in macroeconomics?',
          options: ['When private consumption decreases due to high personal income taxes', 'When heavy government borrowing drives up real interest rates, reducing private sector investment and capital expenditure', 'When rural populations migrate en masse to metropolitan cities', 'When multinational corporations acquire domestic small businesses'],
          correct: 1,
          explanation: 'Crowding out occurs when expansionary fiscal policy funded by public debt raises market interest rates, choking out private commercial borrowing.'
        },
        {
          id: 'rbi-4-4',
          question: 'What is the primary objective of "Forward Guidance" in modern central bank communication?',
          options: ['Publishing daily foreign exchange rates in advance', 'Providing explicit communication regarding the anticipated future path of monetary policy interest rates to guide market expectations', 'Predicting monsoon crop output', 'Ordering mandatory wage increases'],
          correct: 1,
          explanation: 'Forward guidance is a central bank communication tool informing the public about the future trajectory of monetary policy.'
        },
        {
          id: 'rbi-4-5',
          question: 'Which of the following is a leading indicator of an economic business cycle?',
          options: ['Unemployment rate', 'Manufacturing Purchasing Managers’ Index (PMI) & Stock Market indices', 'Corporate bankruptcy statistics', 'Consumer price index for past year'],
          correct: 1,
          explanation: 'PMI and stock indices are leading indicators that shift before the broader real economy begins to follow a particular trend.'
        }
      ],
      // SET 5
      [
        {
          id: 'rbi-5-1',
          question: 'What is "Headline Inflation" versus "Core Inflation"?',
          options: ['Headline inflation is the total CPI inflation including all items (including food and fuel), whereas Core inflation excludes volatile food and energy components', 'Headline is calculated monthly while Core is calculated annually', 'Headline is for wholesale prices and Core is for retail prices', 'Headline is only for imported goods'],
          correct: 0,
          explanation: 'Headline inflation measures comprehensive price inflation across the entire consumption basket, including volatile food and fuel prices.'
        },
        {
          id: 'rbi-5-2',
          question: 'What is the "Capital Adequacy Ratio" (CAR) mandated by RBI for Indian Scheduled Commercial Banks under Basel III?',
          options: ['Minimum 8%', 'Minimum 9% (11.5% including Capital Conservation Buffer)', 'Minimum 15%', 'Minimum 20%'],
          correct: 1,
          explanation: 'RBI prescribes a minimum Tier-1 + Tier-2 capital ratio of 9%, plus a 2.5% Capital Conservation Buffer (CCB), totaling 11.5% for Indian SCBs.'
        },
        {
          id: 'rbi-5-3',
          question: 'In monetary economics, what does "Velocity of Money" represent?',
          options: ['The speed of electronic wire transfers', 'The average number of times a single unit of currency changes hands in purchasing final goods and services within a given time period', 'The annual rate of currency depreciation against the US Dollar', 'The speed at which central banks print paper currency'],
          correct: 1,
          explanation: 'Velocity of Money (V in the Equation of Exchange MV = PY) measures the frequency at which a unit of money is spent on new domestic goods.'
        },
        {
          id: 'rbi-5-4',
          question: 'What is "Quantitative Easing" (QE)?',
          options: ['A restrictive monetary policy raising interest rates to combat inflation', 'An unconventional monetary policy where central banks purchase large-scale long-term sovereign and private assets to directly inject liquidity and lower long-term yields', 'Devaluing domestic currency by executive order', 'Fixing statutory limits on bank lending'],
          correct: 1,
          explanation: 'Quantitative Easing is an unconventional asset-purchase program to lower long-term interest rates and stimulate economic activity when policy rates approach zero.'
        },
        {
          id: 'rbi-5-5',
          question: 'What is the "Primary Deficit" of the Government of India?',
          options: ['Fiscal Deficit minus Net Interest Payments on accumulated public debt', 'Revenue Deficit minus Capital Expenditure', 'Total Borrowings minus Forex Reserves', 'Budget Deficit plus Foreign Aid'],
          correct: 0,
          explanation: 'Primary Deficit = Fiscal Deficit - Interest Payments, showing government borrowing requirements exclusively for current fiscal policies excluding legacy debt interest.'
        }
      ]
    ]
  },

  {
    id: 'ssc-chsl',
    name: 'SSC CHSL & MTS Combined Examination',
    category: 'Government Exams',
    sector: 'government',
    icon: '🏛️',
    timeLimit: 180,
    description: 'General Intelligence, English Language, Quantitative Aptitude, and General Awareness for 10th & 12th level exams.',
    questionSets: [
      // SET 1
      [
        {
          id: 'chsl-1-1',
          question: 'Select the synonym of the word: "CANDID"',
          options: ['Frank / Honest', 'Deceptive', 'Shy', 'Arrogant'],
          correct: 0,
          explanation: '"Candid" means truthful, outspoken, and straightforward. Synonyms: Frank, Honest, Forthright.'
        },
        {
          id: 'chsl-1-2',
          question: 'If 15 men can build a wall in 20 days, in how many days can 25 men build the same wall working at the same pace?',
          options: ['10 days', '12 days', '14 days', '16 days'],
          correct: 1,
          explanation: 'M1 × D1 = M2 × D2 => 15 × 20 = 25 × D2 => 300 = 25 × D2 => D2 = 12 days.'
        },
        {
          id: 'chsl-1-3',
          question: 'Who was the first female Prime Minister of India?',
          options: ['Sarojini Naidu', 'Indira Gandhi', 'Pratibha Patil', 'Sucheta Kripalani'],
          correct: 1,
          explanation: 'Indira Gandhi served as the first and only woman Prime Minister of India from 1966 to 1977 and 1980 to 1984.'
        },
        {
          id: 'chsl-1-4',
          question: 'Identify the antonym of the word: "DILIGENT"',
          options: ['Hardworking', 'Lazy / Indolent', 'Careful', 'Active'],
          correct: 1,
          explanation: '"Diligent" means showing care and conscientiousness in work. Its opposite is Lazy or Indolent.'
        },
        {
          id: 'chsl-1-5',
          question: 'What is the capital city of Australia?',
          options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
          correct: 2,
          explanation: 'Canberra is the federal capital city of Australia, purpose-built following the federation of Australian colonies.'
        }
      ],
      // SET 2
      [
        {
          id: 'chsl-2-1',
          question: 'Find the average of the first 5 prime numbers: 2, 3, 5, 7, 11.',
          options: ['5.0', '5.6', '6.0', '6.2'],
          correct: 1,
          explanation: 'Sum = 2 + 3 + 5 + 7 + 11 = 28. Average = 28 / 5 = 5.6.'
        },
        {
          id: 'chsl-2-2',
          question: 'Choose the correctly spelt word:',
          options: ['Accomodation', 'Accommodation', 'Acommodation', 'Accomodasion'],
          correct: 1,
          explanation: 'The correct spelling is "Accommodation" (double c, double m).'
        },
        {
          id: 'chsl-2-3',
          question: 'Which gas is filled inside electric bulbs to prevent oxidation of the tungsten filament?',
          options: ['Oxygen', 'Argon / Nitrogen', 'Hydrogen', 'Chlorine'],
          correct: 1,
          explanation: 'Argon (an inert noble gas) or nitrogen is filled in incandescent bulbs to retard the evaporation of tungsten.'
        },
        {
          id: 'chsl-2-4',
          question: 'If South becomes East and West becomes South, what will North-West become?',
          options: ['South-East', 'South-West', 'North-East', 'North-West'],
          correct: 0,
          explanation: 'The compass rotates 90° counter-clockwise. North-West rotated 90° counter-clockwise becomes South-West (or 90° clockwise maps NW to NE; here South->East is 90° CCW, so NW becomes SW).'
        },
        {
          id: 'chsl-2-5',
          question: 'Who founded the "Arya Samaj" in Bombay in 1875?',
          options: ['Swami Dayananda Saraswati', 'Raja Ram Mohan Roy', 'Swami Vivekananda', 'Ishwar Chandra Vidyasagar'],
          correct: 0,
          explanation: 'Swami Dayananda Saraswati founded Arya Samaj with the clarion call "Go back to the Vedas".'
        }
      ],
      // SET 3
      [
        {
          id: 'chsl-3-1',
          question: 'A car covers 300 km in 5 hours. What is its speed in meters per second (m/s)?',
          options: ['15 m/s', '16.67 m/s', '18.5 m/s', '20 m/s'],
          correct: 1,
          explanation: 'Speed = 300 km / 5 h = 60 km/h. In m/s: 60 × (5/18) = 300 / 18 ≈ 16.67 m/s.'
        },
        {
          id: 'chsl-3-2',
          question: 'Select the meaning of the idiom: "A Blessing in Disguise"',
          options: ['An apparent misfortune that eventually has good results', 'A holy prayer said before dinner', 'A dangerous mistake', 'A hidden secret betrayed by friends'],
          correct: 0,
          explanation: 'A blessing in disguise is something that appears bad or unfortunate initially but results in an unexpected positive outcome.'
        },
        {
          id: 'chsl-3-3',
          question: 'Which vitamin is synthesized in human skin when exposed to sunlight (UVB rays)?',
          options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
          correct: 3,
          explanation: 'Vitamin D (cholecalciferol) is synthesized in the epidermal layers of skin upon exposure to solar UVB radiation.'
        },
        {
          id: 'chsl-3-4',
          question: 'Find the value of: 125% of 640 + 50% of 320.',
          options: ['800', '960', '1000', '1060'],
          correct: 1,
          explanation: '125% of 640 = (5/4) × 640 = 800. 50% of 320 = 160. Total = 800 + 160 = 960.'
        },
        {
          id: 'chsl-3-5',
          question: 'The Kaziranga National Park in Assam is famous for which endangered animal?',
          options: ['Royal Bengal Tiger', 'Great One-horned Rhinoceros', 'Asiatic Lion', 'Snow Leopard'],
          correct: 1,
          explanation: 'Kaziranga National Park in Assam hosts two-thirds of the world’s great one-horned rhinoceroses.'
        }
      ],
      // SET 4
      [
        {
          id: 'chsl-4-1',
          question: 'Complete the analogy: Book : Author :: Statue : ?',
          options: ['Painter', 'Sculptor', 'Mason', 'Poet'],
          correct: 1,
          explanation: 'An author creates a book; a sculptor creates a statue.'
        },
        {
          id: 'chsl-4-2',
          question: 'What is the sum of interior angles of a convex Pentagon (5 sides)?',
          options: ['360°', '540°', '720°', '900°'],
          correct: 1,
          explanation: 'Sum of interior angles = (n - 2) × 180° = (5 - 2) × 180° = 3 × 180° = 540°.'
        },
        {
          id: 'chsl-4-3',
          question: 'Which Indian classical dance form originated in the state of Kerala?',
          options: ['Bharatanatyam', 'Kathakali & Mohiniyattam', 'Kathak', 'Kuchipudi'],
          correct: 1,
          explanation: 'Kathakali (dance drama with vibrant facial makeup) and Mohiniyattam originated in Kerala.'
        },
        {
          id: 'chsl-4-4',
          question: 'Change into Passive Voice: "The teacher praised the boy."',
          options: ['The boy was praised by the teacher.', 'The boy is praised by the teacher.', 'The boy had been praised.', 'The teacher was praised by the boy.'],
          correct: 0,
          explanation: 'Simple past passive structure is: Object + was/were + past participle (V3) + by + Subject.'
        },
        {
          id: 'chsl-4-5',
          question: 'Which instrument is used to measure atmospheric pressure?',
          options: ['Thermometer', 'Barometer', 'Hygrometer', 'Anemometer'],
          correct: 1,
          explanation: 'A Barometer (invented by Evangelista Torricelli) is used to measure atmospheric pressure.'
        }
      ],
      // SET 5
      [
        {
          id: 'chsl-5-1',
          question: 'If the selling price of 10 articles is equal to the cost price of 12 articles, what is the profit percentage?',
          options: ['15%', '20%', '25%', '30%'],
          correct: 1,
          explanation: 'SP of 10 = CP of 12 => SP/CP = 12/10 = 6/5. Profit % = [(6 - 5)/5] × 100 = (1/5) × 100 = 20%.'
        },
        {
          id: 'chsl-5-2',
          question: 'Select the one-word substitute: "A person who loves books and reading."',
          options: ['Bibliophile', 'Philatelist', 'Polyglot', 'Misogynist'],
          correct: 0,
          explanation: 'A "Bibliophile" is an individual with a passionate love for collecting and reading books.'
        },
        {
          id: 'chsl-5-3',
          question: 'Which is the longest river in Peninsular India (Dakshin Ganga)?',
          options: ['Krishna', 'Godavari', 'Cauvery', 'Narmada'],
          correct: 1,
          explanation: 'Godavari (length 1,465 km) is the longest river of peninsular India, originating in Trimbakeshwar, Maharashtra.'
        },
        {
          id: 'chsl-5-4',
          question: 'Solve for x: 3x - 7 = 20.',
          options: ['7', '8', '9', '10'],
          correct: 2,
          explanation: '3x = 20 + 7 = 27 => x = 27 / 3 = 9.'
        },
        {
          id: 'chsl-5-5',
          question: 'Which layer of Earth’s atmosphere reflects radio waves back to Earth for telecommunication?',
          options: ['Troposphere', 'Stratosphere', 'Ionosphere / Thermosphere', 'Exosphere'],
          correct: 2,
          explanation: 'The Ionosphere contains ionized particles that reflect medium and shortwave radio signals back to ground receivers.'
        }
      ]
    ]
  },

  /* =========================================================================
     IT & TECHNICAL SECTOR EXAMS (6 EXAMS, 5 SETS EACH = 150 QUESTIONS)
     ========================================================================= */
  {
    id: 'c-lang',
    name: 'C Programming Core & Systems Test',
    category: 'IT & Technical',
    sector: 'it',
    icon: '💻',
    timeLimit: 180,
    description: 'Pointers, memory management, preprocessors, arrays, dynamic allocation, and standard I/O in C.',
    questionSets: [
      // SET 1
      [
        {
          id: 'c-1-1',
          question: 'What is the output of sizeof("SkillSync") on a standard 64-bit compiler in C?',
          options: ['9 bytes (8 chars + 1 null terminator)', '8 bytes', '4 bytes', '10 bytes'],
          correct: 0,
          explanation: 'String literals in C include the trailing null terminator (`\\0`). "SkillSync" has 8 characters + 1 `\\0` = 9 bytes.'
        },
        {
          id: 'c-1-2',
          question: 'Which function allocates contiguous memory and initializes all allocated bytes to zero?',
          options: ['malloc()', 'calloc()', 'realloc()', 'allocmem()'],
          correct: 1,
          explanation: '`calloc(n, size)` initializes memory to zero, whereas `malloc()` leaves memory contents uninitialized (garbage values).'
        },
        {
          id: 'c-1-3',
          question: 'What happens when you increment a pointer `int *ptr` where `sizeof(int) == 4`?',
          options: ['The address in `ptr` increases by 1 byte', 'The address in `ptr` increases by 4 bytes', 'The value pointed to increases by 1', 'Compile-time error'],
          correct: 1,
          explanation: 'Pointer arithmetic scales by the byte size of the underlying data type. Incrementing `int*` adds `sizeof(int)` (4 bytes) to the address.'
        },
        {
          id: 'c-1-4',
          question: 'Which storage class in C ensures that a variable retains its value between multiple function invocations?',
          options: ['auto', 'register', 'static', 'extern'],
          correct: 2,
          explanation: '`static` local variables are initialized once and persist in the data segment throughout the lifetime of the program.'
        },
        {
          id: 'c-1-5',
          question: 'What is the result of dereferencing a dangling pointer in C?',
          options: ['Automatic garbage collection', 'Memory leak only', 'Undefined behavior (potential segmentation fault or memory corruption)', 'Compilation error'],
          correct: 2,
          explanation: 'A dangling pointer points to deallocated memory (`free()`). Dereferencing it causes undefined behavior.'
        }
      ],
      // SET 2
      [
        {
          id: 'c-2-1',
          question: 'What is the difference between `#include <file.h>` and `#include "file.h"` in the C preprocessor?',
          options: ['Angle brackets search current directory first; quotes search system libraries', 'Quotes search current directory first, then system path; angle brackets search system paths first', 'Both are completely identical in modern compilers', 'Angle brackets only work for C standard headers'],
          correct: 1,
          explanation: '`#include "file.h"` searches the source file’s directory first before searching standard system directories.'
        },
        {
          id: 'c-2-2',
          question: 'What does the `volatile` keyword prevent the C compiler from doing?',
          options: ['Allocating memory on the heap', 'Optimizing reads/writes by caching variable values in CPU registers', 'Modifying the variable from interrupt handlers', 'Passing the variable as a function argument'],
          correct: 1,
          explanation: '`volatile` informs the compiler that the variable’s value may change asynchronously (e.g. hardware registers, ISRs), preventing register caching optimizations.'
        },
        {
          id: 'c-2-3',
          question: 'What is the output of `printf("%d", 5 >> 1)` in C?',
          options: ['10', '2', '2.5', '1'],
          correct: 1,
          explanation: 'Bitwise right shift `5 >> 1` divides 5 by 2 using integer truncation, resulting in 2 (binary `101 >> 1 = 010`).'
        },
        {
          id: 'c-2-4',
          question: 'Which function should be used to safely read a string from stdin without causing buffer overflows?',
          options: ['gets()', 'scanf("%s")', 'fgets() with bounded buffer size', 'puts()'],
          correct: 2,
          explanation: '`fgets(buffer, sizeof(buffer), stdin)` limits the maximum number of characters read, preventing buffer overflow vulnerabilities.'
        },
        {
          id: 'c-2-5',
          question: 'In C, what is a `void*` pointer?',
          options: ['A pointer that points to nothing and causes compiler crashes', 'A generic pointer that can hold the address of any data type without type casting', 'A pointer stored in read-only ROM', 'A pointer that automatically allocates heap memory'],
          correct: 1,
          explanation: 'A `void*` is a generic pointer in C that can point to any object type without explicit casting.'
        }
      ],
      // SET 3
      [
        {
          id: 'c-3-1',
          question: 'What is the size of a `union` in C containing `int a` (4 bytes), `double b` (8 bytes), and `char c[10]` (10 bytes)?',
          options: ['22 bytes', '8 bytes', '16 bytes (aligned to largest member multiple)', '10 bytes'],
          correct: 2,
          explanation: 'A union’s size is at least as large as its largest member (10 bytes) rounded up to a multiple of its strictest alignment (8 bytes for double) = 16 bytes.'
        },
        {
          id: 'c-3-2',
          question: 'What does the standard library function `realloc(ptr, 0)` do in C?',
          options: ['Allocates 1 MB of extra memory', 'Equivalent to `free(ptr)` and deallocates the block', 'Causes an immediate runtime kernel panic', 'Resets all bytes to zero without resizing'],
          correct: 1,
          explanation: 'Calling `realloc(ptr, 0)` frees the allocated memory pointed to by `ptr` and returns NULL in standard C.'
        },
        {
          id: 'c-3-3',
          question: 'What is the return type of `malloc()` in C?',
          options: ['int*', 'char*', 'void*', 'size_t'],
          correct: 2,
          explanation: '`malloc()` returns a generic pointer `void*` to the allocated memory block, or NULL if memory allocation fails.'
        },
        {
          id: 'c-3-4',
          question: 'What is the purpose of the `enum` keyword in C?',
          options: ['To create dynamic linked lists', 'To define a user-defined type consisting of a set of named integer constants', 'To restrict access to private variables', 'To enforce strict static typing on pointers'],
          correct: 1,
          explanation: 'Enums allow programmers to assign meaningful names to integral constants (starting from 0 by default).'
        },
        {
          id: 'c-3-5',
          question: 'What is the output of `sizeof(char)` according to the ANSI C standard on any compliant platform?',
          options: ['Always exactly 1', '4 bytes on 32-bit systems', '8 bytes on 64-bit systems', 'Architecture dependent'],
          correct: 0,
          explanation: 'By definition in the C standard, `sizeof(char)` is always exactly 1 byte.'
        }
      ],
      // SET 4
      [
        {
          id: 'c-4-1',
          question: 'What is a "memory leak" in C programming?',
          options: ['Reading uninitialized stack memory', 'Allocating heap memory via malloc/calloc without subsequently releasing it via free() before losing reference', 'A segmentation fault due to null pointer dereference', 'Running out of CPU cache lines'],
          correct: 1,
          explanation: 'Memory leaks occur when dynamically allocated heap blocks are never freed, permanently consuming system RAM.'
        },
        {
          id: 'c-4-2',
          question: 'What is the value of `EOF` defined in `<stdio.h>` in standard C?',
          options: ['0', '1', 'A negative integer (commonly -1)', 'NULL'],
          correct: 2,
          explanation: '`EOF` (End of File) is a macro defined in `<stdio.h>` as a negative integer, typically `-1`.'
        },
        {
          id: 'c-4-3',
          question: 'How are multi-dimensional arrays stored in memory in C?',
          options: ['Column-major order', 'Row-major order', 'Linked pointer blocks', 'Hash indexed blocks'],
          correct: 1,
          explanation: 'C stores multi-dimensional arrays in Row-Major order, meaning consecutive elements of a row are contiguous in physical RAM.'
        },
        {
          id: 'c-4-4',
          question: 'What does the function `memcpy()` do compared to `memmove()` in C?',
          options: ['`memmove()` handles overlapping memory regions safely, whereas `memcpy()` behavior is undefined if source and destination overlap', '`memcpy()` is slower than `memmove()`', '`memcpy()` only works on string literals', 'Both are strictly identical in implementation'],
          correct: 0,
          explanation: '`memmove()` uses an intermediate buffer to handle overlapping memory blocks safely, while `memcpy()` assumes non-overlapping regions.'
        },
        {
          id: 'c-4-5',
          question: 'What happens when a C program tries to modify a string literal, such as `char *str = "hello"; str[0] = \'H\';`?',
          options: ['String is modified in place', 'Undefined behavior (typically crashes with Segmentation Fault due to write on read-only .rodata segment)', 'Compiler automatically converts it to heap array', 'Warning only, executes successfully'],
          correct: 1,
          explanation: 'String literals are stored in read-only memory (.rodata). Attempting to modify them triggers a segmentation fault.'
        }
      ],
      // SET 5
      [
        {
          id: 'c-5-1',
          question: 'Which operator in C has the highest operator precedence?',
          options: ['`*` (Multiplication)', '`++` (Postfix increment)', '`==` (Equality test)', '`&&` (Logical AND)'],
          correct: 1,
          explanation: 'Postfix increment `++` and array subscript `[]` have higher precedence than arithmetic, comparison, or logical operators.'
        },
        {
          id: 'c-5-2',
          question: 'What is the purpose of `setjmp` and `longjmp` in standard C library (`<setjmp.h>`)?',
          options: ['Thread synchronization', 'Non-local jumps across function call stack frames (similar to try-catch exception handling)', 'Dynamic memory reallocation', 'Memory mapped I/O'],
          correct: 1,
          explanation: '`setjmp` saves the execution environment (CPU registers and stack pointer), allowing `longjmp` to restore it for non-local stack recovery.'
        },
        {
          id: 'c-5-3',
          question: 'In C bitwise operations, what does the expression `(x & (x - 1)) == 0` check when `x > 0`?',
          options: ['Whether `x` is an odd number', 'Whether `x` is a power of 2', 'Whether `x` is a prime number', 'Whether `x` is divisible by 4'],
          correct: 1,
          explanation: 'Powers of 2 have exactly one binary bit set. Subtracting 1 flips that bit and sets all lower bits, so `x & (x-1)` evaluates to 0.'
        },
        {
          id: 'c-5-4',
          question: 'What is the default return value of `main()` in C99 standard if no explicit `return` statement is written?',
          options: ['Undefined garbage', '0 (signaling successful execution to OS)', '-1', '1'],
          correct: 1,
          explanation: 'In C99 and later standards, reaching the closing brace `}` of `main()` implicitly returns 0.'
        },
        {
          id: 'c-5-5',
          question: 'What is a "Function Pointer" in C and what is its primary use case?',
          options: ['A pointer that allocates functions dynamically in RAM', 'A pointer variable holding the memory address of an executable function, used for callbacks and event tables', 'A macro to inline functions', 'A pointer that points to function local variables'],
          correct: 1,
          explanation: 'Function pointers store the starting address of executable machine instructions for a function, enabling callbacks, event handlers, and polymorphism in C.'
        }
      ]
    ]
  },

  {
    id: 'java-core',
    name: 'Java Object-Oriented Programming Test',
    category: 'IT & Technical',
    sector: 'it',
    icon: '☕',
    timeLimit: 180,
    description: 'OOP concepts, JVM architecture, multithreading, garbage collection, and Collections framework in Java.',
    questionSets: [
      // SET 1
      [
        {
          id: 'java-1-1',
          question: 'Which of the following statements about the `finally` block in Java exception handling is TRUE?',
          options: ['It only executes if an exception is caught', 'It always executes unless `System.exit(0)` is invoked or JVM crashes', 'It cannot contain try-catch blocks', 'It is mandatory after every `try` block'],
          correct: 1,
          explanation: 'The `finally` block always executes whether an exception occurs or not, except if JVM exits abruptly.'
        },
        {
          id: 'java-1-2',
          question: 'What is the time complexity of retrieving an element by key in a well-distributed `HashMap` in Java?',
          options: ['O(n)', 'O(log n)', 'O(1) average case', 'O(n log n)'],
          correct: 2,
          explanation: 'Hash code indexing gives `HashMap` an average O(1) time complexity for `get()` and `put()` operations.'
        },
        {
          id: 'java-1-3',
          question: 'Which keyword is used in Java to prevent a class from being inherited or a method from being overridden?',
          options: ['static', 'abstract', 'final', 'const'],
          correct: 2,
          explanation: 'The `final` keyword prevents subclassing when applied to classes and overriding when applied to methods.'
        },
        {
          id: 'java-1-4',
          question: 'What is the key difference between `StringBuilder` and `StringBuffer` in Java?',
          options: ['String is mutable; StringBuilder is immutable', 'StringBuffer is thread-safe (synchronized); StringBuilder is faster and unsynchronized', 'StringBuilder is thread-safe; StringBuffer is not', 'Both are identical in performance'],
          correct: 1,
          explanation: '`StringBuffer` methods are synchronized for multi-threaded safety, while `StringBuilder` is unsynchronized and faster for single-threaded usage.'
        },
        {
          id: 'java-1-5',
          question: 'In Java memory management, where are local primitive variables inside a method stored?',
          options: ['Metaspace', 'Heap Memory', 'Thread Stack Memory', 'Direct Byte Buffer'],
          correct: 2,
          explanation: 'Local primitive variables and method call frames are stored on the thread’s Stack, while objects reside on the Heap.'
        }
      ],
      // SET 2
      [
        {
          id: 'java-2-1',
          question: 'What does the `volatile` keyword guarantee when applied to a field in Java multithreading?',
          options: ['Atomicity for compound operations like `count++`', 'Visibility of writes across threads and prevents instruction reordering', 'Automatic mutual exclusion locking like `synchronized`', 'Thread sleep duration guarantee'],
          correct: 1,
          explanation: '`volatile` ensures changes made by one thread are immediately visible to all other threads by flushing to main memory (happens-before relationship).'
        },
        {
          id: 'java-2-2',
          question: 'What is the contract between `equals()` and `hashCode()` methods in Java?',
          options: ['If two objects have the same hashCode, they MUST be equal via equals()', 'If two objects are equal according to `equals()`, they MUST have the same `hashCode()`', '`hashCode()` must return different values for all distinct instances', 'There is no formal contract'],
          correct: 1,
          explanation: 'If `a.equals(b)` returns true, `a.hashCode()` and `b.hashCode()` MUST return identical integers.'
        },
        {
          id: 'java-2-3',
          question: 'Which garbage collector was introduced as the default garbage collector starting in Java 9?',
          options: ['Serial GC', 'Parallel GC', 'Garbage-First (G1) Collector', 'Z Garbage Collector (ZGC)'],
          correct: 2,
          explanation: 'The G1 (Garbage-First) Collector became the default GC in OpenJDK 9, dividing heap into equal sized regions.'
        },
        {
          id: 'java-2-4',
          question: 'What is the difference between `Comparable` and `Comparator` interfaces in Java?',
          options: ['Comparable defines natural ordering via `compareTo()`; Comparator provides custom external sorting strategies via `compare()`', 'Comparator modifies object internal memory', 'Comparable can only sort Strings', 'Both interfaces are deprecated in Java 17'],
          correct: 0,
          explanation: '`Comparable<T>` defines natural sorting inside the class, while `Comparator<T>` allows multiple custom sort orders externally.'
        },
        {
          id: 'java-2-5',
          question: 'What is a "Functional Interface" in Java 8+?',
          options: ['An interface with no methods at all', 'An interface with exactly one abstract method (SAM), annotated with `@FunctionalInterface`', 'An interface with only default static methods', 'An interface that cannot be implemented'],
          correct: 1,
          explanation: 'Functional Interfaces contain exactly one single abstract method (SAM), enabling lambda expressions and method references.'
        }
      ],
      // SET 3
      [
        {
          id: 'java-3-1',
          question: 'What is the purpose of the Java "String Pool" in Heap memory?',
          options: ['To encrypt secret passwords', 'To optimize memory utilization by sharing identical immutable string literals', 'To convert strings to integers automatically', 'To store SQL database connection strings'],
          correct: 1,
          explanation: 'The String Constant Pool stores unique immutable string literal instances to prevent redundant memory allocations.'
        },
        {
          id: 'java-3-2',
          question: 'What is the consequence of catching `Throwable` or `Error` (like `OutOfMemoryError`) in application business logic?',
          options: ['It guarantees 100% fault-tolerant recovery', 'Anti-pattern that may mask fatal JVM subsystem corruptions and prevent clean termination', 'Speeds up JVM garbage collection by 30%', 'Required for enterprise microservices'],
          correct: 1,
          explanation: 'Errors represent serious unrecoverable JVM conditions that applications should not attempt to catch or mask.'
        },
        {
          id: 'java-3-3',
          question: 'Which data structure does `ConcurrentHashMap` use in Java 8+ to handle high write concurrency?',
          options: ['Segment-based coarse locks', 'CAS (Compare-And-Swap) operations and synchronized locking at individual bucket level (Node heads)', 'Single global reentrant lock', 'Read-Write lock over entire table'],
          correct: 1,
          explanation: 'Java 8+ `ConcurrentHashMap` replaced segments with lock-free CAS on empty buckets and synchronized locks on individual bucket head nodes.'
        },
        {
          id: 'java-3-4',
          question: 'What is the difference between `Callable<T>` and `Runnable` in Java concurrency?',
          options: ['Callable can return a generic result and throw checked exceptions; Runnable cannot', 'Runnable runs on GPU, Callable runs on CPU', 'Callable cannot be passed to ExecutorService', 'Both are identical in method signatures'],
          correct: 0,
          explanation: '`Callable<V>` defines `V call() throws Exception`, allowing return values and exception propagation, whereas `Runnable` returns void.'
        },
        {
          id: 'java-3-5',
          question: 'What does the `transient` keyword signify when applied to a class member variable in Java?',
          options: ['The variable is stored in flash drive memory', 'The variable is excluded from standard Java Object Serialization', 'The variable cannot be accessed by other threads', 'The variable must be initialized in static block'],
          correct: 1,
          explanation: '`transient` fields are ignored during JVM serialization and are not persisted to streams.'
        }
      ],
      // SET 4
      [
        {
          id: 'java-4-1',
          question: 'In Java Streams API, what is the difference between intermediate and terminal operations?',
          options: ['Intermediate operations are lazy and return a new Stream; terminal operations trigger pipeline evaluation and produce a result/side-effect', 'Terminal operations can only run once per day', 'Intermediate operations destroy the stream', 'Terminal operations must be written in parallel'],
          correct: 0,
          explanation: 'Intermediate operations (e.g. `map()`, `filter()`) are lazily evaluated until a terminal operation (e.g. `collect()`, `forEach()`) is invoked.'
        },
        {
          id: 'java-4-2',
          question: 'What is the purpose of `Optional<T>` introduced in Java 8?',
          options: ['To replace all boolean flags in classes', 'To provide a container type to represent nullable return values explicitly and eliminate `NullPointerException` bugs', 'To make methods run optionally based on CPU load', 'To serialize JSON responses'],
          correct: 1,
          explanation: '`Optional<T>` explicitly signals the potential absence of a value in method return signatures.'
        },
        {
          id: 'java-4-3',
          question: 'What is the time complexity of adding an element to an `ArrayList` when capacity expansion (resizing) is required?',
          options: ['O(1) amortized, but O(n) during the specific resize array copy operation', 'O(log n) always', 'O(n²) worst case', 'O(1) strictly always'],
          correct: 0,
          explanation: 'Appending is O(1) amortized, but when the underlying array fills up, copying elements to a 1.5x larger array takes O(n) time.'
        },
        {
          id: 'java-4-4',
          question: 'What are Java Records introduced as a standard feature in Java 16?',
          options: ['Database table rows only', 'Concise syntax for immutable data carrier classes with auto-generated constructor, getters, equals, and hashCode', 'Replacement for all Spring Boot controllers', 'Legacy JDBC drivers'],
          correct: 1,
          explanation: 'Records (`record Point(int x, int y) {}`) automatically generate immutable fields, constructors, accessors, and boilerplate methods.'
        },
        {
          id: 'java-4-5',
          question: 'Which design pattern is implemented when a class has a private constructor and a `static getInstance()` method?',
          options: ['Factory Method Pattern', 'Singleton Pattern', 'Observer Pattern', 'Decorator Pattern'],
          correct: 1,
          explanation: 'The Singleton Pattern restricts class instantiation to a single global instance.'
        }
      ],
      // SET 5
      [
        {
          id: 'java-5-1',
          question: 'What is "Type Erasure" in Java Generics?',
          options: ['Erasing all comments before compilation', 'The compiler removes all generic type parameter information at compile time and inserts casts to maintain backward compatibility with older JVM bytecode', 'Replacing classes with interfaces', 'Preventing polymorphic method overrides'],
          correct: 1,
          explanation: 'Type erasure strips generic type arguments (e.g., `List<String>` becomes raw `List`) during compilation.'
        },
        {
          id: 'java-5-2',
          question: 'What are "Virtual Threads" introduced in Project Loom (Java 21)?',
          options: ['Operating system kernel threads mapped 1:1', 'Lightweight user-mode threads managed by the JVM that drastically reduce the resource cost of high-throughput concurrent I/O', 'Threads that execute only on cloud servers', 'Simulated threads in IDE debuggers'],
          correct: 1,
          explanation: 'Virtual threads are lightweight JVM-managed threads allowing applications to spawn millions of concurrent tasks with minimal memory overhead.'
        },
        {
          id: 'java-5-3',
          question: 'What is the difference between `peek()` and `poll()` methods in Java `Queue` interface?',
          options: ['`peek()` examines the head element without removing it; `poll()` retrieves and removes the head element (or returns null if empty)', '`poll()` throws NoSuchElementException on empty queue; `peek()` never does', '`peek()` reverses the queue order', 'Both methods remove elements'],
          correct: 0,
          explanation: '`peek()` inspects the head element non-destructively, whereas `poll()` dequeues and returns the element.'
        },
        {
          id: 'java-5-4',
          question: 'What happens when you invoke `Thread.start()` versus `Thread.run()` in Java?',
          options: ['`start()` creates a new OS thread of execution and calls run() asynchronously; direct call to `run()` executes synchronously on the current calling thread', 'Both launch new threads', '`run()` is deprecated', '`start()` pauses thread execution'],
          correct: 0,
          explanation: 'Calling `start()` allocates a new thread stack frame and invokes `run()` asynchronously, whereas calling `run()` directly is just a standard synchronous method call.'
        },
        {
          id: 'java-5-5',
          question: 'What is the purpose of the `@SafeVarargs` annotation in Java?',
          options: ['Encrypts varargs arguments at runtime', 'Suppresses compiler warnings about unchecked heap pollution when using generic varargs parameters', 'Forces varargs array to be immutable', 'Allocates varargs arrays on the off-heap buffer'],
          correct: 1,
          explanation: '`@SafeVarargs` asserts to the compiler that the method implementation does not perform unsafe operations on its generic varargs parameter array.'
        }
      ]
    ]
  },

  {
    id: 'python-core',
    name: 'Python Advanced & Core Skills Test',
    category: 'IT & Technical',
    sector: 'it',
    icon: '🐍',
    timeLimit: 180,
    description: 'Data structures, list comprehensions, decorators, generators, GIL, and memory management in Python.',
    questionSets: [
      // SET 1
      [
        {
          id: 'py-1-1',
          question: 'What is the primary purpose of the `yield` keyword in a Python function?',
          options: ['To terminate the function and return a list', 'To pause execution and turn the function into a generator object yielding values lazily', 'To handle runtime exceptions', 'To define an asynchronous coroutine'],
          correct: 1,
          explanation: '`yield` turns a function into a generator, producing values one by one on-demand without loading the entire collection into RAM.'
        },
        {
          id: 'py-1-2',
          question: 'What will be the output of `[x**2 for x in range(5) if x % 2 != 0]` in Python?',
          options: ['[1, 9]', '[0, 4, 16]', '[1, 4, 9]', '[1, 9, 25]'],
          correct: 0,
          explanation: '`range(5)` yields 0, 1, 2, 3, 4. Odd numbers are 1 and 3. Squaring them yields 1² = 1 and 3² = 9 => `[1, 9]`.'
        },
        {
          id: 'py-1-3',
          question: 'What is the role of the Global Interpreter Lock (GIL) in standard CPython?',
          options: ['It prevents CPU overheating', 'It is a mutex ensuring only one native thread executes Python bytecode at a time', 'It automatically parallelizes loops across multiple cores', 'It encrypts source code files'],
          correct: 1,
          explanation: 'The CPython GIL prevents race conditions in reference-counting memory management by allowing only one thread to execute bytecode at once.'
        },
        {
          id: 'py-1-4',
          question: 'Which of the following built-in Python data structures is mutable?',
          options: ['tuple', 'frozenset', 'str', 'dict'],
          correct: 3,
          explanation: 'Dictionaries (`dict`), lists (`list`), and sets (`set`) are mutable in Python. Tuples, strings, and frozensets are immutable.'
        },
        {
          id: 'py-1-5',
          question: 'What does the `@functools.wraps` decorator do when authoring custom decorators in Python?',
          options: ['Optimizes execution speed by 50%', 'Preserves the original function’s metadata (like `__name__`, `__doc__`, and signature)', 'Forces the decorated function to run asynchronously', 'Automatically caches function return values'],
          correct: 1,
          explanation: '`@functools.wraps` copies original function attributes (docstrings, name, annotations) onto the inner wrapper function.'
        }
      ],
      // SET 2
      [
        {
          id: 'py-2-1',
          question: 'What is the difference between `is` and `==` operators in Python?',
          options: ['`is` checks identity (same memory address via id()); `==` checks value equality', '`==` checks memory address; `is` checks value', 'Both are strictly identical', '`is` only works on booleans'],
          correct: 0,
          explanation: '`is` checks whether two variables refer to the exact same object in memory (`id(a) == id(b)`), while `==` checks value equivalence.'
        },
        {
          id: 'py-2-2',
          question: 'What happens when you pass a mutable default argument like `def add_item(item, lst=[]):` in Python?',
          options: ['A new empty list is created on each function invocation', 'The default list is instantiated once at function definition time and shared across all subsequent invocations', 'Python raises a SyntaxError at compile time', 'The list is deleted after the function returns'],
          correct: 1,
          explanation: 'Default arguments in Python are evaluated once when the function is defined, causing mutable defaults (like `[]` or `{}`) to persist across calls.'
        },
        {
          id: 'py-2-3',
          question: 'How does Python implement garbage collection for cyclic references (e.g. Object A referencing Object B referencing Object A)?',
          options: ['Reference counting alone cleans them immediately', 'A generational cycle-detecting garbage collector that traverses object reachability graphs', 'Manual developer deallocation only', 'Cyclic references are prohibited by Python syntax'],
          correct: 1,
          explanation: 'CPython combines immediate Reference Counting with a Generational cyclic garbage collector (`gc` module) to detect and reclaim isolated reference cycles.'
        },
        {
          id: 'py-2-4',
          question: 'What is the output of `print(type((1)))` vs `print(type((1,)))` in Python?',
          options: ['`<class \'int\'>` and `<class \'tuple\'>`', '`<class \'tuple\'>` and `<class \'tuple\'>`', '`<class \'int\'>` and `<class \'list\'>`', 'SyntaxError'],
          correct: 0,
          explanation: 'Parentheses around a single integer `(1)` evaluate as a grouped integer. A trailing comma `(1,)` is required to construct a single-element tuple.'
        },
        {
          id: 'py-2-5',
          question: 'What is the Method Resolution Order (MRO) algorithm used in modern Python 3 multiple inheritance?',
          options: ['Depth-First Search (DFS)', 'C3 Linearization Algorithm', 'Breadth-First Search (BFS)', 'Randomized Priority Search'],
          correct: 1,
          explanation: 'Python uses the C3 Linearization algorithm to construct a deterministic, monotonic Method Resolution Order (MRO) for multiple inheritance.'
        }
      ],
      // SET 3
      [
        {
          id: 'py-3-1',
          question: 'What is the purpose of `__slots__` in a Python class definition?',
          options: ['To define database foreign keys', 'To restrict attribute assignment and prevent the creation of dynamic `__dict__`, significantly reducing memory footprint', 'To make all class methods private', 'To enable multi-threaded execution'],
          correct: 1,
          explanation: '`__slots__` reserves space for a fixed set of attributes, eliminating per-instance `__dict__` overhead and saving substantial RAM.'
        },
        {
          id: 'py-3-2',
          question: 'What is the difference between `deepcopy()` and `copy()` in Python’s `copy` module?',
          options: ['`copy()` creates a shallow copy sharing nested objects; `deepcopy()` recursively duplicates all nested compound objects', '`deepcopy()` deletes the original object', '`copy()` only works on numbers', 'Both are identical in memory effect'],
          correct: 0,
          explanation: 'Shallow copy copies references to nested objects, whereas deep copy recursively clones the entire object hierarchy.'
        },
        {
          id: 'py-3-3',
          question: 'What is the output of `bool([])`, `bool({})`, `bool("")`, and `bool(0)` in Python?',
          options: ['All evaluate to `False`', 'All evaluate to `True`', 'Only `bool(0)` is `False`', 'TypeError'],
          correct: 0,
          explanation: 'In Python, empty sequences (`[]`, `""`), empty mappings (`{}`), and zero numeric values evaluate as falsy (`False`).'
        },
        {
          id: 'py-3-4',
          question: 'What is a "Context Manager" in Python and what methods must a class implement to support the `with` statement?',
          options: ['`__init__` and `__del__`', '`__enter__` and `__exit__`', '`__open__` and `__close__`', '`__start__` and `__finish__`'],
          correct: 1,
          explanation: 'Classes supporting the `with` statement implement `__enter__()` (resource setup) and `__exit__()` (automatic teardown and error handling).'
        },
        {
          id: 'py-3-5',
          question: 'What is the time complexity of looking up a key in a standard Python `dict` on average?',
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
          correct: 2,
          explanation: 'Python dictionaries use compact hash tables, providing O(1) average time complexity for lookups, insertions, and deletions.'
        }
      ],
      // SET 4
      [
        {
          id: 'py-4-1',
          question: 'What does `asyncio` in Python utilize to achieve concurrent execution on a single OS thread?',
          options: ['Operating system preemptive thread scheduling', 'An event loop managing cooperative multitasking via coroutines (`async`/`await`) and tasks', 'Multi-core hardware interrupts', 'Automatic C compilation'],
          correct: 1,
          explanation: '`asyncio` uses an event loop to cooperatively execute coroutines when waiting on non-blocking I/O operations.'
        },
        {
          id: 'py-4-2',
          question: 'What is the purpose of `@property` decorator in Python classes?',
          options: ['To define database column constraints', 'To define getter methods that can be accessed like regular attributes, supporting encapsulation and validation via `@prop.setter`', 'To make class variables static', 'To serialize objects to XML'],
          correct: 1,
          explanation: '`@property` turns a method into a read-only property with syntax like an attribute, allowing seamless validation and encapsulation.'
        },
        {
          id: 'py-4-3',
          question: 'What is the result of `*a, b = [1, 2, 3, 4, 5]` in Python 3 extended iterable unpacking?',
          options: ['`a = [1, 2, 3, 4]` and `b = 5`', '`a = 1` and `b = [2, 3, 4, 5]`', 'SyntaxError', '`a = (1, 2, 3, 4)` and `b = 5`'],
          correct: 0,
          explanation: 'The starred expression `*a` captures all preceding elements into a list `[1, 2, 3, 4]`, and `b` receives the final element `5`.'
        },
        {
          id: 'py-4-4',
          question: 'What is the purpose of `collections.defaultdict` in Python standard library?',
          options: ['It throws KeyError when accessing missing keys', 'It automatically initializes missing keys with a default factory callable (e.g. `list`, `int`) without throwing KeyError', 'It sorts all keys in alphabetical order', 'It prevents dictionary mutation'],
          correct: 1,
          explanation: '`defaultdict(factory)` calls the provided factory function to supply a default value whenever a nonexistent key is accessed.'
        },
        {
          id: 'py-4-5',
          question: 'Which built-in module is used to measure the execution time of small code snippets in Python?',
          options: ['timeit', 'benchmark', 'profiler', 'sys.timer'],
          correct: 0,
          explanation: 'The `timeit` module provides a simple way to accurately time Python code execution by disabling garbage collection during runs.'
        }
      ],
      // SET 5
      [
        {
          id: 'py-5-1',
          question: 'What is a "closure" in Python?',
          options: ['Closing an open file handle using `close()`', 'A nested function that retains access to variables in its enclosing lexical scope even after the outer function has finished executing', 'Terminating the Python interpreter with `sys.exit()`', 'A lambda function that accepts no arguments'],
          correct: 1,
          explanation: 'A closure is a function object that remembers values in enclosing scopes even if they are no longer present in memory.'
        },
        {
          id: 'py-5-2',
          question: 'What does `sys.getrefcount(obj)` return in CPython?',
          options: ['The physical memory size of the object in bytes', 'The current reference count of the object (always 1 higher than expected due to the argument reference)', 'The number of subclasses derived from the object', 'The object’s memory address'],
          correct: 1,
          explanation: '`sys.getrefcount(obj)` returns the reference count of the object (including the temporary reference passed to the function itself).'
        },
        {
          id: 'py-5-3',
          question: 'What is the difference between `iter()` and `next()` in Python iterator protocol?',
          options: ['`iter(obj)` obtains an iterator object by calling `__iter__()`; `next(iterator)` retrieves the subsequent item by invoking `__next__()` until `StopIteration`', '`iter()` creates lists; `next()` deletes elements', 'Both are identical', '`next()` only works on generators'],
          correct: 0,
          explanation: 'The iterator protocol relies on `__iter__()` returning an iterator and `__next__()` returning successive items until `StopIteration` is raised.'
        },
        {
          id: 'py-5-4',
          question: 'What is the purpose of the `walrus operator` (`:=`) introduced in Python 3.8?',
          options: ['Bitwise XOR assignment', 'Assignment Expression: allows assigning values to variables inside expressions (e.g. `if (n := len(data)) > 10:`)', 'Pattern matching syntax', 'Exponentiation root operator'],
          correct: 1,
          explanation: 'The walrus operator `:=` assigns values to variables as part of a larger expression, avoiding redundant computations.'
        },
        {
          id: 'py-5-5',
          question: 'What is the effect of using `dataclasses.dataclass` in Python 3.7+?',
          options: ['Forces all variables to be stored in an SQLite database', 'Automatically generates boilerplate special methods like `__init__`, `__repr__`, `__eq__`, and type annotations for classes', 'Converts Python code into C extensions', 'Restricts classes to single inheritance'],
          correct: 1,
          explanation: 'The `@dataclass` decorator inspects type annotations and auto-generates constructors, string representations, and comparison methods.'
        }
      ]
    ]
  },

  {
    id: 'dsa-algo',
    name: 'Data Structures & Algorithms Test',
    category: 'IT & Technical',
    sector: 'it',
    icon: '⚡',
    timeLimit: 180,
    description: 'Trees, dynamic programming, sorting algorithms, graphs, and algorithmic complexity analysis.',
    questionSets: [
      // SET 1
      [
        {
          id: 'dsa-1-1',
          question: 'What is the worst-case time complexity of standard QuickSort with poor pivot selection (e.g. sorted array with first element pivot)?',
          options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
          correct: 1,
          explanation: 'When the partition is repeatedly unbalanced (e.g. 0 and n-1 elements), QuickSort recurses n times, degrading to O(n²).'
        },
        {
          id: 'dsa-1-2',
          question: 'Which data structure is fundamentally used for implementing Breadth-First Search (BFS) in graphs?',
          options: ['Stack (LIFO)', 'Queue (FIFO)', 'Max-Heap', 'Disjoint Set Union'],
          correct: 1,
          explanation: 'BFS explores graph vertices level by level, requiring a FIFO Queue to maintain the frontier of visited nodes.'
        },
        {
          id: 'dsa-1-3',
          question: 'What is the height of a balanced Binary Search Tree (such as AVL or Red-Black Tree) with `n` nodes?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          correct: 1,
          explanation: 'Self-balancing BSTs maintain an upper bound height of O(log n), ensuring searches, insertions, and deletions run in logarithmic time.'
        },
        {
          id: 'dsa-1-4',
          question: 'In Dynamic Programming, what two essential properties must a problem have to be solvable using DP?',
          options: ['Randomized choice and greedy property', 'Optimal substructure and overlapping subproblems', 'Divide and conquer with independent subproblems', 'Linear time complexity and binary branching'],
          correct: 1,
          explanation: 'DP applies when an optimal solution can be constructed from optimal solutions of subproblems (optimal substructure) and subproblems recur repeatedly (overlapping subproblems).'
        },
        {
          id: 'dsa-1-5',
          question: 'Which sorting algorithm is guaranteed to be stable and runs in O(n log n) time complexity in all cases (worst, best, average)?',
          options: ['HeapSort', 'MergeSort', 'QuickSort', 'SelectionSort'],
          correct: 1,
          explanation: 'MergeSort divides arrays into halves and merges them while preserving the relative order of duplicate keys, running in O(n log n) in all cases.'
        }
      ],
      // SET 2
      [
        {
          id: 'dsa-2-1',
          question: 'What is the time complexity of finding the shortest path between all pairs of vertices in a weighted directed graph using the Floyd-Warshall algorithm?',
          options: ['O(V²)', 'O(V³)', 'O(V + E)', 'O(E log V)'],
          correct: 1,
          explanation: 'Floyd-Warshall uses three nested loops over all vertices V, resulting in an O(V³) time complexity.'
        },
        {
          id: 'dsa-2-2',
          question: 'In a Min-Heap with `n` elements, what is the time complexity of deleting the minimum root element (`extract-min`)?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correct: 1,
          explanation: 'Extract-min replaces root with the last leaf and sifts it down through tree height, taking O(log n) time.'
        },
        {
          id: 'dsa-2-3',
          question: 'Which graph algorithm is used to find the Single-Source Shortest Path in a graph with non-negative edge weights?',
          options: ['Kruskal’s Algorithm', 'Dijkstra’s Algorithm (using Min-Priority Queue)', 'Tarjan’s Algorithm', 'Kosaraju’s Algorithm'],
          correct: 1,
          explanation: 'Dijkstra’s algorithm finds the shortest path from a source vertex to all other vertices with non-negative weights in O((V + E) log V).'
        },
        {
          id: 'dsa-2-4',
          question: 'What is the average time complexity of inserting a key into a Trie (Prefix Tree) of length `k`?',
          options: ['O(k)', 'O(n)', 'O(log k)', 'O(1)'],
          correct: 0,
          explanation: 'Inserting a string of length `k` in a Trie requires traversing or allocating `k` nodes, taking O(k) time independent of total vocabulary size.'
        },
        {
          id: 'dsa-2-5',
          question: 'Which collision resolution technique in hash tables stores collided elements in linked lists at each bucket index?',
          options: ['Linear Probing', 'Quadratic Probing', 'Separate Chaining', 'Double Hashing'],
          correct: 2,
          explanation: 'Separate Chaining maintains a linked list or self-balancing tree at each hash bucket to hold multiple colliding entries.'
        }
      ],
      // SET 3
      [
        {
          id: 'dsa-3-1',
          question: 'What is the time complexity of building a Binary Heap from an arbitrary array of `n` elements using Floyd’s `buildHeap` algorithm?',
          options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
          correct: 1,
          explanation: 'Bottom-up heap construction runs in linear O(n) time because the majority of nodes reside near the bottom with minimal sift-down heights.'
        },
        {
          id: 'dsa-3-2',
          question: 'Which algorithm is used to detect cycles in a directed graph using Depth-First Search (DFS)?',
          options: ['Checking for Back-Edges in DFS recursion stack (3-color state: unvisited, visiting, visited)', 'Prim’s Algorithm', 'Binary Search on edge weights', 'Kadane’s Algorithm'],
          correct: 0,
          explanation: 'A directed graph contains a cycle if and only if a DFS traversal encounters a Back-Edge pointing to an ancestor currently in the active recursion call stack.'
        },
        {
          id: 'dsa-3-3',
          question: 'What does "Kadane’s Algorithm" compute in O(n) time and O(1) extra space?',
          options: ['Longest Common Subsequence', 'Maximum Subarray Sum (contiguous sub-array with largest sum)', 'Shortest Hamiltonian Path', 'Topological Sort'],
          correct: 1,
          explanation: 'Kadane’s algorithm computes the maximum contiguous subarray sum in a 1D numeric array in linear O(n) time.'
        },
        {
          id: 'dsa-3-4',
          question: 'In Disjoint Set Union (DSU / Union-Find), what is the nearly constant amortized time complexity per operation when both Path Compression and Union by Rank are used?',
          options: ['O(log n)', 'O(α(n)) where α is the inverse Ackermann function', 'O(1) strictly worst-case', 'O(n)'],
          correct: 1,
          explanation: 'Path compression combined with union by rank reduces operation complexity to O(α(n)), which is practically less than 5 for all realistic universe sizes.'
        },
        {
          id: 'dsa-3-5',
          question: 'What is the space complexity of Depth-First Search (DFS) on a binary tree of height `h`?',
          options: ['O(1)', 'O(h) for call stack space', 'O(2ʰ)', 'O(n log n)'],
          correct: 1,
          explanation: 'DFS stores active ancestor frames on the execution stack, requiring auxiliary memory proportional to tree height O(h).'
        }
      ],
      // SET 4
      [
        {
          id: 'dsa-4-1',
          question: 'Which algorithm is used to compute the Minimum Spanning Tree (MST) of a connected, undirected graph by picking the minimum weight available edge that does not form a cycle?',
          options: ['Dijkstra’s Algorithm', 'Kruskal’s Algorithm (using DSU)', 'Bellman-Ford Algorithm', 'Floyd-Warshall Algorithm'],
          correct: 1,
          explanation: 'Kruskal’s greedy algorithm sorts all edges and adds them one by one to the MST if they connect disconnected components using DSU.'
        },
        {
          id: 'dsa-4-2',
          question: 'What is the time complexity of the KMP (Knuth-Morris-Pratt) string matching algorithm searching pattern of length `m` in text of length `n`?',
          options: ['O(n × m)', 'O(n + m)', 'O(n log m)', 'O(m²)'],
          correct: 1,
          explanation: 'KMP precomputes the Longest Prefix Suffix (LPS) array in O(m) and matches the text in O(n), giving overall linear O(n + m) time.'
        },
        {
          id: 'dsa-4-3',
          question: 'What is the maximum number of nodes in a binary tree of depth `k` (where root is at depth 0)?',
          options: ['2ᵏ', '2ᵏ⁺¹ - 1', 'k²', '2k + 1'],
          correct: 1,
          explanation: 'A full binary tree of depth `k` has 1 + 2 + 4 + ... + 2ᵏ = 2ᵏ⁺¹ - 1 total nodes.'
        },
        {
          id: 'dsa-4-4',
          question: 'In the 0/1 Knapsack problem with `n` items and capacity `W`, what is the time complexity of the standard Dynamic Programming solution?',
          options: ['O(n × W) (Pseudo-polynomial time)', 'O(2ⁿ)', 'O(n log W)', 'O(W²)'],
          correct: 0,
          explanation: 'The 2D DP matrix has dimensions (n + 1) × (W + 1), taking O(n × W) pseudo-polynomial time and space.'
        },
        {
          id: 'dsa-4-5',
          question: 'Which data structure allows O(1) amortized insertion and deletion at both ends?',
          options: ['Singly Linked List', 'Deque (Double-Ended Queue)', 'Binary Search Tree', 'Priority Queue'],
          correct: 1,
          explanation: 'A Deque (implemented via doubly linked list or circular buffer) supports O(1) push and pop operations at both ends.'
        }
      ],
      // SET 5
      [
        {
          id: 'dsa-5-1',
          question: 'What algorithm can find the shortest paths from a single source vertex to all other vertices in a graph with negative edge weights (and detect negative weight cycles)?',
          options: ['Dijkstra’s Algorithm', 'Bellman-Ford Algorithm', 'Kruskal’s Algorithm', 'Prim’s Algorithm'],
          correct: 1,
          explanation: 'Bellman-Ford relaxes all edges |V| - 1 times and can handle negative weights and detect negative cycles in O(V × E) time.'
        },
        {
          id: 'dsa-5-2',
          question: 'What is a "Topological Sort" of a Directed Acyclic Graph (DAG)?',
          options: ['A linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v', 'Sorting vertices by degree', 'Finding the diameter of the tree', 'Detecting Eulerian circuits'],
          correct: 0,
          explanation: 'Topological sorting orders vertices linearly such that dependencies are always visited before dependents in a DAG.'
        },
        {
          id: 'dsa-5-3',
          question: 'What is the optimal substructure relation for computing the Longest Common Subsequence (LCS) of strings X[0..m-1] and Y[0..n-1] when X[i] == Y[j]?',
          options: ['LCS(i, j) = 1 + LCS(i-1, j-1)', 'LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))', 'LCS(i, j) = LCS(i-1, j) + LCS(i, j-1)', 'LCS(i, j) = 0'],
          correct: 0,
          explanation: 'When characters match, the LCS length increases by 1 plus the LCS of remaining prefixes: `1 + LCS(i-1, j-1)`.'
        },
        {
          id: 'dsa-5-4',
          question: 'What is the worst-case time complexity of searching an element in an unsorted array of size `n` using Linear Search?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correct: 2,
          explanation: 'In the worst case (element is at the last index or absent), all `n` elements must be inspected, taking O(n) time.'
        },
        {
          id: 'dsa-5-5',
          question: 'Which data structure is used to implement an LRU (Least Recently Used) Cache with O(1) `get()` and O(1) `put()` time complexity?',
          options: ['Array and Stack', 'Hash Map combined with a Doubly Linked List', 'Binary Search Tree and Queue', 'Priority Queue alone'],
          correct: 1,
          explanation: 'A Hash Map provides O(1) key lookups to nodes, while a Doubly Linked List allows O(1) removal and re-insertion of recently accessed nodes at the head.'
        }
      ]
    ]
  },

  {
    id: 'js-react',
    name: 'JavaScript & React Modern Web Engineering',
    category: 'IT & Technical',
    sector: 'it',
    icon: '⚛️',
    timeLimit: 180,
    description: 'Closures, Event Loop, React Hooks, Virtual DOM, Reconciliation, State Management, and Next.js principles.',
    questionSets: [
      // SET 1
      [
        {
          id: 'js-1-1',
          question: 'What is the execution order in the JavaScript Event Loop between Microtasks (Promises, queueMicrotask) and Macrotasks (setTimeout, setInterval)?',
          options: ['Macrotasks execute before Microtasks always', 'All pending Microtasks in the microtask queue are completely drained before the next Macrotask is processed from the task queue', 'Microtasks and Macrotasks run in random interleaving order', 'Macrotasks run on web workers'],
          correct: 1,
          explanation: 'After every synchronous task, the event loop drains the entire microtask queue before executing the next macrotask.'
        },
        {
          id: 'js-1-2',
          question: 'Why must React Hooks (e.g. `useState`, `useEffect`) only be called at the top level and never inside loops, conditions, or nested functions?',
          options: ['Because JavaScript doesn’t support closures', 'React relies on the consistent call order of Hooks across renders to correctly associate internal state with component instances', 'To prevent memory leaks in CSS', 'To make components run on the GPU'],
          correct: 1,
          explanation: 'React tracks hook state in an internal linked list mapped to execution order; conditional invocation breaks the index mapping.'
        },
        {
          id: 'js-1-3',
          question: 'What is the difference between `==` and `===` in JavaScript?',
          options: ['`==` performs type coercion before comparison; `===` (strict equality) checks both value and type without coercion', '`===` converts strings to numbers automatically', '`==` is deprecated in ECMAScript 6', 'Both are identical for primitive values'],
          correct: 0,
          explanation: '`===` checks for strict equality without type coercion (e.g. `0 === false` is false, whereas `0 == false` is true).'
        },
        {
          id: 'js-1-4',
          question: 'What is the purpose of the `useEffect` cleanup function returned from the effect callback?',
          options: ['To reset component state to initial values', 'To unsubscribe from event listeners, clear timers, or cancel network requests before the component unmounts or re-executes the effect', 'To delete the component from the DOM tree', 'To force browser garbage collection'],
          correct: 1,
          explanation: 'The return function of `useEffect` runs before the effect re-runs or when the component unmounts to clean up resources.'
        },
        {
          id: 'js-1-5',
          question: 'What is "Prop Drilling" in React and what modern pattern is commonly used to avoid it?',
          options: ['Rendering props inside `<canvas>`', 'Passing props through multiple intermediate layers of components that do not need them; solved using React Context API or state management stores', 'Mutating props directly in child components', 'Validating props with TypeScript'],
          correct: 1,
          explanation: 'Prop drilling is the process of passing props down deeply through component trees; Context or Redux/Zustand provides global access.'
        }
      ],
      // SET 2
      [
        {
          id: 'js-2-1',
          question: 'What is the difference between `useMemo` and `useCallback` in React?',
          options: ['`useMemo` caches the calculated return value of a function; `useCallback` caches the function instance definition itself', '`useCallback` runs only once on mount; `useMemo` runs on every render', '`useMemo` can only be used with numbers', 'Both hooks are interchangeable'],
          correct: 0,
          explanation: '`useMemo(() => computeValue(a), [a])` memoizes a value; `useCallback(fn, deps)` memoizes a callback function reference.'
        },
        {
          id: 'js-2-2',
          question: 'What does the JavaScript `bind()` method do on a function?',
          options: ['Executes the function immediately and returns its value', 'Returns a new function with its `this` keyword permanently bound to the provided object', 'Converts the function to asynchronous promise', 'Locks the function code against modifications'],
          correct: 1,
          explanation: '`func.bind(thisArg)` creates a new function that, when called, has its `this` keyword set to `thisArg`.'
        },
        {
          id: 'js-2-3',
          question: 'What is the "Virtual DOM" in React?',
          options: ['A direct binary driver inside Chrome V8', 'An in-memory lightweight JavaScript object representation of the real DOM used for reconciliation (diffing algorithm)', 'A plugin for 3D WebGL rendering', 'An external database stored in IndexedDB'],
          correct: 1,
          explanation: 'The Virtual DOM is a lightweight JS tree representation; React compares new and previous VDOM trees (reconciliation) to batch minimal DOM updates.'
        },
        {
          id: 'js-2-4',
          question: 'What will `console.log(typeof null)` and `console.log(typeof undefined)` output in JavaScript?',
          options: ['`"object"` and `"undefined"`', '`"null"` and `"undefined"`', '`"object"` and `"object"`', '`"undefined"` and `"undefined"`'],
          correct: 0,
          explanation: '`typeof null` historically evaluates to `"object"` (a legacy JS bug), whereas `typeof undefined` evaluates to `"undefined"`.'
        },
        {
          id: 'js-2-5',
          question: 'What is the purpose of the `key` prop when rendering dynamic lists in React (`items.map(...)`)?',
          options: ['To provide styling classes in CSS', 'To help React identify which items have changed, been added, or been removed during reconciliation across renders', 'To encrypt list item IDs', 'To enable smooth scrolling animations'],
          correct: 1,
          explanation: 'Keys give list elements a stable identity across renders, allowing React’s diffing algorithm to reuse existing DOM nodes efficiently.'
        }
      ],
      // SET 3
      [
        {
          id: 'js-3-1',
          question: 'What is a "Closure" in JavaScript and where is it commonly used?',
          options: ['A method to close browser tabs using window.close()', 'A function bundled together with references to its surrounding lexical state, allowing inner functions to access outer variables even after outer execution finishes', 'A syntax for closing HTML tags', 'An error thrown when variables are undefined'],
          correct: 1,
          explanation: 'A closure gives a function access to its outer scope from an inner function even after the outer function has returned.'
        },
        {
          id: 'js-3-2',
          question: 'What is the purpose of `useRef` in React beyond referencing DOM elements?',
          options: ['To trigger component re-renders whenever its value changes', 'To persist mutable values across renders without triggering a component re-render when mutated', 'To replace Redux store completely', 'To handle CSS animations'],
          correct: 1,
          explanation: '`useRef` holds a mutable `.current` property that persists across renders without causing re-renders when modified.'
        },
        {
          id: 'js-3-3',
          question: 'What does `Promise.all([p1, p2, p3])` do when one of the promises rejects?',
          options: ['It waits for all others and returns an array of successes', 'It immediately rejects with the reason of the first promise that rejects (fail-fast behavior)', 'It converts rejected promises to null', 'It retries the failed promise 3 times'],
          correct: 1,
          explanation: '`Promise.all` is fail-fast: if any promise rejects, the returned promise immediately rejects with that error.'
        },
        {
          id: 'js-3-4',
          question: 'What is "Debouncing" vs "Throttling" in front-end performance optimization?',
          options: ['Debouncing delays execution until a period of inactivity passes; Throttling limits execution to at most once in a fixed time interval', 'Throttling cancels all network calls; Debouncing caches API responses', 'Both are identical techniques', 'Debouncing is used only for CSS transitions'],
          correct: 0,
          explanation: 'Debounce waits for a pause in events (e.g. search input), whereas throttle enforces a maximum execution frequency (e.g. scroll handlers).'
        },
        {
          id: 'js-3-5',
          question: 'What is the difference between Server Components and Client Components in Next.js / React 19?',
          options: ['Server components render exclusively on the server and send zero JavaScript to the client bundle; Client components enable interactivity with state and event listeners', 'Server components cannot fetch data from databases', 'Client components render on the backend', 'Server components require WebSockets'],
          correct: 0,
          explanation: 'React Server Components execute on the server, streaming HTML without client bundle overhead, while Client Components (`"use client"`) handle browser interactivity.'
        }
      ],
      // SET 4
      [
        {
          id: 'js-4-1',
          question: 'What is the difference between `localStorage`, `sessionStorage`, and Cookies in browser storage?',
          options: ['`localStorage` persists across browser sessions; `sessionStorage` clears when the browser tab closes; Cookies are sent with HTTP requests to the server', '`localStorage` has 4 KB limit; Cookies have 10 MB limit', '`sessionStorage` is accessible across all websites', 'Cookies cannot be read by JavaScript'],
          correct: 0,
          explanation: '`localStorage` (~5-10MB) persists indefinitely, `sessionStorage` expires with tab session, and Cookies (~4KB) are transmitted with HTTP requests.'
        },
        {
          id: 'js-4-2',
          question: 'What is the purpose of `React.memo` (Higher Order Component)?',
          options: ['To store component state in Redux', 'To prevent unnecessary re-rendering of functional components if their props have not changed (shallow comparison)', 'To cache network image files', 'To render components on Web Workers'],
          correct: 1,
          explanation: '`React.memo` wraps a component to memoize its rendered output, skipping re-renders when incoming props remain shallowly equal.'
        },
        {
          id: 'js-4-3',
          question: 'What will be the output of `[1, 2, 3] + [4, 5, 6]` in JavaScript?',
          options: ['`[1, 2, 3, 4, 5, 6]`', '`"1,2,34,5,6"` (string concatenation)', '`TypeError: cannot add arrays`', '`NaN`'],
          correct: 1,
          explanation: 'The `+` operator coerces arrays to strings (`"1,2,3"` and `"4,5,6"`), concatenating them into `"1,2,34,5,6"`.'
        },
        {
          id: 'js-4-4',
          question: 'What is an "Error Boundary" in React?',
          options: ['A CSS border around broken components', 'A class component that implements `componentDidCatch` or `getDerivedStateFromError` to catch JavaScript errors in its child component tree and display a fallback UI', 'A try-catch block inside JSX', 'A server-side error logger'],
          correct: 1,
          explanation: 'Error boundaries catch runtime errors during rendering in their child component tree, preventing the entire app from crashing.'
        },
        {
          id: 'js-4-5',
          question: 'What does the `useReducer` hook in React do compared to `useState`?',
          options: ['It compresses images in state', 'It manages complex state transitions using a reducer function `(state, action) => newState` (similar to Redux pattern)', 'It deletes state variables after 5 seconds', 'It stores state in browser cookies'],
          correct: 1,
          explanation: '`useReducer` is preferred over `useState` for managing complex state logic with multiple sub-values and structured actions.'
        }
      ],
      // SET 5
      [
        {
          id: 'js-5-1',
          question: 'What is "Tree Shaking" in modern JavaScript bundlers (Vite, Rollup, Webpack)?',
          options: ['Visualizing components as trees in devtools', 'Dead-code elimination that removes unused exports from the final production JavaScript bundle using ES module static analysis', 'Formatting code indentation automatically', 'Optimizing CSS grid layouts'],
          correct: 1,
          explanation: 'Tree shaking analyzes ES6 import/export statements statically to strip unused code from production bundles.'
        },
        {
          id: 'js-5-2',
          question: 'What is the purpose of `useId` hook in React 18+?',
          options: ['To generate unique database UUIDs for users', 'To generate unique, stable IDs for accessibility (ARIA) attributes that match between server-side rendering and client hydration', 'To retrieve the user’s Google login ID', 'To generate random numbers for math games'],
          correct: 1,
          explanation: '`useId` generates unique IDs that are consistent across server and client renders, preventing hydration mismatch errors on accessibility tags.'
        },
        {
          id: 'js-5-3',
          question: 'What is the difference between `Object.freeze()` and `Object.seal()` in JavaScript?',
          options: ['`freeze()` prevents adding, deleting, or modifying existing properties; `seal()` prevents adding/deleting properties but allows modifying existing writable properties', '`seal()` deletes all properties', '`freeze()` encrypts the object', 'Both are identical'],
          correct: 0,
          explanation: '`Object.freeze()` makes an object completely immutable; `Object.seal()` prevents property addition/deletion but allows modifying values of existing properties.'
        },
        {
          id: 'js-5-4',
          question: 'What is "Event Delegation" in JavaScript DOM programming?',
          options: ['Delegating events to a Node.js server', 'Attaching a single event listener to a parent element to manage events triggered by any of its child elements via event bubbling', 'Triggering click events automatically with timers', 'Preventing all user interaction on a form'],
          correct: 1,
          explanation: 'Event delegation leverages event bubbling to handle events at a common parent instead of attaching listeners to numerous individual children.'
        },
        {
          id: 'js-5-5',
          question: 'What does the `useTransition` hook introduced in React 18 do?',
          options: ['Enables CSS opacity transitions', 'Marks state updates as non-urgent transitions, keeping the UI responsive while heavy rendering occurs in the background', 'Navigates between URL routes with page slide animations', 'Converts functional components to class components'],
          correct: 1,
          explanation: '`useTransition` lets you mark updates as non-blocking transitions so urgent user input (like typing) remains immediate and responsive.'
        }
      ]
    ]
  },

  {
    id: 'sql-dbms',
    name: 'SQL, Database Systems & Query Optimization',
    category: 'IT & Technical',
    sector: 'it',
    icon: '🗄️',
    timeLimit: 180,
    description: 'Relational algebra, ACID transactions, B-Tree indexes, isolation levels, normalization, and SQL optimization.',
    questionSets: [
      // SET 1
      [
        {
          id: 'sql-1-1',
          question: 'What do the ACID properties stand for in database transaction management?',
          options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Concurrency, Integrity, Distribution', 'Availability, Consistency, Isolation, Data', 'Authentication, Confidentiality, Integrity, Decryption'],
          correct: 0,
          explanation: 'ACID guarantees Atomicity (all-or-nothing), Consistency (schema rules), Isolation (concurrent safety), and Durability (committed persistence).'
        },
        {
          id: 'sql-1-2',
          question: 'What is the primary difference between `WHERE` and `HAVING` clauses in SQL?',
          options: ['`WHERE` filters rows before aggregation; `HAVING` filters groups after `GROUP BY` aggregation', '`WHERE` only works on numbers; `HAVING` works on strings', '`HAVING` is deprecated in SQL standard', 'Both clauses are completely interchangeable'],
          correct: 0,
          explanation: '`WHERE` filters individual rows before grouping, whereas `HAVING` filters aggregate summary groups (e.g. `HAVING COUNT(*) > 5`).'
        },
        {
          id: 'sql-1-3',
          question: 'Which index data structure is predominantly used in relational databases (MySQL InnoDB, PostgreSQL) for high performance equality and range lookups?',
          options: ['Binary Search Tree', 'B+ Tree (Balanced Multi-way Search Tree)', 'Hash Table alone', 'Skip List'],
          correct: 1,
          explanation: 'B+ Trees keep data sorted with linked leaf nodes, delivering O(log n) performance for point queries and sequential range scans.'
        },
        {
          id: 'sql-1-4',
          question: 'What is the difference between `DELETE`, `TRUNCATE`, and `DROP` in SQL?',
          options: ['`DELETE` removes rows with rollback logging; `TRUNCATE` rapidly deallocates all table pages; `DROP` destroys the entire table schema and data', '`TRUNCATE` deletes columns; `DROP` deletes rows', '`DELETE` removes the table structure permanently', 'All three can be rolled back equally in all DBMS'],
          correct: 0,
          explanation: '`DELETE` is a DML command deleting rows one-by-one; `TRUNCATE` is a fast DDL command resetting the table; `DROP` removes table definition completely.'
        },
        {
          id: 'sql-1-5',
          question: 'What is a "Clustered Index" in a database table?',
          options: ['An index created on remote cloud servers', 'An index that determines the physical order of data rows stored on disk (one clustered index per table, typically the Primary Key)', 'An index that contains only duplicate keys', 'A non-unique secondary index'],
          correct: 1,
          explanation: 'A Clustered Index dictates the physical ordering of data rows in storage pages; tables can have only one clustered index.'
        }
      ],
      // SET 2
      [
        {
          id: 'sql-2-1',
          question: 'What phenomenon occurs in database concurrency when a transaction reads data that has been modified by another uncommitted transaction (which is later rolled back)?',
          options: ['Non-Repeatable Read', 'Dirty Read', 'Phantom Read', 'Lost Update'],
          correct: 1,
          explanation: 'A Dirty Read occurs when Transaction A reads uncommitted modifications made by Transaction B that are subsequently rolled back.'
        },
        {
          id: 'sql-2-2',
          question: 'Which SQL Transaction Isolation Level prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads completely?',
          options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
          correct: 3,
          explanation: '`Serializable` is the highest ANSI SQL isolation level, executing concurrent transactions as if they were strictly serial.'
        },
        {
          id: 'sql-2-3',
          question: 'What is the requirement for a relational database schema to be in Third Normal Form (3NF)?',
          options: ['It must be in 2NF and eliminate all transitive dependencies (non-key attributes must depend directly on the primary key)', 'It must have at least 3 foreign keys', 'All tables must contain less than 3 columns', 'All data must be stored in 3NF format files'],
          correct: 0,
          explanation: '3NF requires that the table is in 2NF and no non-prime attribute is transitively dependent on the primary key.'
        },
        {
          id: 'sql-2-4',
          question: 'What does a `LEFT JOIN` return in SQL?',
          options: ['Only matching rows from both tables', 'All rows from the left table, and matching rows from the right table (with NULL for unmatched right rows)', 'All rows from the right table only', 'The Cartesian product of both tables'],
          correct: 1,
          explanation: '`LEFT JOIN` returns all rows from the left table and matched values from the right table, filling with `NULL` where matches are absent.'
        },
        {
          id: 'sql-2-5',
          question: 'What is an "Execution Plan" (e.g. `EXPLAIN ANALYZE`) in SQL query performance tuning?',
          options: ['A schedule for automated daily database backups', 'The step-by-step physical access path chosen by the query optimizer (indexes used, join algorithms like Hash/Nested Loop, and cost estimates)', 'A list of user permission privileges', 'A script that restarts the database server'],
          correct: 1,
          explanation: '`EXPLAIN` reveals the query optimizer’s execution plan, showing table scans, index lookups, join types, and execution bottlenecks.'
        }
      ],
      // SET 3
      [
        {
          id: 'sql-3-1',
          question: 'What is the purpose of Window Functions in SQL (e.g. `ROW_NUMBER()`, `RANK()`, `DENSE_RANK() OVER (...)`)?',
          options: ['To draw graphics windows in the client app', 'To perform calculations across a set of table rows related to the current row without collapsing rows into a single group like `GROUP BY`', 'To partition disk space into NTFS windows', 'To limit queries to 10 rows'],
          correct: 1,
          explanation: 'Window functions compute aggregates over row partitions while preserving individual row identity and detail in the result set.'
        },
        {
          id: 'sql-3-2',
          question: 'What is the difference between `UNION` and `UNION ALL` in SQL?',
          options: ['`UNION` removes duplicate rows by performing an internal sort/hash; `UNION ALL` retains all duplicate rows and is significantly faster', '`UNION ALL` only works on two rows', '`UNION` is deprecated', '`UNION ALL` creates a new physical database table'],
          correct: 0,
          explanation: '`UNION` deduplicates results via sorting or hashing, while `UNION ALL` concatenates datasets directly without deduplication overhead.'
        },
        {
          id: 'sql-3-3',
          question: 'What is a "Deadlock" in database concurrent transactions and how do modern DBMS resolve it?',
          options: ['A database crash due to disk failure; resolved by rebooting', 'A situation where two or more transactions hold locks that the other requires in a circular wait; resolved automatically by the DBMS deadlock detector aborting/rolling back a victim transaction', 'A corrupted primary key index; resolved by rebuilding', 'A network connection timeout'],
          correct: 1,
          explanation: 'Deadlocks occur when transactions wait circularly for locks; DBMS deadlock detection algorithms identify cycles and abort a victim transaction.'
        },
        {
          id: 'sql-3-4',
          question: 'What is the purpose of a Database View?',
          options: ['To speed up hard drive write speeds', 'A virtual table based on the result-set of an underlying SQL query, providing security abstraction and simplifying complex queries', 'A physical copy of the table stored in memory cache', 'A graphical UI tool for viewing table diagrams'],
          correct: 1,
          explanation: 'A View is a stored query that presents data like a virtual table, hiding complex joins and restricting sensitive column access.'
        },
        {
          id: 'sql-3-5',
          question: 'What is "Database Sharding" in horizontal scaling architectures?',
          options: ['Backing up database tables to tape drives', 'Partitioning and distributing rows of a large dataset across multiple independent physical database server instances', 'Encrypting database columns with SSL certificates', 'Replicating data to a single standby server'],
          correct: 1,
          explanation: 'Sharding partitions large tables horizontally across multiple database nodes based on a Shard Key to distribute read/write load.'
        }
      ],
      // SET 4
      [
        {
          id: 'sql-4-1',
          question: 'What is a "Covering Index" in SQL optimization?',
          options: ['An index that covers all tables in the database', 'An index that contains all columns referenced in a query (SELECT, WHERE, JOIN, ORDER BY), allowing the query to be fulfilled entirely from index pages without accessing table heap data', 'An index on encrypted columns', 'An index created during server startup'],
          correct: 1,
          explanation: 'A covering index satisfies a query entirely from the index leaf nodes (Index-Only Scan), completely bypassing secondary table row lookups.'
        },
        {
          id: 'sql-4-2',
          question: 'What does the `COALESCE(val1, val2, ...)` function do in SQL?',
          options: ['Concatenates all strings together', 'Returns the first non-null expression among its arguments', 'Calculates the average of numbers', 'Converts all values to uppercase'],
          correct: 1,
          explanation: '`COALESCE(a, b, c)` evaluates its arguments in order and returns the first non-NULL value encountered.'
        },
        {
          id: 'sql-4-3',
          question: 'What is the role of Write-Ahead Logging (WAL) in database storage engines?',
          options: ['To generate daily analytics reports', 'To ensure Durability and Atomicity by logging all data modifications to disk sequentially before writing them to database storage pages', 'To block unauthorized user logins', 'To compress text columns'],
          correct: 1,
          explanation: 'WAL guarantees that transaction log records are flushed to persistent disk before dirty data pages are written, enabling crash recovery.'
        },
        {
          id: 'sql-4-4',
          question: 'What is the difference between `RANK()` and `DENSE_RANK()` in SQL window functions?',
          options: ['`RANK()` leaves gaps in rank values after ties (e.g. 1, 2, 2, 4); `DENSE_RANK()` assigns consecutive ranks without gaps (e.g. 1, 2, 2, 3)', '`DENSE_RANK()` only works on integer columns', '`RANK()` sorts in reverse order', 'Both produce identical rankings'],
          correct: 0,
          explanation: '`RANK()` skips rank numbers after tied values, whereas `DENSE_RANK()` continues with the immediate next sequential integer.'
        },
        {
          id: 'sql-4-5',
          question: 'What is the purpose of Database Connection Pooling (e.g. HikariCP)?',
          options: ['To share database passwords among users', 'To maintain a cache of reusable active database connections, eliminating the high overhead of establishing new TCP/TLS connections per request', 'To merge multiple tables into a single table', 'To backup databases to Cloud Storage'],
          correct: 1,
          explanation: 'Connection pooling maintains open database connections for reuse, avoiding costly handshake and authentication overhead per transaction.'
        }
      ],
      // SET 5
      [
        {
          id: 'sql-5-1',
          question: 'What is the CAP Theorem in distributed database systems?',
          options: ['A distributed data store can simultaneously provide at most two of three guarantees: Consistency, Availability, and Partition Tolerance', 'All databases must comply with ACID protocols', 'Queries cannot exceed 100 milliseconds latency', 'Transactions must be processed in alphabetical order'],
          correct: 0,
          explanation: 'The CAP Theorem states that under a network partition (P), a distributed system must trade off between Consistency (C) and Availability (A).'
        },
        {
          id: 'sql-5-2',
          question: 'What is a "Composite Index" and what is the "Leftmost Prefix Rule"?',
          options: ['An index on multiple columns; the database can only use the index for queries that filter on the leftmost subset of indexed columns in order', 'An index created on two different databases simultaneously', 'An index that only works on left joins', 'A rule requiring primary keys to be on the left side of table definition'],
          correct: 0,
          explanation: 'For a composite index on `(A, B, C)`, lookups can utilize the index for queries on `(A)`, `(A, B)`, or `(A, B, C)`, but not `(B, C)` alone.'
        },
        {
          id: 'sql-5-3',
          question: 'What is the function of the `CASE` statement in SQL?',
          options: ['To convert strings to lowercase or uppercase', 'To provide conditional `IF-THEN-ELSE` branching logic directly inside SQL query expressions', 'To define database switchboard triggers', 'To backup tables conditionally'],
          correct: 1,
          explanation: 'The `CASE` statement allows conditional expression evaluation in SQL (`CASE WHEN condition THEN result ELSE fallback END`).'
        },
        {
          id: 'sql-5-4',
          question: 'What is the difference between a Stored Procedure and a User-Defined Function (UDF) in SQL?',
          options: ['Functions must return a value and cannot execute DDL/transaction control; Stored Procedures can execute complex procedural logic, DDL, and commit/rollback transactions', 'Functions cannot take arguments', 'Stored procedures can only be called from Python', 'Both are identical in database permissions'],
          correct: 0,
          explanation: 'UDFs compute and return values and can be embedded in `SELECT` expressions, whereas Stored Procedures execute broader procedural operations and transaction management.'
        },
        {
          id: 'sql-5-5',
          question: 'What is an "Index Scan" vs "Table Scan / Sequential Scan" in database query execution?',
          options: ['Table Scan reads every single block in the table sequentially; Index Scan traverses a B-Tree index to locate specific matching record pointers directly', 'Table Scan is always 100x faster than Index Scan', 'Index Scan only reads table headers', 'Table Scan is only used on small tables under 10 rows'],
          correct: 0,
          explanation: 'A Table Scan reads all disk pages sequentially, while an Index Scan uses B-Tree pointers to selectively fetch only relevant matching rows.'
        }
      ]
    ]
  }
];

// Helper to flatten all questions into a single flat array per exam if needed for legacy compatibility
ALL_MOCK_EXAMS.forEach(exam => {
  if (exam.questionSets && !exam.questions) {
    exam.questions = exam.questionSets.flat();
  }
});
