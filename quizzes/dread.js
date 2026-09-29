/* =====================================================================
   WORDS FOR THE DREAD QUIZ
   Every word this quiz shows lives in this file. To make a quiz for
   another emotion, copy this file (e.g. quizzes/guilt.js), rewrite the
   words, then copy dreadquiz.html and point it at the new file.
   <em> marks words shown in gold italics. {curly} words are filled in
   from her answers.
   ===================================================================== */
window.QUIZ = {
  // The 3 Minute Reset video
  resetVideoUrl: 'https://youtu.be/gQCd-0_zaxM',
  resetVideoId: 'gQCd-0_zaxM',       // plays in a pop-up on the results page
  bookUrl: '/work-with-me#block-release',
  privacyUrl: '/privacy-policy',
  // The public quiz link: what friends are sent, and the start of her result link
  quizUrl: 'https://energydetective.online/dreadquiz',
  // Make.com webhook for the email box on the results page. Only used when she
  // submits the box. Leave it empty to hide the box.
  emailWebhook: 'https://hook.eu1.make.com/qdwzm5gcv3fisu14hblzekv5a716lihl',
  // This emotion's name, sent to Make with her details
  emotion: 'Dread',

  intro: {
    eyebrow: 'The Dread Quiz',
    headline: 'What’s really behind your <em>dread</em>?',
    meta: '27 questions · 3 minutes',
    text: 'At this stage of life, most women play several roles. Most were handed to us long before we knew we had a choice. Answer 27 quick questions to find out which role is behind your dread, when you picked it up, and how long you’ve been carrying it.'
  },

  instruction: 'How much do you agree? Go with your first answer.',
  submit: 'See my result',
  // Shown as five circles. Only the first and last labels appear on screen;
  // the rest are read out by screen readers.
  scale: [
    { label: 'Disagree', score: 1 },
    { label: 'Slightly disagree', score: 2 },
    { label: 'Neutral', score: 3 },
    { label: 'Slightly agree', score: 4 },
    { label: 'Agree', score: 5 }
  ],

  // In this order. Numbered 1 to 24 for the scoring table below.
  statements: [
    'Before I say no to someone, I’ve already imagined how upset they’ll be.',
    'When something goes wrong, I’m the one people ring, and I sort it.',
    'I rewrite a simple email three times before I send it.',
    'When the phone rings late, my first thought is that something’s happened to someone.',
    'When something goes wrong, I assume it’s my fault before I know what happened.',
    'In a group, I’d rather fade into the background than be noticed.',
    'I can let someone be annoyed with me without it ruining my day.',
    'I say “I’m fine” long before I’ve checked whether I am.',
    'I still remember my own small mistakes long after everyone else has forgotten them.',
    'If someone I love doesn’t reply, I can’t settle until they do.',
    'When someone says “Can we talk?”, I’m sure I’m in trouble.',
    'I keep what I want to myself, because it doesn’t feel like it matters.',
    'I’ll go along with plans I don’t want, just to avoid the awkwardness.',
    'When it all gets too much, I find it easy to hand things over.',
    'When someone checks my work, my stomach drops.',
    'I know how everyone in my family is doing, even when nobody asks how I am.',
    'Growing up, I was usually the one who got the blame.',
    'I dread being the centre of attention, even on my birthday.',
    'After I’ve spoken up, I replay it for hours wondering if I went too far.',
    'I’d rather do it myself than ask for help.',
    'I can send something with a small mistake in it and not think about it again.',
    'I can switch off from other people’s problems and enjoy my evening.',
    'When things go wrong, I can usually see it isn’t about me.',
    'People usually notice when I’m not there.'
  ],

  ageNow: { q: 'How old are you now?', min: 18, max: 99 },
  ageThen: { q: 'How old were you when you first remember feeling this way?', min: 2, max: 99 },
  ageCheck: 'That can’t be older than you are now. Have another look?',
  rangeCheck: 'Pop in a number between {min} and {max}.',
  where: {
    q: 'Where were you when you first remember feeling this way?',
    // shown: what she taps. phrase: how it reads in her result (null = "I don't remember")
    options: [
      { shown: 'At home', phrase: 'at home' },
      { shown: 'At school', phrase: 'at school' },
      { shown: 'With friends', phrase: 'with your friends' },
      { shown: 'With a partner', phrase: 'in a relationship' },
      { shown: 'At work', phrase: 'at work' },
      { shown: 'I don’t remember', phrase: null }
    ]
  },

  // Email box on the results page: straight after the chart, and again after Next steps
  // if she hasn't used it. Not shown on a result link.
  emailBox: {
    title: 'Your personalised result is ready',
    text: 'Want a copy sent to your inbox? I’ll send you your result and your 3 Minute Reset, so you can come back to them whenever dread kicks in.',
    email: 'Your best email address',
    button: 'Send me my result',
    // Never ticked for her. Ticked sends marketing "yes", unticked sends "no".
    optIn: 'Yes, I’d also like Nicky’s emails about emotions and how to release them, plus the odd offer. I can unsubscribe any time.',
    done: 'Done. Your result is on its way to your inbox.',
    privacy: 'Privacy policy'
  },

  reading: 'Reading your answers...',

  // Table order matters: it breaks ties. "flip" is scored in reverse (1↔5, 2↔4).
  archetypes: [
    { name: 'The Good Girl', statements: [1, 13, 19], flip: 7,
      summary: 'Everyone finds you easy to be around. You keep the peace, smooth things over and make sure nobody’s upset. What they don’t see is the dread that comes before every no.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'being good kept things calm, and that someone else’s upset was yours to fix. So you became the easy one. You kept the peace, said yes when you meant no, and smoothed things over before anyone could get cross. That’s the dread you feel before every no, and it’s been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Someone else’s feelings were never yours to manage. Saying no doesn’t make you unkind. It makes you honest.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Good Girl. You keep everyone happy, yet nobody sees how much you swallow to do it.',
      nextSteps: 'In a Block Release session, I find where the Good Girl started and the emotions lodged in your nervous system, and release them, so saying no stops costing you a night’s sleep.' },

    { name: 'The Strong One', statements: [2, 8, 20], flip: 14,
      summary: 'You’re the one everyone rings. You sort it, you hold it together and you say you’re fine. What nobody sees is the fear and dread of what would happen if you didn’t hold it all together.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'someone needed you to be strong. So you held it together. You sorted it, you coped, and you said you were fine, because if you didn’t hold it, who would? That’s where the dread comes from: the fear of what happens if you ever stop. It’s been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Needing help was never a weakness. You were never meant to carry it all on your own.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Strong One. You hold so much together, yet nobody sees what it’s truly costing you, or how much you sacrifice to do it.',
      nextSteps: 'In a Block Release session, I find where being the strong one started and the emotions lodged in your nervous system, and release them, so asking for help stops feeling like a free fall.' },

    { name: 'The Perfectionist', statements: [3, 9, 15], flip: 21,
      summary: 'You move fast, you get it done and you get it right. Then you check it again. The dread isn’t about the work. It’s about being caught out.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'mistakes got remembered and held against you, while what you did well went unnoticed. So you had to get everything right, as if your life depended on it. If it was perfect, nobody could pick you apart. That feeling has been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Getting something wrong was never proof that you weren’t good enough. It’s proof that you’re human. Mistakes are natural.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Perfectionist. You check everything twice, yet nobody sees how hard you work to never get it wrong.',
      nextSteps: 'In a Block Release session, I find where getting it right became a matter of safety and the emotions lodged in your nervous system, and release them, so a small mistake stops feeling like a disaster.' },

    { name: 'The Caregiver', statements: [4, 10, 16], flip: 22,
      summary: 'You know how everyone is: who’s struggling, who hasn’t replied, who needs you. When the phone rings late, your heart is racing before you answer. Your dread is about the people you love.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'someone had to keep an eye on everyone. So you started watching: who’s struggling, who hasn’t replied, who needs you. When the phone rings late, your heart is racing before you answer. That’s been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Keeping watch never kept anyone safe. It just kept you on alert. You’re allowed to be looked after too.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Caregiver. You keep a quiet eye on everyone you love, yet nobody sees how tiring all that watching is.',
      nextSteps: 'In a Block Release session, I find where the watching started and the emotions lodged in your nervous system, and release them, so you can love people without bracing for the phone.' },

    { name: 'The Black Sheep', statements: [5, 11, 17], flip: 23,
      summary: 'When something goes wrong, you assume it’s you. Before anyone has said a word, you’re bracing for the blame. “Can we talk?” is enough to make your stomach drop.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'when things went wrong, it landed on you. So you started bracing for the blame before anyone had said a word. “Can we talk?” is enough to make your stomach drop. That’s been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. You were never the problem. You were just the one it was easiest to blame.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Black Sheep. You brace for blame before anything has happened, yet nobody sees how often you’re waiting to be in trouble.',
      nextSteps: 'In a Block Release session, I find where the blame first landed and the emotions lodged in your nervous system, and release them, so “Can we talk?” is only a conversation.' },

    { name: 'The Invisible One', statements: [6, 12, 18], flip: 24,
      summary: 'You’re easy to overlook, and part of you prefers it that way. You keep what you want to yourself and fade into the background. Your dread is about being seen.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'being quiet and small kept things calm. So you made yourself easy to overlook. You kept what you wanted to yourself and faded into the background, because if nobody noticed you, nobody could hurt you. That’s where your dread of being seen comes from, and it’s been coming up on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, dread and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Being seen was never the danger. You’ve been hiding in plain sight, and you don’t have to any more.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Invisible One. You make yourself smaller than you are, yet nobody sees how much you’re holding back.',
      nextSteps: 'In a Block Release session, I find where you learned to disappear and the emotions lodged in your nervous system, and release them, so you can take up the space that’s yours.' }
  ],

  result: {
    eyebrow: 'Your result',
    mostly: 'You’re mostly <em>{main}</em>',
    streak: 'with a strong streak of {second}.',
    mix: 'You’re a mix of <em>{a}</em> and <em>{b}</em>.',
    stage: 'At this stage of life, most women play several roles. Here’s the one you lean on most.',

    knowEyebrow: '1. What to know',
    // How paragraph 1 opens. The "no where" version is used for "I don’t remember" and on a result link.
    knowOpen: 'Your dread started {where}, when you learned that ',
    knowOpenNoWhere: 'Somewhere along the way, you learned that ',
    ending: 'You’ve been carrying this for far too long, since you were {ageThen}, and it’s been impacting your life and your nervous system ever since. But you can start to change that today.',
    // A result link holds only her six scores (no ages), so it uses this version
    endingLink: 'You’ve been carrying this for far too long, and it’s been impacting your life and your nervous system ever since. But you can start to change that today.',
    // Filled into paragraph 1: "for {years}" and "That’s {howLong} for your nervous system".
    // 0 years: "the past year"; 1 year: "a year"; 0 to 4 years: "long enough"; 5 or more: "a long time".
    yearsZero: 'the past year',
    yearsOne: 'a year',
    yearsMany: '{n} years',
    howLongShort: 'long enough',
    howLongLong: 'a long time',
    // How a tie is written in the details sent to Make
    mixRole: 'a mix of {a} and {b}',

    changeEyebrow: '2. Make change now',
    resetTitle: 'Your 3 Minute Reset.',
    resetText: 'Follow along with me to settle your nervous system when the dread kicks in.',
    resetButton: 'Watch your 3 Minute Reset',

    nextEyebrow: '3. Next steps',
    bookButton: 'Book a session to release your dread',

    share: 'Send this quiz to a friend',
    shareMessage: 'I’ve just done this and it was scarily accurate. Which role are you?',
    copied: 'Link copied',
    // The row under the share button
    shareVia: { whatsapp: 'WhatsApp', facebook: 'Facebook', email: 'Email', copy: 'Copy link' },
    shareSubject: 'The Dread Quiz',

    again: 'Take the quiz again'
  },

  // Under the See my result button (the results page shows only the privacy note)
  about: [
    { title: 'Who is this quiz for?',
      text: 'This quiz is for any woman who wants to understand the role she’s been carrying, and why dread keeps showing up. It’s designed for adults and isn’t a diagnosis.' },
    { title: 'Built from:',
      text: 'Nicky’s research into dread and 700+ clearing sessions.' }
  ],
  privacy: 'This quiz is for information only and isn’t a diagnostic tool. Your answers stay on your own device. If you ask for your result by email, only your email and your result (your two main roles and your result link) are sent, to email you your result and your 3 Minute Reset, and my emails only if you tick the box, as explained in our <a href="/privacy-policy">Privacy Policy</a>. This page uses a Meta Pixel cookie to count visits, as explained in our <a href="/cookie-notice">Cookie Notice</a>, but it never sees your answers. If you’re struggling, please speak to your GP or a qualified professional.'
};
