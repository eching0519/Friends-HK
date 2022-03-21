// Would You Rather Question

const questions = [
    {
      "question": "Would you rather be in jail for five years or be in a coma for a decade?",
      "a": "be in jail for five years",
      "b": "be in a coma for a decade"
    },
    {
      "question": "Would you rather give up air conditioning and heating for the rest of your life or give up the Internet for the rest of your life?",
      "a": "give up air conditioning and heating for the rest of your life",
      "b": "give up the Internet for the rest of your life"
    },
    {
      "question": "Would you rather never be able to go out during the day or never be able to go out at night?",
      "a": "never be able to go out during the day",
      "b": "never be able to go out at night"
    },
    {
      "question": "Would you rather always have B.O. and not know it or always smell B.O. on everyone else?",
      "a": "always have B.O. and not know it",
      "b": "always smell B.O. on everyone else"
    },
    {
      "question": "Would you rather always be 10 minutes late or always be 20 minutes early?",
      "a": "always be 10 minutes late",
      "b": "always be 20 minutes early"
    },
    {
      "question": "Would you rather lose all your teeth or lose a day of your life every time you kissed someone?",
      "a": "lose all your teeth",
      "b": "lose a day of your life every time you kissed someone"
    },
    {
      "question": "Would you rather Danny DeVito or Danny Trejo play you in a movie?",
      "a": "Danny DeVito",
      "b": "Danny Trejo play you in a movie"
    },
    {
      "question": "Would you rather lose all of your friends but keep your BFF or lose your BFF but keep the rest of your buds?",
      "a": "lose all of your friends but keep your BFF",
      "b": "lose your BFF but keep the rest of your buds"
    },
    {
      "question": "Would you rather have people spread a terrible lie about you or have people spread terrible but true tales about you?",
      "a": "have people spread a terrible lie about you",
      "b": "have people spread terrible but true tales about you"
    },
    {
      "question": "Would you rather be the absolute best at something that no one takes seriously or be average at something well respected?",
      "a": "be the absolute best at something that no one takes seriously",
      "b": "be average at something well respected"
    },
    {
      "question": "Would you rather have unlimited battery life on all of your devices or have free WiFi wherever you go?",
      "a": "have unlimited battery life on all of your devices",
      "b": "have free WiFi wherever you go"
    },
    {
      "question": "Would you rather be in history books for something terrible or be forgotten completely after you die?",
      "a": "be in history books for something terrible",
      "b": "be forgotten completely after you die"
    },
    {
      "question": "Would you rather go back to the past and meet your loved ones who passed away or go to the future to meet your children or grandchildren to be?",
      "a": "go back to the past and meet your loved ones who passed away",
      "b": "go to the future to meet your children or grandchildren to be"
    },
    {
      "question": "Would you rather stay the age you are physically forever or stay the way you are now financially forever?",
      "a": "stay the age you are physically forever",
      "b": "stay the way you are now financially forever"
    },
    {
      "question": "Would you rather have to wear stilettos to sleep or have to wear slippers everywhere you go?",
      "a": "have to wear stilettos to sleep",
      "b": "have to wear slippers everywhere you go"
    },
    {
      "question": "Would you rather lose the ability to read or lose the ability to speak?",
      "a": "lose the ability to read",
      "b": "lose the ability to speak"
    },
    {
      "question": "Would you rather be able to speak any language or be able to communicate with animals?",
      "a": "be able to speak any language",
      "b": "be able to communicate with animals"
    },
    {
      "question": "Would you rather see Lady Gaga in a movie or see Bradley Cooper in concert?",
      "a": "see Lady Gaga in a movie",
      "b": "see Bradley Cooper in concert"
    },
    {
      "question": "Would you rather give up cursing forever or give up ice cream for 12 years?",
      "a": "give up cursing forever",
      "b": "give up ice cream for 12 years"
    },
    {
      "question": "Would you rather only be able to listen to one song for the rest of your life or only be able to watch one movie for the rest of your life?",
      "a": "only be able to listen to one song for the rest of your life",
      "b": "only be able to watch one movie for the rest of your life"
    },
    {
      "question": "Would you rather never use social media again or never watch another movie ever again?",
      "a": "never use social media again",
      "b": "never watch another movie ever again"
    },
    {
      "question": "Would you rather never get a cold ever again or never be stuck in traffic ever again?",
      "a": "never get a cold ever again",
      "b": "never be stuck in traffic ever again"
    },
    {
      "question": "Would you rather never eat Christmas cookies ever again or never eat Halloween candy ever again?",
      "a": "never eat Christmas cookies ever again",
      "b": "never eat Halloween candy ever again"
    },
    {
      "question": "Would you rather everyone you love forget your birthday or everyone you love sing “Happy Birthday” to you for 24 hours straight?",
      "a": "everyone you love forget your birthday",
      "b": "everyone you love sing “Happy Birthday” to you for 24 hours straight"
    },
    {
      "question": "Would you rather be invisible or be able to fly?",
      "a": "be invisible",
      "b": "be able to fly"
    },
    {
      "question": "Would you rather spend every weekend indoors or spend every weekend outdoors?",
      "a": "spend every weekend indoors",
      "b": "spend every weekend outdoors"
    },
    {
      "question": "Would you rather only eat raw food or only eat TV dinners?",
      "a": "only eat raw food",
      "b": "only eat TV dinners"
    },
    {
      "question": "Would you rather never have a wedgie or never have anything stuck in your teeth ever again?",
      "a": "never have a wedgie",
      "b": "never have anything stuck in your teeth ever again"
    },
    {
      "question": "Would you rather always have an annoying song stuck in your head or always have an itch that you can't reach?",
      "a": "always have an annoying song stuck in your head",
      "b": "always have an itch that you can't reach"
    },
    {
      "question": "Would you rather be married to someone stunning who doesn't think you're attractive or be married to someone ugly who thinks you're gorgeous?",
      "a": "be married to someone stunning who doesn't think you're attractive",
      "b": "be married to someone ugly who thinks you're gorgeous"
    },
    {
      "question": "Would you rather be able to erase your own memories or be able to erase someone else's memories?",
      "a": "be able to erase your own memories",
      "b": "be able to erase someone else's memories"
    },
    {
      "question": "Would you rather be so afraid of heights that you can't go to the second floor of a building or be so afraid of the sun that you can only leave the house on rainy days?",
      "a": "be so afraid of heights that you can't go to the second floor of a building",
      "b": "be so afraid of the sun that you can only leave the house on rainy days"
    },
    {
      "question": "Would you rather save your best friend's life if it meant five strangers would die or save five strangers if it meant sacrificing your best friend?",
      "a": "save your best friend's life if it meant five strangers would die",
      "b": "save five strangers if it meant sacrificing your best friend"
    },
    {
      "question": "Would you rather sell all of your possessions or sell one of your organs?",
      "a": "sell all of your possessions",
      "b": "sell one of your organs"
    },
    {
      "question": "Would you rather be unable to close any door once it's open or be unable to open any door once it's closed?",
      "a": "be unable to close any door once it's open",
      "b": "be unable to open any door once it's closed"
    },
    {
      "question": "Would you rather only be able to wash your hair twice a year or only be able to check your phone once a day?",
      "a": "only be able to wash your hair twice a year",
      "b": "only be able to check your phone once a day"
    },
    {
      "question": "Would you rather have aliens be real and covered up by the government or have no extraterrestrial life at all in the universe?",
      "a": "have aliens be real and covered up by the government",
      "b": "have no extraterrestrial life at all in the universe"
    },
    {
      "question": "Would you rather donate your organs to those who need them or donate your entire body to science?",
      "a": "donate your organs to those who need them",
      "b": "donate your entire body to science"
    },
    {
      "question": "Would you rather be criticized or be ignored?",
      "a": "be criticized",
      "b": "be ignored"
    },
    {
      "question": "Would you rather give up brushing your hair or give us brushing your teeth?",
      "a": "give up brushing your hair",
      "b": "give us brushing your teeth"
    },
    {
      "question": "Would you rather never age physically or never age mentally?",
      "a": "never age physically",
      "b": "never age mentally"
    },
    {
      "question": "Would you rather look strong and be weak or look weak and be strong?",
      "a": "look strong and be weak",
      "b": "look weak and be strong"
    },
    {
      "question": "Would you rather sneeze nonstop for 15 minutes once every day or sneeze once every three minutes of the day while you're awake?",
      "a": "sneeze nonstop for 15 minutes once every day",
      "b": "sneeze once every three minutes of the day while you're awake"
    },
    {
      "question": "Would you rather only be able to listen to Christmas songs all year round or only be able to watch nothing but horror movies?",
      "a": "only be able to listen to Christmas songs all year round",
      "b": "only be able to watch nothing but horror movies"
    },
    {
      "question": "Would you rather be beloved by the general public but your family and friends hate you or be hated by the general public but your family and friends love you?",
      "a": "be beloved by the general public but your family and friends hate you",
      "b": "be hated by the general public but your family and friends love you"
    },
    {
      "question": "Would you rather have telekinesis (the ability to move things with your mind) or telepathy (the ability to read minds)?",
      "a": "telekinesis",
      "b": "telepathy"
    },
    {
      "question": "Would you rather team up with Wonder Woman or Captain Marvel?",
      "a": "team up with Wonder Woman or Captain Marvel",
      "b": "team up with Wonder Woman"
    },
    {
      "question": "Would you rather be forced to sing along or dance to every single song you hear?",
      "a": "be forced to sing along or dance to every single song you hear",
      "b": "be forced to sing along"
    },
    {
      "question": "Would you rather find true love today or win the lottery next year?",
      "a": "find true love today or win the lottery next year",
      "b": "find true love today"
    },
    {
      "question": "Would you rather have another 10 years with your partner or a one-night stand with your celebrity crush?",
      "a": "have another 10 years with your partner or a one-night stand with your celebrity crush",
      "b": "have another 10 years with your partner"
    },
    {
      "question": "Would you rather be chronically under-dressed or overdressed?",
      "a": "be chronically under-dressed or overdressed",
      "b": "chronically under-dressed"
    },
    {
      "question": "Would you rather have everyone you know be able to read your thoughts or for everyone you know to have access to your Internet history?",
      "a": "have everyone you know be able to read your thoughts or for everyone you know to have access to your Internet history",
      "b": "have everyone you know be able to read your thoughts"
    },
    {
      "question": "Would you rather lose your sight or your memories?",
      "a": "lose your sight or your memories",
      "b": "lose your sight"
    },
    {
      "question": "Would you rather have universal respect or unlimited power?",
      "a": "have universal respect or unlimited power",
      "b": "have universal respect"
    },
    {
      "question": "Would you rather swim in a pool full of Nutella or a pool full of maple syrup?",
      "a": "swim in a pool full of Nutella or a pool full of maple syrup",
      "b": "swim in a pool full of Nutella"
    },
    {
      "question": "Would you rather labor under a hot sun or extreme cold?",
      "a": "labor under a hot sun or extreme cold",
      "b": "labor under a hot sun"
    },
    {
      "question": "Would you rather stay in during a snow day or build a fort?",
      "a": "stay in during a snow day or build a fort",
      "b": "stay in during a snow day"
    },
    {
      "question": "Would you rather buy 10 things you don't need every time you go shopping or always forget the one thing that you need when you go to the store?",
      "a": "buy 10 things you don't need every time you go shopping or always forget the one thing that you need when you go to the store",
      "b": "buy 10 things you don't need every time you go shopping"
    },
    {
      "question": "Would you rather have a personal maid or a personal chef?",
      "a": "have a personal maid or a personal chef",
      "b": "have a personal maid"
    },
    {
      "question": "Would you rather have Beyoncé's talent or Jay-Z's business acumen?",
      "a": "have Beyoncé's talent or Jay-Z's business acumen",
      "b": "have Beyoncé's talent"
    },
    {
      "question": "Would you rather be 11 feet tall or nine inches tall?",
      "a": "be 11 feet tall or nine inches tall",
      "b": "11 feet tall"
    },
    {
      "question": "Would you rather be an extra in an Oscar-winning movie or the lead in a box office bomb?",
      "a": "be an extra in an Oscar-winning movie or the lead in a box office bomb",
      "b": "an extra in an Oscar-winning movie"
    },
    {
      "question": "Would you rather vomit on your hero or have your hero vomit on you?",
      "a": "vomit on your hero or have your hero vomit on you",
      "b": "vomit on your hero"
    },
    {
      "question": "Would you rather communicate only in emoji or never be able to text at all ever again?",
      "a": "communicate only in emoji or never be able to text at all ever again",
      "b": "communicate only in emoji"
    },
    {
      "question": "Would you rather be royalty 1000 years ago or an average person today?",
      "a": "be royalty 1000 years ago or an average person today",
      "b": "royalty 1000 years ago"
    },
    {
      "question": "Would you rather lounge by the pool or on the beach?",
      "a": "lounge by the pool or on the beach",
      "b": "lounge by the pool"
    },
    {
      "question": "Would you rather wear the same socks for a month or the same underwear for a week?",
      "a": "wear the same socks for a month or the same underwear for a week",
      "b": "wear the same socks for a month"
    },
    {
      "question": "Would you rather work an overtime shift with your annoying boss or spend full day with your mother-in-law?",
      "a": "work an overtime shift with your annoying boss or spend full day with your mother-in-law",
      "b": "work an overtime shift with your annoying boss"
    },
    {
      "question": "Would you rather cuddle a koala or pal around with a panda?",
      "a": "cuddle a koala or pal around with a panda",
      "b": "cuddle a koala"
    },
    {
      "question": "Would you rather have a sing-off with Ariana Grande or a dance-off with Rihanna?",
      "a": "have a sing-off with Ariana Grande or a dance-off with Rihanna",
      "b": "have a sing-off with Ariana Grande"
    },
    {
      "question": "Would you rather watch nothing but Hallmark Christmas movies or nothing but horror movies?",
      "a": "watch nothing but Hallmark Christmas movies or nothing but horror movies",
      "b": "watch nothing but Hallmark Christmas movies"
    },
    {
      "question": "Would you rather spend a week in the forest or a night in a real haunted house?",
      "a": "spend a week in the forest or a night in a real haunted house",
      "b": "spend a week in the forest"
    },
    {
      "question": "Would you rather find a rat in your kitchen or a roach in your bed?",
      "a": "find a rat in your kitchen or a roach in your bed",
      "b": "find a rat in your kitchen"
    },
    {
      "question": "Would you rather have a pause or a rewind button in your life?",
      "a": "have a pause or a rewind button in your life",
      "b": "have a pause"
    },
    {
      "question": "Would you rather always have a full phone battery or a full gas tank?",
      "a": "always have a full phone battery or a full gas tank",
      "b": "always have a full phone battery"
    },
    {
      "question": "Would you rather drink from a toilet or pee in a litter box?",
      "a": "drink from a toilet or pee in a litter box",
      "b": "drink from a toilet"
    },
    {
      "question": "Would you rather never eat watermelon ever again or be forced to eat watermelon with every meal?",
      "a": "never eat watermelon ever again or be forced to eat watermelon with every meal",
      "b": "never eat watermelon ever again"
    },
    {
      "question": "Would you rather get a paper cut every time you turn a page or bite your tongue every time you eat?",
      "a": "get a paper cut every time you turn a page or bite your tongue every time you eat",
      "b": "get a paper cut every time you turn a page"
    },
    {
      "question": "Would you rather oversleep every day for a week or not get any sleep at all for four days?",
      "a": "oversleep every day for a week or not get any sleep at all for four days",
      "b": "oversleep every day for a week"
    },
    {
      "question": "Would you rather die in 20 years with no regrets or live to 100 with a lot of regrets?",
      "a": "die in 20 years with no regrets or live to 100 with a lot of regrets",
      "b": "die in 20 years with no regrets"
    },
    {
      "question": "Would you rather sip gin with Ryan Reynolds or shoot tequila with Dwayne “The Rock” Johnson?",
      "a": "sip gin with Ryan Reynolds or shoot tequila with Dwayne “The Rock” Johnson",
      "b": "sip gin with Ryan Reynolds"
    },
    {
      "question": "Would you rather get trapped in the middle of a food fight or a water balloon fight?",
      "a": "get trapped in the middle of a food fight or a water balloon fight",
      "b": "get trapped in the middle of a food fight"
    },
    {
      "question": "Would you rather walk to work in heels or drive to work in reverse?",
      "a": "walk to work in heels or drive to work in reverse",
      "b": "walk to work in heels"
    },
    {
      "question": "Would you rather spend a year at war or a year in prison?",
      "a": "spend a year at war or a year in prison",
      "b": "spend a year at war"
    },
    {
      "question": "Would you rather die before or after your partner?",
      "a": "die before or after your partner",
      "b": "die before"
    },
    {
      "question": "Would you rather have a child every year for 20 years or never have any children at all?",
      "a": "have a child every year for 20 years or never have any children at all",
      "b": "have a child every year for 20 years"
    },
    {
      "question": "Would you rather be gassy on a first date or your wedding night?",
      "a": "be gassy on a first date or your wedding night",
      "b": "gassy on a first date"
    },
    {
      "question": "Would you rather be able to take back anything you say or hear any conversation that is about you?",
      "a": "be able to take back anything you say or hear any conversation that is about you",
      "b": "take back anything you say"
    },
    {
      "question": "Would you rather have skin that changes color based on your emotions or tattoos appear all over your body depicting what you did yesterday?",
      "a": "have skin that changes color based on your emotions or tattoos appear all over your body depicting what you did yesterday",
      "b": "have skin that changes color based on your emotions"
    },
    {
      "question": "Would you rather hunt and butcher your own meat or never eat meat again?",
      "a": "hunt and butcher your own meat or never eat meat again",
      "b": "hunt and butcher your own meat"
    },
    {
      "question": "Would you rather walk in on your parents or have them walk in on you?",
      "a": "walk in on your parents or have them walk in on you",
      "b": "walk in on your parents"
    },
    {
      "question": "Would you rather have Billie Eilish's future or Madonna's legacy?",
      "a": "have Billie Eilish's future or Madonna's legacy",
      "b": "have Billie Eilish's future"
    },
    {
      "question": "Would you rather have a third nipple or an extra toe?",
      "a": "have a third nipple or an extra toe",
      "b": "have a third nipple"
    },
    {
      "question": "Would you rather solve world hunger or global warming?",
      "a": "solve world hunger or global warming",
      "b": "solve world hunger"
    },
    {
      "question": "Would you rather have to wear every shirt inside out or every pair of pants backward?",
      "a": "have to wear every shirt inside out or every pair of pants backward",
      "b": "have to wear every shirt inside out"
    },
    {
      "question": "Would you rather live in a treehouse or in a cave?",
      "a": "live in a treehouse or in a cave",
      "b": "live in a treehouse"
    },
    {
      "question": "Would you rather win $25000 or your best friend win $100000?",
      "a": "win $25000 or your best friend win $100000",
      "b": "win $25000"
    },
    {
      "question": "Would you rather travel the world for free for a year or have $50000 to spend however you please?",
      "a": "travel the world for free for a year or have $50000 to spend however you please",
      "b": "travel the world for free for a year"
    },
    {
      "question": "Would you rather your to only be able to talk to your dog or for your dog to be able to talk to only you-and everyone thinks you're nuts?",
      "a": "your to only be able to talk to your dog or for your dog to be able to talk to only you-and everyone thinks you're nuts",
      "b": "your to only be able to talk to your dog"
    },
    {
      "question": "Would you rather have a mullet for a year or be bald (no wigs!) for six months?",
      "a": "have a mullet for a year or be bald (no wigs!) for six months",
      "b": "have a mullet for a year"
    },
    {
      "question": "Would you rather have Angelina Jolie's lips or with Jennifer Aniston's hair?",
      "a": "have Angelina Jolie's lips or with Jennifer Aniston's hair",
      "b": "have Angelina Jolie's lips"
    },
    {
      "question": "Would you rather be in a zombie apocalypse or a robot apocalypse?",
      "a": "be in a zombie apocalypse or a robot apocalypse",
      "b": "a zombie apocalypse"
    },
    {
      "question": "Would you rather be alone all your life or surrounded by really annoying people?",
      "a": "be alone all your life or surrounded by really annoying people",
      "b": "be alone all your life"
    },
    {
      "question": "Would you rather give up your cellphone for a month or bathing for a month?",
      "a": "give up your cellphone for a month or bathing for a month",
      "b": "give up your cellphone for a month"
    },
    {
      "question": "Would you rather spend a day cleaning your worst enemy's house or have your crush spend the day cleaning your house?",
      "a": "spend a day cleaning your worst enemy's house or have your crush spend the day cleaning your house",
      "b": "spend a day cleaning your worst enemy's house"
    },
    {
      "question": "Would you rather spend a year entirely alone or a year without a home?",
      "a": "spend a year entirely alone or a year without a home",
      "b": "spend a year entirely alone"
    },
    {
      "question": "Would you rather buy all used underwear or all used toothbrushes?",
      "a": "buy all used underwear or all used toothbrushes",
      "b": "buy all used underwear"
    },
    {
      "question": "Would you rather have a photographic memory or an IQ of 200?",
      "a": "have a photographic memory or an IQ of 200",
      "b": "have a photographic memory"
    },
    {
      "question": "Would you rather go on a cruise with your boss or never go on vacation ever again?",
      "a": "go on a cruise with your boss or never go on vacation ever again",
      "b": "go on a cruise with your boss"
    },
    {
      "question": "Would you rather forget your partner's birthday or your anniversary every year?",
      "a": "forget your partner's birthday or your anniversary every year",
      "b": "forget your partner's birthday"
    },
    {
      "question": "Would you rather change the outcome of the last election or get to decide the outcome of the next election?",
      "a": "change the outcome of the last election or get to decide the outcome of the next election",
      "b": "change the outcome of the last election"
    },
    {
      "question": "Would you rather smooch Chris Pratt Chris Pine Chris Evans or Chris Hemsworth?",
      "a": "smooch Chris Pratt Chris Pine Chris Evans or Chris Hemsworth",
      "b": "smooch Chris Pratt Chris Pine Chris Evans"
    },
    {
      "question": "Would you rather be beautiful and stupid or unattractive but a genius?",
      "a": "be beautiful and stupid or unattractive but a genius",
      "b": "beautiful and stupid"
    },
    {
      "question": "Would you rather have seven fingers on each hand or seven toes on each foot?",
      "a": "have seven fingers on each hand or seven toes on each foot",
      "b": "have seven fingers on each hand"
    },
    {
      "question": "Would you rather have super-sensitive taste buds or super-sensitive hearing?",
      "a": "have super-sensitive taste buds or super-sensitive hearing",
      "b": "have super-sensitive taste buds"
    },
    {
      "question": "Would you rather ask your ex or a total stranger for a favor?",
      "a": "ask your ex or a total stranger for a favor",
      "b": "ask your ex"
    },
    {
      "question": "Would you rather go on tour with Elton John or Cher?",
      "a": "go on tour with Elton John or Cher",
      "b": "go on tour with Elton John"
    },
    {
      "question": "Would you rather eat only pizza for a year or not eat any pizza for five years?",
      "a": "eat only pizza for a year or not eat any pizza for five years",
      "b": "eat only pizza for a year"
    },
    {
      "question": "Would you rather never get another present in your life but always pick the perfect present for everyone else or keep getting presents but giving terrible ones to everyone else?",
      "a": "never get another present in your life but always pick the perfect present for everyone else or keep getting presents but giving terrible ones to everyone else",
      "b": "never get another present in your life but always pick the perfect present for everyone else"
    },
    {
      "question": "Would you rather sleep in a doghouse or let stray dogs sleep in your bed?",
      "a": "sleep in a doghouse or let stray dogs sleep in your bed",
      "b": "sleep in a doghouse"
    },
    {
      "question": "Would you rather run at 100 mph or fly at 20 mph?",
      "a": "run at 100 mph or fly at 20 mph",
      "b": "run at 100 mph"
    },
    {
      "question": "Would you rather have Adele's voice or Normani's dance moves?",
      "a": "have Adele's voice or Normani's dance moves",
      "b": "have Adele's voice"
    },
    {
      "question": "Would you rather have 10000 spoons when all you need is a knife or always have a knife but never be able to use spoons?",
      "a": "have 10000 spoons when all you need is a knife or always have a knife but never be able to use spoons",
      "b": "have 10000 spoons when all you need is a knife"
    },
    {
      "question": "Would you rather detect every lie you hear or get away with every lie you tell?",
      "a": "detect every lie you hear or get away with every lie you tell",
      "b": "detect every lie you hear"
    },
    {
      "question": "Would you rather be the funniest person in a room or the smartest person in a room?",
      "a": "be the funniest person in a room or the smartest person in a room",
      "b": "the funniest person in a room"
    },
    {
      "question": "Would you rather talk like Yoda or breathe like Darth Vader?",
      "a": "talk like Yoda or breathe like Darth Vader",
      "b": "talk like Yoda"
    },
    {
      "question": "Would you rather people knew all the details of your finances or all the details of your love life?",
      "a": "people knew all the details of your finances or all the details of your love life",
      "b": "people knew all the details of your finances"
    },
    {
      "question": "Would you rather go vegan for a month or only eat meat and dairy for a month?",
      "a": "go vegan for a month or only eat meat and dairy for a month",
      "b": "go vegan for a month"
    },
    {
      "question": "Would you rather clean up someone else's vomit or someone else's blood?",
      "a": "clean up someone else's vomit or someone else's blood",
      "b": "clean up someone else's vomit"
    },
    {
      "question": "Would you rather work for Michael Scott or Mr. Burns?",
      "a": "work for Michael Scott or Mr. Burns",
      "b": "work for Michael Scott"
    },
    {
      "question": "Would you rather spend the weekend with pirates or ninjas?",
      "a": "spend the weekend with pirates or ninjas",
      "b": "spend the weekend with pirates"
    },
    {
      "question": "Would you rather end every phone call with “I love you” or accidentally call your partner the wrong name during a fight?",
      "a": "end every phone call with “I love you” or accidentally call your partner the wrong name during a fight",
      "b": "end every phone call with “I love you”"
    },
    {
      "question": "Would you rather get your paycheck given to you in pennies or never be able to use cash again?",
      "a": "get your paycheck given to you in pennies or never be able to use cash again",
      "b": "get your paycheck given to you in pennies"
    },
    {
      "question": "Would you rather live until you are 200 and look your age or look like you're 22 your whole life but die at age 65?",
      "a": "live until you are 200 and look your age or look like you're 22 your whole life but die at age 65",
      "b": "live until you are 200 and look your age"
    },
    {
      "question": "Would you rather hear a comforting lie or an uncomfortable truth?",
      "a": "hear a comforting lie or an uncomfortable truth",
      "b": "hear a comforting lie"
    },
    {
      "question": "Would you rather someone see all the photos in your phone or read all your text messages?",
      "a": "someone see all the photos in your phone or read all your text messages",
      "b": "someone see all the photos in your phone"
    },
    {
      "question": "Would you rather have a South Park-themed wedding or a Family Guy-themed funeral?",
      "a": "have a South Park-themed wedding or a Family Guy-themed funeral",
      "b": "have a South Park-themed wedding"
    },
    {
      "question": "Would you rather have to hunt and gather all of your food or eat McDonald's for every meal?",
      "a": "have to hunt and gather all of your food or eat McDonald's for every meal",
      "b": "have to hunt and gather all of your food"
    },
    {
      "question": "Would you rather have fortune or fame?",
      "a": "have fortune or fame",
      "b": "have fortune"
    },
    {
      "question": "Would you rather celebrate the Fourth of July with Taylor Swift or Christmas with Mariah Carey?",
      "a": "celebrate the Fourth of July with Taylor Swift or Christmas with Mariah Carey",
      "b": "celebrate the Fourth of July with Taylor Swift"
    },
    {
      "question": "Would you rather find your soulmate or your calling?",
      "a": "find your soulmate or your calling",
      "b": "find your soulmate"
    },
    {
      "question": "Would you rather drink sour milk or brush your teeth with soap?",
      "a": "drink sour milk or brush your teeth with soap",
      "b": "drink sour milk"
    },
    {
      "question": "Would you rather steal Duchess Meghan or Duchess Kate's style?",
      "a": "steal Duchess Meghan or Duchess Kate's style",
      "b": "steal Duchess Meghan"
    },
    {
      "question": "Would you rather be tall and average looking or three feet tall but beautiful?",
      "a": "be tall and average looking or three feet tall but beautiful",
      "b": "tall and average looking"
    },
    {
      "question": "Would you rather visit the International Space Station for a week or spend a week in a hotel at the bottom of the ocean?",
      "a": "visit the International Space Station for a week or spend a week in a hotel at the bottom of the ocean",
      "b": "visit the International Space Station for a week"
    },
    {
      "question": "Would you rather confess to cheating on your partner or catch your partner cheating on you?",
      "a": "confess to cheating on your partner or catch your partner cheating on you",
      "b": "confess to cheating on your partner"
    },
    {
      "question": "Would you rather have all traffic lights you approach be green or never have to stand in line again?",
      "a": "have all traffic lights you approach be green or never have to stand in line again",
      "b": "have all traffic lights you approach be green"
    },
    {
      "question": "Would you rather share an onscreen kiss with Leonardo DiCaprio or George Clooney?",
      "a": "share an onscreen kiss with Leonardo DiCaprio or George Clooney",
      "b": "share an onscreen kiss with Leonardo DiCaprio"
    },
    {
      "question": "Would you rather lose your long-term memory or your short-term memory?",
      "a": "lose your long-term memory or your short-term memory",
      "b": "lose your long-term memory"
    },
    {
      "question": "Would you rather have a mullet or a perm?",
      "a": "have a mullet or a perm",
      "b": "have a mullet"
    },
    {
      "question": "Would you rather be stranded in the jungle or in the desert?",
      "a": "be stranded in the jungle or in the desert",
      "b": "in the jungle"
    },
    {
      "question": "Would you rather party with Jennifer Lopez and Alex Rodriguez or with Kim Kardashian and Kanye West?",
      "a": "party with Jennifer Lopez and Alex Rodriguez or with Kim Kardashian and Kanye West",
      "b": "party with Jennifer Lopez and Alex Rodriguez"
    },
    {
      "question": "Would you rather give up wine for a year or drink nothing but wine for a year?",
      "a": "give up wine for a year or drink nothing but wine for a year",
      "b": "give up wine for a year"
    },
    {
      "question": "Would you rather start a colony on another planet or be the leader of a country on Earth?",
      "a": "start a colony on another planet or be the leader of a country on Earth",
      "b": "start a colony on another planet"
    },
    {
      "question": "Would you rather live in a house haunted by friendly ghosts or be a ghost reliving your average day after you die?",
      "a": "live in a house haunted by friendly ghosts or be a ghost reliving your average day after you die",
      "b": "live in a house haunted by friendly ghosts"
    },
    {
      "question": "Would you rather have one wish granted today or 10 wishes granted 20 years from now?",
      "a": "have one wish granted today or 10 wishes granted 20 years from now",
      "b": "have one wish granted today"
    },
    {
      "question": "Would you rather get hit on by someone 20 years older than you or someone 20 years younger than you?",
      "a": "get hit on by someone 20 years older than you or someone 20 years younger than you",
      "b": "get hit on by someone 20 years older than you"
    },
    {
      "question": "Would you rather fall down in public or pass gas in public?",
      "a": "fall down in public or pass gas in public",
      "b": "fall down in public"
    },
    {
      "question": "Would you rather run as fast as The Flash or be as strong as Superman?",
      "a": "run as fast as The Flash or be as strong as Superman",
      "b": "run as fast as The Flash"
    },
    {
      "question": "Would you rather marry the most attractive person you've ever met or the best cook you've ever met?",
      "a": "marry the most attractive person you've ever met or the best cook you've ever met",
      "b": "marry the most attractive person you've ever met"
    },
    {
      "question": "Would you rather sing karaoke with Gwen Stefani or with Kelly Clarkson?",
      "a": "sing karaoke with Gwen Stefani or with Kelly Clarkson",
      "b": "sing karaoke with Gwen Stefani"
    },
    {
      "question": "Would you rather be able to read minds or predict the future?",
      "a": "be able to read minds or predict the future",
      "b": "read minds"
    },
    {
      "question": "Would you rather be an unknown superhero or an infamous villain?",
      "a": "be an unknown superhero or an infamous villain",
      "b": "be an unknown superhero"
    },
    {
      "question": "Would you rather never be able to keep anyone else's secrets or have someone tell all of your secrets?",
      "a": "never be able to keep anyone else's secrets or have someone tell all of your secrets",
      "b": "never be able to keep anyone else's secrets"
    },
    {
      "question": "Would you rather be Batman or Iron Man?",
      "a": "be Batman or Iron Man",
      "b": "be Batman"
    },
    {
      "question": "Would you rather have a third ear or a third eye?",
      "a": "have a third ear or a third eye",
      "b": "have a third ear"
    },
    {
      "question": "Would you rather have $1 million now or $5000 a week for the rest of your life?",
      "a": "have $1 million now or $5000 a week for the rest of your life",
      "b": "have $1 million now"
    },
    {
      "question": "Would you rather binge-watch Sex And the City or Girls?",
      "a": "binge-watch Sex And the City or Girls",
      "b": "binge-watch Sex And the City"
    },
    {
      "question": "Would you rather be rich working a job you hate or poor working a job you love?",
      "a": "be rich working a job you hate or poor working a job you love",
      "b": "be rich working a job you hate"
    },
    {
      "question": "Would you rather wear real fur or fake jewels?",
      "a": "wear real fur or fake jewels",
      "b": "wear real fur"
    },
    {
      "question": "Would you rather work a high-paying job that you hate or your dream job with only just enough money for rent food and utilities?",
      "a": "work a high-paying job that you hate or your dream job with only just enough money for rent food and utilities",
      "b": "work a high-paying job that you hate"
    },
    {
      "question": "Would you rather wake up naked in a forest five miles from home or in your underwear at work?",
      "a": "wake up naked in a forest five miles from home or in your underwear at work",
      "b": "wake up naked in a forest five miles from home"
    },
    {
      "question": "Would you rather go backstage with your favorite band or be an extra on your favorite TV show?",
      "a": "go backstage with your favorite band or be an extra on your favorite TV show",
      "b": "go backstage with your favorite band"
    },
    {
      "question": "Would you rather have a rap battle against Nicki Minaj or Lizzo?",
      "a": "have a rap battle against Nicki Minaj or Lizzo",
      "b": "have a rap battle against Nicki Minaj"
    },
    {
      "question": "Would you rather give up coffee or soda forever?",
      "a": "give up coffee or soda forever",
      "b": "give up coffee"
    },
    {
      "question": "Would you rather find a $100 bill floating in a public toilet or a $20 bill in your own pocket?",
      "a": "find a $100 bill floating in a public toilet or a $20 bill in your own pocket",
      "b": "find a $100 bill floating in a public toilet"
    },
    {
      "question": "Would you rather wear nothing but neon orange or neon green for an entire year?",
      "a": "wear nothing but neon orange or neon green for an entire year",
      "b": "wear nothing but neon orange"
    },
    {
      "question": "Would you rather eat the same thing for every meal for a year or be able to eat whatever you wanted but only once every three days?",
      "a": "eat the same thing for every meal for a year or be able to eat whatever you wanted but only once every three days",
      "b": "eat the same thing for every meal for a year"
    },
    {
      "question": "Would you rather get drunk off of one sip of alcohol or never get drunk no matter how much booze you imbibe?",
      "a": "get drunk off of one sip of alcohol or never get drunk no matter how much booze you imbibe",
      "b": "get drunk off of one sip of alcohol"
    },
    {
      "question": "Would you rather clean a toilet with your toothbrush or a floor with your tongue?",
      "a": "clean a toilet with your toothbrush or a floor with your tongue",
      "b": "clean a toilet with your toothbrush"
    },
    {
      "question": "Would you rather be asked the same question over and over again or never be spoken to ever again?",
      "a": "be asked the same question over and over again or never be spoken to ever again",
      "b": "be asked the same question over and over again"
    },
    {
      "question": "Would you rather be reincarnated as a fly or just stop existing when you die?",
      "a": "be reincarnated as a fly or just stop existing when you die",
      "b": "be reincarnated as a fly"
    },
    {
      "question": "Would you rather be serenaded by Justin Bieber or Justin Timberlake?",
      "a": "be serenaded by Justin Bieber or Justin Timberlake",
      "b": "be serenaded by Justin Bieber"
    },
    {
      "question": "Would you rather wear clothes that were always way too big or a couple sizes too small?",
      "a": "wear clothes that were always way too big or a couple sizes too small",
      "b": "wear clothes that were always way too big"
    },
    {
      "question": "Would you rather give your parents or your boss access to your browser history?",
      "a": "give your parents or your boss access to your browser history",
      "b": "give your parents"
    },
    {
      "question": "Would you rather have a tennis lesson from Serena Williams or a soccer lesson from Meghan Rapinoe?",
      "a": "have a tennis lesson from Serena Williams or a soccer lesson from Meghan Rapinoe",
      "b": "have a tennis lesson from Serena Williams"
    },
    {
      "question": "Would you rather have a permanent unibrow or no eyebrows at all?",
      "a": "have a permanent unibrow or no eyebrows at all",
      "b": "have a permanent unibrow"
    },
    {
      "question": "Would you rather be caught liking your ex's Instagram pics or your partner's ex's Instagram pics?",
      "a": "be caught liking your ex's Instagram pics or your partner's ex's Instagram pics",
      "b": "be caught liking your ex's Instagram pics"
    },
    {
      "question": "Would you rather never eat cookies ever again or only ever drink water?",
      "a": "never eat cookies ever again or only ever drink water",
      "b": "never eat cookies ever again"
    },
    {
      "question": "Would you rather work alongside Dwight Schrute or Homer Simpson?",
      "a": "work alongside Dwight Schrute or Homer Simpson",
      "b": "work alongside Dwight Schrute"
    },
    {
      "question": "Would you rather be punished for a crime you didn't commit or have someone else take credit for one of your major accomplishments?",
      "a": "be punished for a crime you didn't commit or have someone else take credit for one of your major accomplishments",
      "b": "be punished for a crime you didn't commit"
    },
    {
      "question": "Would you rather eat an undercooked meal or a burnt meal?",
      "a": "eat an undercooked meal or a burnt meal",
      "b": "eat an undercooked meal"
    },
    {
      "question": "Would you rather get a cooking lesson from Gordon Ramsay or Ina Garten?",
      "a": "get a cooking lesson from Gordon Ramsay or Ina Garten",
      "b": "get a cooking lesson from Gordon Ramsay"
    },
    {
      "question": "Would you rather have your boss or your parents look through your text messages?",
      "a": "have your boss or your parents look through your text messages",
      "b": "have your boss"
    },
    {
      "question": "Would you rather have your first child when you're 18 or when you're 50?",
      "a": "have your first child when you're 18 or when you're 50",
      "b": "have your first child when you're 18"
    },
    {
      "question": "Would you rather star in a Star Wars or a Marvel film?",
      "a": "star in a Star Wars or a Marvel film",
      "b": "star in a Star Wars"
    },
    {
      "question": "Would you rather wear heels to the gym or sneakers to a wedding?",
      "a": "wear heels to the gym or sneakers to a wedding",
      "b": "wear heels to the gym"
    },
    {
      "question": "Would you rather master every musical instrument or every type of sport?",
      "a": "master every musical instrument or every type of sport",
      "b": "master every musical instrument"
    },
    {
      "question": "Would you rather always have wet socks or a small rock in your shoe?",
      "a": "always have wet socks or a small rock in your shoe",
      "b": "always have wet socks"
    },
    {
      "question": "Would you rather have Celine Dion or Eminem perform the soundtrack to your life?",
      "a": "have Celine Dion or Eminem perform the soundtrack to your life",
      "b": "have Celine Dion"
    },
    {
      "question": "Would you rather be the class clown or the teacher's pet?",
      "a": "be the class clown or the teacher's pet",
      "b": "be the class clown"
    },
    {
      "question": "Would you rather bathe in the dishwater or wash dishes in your bathwater?",
      "a": "bathe in the dishwater or wash dishes in your bathwater",
      "b": "bathe in the dishwater"
    },
    {
      "question": "Would you rather show up to a job interview with stained pants or pit stains?",
      "a": "show up to a job interview with stained pants or pit stains",
      "b": "show up to a job interview with stained pants"
    },
    {
      "question": "Would you rather date someone with bad breath or bad manners?",
      "a": "date someone with bad breath or bad manners",
      "b": "date someone with bad breath"
    },
    {
      "question": "Would you rather never wear makeup ever again or wear a full face of the wrong shades every day?",
      "a": "never wear makeup ever again or wear a full face of the wrong shades every day",
      "b": "never wear makeup ever again"
    },
    {
      "question": "Would you rather read the book or watch the movie?",
      "a": "read the book or watch the movie",
      "b": "read the book"
    },
    {
      "question": "Would you rather have a slumber party with Anna Kendrick or go to a comedy show with Rebel Wilson?",
      "a": "have a slumber party with Anna Kendrick or go to a comedy show with Rebel Wilson",
      "b": "have a slumber party with Anna Kendrick"
    },
    {
      "question": "Would you rather eat chocolate on pizza or never eat chocolate ever again?",
      "a": "eat chocolate on pizza or never eat chocolate ever again",
      "b": "eat chocolate on pizza"
    },
    {
      "question": "Would you rather have X-ray vision of people you find unattractive or everyone else have X-ray vision of you?",
      "a": "have X-ray vision of people you find unattractive or everyone else have X-ray vision of you",
      "b": "have X-ray vision of people you find unattractive"
    },
    {
      "question": "Would you rather have your own theme park or your own zoo?",
      "a": "have your own theme park or your own zoo",
      "b": "have your own theme park"
    },
    {
      "question": "Would you rather be the star player on a losing team or warm the bench on a championship roster?",
      "a": "be the star player on a losing team or warm the bench on a championship roster",
      "b": "be the star player on a losing team"
    },
    {
      "question": "Would you rather know when you're going to die or how you're going to die?",
      "a": "know when you're going to die or how you're going to die",
      "b": "know when you're going to die"
    },
    {
      "question": "Would you rather lose all of your teeth or all of your hair?",
      "a": "lose all of your teeth or all of your hair",
      "b": "lose all of your teeth"
    },
    {
      "question": "Would you rather watch nothing but The Office or Friends for the rest of your life?",
      "a": "watch nothing but The Office or Friends for the rest of your life",
      "b": "watch nothing but The Office"
    },
    {
      "question": "Would you rather lose your keys or your phone?",
      "a": "lose your keys or your phone",
      "b": "lose your keys"
    },
    {
      "question": "Would you rather live in a home with no electricity or in a home with no running water?",
      "a": "live in a home with no electricity or in a home with no running water",
      "b": "live in a home with no electricity"
    },
    {
      "question": "Would you rather be rich with no friends or poor and popular?",
      "a": "be rich with no friends or poor and popular",
      "b": "be rich with no friends"
    },
    {
      "question": "Would you rather have your style critiqued by Anna Wintour or Miranda Priestly?",
      "a": "have your style critiqued by Anna Wintour or Miranda Priestly",
      "b": "have your style critiqued by Anna Wintour"
    },
    {
      "question": "Would you rather wear one or seven colors everyday?",
      "a": "wear one or seven colors everyday",
      "b": "wear one"
    },
    {
      "question": "Would you rather walk barefoot in a public bathroom or through poison ivy?",
      "a": "walk barefoot in a public bathroom or through poison ivy",
      "b": "walk barefoot in a public bathroom"
    },
    {
      "question": "Would you rather shoot hoops with LeBron James or toss a football with Tom Brady?",
      "a": "shoot hoops with LeBron James or toss a football with Tom Brady",
      "b": "shoot hoops with LeBron James"
    },
    {
      "question": "Would you rather be a genius everyone thinks is an idiot or an idiot everyone thinks is a genius?",
      "a": "be a genius everyone thinks is an idiot or an idiot everyone thinks is a genius",
      "b": "be a genius everyone thinks is an idiot"
    },
    {
      "question": "Would you rather win on Survivor or on The Bachelor or The Bachelorette?",
      "a": "win on Survivor or on The Bachelor or The Bachelorette",
      "b": "win on Survivor"
    },
    {
      "question": "Would you rather be color blind or lose your sense of taste?",
      "a": "be color blind or lose your sense of taste",
      "b": "be color blind"
    },
    {
      "question": "Would you rather live on a desert island with your celebrity crush or in a mansion with your ex?",
      "a": "live on a desert island with your celebrity crush or in a mansion with your ex",
      "b": "live on a desert island with your celebrity crush"
    },
    {
      "question": "Would you rather pass gas every time you meet someone new or burp every time you kiss someone?",
      "a": "pass gas every time you meet someone new or burp every time you kiss someone",
      "b": "pass gas every time you meet someone new"
    },
    {
      "question": "Would you rather have tea with Queen Elizabeth or a beer with Prince Harry?",
      "a": "have tea with Queen Elizabeth or a beer with Prince Harry",
      "b": "have tea with Queen Elizabeth"
    },
    {
      "question": "Would you rather give up the Internet or showering for a month?",
      "a": "give up the Internet or showering for a month",
      "b": "give up the Internet"
    },
    {
      "question": "Would you rather get away with a terrible crime but live in fear of someone discovering it or go to prison for three years for a crime you didn't commit?",
      "a": "get away with a terrible crime but live in fear of someone discovering it or go to prison for three years for a crime you didn't commit",
      "b": "get away with a terrible crime but live in fear of someone discovering it"
    },
    {
      "question": "Would you rather have the ability to see 10 minutes into the future or 150 years into the future?",
      "a": "10 minutes into the future",
      "b": "150 years into the future"
    },
    {
      "question": "Would you rather be forced to live the same day over and over again for a full year or take 3 years off the end of your life?",
      "a": "be forced to live the same day over and over again for a full year",
      "b": "take 3 years off the end of your life"
    },
    {
      "question": "Would you rather take amazing selfies but look terrible in all other photos or be photogenic everywhere but in your selfies?",
      "a": "take amazing selfies but look terrible in all other photos",
      "b": "be photogenic everywhere but in your selfies"
    },
    {
      "question": "Would you rather work the job you have now for a year at double your current rate of pay or have one year off with what you are making now?",
      "a": "work the job you have now for a year at double your current rate of pay",
      "b": "have one year off with what you are making now"
    },
    {
      "question": "Would you rather be always stuck in traffic but find a perfect parking spot or never hit traffic but always take forever to park?",
      "a": "be always stuck in traffic but find a perfect parking spot",
      "b": "never hit traffic but always take forever to park"
    },
    {
      "question": "Would you rather have all of your messages and photos leak publicly or never use a cellphone ever again?",
      "a": "have all of your messages and photos leak publicly",
      "b": "never use a cellphone ever again"
    },
    {
      "question": "Would you rather have to wear sweatpants everywhere for the rest of your life or never wear sweatpants again?",
      "a": "have to wear sweatpants everywhere",
      "b": "never wear sweatpants again"
    },
    {
      "question": "Would you rather listen to your least-favorite song on a loop for a year or never listen to any music at all for a year?",
      "a": "listen to your least-favorite song on a loop for a year",
      "b": "never listen to any music at all for a year"
    },
    {
      "question": "Would you rather win the lottery but have to spend it all in one day or triple your current salary forever?",
      "a": "win the lottery but have to spend it all in one day",
      "b": "triple your current salary forever"
    },
    {
      "question": "Would you rather be locked for a week in a room that's overly bright or a room that's totally dark?",
      "a": "a room that's overly bright",
      "b": "a room that's totally dark"
    },
    {
      "question": "Would you rather have police hunting you down for a crime you didn't commit or a serial killer actually hunting you?",
      "a": "a crime you didn't commit",
      "b": "a serial killer actually hunting you"
    },
    {
      "question": "Would you rather live a peaceful life in a small cabin in the woods or a drama-filled life in a mansion in a big city?",
      "a": "a small cabin in the woods",
      "b": "a drama-filled life in a mansion in a big city"
    },
    {
      "question": "Would you rather go back to kindergarten with everything you know now or know now everything your future self will learn?",
      "a": "go back to kindergarten with everything you know now",
      "b": "know now everything your future self will learn"
    },
    {
      "question": "Would you rather take a pill a day for nutrients and to feel full but never eat anything again or eat whatever you want but never really feel full?",
      "a": "never eat anything again",
      "b": "never really feel full"
    },
    {
      "question": "Would you rather never eat your favorite food for the rest of your life or only eat your favorite food?",
      "a": "never eat your favorite food",
      "b": "only eat your favorite food"
    },
    {
      "question": "Would you rather throw the best parties but have to clean up the mess by yourself or never go to a party again?",
      "a": "clean up the mess by yourself",
      "b": "never go to a party again"
    },
    {
      "question": "Would you rather have a tattoo of the title of the last book you read or the last TV show you watched?",
      "a": "the last book you read",
      "b": "the last TV show you watched"
    },
    {
      "question": "Would you rather have the ability to see 10 years into your own future or six months into the future of the world?",
      "a": "10 years into your own future",
      "b": "six months into the future of the world"
    },
    {
      "question": "Would you rather nobody remember who you are at your 20-year class reunion or have everybody comment on how old you look?",
      "a": "nobody remember who you are",
      "b": "have everybody comment on how old you look"
    },
    {
      "question": "Would you rather live through an episode of Orange Is The New Black or Black Mirror?",
      "a": "Orange Is The New Black",
      "b": "Black Mirror"
    },
    {
      "question": "Would you rather be forced to live the same day over and over again for a full year or take three years off the end of your life?",
      "a": "live the same day over and over again",
      "b": "take three years off the end of your life"
    }
  ]