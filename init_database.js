// MongoDB initialization script for Utkrusht Assessment Catalog
// This script runs automatically inside the MongoDB container
// It creates the 'utkrusht_assessments' database and seeds
// a realistic 'assessments' collection for testing.

// Switch to the target database
const dbName = 'utkrusht_assessments';
const db = db.getSiblingDB(dbName);

// Create collection if it does not already exist
db.createCollection('assessments');

// Seed data: 10 realistic assessment documents
db.assessments.insertMany([
  {
    title: 'JavaScript Fundamentals',
    category: 'Web Development',
    difficulty: 'Beginner',
    durationMinutes: 30,
    isActive: true
  },
  {
    title: 'React Basics',
    category: 'Frontend',
    difficulty: 'Beginner',
    durationMinutes: 45,
    isActive: true
  },
  {
    title: 'Node.js Essentials',
    category: 'Backend',
    difficulty: 'Intermediate',
    durationMinutes: 60,
    isActive: true
  },
  {
    title: 'MongoDB CRUD Practice',
    category: 'Database',
    difficulty: 'Beginner',
    durationMinutes: 40,
    isActive: true
  },
  {
    title: 'Full-Stack JS Mini Project',
    category: 'Full-Stack',
    difficulty: 'Intermediate',
    durationMinutes: 90,
    isActive: true
  },
  {
    title: 'Async JavaScript Patterns',
    category: 'Web Development',
    difficulty: 'Intermediate',
    durationMinutes: 50,
    isActive: false
  },
  {
    title: 'REST API Design Basics',
    category: 'Backend',
    difficulty: 'Beginner',
    durationMinutes: 35,
    isActive: true
  },
  {
    title: 'CSS Layout Challenges',
    category: 'Frontend',
    difficulty: 'Beginner',
    durationMinutes: 30,
    isActive: true
  },
  {
    title: 'Git and GitHub Workflow',
    category: 'Dev Tools',
    difficulty: 'Beginner',
    durationMinutes: 25,
    isActive: true
  },
  {
    title: 'Debugging Node.js Applications',
    category: 'Backend',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    isActive: true
  }
]);

// Add a single-field index on the primary query field (title)
// This helps speed up lookups and is a common query pattern in catalogs
// (e.g., searching or sorting by assessment title).
db.assessments.createIndex({ title: 1 });

print('Database init complete: utkrusht_assessments.assessments seeded.');
