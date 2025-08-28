
import { useState } from "react";

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Subjects with their sections
  const subjects = {
    "math": {
      title: "Mathematics",
      description: "Advanced mathematical concepts from algebra to calculus",
      icon: "🧮",
      color: "#58CC02",
      sections: {
        "algebra": {
          title: "Algebra",
          description: "Linear equations, quadratic functions, and polynomial operations",
          icon: "📐",
          color: "#FF9600",
          levels: {
            1: {
              title: "Linear Equations",
              content: "Solve equations in the form ax + b = c. Linear equations represent relationships where variables change at a constant rate.",
              examples: ["3x + 5 = 14 → x = 3", "2x - 7 = 11 → x = 9", "-4x + 12 = 0 → x = 3"],
              practice: "Solve: 5x - 3 = 22. First add 3 to both sides, then divide by 5.",
              notes: {
                definitions: ["Linear equation: An equation where the highest power of the variable is 1", "Solution: The value that makes the equation true"],
                keyPoints: ["Use inverse operations to isolate the variable", "What you do to one side, do to the other"]
              }
            },
            2: {
              title: "Quadratic Functions",
              content: "Functions of the form f(x) = ax² + bx + c. These create parabolic graphs and have many real-world applications.",
              examples: ["f(x) = x² - 4x + 3", "Vertex form: f(x) = a(x - h)² + k", "Factored form: f(x) = a(x - r₁)(x - r₂)"],
              practice: "Find the vertex of f(x) = x² - 6x + 8 using the formula h = -b/2a.",
              notes: {
                definitions: ["Quadratic function: A polynomial function of degree 2", "Vertex: The highest or lowest point on a parabola", "Discriminant: b² - 4ac determines the number of real solutions"],
                keyPoints: ["The graph is always a parabola", "If a > 0, parabola opens upward", "Use the quadratic formula when factoring is difficult"]
              }
            },
            3: {
              title: "Systems of Equations",
              content: "Solving multiple equations simultaneously. Methods include substitution, elimination, and graphing.",
              examples: ["2x + 3y = 12 and x - y = 1", "Solution: x = 3, y = 2", "Graphically: intersection point of two lines"],
              practice: "Solve using elimination: 3x + 2y = 16 and x - 2y = 0",
              notes: {
                definitions: ["System of equations: Two or more equations with the same variables", "Solution: Values that satisfy all equations simultaneously"],
                keyPoints: ["Three methods: graphing, substitution, elimination", "Systems can have one solution, no solution, or infinitely many solutions"]
              }
            }
          }
        },
        "geometry": {
          title: "Geometry",
          description: "Properties of shapes, area, volume, and coordinate geometry",
          icon: "📏",
          color: "#CE82FF",
          levels: {
            1: {
              title: "Triangle Properties",
              content: "Properties of triangles including angle relationships, congruence, and similarity theorems.",
              examples: ["Sum of angles = 180°", "Pythagorean theorem: a² + b² = c²", "Similar triangles have proportional sides"],
              practice: "In a right triangle with legs 3 and 4, find the hypotenuse using the Pythagorean theorem.",
              notes: {
                definitions: ["Congruent triangles: Same size and shape", "Similar triangles: Same shape, different size", "Hypotenuse: Longest side of a right triangle"],
                keyPoints: ["SSS, SAS, ASA are congruence postulates", "AA, SSS, SAS are similarity postulates"]
              }
            },
            2: {
              title: "Circle Geometry",
              content: "Properties of circles including circumference, area, arcs, and inscribed angles.",
              examples: ["Circumference = 2πr", "Area = πr²", "Inscribed angle = ½ central angle"],
              practice: "Find the area of a circle with radius 5 units.",
              notes: {
                definitions: ["Radius: Distance from center to edge", "Diameter: Distance across through center", "Arc: Part of the circle's circumference"],
                keyPoints: ["π ≈ 3.14159", "Inscribed angles subtending the same arc are equal"]
              }
            }
          }
        }
      }
    },
    "english": {
      title: "English Language Arts",
      description: "Advanced literature analysis, composition, and critical thinking skills",
      icon: "📚",
      color: "#FF4B4B",
      sections: {
        "literature": {
          title: "Literature Analysis",
          description: "Critical analysis of literary works and techniques",
          icon: "📖",
          color: "#FF9600",
          levels: {
            1: {
              title: "Theme and Symbolism",
              content: "Identify and analyze central themes and symbolic elements in literature. Themes are universal messages about life and human nature.",
              examples: ["Theme of sacrifice in 'Romeo and Juliet'", "The green light symbolizes hope in 'The Great Gatsby'", "Coming-of-age themes in 'To Kill a Mockingbird'"],
              practice: "Read a short story and identify one major theme. Support your analysis with textual evidence.",
              notes: {
                definitions: ["Theme: Central message or lesson about life", "Symbolism: Using objects to represent deeper meanings", "Motif: Recurring element that supports the theme"],
                keyPoints: ["Themes are universal and timeless", "Symbols can have multiple meanings", "Look for patterns in imagery and language"]
              }
            },
            2: {
              title: "Character Development",
              content: "Analyze how authors develop complex characters through direct and indirect characterization techniques.",
              examples: ["Dynamic vs. static characters", "Protagonist's internal conflict drives plot", "Character foils highlight main character traits"],
              practice: "Choose a character from your current reading and trace their development through the story.",
              notes: {
                definitions: ["Dynamic character: Changes throughout the story", "Static character: Remains the same", "Character foil: Character who contrasts with another to highlight traits"],
                keyPoints: ["Authors reveal character through actions, dialogue, thoughts, and interactions", "Character motivation drives plot development"]
              }
            },
            3: {
              title: "Rhetorical Devices",
              content: "Identify and analyze rhetorical techniques used by authors to persuade and engage readers.",
              examples: ["Metaphor: 'Life is a journey'", "Alliteration: 'Peter Piper picked'", "Irony: Contrast between expectation and reality"],
              practice: "Find three different rhetorical devices in a speech or essay and explain their effect.",
              notes: {
                definitions: ["Rhetoric: Art of effective communication", "Metaphor: Direct comparison without 'like' or 'as'", "Irony: Use of words to convey opposite meaning"],
                keyPoints: ["Rhetorical devices enhance meaning and impact", "Context determines effectiveness", "Authors use multiple devices together"]
              }
            }
          }
        },
        "writing": {
          title: "Academic Writing",
          description: "Advanced composition skills for academic and professional contexts",
          icon: "✍️",
          color: "#58CC02",
          levels: {
            1: {
              title: "Argumentative Essays",
              content: "Construct compelling arguments with evidence, reasoning, and counterarguments. Structure: Introduction, body paragraphs, conclusion.",
              examples: ["Thesis: 'Social media negatively impacts teen mental health'", "Evidence: Statistical studies and expert opinions", "Counterargument: 'However, critics argue...'"],
              practice: "Write a thesis statement for an argumentative essay on a current issue you care about.",
              notes: {
                definitions: ["Thesis statement: Central argument of your essay", "Evidence: Facts, statistics, examples that support your claim", "Counterargument: Opposing viewpoint you address"],
                keyPoints: ["Use credible sources", "Address opposing views fairly", "Logical flow from paragraph to paragraph"]
              }
            },
            2: {
              title: "Research and Citations",
              content: "Properly research, evaluate, and cite sources using MLA or APA format. Avoid plagiarism through proper attribution.",
              examples: ["MLA: (Smith 45)", "APA: (Smith, 2023, p. 45)", "Works Cited page format"],
              practice: "Practice creating a Works Cited entry for a book, website, and journal article.",
              notes: {
                definitions: ["Citation: Reference to a source", "Bibliography: List of all sources used", "Plagiarism: Using someone's work without credit"],
                keyPoints: ["Different subjects use different citation styles", "Cite all borrowed ideas, not just direct quotes", "Evaluate source credibility"]
              }
            }
          }
        }
      }
    },
    "science": {
      title: "Science",
      description: "Comprehensive study of physical, chemical, and biological sciences",
      icon: "🔬",
      color: "#1CB0F6",
      sections: {
        "biology": {
          title: "Biology",
          description: "Study of living organisms and their interactions",
          icon: "🧬",
          color: "#58CC02",
          levels: {
            1: {
              title: "Cell Structure and Function",
              content: "Understanding prokaryotic and eukaryotic cells, organelles, and cellular processes like photosynthesis and respiration.",
              examples: ["Mitochondria: 'Powerhouse of the cell'", "Chloroplasts: Site of photosynthesis", "Cell membrane: Controls what enters/exits"],
              practice: "Compare and contrast plant and animal cells. What organelles do they share? What's unique to each?",
              notes: {
                definitions: ["Prokaryote: Cell without nucleus (bacteria)", "Eukaryote: Cell with nucleus (plants, animals)", "Organelle: Specialized structure within a cell"],
                keyPoints: ["All living things are made of cells", "Structure determines function", "Cells maintain homeostasis"]
              }
            },
            2: {
              title: "Genetics and Heredity",
              content: "DNA structure, protein synthesis, and inheritance patterns including Mendel's laws and genetic disorders.",
              examples: ["DNA → RNA → Protein (Central Dogma)", "Dominant vs. recessive alleles", "Punnett squares predict offspring"],
              practice: "If both parents are heterozygous for brown eyes (Bb), what's the probability their child has blue eyes?",
              notes: {
                definitions: ["Gene: Segment of DNA coding for a trait", "Allele: Different versions of a gene", "Genotype: Genetic makeup", "Phenotype: Observable traits"],
                keyPoints: ["DNA contains instructions for all cellular functions", "Mutations can be beneficial, harmful, or neutral", "Environmental factors can influence gene expression"]
              }
            },
            3: {
              title: "Evolution and Natural Selection",
              content: "Mechanisms of evolution including natural selection, genetic drift, and speciation. Evidence from fossils, DNA, and biogeography.",
              examples: ["Peppered moths and industrial melanism", "Darwin's finches and adaptive radiation", "Homologous structures indicate common ancestry"],
              practice: "Explain how antibiotic resistance in bacteria demonstrates natural selection in action.",
              notes: {
                definitions: ["Evolution: Change in species over time", "Natural selection: Survival of the fittest", "Adaptation: Trait that increases survival"],
                keyPoints: ["Evolution is supported by multiple lines of evidence", "Populations evolve, not individuals", "All life shares common ancestry"]
              }
            }
          }
        },
        "chemistry": {
          title: "Chemistry",
          description: "Study of matter, its properties, and chemical reactions",
          icon: "⚗️",
          color: "#CE82FF",
          levels: {
            1: {
              title: "Atomic Structure",
              content: "Structure of atoms including protons, neutrons, electrons, and electron configuration. Periodic table organization.",
              examples: ["Carbon: 6 protons, 6 neutrons, 6 electrons", "Electron configuration: 1s² 2s² 2p²", "Valence electrons determine bonding"],
              practice: "Write the electron configuration for oxygen (atomic number 8).",
              notes: {
                definitions: ["Proton: Positively charged particle in nucleus", "Electron: Negatively charged particle in shells", "Isotope: Same element, different neutrons"],
                keyPoints: ["Atomic number = number of protons", "Mass number = protons + neutrons", "Electrons in outer shell determine chemical properties"]
              }
            },
            2: {
              title: "Chemical Bonding",
              content: "Types of chemical bonds: ionic, covalent, and metallic. How bonding affects properties of compounds.",
              examples: ["NaCl: Ionic bond (metal + nonmetal)", "H₂O: Covalent bond (nonmetal + nonmetal)", "Metallic bonding in copper"],
              practice: "Predict the type of bond between magnesium and chlorine. Explain your reasoning.",
              notes: {
                definitions: ["Ionic bond: Transfer of electrons", "Covalent bond: Sharing of electrons", "Electronegativity: Tendency to attract electrons"],
                keyPoints: ["Opposite charges attract in ionic bonds", "Covalent bonds can be polar or nonpolar", "Bond type affects physical properties"]
              }
            },
            3: {
              title: "Chemical Reactions",
              content: "Types of reactions, balancing equations, and factors affecting reaction rates. Conservation of mass in chemical changes.",
              examples: ["2H₂ + O₂ → 2H₂O (synthesis)", "CaCO₃ → CaO + CO₂ (decomposition)", "Catalysts speed up reactions"],
              practice: "Balance this equation: __Fe + __O₂ → __Fe₂O₃",
              notes: {
                definitions: ["Reactants: Starting materials", "Products: Substances formed", "Catalyst: Speeds reaction without being consumed"],
                keyPoints: ["Mass is conserved in chemical reactions", "Energy changes accompany reactions", "Collision theory explains reaction rates"]
              }
            }
          }
        },
        "physics": {
          title: "Physics",
          description: "Study of matter, energy, and their interactions",
          icon: "🎯",
          color: "#FF9600",
          levels: {
            1: {
              title: "Motion and Forces",
              content: "Newton's laws of motion, kinematics equations, and force analysis. Understanding velocity, acceleration, and momentum.",
              examples: ["F = ma (Newton's 2nd Law)", "v = v₀ + at (kinematic equation)", "Momentum = mass × velocity"],
              practice: "A 10 kg object accelerates at 5 m/s². What force is applied?",
              notes: {
                definitions: ["Force: Push or pull that changes motion", "Acceleration: Rate of change of velocity", "Momentum: Mass in motion"],
                keyPoints: ["Objects at rest stay at rest (1st Law)", "Net force causes acceleration (2nd Law)", "Every action has equal opposite reaction (3rd Law)"]
              }
            },
            2: {
              title: "Energy and Work",
              content: "Forms of energy, conservation of energy, and work-energy theorem. Kinetic and potential energy calculations.",
              examples: ["KE = ½mv²", "PE = mgh", "Work = Force × distance"],
              practice: "Calculate the kinetic energy of a 2 kg ball moving at 10 m/s.",
              notes: {
                definitions: ["Energy: Ability to do work", "Work: Force applied over distance", "Power: Rate of doing work"],
                keyPoints: ["Energy cannot be created or destroyed", "Energy transforms from one type to another", "Mechanical energy = KE + PE"]
              }
            },
            3: {
              title: "Waves and Sound",
              content: "Properties of waves including frequency, wavelength, amplitude. Sound waves, Doppler effect, and wave interference.",
              examples: ["v = fλ (wave equation)", "Higher frequency = higher pitch", "Constructive and destructive interference"],
              practice: "If a wave has frequency 100 Hz and wavelength 2 m, what is its speed?",
              notes: {
                definitions: ["Frequency: Number of waves per second (Hz)", "Wavelength: Distance between wave peaks", "Amplitude: Maximum displacement"],
                keyPoints: ["All waves transfer energy", "Sound needs a medium to travel", "Light is an electromagnetic wave"]
              }
            }
          }
        }
      }
    }
  };

  // Quiz questions for each section
  const quizQuestions = {
    "algebra": [
      { question: "Solve for x: 3x + 7 = 22", options: ["x = 3", "x = 5", "x = 7", "x = 9"], answer: "x = 5" },
      { question: "What is the vertex of f(x) = x² - 4x + 3?", options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(-2, 1)"], answer: "(2, -1)" },
      { question: "How many solutions does the system x + y = 5 and 2x + 2y = 10 have?", options: ["0", "1", "2", "Infinite"], answer: "Infinite" }
    ],
    "geometry": [
      { question: "In a right triangle with legs 5 and 12, what is the hypotenuse?", options: ["13", "17", "25", "60"], answer: "13" },
      { question: "What is the area of a circle with radius 4?", options: ["8π", "16π", "32π", "64π"], answer: "16π" },
      { question: "The sum of angles in any triangle is:", options: ["90°", "180°", "270°", "360°"], answer: "180°" }
    ],
    "literature": [
      { question: "What is the central message of a literary work called?", options: ["Plot", "Theme", "Setting", "Character"], answer: "Theme" },
      { question: "A character who changes throughout the story is called:", options: ["Static", "Dynamic", "Flat", "Round"], answer: "Dynamic" },
      { question: "What literary device compares two things without using 'like' or 'as'?", options: ["Simile", "Metaphor", "Alliteration", "Irony"], answer: "Metaphor" }
    ],
    "writing": [
      { question: "The central argument of an essay is called the:", options: ["Topic sentence", "Thesis statement", "Conclusion", "Introduction"], answer: "Thesis statement" },
      { question: "In MLA format, where does the author's last name appear in in-text citations?", options: ["Before the quote", "In parentheses", "In footnotes", "Only in Works Cited"], answer: "In parentheses" },
      { question: "Using someone's work without giving credit is called:", options: ["Research", "Citation", "Plagiarism", "Paraphrasing"], answer: "Plagiarism" }
    ],
    "biology": [
      { question: "The 'powerhouse of the cell' is the:", options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], answer: "Mitochondria" },
      { question: "If both parents are Bb, what percentage of offspring will be bb?", options: ["0%", "25%", "50%", "75%"], answer: "25%" },
      { question: "Which best describes natural selection?", options: ["Survival of the fittest", "Use it or lose it", "Acquired traits are inherited", "Random changes"], answer: "Survival of the fittest" }
    ],
    "chemistry": [
      { question: "How many electrons does a neutral carbon atom have?", options: ["4", "6", "8", "12"], answer: "6" },
      { question: "What type of bond forms between sodium and chlorine?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], answer: "Ionic" },
      { question: "In the reaction 2H₂ + O₂ → 2H₂O, what are the reactants?", options: ["H₂O only", "H₂ and O₂", "2H₂O", "All substances"], answer: "H₂ and O₂" }
    ],
    "physics": [
      { question: "According to Newton's 2nd Law, F = ma. If F = 20N and m = 4kg, what is a?", options: ["5 m/s²", "16 m/s²", "24 m/s²", "80 m/s²"], answer: "5 m/s²" },
      { question: "The kinetic energy formula is:", options: ["mgh", "½mv²", "mv", "Fd"], answer: "½mv²" },
      { question: "If a wave has frequency 50 Hz and speed 100 m/s, its wavelength is:", options: ["0.5 m", "2 m", "50 m", "5000 m"], answer: "2 m" }
    ]
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedSection(null);
    setSelectedLevel(null);
    setShowQuiz(false);
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedLevel(null);
    setShowQuiz(false);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizScore(0);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions[selectedSection].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score and show results
      const questions = quizQuestions[selectedSection];
      let score = 0;
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.answer) {
          score++;
        }
      });
      setQuizScore(score);
      setShowResults(true);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedSection(null);
    setSelectedLevel(null);
    setShowQuiz(false);
    setShowResults(false);
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setSelectedLevel(null);
    setShowQuiz(false);
    setShowResults(false);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setShowQuiz(false);
    setShowResults(false);
  };

  // Duolingo-style button component
  const DuolingoButton = ({ onClick, children, color = "#58CC02", disabled = false, variant = "primary" }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#E5E5E5" : (variant === "secondary" ? "white" : color),
        color: disabled ? "#AFAFAF" : (variant === "secondary" ? color : "white"),
        border: variant === "secondary" ? `3px solid ${color}` : "none",
        borderRadius: "16px",
        padding: "18px 24px",
        fontSize: "18px",
        fontWeight: "700",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.1s ease",
        boxShadow: disabled ? "none" : `0 4px 0 ${variant === "secondary" ? color : "#46A302"}`,
        transform: "translateY(0)",
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        minHeight: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px"
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(4px)";
          e.target.style.boxShadow = "none";
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = `0 4px 0 ${variant === "secondary" ? color : "#46A302"}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = `0 4px 0 ${variant === "secondary" ? color : "#46A302"}`;
        }
      }}
    >
      {children}
    </button>
  );

  // Subject selection view
  if (!selectedSubject) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(180deg, #58CC02 0%, #46A302 100%)",
        padding: "24px",
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          {/* Header */}
          <div style={{ 
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎓</div>
            <h1 style={{ 
              color: "#58CC02", 
              fontSize: "36px", 
              fontWeight: "800",
              margin: "0 0 12px 0",
              fontFamily: "'Nunito', sans-serif"
            }}>
              Learn with LearnLingo
            </h1>
            <p style={{ 
              color: "#777", 
              fontSize: "18px", 
              margin: "0",
              fontWeight: "400"
            }}>
              Master academic subjects in a fun, engaging way!
            </p>
          </div>
          
          {/* Subject Cards */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "20px"
          }}>
            {Object.entries(subjects).map(([subjectKey, subject]) => (
              <div 
                key={subjectKey}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: `4px solid ${subject.color}`,
                  boxShadow: `0 6px 0 ${subject.color}`,
                  transform: "translateY(0)"
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(6px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${subject.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${subject.color}`;
                }}
                onClick={() => handleSubjectSelect(subjectKey)}
              >
                <div style={{ 
                  fontSize: "48px", 
                  marginBottom: "16px",
                  backgroundColor: subject.color,
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  {subject.icon}
                </div>
                <h2 style={{ 
                  color: "#333", 
                  fontSize: "24px", 
                  fontWeight: "700",
                  margin: "0 0 12px 0"
                }}>
                  {subject.title}
                </h2>
                <p style={{ 
                  color: "#777", 
                  fontSize: "16px", 
                  margin: "0",
                  lineHeight: "1.4"
                }}>
                  {subject.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Bottom message */}
          <div style={{ 
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "16px",
            padding: "24px",
            marginTop: "32px",
            color: "white",
            fontWeight: "600"
          }}>
            <p style={{ margin: "0", fontSize: "18px" }}>
              🌟 Start your learning journey today! 🚀
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentSubject = subjects[selectedSubject];

  // Section selection view
  if (selectedSubject && !selectedSection) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${currentSubject.color} 0%, #2E7D00 100%)`,
        padding: "24px",
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ 
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "32px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <DuolingoButton 
                onClick={handleBackToSubjects}
                variant="secondary"
                color="#777"
              >
                ← Back
              </DuolingoButton>
            </div>
            
            <div style={{ 
              fontSize: "48px", 
              marginBottom: "16px",
              backgroundColor: currentSubject.color,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              {currentSubject.icon}
            </div>
            <h1 style={{ 
              color: "#333", 
              fontSize: "32px", 
              fontWeight: "800",
              margin: "0 0 12px 0"
            }}>
              {currentSubject.title}
            </h1>
            <p style={{ 
              color: "#777", 
              fontSize: "18px", 
              margin: "0"
            }}>
              {currentSubject.description}
            </p>
          </div>
          
          {/* Section Cards */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "20px"
          }}>
            {Object.entries(currentSubject.sections).map(([sectionKey, section]) => (
              <div 
                key={sectionKey}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: `4px solid ${section.color}`,
                  boxShadow: `0 6px 0 ${section.color}`,
                  transform: "translateY(0)",
                  textAlign: "center"
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(6px)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${section.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 0 ${section.color}`;
                }}
                onClick={() => handleSectionSelect(sectionKey)}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "16px",
                  backgroundColor: section.color,
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  {section.icon}
                </div>
                <h2 style={{ 
                  color: "#333", 
                  fontSize: "22px", 
                  fontWeight: "700",
                  margin: "0 0 12px 0"
                }}>
                  {section.title}
                </h2>
                <p style={{ 
                  color: "#777", 
                  fontSize: "16px", 
                  margin: "0",
                  lineHeight: "1.4"
                }}>
                  {section.description}
                </p>
                
                <div style={{ 
                  marginTop: "20px",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "12px",
                  padding: "12px",
                  fontSize: "14px",
                  color: "#666",
                  fontWeight: "600"
                }}>
                  📚 {Object.keys(section.levels).length} Lessons • 🧪 Practice Quiz
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentSection = currentSubject.sections[selectedSection];

  // Quiz view
  if (showQuiz) {
    const questions = quizQuestions[selectedSection];
    
    if (showResults) {
      const percentage = Math.round((quizScore / questions.length) * 100);
      const isExcellent = percentage >= 80;
      const isGood = percentage >= 60;
      
      return (
        <div style={{ 
          minHeight: "100vh",
          background: isExcellent ? "linear-gradient(180deg, #58CC02 0%, #46A302 100%)" : 
                     isGood ? "linear-gradient(180deg, #FF9600 0%, #E8890B 100%)" :
                     "linear-gradient(180deg, #FF4B4B 0%, #E74545 100%)",
          padding: "24px",
          fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{ 
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "48px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)"
          }}>
            <div style={{ fontSize: "80px", marginBottom: "24px" }}>
              {isExcellent ? "🏆" : isGood ? "😊" : "🤔"}
            </div>
            
            <h1 style={{ 
              color: "#333", 
              fontSize: "32px", 
              fontWeight: "800",
              margin: "0 0 16px 0"
            }}>
              {isExcellent ? "Excellent!" : isGood ? "Good Job!" : "Keep Trying!"}
            </h1>
            
            <div style={{
              fontSize: "48px",
              fontWeight: "800",
              color: isExcellent ? "#58CC02" : isGood ? "#FF9600" : "#FF4B4B",
              margin: "24px 0"
            }}>
              {quizScore}/{questions.length}
            </div>
            
            <div style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#666",
              marginBottom: "32px"
            }}>
              {percentage}% Correct
            </div>
            
            <p style={{ 
              color: "#777", 
              fontSize: "18px", 
              margin: "0 0 32px 0",
              lineHeight: "1.5"
            }}>
              {isExcellent ? "🌟 Amazing work! You've mastered this topic!" : 
               isGood ? "📚 Great progress! Review the material and try again to improve." :
               "📖 Don't give up! Study the concepts and take the quiz again."}
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <DuolingoButton 
                onClick={handleStartQuiz}
                color="#58CC02"
              >
                🔄 Try Again
              </DuolingoButton>
              
              <DuolingoButton 
                onClick={handleBackToLevels}
                variant="secondary"
                color="#1CB0F6"
              >
                📚 Back to Lessons
              </DuolingoButton>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
      <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1CB0F6 0%, #1899D6 100%)",
        padding: "24px",
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Progress bar */}
          <div style={{
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "12px",
            height: "16px",
            marginBottom: "24px",
            overflow: "hidden"
          }}>
            <div style={{
              backgroundColor: "#58CC02",
              height: "100%",
              width: `${progress}%`,
              borderRadius: "12px",
              transition: "width 0.3s ease"
            }} />
          </div>
          
          {/* Back button */}
          <div style={{ marginBottom: "24px" }}>
            <DuolingoButton 
              onClick={handleBackToLevels}
              variant="secondary"
              color="white"
            >
              ← Back
            </DuolingoButton>
          </div>
          
          {/* Question card */}
          <div style={{ 
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
          }}>
            <div style={{ 
              color: "#777", 
              fontSize: "16px", 
              fontWeight: "600",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            
            <h2 style={{ 
              color: "#333", 
              fontSize: "24px", 
              fontWeight: "700",
              margin: "0 0 32px 0",
              lineHeight: "1.4",
              textAlign: "center"
            }}>
              {currentQuestion.question}
            </h2>
            
            {/* Answer options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                  style={{
                    padding: "20px",
                    fontSize: "18px",
                    fontWeight: "600",
                    backgroundColor: selectedAnswers[currentQuestionIndex] === option ? "#DDF4FF" : "#F7F7F7",
                    color: selectedAnswers[currentQuestionIndex] === option ? "#1CB0F6" : "#333",
                    border: selectedAnswers[currentQuestionIndex] === option ? "3px solid #1CB0F6" : "3px solid transparent",
                    borderRadius: "16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    fontFamily: "'Nunito', sans-serif"
                  }}
                  onMouseOver={(e) => {
                    if (selectedAnswers[currentQuestionIndex] !== option) {
                      e.target.style.backgroundColor = "#F0F0F0";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedAnswers[currentQuestionIndex] !== option) {
                      e.target.style.backgroundColor = "#F7F7F7";
                    }
                  }}
                >
                  <span style={{ 
                    backgroundColor: selectedAnswers[currentQuestionIndex] === option ? "#1CB0F6" : "#E5E5E5",
                    color: selectedAnswers[currentQuestionIndex] === option ? "white" : "#777",
                    borderRadius: "8px",
                    padding: "4px 8px",
                    marginRight: "12px",
                    fontSize: "16px",
                    fontWeight: "700"
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <DuolingoButton
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestionIndex]}
            color="#58CC02"
          >
            {currentQuestionIndex < questions.length - 1 ? "Continue →" : "Complete Quiz! 🏁"}
          </DuolingoButton>
        </div>
      </div>
    );
  }

  // Level selection view
  if (selectedSubject && selectedSection && !selectedLevel) {
    return (
      <div style={{ 
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${currentSection.color} 0%, #2E7D00 100%)`,
        padding: "24px",
        fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ 
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "32px",
            marginBottom: "32px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <DuolingoButton 
                onClick={handleBackToSections}
                variant="secondary"
                color="#777"
              >
                ← Back to Sections
              </DuolingoButton>
            </div>
            
            <div style={{ 
              fontSize: "48px", 
              marginBottom: "16px",
              backgroundColor: currentSection.color,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              {currentSection.icon}
            </div>
            <h1 style={{ 
              color: "#333", 
              fontSize: "32px", 
              fontWeight: "800",
              margin: "0 0 12px 0"
            }}>
              {currentSection.title}
            </h1>
            <p style={{ 
              color: "#777", 
              fontSize: "18px", 
              margin: "0 0 24px 0"
            }}>
              {currentSection.description}
            </p>

            <DuolingoButton 
              onClick={handleStartQuiz}
              color="#FF4B4B"
            >
              🎯 Take Section Quiz
            </DuolingoButton>
          </div>
          
          {/* Level progression */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "20px",
            alignItems: "center"
          }}>
            {Object.entries(currentSection.levels).map(([levelNum, level], index) => (
              <div key={levelNum} style={{ position: "relative", width: "100%", maxWidth: "300px" }}>
                {index > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: "20px",
                    width: "4px",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "2px"
                  }} />
                )}
                
                <div 
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: `6px solid ${currentSection.color}`,
                    boxShadow: `0 8px 0 ${currentSection.color}`,
                    transform: "translateY(0)",
                    margin: "0 auto",
                    position: "relative"
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "translateY(8px)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 0 ${currentSection.color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 0 ${currentSection.color}`;
                  }}
                  onClick={() => handleLevelSelect(parseInt(levelNum))}
                >
                  <div style={{ 
                    fontSize: "32px", 
                    fontWeight: "800",
                    color: currentSection.color,
                    marginBottom: "4px"
                  }}>
                    {levelNum}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    fontWeight: "700",
                    color: "#777",
                    textAlign: "center",
                    lineHeight: "1.2"
                  }}>
                    LESSON
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "16px",
                  marginTop: "16px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{ 
                    color: "#333", 
                    fontSize: "18px", 
                    fontWeight: "700",
                    margin: "0",
                    lineHeight: "1.3"
                  }}>
                    {level.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Individual level view
  const currentLevel = currentSection.levels[selectedLevel];

  return (
    <div style={{ 
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${currentSection.color} 0%, #2E7D00 100%)`,
      padding: "24px",
      fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <DuolingoButton 
            onClick={handleBackToLevels}
            variant="secondary"
            color="white"
          >
            ← Back to Lessons
          </DuolingoButton>
        </div>
        
        {/* Content card */}
        <div style={{ 
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "32px",
          marginBottom: "24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ 
              fontSize: "40px", 
              marginBottom: "16px",
              backgroundColor: currentSection.color,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              {currentSection.icon}
            </div>
            <h1 style={{ 
              color: "#333", 
              fontSize: "28px", 
              fontWeight: "800",
              margin: "0 0 8px 0"
            }}>
              Lesson {selectedLevel}: {currentLevel.title}
            </h1>
          </div>
          
          {/* Main content */}
          <div style={{ marginBottom: "24px" }}>
            <p style={{ 
              fontSize: "18px", 
              lineHeight: "1.6", 
              color: "#333",
              marginBottom: "24px"
            }}>
              {currentLevel.content}
            </p>
          </div>
          
          {/* Examples */}
          <div style={{ 
            backgroundColor: "#F0F8FF",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#1CB0F6", 
              fontSize: "20px", 
              fontWeight: "700",
              margin: "0 0 16px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              💡 Examples
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              {currentLevel.examples.map((example, index) => (
                <li key={index} style={{ 
                  marginBottom: "8px", 
                  fontSize: "16px",
                  color: "#333",
                  lineHeight: "1.5"
                }}>
                  {example}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Practice */}
          <div style={{ 
            backgroundColor: "#FFF0E6",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px"
          }}>
            <h3 style={{ 
              color: "#FF9600", 
              fontSize: "20px", 
              fontWeight: "700",
              margin: "0 0 12px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              🎯 Practice Problem
            </h3>
            <p style={{ 
              margin: "0", 
              fontSize: "16px",
              color: "#333",
              lineHeight: "1.5"
            }}>
              {currentLevel.practice}
            </p>
          </div>

          {/* Study Notes */}
          <div style={{ 
            backgroundColor: "#F8F9FA",
            borderRadius: "16px",
            padding: "24px"
          }}>
            <h3 style={{ 
              color: "#6C757D", 
              fontSize: "20px", 
              fontWeight: "700",
              margin: "0 0 20px 0",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              📝 Study Notes
            </h3>
            
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ 
                color: "#495057", 
                fontSize: "16px", 
                fontWeight: "700",
                margin: "0 0 12px 0"
              }}>
                📚 Key Definitions:
              </h4>
              <ul style={{ margin: "0", paddingLeft: "20px" }}>
                {currentLevel.notes.definitions.map((definition, index) => (
                  <li key={index} style={{ 
                    marginBottom: "6px", 
                    fontSize: "15px",
                    color: "#666",
                    lineHeight: "1.4"
                  }}>
                    {definition}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ 
                color: "#495057", 
                fontSize: "16px", 
                fontWeight: "700",
                margin: "0 0 12px 0"
              }}>
                🔑 Important Points:
              </h4>
              <ul style={{ margin: "0", paddingLeft: "20px" }}>
                {currentLevel.notes.keyPoints.map((point, index) => (
                  <li key={index} style={{ 
                    marginBottom: "6px", 
                    fontSize: "15px",
                    color: "#666",
                    lineHeight: "1.4"
                  }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <DuolingoButton
            onClick={handleBackToLevels}
            color="#58CC02"
          >
            ✅ Continue
          </DuolingoButton>
          
          <DuolingoButton
            onClick={handleStartQuiz}
            variant="secondary"
            color="#FF4B4B"
          >
            🎯 Practice Quiz
          </DuolingoButton>
        </div>
      </div>
    </div>
  );
}

export default App;
