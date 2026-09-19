# Vocab Voice Coach

A voice-first English vocabulary and speaking practice prototype designed to help learners build practical vocabulary and use it naturally in real-world situations.

## Live Demo

https://vocab-voice-coach.vercel.app

## What it does

Vocab Voice Coach combines vocabulary learning with short speaking exercises.

Users can:

- Browse vocabulary by difficulty and situation
- Learn definitions, pronunciation and example usage
- Practice using target words in realistic situations
- Speak their answer or type it
- Receive qualitative coaching such as:
  - Correct
  - Almost there
  - Needs another try
- Get progressive clues instead of only receiving a score
- Track vocabulary mastery and practice activity
- Review words that need more practice

## Product Approach

The prototype intentionally avoids treating English learning as a simple numerical scoring problem.

Instead, it focuses on:

- Independent usage
- Repeated practice
- Context relevance
- Progressive coaching
- Vocabulary mastery over time

XP represents learning activity and independence rather than English proficiency.

## Key Learning Loop

Learn → Practice → Get Coaching → Try Again → Build Mastery

## Voice Practice

The prototype uses the browser's Web Speech API for speech recognition where supported.

If voice recognition is unavailable in the browser, users can continue the exercise by typing their response.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Web Speech API
- Local browser storage
- Supabase integration structure

## Project Structure

```text
src/
├── components/
├── data/
├── services/
├── utils/
├── views/
├── App.tsx
├── main.tsx
└── types.ts

supabase/
└── schema.sql