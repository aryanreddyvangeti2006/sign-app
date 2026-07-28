// Sign language pose library.
// Each entry is a sequence of {shape, over, hold} steps compiled into full arm poses at runtime.
// `shape` refers to a hand shape name in the SHAPE dictionary inside sign-avatar.html.
// `over` overrides shoulder/elbow/wrist angles (degrees). `hold` is post-tween hold in ms.
// Multi-step entries describe motion (e.g. THANK YOU sweeps hand from chin outward).
//
// All poses are designed for chest-level signing oriented toward the viewer.
// wristRoll values keep palms facing the viewer.

export const LETTER_SHAPE = {
  A:'FIST', B:'FLAT', C:'C', D:'POINT', E:'E', F:'F', G:'POINT', H:'V',
  I:'I',    J:'I',    K:'V', L:'L',     M:'FIST',N:'FIST',O:'O',   P:'POINT',
  Q:'POINT',R:'R',    S:'FIST',T:'FIST', U:'V',  V:'V',  W:'W',   X:'HOOK',
  Y:'Y',    Z:'POINT'
};

export const LETTER_TWEAK = {
  G:{ pitch:65, roll:45, wristRoll:-15 },
  H:{ pitch:65, roll:45, wristRoll:-15 },
  P:{ pitch:75, wristPitch:40 },
  Q:{ pitch:65, wristPitch:50 },
  J:{ wristRoll:15 },
  Z:{ wristYaw:15 },
  X:{ wristRoll:0 }
};

// Numbers 0-9 – simplified ASL number handshapes reused from letter shapes.
export const NUMBER_SHAPE = {
  '0':'O', '1':'POINT', '2':'V', '3':'W', '4':'FLAT',
  '5':'OPEN', '6':'W', '7':'F', '8':'F', '9':'F'
};

const S = (shape, over={}, hold=340, shapeL=null, overL=null) => ({ shape, over, hold, shapeL, overL });
const S2 = (shape, overR={}, overL=null, hold=340) => ({
  shape,
  over: overR,
  hold,
  shapeL: shape,
  overL: overL || overR
});

