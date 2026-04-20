const express = require('express');
const router = express.Router();
const { CohereClient } = require('cohere-ai');
const db = require('../firebase');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

// Helper function to generate ONE idea
async function generateSingleIdea(topic, difficulty, techStack, ideaNumber) {
  const prompt = `Generate 1 unique and detailed software project idea for a ${difficulty || 'beginner'} developer.

Topic/Domain: ${topic}
Tech Stack: ${techStack || 'any'}
Difficulty: ${difficulty || 'beginner'}

Provide ALL of the following sections:

**Project Idea ${ideaNumber}: [Project Title]**

**Overview:**
Write 3-4 sentences describing what the project does, its purpose, and who would use it.

**Problem It Solves:**
Explain the real-world problem this project addresses in 2-3 sentences.

**Key Features:**
- Feature 1 with brief explanation
- Feature 2 with brief explanation
- Feature 3 with brief explanation
- Feature 4 with brief explanation
- Feature 5 with brief explanation

**Tech Stack Breakdown:**
- Frontend: [specific technologies]
- Backend: [specific technologies]
- Database: [specific technology]
- Extra Tools/APIs: [any additional tools]

**Implementation Steps:**
1. Step 1
2. Step 2
3. Step 3
4. Step 4
5. Step 5

**Estimated Time to Build:** [timeframe for ${difficulty || 'beginner'}]

**Difficulty Level:** ${difficulty || 'beginner'}`;

  const response = await cohere.chat({
    model: 'command-light',   // ⚡ 3x faster than command-a-03-2025
    message: prompt,
    maxTokens: 600            // ⚡ enough for 1 detailed idea
  });

  return response.text;
}

// POST /api/ideas/generate
router.post('/generate', async (req, res) => {
  const { topic, difficulty, techStack } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    // ⚡ Generate all 3 ideas SIMULTANEOUSLY instead of one giant prompt
    const [idea1, idea2, idea3] = await Promise.all([
      generateSingleIdea(topic, difficulty, techStack, 1),
      generateSingleIdea(topic, difficulty, techStack, 2),
      generateSingleIdea(topic, difficulty, techStack, 3)
    ]);

    const ideas = `${idea1}\n\n---\n\n${idea2}\n\n---\n\n${idea3}`;

    // Save to Firestore
    await db.collection('ideas').add({
      topic,
      difficulty: difficulty || 'beginner',
      techStack: techStack || 'any',
      ideas,
      createdAt: new Date()
    });

    res.json({ success: true, ideas });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to generate ideas' });
  }
});

// GET /api/ideas
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('ideas').orderBy('createdAt', 'desc').get();
    const ideas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, ideas });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

module.exports = router;