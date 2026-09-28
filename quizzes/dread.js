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
  bookUrl: '/work-with-me#block-release',
  privacyUrl: '/privacy-policy',
  // The public quiz link: what she's emailed and what friends are sent (never with ?from=mc)
  quizUrl: 'https://energydetective.online/dreadquiz',
  // Make.com webhook for the optional email box. Make adds "yes" women to the Flodesk
  // segment "Quiz: Dread" and sends "no" women one email with the quiz link.
  // Leave it empty to hide the email box.
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
      { shown: 'With a partner', phrase: 'with a partner' },
      { shown: 'At work', phrase: 'at work' },
      { shown: 'I don’t remember', phrase: null }
    ]
  },

  // Optional email box, shown before the result unless the link ends in ?from=mc (ManyChat)
  emailBox: {
    title: 'Want a copy of your result?',
    text: 'Pop your email in and I’ll send you the link, so you can come back to it anytime.',
    name: 'First name',
    email: 'Email',
    optIn: 'Would you also like my emails? Tips, tools and the odd offer. You can unsubscribe anytime.',
    yes: 'Yes please',
    no: 'No thanks',
    send: 'Send it and show my result',
    skip: 'No thanks, show me my result',
    privacy: 'Privacy policy'
  },

  reading: 'Reading your answers...',

  // Table order matters: it breaks ties. "flip" is scored in reverse (1↔5, 2↔4).
  archetypes: [
    { name: 'The Good Girl', statements: [1, 13, 19], flip: 7,
      lesson: 'being good kept things calm',
      summary: 'Everyone finds you easy to be around. You keep the peace, smooth things over and make sure nobody’s upset. What they don’t see is the dread that comes before every no.',
      points: [
        'It’s not the conversation you dread. It’s what happens after it.',
        'This role kept you safe. When keeping everyone happy meant a quieter house, it made perfect sense.',
        'It isn’t who you are. It’s a part you learned, and parts can be put down.'
      ],
      nextSteps: 'In a Block Release session, I find where the Good Girl started and the emotions lodged in your nervous system, and release them, so saying no stops costing you a night’s sleep.',
      streak: 'With a strong streak of The Good Girl, you also carry the dread of letting people down.' },

    { name: 'The Strong One', statements: [2, 8, 20], flip: 14,
      lesson: 'someone needed you to be strong',
      summary: 'You’re the one everyone rings. You sort it, you hold it together and you say you’re fine. What nobody sees is the fear and dread of what would happen if you didn\u2019t hold it all together.',
      points: [
        'Your dread is about what happens if you stop, because if you don’t hold it, who will?',
        'This role kept you safe. When there was no one else to hold it, you held it.',
        'It isn’t who you are. You were never meant to carry it all on your own.'
      ],
      nextSteps: 'In a Block Release session, I find where being the strong one started and the emotions lodged in your nervous system, and release them, so asking for help stops feeling like a free fall.',
      streak: 'With a strong streak of The Strong One, you also hold more than anyone knows.' },

    { name: 'The Perfectionist', statements: [3, 9, 15], flip: 21,
      lesson: 'a mistake got noticed faster than anything you did well',
      summary: 'You move fast, you get it done and you get it right. Then you check it again. The dread isn’t about the work. It’s about being caught out.',
      points: [
        'Your dread is about being checked, marked and found wanting.',
        'This role kept you safe. If it was perfect, nobody could pick it apart.',
        'It isn’t who you are. A mistake was never a measure of you.'
      ],
      nextSteps: 'In a Block Release session, I find where getting it right became a matter of safety and the emotions lodged in your nervous system, and release them, so a small mistake stops feeling like a disaster.',
      streak: 'With a strong streak of The Perfectionist, you also check everything twice.' },

    { name: 'The Caregiver', statements: [4, 10, 16], flip: 22,
      lesson: 'someone had to keep an eye on everyone',
      summary: 'You know how everyone is: who’s struggling, who hasn’t replied, who needs you. When the phone rings late, your heart is racing before you answer. Your dread is about the people you love.',
      points: [
        'Your dread is about something happening to someone you love, and you not seeing it coming.',
        'This role kept you safe. Watching everyone meant nothing could take you by surprise.',
        'It isn’t who you are. You’re allowed to be looked after too.'
      ],
      nextSteps: 'In a Block Release session, I find where the watching started and the emotions lodged in your nervous system, and release them, so you can love people without bracing for the phone.',
      streak: 'With a strong streak of The Caregiver, you also keep a quiet eye on everyone you love.' },

    { name: 'The Black Sheep', statements: [5, 11, 17], flip: 23,
      lesson: 'when things went wrong, it landed on you',
      summary: 'When something goes wrong, you assume it’s you. Before anyone has said a word, you’re bracing for the blame. “Can we talk?” is enough to make your stomach drop.',
      points: [
        'Your dread is about being in trouble, and being the problem.',
        'This role kept you safe. Bracing for blame meant it never caught you off guard.',
        'It isn’t who you are. You were never the problem. You were the one it was easiest to blame.'
      ],
      nextSteps: 'In a Block Release session, I find where the blame first landed and the emotions lodged in your nervous system, and release them, so “Can we talk?” is only a conversation.',
      streak: 'With a strong streak of The Black Sheep, you also brace for blame before anything has happened.' },

    { name: 'The Invisible One', statements: [6, 12, 18], flip: 24,
      lesson: 'being quiet and small kept things calm',
      summary: 'You’re easy to overlook, and part of you prefers it that way. You keep what you want to yourself and fade into the background. Your dread is about being seen.',
      points: [
        'Your dread is about attention: being noticed, being asked what you want, being looked at.',
        'This role kept you safe. If nobody noticed you, nobody could hurt you.',
        'It isn’t who you are. You’ve been hiding in plain sight, and you don’t have to any more.'
      ],
      nextSteps: 'In a Block Release session, I find where you learned to disappear and the emotions lodged in your nervous system, and release them, so you can take up the space that’s yours.',
      streak: 'With a strong streak of The Invisible One, you also make yourself smaller than you are.' }
  ],

  result: {
    eyebrow: 'Your result',
    mostly: 'You’re mostly <em>{main}</em>',
    streak: 'with a strong streak of {second}.',
    mix: 'You’re a mix of <em>{a}</em> and <em>{b}</em>.',
    stage: 'At this stage of life, most women play several roles. Here’s the one you lean on most.',

    knowEyebrow: '1. What to know',
    firstPoint: 'You were about {ageThen}, {where}, when you learned that {lesson}. You’ve been playing this role for {years}.',
    firstPointNoWhere: 'You learned a long time ago that {lesson}. You’ve been playing this role for {years}.',
    ending: 'It’s not a you problem. You’ve been carrying this since you were {ageThen}, and it’s been impacting you ever since. You have permission to let it go and feel free from dread.',

    changeEyebrow: '2. Make change now',
    resetTitle: 'Your 3 Minute Reset.',
    resetText: 'Follow along with me to settle your nervous system when the dread kicks in.',
    resetButton: 'Watch your 3 Minute Reset',

    nextEyebrow: '3. Next steps',
    bookButton: 'Book a session to release your dread',

    share: 'Send this quiz to a friend',
    shareMessage: 'I’ve just done this and it was scarily accurate. Which role are you?',
    copied: 'Link copied',

    again: 'Take the quiz again'
  },

  // Under the See my result button (the results page shows only the privacy note)
  about: [
    { title: 'Who is this quiz for?',
      text: 'This quiz is for any woman who wants to understand the role she’s been carrying, and why dread keeps showing up. It’s designed for adults and isn’t a diagnosis.' },
    { title: 'Built from:',
      text: 'Nicky’s research into dread and 700+ clearing sessions.' }
  ],
  privacy: 'This quiz is for information only and isn’t a diagnostic tool. Your answers stay on your own device: they aren’t saved, sent anywhere or linked to you, and nobody can see them. If you choose to give your email, only your name and email are kept, as explained in our <a href="/privacy-policy">Privacy Policy</a>. This page uses a Meta Pixel cookie to count visits, as explained in our <a href="/cookie-notice">Cookie Notice</a>, but it never sees your answers. If you’re struggling, please speak to your GP or a qualified professional.'
};
