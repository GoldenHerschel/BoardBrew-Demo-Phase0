/* ===== Editable data ===== */
// Games from BoardBrew's spreadsheet: [name, min players, max players]
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

// BroadBrew's Drink Menu: [name, tag, pawn price, queen price] (-1 if none)
const DRINKS = [
["BoardBrewed Coffee","Coffee",-1,89], ["King Americano","Coffee",89,99], ["Victory Cappuccino","Coffee",89,119], ["Latte Lore","Coffee",89,119], ["Caramel Macchiatto","Coffee",109,129], ["Spanish Latte","Coffee",109,129], ["Irish Caramel Latte","Coffee",109,129],
["Butterscotch Caramel Latte","Coffee",109,135], ["Cafe Mocha","Coffee",109,135], ["Barista's Bet","Coffee",119,155], ["White Chocolate Mocha","Coffee",119,149], ["Caramel Biscoffee","Coffee",119,149], ["Spanish Biscoffee","Coffee",119,149], ["Dirty Matcha","Coffee",125,145],
["Milk Elixir","Milk",89,99], ["Creamy Matcha","Milk",99,129], ["Checkmate Chocolate","Milk",119,139], ["Matcha Latte","Milk",119,149], ["Strawberry Matcha","Milk",119,149],
["Iced Tea","Refresher",65,89], ["Strawberry Lemonade","Refresher",89,109], ["Peach Lemonade","Refresher",89,109], ["Mango Lemonade","Refresher",89,109],
["Strawberry Mana","Mana",109,129], ["Peach Mana","Mana",109,129], ["Mango Mana","Mana",109,129], ["Peach Mango Mana","Mana",109,129], ["Peach Butterscotch Mana","Mana",109,129], ["Strawberry Caramel Mana","Mana",109,129], 
["Strawberry Frost","Frost",109,139], ["White Mocha Frost","Frost",119,139], ["Mocha Frost","Frost",119,139], ["Chocolate Frost","Frost",119,139], ["Matcha Frost","Frost",129,145], 
["Strawberry Quest","Winter Quest",99,119], ["Lemon Quest","Frost",99,119], ["Peach Quest","Frost",99,119], ["Mango Quest","Frost",99,119]
]
// Drinks for Sharing [name, price]
const SDRINKS = [
["Ice Tea", 199], ["Strawberry Potion",199], ["Peach Potion",199], ["Peach Mango Potion",199]
]
// Add-ons [name, price]
const DRINKADD = [
["Expresso Shot",30], ["Syrup",20], ["Popping Boba",10]
]

// BroadBrew's Bites Menu: [name, tag, price]
const BITES = [
["Tuna Pasta","Pasta",119], ["Chicken Alfredo","Pasta",119], 
["Beef Pepper Rice","Rice Meal",149], ["Pork Samgyupsal","Rice Meal",129], ["Spicy Pork Samgyupsal","Rice Meal",129], ["Buffalo Chicken","Rice Meal",129], ["Soy Garlic Chicken","Rice Meal",129], 
["Plain Salad","Salad",109], ["Chicken & Egg Salad","Salad",109], 
["Nachos","Nachos",75]
]
//Add-ons [name,price]
const BITESADD = [
["Egg",20], ["Rice",20], ["Fried Rice",30], ["Cheese",20], ["Bottled Water",15]
]

// Events: SAMPLE data — replace with BoardBrew's real schedule. Dates are YYYY-MM-DD.
const today0=new Date();today0.setHours(0,0,0,0);
function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function nthWeekday(y,m,wd,n){const d=new Date(y,m,1);d.setDate(1+((wd-d.getDay()+7)%7)+7*(n-1));return d}
function sampleEvents(){
  const out=[];const y=today0.getFullYear(),m=today0.getMonth();
  for(const mm of [m-1,m,m+1,m+2]){
    const base=new Date(y,mm,1),Y=base.getFullYear(),M=base.getMonth();
    for(const n of [1,2,3,4]) out.push({date:iso(nthWeekday(Y,M,5,n)),time:"7:00 PM",title:"Friday game night",desc:"Open tables all night. Staff teach new games."});
    out.push({date:iso(nthWeekday(Y,M,6,2)),time:"2:00 PM",title:"Codenames tournament",desc:"Teams of four. Prizes for the top table."});
    out.push({date:iso(nthWeekday(Y,M,0,4)),time:"12:00 NN",title:"Artist & vendor market",desc:"Local artists, tarot readers and non-food concessionaires."});
  }
  return out;
}
const EVENTS = sampleEvents();

