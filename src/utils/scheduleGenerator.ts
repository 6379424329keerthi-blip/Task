import { StudyDay, StudySlot } from '../types/planner';
import { SUBJECTS_DATA } from '../data/curriculumData';

export const generateDefaultSchedule = (): StudyDay[] => {
  const days: StudyDay[] = [];
  const startDate = new Date(2026, 9, 12); // Oct 12, 2026

  for (let i = 0; i < 29; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayNumber = i + 1;

    let phase: StudyDay['phase'];
    let theme = '';
    const slots: StudySlot[] = [];

    if (dayNumber <= 10) {
      phase = 'Phase 1: High Weight Modules (6 & 5)';
      // Reverse order: Modules 6 and 5
      if (dayNumber === 1) {
        theme = 'Module 6 Kickoff: Advanced Distributed & Intelligent Systems';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 6, 'Core Concept Learning', 'Quantum Fourier Transform & Shor\'s Factoring Algorithm theory', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'fsd', 6, 'Numerical / Algorithm Problem', 'Node.js Event Loop architecture & custom Express middleware design', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'dbms', 6, 'Karunya Past Paper Practice', 'CAP Theorem vs PACELC & NoSQL architecture 14-mark Part C questions', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 6, 'Summary & Flash Recall', 'Ethics in DS: k-anonymity vs l-diversity and fairness metrics', true)
        );
      } else if (dayNumber === 2) {
        theme = 'Module 6 Deep Dive: Theory of Computation & Algorithms';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 6, 'Core Concept Learning', 'Halting Problem Proof via Diagonalization & Rice\'s Theorem', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 6, 'Numerical / Algorithm Problem', 'Grover\'s Search: Oracle matrix and diffusion operator math', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 6, 'Karunya Past Paper Practice', 'Karunya Question Bank: Express REST API with Mongoose CRUD papers', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'toc', 6, 'Summary & Flash Recall', 'PCP (Post Correspondence Problem) solving instances and match verification', true)
        );
      } else if (dayNumber === 3) {
        theme = 'Module 6 & 5: Security, Cryptography & Concurrency';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 6, 'Core Concept Learning', 'BB84 Quantum Key Distribution protocol & Eavesdropping detection', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 5, 'Numerical / Algorithm Problem', 'Conflict serializability testing using Precedence Graphs', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 6, 'Karunya Past Paper Practice', 'Karunya past papers: Bias mitigation and SHAP/LIME explainability', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 5, 'Summary & Flash Recall', 'Two-Phase Locking (2PL vs Strict 2PL vs Rigorous 2PL) comparisons', true)
        );
      } else if (dayNumber === 4) {
        theme = 'Module 5: Turing Machines & Recommendation Engines';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 5, 'Core Concept Learning', '7-tuple Turing Machine design for non-CFL languages (0^n 1^n 2^n)', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'ds', 5, 'Numerical / Algorithm Problem', 'User-based & Item-based Collaborative filtering similarity matrices', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 5, 'Karunya Past Paper Practice', 'Karunya questions: Shor\'s 9-qubit code and bit/phase flip error circuits', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'fsd', 5, 'Summary & Flash Recall', 'MongoDB Aggregation pipeline ($match, $group, $project) rapid drills', true)
        );
      } else if (dayNumber === 5) {
        theme = 'Module 5: High-Frequency Database & Web Backend';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 5, 'Core Concept Learning', 'Timestamp-based ordering, Thomas Write Rule & Multi-version MVCC', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'fsd', 5, 'Numerical / Algorithm Problem', 'MongoDB Query operators ($elemMatch, $regex) and index optimization', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 5, 'Karunya Past Paper Practice', 'Karunya papers: Designing TM transition tables for {w w^R} strings', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 5, 'Summary & Flash Recall', 'Hybrid recommender systems & NDCG/MAP evaluation formulas', true)
        );
      } else if (dayNumber === 6) {
        theme = 'Module 5 & 6 Mastery: Quantum Error Correction & Multi-Qubit';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 5, 'Core Concept Learning', 'Quantum noise channels, decoherence times (T1, T2) & Steane code', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 5, 'Numerical / Algorithm Problem', 'TM as computer of integer functions (addition, multiplication)', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'dbms', 5, 'Karunya Past Paper Practice', 'Karunya Part C: Concurrency control protocols & deadlock handling', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'fsd', 6, 'Summary & Flash Recall', 'JWT Authentication & Express error handling middleware review', true)
        );
      } else if (dayNumber === 7) {
        theme = 'Module 6 & 5 Consolidation: Part C (14-16 Marks) Intensive';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'ds', 5, 'Core Concept Learning', 'Retail & hotel recommender system architecture end-to-end design', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 6, 'Numerical / Algorithm Problem', 'Phase estimation algorithm circuit analysis & period finding step', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 5, 'Karunya Past Paper Practice', 'Karunya past papers: Complex MongoDB queries and aggregations', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 6, 'Summary & Flash Recall', 'Graph databases (Neo4j) vs Columnar stores (Cassandra) cheat-sheet', true)
        );
      } else if (dayNumber === 8) {
        theme = 'Cross-Subject Module 6 & 5 Karunya Question Bank Sprint';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 6, 'Karunya Past Paper Practice', 'Karunya 2023-2025: All Part B and C questions on Undecidability', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 6, 'Karunya Past Paper Practice', 'Karunya 2023-2025: All NoSQL and CAP Theorem exam questions', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 6, 'Karunya Past Paper Practice', 'Karunya 2023-2025: Ethics in Data Science case studies', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 5, 'Summary & Flash Recall', 'Shor\'s 9-qubit code syndrome decoding table memory drill', true)
        );
      } else if (dayNumber === 9) {
        theme = 'High-Weight Self-Assessment & Buffer: Modules 6 & 5';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'fsd', 6, 'Karunya Past Paper Practice', 'Timed test: Node.js/Express backend architecture (14-mark question)', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 5, 'Karunya Past Paper Practice', 'Timed test: Full TM design with state transitions (14-mark question)', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 6, 'Karunya Past Paper Practice', 'Timed test: Grover\'s algorithm and BB84 protocol (14-mark question)', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 5, 'Summary & Flash Recall', 'Recommender systems collaborative matrix math speed run', true)
        );
      } else {
        theme = 'Module 6 & 5 Victory Review & Transition to Module 4';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 5, 'Core Concept Learning', 'Multiple Granularity Locking & Snapshot Isolation review', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'ds', 4, 'Core Concept Learning', 'Module 4 Jumpstart: Supervised Learning & Regression equations', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 4, 'Core Concept Learning', 'Module 4 Jumpstart: Bell States & Quantum Entanglement math', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'toc', 4, 'Summary & Flash Recall', 'Module 4 Jumpstart: Pushdown Automata 7 tuples & stack intuition', true)
        );
      }
    } else if (dayNumber <= 20) {
      phase = 'Phase 2: Core Deep-Dives (4 & 3)';
      // Modules 4 & 3
      if (dayNumber === 11) {
        theme = 'Module 4 Heavyweight: Machine Learning & Entanglement';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'ds', 4, 'Numerical / Algorithm Problem', 'ID3 Decision Tree: Entropy, Information Gain & Gini calculations', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 4, 'Core Concept Learning', 'No-Cloning Theorem proof & Quantum Teleportation full circuit', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 4, 'Core Concept Learning', 'ReactJS: Virtual DOM, Hooks lifecycle (useState, useEffect, useMemo)', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 4, 'Summary & Flash Recall', 'RAID levels (RAID 0, 1, 5, 6, 10) architectural comparisons', true)
        );
      } else if (dayNumber === 12) {
        theme = 'Module 4 Heavyweight: B+ Trees & Pushdown Automata';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 4, 'Numerical / Algorithm Problem', 'B+ Tree step-by-step construction, node splits and key deletions', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 4, 'Core Concept Learning', 'PDA construction for palindromes and equal {a^n b^n} languages', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 4, 'Numerical / Algorithm Problem', 'Superdense Coding protocol & Bell basis measurement math', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 4, 'Summary & Flash Recall', 'K-Means clustering vs Agglomerative Hierarchical dendrograms', true)
        );
      } else if (dayNumber === 13) {
        theme = 'Module 4 & 3: React Routing & Normalization Foundations';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'fsd', 4, 'Numerical / Algorithm Problem', 'React Router DOM, controlled form components & Context API', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 3, 'Core Concept Learning', 'Functional Dependencies, Armstrong Axioms & Attribute Closure', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 4, 'Karunya Past Paper Practice', 'Karunya Question Bank: Decision Tree & Logistic Regression 14-markers', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 4, 'Summary & Flash Recall', 'Bell States mathematical expansions and CNOT gate action table', true)
        );
      } else if (dayNumber === 14) {
        theme = 'Module 3 Super-Priority: Database Normalization (3NF & BCNF)';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 3, 'Numerical / Algorithm Problem', 'Candidate Key finding algorithm & Canonical Cover computation', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 3, 'Core Concept Learning', 'Chomsky Normal Form (CNF) conversion & grammar simplification', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 3, 'Core Concept Learning', 'Single-Qubit Gates: Bloch sphere rotations & Pauli X, Y, Z matrices', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 3, 'Summary & Flash Recall', 'Descriptive statistics & Central Limit Theorem properties', true)
        );
      } else if (dayNumber === 15) {
        theme = 'Module 3: Normalization Decompositions & Pumping Lemma';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 3, 'Numerical / Algorithm Problem', 'Lossless join & Dependency preserving decomposition into 3NF/BCNF', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 3, 'Numerical / Algorithm Problem', 'Pumping Lemma for CFLs to prove non-context-free languages', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 3, 'Core Concept Learning', 'Hypothesis Testing: Null/Alternate hypothesis, Z-test & t-tests', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'fsd', 3, 'Summary & Flash Recall', 'jQuery selectors, DOM traversal methods and animation events', false)
        );
      } else if (dayNumber === 16) {
        theme = 'Module 3: Quantum Gates Math & Statistical Inference';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 3, 'Numerical / Algorithm Problem', 'Hadamard, Phase (S, T) gates matrix products & universal sets', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'ds', 3, 'Numerical / Algorithm Problem', 'Chi-Square test & Pearson correlation numerical problem practice', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'dbms', 3, 'Karunya Past Paper Practice', 'Karunya Question Bank: Banking database ER diagram reduction', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'toc', 3, 'Summary & Flash Recall', 'Ambiguous grammars & CYK algorithm membership table rules', true)
        );
      } else if (dayNumber === 17) {
        theme = 'Karunya Past Paper Intensive: Modules 4 & 3';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 4, 'Karunya Past Paper Practice', 'Karunya questions: Dynamic Hashing vs Extendible Hashing papers', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'fsd', 4, 'Karunya Past Paper Practice', 'Karunya questions: E-commerce shopping cart in React with hooks', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 4, 'Karunya Past Paper Practice', 'Karunya questions: PDA to CFG and CFG to PDA conversion proofs', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 3, 'Summary & Flash Recall', 'Bloch sphere coordinate angles theta, phi for Pauli eigenstates', true)
        );
      } else if (dayNumber === 18) {
        theme = 'Karunya Past Paper Intensive: TOC & QC Derivations';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 3, 'Karunya Past Paper Practice', 'Karunya papers: GNF and CNF grammar normalization conversions', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 4, 'Karunya Past Paper Practice', 'Karunya papers: Complete derivation of Quantum Teleportation math', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 4, 'Karunya Past Paper Practice', 'Karunya papers: K-Means clustering step-by-step numerical workout', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 3, 'Summary & Flash Recall', 'Multi-valued dependencies (4NF) and Join dependencies (5NF)', true)
        );
      } else if (dayNumber === 19) {
        theme = 'Phase 2 Timed Mock Test: Modules 4 & 3';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'dbms', 3, 'Karunya Past Paper Practice', 'Timed Test: 14-mark Normalization problem (Candidate key + 3NF)', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'ds', 3, 'Karunya Past Paper Practice', 'Timed Test: 8-mark Student t-test & ANOVA hypothesis test', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 4, 'Karunya Past Paper Practice', 'Timed Test: React State Management with custom hooks code', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'toc', 4, 'Summary & Flash Recall', 'PDA instantaneous descriptions (ID) sequence validation', true)
        );
      } else {
        theme = 'Phase 2 Wrap-up & Transition to Modules 2 & 1';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 3, 'Core Concept Learning', 'Universal quantum gate sets and Solovay-Kitaev theorem recap', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 2, 'Core Concept Learning', 'Module 2 Jumpstart: SQL queries, Correlated subqueries & Triggers', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 2, 'Core Concept Learning', 'Module 2 Jumpstart: NFA to DFA conversion & Minimization', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'fsd', 2, 'Summary & Flash Recall', 'Module 2 Jumpstart: JavaScript closures, event loop & DOM API', false)
        );
      }
    } else if (dayNumber <= 25) {
      phase = 'Phase 3: Foundations & Fast Recall (2 & 1)';
      // Modules 2 & 1
      if (dayNumber === 21) {
        theme = 'Module 2: Finite Automata & Advanced SQL';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 2, 'Numerical / Algorithm Problem', 'DFA Minimization via Table Filling & Myhill-Nerode Theorem', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 2, 'Numerical / Algorithm Problem', 'Complex SQL: Correlated subqueries, Outer Joins & PL/SQL Triggers', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'qc', 2, 'Core Concept Learning', 'Hilbert Space, Dirac Bra-Ket notation & Hermitian operators', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 2, 'Summary & Flash Recall', 'Data wrangling in Pandas: groupby, fillna, outlier detection IQR', false)
        );
      } else if (dayNumber === 22) {
        theme = 'Module 2: Quantum Math & Client-side Scripting';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 2, 'Numerical / Algorithm Problem', 'Eigenvalues, Eigenvectors & Projective measurement probabilities', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'fsd', 2, 'Numerical / Algorithm Problem', 'JavaScript Regex form validation scripts & DOM manipulation', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 2, 'Karunya Past Paper Practice', 'Karunya Question Bank: Moore vs Mealy machine conversions', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 2, 'Summary & Flash Recall', 'SQL Views, integrity constraints & embedded SQL syntax', false)
        );
      } else if (dayNumber === 23) {
        theme = 'Module 1: Regular Expressions & Database Architecture';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'toc', 1, 'Core Concept Learning', 'Chomsky Hierarchy of Languages & Regular Expression identities', false),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 1, 'Core Concept Learning', 'Relational Algebra expressions: Division, Joins & 3-Schema model', false),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 1, 'Core Concept Learning', 'Data Science life cycle & dataset properties (Part A focus)', false),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 1, 'Summary & Flash Recall', 'DiVincenzo criteria & physical qubit realizations memory drill', false)
        );
      } else if (dayNumber === 24) {
        theme = 'Module 1: Web Design & Quantum Foundations';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'fsd', 1, 'Core Concept Learning', 'CSS Box model, Flexbox/Grid layouts & semantic HTML5', false),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 1, 'Core Concept Learning', 'Classical vs Quantum computing limits & Moore\'s law constraints', false),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 1, 'Karunya Past Paper Practice', 'Karunya Question Bank: Arden\'s Theorem & DFA to RE conversions', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 1, 'Summary & Flash Recall', 'Physical vs Logical data independence & Relational integrity rules', false)
        );
      } else {
        theme = 'Modules 2 & 1 Part A (2-Mark) Rapid Fire Marathon';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'ds', 2, 'Karunya Past Paper Practice', 'Karunya 2-mark definitions marathon across Modules 1 & 2', false),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 2, 'Karunya Past Paper Practice', 'Karunya 2-mark queries and architectural comparisons', false),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 2, 'Karunya Past Paper Practice', 'Karunya 2-mark web standards & JavaScript scope questions', false),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 2, 'Summary & Flash Recall', 'Quantum state normalization and inner product quick checks', false)
        );
      }
    } else {
      phase = 'Phase 4: Full Karunya Mock Papers';
      // Days 26 to 29 (Nov 6 to Nov 9) - Exam eve!
      if (dayNumber === 26) {
        theme = 'Karunya Full Mock Paper 1: Data Science & DBMS';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'ds', 6, 'Karunya Past Paper Practice', 'Full 3-Hour Simulated Paper: Data Science (Reverse Modules 6 to 1)', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 5, 'Karunya Past Paper Practice', 'Full 3-Hour Simulated Paper: DBMS (Normalization + Transactions)', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'ds', 4, 'Summary & Flash Recall', 'Paper Review & Weak Topic Remediation (Decision Trees & Bias)', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'dbms', 6, 'Summary & Flash Recall', 'NoSQL CAP Theorem and Indexing formula revision', true)
        );
      } else if (dayNumber === 27) {
        theme = 'Karunya Full Mock Paper 2: Web Dev & TOC Automata';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'fsd', 6, 'Karunya Past Paper Practice', 'Full 3-Hour Simulated Paper: Full Stack Web Development', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'toc', 5, 'Karunya Past Paper Practice', 'Full 3-Hour Simulated Paper: Theory of Computation (TM + Halting)', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'fsd', 4, 'Summary & Flash Recall', 'Paper Review: React Hook dependencies & Express error codes', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'toc', 6, 'Summary & Flash Recall', 'Rice\'s theorem and PCP pairs quick-solving check', true)
        );
      } else if (dayNumber === 28) {
        theme = 'Karunya Full Mock Paper 3: Quantum Computing Mastery';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'qc', 6, 'Karunya Past Paper Practice', 'Full 3-Hour Simulated Paper: Quantum Computing (Grover + Teleportation)', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'qc', 4, 'Summary & Flash Recall', 'Quantum Circuits & Shor 9-qubit code final perfection', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'dbms', 3, 'Karunya Past Paper Practice', 'High-Weight Rapid Problem solving: 3NF/BCNF decomposition', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'ds', 5, 'Summary & Flash Recall', 'Recommendation algorithms similarity formulas check', true)
        );
      } else {
        // Day 29 - Nov 09, 2026: Pre-Exam Mindset & Final Quick Scan
        theme = 'Exam Eve: 5-Subject Quick Scan & High-Weight Confidence Lock';
        slots.push(
          createSlot(dateStr, 'Morning (09:00 - 11:30)', 'ds', 6, 'Summary & Flash Recall', 'Data Science: 10 High-Weight Karunya Expected Questions Scan', true),
          createSlot(dateStr, 'Afternoon (14:00 - 16:30)', 'dbms', 5, 'Summary & Flash Recall', 'DBMS & Web Dev: Final Architecture & Normalization Diagrams', true),
          createSlot(dateStr, 'Evening (18:30 - 21:00)', 'toc', 5, 'Summary & Flash Recall', 'TOC & Quantum: Transition Tables & Teleportation Circuit Scan', true),
          createSlot(dateStr, 'Night Recall (21:30 - 22:30)', 'qc', 6, 'Summary & Flash Recall', 'Exam Hall Kit Check, Hall Ticket, Calm Sleep for Tomorrow Nov 10!', false)
        );
      }
    }

    days.push({
      date: dateStr,
      dayNumber,
      phase,
      focusTheme: theme,
      slots,
    });
  }

  return days;
};

function createSlot(
  dateStr: string,
  timeSlot: StudySlot['timeSlot'],
  subjectId: string,
  moduleNumber: number,
  activity: StudySlot['activity'],
  description: string,
  highPriority: boolean
): StudySlot {
  const subject = SUBJECTS_DATA.find((s) => s.id === subjectId);
  const mod = subject?.modules.find((m) => m.moduleNumber === moduleNumber);

  return {
    id: `slot-${dateStr}-${timeSlot.slice(0, 3)}-${subjectId}-${moduleNumber}`,
    timeSlot,
    subjectId,
    subjectName: subject?.name || subjectId,
    moduleNumber,
    moduleTitle: mod?.title || `Module ${moduleNumber}`,
    activity,
    description,
    highPriority,
    completed: false,
  };
}
