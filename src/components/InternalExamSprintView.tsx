import React, { useState, useEffect } from 'react';
import {
  Zap,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  AlertCircle,
  BookOpen,
  Award,
  Timer,
  CheckSquare,
  Flame,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  Database,
  Code,
  FileSpreadsheet,
  Check,
  Share2,
  FileText,
  Download,
  X,
  Search,
} from 'lucide-react';
import { KARUNYA_QUESTION_BANK_URL } from '../data/curriculumData';

export interface PdfMaterial {
  id: string;
  name: string;
  shortName: string;
  filename: string;
  size: string;
  module: number;
  description?: string;
  isQuestionBank?: boolean;
}

export interface TopicItem {
  title: string;
  pdfId: string;
  location: string;
  description?: string;
}

export interface SprintSession {
  id: string;
  timeSlot: string;
  title: string;
  module: number;
  moduleName: string;
  topicItems: TopicItem[];
  keyTask: string;
  completed: boolean;
  estMinutes: number;
}

export interface SprintDay {
  dayId: string;
  dayNumber: number;
  dayName: string;
  dateStr: string;
  focusTitle: string;
  moduleCovered: string;
  targetHours: number;
  sessions: SprintSession[];
}

export const ALL_COURSE_PDFS: PdfMaterial[] = [
  // Module 1
  {
    id: 'pdf-m1-1',
    name: '1. Introduction-Database System Application- Purpose of Database System',
    shortName: '1. Intro & Purpose.pdf',
    filename: '1. Introduction-Dtabase System Application- Purpose of Database System.pptx.pdf',
    size: '147.2 KB',
    module: 1,
    description: 'DBMS applications, file system drawbacks, data abstraction & schemas',
  },
  {
    id: 'pdf-m1-2',
    name: '2. View of Data - DB Language',
    shortName: '2. View of Data.pdf',
    filename: '2. View of Data - DB Language.pptx.pdf',
    size: '855.3 KB',
    module: 1,
    description: 'Three schema levels, physical & logical data independence, DDL & DML languages',
  },
  {
    id: 'pdf-m1-3',
    name: '4. Database Architecture (Lecture Slides)',
    shortName: '4. DB Architecture.pdf',
    filename: '4. Database Architecture.pptx.pdf',
    size: '506.3 KB',
    module: 1,
    description: 'Storage manager, query processor, centralized & client-server architecture',
  },
  {
    id: 'pdf-m1-4',
    name: 'DBMS Architecture (Diagrams & Notes)',
    shortName: 'dbms architecture.pdf',
    filename: 'dbms architecture.pdf',
    size: '317.2 KB',
    module: 1,
    description: 'Diagrammatic reference for 3-Schema Architecture and functional components',
  },
  {
    id: 'pdf-m1-5',
    name: '3.1. Relational Database - Tables & Tuples',
    shortName: '3.1. Relational Tables.pdf',
    filename: '3.1. Relational Database- Tables.pptx.pdf',
    size: '536.4 KB',
    module: 1,
    description: 'Relational model structure, domains, attributes, tuples & relational integrity',
  },
  {
    id: 'pdf-m1-6',
    name: '3.4. Database Design Foundations',
    shortName: '3.4. DB Design.pdf',
    filename: '3.4. Database Design.pptx.pdf',
    size: '229.9 KB',
    module: 1,
    description: 'Design phases, schema diagrams and ER-to-relational design foundations',
  },
  {
    id: 'pdf-m1-7',
    name: '6. Database Keys Mastery (Candidate, Super, PK, FK)',
    shortName: '6. Keys.pdf',
    filename: '6. Keys.pptx.pdf',
    size: '1.2 MB',
    module: 1,
    description: 'Super Key, Candidate Key, Primary Key, Alternate Key & Foreign Key constraints',
  },
  {
    id: 'pdf-m1-8',
    name: '5. Distributed DB and Data Warehousing',
    shortName: '5. Distributed DB.pdf',
    filename: '5. Distributed DB and Data Warehousing.pptx.pdf',
    size: '622.5 KB',
    module: 1,
    description: 'Distributed database architecture, fragmentation & data warehousing concepts',
  },

  // Module 2
  {
    id: 'pdf-m2-1',
    name: 'Module 1 & 2 Introduction to SQL',
    shortName: 'Intro to SQL.pdf',
    filename: 'Module1_ Introduction_to_SQL.pptx.pdf',
    size: '599.9 KB',
    module: 2,
    description: 'Overview of SQL, DDL, basic structure of SQL queries, set operations & aggregates',
  },
  {
    id: 'pdf-m2-2',
    name: 'SQL Joins (Inner, Outer, Self Joins)',
    shortName: 'SQL Joins.pdf',
    filename: 'SQL_Joins.pptx.pdf',
    size: '259.8 KB',
    module: 2,
    description: 'Inner Join, Natural Join, Left/Right/Full Outer Joins with query syntax',
  },
  {
    id: 'pdf-m2-3',
    name: 'Joins and Set Operations (Relational Algebra & SQL)',
    shortName: 'Joins and Set.pdf',
    filename: 'Joins and set.pptx.pdf',
    size: '1.1 MB',
    module: 2,
    description: 'Relational algebra joins, set operations (Union, Intersect, Except) and examples',
  },
  {
    id: 'pdf-m2-4',
    name: 'SQL Mid & Advanced Concepts',
    shortName: 'SQL Advanced.pdf',
    filename: 'SQL_Mid_Advanced_Concepts.pptx.pdf',
    size: '383.5 KB',
    module: 2,
    description: 'Nested subqueries, correlated subqueries, views, integrity constraints & authorization',
  },
  {
    id: 'pdf-m2-5',
    name: 'Database Triggers & PL/SQL',
    shortName: 'Triggers.pdf',
    filename: 'Triggers.pptx.pdf',
    size: '640.1 KB',
    module: 2,
    description: 'Trigger architecture, BEFORE/AFTER row triggers, :OLD and :NEW qualifiers & audit examples',
  },
  {
    id: 'pdf-m2-6',
    name: 'Assignment Questions in PL/SQL & Triggers',
    shortName: 'PLSQL Questions.pdf',
    filename: 'Assiignment Questions in PLSQL.docx.pdf',
    size: '56.9 KB',
    module: 2,
    description: 'Karunya assignment problems for stored procedures, functions and trigger scripts',
    isQuestionBank: true,
  },

  // Module 3
  {
    id: 'pdf-m3-1',
    name: '20-21. E-R Diagram Comprehensive Deck',
    shortName: '20-21. E-R Diagram.pdf',
    filename: '20-21. E-R Diagram.pptx.pdf',
    size: '2.2 MB',
    module: 3,
    description: 'Complete E-R modeling, mapping cardinalities, weak entity sets, generalization & aggregation',
  },
  {
    id: 'pdf-m3-2',
    name: 'E-R Model & Schema Reduction Steps',
    shortName: 'e-r model.pdf',
    filename: 'e-r model.pptx.pdf',
    size: '412.4 KB',
    module: 3,
    description: 'Step-by-step reduction of E-R diagrams into relational database tables and schemas',
  },
  {
    id: 'pdf-m3-3',
    name: 'Assignment Questions in ER Models',
    shortName: 'ER Assignments.pdf',
    filename: 'Assignement Questions in ER models.docx.pdf',
    size: '1.2 MB',
    module: 3,
    description: 'Real-world ER design scenarios, banking/hospital problem sets & schema reductions',
    isQuestionBank: true,
  },
  {
    id: 'pdf-m3-4',
    name: 'Armstrong Axioms & Functional Dependencies',
    shortName: 'Armstrong Axioms.pdf',
    filename: 'Armstrong Axioms.pptx.pdf',
    size: '96.3 KB',
    module: 3,
    description: 'Sound and complete inference rules for FDs, attribute closure algorithm & proofs',
  },
  {
    id: 'pdf-m3-5',
    name: 'M3 Normalization and Types (Lecture)',
    shortName: 'M3 Normalization.pdf',
    filename: 'M3 Normalization and types.pptx.pdf',
    size: '348.3 KB',
    module: 3,
    description: 'Functional dependencies, 1NF, 2NF, 3NF, BCNF decomposition and anomalies',
  },
  {
    id: 'pdf-m3-6',
    name: 'Normalization and Types (Detailed Guide)',
    shortName: 'Normalization & Types.pdf',
    filename: 'Normalization and types.pptx.pdf',
    size: '223.9 KB',
    module: 3,
    description: 'Partial dependency, transitive dependency, prime attributes & decomposition rules',
  },
  {
    id: 'pdf-m3-7',
    name: 'Normalization Common Solved Examples',
    shortName: 'Normalization Solved.pdf',
    filename: 'Normalization_Common_Example.pptx.pdf',
    size: '121.5 KB',
    module: 3,
    description: 'Step-by-step solved candidate key numericals and 3NF/BCNF test problems',
    isQuestionBank: true,
  },

  // Internal Question Banks
  {
    id: 'pdf-ia2',
    name: 'IA 2 Official Question Bank (Karunya)',
    shortName: 'IA 2 Question Bank.pdf',
    filename: 'IA 2 Question Bank.docx.pdf',
    size: '108.6 KB',
    module: 0,
    description: 'Official Karunya internal exam question bank with Part A, Part B and Part C questions',
    isQuestionBank: true,
  },
  {
    id: 'pdf-file-org',
    name: 'File Organization Reference',
    shortName: 'File Organization.pdf',
    filename: 'file organization.ppt.pdf',
    size: '1.5 MB',
    module: 4,
    description: 'Storage structures and record organization concepts',
  },
];

