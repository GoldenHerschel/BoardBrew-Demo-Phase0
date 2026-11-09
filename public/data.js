/* =====================================================================
   BoardBrew content: games, menu and events.
   Edit the lists below; the page updates itself (counts, filters, menu).
   ===================================================================== */

// Game library from BoardBrew's spreadsheet: [name, min players, max players]
const GAMES = [
["Horrible Therapist",3,8],["The Mind",2,4],["Here To Slay",2,6],["What Do You Meme?",3,8],["Truth Or Drink",2,8],["Superfight",3,10],["Piles",2,8],["Soul Truth",2,6],["The Voting Game",4,10],["Who Can Do It",3,10],
["Monikers",4,16],["A Little Wordy",2,6],["Avalon",5,10],["Art Robbery",2,6],["Traitors Aboard!",3,8],["Happy Little Dinosaurs",2,6],["Bichos Famintos De Poder",2,6],["Trio",3,6],["Coup (Tagalog / English)",2,6],["Cabo",2,6],
["Cover Your Assets",2,6],["One Night Ultimate Werewolf",3,10],["Zombie Kittens",2,5],["Trash Pandas",2,4],["7 Wonders Duel",2,2],["The Resistance",5,10],["Splendor",2,4],["Dixit",3,8],["Starter Set: Dragons of Stormwreck Isle",3,6],["Wingspan",1,5],
["Roll & Write",1,6],["Organ Attack",2,6],["Code Breaking",2,6],["We're Not Really Strangers",2,6],["Cards Against Humanity",4,10],["Cards vs Gravity",2,6],["More Or Less",3,8],["Red Flag Or Green Flag",3,10],["Red Flags: Terrible Dates",3,10],["Herd Mentality",4,20],
["Dumb Ways To Die",2,4],["Skull",3,6],["Muffin Time",2,6],["Texas Hold'Em Poker Set",2,10],["Anomia",3,6],["Ice Breaker",2,10],["Taco Cat Goat Cheese Pizza",2,8],["The Grimwood",3,6],["Sussed?",2,6],["3 Up",2,6],
["Sriracha The Game",2,6],["Deck Cards",2,52],["Talking Hearts",2,6],["Ice Breaker: Best Self",2,10],["Splurt",3,8],["Top Of Mind",3,8],["Deck Of Emotions",2,6],["HDWYG?",2,6],["Date Deck",2,2],["BattleVessel",2,2],
["BattleFleet",2,2],["Dungeon Mayhem",2,4],["Sushi Go!",2,5],["Incohearent",3,8],["Name That Word!",3,8],["Hugot",3,6],["Tapple",2,8],["Tic Tac Toe",2,2],["Foosball",2,4],["Spot It!",2,8],
["Crazy Puzzle Face",1,4],["Heat: Pedal to the Metal",1,6],["Modern Art",3,5],["Can You Name 5?",2,10],["Exploding Kittens",2,5],["Codenames (Duet / Pictures)",2,8],["Mahjong",2,4],["Monopoly",2,8],["Cluedo",2,6],["Scrabble",2,4],
["Wooden Word Game",2,6],["Secret Hitler",5,10],["Sorry Not Sorry",3,10],["The Game of Life",2,6],["Snake & Ladder",2,4],["Azul",2,4],["Cranium",3,12],["Taboo",4,10],["Sequence",2,12],["Wavelength",2,12],
["Hues and Clues",3,10],["Concept",4,12],["Uno Spin",2,10],["Dying Message",3,8],["Catan",3,4],["Playing Cards",2,52],["Classic Bingo Game",2,75],["Mini Bingo Game",2,30],["The Uzzle",1,4],["Lie Detector",2,10],
["Boggle",1,4],["Guess Who?",2,2],["Flipping Chess Match",2,2],["Blokus To Go!",2,4],["4 in a Line (Travel Pack)",2,2],["Chain Game",2,6],["Top Spin",2,4],["Mikado",2,10],["Rubik's Cubes",1,1],["Chess",2,2],
["Crocodile Dentist",2,4],["Uno Cards",2,10],["Uno Stacko",2,10],["Uno",2,10],["Dos Cards",2,10],["Football Game",2,4],["Challenge The Limit",2,10],["Most Likely To...",3,10],["Joking Hazard",3,10],["Poetry Neanderthals",2,12],
["Unstable Unicorns",2,8],["Do You Know Me?",2,6],["First & Last",2,6],["Jenga",1,8],["Tetra Tower",1,8],["Stacking Game",1,6],["Cribbage Wars",2,2],["Yong Juncup",2,10]
];

