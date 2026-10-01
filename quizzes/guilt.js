/* =====================================================================
   WORDS FOR THE GUILT QUIZ
   Every word this quiz shows lives in this file. To make a quiz for
   another emotion, copy this file (e.g. quizzes/shame.js), rewrite the
   words, then copy guiltquiz.html and point it at the new file.
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
  quizUrl: 'https://energydetective.online/guiltquiz',
  // Make.com webhook for the email box on the results page. Only used when she
  // submits the box. Leave it empty to hide the box.
  emailWebhook: 'https://hook.eu1.make.com/qdwzm5gcv3fisu14hblzekv5a716lihl',
  // This emotion's name, sent to Make with her details
  emotion: 'Guilt',

  intro: {
    eyebrow: 'The Guilt Quiz',
    headline: 'What’s really behind your <em>guilt</em>?',
    meta: '27 questions · 3 minutes',
    text: 'At this stage of life, most women play several roles. Most were handed to us long before we knew we had a choice. Answer 27 quick questions to find out which role is behind your guilt, when you picked it up, and how long you’ve been carrying it.'
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
    'If I disappoint someone, I feel like I’ve done something wrong.',
    'I feel guilty asking for help, even when I really need it.',
    'Doing things differently from how my family did them feels like I’m letting them down.',
    'When someone I love is struggling, I feel it’s down to me to sort it.',
    'If there’s an argument in the family, I feel it’s somehow my fault.',
    'When something good happens to me, I find a way to spoil it.',
    'I can turn down an invitation without feeling bad about it.',
    'I only let myself sit down once everything and everyone is sorted.',
    'If I moved further away from my family, I’d feel like I’d abandoned them.',
    'I feel guilty that I don’t see or ring my family more.',
    'I apologise for things that aren’t my fault.',
    'Spending money on myself feels selfish.',
    'When I say no, I explain myself for so long it almost turns into a yes.',
    'When someone offers to help, I can say yes without feeling I owe them.',
    'I stay in friendships I’ve outgrown, because leaving feels disloyal.',
    'I feel relieved when a visit ends, then awful for feeling relieved.',
    'Growing up, I was made to feel I was the difficult one.',
    'When I’m enjoying myself, a little voice says I don’t deserve it.',
    'I say yes to things I don’t want to do, because saying no feels mean.',
    'Even when I’m poorly, I feel I should be up and doing.',
    'I can live my life my own way without feeling I’m betraying my family.',
    'I can go away for a few days without worrying about who needs me.',
    'When someone’s in a bad mood, I know it’s not about me.',
    'When things are going well, I can just enjoy it.'
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
    text: 'Want a copy sent to your inbox? I’ll send you your result and your 3 Minute Reset, so you can come back to them whenever guilt kicks in.',
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
      summary: 'You’re the one who never wants to let anyone down. If someone’s disappointed, it lands on you as if you’ve done something wrong. The guilt arrives before you’ve even said no.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'someone else’s disappointment meant you’d done something wrong. So you started saying yes to keep everyone happy, and when you did say no, you explained it until it almost turned back into a yes. That’s where the guilt lives: in every invitation you want to turn down and every “sorry, I can’t” you have to talk yourself into. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Someone being disappointed doesn’t mean you did anything wrong. It means you’re allowed to want something different.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Good Girl. You say yes so easily, yet nobody hears the no you swallowed first.',
      nextSteps: 'In a Block Release session, I find where letting people down started to feel like doing wrong and the emotions lodged in your nervous system, and release them, so you can say no once, mean it, and get on with your day.' },

    { name: 'The Strong One', statements: [2, 8, 20], flip: 14,
      summary: 'You’re the one who keeps going, even when you’re poorly. Asking for help makes you feel guilty, and sitting down has to be earned. You’d rather struggle than be a burden.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'needing something made you a burden. So you stopped asking. You kept going when you were poorly, and only let yourself sit down once everyone else was sorted. Even now, when someone offers to help, you feel like you owe them. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Needing help doesn’t make you a burden. Rest isn’t something you have to earn.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Strong One. You keep going no matter what, yet nobody sees how guilty you feel the moment you stop.',
      nextSteps: 'In a Block Release session, I find where needing help started to feel like being a burden and the emotions lodged in your nervous system, and release them, so you can sit down without having to earn it first.' },

    { name: 'The Loyal One', statements: [3, 9, 15], flip: 21,
      summary: 'Family comes first, always. Even the thought of moving away, or doing things your own way, feels like letting them down. Your guilt is about loyalty.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'doing things your own way meant turning your back on the people who raised you. So you stayed close, did things the way they’d always been done, and held on to people you’d outgrown. Whenever you picture a life that’s a little more yours, the guilt arrives first. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Living your own life isn’t betrayal. You can love where you came from and still choose where you’re going.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Loyal One. You stay close to the people you love, yet nobody sees how much of your own life you’ve put on hold to do it.',
      nextSteps: 'In a Block Release session, I find where loyalty started to mean staying put and the emotions lodged in your nervous system, and release them, so you can follow your own path without feeling you’ve left anyone behind.' },

    { name: 'The Caregiver', statements: [4, 10, 16], flip: 22,
      summary: 'When someone you love is struggling, you feel it’s down to you to sort it. You never feel you see them or ring them enough. And when a visit ends, the relief is followed straight away by guilt.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'if someone you loved was struggling, it was down to you to put it right. So you took it on. You check in, you ring round, and it still never feels like enough. Then when a visit ends and you feel relieved, the guilt hits for feeling relieved at all. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Their happiness was never yours to carry. You can love them and still need time that’s yours.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Caregiver. You carry everyone you love, yet nobody sees that, however much you give, it never feels like enough.',
      nextSteps: 'In a Block Release session, I find where other people’s struggles became your job and the emotions lodged in your nervous system, and release them, so you can go away for a few days without feeling you’ve let anyone down.' },

    { name: 'The Black Sheep', statements: [5, 11, 17], flip: 23,
      summary: 'When there’s an argument in the family, somehow it ends up being your fault. You say sorry for things that were never yours to say sorry for. You were made to feel like the difficult one, and you still feel it.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'you were the difficult one. So whenever there was tension, you took it on as yours. You started apologising first, often for things that were never your doing, just to make it stop. That’s the guilt that turns up every time someone’s in a bad mood. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. You were never the difficult one. You were the one who got handed the blame, and you can hand it back now.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Black Sheep. You say sorry first, yet nobody sees how often it was never yours to say.',
      nextSteps: 'In a Block Release session, I find where you were made to feel like the difficult one and the emotions lodged in your nervous system, and release them, so someone else’s bad mood stays theirs.' },

    { name: 'The Saboteur', statements: [6, 12, 18], flip: 24,
      summary: 'When something good comes your way, a little voice says you don’t deserve it. Spending on yourself feels selfish. So you spoil the good bits before you can really enjoy them.',
      // What to know, paragraphs 1 and 2 (paragraph 1 follows the opening in result.knowOpen)
      know: [
        'having good things meant someone else might go without. So you started holding back. Spending on yourself feels selfish, enjoying yourself comes with a little voice saying you don’t deserve it, and when things go well you find a way to spoil it. It’s been on repeat for {years}. That’s {howLong} for your nervous system to be working from a place of fear, guilt and survival.',
        'Your nervous system isn’t working from the truth. It just hasn’t been updated. Good things aren’t something you have to pay back. Enjoying your life takes nothing away from anyone else.'
      ],
      // Paragraph 3 when this is her second archetype
      alsoLine: 'You’ve also got a strong part of you that is The Saboteur. You hold yourself back from the good stuff, yet nobody sees how often you talk yourself out of it.',
      nextSteps: 'In a Block Release session, I find where good things started to feel undeserved and the emotions lodged in your nervous system, and release them, so you can say yes to the good things without paying for them in guilt.' }
  ],

  result: {
    eyebrow: 'Your result',
    mostly: 'You’re mostly <em>{main}</em>',
    streak: 'with a strong streak of {second}.',
    mix: 'You’re a mix of <em>{a}</em> and <em>{b}</em>.',
    stage: 'At this stage of life, most women play several roles. Here’s the one you lean on most.',

    knowEyebrow: '1. What to know',
    // How paragraph 1 opens. The "no where" version is used for "I don’t remember" and on a result link.
    knowOpen: 'Your guilt started {where}, when you learned that ',
    knowOpenNoWhere: 'Somewhere along the way, you learned that ',
    ending: 'You’ve been carrying this guilt since you were {ageThen}, and it was never yours to carry. It’s been weighing on your life and your nervous system ever since. But you don’t have to keep carrying it. Start with the 3 Minute Reset below, today.',
    // A result link holds only her six scores (no ages), so it uses this version
    endingLink: 'You’ve been carrying this guilt for far too long, and it was never yours to carry. It’s been weighing on your life and your nervous system ever since. But you don’t have to keep carrying it. Start with the 3 Minute Reset below, today.',
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
    resetText: 'Follow along with me to settle your nervous system when the guilt kicks in.',
    resetButton: 'Watch your 3 Minute Reset',

    nextEyebrow: '3. Next steps',
    bookButton: 'Book a session to release your guilt',

    share: 'Send this quiz to a friend',
    shareMessage: 'I’ve just done this and it was scarily accurate. Which role are you?',
    copied: 'Link copied',
    // The row under the share button
    shareVia: { whatsapp: 'WhatsApp', facebook: 'Facebook', email: 'Email', copy: 'Copy link' },
    shareSubject: 'The Guilt Quiz',

    again: 'Take the quiz again'
  },

  // Under the See my result button (the results page shows only the privacy note)
  about: [
    { title: 'Who is this quiz for?',
      text: 'This quiz is for any woman who wants to understand the role she’s been carrying, and why guilt keeps showing up. It’s designed for adults and isn’t a diagnosis.' },
    { title: 'Built from:',
      text: 'Nicky’s research into guilt and 700+ clearing sessions.' }
  ],
  privacy: 'This quiz is for information only and isn’t a diagnostic tool. Your answers stay on your own device. If you ask for your result by email, only your email and your result (your two main roles and your result link) are sent, to email you your result and your 3 Minute Reset, and my emails only if you tick the box, as explained in our <a href="/privacy-policy">Privacy Policy</a>. This page uses a Meta Pixel cookie to count visits, as explained in our <a href="/cookie-notice">Cookie Notice</a>, but it never sees your answers. If you’re struggling, please speak to your GP or a qualified professional.'
};
