ud.prototype.dg=p(5,function(){return this.wf?this.wf.V():null});te.prototype.dg=p(4,function(){return new Lb(this.width,this.height)});function ao(){var a=Um.f().Uh(),b=V.f().Uh();Rm(a,b)}function bo(a){return 1-Math.pow(1-a,3)}function co(a,b,c,d,f){if(2!=b.length||2!=c.length)throw Error("Start and end points must be 2D");lm.apply(this,arguments)}C(co,lm);
co.prototype.zc=function(){var a=this.Zg&&this.ef()?"right":"left";this.element.style[a]=Math.round(this.coords[0])+"px";this.element.style.top=Math.round(this.coords[1])+"px"};function eo(){T.call(this);this.wa="";this.Cm=this.mh=null;this.Da=fo;this.ha=!1;this.ub=null;this.Fq=!0;this.pl=null;this.so=!1;new Uf(this.$e,3E3,this)}C(eo,T);s(eo);e=eo.prototype;e.He=function(a){this.g().a(a,"mouseover",this.Kn);this.g().a(a,"mouseout",this.Jn)};
e.detach=function(a){this.g().R(a,"mouseover",this.Kn);this.g().R(a,"mouseout",this.Jn)};e.d=function(){var a=this.w(),b=a.d("div","tooltip-arrow-l"),c=a.d("div","tooltip-arrow-r"),d=a.d("div","tooltip-arrow-b"),f=a.d("div","tooltip-arrow-t"),g=a.d("div","tooltip-body"),h=a.d("div","tooltip-actions"),a=a.d("div","tooltip-cntr",[b,c,d,f,g,h]);this.o(a)};
e.o=function(a){eo.c.o.call(this,a);this.Cm=a.querySelector(".tooltip-actions");this.mh=a.querySelector(".tooltip-body");this.wa&&(this.mh.innerHTML=this.wa);this.so=a=this.so;null!==this.b()&&L(this.b(),"simple",a);go(this);this.setVisible(this.ha);this.ub=new co(this.b(),[0,0],[0,0],500,bo)};e.Yj=function(a,b){L(this.b(),a,b)};e.e=function(){eo.c.e.call(this);this.g().a(this,"action",this.Xh);this.g().a(window,"scroll",this.lg)};e.Xh=function(a){"close"==a.target.name&&(this.setVisible(!1),this.dispatchEvent("close"))};
e.Kn=function(a){var b=a.currentTarget,c=a.relatedTarget;a.relatedTarget&&!uc(b,c)&&(ho(this,a.currentTarget),this.setVisible(!0))};e.Jn=function(a){var b=a.currentTarget,c=a.relatedTarget;a.relatedTarget&&!uc(b,c)&&this.setVisible(!1)};e.lg=function(){if(this.X()&&this.pl){var a=io(this,this.pl);He(this.b(),a)}};e.$e=function(){this.setVisible(!1)};e.dg=function(){return Je(this.b())};e.getPosition=function(){return De(this.b())};
function io(a,b){if(a.Nb)return null;var c=a.dg(),d;if(x(b)){var f=b?document.body.querySelectorAll(b):null;if(!f||0==f.length)throw Error("No matching element for selector "+b);d=f}else d=[b];var f=De(d[0]),g=Je(d[0]);if(a.Da&jo||a.Da&ko)f.y+=(g.height-c.height)/2;if(a.Da&lo||a.Da&mo)f.x+=(g.width-c.width)/2;1<d.length&&a.Da&jo&&a.Da&ko?(g=De(d[1]),f.x=Math.round((g.x+f.x)/2-c.width/2)):a.Da&jo?f.x+=g.width+10:a.Da&ko?f.x-=c.width+10:a.Da&lo?f.y+=g.height+10:a.Da&mo?f.y-=c.height+10:0===a.Da&&(f.x+=
(g.width-c.width)/2,f.y+=(g.height-c.height)/2);var g=gc(document),h=fc();f.x=Math.max(0,f.x);f.x=Math.min(g.x+h.width-c.width,f.x);g=d[0];d=Je(g);g=De(g);if(a.Da&lo||a.Da&mo)a.b().querySelector(a.Da&lo?".tooltip-arrow-t":".tooltip-arrow-b").style.left=d.width<c.width?g.x-f.x+d.width/2+"px":"50%";return f}e.X=function(){return Hb(this.b(),"visible")};function ho(a,b){a.pl=b;var c=io(a,b);c&&a.setPosition(c,void 0)}
e.setPosition=function(a,b){if(this.Fq){1==this.ub.C&&this.ub.stop();if(!this.X()&&!b){var c=new M(0,0);this.Da&jo?c.x=20:this.Da&ko?c.x=-20:this.Da&lo?c.y=20:this.Da&mo&&(c.y=-20);b=c}var c=this.b(),c=new M(c.offsetLeft,c.offsetTop),d=Kb(this.getPosition(),c),d=Kb(a,d);b&&(c=new M(d.x+b.x,d.y+b.y));He(this.b(),a);this.ub.yf=[c.x,c.y];this.ub.setEndPoint([d.x,d.y]);this.ub.play()}else He(this.b(),a)};function no(a,b){a.se(!0);E(b,function(a){this.F(a);a.L(this.Cm)},a)}
e.setVisible=function(a){this.ha=a;this.b()&&(L(this.b(),"visible",a),a||(this.b().style.left="-1000px",this.b().style.top="-1000px"))};function go(a){var b=a.b();b&&(Fb(b,"left","bottom","top","right","align-right","align-left"),a=a.Da,a&lo&&K(b,"top"),a&ko&&K(b,"right"),a&mo&&K(b,"bottom"),a&jo&&K(b,"left"))}var fo=0,lo=1,ko=2,mo=4,jo=8;var oo={searchtree:[{title:"Group",type:"folder",children:[{title:"#todo",type:"request",query:"/entries?query\x3d#todo"}]},{title:"#demo",type:"request",query:"/entries?query\x3d#demo"}],entries:["Use hashtags to sort your Entries #demo","You can use the hashtag #todo to mark all your todo-items for example. #demo",'Do you want to remove all example entries? --\x3e Create a new column with the search for #demo and select "Delete all entries."',"#work #todo some work task","#private private information"],
"open-lists":["#demo","#todo"],"intro-tour":[{ad:".entry-list-container",body:"Entrylists are used to diplay one kind of entries.\x3cbr /\x3e This column displays your latest entries.",direction:fo,Jd:!1},{ad:".page-header .icon-add",body:"Click here to add a new entry.",direction:lo,Jd:!0},{ad:".entry-editor-body",body:"Insert some text for your new entry.",direction:lo,Jd:!1},{ad:".module-bottom-holder",body:"Might want to add some more hashtags?",direction:mo,Jd:!0},{ad:".helper-tile-btns",body:"Use the helpers to specify your informations.",
direction:ko,Jd:!0},{ad:".saved-info",body:"All changes are saved automatically while you are editing.",direction:ko,Jd:!1},{ad:".save-btn",body:"Finish the editing and close the editor.",direction:mo,Jd:!0},{ad:".search-box",body:"Use the search to find your entries and to create new columns.",direction:lo,Jd:!0}]},po=oo,po={searchtree:[{title:"Gruppierung",type:"folder",children:[{title:"#todo",type:"request",query:"/entries?query\x3d#todo"}]},{title:"#demo",type:"request",query:"/entries?query\x3d#demo"}],
entries:["Mit hashtags können Einträge sortiert werden #demo.","Der Hashtag #todo könnte so zum Beispiel alle zu erledigende Aufgaben grupieren #demo.",'Du möchtest alle Beispieleinträge löschen? -\x3e Erstelle eine neue Spalte mit der Suche nach #demo und wähle "Alle Einträge löschen."'],"open-lists":["#demo","#todo"],"intro-tour":oo["intro-tour"]};function qo(){return'\x3cdiv class\x3d"layer intro-layer"\x3e\x3cdiv class\x3d"close"\x3e\x3c/div\x3e\x3ch2\x3eWillkommen bei Hash5\x3c/h2\x3e\x3cdiv class\x3d"intro-text"\x3easdf\x3cbr /\x3e\x3cbr /\x3e\x3ch3\x3eNeu bei Hash5?\x3c/h3\x3e\x3cp\x3eMache die Introtour um eine Einführung zu bekommen:\x3c/p\x3e\x3c/div\x3e\x3cbutton class\x3d"btn enabled primary btn-start"\x3eIntrotour starten\x3c/button\x3e\x3cbutton class\x3d"btn enabled btn-cancel right"\x3eohne Tour starten\x3c/button\x3e\x3c/div\x3e'}
;function ro(a,b,c){T.call(this);this.wa=a;this.name=b;this.It=c||""}C(ro,T);ro.prototype.d=function(){var a=this.w().d("span","tooltip-action "+this.It,this.wa);this.o(a)};ro.prototype.e=function(){ro.c.e.call(this);this.g().a(this.b(),"click",this.Sa)};ro.prototype.Sa=function(){this.dispatchEvent("action")};function so(){O.call(this);this.qb=eo.f();this.qb.J||this.qb.L(document.body);this.bt=po["intro-tour"];this.li=0;this.Dm=[new ro("next","next-tip"),new ro("cancel","cancel-tour","close")];this.q=new S(this);Lc(this,this.q)}C(so,O);so.prototype.start=function(){this.q.a(this.qb,"action",this.Hs);this.Il();this.qb.setVisible(!0)};so.prototype.Hs=function(a){switch(a.target.name){case "next-tip":this.Il();break;case "cancel-tour":this.qb.setVisible(!1),this.p()}};
so.prototype.Il=function(){var a=this.bt[this.li++];if(a){var b=this.qb;b.Da=a.direction;go(b);ho(this.qb,a.ad);var b=this.qb,c=a.body;b.wa=c;b.mh&&(b.mh.innerHTML=c);a.Jd?(a=document.body.querySelector(a.ad),this.q.a(a,"click",this.fu),no(this.qb,[this.Dm[1]])):no(this.qb,this.Dm)}else this.qb.setVisible(!1),this.p()};so.prototype.fu=function(){zd(this.Il,100,this)};function to(){T.call(this)}C(to,T);to.prototype.d=function(){var a=lf(qo);this.o(a)};to.prototype.e=function(){to.c.e.call(this);var a=rf.f();a.setVisible(!0,sf);this.g().a(this.j("btn-start"),"click",this.As).a(this.j("close"),"click",this.close).a(this.j("btn-cancel"),"click",this.close).a(a,"close",this.close)};to.prototype.As=function(){(new so).start();this.close()};to.prototype.close=function(){rf.f().setVisible(!1);this.p()};function uo(){O.call(this)}C(uo,hj);uo.prototype.ma=function(){};uo.prototype.Ep=function(){(new to).L(document.body)};uo.prototype.Ot=function(){function a(){b.nc.respWebclientInit=!0;oh(b);for(var a=po,d=0;d<a["open-lists"].length;d++){var f=a["open-lists"][d],g=tk(f);uk(g,f)}}var b=V.f();b.jp?vo(b,a,this):a();this.Ep()};function vo(a,b,c){function d(){g--;0>=g&&b.call(c)}var f=po;a.nc.searchtree=f.searchtree;ao();a=f.entries;var g=a.length;E(a,function(a){var b=new om;pm(b,a);b.save(d)})}
fj("intro",uo);
//@ sourceURL=/asset/common/js-min/LANG/intro.js