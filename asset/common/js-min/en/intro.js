ud.prototype.eg=p(5,function(){return this.xf?this.xf.V():null});te.prototype.eg=p(4,function(){return new Lb(this.width,this.height)});function bo(){var a=Um.f().Vh(),b=V.f().Vh();Rm(a,b)}function co(a){return 1-Math.pow(1-a,3)}function eo(a,b,c,d,f){if(2!=b.length||2!=c.length)throw Error("Start and end points must be 2D");lm.apply(this,arguments)}C(eo,lm);
eo.prototype.zc=function(){var a=this.$g&&this.ff()?"right":"left";this.element.style[a]=Math.round(this.coords[0])+"px";this.element.style.top=Math.round(this.coords[1])+"px"};function fo(){T.call(this);this.Aa="";this.Am=this.nh=null;this.Da=go;this.ha=!1;this.ub=null;this.vq=!0;this.ql=null;this.qo=!1;new Uf(this.af,3E3,this)}C(fo,T);s(fo);e=fo.prototype;e.Ie=function(a){this.g().a(a,"mouseover",this.In);this.g().a(a,"mouseout",this.Hn)};
e.detach=function(a){this.g().R(a,"mouseover",this.In);this.g().R(a,"mouseout",this.Hn)};e.d=function(){var a=this.w(),b=a.d("div","tooltip-arrow-l"),c=a.d("div","tooltip-arrow-r"),d=a.d("div","tooltip-arrow-b"),f=a.d("div","tooltip-arrow-t"),g=a.d("div","tooltip-body"),h=a.d("div","tooltip-actions"),a=a.d("div","tooltip-cntr",[b,c,d,f,g,h]);this.o(a)};
e.o=function(a){fo.c.o.call(this,a);this.Am=a.querySelector(".tooltip-actions");this.nh=a.querySelector(".tooltip-body");this.Aa&&(this.nh.innerHTML=this.Aa);this.qo=a=this.qo;null!==this.b()&&L(this.b(),"simple",a);ho(this);this.setVisible(this.ha);this.ub=new eo(this.b(),[0,0],[0,0],500,co)};e.Zj=function(a,b){L(this.b(),a,b)};e.e=function(){fo.c.e.call(this);this.g().a(this,"action",this.Yh);this.g().a(window,"scroll",this.mg)};e.Yh=function(a){"close"==a.target.name&&(this.setVisible(!1),this.dispatchEvent("close"))};
e.In=function(a){var b=a.currentTarget,c=a.relatedTarget;a.relatedTarget&&!uc(b,c)&&(io(this,a.currentTarget),this.setVisible(!0))};e.Hn=function(a){var b=a.currentTarget,c=a.relatedTarget;a.relatedTarget&&!uc(b,c)&&this.setVisible(!1)};e.mg=function(){if(this.X()&&this.ql){var a=jo(this,this.ql);He(this.b(),a)}};e.af=function(){this.setVisible(!1)};e.eg=function(){return Je(this.b())};e.getPosition=function(){return De(this.b())};
function jo(a,b){if(a.Mb)return null;var c=a.eg(),d;if(x(b)){var f=b?document.body.querySelectorAll(b):null;if(!f||0==f.length)throw Error("No matching element for selector "+b);d=f}else d=[b];var f=De(d[0]),g=Je(d[0]);if(a.Da&ko||a.Da&lo)f.y+=(g.height-c.height)/2;if(a.Da&mo||a.Da&no)f.x+=(g.width-c.width)/2;1<d.length&&a.Da&ko&&a.Da&lo?(g=De(d[1]),f.x=Math.round((g.x+f.x)/2-c.width/2)):a.Da&ko?f.x+=g.width+10:a.Da&lo?f.x-=c.width+10:a.Da&mo?f.y+=g.height+10:a.Da&no?f.y-=c.height+10:0===a.Da&&(f.x+=
(g.width-c.width)/2,f.y+=(g.height-c.height)/2);var g=gc(document),h=fc();f.x=Math.max(0,f.x);f.x=Math.min(g.x+h.width-c.width,f.x);g=d[0];d=Je(g);g=De(g);if(a.Da&mo||a.Da&no)a.b().querySelector(a.Da&mo?".tooltip-arrow-t":".tooltip-arrow-b").style.left=d.width<c.width?g.x-f.x+d.width/2+"px":"50%";return f}e.X=function(){return Hb(this.b(),"visible")};function io(a,b){a.ql=b;var c=jo(a,b);c&&a.setPosition(c,void 0)}
e.setPosition=function(a,b){if(this.vq){1==this.ub.C&&this.ub.stop();if(!this.X()&&!b){var c=new M(0,0);this.Da&ko?c.x=20:this.Da&lo?c.x=-20:this.Da&mo?c.y=20:this.Da&no&&(c.y=-20);b=c}var c=this.b(),c=new M(c.offsetLeft,c.offsetTop),d=Kb(this.getPosition(),c),d=Kb(a,d);b&&(c=new M(d.x+b.x,d.y+b.y));He(this.b(),a);this.ub.zf=[c.x,c.y];this.ub.setEndPoint([d.x,d.y]);this.ub.play()}else He(this.b(),a)};function oo(a,b){a.te(!0);E(b,function(a){this.D(a);a.L(this.Am)},a)}
e.setVisible=function(a){this.ha=a;this.b()&&(L(this.b(),"visible",a),a||(this.b().style.left="-1000px",this.b().style.top="-1000px"))};function ho(a){var b=a.b();b&&(Fb(b,"left","bottom","top","right","align-right","align-left"),a=a.Da,a&mo&&K(b,"top"),a&lo&&K(b,"right"),a&no&&K(b,"bottom"),a&ko&&K(b,"left"))}var go=0,mo=1,lo=2,no=4,ko=8;var po={searchtree:[{title:"Group",type:"folder",children:[{title:"#todo",type:"request",query:"/entries?query\x3d#todo"}]},{title:"#demo",type:"request",query:"/entries?query\x3d#demo"}],entries:["Use hashtags to sort your Entries #demo","You can use the hashtag #todo to mark all your todo-items for example. #demo",'Do you want to remove all example entries? --\x3e Create a new column with the search for #demo and select "Delete all entries."',"#work #todo some work task","#private private information"],
"open-lists":["#demo","#todo"],"intro-tour":[{ad:".entry-list-container",body:"Entrylists are used to diplay one kind of entries.\x3cbr /\x3e This column displays your latest entries.",direction:go,Jd:!1},{ad:".page-header .icon-add",body:"Click here to add a new entry.",direction:mo,Jd:!0},{ad:".entry-editor-body",body:"Insert some text for your new entry.",direction:mo,Jd:!1},{ad:".module-bottom-holder",body:"Might want to add some more hashtags?",direction:no,Jd:!0},{ad:".helper-tile-btns",body:"Use the helpers to specify your informations.",
direction:lo,Jd:!0},{ad:".saved-info",body:"All changes are saved automatically while you are editing.",direction:lo,Jd:!1},{ad:".save-btn",body:"Finish the editing and close the editor.",direction:no,Jd:!0},{ad:".search-box",body:"Use the search to find your entries and to create new columns.",direction:mo,Jd:!0}]};function qo(){return'\x3cdiv class\x3d"layer intro-layer"\x3e\x3cdiv class\x3d"close"\x3e\x3c/div\x3e\x3ch2\x3eWelcome to Hash5\x3c/h2\x3e\x3cdiv class\x3d"intro-text"\x3easdf\x3cbr /\x3e\x3cbr /\x3e\x3ch3\x3eNew to Hash5?\x3c/h3\x3e\x3cp\x3eTake the Intro Tour to get an introduction:\x3c/p\x3e\x3c/div\x3e\x3cbutton class\x3d"btn enabled primary btn-start"\x3eStart intro tour\x3c/button\x3e\x3cbutton class\x3d"btn enabled btn-cancel right"\x3eStart without tour\x3c/button\x3e\x3c/div\x3e'};function ro(a,b,c){T.call(this);this.Aa=a;this.name=b;this.yt=c||""}C(ro,T);ro.prototype.d=function(){var a=this.w().d("span","tooltip-action "+this.yt,this.Aa);this.o(a)};ro.prototype.e=function(){ro.c.e.call(this);this.g().a(this.b(),"click",this.Sa)};ro.prototype.Sa=function(){this.dispatchEvent("action")};function so(){O.call(this);this.qb=fo.f();this.qb.H||this.qb.L(document.body);this.Ss=po["intro-tour"];this.mi=0;this.Bm=[new ro("next","next-tip"),new ro("cancel","cancel-tour","close")];this.q=new S(this);Lc(this,this.q)}C(so,O);so.prototype.start=function(){this.q.a(this.qb,"action",this.xs);this.Il();this.qb.setVisible(!0)};so.prototype.xs=function(a){switch(a.target.name){case "next-tip":this.Il();break;case "cancel-tour":this.qb.setVisible(!1),this.p()}};
so.prototype.Il=function(){var a=this.Ss[this.mi++];if(a){var b=this.qb;b.Da=a.direction;ho(b);io(this.qb,a.ad);var b=this.qb,c=a.body;b.Aa=c;b.nh&&(b.nh.innerHTML=c);a.Jd?(a=document.body.querySelector(a.ad),this.q.a(a,"click",this.Wt),oo(this.qb,[this.Bm[1]])):oo(this.qb,this.Bm)}else this.qb.setVisible(!1),this.p()};so.prototype.Wt=function(){zd(this.Il,100,this)};function to(){T.call(this)}C(to,T);to.prototype.d=function(){var a=lf(qo);this.o(a)};to.prototype.e=function(){to.c.e.call(this);var a=rf.f();a.setVisible(!0,sf);this.g().a(this.j("btn-start"),"click",this.qs).a(this.j("close"),"click",this.close).a(this.j("btn-cancel"),"click",this.close).a(a,"close",this.close)};to.prototype.qs=function(){(new so).start();this.close()};to.prototype.close=function(){rf.f().setVisible(!1);this.p()};function uo(){O.call(this)}C(uo,hj);uo.prototype.ma=function(){};uo.prototype.Cp=function(){(new to).L(document.body)};uo.prototype.Et=function(){function a(){b.nc.respWebclientInit=!0;oh(b);for(var a=0;a<po["open-lists"].length;a++){var d=po["open-lists"][a],f=tk(d);uk(f,d)}}var b=V.f();b.hp?vo(b,a,this):a();this.Cp()};function vo(a,b,c){function d(){f--;0>=f&&b.call(c)}a.nc.searchtree=po.searchtree;bo();a=po.entries;var f=a.length;E(a,function(a){var b=new om;pm(b,a);b.save(d)})}fj("intro",uo);
//@ sourceURL=/asset/common/js-min/LANG/intro.js