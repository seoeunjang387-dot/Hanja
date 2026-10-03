const words=[
 {h:"間",r:"사이 간",m:"사이, 간격",q:"‘간격’과 가장 가까운 한자는?",a:["間","隔","限","界"],e:"間(간)은 사이·간격을 뜻해. 공간뿐 아니라 시간적 간격에도 쓰여."},
 {h:"因",r:"인할 인",m:"원인, 말미암다",q:"‘원인’과 관련된 한자는?",a:["因","由","果","故"],e:"因(인)은 어떤 결과를 낳게 한 원인이나 까닭을 뜻해."},
 {h:"相",r:"서로 상",m:"서로, 모습",q:"‘상호 작용’의 ‘상’은?",a:["相","互","交","合"],e:"相(상)은 서로라는 뜻으로 相互(상호), 相反(상반) 등에 쓰여."},
 {h:"存",r:"있을 존",m:"존재하다, 보존하다",q:"‘존재’의 ‘존’은?",a:["存","在","現","有"],e:"存在(존재)는 ‘있음’을 뜻하고, 存은 존재하다·보존하다의 의미가 있어."},
 {h:"變",r:"변할 변",m:"변하다, 변화",q:"‘변화’의 ‘변’은?",a:["變","化","改","換"],e:"變(변)은 상태가 달라지는 것을 뜻해. 變化(변화), 變數(변수)에서 만날 수 있어."},
 {h:"制",r:"절제할 제",m:"제도, 통제하다",q:"‘제도·통제’에 공통으로 쓰이는 한자는?",a:["制","度","統","規"],e:"制는 일정한 기준으로 다스리거나 제한한다는 뜻. 制度(제도), 統制(통제)에 쓰여."},
 {h:"抽",r:"뽑을 추",m:"뽑다, 추출하다",q:"‘추출’의 ‘추’는?",a:["抽","出","取","選"],e:"抽(추)는 뽑아낸다는 뜻. 抽出(추출)은 필요한 성분을 뽑아내는 것."},
 {h:"範",r:"법 범",m:"범위, 본보기",q:"‘범위·범주’와 관련 있는 한자는?",a:["範","圍","類","域"],e:"範(범)은 본보기·규범의 뜻에서 ‘범위’라는 말에도 쓰여."},
 {h:"均",r:"고를 균",m:"고르다, 평균",q:"‘균등·평균’의 ‘균’은?",a:["均","平","等","平"],e:"均(균)은 고르고 균일하다는 뜻. 均等(균등), 平均(평균)에 쓰여."},
 {h:"觀",r:"볼 관",m:"보다, 관점",q:"‘관점’의 ‘관’은?",a:["觀","點","視","見"],e:"觀(관)은 자세히 바라보거나 관찰한다는 뜻. 觀點(관점), 觀察(관찰)에 쓰여."},
 {h:"媒",r:"중매 매",m:"매개하다",q:"‘매개’의 ‘매’는?",a:["媒","介","連","接"],e:"媒(매)는 사이에서 연결하는 역할을 뜻해. 媒介(매개), 媒體(매체)에 쓰여."},
 {h:"抑",r:"누를 억",m:"누르다, 억제하다",q:"‘억제’의 ‘억’은?",a:["抑","制","壓","禁"],e:"抑(억)은 눌러서 제한한다는 뜻. 抑制(억제)에서 확인할 수 있어."}
];
let state={screen:"home",idx:0,score:0,streak:Number(localStorage.streak||0),mastered:JSON.parse(localStorage.mastered||"[]"),quiz:null};

