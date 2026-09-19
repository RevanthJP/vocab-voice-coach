import { VocabularyWord, Milestone } from '../types';

export const INITIAL_VOCABULARY: VocabularyWord[] = [
  // 1. Workplace English
  {
    id: 'w1',
    word: 'Clarify',
    meaning: 'To make something easier to understand by explaining it more clearly.',
    simpleExplanation: 'Use this when you want someone to explain an idea in simpler terms or clear up confusion.',
    partOfSpeech: 'verb',
    pronunciation: '/ˈklær.ɪ.faɪ/',
    example1: 'Could you clarify what you meant during the meeting?',
    example2: 'I asked my manager to clarify the project requirements before starting.',
    level: 'Intermediate',
    category: 'Workplace English',
    difficulty: 2,
    relatedWords: ['explain', 'simplify', 'elucidate'],
    commonUsageNotes: 'Often used with "could you" or "please" in polite professional emails.',
    whenToUse: 'Use during team meetings, client calls, or email exchanges when instructions are vague or you need alignment before starting a task.',
    commonMistakes: [
      '❌ "Clarify about the problem" → ✅ "Clarify the problem" (Clarify connects directly to its object without "about").',
      '❌ "Yesterday I clarify with my manager" → ✅ "Yesterday I clarified with my manager" (Remember the past tense "-ied" for past events).'
    ],
    situationPrompt: 'You are in a project kickoff call and your manager gave broad goals. Politely ask them to clarify the timeline and deliverables.'
  },
  {
    id: 'w2',
    word: 'Deadline',
    meaning: 'A specific date or time by which something must be finished.',
    simpleExplanation: 'The final cutoff time for submitting work or completing a project.',
    partOfSpeech: 'noun',
    pronunciation: '/ˈded.laɪn/',
    example1: 'We are working late tonight to meet the client deadline.',
    example2: 'The project deadline was pushed back by two weeks.',
    level: 'Beginner',
    category: 'Workplace English',
    difficulty: 1,
    relatedWords: ['due date', 'timeframe', 'cutoff'],
    commonUsageNotes: 'Commonly paired with verbs: "meet a deadline", "miss a deadline", "extend a deadline".',
    whenToUse: 'Use when scheduling commitments, negotiating delivery dates with clients, or tracking project milestones.',
    commonMistakes: [
      '❌ "Catch the deadline" → ✅ "Meet the deadline" (Native English uses "meet" or "hit" a deadline).',
      '❌ "In deadline" → ✅ "Before the deadline" or "by the deadline".'
    ],
    situationPrompt: 'A client is requesting extra features that will push your timeline back. Explain that you need more time to meet the deadline.'
  },
  {
    id: 'w3',
    word: 'Prioritize',
    meaning: 'To treat something as more important than other things.',
    simpleExplanation: 'Deciding what order you should do your tasks so the most critical ones get done first.',
    partOfSpeech: 'verb',
    pronunciation: '/praɪˈɔːr.ə.taɪz/',
    example1: 'You should prioritize your urgent tasks before checking unread emails.',
    example2: 'Our team needs to prioritize customer feedback this quarter.',
    level: 'Intermediate',
    category: 'Workplace English',
    difficulty: 2,
    relatedWords: ['rank', 'focus on', 'highlight'],
    commonUsageNotes: 'Can be followed directly by a noun or gerund: "prioritize quality over speed".',
    whenToUse: 'Use in morning standups, performance reviews, or sprint planning when deciding where to invest limited time.',
    commonMistakes: [
      '❌ "Prioritize to urgent tasks" → ✅ "Prioritize urgent tasks" (Takes a direct noun object).',
      '❌ "Give prioritize" → ✅ "Give priority to" or "Prioritize".'
    ],
    situationPrompt: 'You have three urgent tasks due today. Explain to your manager how you plan to prioritize your workload.'
  },
  {
    id: 'w4',
    word: 'Collaborate',
    meaning: 'To work together with others toward a shared goal.',
    simpleExplanation: 'Joining efforts with teammates or colleagues on a shared initiative.',
    partOfSpeech: 'verb',
    pronunciation: '/kəˈlæb.ə.reɪt/',
    example1: 'Our design and marketing teams collaborate on new product launches.',
    example2: 'It was a pleasure to collaborate with such talented professionals.',
    level: 'Intermediate',
    category: 'Workplace English',
    difficulty: 2,
    relatedWords: ['cooperate', 'partner', 'team up'],
    commonUsageNotes: 'Use "collaborate with [someone]" and "collaborate on [a project]".',
    whenToUse: 'Use on resumes, cross-functional discussions, or quarterly reviews to showcase teamwork and joint problem-solving.',
    commonMistakes: [
      '❌ "Collaborate together" → Redundant (collaborate already means working together). Say "collaborate with the design team".',
      '❌ "Collaborate to a project" → ✅ "Collaborate on a project".'
    ],
    situationPrompt: 'Your team needs help from the engineering department. Propose a plan to collaborate on building the new dashboard.'
  },
  {
    id: 'w5',
    word: 'Consensus',
    meaning: 'A general agreement reached by a group of people.',
    simpleExplanation: 'When everyone in a group agrees on a decision or plan.',
    partOfSpeech: 'noun',
    pronunciation: '/kənˈsen.səs/',
    example1: 'After a lengthy discussion, the committee reached a general consensus.',
    example2: 'It is hard to build consensus when there are so many opposing views.',
    level: 'Advanced',
    category: 'Workplace English',
    difficulty: 3,
    relatedWords: ['agreement', 'harmony', 'unanimity'],
    commonUsageNotes: 'Avoid saying "consensus of opinion" as it is considered redundant; just say "consensus".',
    whenToUse: 'Use during board meetings, team retrospectives, or group negotiations when striving for unanimous or broad agreement.',
    commonMistakes: [
      '❌ "Consensus of opinion" → Redundant. Just say: "We reached a consensus."',
      '❌ "Make a consensus" → ✅ "Reach a consensus" or "Build consensus".'
    ],
    situationPrompt: 'Your team is split between two different software tools. Encourage everyone to reach a consensus before the end of the day.'
  },
  {
    id: 'w6',
    word: 'Feedback',
    meaning: 'Helpful information or criticism about how well someone is performing.',
    simpleExplanation: 'Opinions or suggestions given to help you improve your work.',
    partOfSpeech: 'noun',
    pronunciation: '/ˈfiːd.bæk/',
    example1: 'I always welcome constructive feedback on my presentations.',
    example2: 'The team provided valuable feedback on the prototype design.',
    level: 'Beginner',
    category: 'Workplace English',
    difficulty: 1,
    relatedWords: ['critique', 'input', 'suggestions'],
    commonUsageNotes: '"Feedback" is an uncountable noun. Do not say "a feedback" or "feedbacks"; use "some feedback" or "a piece of feedback".',
    whenToUse: 'Use during 1-on-1s, design critiques, code reviews, and after delivering client presentations.',
    commonMistakes: [
      '❌ "She gave me many feedbacks" → ✅ "She gave me a lot of feedback" ("Feedback" is uncountable).',
      '❌ "Can I have a feedback?" → ✅ "Can I have some feedback?" or "a piece of feedback".'
    ],
    situationPrompt: 'You just finished delivering a presentation to your team. Ask your colleagues for constructive feedback on how to improve.'
  },
  {
    id: 'w7',
    word: 'Delegate',
    meaning: 'To give a particular job or duty to someone else with authority.',
    simpleExplanation: 'Sharing your tasks with team members instead of trying to do everything yourself.',
    partOfSpeech: 'verb',
    pronunciation: '/ˈdel.ə.ɡeɪt/',
    example1: 'A good manager knows when to delegate responsibilities to team members.',
    example2: 'She delegated the task of writing meeting minutes to her assistant.',
    level: 'Advanced',
    category: 'Workplace English',
    difficulty: 3,
    relatedWords: ['assign', 'entrust', 'pass on'],
    commonUsageNotes: 'Pronounced with an "-ate" sound as a verb, but with "-ət" when used as a noun meaning a representative.',
    whenToUse: 'Use in management, leadership, and workload distribution discussions.',
    commonMistakes: [
      '❌ "Delegate with someone" → ✅ "Delegate tasks to someone".',
      '❌ "Delegate yourself" → You delegate tasks, duties, or responsibilities.'
    ],
    situationPrompt: 'You have taken on too many tasks this week and need support. Explain how you will delegate responsibilities to your team.'
  },
  {
    id: 'w8',
    word: 'Discuss',
    meaning: 'To talk about something with another person or group in order to reach a decision or exchange ideas.',
    simpleExplanation: 'Talking seriously about a topic with someone, without needing the word "about".',
    partOfSpeech: 'verb',
    pronunciation: '/dɪˈskʌs/',
    example1: 'I need to discuss the project with my manager.',
    example2: 'We can discuss the contract details during tomorrow\'s call.',
    level: 'Intermediate',
    category: 'Workplace English',
    difficulty: 2,
    relatedWords: ['talk over', 'debate', 'deliberate'],
    commonUsageNotes: '"Discuss" is a transitive verb connecting directly to the object: say "discuss the project", not "discuss about the project".',
    whenToUse: 'Use when scheduling meetings, planning reviews, or raising agenda topics with colleagues and clients.',
    commonMistakes: [
      '❌ "Discuss about the project" → ✅ "Discuss the project" ("Discuss" already means "talk about").',
      '❌ "Let us discuss about it" → ✅ "Let us discuss it".'
    ],
    situationPrompt: 'You have important updates regarding a project timeline. Propose a short meeting with your teammate to discuss the project.'
  },

  // 2. Day-to-Day English
  {
    id: 'd1',
    word: 'Convenient',
    meaning: 'Fitting in well with a person’s needs, activities, and plans; easy to use.',
    simpleExplanation: 'Something that saves you effort, time, or hassle in daily life.',
    partOfSpeech: 'adjective',
    pronunciation: '/kənˈviː.ni.ənt/',
    example1: 'Having a grocery store across the street is extremely convenient.',
    example2: 'Please let me know a time that is convenient for you to talk.',
    level: 'Beginner',
    category: 'Day-to-Day English',
    difficulty: 1,
    relatedWords: ['handy', 'practical', 'accessible'],
    commonUsageNotes: 'Say "Is that convenient for you?" rather than "Are you convenient?".',
    whenToUse: 'Use when scheduling social catch-ups, discussing neighborhood amenities, or reviewing easy-to-use apps.',
    commonMistakes: [
      '❌ "Are you convenient tomorrow?" → ✅ "Is tomorrow convenient for you?" or "Is 2 PM convenient for you?"',
      '❌ "It is much convenient" → ✅ "It is much more convenient" or "very convenient".'
    ],
    situationPrompt: 'You want to schedule a quick coffee chat with a friend. Ask them what day and time would be most convenient for them.'
  },
  {
    id: 'd2',
    word: 'Procrastinate',
    meaning: 'To delay doing something that you ought to do, usually because it is unpleasant.',
    simpleExplanation: 'Putting off until tomorrow what you should be doing right now.',
    partOfSpeech: 'verb',
    pronunciation: '/prəˈkræs.tə.neɪt/',
    example1: 'I tended to procrastinate whenever I had to study for difficult exams.',
    example2: 'Stop procrastinating and clean your bedroom before dinner!',
    level: 'Intermediate',
    category: 'Day-to-Day English',
    difficulty: 2,
    relatedWords: ['delay', 'postpone', 'stall'],
    commonUsageNotes: 'Often used with gerunds: "procrastinate doing homework".',
    whenToUse: 'Use when discussing daily habits, time management struggles, or joking about putting off chores.',
    commonMistakes: [
      '❌ "Procrastinate for doing it" → ✅ "Procrastinate on doing it" or "procrastinate doing it".'
    ],
    situationPrompt: 'You have a chore or study task you have been putting off all week. Tell a friend why you tend to procrastinate on it.'
  },
  {
    id: 'd3',
    word: 'Routine',
    meaning: 'A usual or fixed way of doing things at regular times.',
    simpleExplanation: 'Your normal sequence of daily habits, like morning coffee or an evening walk.',
    partOfSpeech: 'noun',
    pronunciation: '/ruːˈtiːn/',
    example1: 'Exercising every morning has become an essential part of my daily routine.',
    example2: 'He felt stuck in a boring routine and decided to take a weekend trip.',
    level: 'Beginner',
    category: 'Day-to-Day English',
    difficulty: 1,
    relatedWords: ['habit', 'schedule', 'custom'],
    commonUsageNotes: 'Often modified by adjectives: "daily routine", "bedtime routine", "fitness routine".',
    whenToUse: 'Use when describing your morning habits, fitness regimen, or discussing lifestyle balance.',
    commonMistakes: [
      '❌ "I make my routine" → ✅ "I follow my routine" or "stick to my routine".'
    ],
    situationPrompt: 'A friend asks how you stay healthy. Describe one healthy habit that is part of your morning routine.'
  },
  {
    id: 'd4',
    word: 'Overwhelmed',
    meaning: 'Feeling completely submerged by an excess of things to deal with or emotions.',
    simpleExplanation: 'Having too much to handle at once, making you feel stressed or exhausted.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˌoʊ.vɚˈwelmd/',
    example1: 'She felt overwhelmed by the sudden flood of emails after vacation.',
    example2: 'Take a deep breath if you feel overwhelmed by your assignments.',
    level: 'Intermediate',
    category: 'Day-to-Day English',
    difficulty: 2,
    relatedWords: ['swamped', 'overburdened', 'stressed'],
    commonUsageNotes: 'Usually followed by "by" or "with": "overwhelmed by emotions", "overwhelmed with chores".',
    whenToUse: 'Use when sharing vulnerability with friends, asking a coworker for help, or taking a break.',
    commonMistakes: [
      '❌ "I am overwhelming" → Means you are causing others stress! ✅ Say "I feel overwhelmed".'
    ],
    situationPrompt: 'You just returned from a long trip and your inbox is full. Explain to a coworker that you feel overwhelmed by the messages.'
  },
  {
    id: 'd5',
    word: 'Spontaneous',
    meaning: 'Happening naturally or suddenly without being planned in advance.',
    simpleExplanation: 'Doing something on the spur of the moment for fun.',
    partOfSpeech: 'adjective',
    pronunciation: '/spɑːnˈteɪ.ni.əs/',
    example1: 'We took a spontaneous road trip to the coast on Saturday morning.',
    example2: 'Her spontaneous laugh immediately cheered up the entire room.',
    level: 'Advanced',
    category: 'Day-to-Day English',
    difficulty: 3,
    relatedWords: ['impromptu', 'unplanned', 'instinctive'],
    commonUsageNotes: 'Contrasts with "methodical" or "calculated". Often has positive connotations of youth and vitality.',
    whenToUse: 'Use when planning fun weekend outings, describing a memorable adventure, or describing lively personalities.',
    commonMistakes: [
      '❌ "Spontaneous decisioned" → "Spontaneous decision" (spontaneous is an adjective modifying the noun).'
    ],
    situationPrompt: 'It is a sunny Saturday afternoon and you and your friend have no plans. Suggest a spontaneous activity you can do right now.'
  },
  {
    id: 'd6',
    word: 'Affordable',
    meaning: 'Inexpensive enough for average people to easily buy or pay for.',
    simpleExplanation: 'Priced reasonably so it fits comfortably within your budget.',
    partOfSpeech: 'adjective',
    pronunciation: '/əˈfɔːr.də.bəl/',
    example1: 'They found an affordable apartment close to the subway station.',
    example2: 'The restaurant serves delicious food at very affordable prices.',
    level: 'Beginner',
    category: 'Day-to-Day English',
    difficulty: 1,
    relatedWords: ['budget-friendly', 'economical', 'reasonable'],
    commonUsageNotes: 'Derives from the verb "afford": "I can afford this" -> "This is affordable".',
    whenToUse: 'Use when recommending neighborhood restaurants, house hunting, or shopping on a budget.',
    commonMistakes: [
      '❌ "The price is affordable" → Better: "The apartment is affordable" or "The prices are reasonable".'
    ],
    situationPrompt: 'A colleague is visiting your city and wants a good lunch recommendation. Recommend an affordable cafe near the office.'
  },
  {
    id: 'd7',
    word: 'Frugal',
    meaning: 'Careful when using money or food, avoiding waste.',
    simpleExplanation: 'Living simply and smartly avoiding unnecessary spending.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈfruː.ɡəl/',
    example1: 'Living a frugal lifestyle helped him pay off his student debt in three years.',
    example2: 'She is frugal with electricity and always turns off lights when leaving a room.',
    level: 'Advanced',
    category: 'Day-to-Day English',
    difficulty: 3,
    relatedWords: ['thrifty', 'economical', 'sparing'],
    commonUsageNotes: '"Frugal" is a positive, wise word; "cheap" or "stingy" is negative.',
    whenToUse: 'Use when discussing personal finance strategies, budgeting wisdom, and sustainable lifestyles.',
    commonMistakes: [
      '❌ Don\'t confuse "frugal" (wise with money) with "stingy" (mean or selfish with money).'
    ],
    situationPrompt: 'Your friend is trying to save money for a home deposit. Share how adopting a frugal habit can help them save each month.'
  },

  // 3. Grammar & Common Usage
  {
    id: 'g1',
    word: 'Consequently',
    meaning: 'As a result; therefore.',
    simpleExplanation: 'A transition word showing that one event happened because of a previous event.',
    partOfSpeech: 'adverb',
    pronunciation: '/ˈkɑːn.sə.kwənt.li/',
    example1: 'He did not study for the test; consequently, he did not pass.',
    example2: 'The flight was canceled, and consequently, we missed the opening ceremony.',
    level: 'Intermediate',
    category: 'Grammar & Common Usage',
    difficulty: 2,
    relatedWords: ['therefore', 'thus', 'as a consequence'],
    commonUsageNotes: 'Best placed at the start of a sentence or after a semicolon with a comma following it.',
    whenToUse: 'Use in essays, formal emails, or presentations to link cause and effect clearly.',
    commonMistakes: [
      '❌ Forgetting the comma: "Consequently we left." → ✅ "Consequently, we left."'
    ],
    situationPrompt: 'A shipment of materials was delayed by a storm. Explain to your manager that consequently, production will start tomorrow.'
  },
  {
    id: 'g2',
    word: 'Furthermore',
    meaning: 'In addition to what has just been stated; moreover.',
    simpleExplanation: 'Used when you want to add another strong point supporting your argument.',
    partOfSpeech: 'adverb',
    pronunciation: '/ˌfɝː.ðɚˈmɔːr/',
    example1: 'The house is in a great neighborhood; furthermore, the rent is very reasonable.',
    example2: 'Exercise improves physical health; furthermore, it boosts mental well-being.',
    level: 'Intermediate',
    category: 'Grammar & Common Usage',
    difficulty: 2,
    relatedWords: ['moreover', 'in addition', 'besides'],
    commonUsageNotes: 'Use a comma after "Furthermore" when it introduces an independent clause.',
    whenToUse: 'Use when building a convincing case in proposals, team discussions, or debates.',
    commonMistakes: [
      '❌ Using "furthermore" to introduce a contradiction. It only adds *supporting* points.'
    ],
    situationPrompt: 'You are pitching a new software subscription to your boss. Give one benefit, and then use "furthermore" to add a second key advantage.'
  },
  {
    id: 'g3',
    word: 'Although',
    meaning: 'In spite of the fact that; even though.',
    simpleExplanation: 'Used to introduce a contrast or unexpected concession in a sentence.',
    partOfSpeech: 'adverb',
    pronunciation: '/ɑːlˈðoʊ/',
    example1: 'Although it rained heavily, we thoroughly enjoyed the outdoor picnic.',
    example2: 'He decided to accept the offer, although the salary was slightly below expectations.',
    level: 'Beginner',
    category: 'Grammar & Common Usage',
    difficulty: 1,
    relatedWords: ['even though', 'while', 'despite the fact that'],
    commonUsageNotes: 'Do not use "although" and "but" in the same sentence together.',
    whenToUse: 'Use to acknowledge a challenge or downside while presenting an overall positive outcome.',
    commonMistakes: [
      '❌ "Although it was cold, but we went out." → ✅ "Although it was cold, we went out." (Never combine although + but!).'
    ],
    situationPrompt: 'You completed a challenging project despite having a tight schedule. Describe your accomplishment using "although".'
  },
  {
    id: 'g4',
    word: 'Inadvertently',
    meaning: 'Without intention; accidentally.',
    simpleExplanation: 'Doing something by mistake when you did not mean to do it.',
    partOfSpeech: 'adverb',
    pronunciation: '/ˌɪn.ədˈvɝː.tənt.li/',
    example1: 'I inadvertently deleted the draft while organizing my desktop folders.',
    example2: 'He inadvertently offended his host by leaving too early.',
    level: 'Advanced',
    category: 'Grammar & Common Usage',
    difficulty: 3,
    relatedWords: ['accidentally', 'unintentionally', 'unwittingly'],
    commonUsageNotes: 'Root adjective is "inadvertent", the opposite of "deliberate" or "intentional".',
    whenToUse: 'Use when apologizing professionally for an innocent mistake or explaining an unexpected software glitch.',
    commonMistakes: [
      '❌ Saying "I was inadvertently" → Say "I inadvertently sent the wrong file" (it modifies the action).'
    ],
    situationPrompt: 'You sent an email to the wrong recipient by mistake. Write a brief professional apology explaining that you inadvertently sent it.'
  },
  {
    id: 'g5',
    word: 'Nonetheless',
    meaning: 'In spite of that; nevertheless.',
    simpleExplanation: 'Showing that something is true even though there is an obstacle.',
    partOfSpeech: 'adverb',
    pronunciation: '/ˌnʌn.ðəˈles/',
    example1: 'The hike was steep and exhausting; nonetheless, the summit view made it worthwhile.',
    example2: 'It was a risky decision, but we decided to proceed nonetheless.',
    level: 'Advanced',
    category: 'Grammar & Common Usage',
    difficulty: 3,
    relatedWords: ['nevertheless', 'regardless', 'anyway'],
    commonUsageNotes: 'Written as one single word without spaces or hyphens in modern English.',
    whenToUse: 'Use in executive summaries or debates when an obstacle exists but the goal is still worthwhile.',
    commonMistakes: [
      '❌ Writing "none the less" with spaces → ✅ Always spell it as one word: "nonetheless".'
    ],
    situationPrompt: 'Your team faced budget cuts on an initiative. Explain that the goal is difficult, but your team will deliver it nonetheless.'
  },
  {
    id: 'g6',
    word: 'Whereas',
    meaning: 'In contrast or comparison with the fact that.',
    simpleExplanation: 'Used to highlight a direct difference between two people, things, or facts.',
    partOfSpeech: 'adverb',
    pronunciation: '/weerˈæz/',
    example1: 'Some people prefer working in quiet solitude, whereas others thrive in noisy cafes.',
    example2: 'My sister is very outgoing, whereas I am quite introverted.',
    level: 'Intermediate',
    category: 'Grammar & Common Usage',
    difficulty: 2,
    relatedWords: ['while', 'in contrast', 'conversely'],
    commonUsageNotes: 'Connects two balanced contrasting ideas, usually preceded by a comma.',
    whenToUse: 'Use when comparing two products, departments, or personality traits in a structured way.',
    commonMistakes: [
      '❌ Forgetting the comma before whereas: "Plan A is fast whereas Plan B is cheap." → Add comma: "...fast, whereas Plan B..."'
    ],
    situationPrompt: 'Compare your preferred work style with a colleague\'s work style using "whereas".'
  },
  {
    id: 'g7',
    word: 'Despite',
    meaning: 'Without being affected by; in spite of.',
    simpleExplanation: 'Shows that something happened even though there was something that might have stopped it.',
    partOfSpeech: 'adverb',
    pronunciation: '/dɪˈspaɪt/',
    example1: 'Despite the bad weather, hundreds of runners participated in the marathon.',
    example2: 'She remained optimistic despite facing numerous setbacks.',
    level: 'Beginner',
    category: 'Grammar & Common Usage',
    difficulty: 1,
    relatedWords: ['in spite of', 'regardless of', 'notwithstanding'],
    commonUsageNotes: 'Never say "despite of". Always say "despite [noun/gerund]" or "in spite of [noun]".',
    whenToUse: 'Use when recounting resilience, success through adversity, or unexpected positive outcomes.',
    commonMistakes: [
      '❌ "Despite of the rain" → ✅ "Despite the rain" (Never use "of" after despite).'
    ],
    situationPrompt: 'You reached your sales target even though the market was slow this month. State your success using "despite".'
  },

  // 4. Conversations & Social Situations
  {
    id: 'c1',
    word: 'Empathy',
    meaning: 'The ability to understand and share the feelings of another person.',
    simpleExplanation: 'Putting yourself in someone else’s shoes to truly feel what they are experiencing.',
    partOfSpeech: 'noun',
    pronunciation: '/ˈem.pə.θi/',
    example1: 'Showing genuine empathy can comfort a friend during a difficult moment.',
    example2: 'Good listeners practice empathy rather than rushing to give advice.',
    level: 'Intermediate',
    category: 'Conversations & Social Situations',
    difficulty: 2,
    relatedWords: ['compassion', 'understanding', 'sensitivity'],
    commonUsageNotes: 'Different from "sympathy" (feeling sorry for someone); empathy is feeling *with* someone.',
    whenToUse: 'Use when talking about emotional intelligence, customer support, and deep friendships.',
    commonMistakes: [
      '❌ "I have an empathy" → "Empathy" is usually uncountable: "show empathy" or "express empathy".'
    ],
    situationPrompt: 'A close teammate is stressed about a family matter. Explain why showing empathy is more helpful than giving quick advice.'
  },
  {
    id: 'c2',
    word: 'Awkward',
    meaning: 'Causing or feeling embarrassment or a lack of comfort.',
    simpleExplanation: 'Uncomfortable or slightly embarrassing social situations or silences.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈɑː.kwɚd/',
    example1: 'There was an awkward silence when nobody knew the answer to the question.',
    example2: 'I felt awkward bumping into someone whose name I completely forgot.',
    level: 'Beginner',
    category: 'Conversations & Social Situations',
    difficulty: 1,
    relatedWords: ['uncomfortable', 'clumsy', 'embarrassing'],
    commonUsageNotes: 'Can describe a feeling ("I felt awkward") or a situation ("an awkward encounter").',
    whenToUse: 'Use when recounting relatable social mishaps, long elevator silences, or meeting someone unexpectedly.',
    commonMistakes: [
      '❌ Misspelling: remember the "w" appears twice: a-w-k-w-a-r-d.'
    ],
    situationPrompt: 'You joined an online video call and everyone was on mute in silence for a minute. Describe the awkward moment.'
  },
  {
    id: 'c3',
    word: 'Compliment',
    meaning: 'A polite expression of praise, admiration, or congratulation.',
    simpleExplanation: 'Saying something nice to someone about their appearance, work, or personality.',
    partOfSpeech: 'noun',
    pronunciation: '/ˈkɑːm.plə.mənt/',
    example1: 'She paid him a sincere compliment on his public speaking skills.',
    example2: 'Thank you for the wonderful compliment, you made my day!',
    level: 'Beginner',
    category: 'Conversations & Social Situations',
    difficulty: 1,
    relatedWords: ['praise', 'flattery', 'commendation'],
    commonUsageNotes: 'Do not confuse with "complement" (with an e), which means something that completes or goes well with.',
    whenToUse: 'Use when praising coworkers, acknowledging good work, or expressing gratitude for kind words.',
    commonMistakes: [
      '❌ Confusing with "complement": "Compliment" (with an "i") means praise; "Complement" (with an "e") means going well together.'
    ],
    situationPrompt: 'A coworker gave an insightful talk at a company all-hands meeting. Pay them a genuine compliment on their presentation.'
  },
  {
    id: 'c4',
    word: 'Misunderstanding',
    meaning: 'A failure to understand something correctly, often causing a disagreement.',
    simpleExplanation: 'When people have different ideas of what was said, leading to confusion.',
    partOfSpeech: 'noun',
    pronunciation: '/ˌmɪs.ʌn.dɚˈstæn.dɪŋ/',
    example1: 'A simple phone call quickly resolved the misunderstanding between the neighbors.',
    example2: 'I apologize for any misunderstanding caused by my ambiguous message.',
    level: 'Intermediate',
    category: 'Conversations & Social Situations',
    difficulty: 2,
    relatedWords: ['miscommunication', 'confusion', 'mix-up'],
    commonUsageNotes: 'Often paired with verbs like "clear up a misunderstanding" or "cause a misunderstanding".',
    whenToUse: 'Use when resolving diplomatic confusion, smoothing over a tense message, or reconciling friends.',
    commonMistakes: [
      '❌ "We had a misunderstand" → ✅ "We had a misunderstanding" (Use the noun form).'
    ],
    situationPrompt: 'Two colleagues misunderstood the meeting time and showed up an hour late. Suggest a friendly way to resolve the misunderstanding.'
  },
  {
    id: 'c5',
    word: 'Articulate',
    meaning: 'Able to express thoughts and ideas clearly and effectively in speech or writing.',
    simpleExplanation: 'Expressing your opinions clearly so everyone easily understands your point.',
    partOfSpeech: 'adjective',
    pronunciation: '/ɑːrˈtɪk.jə.lət/',
    example1: 'She gave an articulate and persuasive speech that impressed all the attendees.',
    example2: 'He is usually very articulate, but he struggled to explain what happened.',
    level: 'Advanced',
    category: 'Conversations & Social Situations',
    difficulty: 3,
    relatedWords: ['eloquent', 'fluent', 'clear-spoken'],
    commonUsageNotes: 'As an adjective, ending is pronounced "-ət". As a verb ("to articulate a vision"), ending is "-eɪt".',
    whenToUse: 'Use in interview feedback, speech reviews, or praising clear communicators.',
    commonMistakes: [
      '❌ Pronouncing the adjective as "-ate". For the adjective, pronounce the ending as "-ət".'
    ],
    situationPrompt: 'You are reviewing a job candidate who explained complex engineering concepts with great clarity. Describe them as articulate.'
  },
  {
    id: 'c6',
    word: 'Catch up',
    meaning: 'To talk to someone you have not seen for a while to find out what they have been doing.',
    simpleExplanation: 'Meeting an old friend to share recent updates and news.',
    partOfSpeech: 'phrasal verb',
    pronunciation: '/kætʃ ʌp/',
    example1: 'Let’s grab coffee this weekend so we can catch up on each other’s news.',
    example2: 'It was wonderful to catch up with my university classmates after five years.',
    level: 'Beginner',
    category: 'Conversations & Social Situations',
    difficulty: 1,
    relatedWords: ['reconnect', 'chat', 'touch base'],
    commonUsageNotes: 'Can also be used as a noun: "Let’s have a quick catch-up".',
    whenToUse: 'Use when reconnecting with former coworkers, friends, or family over lunch or a phone call.',
    commonMistakes: [
      '❌ "Catch up to someone" (means physically overtaking someone running) vs "Catch up with someone" (socially reconnecting).'
    ],
    situationPrompt: 'You bump into a former colleague on the street whom you haven\'t seen in months. Suggest getting lunch to catch up.'
  },
  {
    id: 'c7',
    word: 'Nuance',
    meaning: 'A subtle distinction or subtle variation in tone, meaning, or expression.',
    simpleExplanation: 'A small, delicate detail or difference that isn’t obvious at first glance.',
    partOfSpeech: 'noun',
    pronunciation: '/ˈnuː.ɑːns/',
    example1: 'Humor often relies on cultural nuances that are hard to translate directly.',
    example2: 'An advanced speaker understands the emotional nuances of different English words.',
    level: 'Advanced',
    category: 'Conversations & Social Situations',
    difficulty: 3,
    relatedWords: ['subtlety', 'shade', 'refinement'],
    commonUsageNotes: 'Often used in plural: "nuances of language", "nuances of negotiation".',
    whenToUse: 'Use when discussing literature, language learning, art, or cross-cultural communication.',
    commonMistakes: [
      '❌ "A big nuance" → Nuance literally means a subtle, slight difference.'
    ],
    situationPrompt: 'Explain to an English learner why understanding cultural nuance is just as important as memorizing vocabulary.'
  },

  // 5. Travel & Situations
  {
    id: 't1',
    word: 'Itinerary',
    meaning: 'A planned route or journey, often listing dates, times, and activities.',
    simpleExplanation: 'Your detailed travel schedule showing where you go and what you do each day.',
    partOfSpeech: 'noun',
    pronunciation: '/aɪˈtɪn.ə.rer.i/',
    example1: 'Visiting the ancient museum is the first item on our travel itinerary.',
    example2: 'We kept our itinerary flexible so we could explore unexpected scenic spots.',
    level: 'Intermediate',
    category: 'Travel & Situations',
    difficulty: 2,
    relatedWords: ['schedule', 'travel plan', 'program'],
    commonUsageNotes: 'Stresses the second syllable: eye-TIN-er-air-ee.',
    whenToUse: 'Use when planning vacations, coordinating group travel, or booking flights.',
    commonMistakes: [
      '❌ Mispronunciation: stress falls on the second syllable: /aɪˈtɪn.ə.rer.i/.'
    ],
    situationPrompt: 'You are planning a three-day weekend trip with friends. Propose a balanced travel itinerary with sightseeing and relaxing.'
  },
  {
    id: 't2',
    word: 'Departure',
    meaning: 'The act of leaving a place, especially at the start of a journey.',
    simpleExplanation: 'Leaving an airport, train station, or hotel to start traveling.',
    partOfSpeech: 'noun',
    pronunciation: '/dɪˈpɑːr.tʃɚ/',
    example1: 'Passengers should arrive at the gate at least thirty minutes before departure.',
    example2: 'Our departure was delayed due to dense morning fog on the runway.',
    level: 'Beginner',
    category: 'Travel & Situations',
    difficulty: 1,
    relatedWords: ['takeoff', 'leaving', 'exit'],
    commonUsageNotes: 'Opposite of "arrival". Look for the "Departures" sign at airports and stations.',
    whenToUse: 'Use at airports, train stations, hotel checkouts, and international travel bookings.',
    commonMistakes: [
      '❌ "Make a departure" → Say "prepare for departure" or "await departure".'
    ],
    situationPrompt: 'You are at an airport terminal waiting for your flight. Inform a family member about your scheduled departure time.'
  },
  {
    id: 't3',
    word: 'Accommodate',
    meaning: 'To provide lodging or sufficient space for someone; or to adapt to someone’s needs.',
    simpleExplanation: 'Giving someone a comfortable place to stay or adjusting plans to help them.',
    partOfSpeech: 'verb',
    pronunciation: '/əˈkɑː.mə.deɪt/',
    example1: 'The boutique hotel can accommodate up to fifty guests at a time.',
    example2: 'The airline staff did their best to accommodate passengers on the next flight.',
    level: 'Intermediate',
    category: 'Travel & Situations',
    difficulty: 2,
    relatedWords: ['host', 'lodge', 'oblige'],
    commonUsageNotes: 'Spelled with double "c" and double "m" (a very common spelling pitfall in English).',
    whenToUse: 'Use in hospitality, hotel bookings, or when politely adapting to someone\'s dietary/timing requirements.',
    commonMistakes: [
      '❌ Spelling error: writing "acommodate" or "accomodate" → Remember: two "c"s and two "m"s: accommodate.'
    ],
    situationPrompt: 'You are hosting an international visitor with dietary restrictions. Tell them you will gladly accommodate their meal preferences.'
  },
  {
    id: 't4',
    word: 'Picturesque',
    meaning: 'Visually attractive in a charming or quaint way, like a painting.',
    simpleExplanation: 'A place so beautiful and scenic that it looks like a postcard.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˌpɪk.tʃəˈresk/',
    example1: 'We strolled through a picturesque village surrounded by rolling green vineyards.',
    example2: 'The cafe offers a picturesque view of the harbor and fishing boats.',
    level: 'Advanced',
    category: 'Travel & Situations',
    difficulty: 3,
    relatedWords: ['scenic', 'charming', 'breathtaking'],
    commonUsageNotes: 'Often used to describe rural landscapes, old towns, or seaside views.',
    whenToUse: 'Use on travel blogs, vacation postcards, and photo captions of scenic landscapes.',
    commonMistakes: [
      '❌ Using "picturesque" to describe modern technology or gadgets. It describes scenic places and views.'
    ],
    situationPrompt: 'You just arrived at a seaside mountain village. Describe the picturesque scenery to a friend back home.'
  },
  {
    id: 't5',
    word: 'Reservation',
    meaning: 'An arrangement to have something (like a room or table) held for your use.',
    simpleExplanation: 'Booking a hotel room, flight, or restaurant table in advance.',
    partOfSpeech: 'noun',
    pronunciation: '/ˌrez.ɚˈveɪ.ʃən/',
    example1: 'I made a dinner reservation for two at seven o’clock tonight.',
    example2: 'Do you have a reservation under the name Smith?',
    level: 'Beginner',
    category: 'Travel & Situations',
    difficulty: 1,
    relatedWords: ['booking', 'appointment', 'arrangement'],
    commonUsageNotes: 'Use "make a reservation" or "cancel a reservation". Also can mean doubt/hesitation in other contexts.',
    whenToUse: 'Use when calling restaurants, booking boutique hotels, or ordering rental cars.',
    commonMistakes: [
      '❌ "Take a reservation" → Say "Make a reservation" or "I have a reservation under [name]".'
    ],
    situationPrompt: 'You walk into a busy restaurant for dinner. Tell the host that you have a reservation under your name for 7:30 PM.'
  },
  {
    id: 't6',
    word: 'Navigation',
    meaning: 'The process or activity of accurately ascertaining one’s position and planning a route.',
    simpleExplanation: 'Finding your way around an unfamiliar city or following directions.',
    partOfSpeech: 'noun',
    pronunciation: '/ˌnæv.əˈɡeɪ.ʃən/',
    example1: 'Smartphone GPS navigation makes exploring foreign cities much less intimidating.',
    example2: 'The hiking trail requires careful navigation due to faint path markers.',
    level: 'Intermediate',
    category: 'Travel & Situations',
    difficulty: 2,
    relatedWords: ['orientation', 'routing', 'wayfinding'],
    commonUsageNotes: 'Associated with map apps, sailing, aviation, and digital website menus.',
    whenToUse: 'Use when renting cars, hiking unfamiliar trails, or navigating public transport.',
    commonMistakes: [
      '❌ Saying "I am doing navigation" → Say "I am navigating" (verb) or "I use navigation apps" (noun).'
    ],
    situationPrompt: 'You are driving in a new city without good cell reception. Explain why offline map navigation is essential for travel.'
  },
  {
    id: 't7',
    word: 'Exhilarating',
    meaning: 'Making one feel very happy, animated, or elated; thrilling.',
    simpleExplanation: 'An exciting activity that gets your adrenaline pumping in a fun way.',
    partOfSpeech: 'adjective',
    pronunciation: '/ɪɡˈzɪl.ə.reɪ.tɪŋ/',
    example1: 'Whitewater rafting down the mountain river was an exhilarating experience.',
    example2: 'Reaching the summit at sunrise was both exhausting and exhilarating.',
    level: 'Advanced',
    category: 'Travel & Situations',
    difficulty: 3,
    relatedWords: ['thrilling', 'electrifying', 'invigorating'],
    commonUsageNotes: 'Describes high-energy, memorable adventures or breakthrough moments.',
    whenToUse: 'Use when describing outdoor adventure sports, amusement park rides, or thrilling live concerts.',
    commonMistakes: [
      '❌ "I felt exhilarating" → ✅ "I felt exhilarated" (how you feel) vs "The ride was exhilarating" (how the experience is).'
    ],
    situationPrompt: 'You just tried zip-lining over a forest canopy. Describe the exhilarating rush of the experience to your friends.'
  },

  // 6. Professional Communication
  {
    id: 'p1',
    word: 'Facilitate',
    meaning: 'To make an action or process easy or easier to accomplish.',
    simpleExplanation: 'Helping a discussion, workshop, or workflow run smoothly.',
    partOfSpeech: 'verb',
    pronunciation: '/fəˈsɪl.ə.teɪt/',
    example1: 'The moderator was brought in to facilitate productive dialogue between both sides.',
    example2: 'Modern digital tools help facilitate remote communication across international teams.',
    level: 'Intermediate',
    category: 'Professional Communication',
    difficulty: 2,
    relatedWords: ['assist', 'enable', 'expedite'],
    commonUsageNotes: 'Used in business to mean "guiding a process without dictating the outcome".',
    whenToUse: 'Use in meeting agendas, workshop descriptions, and organizational strategy documents.',
    commonMistakes: [
      '❌ "Facilitate with someone" → Say "Facilitate a workshop" or "Facilitate communication" (takes a direct object).'
    ],
    situationPrompt: 'Your department is hosting a design thinking session. Volunteer to facilitate the brainstorming workshop.'
  },
  {
    id: 'p2',
    word: 'Comprehensive',
    meaning: 'Complete; including all or nearly all elements or aspects of something.',
    simpleExplanation: 'Thorough and detailed, leaving nothing important out.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˌkɑːm.prəˈhen.sɪv/',
    example1: 'She delivered a comprehensive report covering every stage of the project.',
    example2: 'The company provides comprehensive health insurance for all full-time employees.',
    level: 'Intermediate',
    category: 'Professional Communication',
    difficulty: 2,
    relatedWords: ['thorough', 'all-inclusive', 'exhaustive'],
    commonUsageNotes: 'Do not confuse with "comprehensible" (which means easy to understand).',
    whenToUse: 'Use when presenting in-depth market audits, thorough documentation, or end-to-end service packages.',
    commonMistakes: [
      '❌ Confusing with "comprehensible". "Comprehensive" means complete; "comprehensible" means understandable.'
    ],
    situationPrompt: 'Your team finished a full security audit of the web platform. Describe your findings as a comprehensive report.'
  },
  {
    id: 'p3',
    word: 'Substantiate',
    meaning: 'To provide evidence to support or prove the truth of an assertion.',
    simpleExplanation: 'Backing up your claims with verifiable facts, numbers, or evidence.',
    partOfSpeech: 'verb',
    pronunciation: '/səbˈstæn.ʃi.eɪt/',
    example1: 'Can you substantiate your findings with concrete market survey data?',
    example2: 'The analyst was unable to substantiate the rumors regarding a company merger.',
    level: 'Advanced',
    category: 'Professional Communication',
    difficulty: 3,
    relatedWords: ['verify', 'corroborate', 'validate'],
    commonUsageNotes: 'Formal professional register; often used in legal, academic, and business cases.',
    whenToUse: 'Use in formal proposals, data reviews, research presentations, and executive summaries.',
    commonMistakes: [
      '❌ "Substantiate to a claim" → ✅ "Substantiate a claim" (takes a direct object).'
    ],
    situationPrompt: 'A colleague made a bold claim about competitor sales figures. Politely ask them to substantiate their statement with data.'
  },
  {
    id: 'p4',
    word: 'Proposal',
    meaning: 'A formal plan or suggestion, especially one put forward in writing for consideration.',
    simpleExplanation: 'A written plan offering an idea or business solution for approval.',
    partOfSpeech: 'noun',
    pronunciation: '/prəˈpoʊ.zəl/',
    example1: 'We submitted our budget proposal to the executive board yesterday.',
    example2: 'Her proposal for reducing office plastic waste was unanimously approved.',
    level: 'Beginner',
    category: 'Professional Communication',
    difficulty: 1,
    relatedWords: ['pitch', 'bid', 'recommendation'],
    commonUsageNotes: 'Common collocations: "submit a proposal", "approve a proposal", "reject a proposal".',
    whenToUse: 'Use when pitching new contracts, applying for grants, or suggesting internal company improvements.',
    commonMistakes: [
      '❌ "Make a propose" → Say "Write a proposal" or "Submit a proposal".'
    ],
    situationPrompt: 'You have drafted a plan to streamline client onboarding. Present your proposal to the team lead for review.'
  },
  {
    id: 'p5',
    word: 'Diplomatic',
    meaning: 'Having or showing an ability to deal with people in a sensitive and tactful way.',
    simpleExplanation: 'Communicating carefully so you do not hurt feelings or create conflicts.',
    partOfSpeech: 'adjective',
    pronunciation: '/ˌdɪp.ləˈmæt̬.ɪk/',
    example1: 'She gave a diplomatic response that acknowledged everyone’s concerns gracefully.',
    example2: 'Being diplomatic is crucial when delivering critical feedback to your peers.',
    level: 'Intermediate',
    category: 'Professional Communication',
    difficulty: 2,
    relatedWords: ['tactful', 'polite', 'discreet'],
    commonUsageNotes: 'Contrasts with "blunt", "aggressive", or "tactless".',
    whenToUse: 'Use when resolving stakeholder disagreements, managing tricky client communications, or coaching managers.',
    commonMistakes: [
      '❌ "He speaks diplomacy" → Say "He is diplomatic" or "He speaks diplomatically".'
    ],
    situationPrompt: 'Two team members have opposing opinions on a design direction. Give a diplomatic suggestion that honors both viewpoints.'
  },
  {
    id: 'p6',
    word: 'Pragmatic',
    meaning: 'Dealing with things sensibly and realistically, based on practical considerations rather than theory.',
    simpleExplanation: 'Focusing on what actually works in the real world rather than idealistic theories.',
    partOfSpeech: 'adjective',
    pronunciation: '/præɡˈmæt̬.ɪk/',
    example1: 'We took a pragmatic approach to meet our target within the constrained budget.',
    example2: 'He is known as a pragmatic problem solver who focuses on fast, reliable outcomes.',
    level: 'Advanced',
    category: 'Professional Communication',
    difficulty: 3,
    relatedWords: ['practical', 'realistic', 'hard-headed'],
    commonUsageNotes: 'Opposite of "idealistic" or "dogmatic". Often prized in business leadership.',
    whenToUse: 'Use when deciding between a quick workable fix and a complex long-term rebuild under tight deadlines.',
    commonMistakes: [
      '❌ Saying "pragmatical" → Modern English standard form is "pragmatic".'
    ],
    situationPrompt: 'Your team cannot build every requested feature before launch. Suggest a pragmatic solution that ships the core functionality first.'
  },
  {
    id: 'p7',
    word: 'Summarize',
    meaning: 'To give a brief statement of the main points of something.',
    simpleExplanation: 'Stating the essential takeaways quickly without unnecessary details.',
    partOfSpeech: 'verb',
    pronunciation: '/ˈsʌm.ə.raɪz/',
    example1: 'Could you summarize the main conclusions of the quarterly report in two minutes?',
    example2: 'The team lead summarized our next action items at the end of the meeting.',
    level: 'Beginner',
    category: 'Professional Communication',
    difficulty: 1,
    relatedWords: ['recap', 'outline', 'condense'],
    commonUsageNotes: 'Often used at the end of presentations: "To summarize our findings..."',
    whenToUse: 'Use at the conclusion of phone calls, slide presentations, meeting minutes, and executive recaps.',
    commonMistakes: [
      '❌ "Summarize about the meeting" → Say "Summarize the meeting" (takes a direct object).'
    ],
    situationPrompt: 'A long strategy meeting just finished. Volunteer to summarize the main action items in a follow-up email.'
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    title: '5 Words Learned',
    description: 'Practice and master 5 essential English vocabulary words.',
    iconName: 'BookOpen',
    requirementType: 'words_learned',
    requirementValue: 5,
    xpReward: 0
  },
  {
    id: 'm2',
    title: '10 Words Learned',
    description: 'Double your foundational vocabulary with 10 words practiced.',
    iconName: 'Sparkles',
    requirementType: 'words_learned',
    requirementValue: 10,
    xpReward: 0
  },
  {
    id: 'm3',
    title: '25 Words Learned',
    description: 'You are building a solid, reliable working vocabulary.',
    iconName: 'Trophy',
    requirementType: 'words_learned',
    requirementValue: 25,
    xpReward: 0
  },
  {
    id: 'm4',
    title: '50 Words Learned',
    description: 'Reach an impressive landmark of 50 mastered vocabulary terms.',
    iconName: 'Award',
    requirementType: 'words_learned',
    requirementValue: 50,
    xpReward: 0
  },
  {
    id: 'm5',
    title: '3-Day Consistency Streak',
    description: 'Practice English on three consecutive calendar days.',
    iconName: 'Flame',
    requirementType: 'streak_days',
    requirementValue: 3,
    xpReward: 0
  },
  {
    id: 'm6',
    title: '7-Day Champion Streak',
    description: 'Maintain a full one-week daily speaking streak without missing a day.',
    iconName: 'Flame',
    requirementType: 'streak_days',
    requirementValue: 7,
    xpReward: 0
  },
  {
    id: 'm7',
    title: 'Workplace Vocabulary Starter',
    description: 'Complete 3 workplace or professional communication practice sessions.',
    iconName: 'Briefcase',
    requirementType: 'category_mastery',
    categoryRequirement: 'Workplace English',
    requirementValue: 3,
    xpReward: 0
  }
];