/* ===== Feedback labels ===== */
const fb=document.getElementById("fb");
function setReview(on){document.body.classList.toggle("review-mode",on);fb.setAttribute("aria-pressed",on);fb.textContent=on?"Hide feedback labels":"Show feedback labels";try{localStorage.setItem("bb-review",on?"1":"0")}catch(e){}}
fb.addEventListener("click",()=>setReview(!document.body.classList.contains("review-mode")));
try{if(localStorage.getItem("bb-review")==="1")setReview(true)}catch(e){}

/* ===== Games ===== */
const gq=document.getElementById("g-q"),gn=document.getElementById("g-n"),gs=document.getElementById("g-sort"),gl=document.getElementById("g-list"),gm=document.getElementById("g-meta");
gn.innerHTML='<option value="0">Any</option>'+Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1}${i===11?"+":""} player${i?"s":""}</option>`).join("");
const fits=(g,n)=>!n||(n>=12?g[2]>=12:(g[1]<=n&&g[2]>=n));
function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function renderGames(){
  const q=gq.value.trim().toLowerCase(),n=+gn.value;
  let list=GAMES.filter(g=>fits(g,n)&&(!q||g[0].toLowerCase().includes(q)));
  const s=gs.value;
  list.sort(s==="min"?(a,b)=>a[1]-b[1]||a[0].localeCompare(b[0]):s==="max"?(a,b)=>b[2]-a[2]||a[0].localeCompare(b[0]):(a,b)=>a[0].localeCompare(b[0]));
  gm.textContent=`${list.length} of ${GAMES.length} games`+(n?` for ${n}${n>=12?"+":""} player${n>1?"s":""}`:"");
  const total=list.length;if(!showAll&&total>24)list=list.slice(0,24);
  gMore.hidden=showAll||total<=24;gMore.textContent=`Show all ${total} games`;
  gl.innerHTML=list.length?list.map(g=>`<div class="game"><span>${esc(g[0])}</span><span class="pill">${g[1]===g[2]?g[1]:g[1]+"–"+g[2]} ${g[2]===1?"player":"players"}</span></div>`).join(""):`<div class="empty">No games match. Try another name or group size.</div>`;
}
let showAll=false;const gMore=document.getElementById("g-more");
gMore.addEventListener("click",()=>{showAll=true;renderGames()});
[gq,gn,gs].forEach(el=>el.addEventListener("input",()=>{showAll=false;renderGames()}));

/* Hero finder */
let fN=4;const fOut=document.getElementById("f-n"),fCount=document.getElementById("f-count");
function renderFinder(){fOut.textContent=fN+(fN>=12?"+":"");const c=GAMES.filter(g=>fits(g,fN)).length;fCount.textContent=`${c} games on our shelf fit ${fN}${fN>=12?"+":""} player${fN>1?"s":""}.`}
document.getElementById("f-minus").onclick=()=>{fN=Math.max(1,fN-1);renderFinder()};
document.getElementById("f-plus").onclick=()=>{fN=Math.min(12,fN+1);renderFinder()};
document.getElementById("f-go").addEventListener("click",()=>{gn.value=String(fN);gq.value="";showAll=false;renderGames()});

/* ===== Reservations (2-hour rule) ===== */
const LEAD_HOURS=2, OPEN_HOUR=10, CLOSE_HOUR=22; // opening hours are placeholders until BoardBrew confirms
const rDate=document.getElementById("r-date"),rTime=document.getElementById("r-time"),rPax=document.getElementById("r-pax"),rHint=document.getElementById("r-time-hint"),rErr=document.getElementById("r-err");
rPax.innerHTML=Array.from({length:12},(_,i)=>`<option ${i===3?"selected":""}>${i+1}${i===11?"+":""}</option>`).join("");
function fmtTime(h,m){const ap=h>=12?"PM":"AM";const hh=h%12||12;return `${hh}:${String(m).padStart(2,"0")} ${ap}`}
function earliest(){return new Date(Date.now()+LEAD_HOURS*3600e3)}
function slotDate(dateStr,val){const [y,mo,d]=dateStr.split("-").map(Number);const [h,m]=val.split(":").map(Number);return new Date(y,mo-1,d,h,m)}
function fillTimes(){
  const prev=rTime.value;let html="",first=null;const e=earliest();
  for(let h=OPEN_HOUR;h<CLOSE_HOUR;h++)for(const m of [0,30]){
    const v=`${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
    const ok=!rDate.value||slotDate(rDate.value,v)>=e;
    if(ok&&!first)first=v;
    html+=`<option value="${v}" ${ok?"":"disabled"}>${fmtTime(h,m)}${ok?"":" (too soon)"}</option>`;
  }
  rTime.innerHTML=html;
  const prevOk=prev&&[...rTime.options].some(o=>o.value===prev&&!o.disabled);
  rTime.value=prevOk?prev:(first||"");
  rHint.textContent=first?"":"No times left today. Pick another date.";
}
(function initDate(){const e=earliest();let d=new Date(e);d.setHours(0,0,0,0);
  if(e.getHours()>CLOSE_HOUR-1||(e.getHours()===CLOSE_HOUR-1&&e.getMinutes()>30))d.setDate(d.getDate()+1);
  const t=new Date();rDate.min=iso(t);rDate.value=iso(d);fillTimes()})();