// Common everyday words + short phrases.
// Keys are UPPERCASE; multi-word phrases use a single space.
// All poses oriented toward viewer at chest level.
export const WORDS = {
  // --- Existing words (re-tuned for viewer-facing orientation) ---
  HELLO: [
    S('FLAT', { pitch: 120, roll: 15, elbow: 50, wristRoll: -15, wristPitch: 10 }, 360),
    S('FLAT', { pitch: 110, roll: 30, elbow: 60, wristRoll: -10, wristPitch: 5 }, 360)
  ],
  HI: [
    S('OPEN', { pitch:85, roll:20, elbow:70, wristRoll:10 }, 300),
    S('OPEN', { pitch:85, roll:25, elbow:65, wristRoll:-5  }, 300)
  ],
  'THANK YOU': [
    S('FLAT', { pitch:80, roll:5, elbow:90, wristPitch:20, wristRoll:10 }, 320),
    S('FLAT', { pitch:70, roll:10, elbow:65, wristPitch:5, wristRoll:5 }, 420)
  ],
  PLEASE: [
    S('FLAT', { pitch:75, roll:5, elbow:90, wristPitch:15, wristRoll:10 }, 300),
    S('FLAT', { pitch:75, roll:5, elbow:85, wristPitch:15, wristRoll:15 }, 300),
    S('FLAT', { pitch:75, roll:5, elbow:90, wristPitch:15, wristRoll:5 }, 300)
  ],
  SORRY: [
    S('FIST', { pitch:75, roll:5, elbow:90, wristPitch:15, wristRoll:10 }, 300),
    S('FIST', { pitch:75, roll:5, elbow:85, wristPitch:10, wristRoll:15 }, 300),
    S('FIST', { pitch:75, roll:5, elbow:90, wristPitch:15, wristRoll:5 }, 300)
  ],
  YES: [
    S('FIST', { pitch:75, roll:10, elbow:85, wristPitch:-15, wristRoll:10 }, 240),
    S('FIST', { pitch:75, roll:10, elbow:85, wristPitch:15, wristRoll:10 }, 240)
  ],
  NO: [
    S('V',    { pitch:75, roll:15, elbow:85, wristRoll:10 }, 240),
    S('FIST', { pitch:75, roll:15, elbow:85, wristRoll:10 }, 240)
  ],
  HELP: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 320),
    S('FIST', { pitch:85, roll:10, elbow:70, wristPitch:5, wristRoll:10 }, 360)
  ],
  NAME: [
    S2('V', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, null, 260),
    S2('V', { pitch:80, roll:5, elbow:85, wristPitch:10, wristRoll:10 }, null, 260)
  ],
  GOOD: [
    S('FLAT', { pitch:85, roll:5, elbow:65, wristPitch:15, wristRoll:10 }, 300),
    S('FLAT', { pitch:75, roll:5, elbow:90, wristPitch:5, wristRoll:10 }, 380)
  ],
  BAD: [
    S('FLAT', { pitch:85, roll:5, elbow:65, wristPitch:15, wristRoll:10 }, 260),
    S('FLAT', { pitch:65, roll:10, elbow:75, wristPitch:-20, wristRoll:15 }, 360)
  ],
  LOVE: [
    S('FIST', { pitch:80, roll:15, elbow:90, wristPitch:10, wristRoll:10 }, 320),
    S('FIST', { pitch:80, roll:-5, elbow:90, wristPitch:10, wristRoll:10 }, 320)
  ],
  FAMILY: [
    S2('F', { pitch:80, roll:10, elbow:85, wristRoll:5 }, null, 300),
    S2('F', { pitch:80, roll:-10, elbow:85, wristRoll:10 }, null, 380)
  ],
  FRIEND: [
    S2('HOOK', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, null, 300),
    S2('HOOK', { pitch:80, roll:5, elbow:85, wristPitch:20, wristRoll:10 }, null, 300)
  ],
  WATER: [
    S('W', { pitch:80, roll:5, elbow:80, wristRoll:10 }, 260),
    S('W', { pitch:80, roll:10, elbow:80, wristRoll:15 }, 260),
    S('W', { pitch:80, roll:5, elbow:80, wristRoll:10 }, 260)
  ],
  FOOD: [
    S('O', { pitch:80, roll:5, elbow:75, wristPitch:10, wristRoll:10 }, 300),
    S('O', { pitch:85, roll:5, elbow:65, wristPitch:15, wristRoll:10 }, 300)
  ],
  MORE: [
    S2('O', { pitch:80, roll:15, elbow:85, wristRoll:10 }, null, 300),
    S2('O', { pitch:80, roll:-10, elbow:85, wristRoll:10 }, null, 300),
    S2('O', { pitch:80, roll:15, elbow:85, wristRoll:10 }, null, 300)
  ],
  STOP: [
    S('FLAT', { pitch:80, roll:5, elbow:80, wristRoll:-45, wristPitch:10 }, 400)
  ],
  GO: [
    S('POINT', { pitch:80, roll:15, elbow:85, wristRoll:10 }, 260),
    S('POINT', { pitch:90, roll:15, elbow:60, wristRoll:10 }, 320)
  ],
  WAIT: [
    S('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:15, wristRoll:10 }, 260),
    S('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 260),
    S('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:15, wristRoll:10 }, 260)
  ],
  UNDERSTAND: [
    S('FIST',  { pitch:90, roll:10, elbow:55, wristPitch:-5, wristRoll:10 }, 260),
    S('POINT', { pitch:90, roll:10, elbow:55, wristPitch:-5, wristRoll:10 }, 320)
  ],
  'HOW ARE YOU': [
    S('HOOK', { pitch:80, roll:5, elbow:90, wristRoll:-10, wristPitch:5 }, 300),
    S('OPEN', { pitch:80, roll:5, elbow:80, wristRoll:10, wristPitch:5 }, 320),
    S('POINT',{ pitch:85, roll:15, elbow:75, wristRoll:10 }, 340)
  ],
  'NICE TO MEET YOU': [
    S('FLAT', { pitch:80, roll:5, elbow:85, wristPitch:10, wristRoll:10 }, 280),
    S('FLAT', { pitch:80, roll:15, elbow:85, wristPitch:10, wristRoll:10 }, 280),
    S('POINT',{ pitch:85, roll:15, elbow:75, wristRoll:10 }, 320)
  ],
  'SEE YOU LATER': [
    S('V',    { pitch:90, roll:10, elbow:60, wristRoll:10 }, 300),
    S('OPEN', { pitch:85, roll:20, elbow:75, wristRoll:5 }, 260),
    S('OPEN', { pitch:85, roll:20, elbow:75, wristRoll:15 }, 260)
  ],
  WELCOME: [
    S2('FLAT', { pitch:80, roll:15, elbow:75, wristRoll:5, wristPitch:5 }, null, 400)
  ],
  ME: [
    S('POINT', { pitch:75, roll:-5, elbow:100, wristPitch:-10, wristRoll:10 }, 350)
  ],
  I: [
    S('POINT', { pitch:75, roll:-5, elbow:100, wristPitch:-10, wristRoll:10 }, 350)
  ],
  YOU: [
    S('POINT', { pitch:85, roll:10, elbow:75, wristPitch:5, wristRoll:10 }, 350)
  ],
  HAPPY: [
    S2('FLAT', { pitch:80, roll:5, elbow:85, wristPitch:15, wristRoll:10 }, null, 250),
    S2('FLAT', { pitch:85, roll:5, elbow:80, wristPitch:15, wristRoll:10 }, null, 250)
  ],
  SAD: [
    S2('OPEN', { pitch:90, roll:5, elbow:75, wristPitch:20, wristRoll:10 }, null, 300),
    S2('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:10, wristRoll:10 }, null, 350)
  ],
  LIKE: [
    S('OPEN', { pitch:80, roll:5, elbow:80, wristRoll:10 }, 250),
    S('FIST', { pitch:75, roll:10, elbow:85, wristRoll:10 }, 300)
  ],
  DISLIKE: [
    S('OPEN', { pitch:80, roll:5, elbow:80, wristRoll:10 }, 250),
    S('OPEN', { pitch:70, roll:20, elbow:70, wristRoll:-15, wristPitch:5 }, 350)
  ],
  WHAT: [
    S2('OPEN', { pitch:80, roll:15, elbow:85, wristRoll:5, wristPitch:5 }, null, 250),
    S2('OPEN', { pitch:80, roll:15, elbow:85, wristRoll:15, wristPitch:5 }, null, 250)
  ],

  // --- 50+ New casual keywords ---
  // Greetings & Politeness (5)
  MORNING: [
    S('FLAT', { pitch: 70, roll: 10, elbow: 90, wristPitch: -10, wristRoll: 20 }, 300),
    S('FLAT', { pitch: 100, roll: 15, elbow: 70, wristPitch: 10, wristRoll: 10 }, 350)
  ],
  NIGHT: [
    S('FLAT', { pitch: 90, roll: 10, elbow: 80, wristPitch: 15, wristRoll: 10 }, 300),
    S('FLAT', { pitch: 75, roll: 10, elbow: 90, wristPitch: 30, wristRoll: -20 }, 350)
  ],
  GOODBYE: [
    S('OPEN', { pitch: 115, roll: 25, elbow: 55, wristRoll: 10, wristPitch: 20 }, 300),
    S('OPEN', { pitch: 115, roll: 25, elbow: 55, wristRoll: 10, wristPitch: -10 }, 300),
    S('OPEN', { pitch: 115, roll: 25, elbow: 55, wristRoll: 10, wristPitch: 20 }, 300)
  ],
  EXCUSE: [
    S('FLAT', { pitch:75, roll:5, elbow:90, wristPitch:20, wristRoll:10 }, 250),
    S('FLAT', { pitch:75, roll:5, elbow:90, wristPitch:10, wristRoll:15 }, 350)
  ],
  BLESS: [
    S('OPEN', { pitch:85, roll:10, elbow:75, wristPitch:15, wristRoll:10 }, 300),
    S('OPEN', { pitch:90, roll:10, elbow:60, wristPitch:15, wristRoll:5 }, 350)
  ],

  // People & Relationships (8)
  MOTHER: [
    S('OPEN', { pitch: 110, roll: 5, elbow: 55, wristPitch: 10, wristRoll: 20 }, 300),
    S('OPEN', { pitch: 112, roll: 5, elbow: 50, wristPitch: 10, wristRoll: 20 }, 350)
  ],
  FATHER: [
    S('OPEN', { pitch: 130, roll: 5, elbow: 45, wristPitch: 15, wristRoll: 20 }, 300),
    S('OPEN', { pitch: 132, roll: 5, elbow: 40, wristPitch: 15, wristRoll: 20 }, 350)
  ],
  SISTER: [
    S('L', { pitch: 110, roll: 5, elbow: 55, wristPitch: 10 }, 300),
    S('L', { pitch: 80, roll: 10, elbow: 80, wristPitch: 10 }, 350)
  ],
  BROTHER: [
    S('L', { pitch: 130, roll: 5, elbow: 45, wristPitch: 10 }, 300),
    S('L', { pitch: 80, roll: 10, elbow: 80, wristPitch: 10 }, 350)
  ],
  BABY: [
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:5, elbow:80, wristPitch:-10, wristRoll:10 }, 350)
  ],
  CHILD: [
    S('FLAT', { pitch:80, roll:5, elbow:80, wristPitch:5, wristRoll:10 }, 300),
    S('FLAT', { pitch:75, roll:10, elbow:90, wristPitch:-10, wristRoll:10 }, 350)
  ],
  BOY: [
    S('FLAT', { pitch: 125, roll: 5, elbow: 50, wristPitch: 20, wristRoll: 10 }, 300),
    S('O', { pitch: 125, roll: 5, elbow: 50, wristPitch: 20, wristRoll: 10 }, 350)
  ],
  GIRL: [
    S('FIST', { pitch: 105, roll: 5, elbow: 60, wristPitch: 10, wristRoll: 20 }, 300),
    S('FIST', { pitch: 95, roll: 5, elbow: 70, wristPitch: 10, wristRoll: 20 }, 350)
  ],

  // Actions & Verbs (12)
  EAT: [
    S('O', { pitch: 105, roll: 5, elbow: 55, wristPitch: 20, wristRoll: 10 }, 250),
    S('O', { pitch: 110, roll: 5, elbow: 50, wristPitch: 25, wristRoll: 10 }, 300)
  ],
  DRINK: [
    S('C', { pitch: 100, roll: 5, elbow: 60, wristPitch: 10, wristRoll: 10 }, 250),
    S('C', { pitch: 105, roll: 5, elbow: 50, wristPitch: -20, wristRoll: 10 }, 300)
  ],
  SLEEP: [
    S('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 300),
    S('FLAT', { pitch:85, roll:5, elbow:65, wristPitch:-5, wristRoll:10 }, 350)
  ],
  WORK: [
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250)
  ],
  PLAY: [
    S('OPEN', { pitch:80, roll:20, elbow:80, wristRoll:15 }, 250),
    S('OPEN', { pitch:80, roll:-20, elbow:80, wristRoll:-15 }, 250)
  ],
  READ: [
    S('V', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('V', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, 300)
  ],
  WRITE: [
    S('POINT', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('POINT', { pitch:75, roll:5, elbow:90, wristPitch:-15, wristRoll:15 }, 350)
  ],
  TALK: [
    S('POINT', { pitch:85, roll:10, elbow:80, wristPitch:5, wristRoll:10 }, 250),
    S('POINT', { pitch:85, roll:-5, elbow:80, wristPitch:5, wristRoll:10 }, 250)
  ],
  LISTEN: [
    S('C', { pitch:85, roll:5, elbow:75, wristPitch:10, wristRoll:10 }, 350)
  ],
  LOOK: [
    S('V', { pitch:90, roll:5, elbow:75, wristPitch:5, wristRoll:10 }, 250),
    S('V', { pitch:85, roll:5, elbow:75, wristPitch:-5, wristRoll:10 }, 350)
  ],
  GIVE: [
    S('OPEN', { pitch:80, roll:15, elbow:80, wristPitch:5, wristRoll:10 }, 250),
    S('OPEN', { pitch:85, roll:20, elbow:65, wristPitch:15, wristRoll:5 }, 350)
  ],
  TAKE: [
    S('FIST', { pitch:80, roll:15, elbow:80, wristPitch:10, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, 350)
  ],

  // Feelings & States (9)
  ANGRY: [
    S('HOOK', { pitch:85, roll:10, elbow:80, wristPitch:-10, wristRoll:10 }, 300),
    S('HOOK', { pitch:80, roll:10, elbow:85, wristPitch:-5, wristRoll:10 }, 350)
  ],
  SCARED: [
    S('OPEN', { pitch:90, roll:15, elbow:70, wristPitch:20, wristRoll:5 }, 300),
    S('FIST', { pitch:85, roll:15, elbow:75, wristPitch:10, wristRoll:10 }, 350)
  ],
  TIRED: [
    S('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:75, roll:5, elbow:90, wristPitch:-10, wristRoll:10 }, 350)
  ],
  SICK: [
    S('FIST', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],
  HUNGRY: [
    S('C', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('C', { pitch:80, roll:5, elbow:75, wristPitch:-15, wristRoll:10 }, 350)
  ],
  THIRSTY: [
    S('POINT', { pitch:85, roll:5, elbow:75, wristPitch:10, wristRoll:10 }, 250),
    S('POINT', { pitch:80, roll:5, elbow:80, wristPitch:-15, wristRoll:10 }, 350)
  ],
  BORED: [
    S('POINT', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 300),
    S('POINT', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:5 }, 300)
  ],
  CONFUSED: [
    S('C', { pitch:85, roll:10, elbow:80, wristPitch:10, wristRoll:10 }, 250),
    S('C', { pitch:85, roll:-10, elbow:80, wristPitch:10, wristRoll:-5 }, 250)
  ],
  SURPRISED: [
    S('OPEN', { pitch:90, roll:10, elbow:70, wristPitch:20, wristRoll:10 }, 300),
    S('OPEN', { pitch:85, roll:15, elbow:70, wristPitch:5, wristRoll:10 }, 350)
  ],

  // Daily Life (16)
  HOME: [
    S('O', { pitch:80, roll:15, elbow:85, wristPitch:5, wristRoll:10 }, 300),
    S('O', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:10 }, 350)
  ],
  SCHOOL: [
    S('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 250),
    S('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:5, wristRoll:10 }, 250),
    S('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 250)
  ],
  COLLEGE: [
    S('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 300),
    S('C', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],
  CAR: [
    S2('FIST', { pitch:80, roll:5, elbow:80, wristPitch:5, wristRoll:10 }, null, 250),
    S2('FIST', { pitch:80, roll:5, elbow:85, wristPitch:-10, wristRoll:10 }, null, 350)
  ],
  HOUSE: [
    S('FLAT', { pitch:85, roll:10, elbow:75, wristPitch:15, wristRoll:5 }, 300),
    S('FLAT', { pitch:80, roll:-10, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],
  MONEY: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250)
  ],
  TIME: [
    S('POINT', { pitch:85, roll:5, elbow:80, wristPitch:5, wristRoll:10 }, 250),
    S('POINT', { pitch:85, roll:5, elbow:70, wristPitch:-10, wristRoll:10 }, 350)
  ],
  TODAY: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:10, wristRoll:10 }, 250),
    S('FLAT', { pitch:85, roll:10, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],
  TOMORROW: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:10, wristRoll:10 }, 250),
    S('FIST', { pitch:85, roll:15, elbow:70, wristPitch:15, wristRoll:10 }, 350)
  ],
  YESTERDAY: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:10, wristRoll:10 }, 250),
    S('FIST', { pitch:75, roll:-5, elbow:95, wristPitch:-5, wristRoll:10 }, 350)
  ],
  PHONE: [
    S('Y', { pitch:80, roll:5, elbow:85, wristPitch:10, wristRoll:10 }, 250),
    S('Y', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, 350)
  ],
  COMPUTER: [
    S('C', { pitch:80, roll:5, elbow:80, wristPitch:10, wristRoll:10 }, 300),
    S('C', { pitch:80, roll:5, elbow:80, wristPitch:-5, wristRoll:10 }, 350)
  ],
  MUSIC: [
    S('OPEN', { pitch:80, roll:15, elbow:80, wristRoll:10 }, 250),
    S('OPEN', { pitch:80, roll:-15, elbow:80, wristRoll:-10 }, 250)
  ],
  DANCE: [
    S('V', { pitch:80, roll:15, elbow:80, wristPitch:5, wristRoll:10 }, 250),
    S('V', { pitch:80, roll:-15, elbow:80, wristPitch:5, wristRoll:-10 }, 250)
  ],
  TRAVEL: [
    S('V', { pitch:85, roll:10, elbow:75, wristPitch:5, wristRoll:10 }, 250),
    S('V', { pitch:85, roll:-10, elbow:75, wristPitch:5, wristRoll:-10 }, 250)
  ],
  PARTY: [
    S('OPEN', { pitch:85, roll:20, elbow:70, wristRoll:15 }, 250),
    S('OPEN', { pitch:85, roll:-20, elbow:70, wristRoll:-15 }, 250),
    S('OPEN', { pitch:85, roll:20, elbow:70, wristRoll:15 }, 250)
  ],

  // Places & Nature (8)
  HOSPITAL: [
    S('V', { pitch:80, roll:5, elbow:85, wristPitch:10, wristRoll:10 }, 300),
    S('V', { pitch:80, roll:5, elbow:85, wristPitch:-5, wristRoll:10 }, 350)
  ],
  STORE: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:10 }, 250)
  ],
  PARK: [
    S('OPEN', { pitch:85, roll:15, elbow:75, wristRoll:10 }, 300),
    S('OPEN', { pitch:85, roll:-15, elbow:75, wristRoll:-10 }, 350)
  ],
  BEACH: [
    S('FLAT', { pitch:80, roll:10, elbow:80, wristPitch:5, wristRoll:10 }, 250),
    S('FLAT', { pitch:80, roll:-10, elbow:80, wristPitch:5, wristRoll:-10 }, 350)
  ],
  SUN: [
    S('C', { pitch:90, roll:10, elbow:65, wristPitch:15, wristRoll:10 }, 300),
    S('OPEN', { pitch:90, roll:10, elbow:65, wristPitch:15, wristRoll:10 }, 350)
  ],
  RAIN: [
    S2('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, null, 250),
    S2('OPEN', { pitch:80, roll:5, elbow:80, wristPitch:-10, wristRoll:10 }, null, 250),
    S2('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, null, 250)
  ],
  SNOW: [
    S2('OPEN', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, null, 250),
    S2('OPEN', { pitch:80, roll:5, elbow:80, wristPitch:-10, wristRoll:10 }, null, 250),
    S2('OPEN', { pitch:80, roll:5, elbow:80, wristPitch:-10, wristRoll:10 }, null, 250)
  ],
  CLOUD: [
    S('C', { pitch:85, roll:5, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],

  // Misc (5)
  PROBLEM: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FIST', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:10 }, 250)
  ],
  SOLUTION: [
    S('FIST', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('OPEN', { pitch:85, roll:15, elbow:75, wristPitch:15, wristRoll:10 }, 350)
  ],
  IMPORTANT: [
    S('FIST', { pitch:85, roll:10, elbow:75, wristPitch:15, wristRoll:10 }, 300),
    S('FIST', { pitch:85, roll:10, elbow:75, wristPitch:-5, wristRoll:10 }, 350)
  ],
  DIFFICULT: [
    S('V', { pitch:80, roll:10, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('V', { pitch:80, roll:-10, elbow:85, wristPitch:5, wristRoll:10 }, 250)
  ],
  EASY: [
    S('OPEN', { pitch:80, roll:5, elbow:85, wristPitch:5, wristRoll:10 }, 250),
    S('FLAT', { pitch:80, roll:5, elbow:80, wristPitch:-5, wristRoll:10 }, 350)
  ]
};