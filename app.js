document.documentElement.classList.add('js');
var WA='918309892421',WA_REVIEW='917702112171';
function openWA(num,msg){window.open('https://wa.me/'+num+'?text='+encodeURIComponent(msg),'_blank','noopener');}
function bookService(s){openWA(WA,"👋 Hi MK HomeCare! I'd like to book: *"+s+"*.\nPlease share availability and confirm the price.");}
function toggleAcc(btn){var it=btn.parentElement,was=it.classList.contains('open');
  document.querySelectorAll('.acc-item.open').forEach(function(c){c.classList.remove('open');c.querySelector('.acc-head').setAttribute('aria-expanded','false');});
  if(!was){it.classList.add('open');btn.setAttribute('aria-expanded','true');}}
function show(id,on){var e=document.getElementById(id);if(e)e.style.display=on?'block':'none';}
function sendWhatsApp(){
  var name=document.getElementById('bName').value.trim(),phone=document.getElementById('bPhone').value.trim(),
  service=document.getElementById('bService').value,area=document.getElementById('bArea').value.trim(),
  date=document.getElementById('bDate').value,slot=document.getElementById('bSlot').value;
  var okPhone=/^\d{10}$/.test(phone);show('bNameErr',!name);show('bPhoneErr',!okPhone);
  var today=new Date().toISOString().slice(0,10),okDate=!date||date>=today;show('bDateErr',!okDate);
  if(!name||!okPhone||!okDate)return;
  try{localStorage.setItem('mk_contact',JSON.stringify({n:name,p:phone,a:area}));}catch(e){}
  var est=estLines(),msg;
  if(est.items.length){msg="👋 Hi MK HomeCare! I'd like to book the following:\n"+est.items.map(function(l){return "• "+l;}).join("\n")+"\n*Estimated total: ₹"+est.total.toLocaleString('en-IN')+" onwards*";}
  else msg="👋 Hi MK HomeCare! I'd like to book a *"+service+"*.";
  msg+="\nName: "+name+"\nPhone: "+phone+(area?"\nArea: "+area:"");
  if(date)msg+="\nPreferred date: "+fmtDate(date);
  if(slot)msg+="\nPreferred time: "+slot;
  msg+="\nPlease confirm availability and final price.";
  openWA(WA,msg);}
function fmtDate(d){var p=d.split('-');return new Date(+p[0],+p[1]-1,+p[2]).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});}
function submitReview(){
  var name=document.getElementById('rName').value.trim(),area=document.getElementById('rArea').value.trim(),
  text=document.getElementById('rText').value.trim(),r=document.querySelector('input[name="rating"]:checked');
  show('rNameErr',!name);show('rTextErr',!text);show('rRatingErr',!r);
  if(!name||!text||!r)return;
  var st={5:'★★★★★',4:'★★★★☆',3:'★★★☆☆',2:'★★☆☆☆',1:'★☆☆☆☆'};
  openWA(WA_REVIEW,"📝 *New Review*\nName: "+name+(area?', '+area:'')+"\nRating: "+st[r.value]+"\nReview: \""+text+"\"");
  show('rSuccess',true);document.getElementById('rName').value='';document.getElementById('rText').value='';
  document.querySelectorAll('input[name="rating"]').forEach(function(x){x.checked=false;});}
document.addEventListener('DOMContentLoaded',function(){
  var mb=document.getElementById('menuBtn'),nl=document.getElementById('navLinks');
  if(mb)mb.addEventListener('click',function(){var o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');});
  if(nl)nl.addEventListener('click',function(e){if(e.target.tagName==='A')nl.classList.remove('open');});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.08});els.forEach(function(el){io.observe(el);});}
  else els.forEach(function(el){el.classList.add('in');});
});