interface InternalExamSprintViewProps {
  onOpenTimer?: (sessionName?: string) => void;
  onOpenSyncCalendar?: () => void;
}

export const InternalExamSprintView: React.FC<InternalExamSprintViewProps> = ({
  onOpenTimer,
  onOpenSyncCalendar,
}) => {
  const STORAGE_KEY = 'karunya_internal_sprint_state_v3';

  // Target exam date: Thursday, November 5, 2026, 09:00 AM IST
  const examDate = new Date('2026-11-05T09:00:00+05:30');

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 3, hours: 21, minutes: 59, seconds: 59 });

  const initialDays: SprintDay[] = [
    {
      dayId: 'day-1',
      dayNumber: 1,
      dayName: 'Sunday',
      dateStr: 'November 1, 2026',
      focusTitle: 'Module 1: Architecture, Data Models & Relational Algebra',
      moduleCovered: 'Module 1 (7 Syllabus Hours)',
      targetHours: 7,
      sessions: [
        {
          id: 's1-1',
          timeSlot: 'Morning (08:30 - 11:00)',
          title: 'DBMS Architecture & Data Independence',
          module: 1,
          moduleName: 'Introduction & Database Architecture',
          keyTask: 'Draw 3-Schema Architecture diagram & memorize data independence definitions',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Purpose of Database Systems vs Traditional File Processing System',
              pdfId: 'pdf-m1-1',
              location: 'Slide 8–9',
              description: 'Data redundancy, inconsistency, difficulty accessing data, atomicity & security',
            },
            {
              title: 'Three-Schema Architecture (Physical, Conceptual, External views)',
              pdfId: 'pdf-m1-3',
              location: 'Slide 2–7 & 12–13',
              description: 'Storage manager, query processor, centralized & client-server architectures',
            },
            {
              title: 'Physical Data Independence vs Logical Data Independence (Guaranteed 2M)',
              pdfId: 'pdf-m1-2',
              location: 'Slide 12 & 6–11',
              description: 'Physical level modification vs conceptual schema changes & views independence',
            },
            {
              title: 'Database Models: Hierarchical, Network, Relational & Object-based',
              pdfId: 'pdf-m1-2',
              location: 'Slide 3–5',
              description: 'Data model blueprints, relational tables model & E-R data model',
            },
          ],
        },
        {
          id: 's1-2',
          timeSlot: 'Afternoon (11:30 - 13:30)',
          title: 'Relational Model, Structure & Keys Deep Dive',
          module: 1,
          moduleName: 'Introduction & Database Architecture',
          keyTask: 'Write table schemas identifying Candidate Keys vs Foreign Keys',
          completed: false,
          estMinutes: 120,
          topicItems: [
            {
              title: 'Structure of Relational Databases: Tuples, Attributes, Domains & Degree/Cardinality',
              pdfId: 'pdf-m1-5',
              location: 'Slide 1–4 & 13–14',
              description: 'Tables, records, fields, entities and relational table properties',
            },
            {
              title: 'Super Key, Candidate Key, Primary Key & Alternate Keys with examples',
              pdfId: 'pdf-m1-7',
              location: 'Slide 18, 25–28',
              description: 'Primary Key selection, Candidate Key minimality & Alternate Keys',
            },
            {
              title: 'Foreign Key and Referential Integrity Constraints (ON DELETE CASCADE/SET NULL)',
              pdfId: 'pdf-m1-7',
              location: 'Slide 30–35',
              description: 'Referencing foreign table primary key with Department-Employee schema',
            },
            {
              title: 'Database Design Process and Schema Diagrams',
              pdfId: 'pdf-m1-6',
              location: 'Slide 2–7',
              description: 'Requirements analysis, conceptual, logical and physical database design lifecycle',
            },
          ],
        },
        {
          id: 's1-3',
          timeSlot: 'Evening (15:00 - 17:30)',
          title: 'Fundamental Relational Algebra Operations',
          module: 1,
          moduleName: 'Introduction & Database Architecture',
          keyTask: 'Solve 6 query expressions translating English requirements into σ, π, and ∪',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Selection (σ) with complex predicates (AND, OR, NOT)',
              pdfId: 'pdf-m1-2',
              location: 'Slide 13–17',
              description: 'Data manipulation notations, condition filtering and tuple selection',
            },
            {
              title: 'Projection (π) and duplicate elimination behavior',
              pdfId: 'pdf-m1-5',
              location: 'Slide 2–5',
              description: 'Column extraction, attribute subsetting and distinct tuple outputs',
            },
            {
              title: 'Cartesian Product (×) and cross-table combinations',
              pdfId: 'pdf-m2-3',
              location: 'Slide 1–6',
              description: 'M × N tuple cross combinations and pairing schemas',
            },
            {
              title: 'Set Operations: Union (∪), Set Difference (-), and Intersection (∩)',
              pdfId: 'pdf-m2-3',
              location: 'Slide 7–15',
              description: 'Union-compatible relations and set algebra properties',
            },
          ],
        },
        {
          id: 's1-4',
          timeSlot: 'Night Recall (19:30 - 22:00)',
          title: 'Advanced Relational Algebra & Numerical Practice',
          module: 1,
          moduleName: 'Introduction & Database Architecture',
          keyTask: 'Solve the Division query (Find students enrolled in all CS courses) without looking at solutions',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Natural Join (⋈) and Theta Join (⋈_θ)',
              pdfId: 'pdf-m2-3',
              location: 'Slide 16–24',
              description: 'Equi-join on common attributes and general condition joins',
            },
            {
              title: 'Outer Joins: Left Outer (⟕), Right Outer (⟖), Full Outer (⟗)',
              pdfId: 'pdf-m2-2',
              location: 'Slide 10–16',
              description: 'Preserving non-matching rows and padding with NULL values',
            },
            {
              title: 'Division Operator (÷) for "for all" queries (e.g. students who took all courses)',
              pdfId: 'pdf-m2-3',
              location: 'Slide 28–34',
              description: 'Division algebra definition and university queries',
            },
            {
              title: 'Past Karunya Part B Relational Algebra questions solving',
              pdfId: 'pdf-ia2',
              location: 'Page 2–3',
              description: 'University exam questions and formal relational algebra marking scheme',
            },
          ],
        },
      ],
    },
    {
      dayId: 'day-2',
      dayNumber: 2,
      dayName: 'Monday',
      dateStr: 'November 2, 2026',
      focusTitle: 'Module 2: SQL and its Application (DDL, DML, Joins & Triggers)',
      moduleCovered: 'Module 2 (7 Syllabus Hours)',
      targetHours: 7,
      sessions: [
        {
          id: 's2-1',
          timeSlot: 'Morning (08:30 - 11:00)',
          title: 'SQL Overview, DDL, DML & Schema Definition',
          module: 2,
          moduleName: 'SQL and its Application',
          keyTask: 'Write DDL script creating a Student-Enrollment-Course schema with all constraints',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'DDL Commands: CREATE TABLE, ALTER TABLE, DROP TABLE, TRUNCATE TABLE',
              pdfId: 'pdf-m2-1',
              location: 'Slide 5–10',
              description: 'Section 1: Data Definition Language, syntax and table modification',
            },
            {
              title: 'Integrity Constraints: PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK',
              pdfId: 'pdf-m2-1',
              location: 'Slide 9',
              description: 'Core column constraints and database integrity rules',
            },
            {
              title: 'DML Commands: INSERT INTO, UPDATE, DELETE FROM with WHERE clause',
              pdfId: 'pdf-m2-1',
              location: 'Slide 13–18',
              description: 'Data manipulation syntax and conditional tuple modifications',
            },
            {
              title: 'SQL Data types (VARCHAR2, CHAR, INT, NUMERIC, DATE) and Schemas',
              pdfId: 'pdf-m2-1',
              location: 'Slide 7',
              description: 'Built-in SQL data types table and schema structures',
            },
          ],
        },
        {
          id: 's2-2',
          timeSlot: 'Afternoon (11:30 - 13:30)',
          title: 'Basic Queries, Aggregates & GROUP BY / HAVING',
          module: 2,
          moduleName: 'SQL and its Application',
          keyTask: 'Write 5 GROUP BY / HAVING queries (e.g. departments with average salary > 50,000)',
          completed: false,
          estMinutes: 120,
          topicItems: [
            {
              title: 'Basic SELECT-FROM-WHERE with LIKE pattern matching (% and _)',
              pdfId: 'pdf-m2-1',
              location: 'Slide 23–24',
              description: 'String operations and wildcard pattern filtering',
            },
            {
              title: 'Handling NULL values: IS NULL, IS NOT NULL, three-valued logic',
              pdfId: 'pdf-m2-1',
              location: 'Slide 33–37',
              description: 'Unknown data representation and 3-valued boolean evaluation',
            },
            {
              title: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX',
              pdfId: 'pdf-m2-1',
              location: 'Slide 38–39',
              description: 'Section 6: Summarizing numeric data across tables',
            },
            {
              title: 'GROUP BY with HAVING filter clause (Critical difference from WHERE)',
              pdfId: 'pdf-m2-1',
              location: 'Slide 40–41',
              description: 'Partitioning tuples into groups and filtering aggregate metrics',
            },
          ],
        },
        {
          id: 's2-3',
          timeSlot: 'Evening (15:00 - 17:30)',
          title: 'Intermediate SQL: Joins, Nested Queries & Set Operations',
          module: 2,
          moduleName: 'SQL and its Application',
          keyTask: 'Solve 6 complex nested queries with correlated subqueries on paper',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Joins: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, FULL OUTER JOIN',
              pdfId: 'pdf-m2-2',
              location: 'Slide 2–16',
              description: 'Complete SQL Joins deck: Inner, Natural, Left, Right & Full Outer',
            },
            {
              title: 'Subqueries: IN, NOT IN, SOME / ANY, ALL operators',
              pdfId: 'pdf-m2-1',
              location: 'Slide 42–44',
              description: 'Section 7: Nested queries, subquery in WHERE clause and set comparison',
            },
            {
              title: 'Correlated Subqueries using EXISTS and NOT EXISTS (Guaranteed 8M question)',
              pdfId: 'pdf-m2-1',
              location: 'Slide 44–45',
              description: 'Row-by-row outer query correlation and existence tests',
            },
            {
              title: 'Set Operations: UNION, UNION ALL, INTERSECT, EXCEPT (MINUS)',
              pdfId: 'pdf-m2-1',
              location: 'Slide 28–32',
              description: 'Section 4: Combining query results with UNION and INTERSECT',
            },
          ],
        },
        {
          id: 's2-4',
          timeSlot: 'Night Recall (19:30 - 22:00)',
          title: 'Views, Triggers, Stored Procedures & Advanced SQL',
          module: 2,
          moduleName: 'SQL and its Application',
          keyTask: 'Write the complete PL/SQL trigger code for auditing employee salary modifications',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'SQL Views: CREATE VIEW, updateable views vs non-updateable views',
              pdfId: 'pdf-m2-4',
              location: 'Slide 18–21',
              description: 'Part 3: Virtual tables, query simplification & view security',
            },
            {
              title: 'PL/SQL Triggers: BEFORE / AFTER for INSERT, UPDATE, DELETE with :OLD and :NEW',
              pdfId: 'pdf-m2-5',
              location: 'Slide 2–5',
              description: 'Trigger architecture, syntax, benefits & statement vs row level',
            },
            {
              title: 'Audit Log Trigger Implementation (Karunya Past Question!)',
              pdfId: 'pdf-m2-5',
              location: 'Slide 4–8',
              description: 'Auditing salary changes into audit log table using :NEW and :OLD',
            },
            {
              title: 'Functions and Procedures syntax & Dynamic vs Embedded SQL overview',
              pdfId: 'pdf-m2-4',
              location: 'Slide 37–38',
              description: 'Embedded SQL, Functions & Procedures overview and syntax',
            },
          ],
        },
      ],
    },
    {
      dayId: 'day-3',
      dayNumber: 3,
      dayName: 'Tuesday',
      dateStr: 'November 3, 2026',
      focusTitle: 'Module 3: Database Design, E-R Modeling & Normalization',
      moduleCovered: 'Module 3 (7 Syllabus Hours - Highest Weight!)',
      targetHours: 7,
      sessions: [
        {
          id: 's3-1',
          timeSlot: 'Morning (08:30 - 11:00)',
          title: 'E-R Modeling & Reduction to Relational Schema',
          module: 3,
          moduleName: 'Database Design',
          keyTask: 'Draw an ER diagram for a Hospital / Library system and reduce to tabular schemas',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Entity Sets, Relationship Sets, Degree of Relationship',
              pdfId: 'pdf-m3-2',
              location: 'Slide 2–5 & 18',
              description: 'Entities, Strong/Weak entities and higher degree relationships',
            },
            {
              title: 'Constraints: Mapping Cardinalities (1:1, 1:N, M:N) & Participation (Total vs Partial)',
              pdfId: 'pdf-m3-2',
              location: 'Slide 13–17',
              description: 'Mapping cardinality types and participation constraints',
            },
            {
              title: 'Weak Entity Sets & Identifying Relationships (Double rectangle/diamond)',
              pdfId: 'pdf-m3-1',
              location: 'Slide 11–15',
              description: 'Strong vs Weak entities, partial keys and identifying relationships',
            },
            {
              title: 'Step-by-step Reduction of E-R Diagrams to Relational Tables and Schemas',
              pdfId: 'pdf-m3-2',
              location: 'Slide 20–22',
              description: 'Rules for converting entities and M:N relationships into tables',
            },
          ],
        },
        {
          id: 's3-2',
          timeSlot: 'Afternoon (11:30 - 13:30)',
          title: 'Extended E-R Features & Online Banking Case Study',
          module: 3,
          moduleName: 'Database Design',
          keyTask: 'Draw the complete Online Banking ER Diagram with Customer, Account, Transaction & Loan',
          completed: false,
          estMinutes: 120,
          topicItems: [
            {
              title: 'Extended ER: Generalization & Specialization (Top-down vs Bottom-up)',
              pdfId: 'pdf-m3-1',
              location: 'Slide 25–35',
              description: 'Specialization hierarchies, entity inheritance and attribute inheritance',
            },
            {
              title: 'Disjointness (Disjoint vs Overlapping) and Completeness (Total vs Partial) constraints',
              pdfId: 'pdf-m3-1',
              location: 'Slide 36–42',
              description: 'Disjointness rules, overlapping entities and completeness evaluation',
            },
            {
              title: 'Aggregation (Treating a relationship as an entity set)',
              pdfId: 'pdf-m3-1',
              location: 'Slide 43–46',
              description: 'Ternary relationships abstraction and aggregation symbol',
            },
            {
              title: 'Syllabus Case Study: Database Design for Online Banking System',
              pdfId: 'pdf-m3-3',
              location: 'Page 1–3',
              description: 'Comprehensive assignment and banking ER schema reduction exercise',
            },
          ],
        },
        {
          id: 's3-3',
          timeSlot: 'Evening (15:00 - 17:30)',
          title: 'Functional Dependencies & Candidate Key Finding Algorithm',
          module: 3,
          moduleName: 'Database Design',
          keyTask: 'Calculate attribute closures and find all candidate keys for 3 complex relations',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Functional Dependency Theory: Definition of X -> Y and Trivial FDs',
              pdfId: 'pdf-m3-6',
              location: 'Slide 1–6',
              description: 'Formal definition of FDs, trivial and non-trivial dependencies',
            },
            {
              title: 'Armstrong\'s Axioms: Reflexivity, Augmentation, Transitivity (+ Union, Decomposition)',
              pdfId: 'pdf-m3-4',
              location: 'Slide 2–5',
              description: 'Primary axioms (Reflexivity, Augmentation, Transitivity) and secondary inference rules',
            },
            {
              title: 'Attribute Closure Algorithm (X+) - Essential step-by-step method',
              pdfId: 'pdf-m3-5',
              location: 'Slide 4–10',
              description: 'Algorithm to compute (X)+ and determine superkeys',
            },
            {
              title: 'Systematic Algorithm to find ALL Candidate Keys of any given Relation',
              pdfId: 'pdf-m3-5',
              location: 'Slide 11–16',
              description: 'Candidate key finding algorithm with non-RHS attribute isolation',
            },
          ],
        },
        {
          id: 's3-4',
          timeSlot: 'Night Recall (19:30 - 22:00)',
          title: 'Normalization Deep-Dive (1NF, 2NF, 3NF, BCNF, 4NF, 5NF)',
          module: 3,
          moduleName: 'Database Design',
          keyTask: 'Solve Karunya Part C 14-Mark question: Decompose R(A,B,C,D,E,G) into 3NF and BCNF',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: '1NF (Atomic attributes) & 2NF (No partial dependency on candidate key)',
              pdfId: 'pdf-m3-6',
              location: 'Slide 11–17',
              description: 'Atomic attribute constraint and decomposing partial dependencies',
            },
            {
              title: '3NF (No transitive dependency; LHS is superkey OR RHS is prime attribute)',
              pdfId: 'pdf-m3-6',
              location: 'Slide 18–19',
              description: 'Transitive dependency test and 3NF decomposition algorithm',
            },
            {
              title: 'BCNF (Strictly LHS is superkey) - Comparison with 3NF',
              pdfId: 'pdf-m3-6',
              location: 'Slide 20–21',
              description: 'Boyce-Codd Normal Form condition and anomaly elimination',
            },
            {
              title: 'Step-by-Step Solved Normalization Examples across All Normal Forms',
              pdfId: 'pdf-m3-7',
              location: 'Slide 1–10',
              description: 'One messy table transformed through 1NF, 2NF, 3NF, BCNF, 4NF, 5NF',
            },
            {
              title: 'Multi-valued Dependencies (4NF) & Join Dependencies (5NF) overview',
              pdfId: 'pdf-m3-6',
              location: 'Slide 22–25',
              description: 'MVD anomalies and Lossless Join test with 5NF project-join',
            },
          ],
        },
      ],
    },
    {
      dayId: 'day-4',
      dayNumber: 4,
      dayName: 'Wednesday',
      dateStr: 'November 4, 2026',
      focusTitle: 'Internal Exam Simulation, Past Question Drill & Final Polish',
      moduleCovered: 'Modules 1, 2 & 3 Revision (Full Coverage)',
      targetHours: 7.5,
      sessions: [
        {
          id: 's4-1',
          timeSlot: 'Morning (08:30 - 10:45)',
          title: 'Module 1 Rapid Drill & Relational Algebra Speed Run',
          module: 1,
          moduleName: 'Introduction & Database Architecture',
          keyTask: 'Score 100% on Module 1 Part A questions and 1 full Relational Algebra problem',
          completed: false,
          estMinutes: 135,
          topicItems: [
            {
              title: 'Flash review: Physical vs Logical data independence, 3-Schema layers',
              pdfId: 'pdf-m1-3',
              location: 'Slide 2–7',
              description: 'Rapid diagram recall and schema layer definitions',
            },
            {
              title: 'Key definitions: Super, Candidate, Primary, Foreign key, Integrity rules',
              pdfId: 'pdf-m1-7',
              location: 'Slide 18–28',
              description: 'Minimality condition and referential integrity recall',
            },
            {
              title: 'Solve 4 Relational Algebra queries under 20 minutes',
              pdfId: 'pdf-m2-3',
              location: 'Slide 16–34',
              description: 'Natural join, outer joins and division operator speed drill',
            },
          ],
        },
        {
          id: 's4-2',
          timeSlot: 'Afternoon (11:15 - 13:30)',
          title: 'Module 2 SQL Coding Blitz on Paper',
          module: 2,
          moduleName: 'SQL and its Application',
          keyTask: 'Handwrite the trigger and 5 queries on paper in exam conditions',
          completed: false,
          estMinutes: 135,
          topicItems: [
            {
              title: 'Handwrite 6 nested queries with joins, GROUP BY, and HAVING without IDE',
              pdfId: 'pdf-m2-1',
              location: 'Slide 38–45',
              description: 'Pen-and-paper exam conditions writing aggregate nested queries',
            },
            {
              title: 'Handwrite 1 complete PL/SQL trigger (BEFORE UPDATE on Employee)',
              pdfId: 'pdf-m2-5',
              location: 'Slide 4–8',
              description: 'Row trigger syntax with :NEW and :OLD audit log insertion',
            },
            {
              title: 'Verify syntax: Colons, semicolons, correlation names, aggregate filters',
              pdfId: 'pdf-m2-6',
              location: 'Page 1',
              description: 'PL/SQL practice assignment checklist',
            },
          ],
        },
        {
          id: 's4-3',
          timeSlot: 'Evening (14:30 - 17:00)',
          title: 'Module 3 Normalization Numerical Workshop',
          module: 3,
          moduleName: 'Database Design',
          keyTask: 'Master the BCNF decomposition algorithm without making algebraic mistakes',
          completed: false,
          estMinutes: 150,
          topicItems: [
            {
              title: 'Solve 2 full candidate key numericals from Karunya question papers',
              pdfId: 'pdf-m3-7',
              location: 'Slide 3–8',
              description: 'Step-by-step candidate key closures and verification',
            },
            {
              title: 'Decompose relation into 3NF and test for dependency preservation',
              pdfId: 'pdf-m3-6',
              location: 'Slide 18–21',
              description: 'Synthesis algorithm and lossless decomposition checks',
            },
            {
              title: 'Revise Online Banking ER diagram and reduction rules',
              pdfId: 'pdf-m3-3',
              location: 'Page 1–4',
              description: 'Banking ER design and relational table reduction checklist',
            },
          ],
        },
        {
          id: 's4-4',
          timeSlot: 'Night (18:30 - 20:30)',
          title: 'Full 50-Mark Mock Internal Exam Test',
          module: 0,
          moduleName: 'Full Internal Mock Exam',
          keyTask: 'Complete the test in 90 minutes and review mistakes',
          completed: false,
          estMinutes: 120,
          topicItems: [
            {
              title: 'Timed test: 5 Part A questions (10M), 2 Part B questions (16M), 1 Part C question (14M)',
              pdfId: 'pdf-ia2',
              location: 'Page 1–5',
              description: 'Official Karunya IA 2 Question Bank full examination paper test',
            },
          ],
        },
        {
          id: 's4-5',
          timeSlot: 'Night Wrap-up (21:00 - 22:30)',
          title: 'Formula & Syntax Final Cheatsheet Review',
          module: 0,
          moduleName: 'Night Summary',
          keyTask: 'Wind down early. No late-night cramming so your brain is sharp for Thursday morning.',
          completed: false,
          estMinutes: 90,
          topicItems: [
            {
              title: 'Review Armstrong\'s axioms (Reflexivity, Augmentation, Transitivity)',
              pdfId: 'pdf-m3-4',
              location: 'Slide 4–5',
              description: 'Quick memory scan of sound & complete rules',
            },
            {
              title: 'Scan 2NF/3NF/BCNF checklists and key definitions',
              pdfId: 'pdf-m1-7',
              location: 'Slide 25–27',
              description: 'Final check of candidate keys, primary keys and normal form tests',
            },
          ],
        },
      ],
    },
    {
      dayId: 'day-5',
      dayNumber: 5,
      dayName: 'Thursday (Exam Day)',
      dateStr: 'November 5, 2026',
      focusTitle: 'INTERNAL EXAM DAY — Calm Recall & High Confidence',
      moduleCovered: 'Modules 1, 2 & 3 Internal Exam',
      targetHours: 1,
      sessions: [
        {
          id: 's5-1',
          timeSlot: 'Morning (07:30 - 08:30)',
          title: '45-Minute Quick Recall Scan',
          module: 0,
          moduleName: 'Pre-Exam Warmup',
          keyTask: 'Quick scan of formula card and walk into exam hall on time',
          completed: false,
          estMinutes: 45,
          topicItems: [
            {
              title: 'Review Armstrong\'s Axioms (Reflexivity, Augmentation, Transitivity)',
              pdfId: 'pdf-m3-4',
              location: 'Slide 4–5',
              description: 'Axioms scan before leaving for the exam',
            },
            {
              title: 'Scan 3NF vs BCNF definition conditions & Trigger structure',
              pdfId: 'pdf-m2-5',
              location: 'Slide 4',
              description: 'CREATE OR REPLACE TRIGGER ... BEFORE UPDATE ... FOR EACH ROW',
            },
          ],
        },
      ],
    },
  ];

  // State with safe merge of localStorage
  const [days, setDays] = useState<SprintDay[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('karunya_internal_sprint_state_v2');
    if (saved) {
      try {
        const parsed: any[] = JSON.parse(saved);
        return initialDays.map((initDay) => {
          const foundDay = parsed.find((d) => d.dayId === initDay.dayId);
          if (!foundDay) return initDay;
          return {
            ...initDay,
            sessions: initDay.sessions.map((initSession) => {
              const foundSession = foundDay.sessions?.find((s: any) => s.id === initSession.id);
              return {
                ...initSession,
                completed: foundSession ? foundSession.completed : false,
              };
            }),
          };
        });
      } catch (e) {
        return initialDays;
      }
    }
    return initialDays;
  });

  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');
  const [activeAccordion, setActiveAccordion] = useState<'schedule' | 'pdfhub' | 'qbank' | 'cheatsheet'>('schedule');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // In-app PDF Viewer Modal
  const [activeViewingPdf, setActiveViewingPdf] = useState<{ pdf: PdfMaterial; location?: string } | null>(null);

  // PDF Hub Filters
  const [pdfFilterModule, setPdfFilterModule] = useState<number | 'all'>('all');
  const [pdfSearchQuery, setPdfSearchQuery] = useState<string>('');

  // Live countdown timer
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = Math.max(0, examDate.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  }, [days]);

  const handleToggleSession = (sessionId: string) => {
    setDays((prev) =>
      prev.map((day) => ({
        ...day,
        sessions: day.sessions.map((s) =>
          s.id === sessionId ? { ...s, completed: !s.completed } : s
        ),
      }))
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all 4-day sprint progress checkboxes?')) {
      setDays(initialDays);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopySchedule = () => {
    const text = `Karunya DBMS (21CS302) 4-Day Internal Exam Sprint (Modules 1-3)
Day 1 (Sun, Nov 1): Module 1 - Architecture & Relational Algebra (7h)
Day 2 (Mon, Nov 2): Module 2 - SQL, Nested Queries, Joins & Triggers (7h)
Day 3 (Tue, Nov 3): Module 3 - ER Modeling, FDs, Candidate Keys & Normalization (7h)
Day 4 (Wed, Nov 4): Full Mock Exam & Karunya Question Bank Blitz (7.5h)
Day 5 (Thu, Nov 5): INTERNAL EXAM DAY!`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleOpenPdf = (pdf: PdfMaterial, openMode: 'modal' | 'new-tab' = 'modal', location?: string) => {
    const fileUrl = `./pdfs/${encodeURIComponent(pdf.filename)}`;
    if (openMode === 'new-tab') {
      window.open(fileUrl, '_blank');
    } else {
      setActiveViewingPdf({ pdf, location });
    }
  };

  // Stats
  const allSessions = days.flatMap((d) => d.sessions);
  const totalSessionsCount = allSessions.length;
  const completedSessionsCount = allSessions.filter((s) => s.completed).length;
  const completionPercentage = Math.round((completedSessionsCount / totalSessionsCount) * 100);

  const selectedDay = days.find((d) => d.dayId === selectedDayId) || days[0];

  // Filtered PDFs for Hub
  const filteredPdfs = ALL_COURSE_PDFS.filter((pdf) => {
    const matchesModule =
      pdfFilterModule === 'all' ? true : pdf.module === pdfFilterModule;
    const matchesSearch =
      pdf.name.toLowerCase().includes(pdfSearchQuery.toLowerCase()) ||
      pdf.filename.toLowerCase().includes(pdfSearchQuery.toLowerCase()) ||
      (pdf.description && pdf.description.toLowerCase().includes(pdfSearchQuery.toLowerCase()));
    return matchesModule && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
                <Zap className="h-3.5 w-3.5 fill-slate-950" />
                Special 4-Day Internal Sprint
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                DBMS (21CS302)
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Target: Modules 1, 2 & 3
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <FileText className="h-3 w-3 text-emerald-400" />
                <span>PDFs Mapped by Slide & Title</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              4-Day Crash Planner with Topic-Level PDF References
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every single learning topic below now has its exact slide deck and exact slide/page numbers placed directly next to the title. Click any PDF button to open the document right away!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setActiveAccordion('pdfhub')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-slate-950 shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-slate-950" />
                <span>Browse All 23 Course PDFs</span>
              </button>
              <button
                onClick={handleCopySchedule}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
              >
                <Share2 className="h-3.5 w-3.5 text-amber-400" />
                <span>{copiedNotification ? 'Copied to Clipboard!' : 'Share / Copy Plan'}</span>
              </button>
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-rose-300 border border-slate-800 transition"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Checkboxes</span>
              </button>
            </div>
          </div>

          {/* Right: Exam Countdown Card */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-5 shadow-xl w-full lg:w-auto shrink-0 flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
              <span>TIME UNTIL INTERNAL EXAM</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mb-3">Thursday 09:00 AM IST</div>

            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 min-w-[54px]">
                <div className="text-xl font-black text-amber-400">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Days</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 min-w-[54px]">
                <div className="text-xl font-black text-amber-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Hours</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 min-w-[54px]">
                <div className="text-xl font-black text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Mins</div>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-2 min-w-[54px]">
                <div className="text-xl font-black text-rose-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Secs</div>
              </div>
            </div>

            {/* Overall Sprint Progress Bar */}
            <div className="w-full mt-4 pt-4 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5 font-medium">
                <span>Sprint Completion</span>
                <span className="font-bold text-amber-400">{completedSessionsCount}/{totalSessionsCount} ({completionPercentage}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveAccordion('schedule')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeAccordion === 'schedule'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>4-Day Timetable & PDF Topics</span>
        </button>

        <button
          onClick={() => setActiveAccordion('pdfhub')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeAccordion === 'pdfhub'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-emerald-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Course PDFs & Slides Hub</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-500/40 font-mono">
            23 Files
          </span>
        </button>

        <button
          onClick={() => setActiveAccordion('qbank')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeAccordion === 'qbank'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Karunya Exam Questions</span>
        </button>

        <button
          onClick={() => setActiveAccordion('cheatsheet')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeAccordion === 'cheatsheet'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Formula & Normalization Cheatsheet</span>
        </button>
      </div>

      {/* TAB 1: 4-DAY TIMETABLE VIEW WITH PDF ASSIGNED NEXT TO EACH TOPIC */}
      {activeAccordion === 'schedule' && (
        <div className="space-y-6">
          {/* Day Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {days.map((day) => {
              const isSelected = day.dayId === selectedDayId;
              const completedInDay = day.sessions.filter((s) => s.completed).length;
              const allDone = completedInDay === day.sessions.length;

              return (
                <button
                  key={day.dayId}
                  onClick={() => setSelectedDayId(day.dayId)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                      Day {day.dayNumber}
                    </span>
                    {allDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        {completedInDay}/{day.sessions.length}
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-white text-sm mt-0.5">{day.dayName}</div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">{day.moduleCovered}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Content */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Day {selectedDay.dayNumber} • {selectedDay.dateStr}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedDay.focusTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Target: {selectedDay.targetHours} Hours • {selectedDay.sessions.length} Focus Blocks. Every topic has its exact PDF and slide location right next to the title.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenTimer && onOpenTimer(selectedDay.focusTitle)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
                >
                  <Timer className="h-4 w-4" />
                  <span>Start 50-Min Pomodoro</span>
                </button>
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDay.sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    session.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-80'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleSession(session.id)}
                          className="text-slate-400 hover:text-amber-400 cursor-pointer"
                        >
                          {session.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-500/20" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-500 hover:text-amber-400" />
                          )}
                        </button>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                          {session.timeSlot}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {session.estMinutes} mins
                      </span>
                    </div>

                    {/* Learning Title */}
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          session.completed ? 'line-through text-slate-400' : 'text-white'
                        }`}
                      >
                        {session.title}
                      </h3>
                    </div>

                    {/* TOPIC ITEMS WITH PDF PLACED DIRECTLY NEXT TO THE TEXT */}
                    <div className="space-y-2 pt-1">
                      {session.topicItems.map((topic, idx) => {
                        const pdf = ALL_COURSE_PDFS.find((p) => p.id === topic.pdfId) || ALL_COURSE_PDFS[0];
                        return (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col gap-1.5"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              {/* Topic Name */}
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <span className="text-amber-400 mt-0.5 shrink-0 font-bold">•</span>
                                <span className="text-xs font-semibold text-slate-100 leading-snug">
                                  {topic.title}
                                </span>
                              </div>

                              {/* Clickable PDF Button & Exact Location Tag directly next to the title */}
                              <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto ml-4 sm:ml-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenPdf(pdf, 'modal', topic.location);
                                  }}
                                  title={`Click to open ${pdf.name} (${topic.location})`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-[11px] font-medium transition cursor-pointer group shadow-sm"
                                >
                                  <FileText className="h-3 w-3 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                                  <span className="font-semibold text-slate-200 truncate max-w-[140px] sm:max-w-[170px]">
                                    {pdf.shortName}
                                  </span>
                                  <span className="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-mono text-[10px] font-bold shrink-0">
                                    {topic.location}
                                  </span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenPdf(pdf, 'new-tab');
                                  }}
                                  title="Open in new full tab"
                                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </button>
                              </div>
                            </div>

                            {/* Subtitle / summary of what to study on those slides */}
                            {topic.description && (
                              <p className="text-[11px] text-slate-400 pl-4 leading-relaxed">
                                {topic.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-amber-300 font-medium">🎯 Goal: {session.keyTask}</span>
                    <button
                      onClick={() => onOpenTimer && onOpenTimer(session.title)}
                      className="text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <Timer className="h-3 w-3" />
                      <span>Timer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL COURSE PDFS & SLIDES HUB */}
      {activeAccordion === 'pdfhub' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <span>Karunya DBMS Lecture PDFs & Study Materials (23 Files)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Downloaded from your course folder and bundled directly with the app. Open any slide deck or question bank in a single click.
                </p>
              </div>

              {/* Module Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setPdfFilterModule('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    pdfFilterModule === 'all'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All ({ALL_COURSE_PDFS.length})
                </button>
                <button
                  onClick={() => setPdfFilterModule(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    pdfFilterModule === 1
                      ? 'bg-blue-500 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Module 1 (8)
                </button>
                <button
                  onClick={() => setPdfFilterModule(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    pdfFilterModule === 2
                      ? 'bg-violet-500 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Module 2 (6)
                </button>
                <button
                  onClick={() => setPdfFilterModule(3)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    pdfFilterModule === 3
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Module 3 (7)
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PDF slides (e.g. Architecture, Keys, Normalization, Triggers, E-R Diagram)..."
                value={pdfSearchQuery}
                onChange={(e) => setPdfSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Grid of PDF Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredPdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          pdf.module === 1
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : pdf.module === 2
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : pdf.module === 3
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {pdf.module === 0 ? 'Question Bank' : `Module ${pdf.module}`}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{pdf.size}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition line-clamp-2">
                      {pdf.name}
                    </h4>

                    {pdf.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {pdf.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenPdf(pdf, 'modal')}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Preview in App</span>
                    </button>
                    <button
                      onClick={() => handleOpenPdf(pdf, 'new-tab')}
                      title="Open in new window"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIGH-YIELD KARUNYA INTERNAL QUESTIONS */}
      {activeAccordion === 'qbank' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  <span>Karunya Internal Exam Expected Questions (Modules 1, 2, 3)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Extracted from previous Karunya University question banks and mid-term / internal papers.
                </p>
              </div>
              <a
                href={KARUNYA_QUESTION_BANK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 transition"
              >
                <span>Karunya Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* PART A (2 MARKS) QUESTIONS */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <span>Part A — High-Frequency 2-Mark Conceptual Questions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q1. Data Independence (Module 1)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">99% Repeated</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    Distinguish between Physical and Logical Data Independence with an architectural diagram reference.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> Physical data independence is the capacity to change the internal schema (storage, indexing, hashing) without altering the conceptual schema. Logical data independence is the capacity to change the conceptual schema (adding columns/tables) without altering external schemas/views.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q2. Candidate Key vs Super Key (Module 1)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">Frequently Asked</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    Define Super Key and Candidate Key. Why is every candidate key a super key, but not vice versa?
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> A Super Key is any set of attributes that uniquely identifies a tuple. A Candidate Key is a <em>minimal</em> super key (no proper subset is a super key).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q3. WHERE vs HAVING in SQL (Module 2)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">Guaranteed</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    Differentiate between WHERE and HAVING clauses with an SQL example.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> `WHERE` filters individual rows <em>before</em> aggregation. `HAVING` filters aggregated groups <em>after</em> the `GROUP BY` operation. Example: `SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) &gt; 50000`.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q4. Armstrong's Axioms (Module 3)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">100% Guaranteed</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    State the three primary Armstrong's Axioms for functional dependencies.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> (1) Reflexivity: If Y ⊆ X, then X → Y. (2) Augmentation: If X → Y, then XZ → YZ. (3) Transitivity: If X → Y and Y → Z, then X → Z.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q5. 3NF vs BCNF Violation Condition (Module 3)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">Critical</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    State the formal conditions for a relation to be in 3NF and BCNF.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> For any non-trivial FD X → Y: In 3NF, either X is a superkey OR Y is a prime attribute (part of any candidate key). In BCNF, X <em>must strictly</em> be a superkey.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400">Q6. Trigger Qualifiers (:OLD and :NEW) (Module 2)</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">Exam Special</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    Explain the use of :OLD and :NEW pseudorecords in row-level database triggers.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-amber-300">Answer Hint:</strong> `:OLD` contains column values before the modification (valid in UPDATE and DELETE). `:NEW` contains column values proposed by the modification (valid in INSERT and UPDATE).
                  </p>
                </div>
              </div>
            </div>

            {/* PART B & C (8 & 14 MARKS) NUMERICALS */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Part B & C — High-Mark Numerical & Design Problems
              </h3>

              {/* Problem 1: Normalization */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-amber-300 text-sm">
                    Problem 1 (14 Marks): Candidate Keys & BCNF Decomposition (Module 3)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold">
                    Karunya Nov 2024 / Apr 2025
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  <strong>Question:</strong> Given a relation schema R(A, B, C, D, E, G) and functional dependencies:
                  <code className="block bg-slate-900 p-2.5 rounded mt-1.5 font-mono text-amber-200 text-xs">
                    F = &#123; AB &rarr; C, C &rarr; A, BC &rarr; D, ACD &rarr; B, D &rarr; EG, BE &rarr; C, CG &rarr; BD &#125;
                  </code>
                </p>
                <div className="bg-slate-900/90 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-emerald-400">Step-by-Step Solution Technique:</div>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>
                      <strong>Check attribute appearances:</strong> A, C, D, E, G, B all appear on RHS, but notice B and something are required to reach everything.
                    </li>
                    <li>
                      <strong>Compute (AB)+:</strong> AB &rarr; C &rarr; D (via BC&rarr;D) &rarr; EG (via D&rarr;EG).
                      Thus (AB)+ = &#123;A, B, C, D, E, G&#125;. Therefore, <strong className="text-amber-300">AB is a Candidate Key!</strong>
                    </li>
                    <li>
                      <strong>Compute (BC)+:</strong> Since C&rarr;A, (BC)+ includes AB, which produces all attributes.
                      Therefore, <strong className="text-amber-300">BC is also a Candidate Key!</strong>
                    </li>
                    <li>
                      <strong>Check for Normal Form:</strong> In D &rarr; EG, D is NOT a superkey (it cannot produce A or B). E and G are not prime attributes.
                      Hence, <strong>R is NOT in 2NF / 3NF / BCNF!</strong>
                    </li>
                    <li>
                      <strong>Decompose into BCNF:</strong> Split on violating dependency D &rarr; EG into R1(D, E, G) and R2(A, B, C, D).
                    </li>
                  </ol>
                </div>
              </div>

              {/* Problem 2: Relational Algebra */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-blue-300 text-sm">
                    Problem 2 (8 Marks): Relational Algebra Expression Query (Module 1)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-bold">
                    Karunya Repeated
                  </span>
                </div>
                <p className="text-xs text-slate-200">
                  Schemas: <code>Student(rollNo, name, dept)</code>, <code>Course(courseId, cname, credits)</code>, <code>Enrolled(rollNo, courseId, grade)</code>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-semibold">1. Find names of students enrolled in 'DBMS':</span>
                    <div className="font-mono text-amber-300 mt-1 bg-slate-950 p-1.5 rounded">
                      &pi;<sub>name</sub>(&sigma;<sub>cname='DBMS'</sub>(Student &#x22C8; Enrolled &#x22C8; Course))
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 font-semibold">2. Students who enrolled in ALL courses (Division):</span>
                    <div className="font-mono text-amber-300 mt-1 bg-slate-950 p-1.5 rounded">
                      &pi;<sub>rollNo, courseId</sub>(Enrolled) &divide; &pi;<sub>courseId</sub>(Course)
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem 3: SQL Trigger */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-violet-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-violet-300 text-sm">
                    Problem 3 (8 Marks): PL/SQL Audit Trigger (Module 2)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-xs font-bold">
                    100% Practical / Theory Favorite
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Write a trigger to log any salary modification on the <code>Employee</code> table into an <code>Emp_Audit</code> table:
                </p>
                <pre className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
{`CREATE OR REPLACE TRIGGER trg_audit_salary
BEFORE UPDATE OF salary ON Employee
FOR EACH ROW
BEGIN
  IF :NEW.salary < :OLD.salary THEN
    RAISE_APPLICATION_ERROR(-20001, 'Salary reduction not allowed!');
  END IF;
  
  INSERT INTO Emp_Audit (empId, old_sal, new_sal, change_date, user_name)
  VALUES (:OLD.empId, :OLD.salary, :NEW.salary, SYSDATE, USER);
END;
/`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHEATSHEET & FORMULA CARD */}
      {activeAccordion === 'cheatsheet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Normalization Quick Checklist */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-400" />
                <span>Normal Form Verification Checklist</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 text-sm">1NF (First Normal Form)</strong>
                  <p className="text-slate-400 mt-1">
                    Every attribute must hold only <em>atomic (indivisible)</em> values. No multi-valued attributes or repeating groups.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 text-sm">2NF (Second Normal Form)</strong>
                  <p className="text-slate-400 mt-1">
                    Must be in 1NF and <strong>no partial dependency</strong>: No non-prime attribute should be functionally dependent on a proper subset of any candidate key.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 text-sm">3NF (Third Normal Form)</strong>
                  <p className="text-slate-400 mt-1">
                    Must be in 2NF and <strong>no transitive dependency</strong>. For every non-trivial X &rarr; Y:
                    <span className="block text-emerald-400 font-semibold mt-1">Either X is a superkey OR Y is a prime attribute!</span>
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 text-sm">BCNF (Boyce-Codd Normal Form)</strong>
                  <p className="text-slate-400 mt-1">
                    Strictly stronger than 3NF. For every non-trivial X &rarr; Y:
                    <span className="block text-rose-400 font-semibold mt-1">X must strictly be a Superkey!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Armstrong's Axioms & Algebra Reference */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-400" />
                <span>Armstrong's Axioms & Relational Symbols</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-blue-300 text-sm">Primary Axioms (Sound & Complete):</strong>
                  <ul className="mt-1.5 space-y-1 text-slate-300 font-mono">
                    <li>1. Reflexivity: If Y &sube; X, then X &rarr; Y</li>
                    <li>2. Augmentation: If X &rarr; Y, then XZ &rarr; YZ</li>
                    <li>3. Transitivity: If X &rarr; Y and Y &rarr; Z, then X &rarr; Z</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-blue-300 text-sm">Secondary Inference Rules:</strong>
                  <ul className="mt-1.5 space-y-1 text-slate-300 font-mono">
                    <li>• Union: If X &rarr; Y and X &rarr; Z, then X &rarr; YZ</li>
                    <li>• Decomposition: If X &rarr; YZ, then X &rarr; Y and X &rarr; Z</li>
                    <li>• Pseudotransitivity: If X &rarr; Y and WY &rarr; Z, then WX &rarr; Z</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-blue-300 text-sm">Relational Algebra Symbols:</strong>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11px] text-slate-300">
                    <div>&sigma; (Sigma) : Selection (rows)</div>
                    <div>&pi; (Pi) : Projection (columns)</div>
                    <div>&times; : Cartesian Product</div>
                    <div>&#x22C8; : Natural Join</div>
                    <div>&divide; : Division ("for all")</div>
                    <div>&#x2A1D; : Left Outer Join</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP PDF VIEWER MODAL */}
      {activeViewingPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/80">
              <div className="flex items-center gap-2.5 truncate">
                <FileText className="h-5 w-5 text-amber-400 shrink-0" />
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {activeViewingPdf.pdf.name}
                    </h3>
                    {activeViewingPdf.location && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold shrink-0 border border-amber-500/40">
                        {activeViewingPdf.location}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {activeViewingPdf.pdf.filename} • {activeViewingPdf.pdf.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenPdf(activeViewingPdf.pdf, 'new-tab')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
                  title="Open in new full tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </button>

                <a
                  href={`./pdfs/${encodeURIComponent(activeViewingPdf.pdf.filename)}`}
                  download={activeViewingPdf.pdf.filename}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-slate-950 transition"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => setActiveViewingPdf(null)}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                  title="Close viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF iframe */}
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={`./pdfs/${encodeURIComponent(activeViewingPdf.pdf.filename)}#toolbar=1&navpanes=1`}
                title={activeViewingPdf.pdf.name}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
