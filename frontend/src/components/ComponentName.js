import React, { useEffect, useState } from 'react';
import { getAssessments, createAssessment } from '../services/api';

// This component currently uses mock data via the API helpers.
// Your task is to make those helpers call the real backend API
// so this page displays and creates real MongoDB data.

function AssessmentPage() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [durationMinutes, setDurationMinutes] = useState('30');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError('');
        const data = await getAssessments();
        setAssessments(data);
      } catch (err) {
        console.error('Failed to fetch assessments', err);
        setError('Failed to load assessments. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!title || !category || !difficulty || !durationMinutes) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    try {
      const payload = {
        title,
        category,
        difficulty,
        durationMinutes: Number(durationMinutes)
      };

      const created = await createAssessment(payload);
      // Optimistically add the new assessment to the list
      setAssessments((prev) => [created, ...prev]);

      // Reset form
      setTitle('');
      setCategory('');
      setDifficulty('Beginner');
      setDurationMinutes('30');
    } catch (err) {
      console.error('Failed to create assessment', err);
      setError('Failed to create assessment. Please try again.');
    }
  }

  return (
    <div>
      <section style={{ marginBottom: '24px' }}>
        <h2>Add New Assessment</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '8px', maxWidth: '400px' }}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. JavaScript Fundamentals"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Web Development"
            />
          </label>

          <label>
            Difficulty
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>

          <label>
            Duration (minutes)
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              min="5"
            />
          </label>

          <button type="submit">Create Assessment</button>
        </form>
      </section>

      <section>
        <h2>Available Assessments</h2>
        {loading && <p>Loading assessments...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && assessments.length === 0 && <p>No assessments available.</p>}
        <ul>
          {assessments.map((a) => (
            <li key={a._id || a.id} style={{ marginBottom: '8px' }}>
              <strong>{a.title}</strong> — {a.category} — {a.difficulty} — {a.durationMinutes} min
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AssessmentPage;
