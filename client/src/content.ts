// Sea Glass Editorial — editable content/config for Aishwarya's keepsake.
// Replace the photo URLs below with the three uploaded images when available.
export const birthdayConfig = {
  name: "Aishwarya Arkalsali",
  nickname: "Aishu",
  birthDate: "2007-06-08",
  birthdayDate: "2027-06-08T00:00:00+05:30",
  timezoneLabel: "Asia/Kolkata",
  previewParam: "preview",
  photos: [
    {
      src: "/manus-storage/birthdaybash_10810fdc.png",
      alt: "Aishwarya in a blue saree",
      caption: "One of those moments worth keeping.",
      label: "01 / blue hour"
    },
    {
      src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85",
      alt: "A pale blue fabric detail in natural light",
      caption: "Another version of you I get to remember.",
      label: "02 / blue hour"
    },
    {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      alt: "A portrait in deep blue tones",
      caption: "Just you being you.",
      label: "03 / in focus"
    }
  ],
  letter: [
    "Aishwarya,",
    "I don't think every important person in our lives arrives with a big announcement.",
    "Sometimes they just slowly become part of our everyday life.",
    "And somewhere along the way, you became more than just a friend to me.",
    "You're family in your own way.",
    "Someone I can laugh with, annoy, argue with, make fun of, and still somehow want around.",
    "So on your 20th birthday, I just want you to know this:",
    "I'm genuinely grateful that you're a part of my life.",
    "I hope this year brings you more reasons to smile, more things to be proud of, and more moments that you'll look back on and think,",
    "'Yeah... life was good.'",
    "Keep being exactly who you are.",
    "And please don't become too mature just because you're 20.",
    "Happy Birthday, Aishwarya.",
    "Always keep smiling.",
    "— Your annoying-but-lucky friend"
  ],
  wishes: [
    "More reasons to smile.", "More adventures.", "More confidence.", "More unforgettable moments.",
    "More people who genuinely value you.", "More courage to choose yourself.", "More peaceful mornings.",
    "More spontaneous plans.", "More laughter.", "More dreams becoming real.", "More doors opening at the right time.",
    "More rest without guilt.", "More tiny wins.", "More days that feel like yours.", "More honest conversations.",
    "More courage to begin again.", "More beautiful surprises.", "More pride in how far you've come.",
    "More softness for yourself.", "More of everything that makes you feel alive."
  ],
  questions: [
    { prompt: "Who is more likely to create unnecessary drama?", options: ["ME", "YOU"] },
    { prompt: "Who is obviously the better sibling?", options: ["ME", "YOU"] },
    { prompt: "Who deserves unlimited snacks today?", options: ["YOU", "Obviously YOU"] },
    { prompt: "Who is allowed to be 20 and still a little chaotic?", options: ["ME", "YOU"] },
    { prompt: "Who is getting the last word here?", options: ["ME", "You can have it"] }
  ]
} as const;
