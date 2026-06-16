// DriveAruba Learn — curriculum content.
//
// NOTE: This is study content written to be conceptually correct for general
// driving theory. Exact Aruba-specific legal figures (speed limits, blood-
// alcohol limits, fees) must be verified against the official Aruba driving
// manual before public launch — questions here are deliberately framed around
// universal principles or reading the sign in front of you.
//
// Question shape:
//   { id, type: 'mc' | 'tf' | 'sign', prompt, sign?, signValue?, options[], answer, explain }
//   - 'tf' questions use options ['True', 'False'].
//   - 'sign' questions render a traffic sign (see components/app/Sign.jsx).

export const UNITS = [
  {
    id: 'signs',
    title: 'Traffic Signs',
    blurb: 'Read the road at a glance',
    color: '#0e8bd6',
    icon: '🚸',
    lessons: [
      {
        id: 'signs-1',
        title: 'Warning & priority signs',
        questions: [
          {
            id: 'q-stop',
            type: 'sign',
            sign: 'stop',
            prompt: 'What must you do at this sign?',
            options: ['Slow down only', 'Come to a full stop, then give way', 'Sound your horn', 'Speed up to merge'],
            answer: 1,
            explain: 'A red octagonal STOP sign means you must come to a complete stop and give way before proceeding.',
          },
          {
            id: 'q-giveway',
            type: 'sign',
            sign: 'giveWay',
            prompt: 'What does this sign mean?',
            options: ['Give way to other traffic', 'No entry', 'Stop completely', 'Priority road ahead'],
            answer: 0,
            explain: 'An inverted red triangle means "give way": let other traffic pass before you go. You need not stop if the way is clear.',
          },
          {
            id: 'q-priority',
            type: 'sign',
            sign: 'priority',
            prompt: 'This yellow diamond tells you that…',
            options: ['You must give way', 'You are on a priority road', 'Parking is allowed', 'The road ends ahead'],
            answer: 1,
            explain: 'The yellow diamond marks a priority road — traffic on side roads must give way to you.',
          },
          {
            id: 'q-warning-shape',
            type: 'mc',
            prompt: 'What shape and colour are most warning signs?',
            options: ['Red circle', 'Blue square', 'Triangle with a red border', 'Green rectangle'],
            answer: 2,
            explain: 'Warning signs are triangular with a red border. They alert you to hazards ahead.',
          },
          {
            id: 'q-children',
            type: 'sign',
            sign: 'children',
            prompt: 'You see this warning sign. You should…',
            options: ['Speed up past the area', 'Expect children and be ready to stop', 'Ignore it on a main road', 'Park to let children cross'],
            answer: 1,
            explain: 'This warns of children nearby (e.g. near a school). Slow down and be ready to stop.',
          },
        ],
      },
      {
        id: 'signs-2',
        title: 'Prohibition signs',
        questions: [
          {
            id: 'q-noentry',
            type: 'sign',
            sign: 'noEntry',
            prompt: 'What does this sign mean?',
            options: ['One-way street', 'No entry for vehicles', 'No parking', 'End of restriction'],
            answer: 1,
            explain: 'A red circle with a white horizontal bar means no entry — vehicles may not pass this point.',
          },
          {
            id: 'q-noparking',
            type: 'sign',
            sign: 'noParking',
            prompt: 'Where this sign is posted, you may not…',
            options: ['Drive faster than 30', 'Park your vehicle', 'Stop to drop someone off briefly', 'Turn left'],
            answer: 1,
            explain: 'The blue circle with a single red slash means no parking. Brief stopping may still be allowed unless a "no stopping" sign is shown.',
          },
          {
            id: 'q-noovertaking',
            type: 'sign',
            sign: 'noOvertaking',
            prompt: 'This sign means…',
            options: ['No overtaking', 'Two-way traffic', 'Overtaking allowed', 'Narrow road'],
            answer: 0,
            explain: 'Two cars in a red circle means overtaking is prohibited until the restriction ends.',
          },
          {
            id: 'q-prohibition-colour',
            type: 'mc',
            prompt: 'Most prohibition (no-go) signs are…',
            options: ['Blue squares', 'Round with a red border', 'Yellow diamonds', 'Green circles'],
            answer: 1,
            explain: 'Prohibition signs are round with a red border — they tell you what you must NOT do.',
          },
          {
            id: 'q-speedsign',
            type: 'sign',
            sign: 'speed',
            signValue: 60,
            prompt: 'What does this sign tell you?',
            options: ['Minimum speed 60', 'Maximum speed 60 km/h', 'Distance 60 km', 'Recommended speed 60'],
            answer: 1,
            explain: 'A number in a red circle is the maximum speed limit — here, 60 km/h. It is a limit, not a target.',
          },
        ],
      },
    ],
  },
  {
    id: 'row',
    title: 'Right of Way',
    blurb: 'Who goes first',
    color: '#2fbf71',
    icon: '🔀',
    lessons: [
      {
        id: 'row-1',
        title: 'Intersections',
        questions: [
          {
            id: 'q-uncontrolled',
            type: 'mc',
            prompt: 'At an unmarked, equal crossroads, who has priority?',
            options: ['Whoever is fastest', 'Traffic coming from your right', 'Traffic coming from your left', 'The larger vehicle'],
            answer: 1,
            explain: 'With no signs or signals, give way to traffic approaching from your right.',
          },
          {
            id: 'q-turning-left',
            type: 'mc',
            prompt: 'You are turning across oncoming traffic. You should…',
            options: ['Turn quickly before they arrive', 'Give way to oncoming traffic going straight', 'Expect them to stop for you', 'Sound your horn and go'],
            answer: 1,
            explain: 'Traffic going straight ahead has priority over a vehicle turning across its path.',
          },
          {
            id: 'q-emergency',
            type: 'mc',
            prompt: 'An ambulance approaches with lights and siren. You should…',
            options: ['Stop immediately where you are', 'Speed up to clear the area', 'Pull over safely and let it pass', 'Follow closely behind it'],
            answer: 2,
            explain: 'Make way for emergency vehicles: pull over safely when you can and let them pass.',
          },
          {
            id: 'q-pedestrian-cross',
            type: 'sign',
            sign: 'pedestrian',
            prompt: 'Approaching a pedestrian crossing, you must…',
            options: ['Give way to pedestrians on the crossing', 'Always stop even if empty', 'Overtake other waiting cars', 'Sound your horn'],
            answer: 0,
            explain: 'Give way to pedestrians who are on, or stepping onto, a marked crossing.',
          },
          {
            id: 'q-green-light',
            type: 'tf',
            prompt: 'A green traffic light means you may go only if the way is clear.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. Green means go, but only when it is safe and the junction is clear.',
          },
        ],
      },
      {
        id: 'row-2',
        title: 'Roundabouts & priority',
        questions: [
          {
            id: 'q-roundabout-sign',
            type: 'sign',
            sign: 'roundabout',
            prompt: 'This sign warns you of…',
            options: ['A roundabout ahead', 'A U-turn area', 'A spiral ramp', 'A no-entry zone'],
            answer: 0,
            explain: 'Three arrows in a circle warn of a roundabout ahead.',
          },
          {
            id: 'q-roundabout-yield',
            type: 'mc',
            prompt: 'At most roundabouts, you give way to…',
            options: ['Traffic waiting to enter', 'Traffic already on the roundabout', 'Nobody — just merge', 'Traffic on your left'],
            answer: 1,
            explain: 'Give way to traffic already circulating on the roundabout (usually coming from your left) before you enter.',
          },
          {
            id: 'q-roundabout-signal',
            type: 'tf',
            prompt: 'You should signal left as you approach your exit on a roundabout.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. Signal left just before the exit you intend to take so others can predict your move.',
          },
          {
            id: 'q-priority-end',
            type: 'mc',
            prompt: 'Your priority road ends ahead. This means…',
            options: ['You keep priority anyway', 'You may now have to give way', 'Parking is allowed', 'Speed limit increases'],
            answer: 1,
            explain: 'When a priority road ends, normal give-way rules apply again — be ready to yield.',
          },
          {
            id: 'q-tram-bus',
            type: 'mc',
            prompt: 'A bus signals to pull out from a stop. You should…',
            options: ['Speed up to pass first', 'Where safe, let the bus pull out', 'Block it from moving', 'Overtake on the inside'],
            answer: 1,
            explain: 'Where it is safe, give way and let a signalling bus rejoin the traffic.',
          },
        ],
      },
    ],
  },
  {
    id: 'road',
    title: 'Speed & The Road',
    blurb: 'Control and conditions',
    color: '#f5a623',
    icon: '🛣️',
    lessons: [
      {
        id: 'road-1',
        title: 'Speed & stopping',
        questions: [
          {
            id: 'q-speed-limit-meaning',
            type: 'mc',
            prompt: 'A speed-limit sign shows…',
            options: ['The speed you must drive', 'The maximum allowed in good conditions', 'A suggestion you can ignore', 'The minimum speed'],
            answer: 1,
            explain: 'It is the maximum permitted in good conditions — drive slower when conditions require it.',
          },
          {
            id: 'q-builtup',
            type: 'mc',
            prompt: 'In built-up (residential) areas you should generally…',
            options: ['Drive faster to clear them', 'Drive slower than on open roads', 'Use full headlights', 'Ignore pedestrians'],
            answer: 1,
            explain: 'Built-up areas have lower limits and more pedestrians — keep your speed down.',
          },
          {
            id: 'q-stopping-distance',
            type: 'tf',
            prompt: 'The faster you drive, the longer your stopping distance.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. Higher speed means a longer braking distance — and reaction distance grows too.',
          },
          {
            id: 'q-wet-road',
            type: 'mc',
            prompt: 'On a wet road, your stopping distance…',
            options: ['Stays the same', 'Gets shorter', 'Gets longer', 'Disappears'],
            answer: 2,
            explain: 'Wet roads reduce grip, so it takes longer to stop. Slow down and leave more space.',
          },
          {
            id: 'q-following',
            type: 'mc',
            prompt: 'A safe following distance in good conditions is at least…',
            options: ['No gap needed', 'Two seconds behind', 'One car length at any speed', 'Touching the car ahead'],
            answer: 1,
            explain: 'Keep at least a two-second gap to the vehicle ahead — more in poor conditions.',
          },
        ],
      },
      {
        id: 'road-2',
        title: 'Road markings & lanes',
        questions: [
          {
            id: 'q-solid-line',
            type: 'mc',
            prompt: 'A solid centre line means…',
            options: ['Overtaking is encouraged', 'Do not cross to overtake', 'Two-way cycling lane', 'Parking lane'],
            answer: 1,
            explain: 'A solid line means you should not cross it to overtake — it marks where overtaking is unsafe.',
          },
          {
            id: 'q-broken-line',
            type: 'tf',
            prompt: 'A broken centre line allows overtaking when it is safe.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. You may cross a broken line to overtake, but only when the road ahead is clear and safe.',
          },
          {
            id: 'q-oneway',
            type: 'sign',
            sign: 'oneway',
            prompt: 'This blue sign indicates…',
            options: ['Detour', 'A one-way street in the arrow direction', 'Dead end', 'Bus lane'],
            answer: 1,
            explain: 'A blue rectangle with a white arrow marks a one-way street — travel only in the arrow direction.',
          },
          {
            id: 'q-lane-change',
            type: 'mc',
            prompt: 'Before changing lanes you should…',
            options: ['Just move over quickly', 'Mirror, signal, check blind spot, then move', 'Signal only after moving', 'Close your eyes and hope'],
            answer: 1,
            explain: 'Mirrors, signal, and a blind-spot check — then move when it is clear. Communicate early.',
          },
          {
            id: 'q-yellow-kerb',
            type: 'mc',
            prompt: 'Continuous markings restricting stopping usually mean…',
            options: ['Free parking', 'Stopping or parking is restricted there', 'Loading zone for anyone', 'Taxi rank'],
            answer: 1,
            explain: 'Such markings restrict stopping/parking — check the local sign for the exact rule.',
          },
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Law',
    blurb: 'Drive legal, drive safe',
    color: '#ff5b49',
    icon: '🛡️',
    lessons: [
      {
        id: 'safety-1',
        title: 'Alcohol & seatbelts',
        questions: [
          {
            id: 'q-alcohol',
            type: 'mc',
            prompt: 'How does alcohol affect your driving?',
            options: ['Improves reactions', 'Slows reactions and judgement', 'Has no effect', 'Helps you focus'],
            answer: 1,
            explain: 'Alcohol slows reaction time and impairs judgement. The safest amount before driving is none.',
          },
          {
            id: 'q-dui',
            type: 'tf',
            prompt: 'Driving under the influence of alcohol or drugs is prohibited.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. It is illegal and dangerous. Plan another way home if you have been drinking.',
          },
          {
            id: 'q-seatbelt',
            type: 'tf',
            prompt: 'Wearing a seatbelt is required for the driver and passengers.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. Seatbelts greatly reduce injury — buckle up before moving off.',
          },
          {
            id: 'q-phone',
            type: 'mc',
            prompt: 'Using a hand-held phone while driving…',
            options: ['Is fine in slow traffic', 'Is a dangerous distraction to avoid', 'Improves your awareness', 'Is only risky at night'],
            answer: 1,
            explain: 'Hand-held phone use is a serious distraction. Pull over safely if you must take a call.',
          },
          {
            id: 'q-tired',
            type: 'mc',
            prompt: 'If you feel sleepy while driving, you should…',
            options: ['Drive faster to arrive sooner', 'Open the window and continue', 'Stop somewhere safe and rest', 'Turn the music up only'],
            answer: 2,
            explain: 'Fatigue is as dangerous as alcohol. Stop somewhere safe and rest before continuing.',
          },
        ],
      },
      {
        id: 'safety-2',
        title: 'Documents & licensing',
        questions: [
          {
            id: 'q-docs',
            type: 'mc',
            prompt: 'When driving you should normally carry…',
            options: ['Only cash', 'Your licence and vehicle documents', 'Nothing at all', 'Just your phone'],
            answer: 1,
            explain: 'Carry your driving licence and required vehicle documents (registration, insurance) when driving.',
          },
          {
            id: 'q-insurance',
            type: 'tf',
            prompt: 'A motor vehicle on the road must be insured.',
            options: ['True', 'False'],
            answer: 0,
            explain: 'True. Valid insurance is required to drive on public roads.',
          },
          {
            id: 'q-theory-first',
            type: 'mc',
            prompt: 'To get a driving licence you typically must first…',
            options: ['Buy a car', 'Pass the theory exam', 'Reach age 30', 'Own a garage'],
            answer: 1,
            explain: 'The theory exam usually comes before the practical test on the path to a licence.',
          },
          {
            id: 'q-roadworthy',
            type: 'mc',
            prompt: 'Before a long drive you should check…',
            options: ['Tyres, lights and brakes', 'Only the radio', 'Nothing — just go', 'The colour of the car'],
            answer: 0,
            explain: 'Basic checks — tyres, lights, brakes, fluids — keep your vehicle roadworthy and safe.',
          },
          {
            id: 'q-accident',
            type: 'mc',
            prompt: 'After a minor collision you should…',
            options: ['Drive off quickly', 'Stop, make the scene safe, and exchange details', 'Argue and leave', 'Hide the damage'],
            answer: 1,
            explain: 'Stop, make the area safe, check for injuries, and exchange details. Report it if required.',
          },
        ],
      },
    ],
  },
];

// Flattened, ordered list of lessons across all units — used for unlocking and
// for lookups by id.
export const LESSONS = UNITS.flatMap((unit) =>
  unit.lessons.map((lesson) => ({
    ...lesson,
    unitId: unit.id,
    unitTitle: unit.title,
    color: unit.color,
    icon: unit.icon,
  }))
);

export const TOTAL_LESSONS = LESSONS.length;

export function getLesson(id) {
  return LESSONS.find((l) => l.id === id) || null;
}

// Build a mixed mock-exam from random questions across every lesson.
export function buildExam(count = 10) {
  const pool = LESSONS.flatMap((l) => l.questions);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
