function Nk(a,b){if("function"==typeof a.every)return a.every(b,void 0);if(da(a)||y(a))return Na(a,b,void 0);for(var c=jd(a),d=id(a),f=d.length,g=0;g<f;g++)if(!b.call(void 0,d[g],c&&c[g],a))return!1;return!0}
function Ok(a,b){var c=hd(b);if(a.P()>c)return!1;!(b instanceof sd)&&5<c&&(b=new sd(b));return Nk(a,function(a){var c=b;if("function"==typeof c.contains)a=c.contains(a);else if("function"==typeof c.mc)a=c.mc(a);else if(da(c)||y(c))a=G(c,a);else a:{for(var g in c)if(c[g]==a){a=!0;break a}a=!1}return a})}function Pk(a,b){return a===b}mk.prototype.Tk=p(30,function(a,b){var c=this.Z();c||T(this.a(),!0);we(this.a(),a,b);c||T(this.a(),!1)});
pd.prototype.fb=p(14,function(a,b){if(this===a)return!0;if(this.$!=a.P())return!1;var c=b||Pk;qd(this);for(var d,f=0;d=this.V[f];f++)if(!c(this.get(d),a.get(d)))return!1;return!0});sd.prototype.fb=p(13,function(a){return this.P()==hd(a)&&Ok(this,a)});oj.prototype.fb=p(12,function(a){return a.wb==this.wb&&a.ub==this.ub&&a.nb==this.nb&&a.ea==this.ea&&a.Ha==this.Ha&&a.Ia==this.Ia});
vj.prototype.fb=p(11,function(a){return!(!a||this.getYear()!=a.getYear()||this.getMonth()!=a.getMonth()||this.getDate()!=a.getDate())});zj.prototype.fb=p(10,function(a){return this.getTime()==a.getTime()});pd.prototype.mc=p(9,function(a){for(var b=0;b<this.V.length;b++){var c=this.V[b];if(rd(this.ga,c)&&this.ga[c]==a)return!0}return!1});ri.prototype.mc=p(8,function(a){var b=this.Ma();return G(b,a)});yi.prototype.mc=p(7,function(a){return Ma(this.Db,function(b){return b.l()==a})});
function Qk(a){return a.qa}function Rk(a,b){return a===b}function Sk(a,b){var c=b||new Date(B()),d;if(d=a.getDate()==c.getDate())if(c=c||new Date(B()),d=a.getMonth()==c.getMonth())c=c||new Date(B()),d=a.getFullYear()==c.getFullYear();return d}
function Tk(a){return a=""+('\x3cdiv class\x3d"helper-tile"\x3e\x3ch3\x3e\x3cimg src\x3d"'+dg(a.icon)+'" class\x3d"icon" /\x3e'+dg(a.title)+'\x3c/h3\x3e\x3cdiv class\x3d"remove-btn" data-tooltip\x3d"Löschen"\x3e\x3c/div\x3e\x3cdiv class\x3d"helper-tile-content"\x3e\x3c/div\x3e\x3c/div\x3e')}function Uk(a,b,c){if(!da(a)||!da(b)||a.length!=b.length)return!1;var d=a.length;c=c||Rk;for(var f=0;f<d;f++)if(!c(a[f],b[f]))return!1;return!0}function Vk(){U.call(this);this.Ig=null}C(Vk,U);e=Vk.prototype;
e.f=function(){var a=$f(Tk,{title:this.Ig.Yb,icon:this.Ig.Qj});this.p(a)};e.U=function(){return this.A("helper-tile-content")};e.g=function(){Vk.c.g.call(this);this.h().b(this.A("remove-btn"),"click",this.br)};e.br=function(){this.dispatchEvent("close");this.k()};e.xs=function(a){this.Ig=a;a.ps(this)};function Wk(){}C(Wk,zf);t(Wk);Wk.prototype.f=function(a){var b=a.r().f("span",this.sc(a).join(" "));Xk(this,b,a.Lc);return b};Wk.prototype.O=function(a,b){b=Wk.c.O.call(this,a,b);var c=Te(b),d=Yk;G(c,Zk(this,$k))?d=$k:G(c,Zk(this,al))?d=al:G(c,Zk(this,Yk))&&(d=Yk);a.Lc=d;W(b,"checked",d==$k?"mixed":d==al?"true":"false");return b};Wk.prototype.Nb=function(){return"checkbox"};
function Xk(a,b,c){if(b){var d=Zk(a,c);Ue(b,d)||(yb(bl,function(a){a=Zk(this,a);a==d?Ve(b,a):Xe(b,a)},a),W(b,"checked",c==$k?"mixed":c==al?"true":"false"))}}Wk.prototype.D=function(){return"goog-checkbox"};function Zk(a,b){var c=a.D();if(b==al)return c+"-checked";if(b==Yk)return c+"-unchecked";if(b==$k)return c+"-undetermined";throw Error("Invalid checkbox state: "+b);};function cl(a,b,c){c=c||Wk.i();X.call(this,null,c,b);this.Lc=u(a)?a:Yk}C(cl,X);var al=!0,Yk=!1,$k=null,bl={Ys:al,ft:Yk,gt:$k};e=cl.prototype;e.Ya=null;e.Hd=function(){return this.Lc==al};e.Ye=function(a){a!=this.Lc&&(this.Lc=a,Xk(this.n,this.a(),this.Lc))};e.qo=function(a){this.v?(this.la(),this.Ya=a,this.g()):this.Ya=a};e.toggle=function(){this.Ye(this.Lc?Yk:al)};
e.g=function(){cl.c.g.call(this);if(this.kh){var a=this.h();this.Ya&&a.b(this.Ya,"click",this.Aj).b(this.Ya,"mouseover",this.mh).b(this.Ya,"mouseout",this.lh).b(this.Ya,"mousedown",this.ac).b(this.Ya,"mouseup",this.Uc);a.b(this.a(),"click",this.Aj)}if(this.Ya){if(!this.Ya.id){var a=this.Ya,b;b=this.ca()+".lbl";a.id=b}a=this.a();W(a,"labelledby",this.Ya.id)}};e.Aa=function(a){cl.c.Aa.call(this,a);if(a=this.a())a.tabIndex=this.isEnabled()?0:-1};
e.Aj=function(a){a.stopPropagation();var b=this.Lc?"uncheck":"check";this.isEnabled()&&!a.target.href&&this.dispatchEvent(b)&&(a.preventDefault(),this.toggle(),this.dispatchEvent("change"))};e.Ob=function(a){32==a.keyCode&&this.Aj(a);return!1};Ye("goog-checkbox",function(){return new cl});function dl(a,b,c){cl.call(this,a,b,c);this.ta=""}C(dl,cl);e=dl.prototype;e.p=function(a){dl.c.p.call(this,a);this.ta=Aj(a)};e.Df=function(){return this.ta};e.l=function(){return this.Hd()?"1":"0"};e.reset=function(){this.Ye(!1)};e.jd=function(a){L(this.a(),"invalid",a)};e.Ze=function(a){u(a.L)&&(this.ta=a.L)};e.I=function(a){this.Ye(1==a)};Ye("checkbox",function(){return new dl});function el(a,b){this.Ba=a;this.ya=b}var fl=new vj(0,0,1),gl=new vj(9999,11,31);el.prototype.contains=function(a){return a.valueOf()>=this.Ba.valueOf()&&a.valueOf()<=this.ya.valueOf()};var hl={gp:"y",jt:"y G",kt:"MMM y",hp:"MMMM y",$s:"MMM d",at:"MMMM dd",ct:"M/d",bt:"MMMM d",dt:"MMM d, y",ht:"EEE, MMM d",it:"EEE, MMM d, y",Zs:"d"},il=hl,il=hl;function jl(a,b){this.rp=a;this.C=b||Gb()}jl.prototype.r=function(){return this.C};jl.prototype.q=function(){return this.rp};function kl(a,b,c,d){var f=[a.q()+"-btn"];d&&f.push(d);d=a.r().createElement("BUTTON");d.className=f.join(" ");d.appendChild(a.r().createTextNode(c));b.appendChild(d)};function ll(a,b,c,d){U.call(this,c);this.ic=b||Z;this.Us=this.ic.yl;b=Z;Z=this.ic;this.xr=new Ik("d");this.wr=new Ik("dd");this.zr=new Ik("w");this.Pj=new Ik(il.gp||"y");this.yr=new Ik(il.hp||"MMMM y");Z=b;this.n=d||new jl(this.q(),this.r());this.ja=new vj(a);this.ja.Bf=this.ic.yi;this.ja.Rc=this.ic.xi;this.pa=this.ja.N();this.pa.setDate(1);this.ti="      ".split(" ");this.ti[this.ic.Al[0]]=this.q()+"-wkend-start";this.ti[this.ic.Al[1]]=this.q()+"-wkend-end";this.Le={}}C(ll,U);e=ll.prototype;
e.wo=!0;e.Cs=!0;e.nl=new el(fl,gl);e.$p=!0;e.Xk=!0;e.Co=!0;e.Gi=!0;e.Bo=!0;e.Do=!1;e.pm=null;e.Nr=!1;e.Tg=null;e.Sg=null;e.Rg=null;e.wp=Je.i();e.q=function(){return"goog-date-picker"};e.Zn=function(){this.pa.add(new oj(rj,-1));ml(this);nl(this)};e.Hn=function(){this.pa.add(new oj(rj,1));ml(this);nl(this)};e.os=function(){this.pa.add(new oj(qj,-1));ml(this);nl(this)};e.Yr=function(){this.pa.add(new oj(qj,1));ml(this);nl(this)};e.oo=function(){this.setDate(new vj)};e.no=function(){this.Gi&&this.setDate(null)};
e.getDate=function(){return this.ja&&this.ja.N()};e.setDate=function(a){var b=a==this.ja||a&&this.ja&&a.getFullYear()==this.ja.getFullYear()&&a.getMonth()==this.ja.getMonth(),c=a==this.ja||b&&a.getDate()==this.ja.getDate();this.ja=a&&new vj(a);a&&(this.pa.set(this.ja),this.pa.setDate(1));ml(this);this.dispatchEvent(new ol("select",this,this.ja));c||this.dispatchEvent(new ol("change",this,this.ja));b||nl(this)};
function pl(a,b,c,d){b=Lb(c,b);a.h().b(b,"click",function(a){a.preventDefault();d.call(this,a)})}
e.p=function(a){ll.c.p.call(this,a);Ve(a,this.q());var b=this.C.createElement("table"),c=this.C.createElement("thead"),d=this.C.createElement("tbody"),f=this.C.createElement("tfoot");xf(d,"grid");d.tabIndex="0";this.cl=d;this.Ko=f;var g=this.C.createElement("tr");g.className=this.q()+"-head";if(this.Tg=g){for(var h=this.Tg;h.firstChild;)h.removeChild(h.firstChild);var k=this.n,l=this.Xk,n=this.ic.lf[0].toLowerCase(),s;this.Do?(n=k.r().createElement("TD"),n.colSpan=l?1:2,kl(k,n,"«",k.q()+"-previousMonth"),
h.appendChild(n),n=k.r().createElement("TD"),n.colSpan=l?6:5,n.className=k.q()+"-monthyear",h.appendChild(n),n=k.r().createElement("TD"),kl(k,n,"»",k.q()+"-nextMonth"),h.appendChild(n)):(l=k.r().createElement("TD"),l.colSpan=5,kl(k,l,"«",k.q()+"-previousMonth"),kl(k,l,"",k.q()+"-month"),kl(k,l,"»",k.q()+"-nextMonth"),s=k.r().createElement("TD"),s.colSpan=3,kl(k,s,"«",k.q()+"-previousYear"),kl(k,s,"",k.q()+"-year"),kl(k,s,"»",k.q()+"-nextYear"),n.indexOf("y")<n.indexOf("m")?(h.appendChild(s),h.appendChild(l)):
(h.appendChild(l),h.appendChild(s)));this.Do?(pl(this,h,this.q()+"-previousMonth",this.Zn),pl(this,h,this.q()+"-nextMonth",this.Hn),this.Sg=Lb(this.q()+"-monthyear",h)):(pl(this,h,this.q()+"-previousMonth",this.Zn),pl(this,h,this.q()+"-nextMonth",this.Hn),pl(this,h,this.q()+"-month",this.Bs),pl(this,h,this.q()+"-previousYear",this.os),pl(this,h,this.q()+"-nextYear",this.Yr),pl(this,h,this.q()+"-year",this.Ds),this.wd=Lb(this.q()+"-month",h),this.vf=Gb().A(this.q()+"-year",h))}c.appendChild(g);this.Lb=
[];for(k=0;7>k;k++){g=this.C.createElement("tr");this.Lb[k]=[];for(n=0;8>n;n++)h=this.C.createElement(0==n||0==k?"th":"td"),0!=n&&0!=k||n==k||(h.className=0==n?this.q()+"-week":this.q()+"-wday",xf(h,0==n?"rowheader":"columnheader")),g.appendChild(h),this.Lb[k][n]=h;d.appendChild(g)}g=this.C.createElement("tr");g.className=this.q()+"-foot";if(this.Rg=g)h=this.Rg,Wb(h),k=this.n,n=this.Xk,l=k.r().createElement("TD"),l.colSpan=n?2:3,l.className=k.q()+"-today-cont",kl(k,l,"Heute",k.q()+"-today-btn"),h.appendChild(l),
l=k.r().createElement("TD"),l.colSpan=n?4:3,h.appendChild(l),l=k.r().createElement("TD"),l.colSpan=2,l.className=k.q()+"-none-cont",kl(k,l,"None",k.q()+"-none-btn"),h.appendChild(l),pl(this,h,this.q()+"-today-btn",this.oo),pl(this,h,this.q()+"-none-btn",this.no),this.Am=Lb(this.q()+"-today-btn",h),this.zm=Lb(this.q()+"-none-btn",h),T(this.Am,this.Bo),T(this.zm,this.Gi),T(this.Ko,this.Bo||this.Gi);f.appendChild(g);b.cellSpacing="0";b.cellPadding="0";b.appendChild(c);b.appendChild(d);b.appendChild(f);
a.appendChild(b);if(this.a()){if(this.Co)for(b=0;7>b;b++)dc(this.Lb[0][b+1],this.Us[((b+this.pa.Rc+7)%7+1)%7]);T(this.Lb[0][0].parentNode,this.Co)}ml(this);a.tabIndex=0};e.f=function(){ll.c.f.call(this);this.p(this.a())};e.g=function(){ll.c.g.call(this);var a=this.h();a.b(this.cl,"click",this.Hq);a.b(ql(this,this.a()),"key",this.Iq)};e.la=function(){ll.c.la.call(this);this.qe();for(var a in this.Le)this.Le[a].k();this.Le={}};
e.e=function(){ll.c.e.call(this);this.zm=this.Am=this.vf=this.Sg=this.wd=this.Rg=this.Tg=this.Ko=this.cl=this.Lb=null};e.Hq=function(a){if("TD"==a.target.tagName){var b,c=-2,d=-2;for(b=a.target;b;b=b.previousSibling,c++);for(b=a.target.parentNode;b;b=b.previousSibling,d++);a=this.Ae[d][c];this.nl.contains(a)&&this.setDate(a.N())}};
e.Iq=function(a){var b,c;switch(a.keyCode){case 33:a.preventDefault();b=-1;break;case 34:a.preventDefault();b=1;break;case 37:a.preventDefault();c=-1;break;case 39:a.preventDefault();c=1;break;case 38:a.preventDefault();c=-7;break;case 40:a.preventDefault();c=7;break;case 36:a.preventDefault(),this.oo();case 46:a.preventDefault(),this.no();default:return}this.ja?(a=this.ja.N(),a.add(new oj(0,b,c))):(a=this.pa.N(),a.setDate(1));this.nl.contains(a)&&this.setDate(a)};
e.Bs=function(a){a.stopPropagation();a=[];for(var b=0;12>b;b++)a.push(this.ic.mf[b]);rl(this,this.wd,a,this.Tq,this.ic.mf[this.pa.getMonth()])};e.Ds=function(a){a.stopPropagation();a=[];for(var b=this.pa.getFullYear(),c=this.pa.N(),d=-5;5>=d;d++)c.setFullYear(b+d),a.push(this.Pj.format(c));rl(this,this.vf,a,this.tr,this.Pj.format(this.pa))};e.Tq=function(a){a=Number(a.getAttribute("itemIndex"));this.pa.setMonth(a);ml(this);this.wd.focus&&this.wd.focus()};
e.tr=function(a){3==a.firstChild.nodeType&&(a=Number(a.getAttribute("itemIndex")),this.pa.setFullYear(this.pa.getFullYear()+a-5),ml(this));this.vf.focus()};
function rl(a,b,c,d,f){a.qe();var g=a.C.createElement("div");g.className=a.q()+"-menu";a.Te=null;for(var h=a.C.createElement("ul"),k=0;k<c.length;k++){var l=a.C.f("li",null,c[k]);l.setAttribute("itemIndex",k);c[k]==f&&(a.Te=l);h.appendChild(l)}g.appendChild(h);g.style.left=b.offsetLeft+b.parentNode.offsetLeft+"px";g.style.top=b.offsetTop+"px";g.style.width=b.clientWidth+"px";a.wd.parentNode.appendChild(g);a.m=g;a.Te||(a.Te=h.firstChild);a.Te.className=a.q()+"-menu-selected";a.kk=d;b=a.h();b.b(a.m,
"click",a.Ym);b.b(ql(a,a.m),"key",a.Zm);b.b(a.C.J,"click",a.qe);g.tabIndex=0;g.focus()}e.Ym=function(a){a.stopPropagation();this.qe();this.kk&&this.kk(a.target)};
e.Zm=function(a){a.stopPropagation();var b,c=this.Te;switch(a.keyCode){case 35:a.preventDefault();b=c.parentNode.lastChild;break;case 36:a.preventDefault();b=c.parentNode.firstChild;break;case 38:a.preventDefault();b=c.previousSibling;break;case 40:a.preventDefault();b=c.nextSibling;break;case 13:case 9:case 0:a.preventDefault(),this.qe(),this.kk(c)}b&&b!=c&&(c.className="",b.className=this.q()+"-menu-selected",this.Te=b)};
e.qe=function(){if(this.m){var a=this.h();a.H(this.m,"click",this.Ym);a.H(ql(this,this.m),"key",this.Zm);a.H(this.C.J,"click",this.qe);Xb(this.m);delete this.m}};
function ml(a){if(a.a()){var b=a.pa.N();b.setDate(1);a.Sg&&dc(a.Sg,a.yr.format(b));a.wd&&dc(a.wd,a.ic.mf[b.getMonth()]);a.vf&&dc(a.vf,a.Pj.format(b));var c=((b.getDay()+6)%7-b.Rc+7)%7,d=mj(b.getFullYear(),b.getMonth());b.add(new oj(rj,-1));b.setDate(mj(b.getFullYear(),b.getMonth())-(c-1));a.wo&&!a.$p&&33>d+c&&b.add(new oj(pj,-7));c=new oj(pj,1);a.Ae=[];for(d=0;6>d;d++){a.Ae[d]=[];for(var f=0;7>f;f++)a.Ae[d][f]=b.N(),b.add(c)}if(a.a())for(var b=a.pa.getMonth(),f=new vj,c=f.getFullYear(),d=f.getMonth(),
f=f.getDate(),g=0;6>g;g++){a.Xk?(dc(a.Lb[g+1][0],a.zr.format(a.Ae[g][0])),a.Lb[g+1][0].className=a.q()+"-week"):(dc(a.Lb[g+1][0],""),a.Lb[g+1][0].className="");for(var h=0;7>h;h++){var k=a.Ae[g][h],l=a.Lb[g+1][h+1];l.id||(l.id=Ke(a.wp));xf(l,"gridcell");var n=[a.q()+"-date"];a.nl.contains(k)||n.push(a.q()+"-unavailable-date");if(a.Cs||k.getMonth()==b){k.getMonth()!=b&&n.push(a.q()+"-other-month");var s=(h+a.pa.Rc+7)%7;a.ti[s]&&n.push(a.ti[s]);k.getDate()==f&&k.getMonth()==d&&k.getFullYear()==c&&n.push(a.q()+
"-today");a.ja&&k.getDate()==a.ja.getDate()&&k.getMonth()==a.ja.getMonth()&&k.getFullYear()==a.ja.getFullYear()&&(n.push(a.q()+"-selected"),W(a.cl,"activedescendant",l.id));a.pm&&(s=a.pm(k))&&n.push(s);k=a.Nr?a.wr.format(k):a.xr.format(k);dc(l,k)}else dc(l,"");l.className=n.join(" ")}4<=g&&T(a.Lb[g+1][0].parentNode,a.Ae[g][0].getMonth()==b||a.wo)}}}function nl(a){var b=new ol("changeActiveMonth",a,a.pa.N());a.dispatchEvent(b)}
function ql(a,b){var c=ha(b);c in a.Le||(a.Le[c]=new qf(b));return a.Le[c]}function ol(a,b,c){P.call(this,a,b);this.o=c}C(ol,P);function sl(a,b){R.call(this);this.j=new S(this);if(this.Na)throw Error("Can not change this state of the popup while showing.");this.d=a||null;b&&(this.ff=b)}C(sl,R);e=sl.prototype;e.d=null;e.pp=!0;e.Jl=null;e.Na=!1;e.zs=!1;e.dk=-1;e.ur=!1;e.Xp=!0;e.ff="toggle_display";e.ze=function(){return this.ff};e.a=function(){return this.d};e.h=function(){return this.j};e.Z=function(){return this.Na};
e.R=function(a){this.gg&&this.gg.stop();this.Mf&&this.Mf.stop();if(a){if(!this.Na&&this.dispatchEvent("beforeshow")){if(!this.d)throw Error("Caller must call setElement before trying to show the popup");this.Ub();a=N(this.d);this.ur&&this.j.b(a,"keydown",this.$r,!0);if(this.pp)if(this.j.b(a,"mousedown",this.Mn,!0),H){var b;try{b=a.activeElement}catch(c){}for(;b&&"IFRAME"==b.nodeName;){try{var d=cc(b)}catch(f){break}a=d;b=a.activeElement}this.j.b(a,"mousedown",this.Mn,!0);this.j.b(a,"deactivate",this.Ln)}else this.j.b(a,
"blur",this.Ln);"toggle_display"==this.ff?(this.d.style.visibility="visible",T(this.d,!0)):"move_offscreen"==this.ff&&this.Ub();this.Na=!0;this.dk=B();this.gg?(Tc(this.gg,"end",this.Lh,!1,this),this.gg.play()):this.Lh()}}else tl(this)};e.Ub=r;function tl(a,b){if(!a.Na||!a.dispatchEvent({type:"beforehide",target:b}))return!1;a.j&&a.j.vb();a.Na=!1;B();a.Mf?(Tc(a.Mf,"end",ma(a.Xl,b),!1,a),a.Mf.play()):a.Xl(b);return!0}
e.Xl=function(a){"toggle_display"==this.ff?this.zs?ed(this.dn,0,this):this.dn():"move_offscreen"==this.ff&&(this.d.style.top="-10000px");this.dispatchEvent({type:"hide",target:a})};e.dn=function(){this.d.style.visibility="hidden";T(this.d,!1)};e.Lh=function(){this.dispatchEvent("show")};e.Mn=function(a){a=a.target;bc(this.d,a)||this.Jl&&!bc(this.Jl,a)||150>B()-this.dk||tl(this,a)};e.$r=function(a){27==a.keyCode&&tl(this,a.target)&&(a.preventDefault(),a.stopPropagation())};
e.Ln=function(a){if(this.Xp){var b=N(this.d);if("undefined"!=typeof document.activeElement){if(a=b.activeElement,!a||bc(this.d,a)||"BODY"==a.tagName)return}else if(a.target!=b)return;150>B()-this.dk||tl(this)}};e.e=function(){sl.c.e.call(this);this.j.k();tc(this.gg);tc(this.Mf);delete this.d;delete this.j};function ul(a,b){this.ls=4;this.Ak=b||void 0;sl.call(this,a)}C(ul,sl);ul.prototype.Tk=function(a){this.Ak=a||void 0;this.Z()&&this.Ub()};ul.prototype.Ub=function(){if(this.Ak){var a=!this.Z()&&"move_offscreen"!=this.ze(),b=this.a();a&&(b.style.visibility="hidden",T(b,!0));this.Ak.Ub(b,this.ls,this.rt);a&&T(b,!1)}};function vl(a,b){U.call(this,b);this.Ra=a||new ll}C(vl,U);e=vl.prototype;e.Ra=null;e.ec=null;e.Eh=null;e.od=!0;e.f=function(){vl.c.f.call(this);this.a().className="goog-popupdatepicker";this.ec=new ul(this.a());this.ec.Xb(this)};e.Z=function(){return this.ec?this.ec.Z():!1};e.g=function(){vl.c.g.call(this);if(!this.Ra.v){var a=this.a();a.style.visibility="hidden";T(a,!1);this.Ra.O(a)}this.h().b(this.Ra,"change",this.Tf)};
e.e=function(){vl.c.e.call(this);this.ec&&(this.ec.k(),this.ec=null);this.Ra.k();this.Eh=this.Ra=null};e.mb=function(){return!1};e.sj=function(){return this.Ra};e.getDate=function(){return this.Ra.getDate()};e.setDate=function(a){this.Ra.setDate(a)};e.of=function(a){this.h().b(a,"mousedown",this.yo)};e.detach=function(a){this.h().H(a,"mousedown",this.yo)};e.Rk=function(a){this.od=a};
e.yo=function(a){this.Eh=a=a.currentTarget;this.ec.Tk(new Ej(a,5,197));this.h().H(this.Ra,"change",this.Tf);this.Ra.setDate(null);this.dispatchEvent("show");this.h().b(this.Ra,"change",this.Tf);this.ec.R(!0);this.od&&this.a().focus()};e.Lj=function(){this.ec.R(!1);this.od&&this.Eh&&this.Eh.focus()};e.Tf=function(a){this.Lj();this.dispatchEvent(a)};function wl(a,b,c,d){U.call(this,d);this.$i=a;this.nm=b;this.ha=new vl(c,d);this.S(this.ha);this.ha.Rk(!1)}C(wl,U);e=wl.prototype;e.$i=null;e.nm=null;e.ha=null;e.Xn=null;e.sj=function(){return this.ha.sj()};e.getDate=function(){var a=xl(this),b=this.ha.getDate();a&&b?a.fb(b)||this.ha.setDate(a):this.ha.setDate(null);return a};e.setDate=function(a){this.ha.setDate(a)};function yl(a,b){var c=a.a();c.bk?c.bk.I(b):c.value=b}
function xl(a){var b;b=a.a();b=b.bk?b.bk.l():b.value;if(b=sa(b)){var c=new zj;if(0<zl(a.nm,b,c,0,!0))return c}return null}e.f=function(){this.d=this.r().f("input",{type:"text"});this.ha.f()};e.g=function(){wl.c.g.call(this);var a=this.a();(this.Xn||kc(this.r()).body).appendChild(this.ha.a());this.ha.g();this.ha.of(a);this.ha.setDate(xl(this));a=this.h();a.b(this.ha,"change",this.Tf);a.b(this.ha,"show",this.ds)};e.la=function(){wl.c.la.call(this);var a=this.a();this.ha.detach(a);this.ha.la();Xb(this.ha.a())};
e.p=function(a){wl.c.p.call(this,a);this.ha.f()};e.e=function(){wl.c.e.call(this);this.ha.k();this.Xn=this.ha=null};e.Lj=function(){this.ha.Lj()};e.ds=function(){var a=xl(this);this.setDate(a);a&&(a=this.sj().getDate(),yl(this,a?this.$i.format(a):""))};e.Tf=function(a){a=a.o;yl(this,a?this.$i.format(a):"")};function Al(a){Rf.call(this,a);a=new Ik("d.M.y");var b=new Bl("d.M.y");this.Ra=new wl(a,b);sc(this,this.Ra)}C(Al,Rf);Al.prototype.g=function(){Al.c.g.call(this);this.Ra.O(this.a());this.h().b(this.Ra,"change",this.rq)};Al.prototype.rq=function(){this.$g()};Ye("datepicker",function(){return new Al("")});function Cl(a){zj.call(this,a);this.Vc=!1}C(Cl,zj);Cl.prototype.toString=function(){return $.Pp(this)};Cl.prototype.N=function(){var a=new Cl(this.o);a.Vc=this.Vc;return a};function Dl(a){var b=new Cl(2E3);return nj(b,a)?b:null};function Bl(a){this.ba=[];"number"==typeof a?this.zg(a):this.nf(a)}
Bl.prototype.nf=function(a){for(var b=!1,c="",d=0;d<a.length;d++){var f=a.charAt(d);if(" "==f)for(0<c.length&&(this.ba.push({text:c,count:0,ge:!1}),c=""),this.ba.push({text:" ",count:0,ge:!1});d<a.length-1&&" "==a.charAt(d+1);)d++;else if(b)"'"==f?d+1<a.length&&"'"==a.charAt(d+1)?(c+="'",d++):b=!1:c+=f;else if(0<=El.indexOf(f)){0<c.length&&(this.ba.push({text:c,count:0,ge:!1}),c="");var g;g=a.charAt(d);for(var h=d+1;h<a.length&&a.charAt(h)==g;)h++;g=h-d;this.ba.push({text:f,count:g,ge:!1});d+=g-1}else"'"==
f?d+1<a.length&&"'"==a.charAt(d+1)?(c+="'",d++):b=!0:c+=f}0<c.length&&this.ba.push({text:c,count:0,ge:!1});a=!1;for(b=0;b<this.ba.length;b++)Fl(this.ba[b])?!a&&b+1<this.ba.length&&Fl(this.ba[b+1])&&(a=!0,this.ba[b].ge=!0):a=!1};Bl.prototype.zg=function(a){var b;11<a&&(a=10);4>a?b=Z.lf[a]:8>a?b=Z.vg[a-4]:(b=Z.ql[a-8],b=b.replace("{1}",Z.lf[a-8]),b=b.replace("{0}",Z.vg[a-8]));this.nf(b)};Bl.prototype.parse=function(a,b,c){return zl(this,a,b,c||0,!1)};
function zl(a,b,c,d,f){for(var g=new Gl,h=[d],k=-1,l=0,n=0,s=0;s<a.ba.length;s++)if(0<a.ba[s].count)if(0>k&&a.ba[s].ge&&(k=s,l=d,n=0),0<=k){var v=a.ba[s].count;if(s==k&&(v-=n,n++,0==v))return 0;Hl(b,h,a.ba[s],v,g)||(s=k-1,h[0]=l)}else{if(k=-1,!Hl(b,h,a.ba[s],0,g))return 0}else{k=-1;if(" "==a.ba[s].text.charAt(0)){if(v=h[0],Il(b,h),h[0]>v)continue}else if(b.indexOf(a.ba[s].text,h[0])==h[0]){h[0]+=a.ba[s].text.length;continue}return 0}a:if(void 0!=g.Em&&void 0!=g.Jc&&0==g.Em&&0<g.Jc&&(g.Jc=-(g.Jc-1)),
void 0!=g.Jc&&c.setFullYear(g.Jc),a=c.getDate(),c.setDate(1),void 0!=g.Ue&&c.setMonth(g.Ue),void 0!=g.le?c.setDate(g.le):(b=mj(c.getFullYear(),c.getMonth()),c.setDate(a>b?b:a)),z(c.setHours)&&(void 0==g.ea&&(g.ea=c.getHours()),void 0!=g.Hl&&0<g.Hl&&12>g.ea&&(g.ea+=12),c.setHours(g.ea)),z(c.setMinutes)&&void 0!=g.Ha&&c.setMinutes(g.Ha),z(c.setSeconds)&&void 0!=g.Ia&&c.setSeconds(g.Ia),z(c.setMilliseconds)&&void 0!=g.lk&&c.setMilliseconds(g.lk),f&&(void 0!=g.Jc&&g.Jc!=c.getFullYear()||void 0!=g.Ue&&
g.Ue!=c.getMonth()||void 0!=g.le&&g.le!=c.getDate()||24<=g.ea||60<=g.Ha||60<=g.Ia||1E3<=g.lk))c=!1;else{void 0!=g.kl&&c.setTime(c.getTime()+6E4*(g.kl-c.getTimezoneOffset()));g.np&&(f=new Date,f.setFullYear(f.getFullYear()-80),c.getTime()<f.getTime()&&c.setFullYear(f.getFullYear()+100));if(void 0!=g.bj)if(void 0==g.le)g=(7+g.bj-c.getDay())%7,3<g&&(g-=7),f=c.getMonth(),c.setDate(c.getDate()+g),c.getMonth()!=f&&c.setDate(c.getDate()+(0<g?-7:7));else if(g.bj!=c.getDay()){c=!1;break a}c=!0}return c?h[0]-
d:0}var El="GyMdkHmsSEDahKzZvQL";function Fl(a){if(0>=a.count)return!1;var b="MydhHmsSDkK".indexOf(a.text.charAt(0));return 0<b||0==b&&3>a.count}function Il(a,b){var c=a.substring(b[0]).match(/^\s+/);c&&(b[0]+=c[0].length)}
function Hl(a,b,c,d,f){Il(a,b);var g=b[0],h=c.text.charAt(0),k=-1;if(Fl(c))if(0<d){if(g+d>a.length)return!1;k=Jl(a.substring(0,g+d),b)}else k=Jl(a,b);switch(h){case "G":return f.Em=Kl(a,b,Z.rl),!0;case "M":case "L":a:{c=k;if(0>c){c=Kl(a,b,Z.sl.concat(Z.mf).concat(Z.ul).concat(Z.xl));if(0>c){f=!1;break a}f.Ue=c%12}else f.Ue=c-1;f=!0}return f;case "E":return c=Kl(a,b,Z.zl),0>c&&(c=Kl(a,b,Z.wl)),0>c?f=!1:(f.bj=c,f=!0),f;case "a":return f.Hl=Kl(a,b,Z.pl),!0;case "y":a:{var l;if(0>k){l=a.charAt(b[0]);
if("+"!=l&&"-"!=l){f=!1;break a}b[0]++;k=Jl(a,b);if(0>k){f=!1;break a}"-"==l&&(k=-k)}l||2!=b[0]-g||2!=c.count?f.Jc=k:(a=k,b=(new Date).getFullYear()-80,c=b%100,f.np=a==c,a+=100*Math.floor(b/100)+(a<c?100:0),f.Jc=a);f=!0}return f;case "Q":return 0>k?(c=Kl(a,b,Z.tl),0>c&&(c=Kl(a,b,Z.vl)),0>c?f=!1:(f.Ue=3*c,f.le=1,f=!0)):f=!1,f;case "d":return f.le=k,!0;case "S":return a=b[0]-g,f.lk=3>a?k*Math.pow(10,3-a):Math.round(k/Math.pow(10,a-3)),!0;case "h":12==k&&(k=0);case "K":case "H":case "k":return f.ea=
k,!0;case "m":return f.Ha=k,!0;case "s":return f.Ia=k,!0;case "z":case "Z":case "v":a.indexOf("GMT",b[0])==b[0]&&(b[0]+=3);a:if(b[0]>=a.length)f.kl=0,f=!0;else{c=1;switch(a.charAt(b[0])){case "-":c=-1;case "+":b[0]++}g=b[0];k=Jl(a,b);if(0==k&&b[0]==g)f=!1;else{if(b[0]<a.length&&":"==a.charAt(b[0])){l=60*k;b[0]++;g=b[0];k=Jl(a,b);if(0==k&&b[0]==g){f=!1;break a}l+=k}else l=k,l=24>l&&2>=b[0]-g?60*l:l%100+l/100*60;f.kl=-(l*c);f=!0}}return f;default:return!1}}
function Jl(a,b){if(Z.Ai){for(var c=[],d=b[0];d<a.length;d++){var f=a.charCodeAt(d)-Z.Ai;c.push(0<=f&&9>=f?String.fromCharCode(f+48):a.charAt(d))}a=c.join("")}else a=a.substring(b[0]);c=a.match(/^\d+/);if(!c)return-1;b[0]+=c[0].length;return parseInt(c[0],10)}function Kl(a,b,c){var d=0,f=-1;a=a.substring(b[0]).toLowerCase();for(var g=0;g<c.length;g++){var h=c[g].length;h>d&&0==a.indexOf(c[g].toLowerCase())&&(f=g,d=h)}0<=f&&(b[0]+=d);return f}function Gl(){};var $={};$.Op=[new Bl("dd'.'MM'.'yyyy"),new Bl("yyy-MM-dd"),new Bl("yyy/MM/dd")];$.Ls=new Bl("HH:mm");$.kd=function(a){if(!a)return null;var b=new Cl,c=$.js(a,b);0<c&&$.Wn(a.substring(c),b);return 0<c?b:null};$.js=function(a,b){for(var c=$.Op,d=0,f=0;f<c.length&&!(d=zl(c[f],a,b,0,!0),0<d);f++);return d};$.Wn=function(a,b){return 0<zl($.Ls,a,b,0,!0)?b.Vc=!0:!1};$.Fs=function(a,b){var c=$.kd(a);if(!b)return c;if(!c){var d=b.N();0<$.Wn(a,d)&&(c=d)}return c};$.Jr=function(a){return/^\d+$/.test(a)};
$.ks=function(a){var b={};$.Jr(a)?b.index=parseInt(a,10):(b.o=$.kd(a),b.o||(b.Ts="Cannot parse index or date: "+a));return b};$.Pp=function(a){var b=$.aj(a);a.Vc&&(b+=" "+$.ji(a));return b};$.Np=new Ik("d.M.y");$.Ks=new Ik("H:m");$.ji=function(a){return $.Ks.format(a)};$.aj=function(a){return $.Np.format(a)};function Ll(a){Vk.call(this);this.sa=a||null;if(!a){this.sa=a=new Ml;Nl(a,new Cl);var b=new Cl;b.add(new oj(sj,1));Ol(a,b)}this.s=new gf}C(Ll,Vk);
Ll.prototype.g=function(){Ll.c.g.call(this);rb(this.a(),"calendar-tile");this.Ba=Qk(hf(this.s,"","datepicker",{L:"start"}));this.jg=Qk(hf(this.s,"","textbox",{L:"start-time"}));this.Dm=Qk(hf(this.s,"bis","textbox",{L:"end-time"}));this.ya=Qk(hf(this.s,"","datepicker",{L:"end"}));var a=hf(this.s,"All day","checkbox",{L:"all-day"});this.Fl=a.qa;rb(a.a(),"all-day-row");for(var a=[],b=1;30>b;b++)a.push({text:b+" ",dc:b});this.ao=Qk(hf(this.s,"recurrent","checkbox",{L:"recurrent-cb"}));this.Fk=Qk(hf(this.s,
"","select",{L:"recurrent",options:a}));this.Fk.fg(0);this.Ek=Qk(hf(this.s,"","select",{L:"recurrent-type",options:[{text:"daily",dc:"d"},{text:"weekly",dc:"w"},{text:"monthly",dc:"m"},{text:"yearly",dc:"y"}]}));this.Ek.fg(0);this.sa=a=this.sa;var b=this.Ba,c=$.aj(a.Ba);b.I(c);b=this.jg;c=$.ji(a.Ba);b.I(c);b=this.ya;c=$.aj(a.ya);b.I(c);b=this.Dm;c=$.ji(a.ya);b.I(c);b=a.Ba.Vc||a.ya.Vc;this.Fl.I(!b);a.dd&&(c=a.dd,this.Ek.I(c.To),this.Fk.I(c.In),this.ao.I(!0));Pl(this,b,!!a.dd);this.S(this.s,!0);this.h().b(this.s,
"change",this.qq)};Ll.prototype.qq=function(){var a,b,c,d="1"===this.Fl.l();d?(a=$.kd(this.Ba.l()),a.Vc=!0,b=$.kd(this.ya.l()),b.Vc=!0):(a=$.kd(this.Ba.l()+" "+this.jg.l()),b=$.kd(this.ya.l()+" "+this.Dm.l()));Nl(this.sa,a);Ol(this.sa,b);if(a="1"===this.ao.l())c=this.Ek.l(),b=this.Fk.l(),c=new Ql(b,c);b=this.sa;b.dd=c||null;u(void 0)&&(b.He.recurrent=void 0);Rl(this.Ig,this.sa)||Pl(this,!d,a)};
function Pl(a,b,c){L(kf(a.s,"start-time").a(),"hidden",!b);L(kf(a.s,"end-time").a(),"hidden",!b);L(jf(a.s,"recurrent").a(),"hidden",!c);L(jf(a.s,"recurrent-type").a(),"hidden",!c)};function Ql(a,b){this.In=a;this.To=b}Ql.prototype.toString=function(){return this.In+this.To};function Ml(){this.dd=this.ya=this.Ba=null;this.Yg=[];this.Sh=null;this.He={}}function Sl(a){var b=new Ml;b.Ba=a.start?Dl(a.start):null;b.ya=a.end?Dl(a.end):null;var c;if(a.recurrent){c=a.recurrent;var d=0,f="d",g;for(g in c)if(0<c[g]){d=c[g];switch(g){case "days":0===d%7?(f="w",d/=7):f="d";break;case "months":f="m";break;case "years":f="y"}break}c=new Ql(d,f)}else c=null;b.dd=c;b.Sh=a.recend?Dl(a.recend):null;if(x(a.exclude))for(c=0;c<a.exclude.length;c++)b.Yg.push(Dl(a.exclude[c]));return b}
function Nl(a,b,c){a.Ba=b;u(c)&&(a.He.start=c)}function Ol(a,b,c){a.ya=b;u(c)&&(a.He.end=c)}Ml.prototype.fb=function(a){return Tl(this.Ba,a.Ba)&&Tl(this.ya,a.ya)&&Tl(this.Sh,a.Sh)&&Ul(this.Yg,a.Yg)};function Tl(a,b){return a&&!b||!a&&b?!1:!a&&!b||a.fb(b)}function Ul(a,b){return Uk(a,b,function(a,b){return a.fb(b)})};var Vl=$;function Wl(){this.id="calParser"}Wl.prototype.parse=function(a){var b=[],c=a.Qk;if(x(c.cal))for(a=0;a<c.cal.length;a++)b.push(Sl(c.cal[a]));else b=Xl(this,a.Jg);return b};
function Xl(a,b){var c=[],d=new Ml,f=!1;F(b,function(a){if(a.key){var h=a.key.toLowerCase();if("start"===h)Yl(c,d),d=new Ml,Nl(d,Vl.kd(a.value),a.Ge);else if("end"===h)Ol(d,Vl.Fs(a.value,d.Ba),a.Ge);else if("recend"===h){var h=d,k=Vl.kd(a.value);a=a.Ge;h.Sh=k;u(a)&&(h.He.recend=a)}else"recurrent"!==h||f||(f=!0,h=/^(\d+)([dwmy])$/.exec(a.value.toLowerCase()),k=d,a=a.Ge,k.dd=null===h?null:new Ql(parseInt(h[1],10),h[2]),u(a)&&(k.He.recurrent=a),a=Zl(this,b),d.Yg=a)}},a);Yl(c,d);return c}
function Yl(a,b){if(b.Ba&&b.ya){if(b.Ba>b.ya){var c=b.Ba;Nl(b,b.ya);Ol(b,c)}a.push(b)}}function Zl(a,b){var c=Ka(b,function(a){return"exc"===a.key});return La(c,function(a){var b=a.value;(a=/^([^\s,]+)\s*(?:,\s*(\w+))?$/.exec(b))?(b=Vl.ks(a[1]),a[2]&&(b.id=a[2]),a=b):a={Ts:"Cannot parse "+b};return a},a)};function $l(a,b){am.call(this,a,b);this.Qj="/client/asset/common/img/sprite/calender.png";this.Yb="Kalender";this.km=[];this.Mp=!1}C($l,am);$l.prototype.Sa=function(){this.h().b(this.eb,hj,this.Dd);bm(this)};$l.prototype.hq=function(){return new Ll};$l.prototype.Dd=function(){this.Mp||bm(this)};function bm(a){var b=a.eb.xe().Nm(Wl);if(!Uk(a.km,b,function(a,b){return a.fb(b)})){a.km=b;a.qs();for(var c=0;c<b.length;c++){var d=new Ll(b[c]);a.wg(d);a.h().b(d,"close",a.jr)}}console.log(b)}
$l.prototype.jr=function(){};function Rl(a,b){function c(a,c){var k=b.He[c]||null,l=k||[d.length,d.length];!k&&0<a.length&&(a=" #"+c+":"+a);var k=l[0],l=l[1],n=d.substring(0,k+f)+a+d.substring(l+f);f+=a.length-(l-k);d=n}var d=a.eb.kb.l(),f=0;c('"'+b.Ba.toString()+'"',"start");Sk(b.Ba,b.ya)?c($.ji(b.ya),"end"):c('"'+b.ya.toString()+'"',"end");c(b.dd?b.dd.toString():"","recurrent");return d!=a.eb.kb.l()?(a.eb.kb.I(d),!0):!1};function cm(){O.call(this)}C(cm,Zh);cm.prototype.Ga=function(){ij.i().qd.push($l)};Yh("calendar",cm);
//@ sourceURL=/client/asset/common/js-min/LANG/calendar.js