/* ===== Price estimator ===== */
var EST_DATA=[
 {id:'home',label:'🏠 Home',items:[['1 BHK Home Cleaning',2999,'',1],['2 BHK Home Cleaning',3999,'',1],['3 BHK Home Cleaning',4999,'',1]]},
 {id:'bath',label:'🚿 Bathroom',items:[['Bathroom – Standard Clean',399,'/ bathroom',10],['Bathroom – Deep Clean',499,'/ bathroom',10]]},
 {id:'kitchen',label:'🍳 Kitchen',items:[['Kitchen – Empty',1499,'',1],['Kitchen – Occupied',2499,'',1],['Kitchen – With Chimney',2999,'',1],['Kitchen – With Appliances',3499,'',1]]},
 {id:'sofa',label:'🛋️ Sofa & Carpet',items:[['Sofa Cleaning',299,'/ seat',12],['Carpet Cleaning',399,'/ carpet',10],['Dining Table Cleaning',299,'',5],['Mattress Cleaning',499,'/ mattress',10]]},
 {id:'mini',label:'🧹 Mini Services',items:[['Ceiling Fan Cleaning',49,'/ fan',20],['Exhaust Fan Cleaning',149,'/ fan',10],['Refrigerator Cleaning',399,'',3],['Microwave Cleaning',149,'',3],['Chimney Cleaning',499,'',3],['Balcony Cleaning',299,'/ balcony',5],['Wash Basin Cleaning',49,'/ basin',10],['Gas Stove Cleaning',199,'',3],['Trolley & Shelves Cleaning',799,'',3],['Ceiling & Cobweb Dusting',499,'/ room',10],['Door Cleaning',79,'/ door',20],['Terrace Cleaning',499,'',3]]}
];
var estQty={};
function estLines(){var items=[],total=0;EST_DATA.forEach(function(g){g.items.forEach(function(it){var q=estQty[it[0]]||0;if(q>0){items.push(it[0]+" × "+q+" (₹"+(it[1]*q).toLocaleString('en-IN')+")");total+=it[1]*q;}});});return{items:items,total:total};}
function estSet(name,price,max,delta){var q=(estQty[name]||0)+delta;q=Math.max(0,Math.min(max,q));if(q)estQty[name]=q;else delete estQty[name];estRender();}
function el(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
function estBuildTabs(){
  var tabs=document.getElementById('estTabs'),list=document.getElementById('estList');if(!tabs||!list)return;
  EST_DATA.forEach(function(g,i){var b=el('button','est-tab'+(i?'':' on'),g.label);b.type='button';b.setAttribute('data-g',g.id);
    b.addEventListener('click',function(){tabs.querySelectorAll('.est-tab').forEach(function(x){x.classList.remove('on');});b.classList.add('on');estShow(g.id);});tabs.appendChild(b);});
  estShow(EST_DATA[0].id);estRender();
  document.getElementById('estClear').addEventListener('click',function(){estQty={};estRender();});
  document.getElementById('estBook').addEventListener('click',function(){var t=document.getElementById('booking');if(t)t.scrollIntoView({behavior:'smooth'});var n=document.getElementById('bName');if(n)setTimeout(function(){n.focus({preventScroll:true});},600);});
}
var estCur='home';
function estShow(id){estCur=id;var list=document.getElementById('estList');list.textContent='';
  EST_DATA.filter(function(g){return g.id===id;})[0].items.forEach(function(it){
    var row=el('div','est-row'),info=el('div','est-info');info.appendChild(el('b',null,it[0]));info.appendChild(el('span',null,'₹'+it[1].toLocaleString('en-IN')+(it[2]?' '+it[2]:'')+' onwards'));
    var st=el('div','stepper'),m=el('button',null,'−'),q=el('output',null,String(estQty[it[0]]||0)),p=el('button',null,'+');
    m.type=p.type='button';m.setAttribute('aria-label','Remove one '+it[0]);p.setAttribute('aria-label','Add one '+it[0]);q.setAttribute('data-q',it[0]);
    m.addEventListener('click',function(){estSet(it[0],it[1],it[3],-1);});p.addEventListener('click',function(){estSet(it[0],it[1],it[3],1);});
    st.appendChild(m);st.appendChild(q);st.appendChild(p);row.appendChild(info);row.appendChild(st);list.appendChild(row);});}
function estRender(){
  if(!document.getElementById('estList'))return;
  document.querySelectorAll('#estList output').forEach(function(o){o.textContent=String(estQty[o.getAttribute('data-q')]||0);});
  var s=estLines(),box=document.getElementById('estSummary');box.textContent='';
  if(!s.items.length){box.appendChild(el('p','est-empty','Nothing selected yet. Use the + buttons to build your quote.'));}
  else s.items.forEach(function(l){box.appendChild(el('div','est-line',l));});
  document.getElementById('estTotal').textContent='₹'+s.total.toLocaleString('en-IN');
  document.getElementById('estBook').disabled=!s.items.length;
  document.getElementById('estClear').style.visibility=s.items.length?'visible':'hidden';
  var note=document.getElementById('bEstNote');if(note){note.style.display=s.items.length?'block':'none';note.textContent=s.items.length?'🧾 Your estimate ('+s.items.length+' item'+(s.items.length>1?'s':'')+', ₹'+s.total.toLocaleString('en-IN')+' onwards) will be included in your WhatsApp message.':'';}
  var sel=document.getElementById('bService');if(sel)sel.disabled=!!s.items.length;
}
/* ===== Booking form helpers ===== */
document.addEventListener('DOMContentLoaded',function(){
  estBuildTabs();
  var d=document.getElementById('bDate');
  if(d){var t=new Date(),max=new Date();max.setDate(t.getDate()+60);
    var iso=function(x){return new Date(x.getTime()-x.getTimezoneOffset()*60000).toISOString().slice(0,10);};d.min=iso(t);d.max=iso(max);}
  try{var c=JSON.parse(localStorage.getItem('mk_contact')||'null');if(c){if(c.n&&document.getElementById('bName'))document.getElementById('bName').value=c.n;if(c.p&&document.getElementById('bPhone'))document.getElementById('bPhone').value=c.p;if(c.a&&document.getElementById('bArea'))document.getElementById('bArea').value=c.a;}}catch(e){}
});
