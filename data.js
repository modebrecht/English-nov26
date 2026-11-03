/* Classroom content from the five supplied English worksheet photos (pages 41–45).
   Entries are intentionally kept separate from rendering logic for easy editing. */
window.CLASSROOM_DATA = [
  {
    id: 1, page: 41, type: 'wordsearch', section: 'Jewellery',
    title: 'Find five words',
    instruction: 'Find five words in the wordsearch box. The remaining letters spell a word you can use to describe them.',
    grid: ['JEBROOCHW','NECKLACEE','LEARRINGS','LERWATCHY','BRACELET!'],
    words: [
      {word:'BROOCH', r:0,c:2,dr:0,dc:1},
      {word:'NECKLACE',r:1,c:0,dr:0,dc:1},
      {word:'EARRINGS',r:2,c:1,dr:0,dc:1},
      {word:'WATCH',r:3,c:3,dr:0,dc:1},
      {word:'BRACELET',r:4,c:0,dr:0,dc:1}
    ],
    secret: {label:'They are …',text:'JEWELLERY!', note:'Schmuck'},
    illustration:'p41-treasure'
  },
  {
    id: 2, page: 41, type: 'sentences', section: 'Accessories',
    title: 'What are they taking with them?',
    instruction: 'Complete the sentences. Look at the pictures.',
    example:{text:'He is taking his wallet.',image:'p41-wallet'},
    rows:[
      {prompt:'He is taking his …',answer:'He is taking his hat.',image:'p41-hat'},
      {prompt:'He is taking his …',answer:'He is taking his glasses.',image:'p41-glasses'},
      {prompt:'He is taking his …',answer:'He is taking his umbrella.',image:'p41-umbrella'},
      {prompt:'She is taking her …',answer:'She is taking her handbag.',image:'p41-handbag'}
    ]
  },
  {
    id: 3, page: 42, type: 'sentences', section: 'Grammar',
    title: 'Look and complete',
    instruction: 'Use the pictures and complete the sentences.',
    grammar: true,
    rows:[
      {prompt:'He is giving her …',answer:'He is giving her earrings.',image:'p42-earrings'},
      {prompt:'Now, he is giving her a …',answer:'Now, he is giving her a necklace.',image:'p42-necklace'},
      {prompt:'And, he is giving her a …',answer:'And, he is giving her a bracelet.',image:'p42-bracelet'},
      {prompt:'Look, she’s giving him her …',answer:'Look, she’s giving him her wallet.',image:'p42-wallet'}
    ]
  },
  {
    id: 4, page: 43, type: 'crossword', section: 'Vocabulary',
    title: 'Do the crossword',
    instruction: 'Read the clues and fill in the crossword.',
    clues:[
      {number:1,clue:'I’ve got it around my wrist.',word:'BRACELET',x:4,y:0,dx:0,dy:1},
      {number:2,clue:'I’ve got it when it is raining.',word:'UMBRELLA',x:1,y:1,dx:1,dy:0},
      {number:3,clue:'I’ve got it on my finger.',word:'RING',x:0,y:3,dx:0,dy:1},
      {number:4,clue:'I’ve got it around my neck when it’s cold.',word:'SCARF',x:3,y:3,dx:1,dy:0},
      {number:5,clue:'I’ve got it around my neck.',word:'NECKLACE',x:0,y:5,dx:1,dy:0},
      {number:6,clue:'I’ve got it on my head.',word:'HAT',x:2,y:7,dx:1,dy:0}
    ]
  },
  {
    id: 5, page: 43, type: 'sentences', section: 'Have you got …?',
    title: 'Look and complete',
    instruction: 'Complete each question and answer. Use it for singular nouns and them for plural nouns.',
    rows:[
      {prompt:'Have you got your …?  Yes, …',answer:'Have you got your umbrella? Yes, I’ve got it.',image:'p43-umbrella'},
      {prompt:'Have you got your …?  No, …',answer:'Have you got your earrings? No, I haven’t got them.',image:'p43-earrings'},
      {prompt:'Have you got your …?  No, …',answer:'Have you got your handbag? No, I haven’t got it.',image:'p43-handbag'},
      {prompt:'Have you got your …?  Yes, …',answer:'Have you got your braces? Yes, I’ve got them.',image:'p43-braces'},
      {prompt:'Have you got your …?  Yes, …',answer:'Have you got your gloves? Yes, I’ve got them.',image:'p43-gloves'},
      {prompt:'Have you got your …?  No, …',answer:'Have you got your necklace? No, I haven’t got it.',image:'p43-necklace'}
    ]
  },
  {
    id: 6, page: 44, type: 'wordsearch', section: 'Jewellery',
    title: 'Find six items of jewellery',
    instruction: 'Find six items of jewellery in the wordsearch box. The remaining letters spell the name of a famous jeweller’s.',
    grid:['EARRINGSW','NECKLACEA','TBRACELET','IFRINGFAC','NYSBROOCH'],
    words:[
      {word:'EARRINGS',r:0,c:0,dr:0,dc:1},
      {word:'NECKLACE',r:1,c:0,dr:0,dc:1},
      {word:'BRACELET',r:2,c:1,dr:0,dc:1},
      {word:'RING',r:3,c:2,dr:0,dc:1},
      {word:'BROOCH',r:4,c:3,dr:0,dc:1},
      {word:'WATCH',r:0,c:8,dr:1,dc:0}
    ],
    secret:{label:'Famous jeweller',text:'TIFFANY’S',note:'Tiffany’s'}
  },
  {
    id: 7, page: 44, type:'crossword',section:'Film & story',
    title:'Do the crossword',
    instruction:'Look at the pictures. Use the letters in the grey boxes to complete the name of a famous film and short story.',
    clues:[
      {number:1,clue:'',image:'p44-scarf',word:'SCARF',x:13,y:0,dx:0,dy:1},
      {number:2,clue:'',image:'p44-bracelet',word:'BRACELET',x:8,y:2,dx:0,dy:1},
      {number:3,clue:'',image:'p44-umbrella',word:'UMBRELLA',x:6,y:2,dx:1,dy:0},
      {number:4,clue:'',image:'p44-shawl',word:'SHAWL',x:1,y:4,dx:0,dy:1},
      {number:5,clue:'',image:'p44-handkerchief',word:'HANDKERCHIEF',x:1,y:5,dx:1,dy:0},
      {number:6,clue:'',image:'p44-belt',word:'BELT',x:4,y:7,dx:0,dy:1},
      {number:7,clue:'',image:'p44-gloves',word:'GLOVES',x:0,y:8,dx:1,dy:0}
    ],
    grey:[
      {label:1,x:8,y:2,char:'B'},
      {label:2,x:13,y:3,char:'R'},
      {label:3,x:4,y:8,char:'E'},
      {label:4,x:1,y:6,char:'A'},
      {label:5,x:5,y:5,char:'K'},
      {label:6,x:12,y:5,char:'F'},
      {label:7,x:8,y:4,char:'A'},
      {label:8,x:13,y:0,char:'S'},
      {label:9,x:4,y:10,char:'T'}
    ],
    secret:{label:'______ at TIFFANY’S',text:'BREAKFAST',note:'Breakfast at Tiffany’s'}
  },
  {
    id: 8,page:45,type:'scramble',section:'Definitions',
    title:'Unscramble and match',
    instruction:'Unscramble the words and match them with the definitions.',
    scrambled:[{letter:'a',scramble:'LEBT',answer:'BELT'},
      {letter:'b',scramble:'HACTW',answer:'WATCH'},
      {letter:'c',scramble:'LAWTLE',answer:'WALLET'},
      {letter:'d',scramble:'CHEKFRIENDAH',answer:'HANDKERCHIEF'}],
    rows:[
      {prompt:'You use it to tell the time.',answer:'b · WATCH'},
      {prompt:'You use it to hold up your trousers.',answer:'a · BELT'},
      {prompt:'You use it to blow your nose.',answer:'d · HANDKERCHIEF'},
      {prompt:'You use it to hold your money.',answer:'c · WALLET'}
    ]
  },
  {
    id:9,page:45,type:'wordsearch',section:'Review',
    title:'Find fifteen words',
    instruction:'Find fifteen words from this unit in the wordsearch box. The remaining letters spell out a question. Answer it.',
    grid:[
      'HANDKERCHIEF','AHBRACELETBE','TUMBRELLARRA',
      'WSCARFAVEIOR','AHBELTYOUNOR','LABRACESGGCI',
      'LWATCHOTGLHN','ELASGLOVESSG','TENECKLACESS'
    ],
    words:[
      {word:'HANDKERCHIEF',r:0,c:0,dr:0,dc:1},
      {word:'BRACELET',r:1,c:2,dr:0,dc:1},
      {word:'UMBRELLA',r:2,c:1,dr:0,dc:1},
      {word:'SCARF',r:3,c:1,dr:0,dc:1},
      {word:'BELT',r:4,c:2,dr:0,dc:1},
      {word:'BRACES',r:5,c:2,dr:0,dc:1},
      {word:'WATCH',r:6,c:1,dr:0,dc:1},
      {word:'GLOVES',r:7,c:4,dr:0,dc:1},
      {word:'NECKLACE',r:8,c:2,dr:0,dc:1},
      {word:'HAT',r:0,c:0,dr:1,dc:0},
      {word:'SHAWL',r:3,c:1,dr:1,dc:0},
      {word:'WALLET',r:3,c:0,dr:1,dc:0},
      {word:'BROOCH',r:1,c:10,dr:1,dc:0},
      {word:'EARRINGS',r:1,c:11,dr:1,dc:0},
      {word:'RING',r:2,c:9,dr:1,dc:0}
    ],
    secret:{label:'Hidden question',text:'HAVE YOU GOT GLASSES?',note:'Hast du eine Brille?'},
    answer:'Yes, I have. / No, I haven’t.'
  }
];