const $=s=>document.querySelector(s);
function save(){localStorage.streak=state.streak;localStorage.mastered=JSON.stringify(state.mastered)}
function render(){
 document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.screen===state.screen));
 $("#backBtn").style.visibility=state.screen==="home"?"hidden":"visible";
 const s=$("#screen");
 if(state.screen==="home") s.innerHTML=home();
 if(state.screen==="study") s.innerHTML=study();
 if(state.screen==="battle") s.innerHTML=quiz();
 if(state.screen==="collection") s.innerHTML=collection();
}
function home(){
 const done=state.mastered.length;
 return `<div class="screen"><section class="hero"><div class="eyebrow">수능 언어 감각 TRAINING</div><h1>한자를 외우는 게 아니라<br>‘읽히게’ 만들기.</h1><p>국어·사탐·과탐 지문에서 자주 만나는 한자를<br>어휘와 개념으로 연결해서 익혀보자.</p><button class="cta" onclick="go('battle')">오늘의 퀴즈 시작 →</button></section>
 <div class="section"><h2>오늘의 기록</h2><small>${done}/${words.length}개 도감 수집</small></div>
 <div class="streak"><div class="fire">🔥</div><div><strong>${state.streak}일 연속 학습</strong><span>짧게 해도 매일 이어가는 게 핵심!</span><div class="bar"><i style="width:${Math.min(100,done/words.length*100)}%"></i></div></div></div>
 <div class="section"><h2>오늘의 한자</h2><small>3개만 가볍게</small></div>
 <div class="daily">${words.slice(0,3).map(w=>`<div class="card"><div class="hanja">${w.h}</div><div class="reading">${w.r}</div><div class="meaning">${w.m}</div><span class="tag">수능 어휘</span></div>`).join("")}</div></div>`;
}
function study(){
 const w=words[state.idx%words.length];
 return `<div class="screen"><div class="section" style="margin-top:0"><h2>오늘의 카드</h2><small>${state.idx%words.length+1} / ${words.length}</small></div><div class="card" style="text-align:center;padding:36px 20px"><div class="hanja" style="font-size:100px">${w.h}</div><div style="font-weight:900;font-size:20px;margin-top:12px">${w.r}</div><div class="meaning" style="font-size:14px">${w.m}</div><div class="tag">지문에서 만나면 이렇게 읽기</div><p style="line-height:1.7;margin:22px 10px 0;text-align:left;background:#f7f3ec;padding:15px;border-radius:14px">${w.e}</p></div><button class="bigbtn" onclick="nextCard()">다음 카드 →</button></div>`;
}
function nextCard(){state.idx++;render()}
function startQuiz(){state.quiz={n:0,score:0,locked:false,order:[...words].sort(()=>Math.random()-.5).slice(0,5)};render()}
function quiz(){
 if(!state.quiz) return `<div class="screen quiz"><div class="question"><div style="font-size:50px">⚔</div><h1>한자 퀵배틀</h1><p class="muted">5문제 · 뜻과 개념을 연결하기</p></div><div class="choices" style="margin-top:auto"><button class="bigbtn" onclick="startQuiz()">5문제 시작하기</button></div></div>`;
 if(state.quiz.n>=5) return `<div class="screen"><section class="hero"><div class="eyebrow">RESULT</div><h1>퀵배틀 완료.</h1><p>오늘 ${state.quiz.score} / 5개를 맞혔어.</p><button class="cta" onclick="startQuiz()">다시 도전 →</button></section><div class="section"><h2>학습 로그</h2></div><div class="card">틀린 문제는 <b>학습 탭</b>에서 다시 보고, 도감에서 누적 수집 여부를 확인할 수 있어.</div></div>`;
 const w=state.quiz.order[state.quiz.n]; const choices=[...w.a].sort(()=>Math.random()-.5);
 return `<div class="screen quiz"><div class="progress"><i style="width:${state.quiz.n/5*100}%"></i></div><div class="question"><div class="muted">Q${state.quiz.n+1} · 뜻을 연결해봐</div><div class="hanja">${w.h}</div><div class="prompt">${w.q}</div></div><div class="choices">${choices.map(c=>`<button class="choice" onclick="answer(this,'${c.replaceAll("'","")}')">${c}</button>`).join("")}</div></div>`;
}
function answer(btn,c){
 if(state.quiz.locked)return; state.quiz.locked=true;
 const w=state.quiz.order[state.quiz.n]; const ok=c===w.h;
 btn.classList.add(ok?"correct":"wrong"); if(ok){state.quiz.score++; if(!state.mastered.includes(w.h))state.mastered.push(w.h)}
 state.streak=Math.max(1,state.streak||0); save();
 setTimeout(()=>{state.quiz.n++;state.quiz.locked=false;render()},650);
}
function collection(){
 return `<div class="screen"><div class="section" style="margin-top:0"><h2>한자 도감</h2><small>${state.mastered.length} / ${words.length} 수집</small></div><div class="collection-grid">${words.map(w=>{let on=state.mastered.includes(w.h);return `<button class="mini" onclick="openWord('${w.h}')"><div class="hanja">${on?w.h:"?"}</div><small>${on?w.r.split(" ")[1]:"미수집"}</small></button>`}).join("")}</div><div id="detail"></div></div>`;
}
function openWord(h){
 const w=words.find(x=>x.h===h); if(!w)return; const d=$("#detail"); d.innerHTML=`<div class="card" style="margin-top:16px"><div class="hanja">${w.h}</div><b>${w.r}</b><div class="meaning">${w.m}</div><p style="line-height:1.6">${w.e}</p></div>`;
}
function go(x){state.screen=x;if(x==="battle")state.quiz=null;render()}
document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.screen)));
$("#backBtn").addEventListener("click",()=>go("home"));
$("#soundBtn").addEventListener("click",()=>alert("소리 기능은 다음 업데이트에서 추가할 수 있어!"));
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
render();