// Drinks: [name, group, Pawn price, Queen price]. Use -1 when a size isn't sold.
// FLAG: confirm what the Pawn and Queen sizes are (e.g. 12 oz / 16 oz).
const DRINKS = [
["BoardBrewed Coffee","Coffee",-1,89], ["King Americano","Coffee",89,99], ["Victory Cappuccino","Coffee",89,119], ["Latte Lore","Coffee",89,119], ["Caramel Macchiato","Coffee",109,129], ["Spanish Latte","Coffee",109,129], ["Irish Caramel Latte","Coffee",109,129],
["Butterscotch Caramel Latte","Coffee",109,135], ["Cafe Mocha","Coffee",109,135], ["Barista's Bet","Coffee",119,155], ["White Chocolate Mocha","Coffee",119,149], ["Caramel Biscoffee","Coffee",119,149], ["Spanish Biscoffee","Coffee",119,149], ["Dirty Matcha","Coffee",125,145],
["Milk Elixir","Milk",89,99], ["Creamy Matcha","Milk",99,129], ["Checkmate Chocolate","Milk",119,139], ["Matcha Latte","Milk",119,149], ["Strawberry Matcha","Milk",119,149],
["Iced Tea","Refresher",65,89], ["Strawberry Lemonade","Refresher",89,109], ["Peach Lemonade","Refresher",89,109], ["Mango Lemonade","Refresher",89,109],
["Strawberry Mana","Mana",109,129], ["Peach Mana","Mana",109,129], ["Mango Mana","Mana",109,129], ["Peach Mango Mana","Mana",109,129], ["Peach Butterscotch Mana","Mana",109,129], ["Strawberry Caramel Mana","Mana",109,129],
["Strawberry Frost","Frost",109,139], ["White Mocha Frost","Frost",119,139], ["Mocha Frost","Frost",119,139], ["Chocolate Frost","Frost",119,139], ["Matcha Frost","Frost",129,145],
["Strawberry Quest","Winter Quest",99,119], ["Lemon Quest","Winter Quest",99,119], ["Peach Quest","Winter Quest",99,119], ["Mango Quest","Winter Quest",99,119],
];

// Single-price items: [name, group, price]
const SHARING = [
["Iced Tea (pitcher)","For Sharing",199], ["Strawberry Potion","Penalty Potions",199], ["Peach Potion","Penalty Potions",199], ["Peach Mango Potion","Penalty Potions",199],
];
const DRINK_ADDONS = [
["Espresso shot","Drink Add-ons",30], ["Syrup","Drink Add-ons",20], ["Popping boba","Drink Add-ons",10],
];
const BITES = [
["Tuna Pasta","Pasta",119], ["Chicken Alfredo","Pasta",119],
["Beef Pepper Rice","Rice Meals",149], ["Pork Samgyupsal","Rice Meals",129], ["Spicy Pork Samgyupsal","Rice Meals",129], ["Buffalo Chicken","Rice Meals",129], ["Soy Garlic Chicken","Rice Meals",129],
["Plain Salad","Salads",109], ["Chicken & Egg Salad","Salads",109],
["Nachos","Snacks",75],
];
const BITE_ADDONS = [
["Egg","Food Add-ons",20], ["Extra rice","Food Add-ons",20], ["Upgrade to fried rice","Food Add-ons",20], ["Extra fried rice","Food Add-ons",30], ["Cheese","Food Add-ons",20], ["Bottled water","Food Add-ons",15],
];

// Events: [date YYYY-MM-DD, time, title, description, sample?]
// Real events: add a line like ["2026-11-20","7:00 PM","Catan night","Bring your A-game.",false]
// Sample events (sample = true) show a "Sample" tag and are generated for the current months.
const EVENTS_REAL = [
];