rDate.addEventListener("change",fillTimes);
document.getElementById("rform").addEventListener("submit",ev=>{
  ev.preventDefault();rErr.textContent="";const res=document.getElementById("r-result");res.hidden=true;
  const name=document.getElementById("r-name").value.trim(),phone=document.getElementById("r-phone").value.trim(),note=document.getElementById("r-note").value.trim();
  if(!name)return rErr.textContent="Add your name so we know who the table is for.";
  if(!rDate.value||!rTime.value)return rErr.textContent="Pick a date and time.";
  const when=slotDate(rDate.value,rTime.value);
  if(when<earliest())return rErr.textContent=`Reservations need at least ${LEAD_HOURS} hours' notice. Pick a later time, or walk in.`;
  if(!phone)return rErr.textContent="Add a mobile number so we can reach you.";
  const dateTxt=when.toLocaleDateString("en-PH",{weekday:"long",month:"long",day:"numeric"});
  document.getElementById("r-msg").textContent=`Hi BoardBrew! I'd like to reserve a table.\nName: ${name}\nDate: ${dateTxt}\nTime: ${fmtTime(when.getHours(),when.getMinutes())}\nGroup size: ${rPax.value}\nMobile: ${phone}`+(note?`\nNotes: ${note}`:"");
  res.hidden=false;
});
document.getElementById("r-copy").addEventListener("click",e=>{const t=document.getElementById("r-msg"),b=e.currentTarget;
  navigator.clipboard.writeText(t.textContent).then(()=>b.textContent="Copied").catch(()=>{const r=document.createRange();r.selectNodeContents(t);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selected, press copy"})});

/* ===== Calendar ===== */
let cY=today0.getFullYear(),cM=today0.getMonth(),cSel=null;
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function renderCal(){
  document.getElementById("c-title").textContent=`${MONTHS[cM]} ${cY}`;
  const first=new Date(cY,cM,1).getDay(),days=new Date(cY,cM+1,0).getDate();
  const prefix=`${cY}-${String(cM+1).padStart(2,"0")}`;
  const monthEv=EVENTS.filter(e=>e.date.startsWith(prefix)).sort((a,b)=>a.date.localeCompare(b.date));
  const has=new Set(monthEv.map(e=>e.date));
  let html=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="dow">${d}</div>`).join("");
  for(let i=0;i<first;i++)html+=`<div class="day blank"></div>`;
  for(let d=1;d<=days;d++){const k=`${prefix}-${String(d).padStart(2,"0")}`;
    const cls=["day",has.has(k)?"has":"",k===iso(today0)?"today":"",k===cSel?"sel":""].join(" ");
    html+=has.has(k)?`<button type="button" class="${cls}" data-d="${k}" aria-label="${MONTHS[cM]} ${d}, has events">${d}</button>`:`<div class="${cls}">${d}</div>`}
  const g=document.getElementById("c-grid");g.innerHTML=html;
  g.querySelectorAll("button.day").forEach(b=>b.onclick=()=>{cSel=cSel===b.dataset.d?null:b.dataset.d;renderCal()});
  const shown=cSel?monthEv.filter(e=>e.date===cSel):monthEv;
  document.getElementById("c-list").innerHTML=shown.length?shown.map(e=>{const d=new Date(e.date+"T00:00");
    return `<article class="ev ${cSel?"hl":""}"><div class="date"><small>${MONTHS[d.getMonth()].slice(0,3)}</small><b>${d.getDate()}</b></div><div><span class="time">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]} · ${e.time}</span><h3>${esc(e.title)}</h3><p>${esc(e.desc)}</p></div></article>`}).join(""):`<div class="empty">No events posted for ${MONTHS[cM]} yet.</div>`;
}
document.getElementById("c-prev").onclick=()=>{cM--;if(cM<0){cM=11;cY--}cSel=null;renderCal()};
document.getElementById("c-next").onclick=()=>{cM++;if(cM>11){cM=0;cY++}cSel=null;renderCal()};

/* Copy buttons */
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",()=>{const t=document.getElementById(b.dataset.copy);
  navigator.clipboard.writeText(t.textContent).then(()=>b.textContent="Copied").catch(()=>{const r=document.createRange();r.selectNodeContents(t);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent="Selected"})}));

renderGames();renderFinder();renderCal();