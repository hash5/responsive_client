jj.prototype.Xi=p(15,function(a){a&&!this.Lb&&(kj(this),this.sb=null,this.ka.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),mj(this,d,a))},this));this.Lb=a});function is(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var js=/#/g,ks=/[\#\?@]/g,ls=/[\#\?]/g,ms=/[\#\?:]/g,ns=/[#\/\?@]/g;function os(a,b){return y(a)?encodeURI(a).replace(b,is):null}
function ps(a,b){var c;if(a instanceof ps)this.Lb=u(b)?b:a.Lb,qs(this,a.rf),c=a.qj,rs(this),this.qj=c,c=a.Uf,rs(this),this.Uf=c,ss(this,a.Ii),c=a.Hi,rs(this),this.Hi=c,ts(this,a.ud.L()),c=a.Lh,rs(this),this.Lh=c;else if(a&&(c=Ud(String(a)))){this.Lb=!!b;qs(this,c[1]||"",!0);var d=c[2]||"";rs(this);this.qj=d?decodeURIComponent(d):"";d=c[3]||"";rs(this);this.Uf=d?decodeURIComponent(d):"";ss(this,c[4]);d=c[5]||"";rs(this);this.Hi=d?decodeURIComponent(d):"";ts(this,c[6]||"",!0);c=c[7]||"";rs(this);this.Lh=
c?decodeURIComponent(c):""}else this.Lb=!!b,this.ud=new jj(null,0,this.Lb)}e=ps.prototype;e.rf="";e.qj="";e.Uf="";e.Ii=null;e.Hi="";e.Lh="";e.Bt=!1;e.Lb=!1;
e.toString=function(){var a=[],b=this.rf;b&&a.push(os(b,ns),":");if(b=this.Uf){a.push("//");var c=this.qj;c&&a.push(os(c,ns),"@");a.push(encodeURIComponent(String(b)));b=this.Ii;null!=b&&a.push(":",String(b))}if(b=this.Hi)this.Uf&&"/"!=b.charAt(0)&&a.push("/"),a.push(os(b,"/"==b.charAt(0)?ls:ms));(b=this.ud.toString())&&a.push("?",b);(b=this.Lh)&&a.push("#",os(b,js));return a.join("")};e.L=function(){return new ps(this)};
function qs(a,b,c){rs(a);a.rf=c?b?decodeURIComponent(b):"":b;a.rf&&(a.rf=a.rf.replace(/:$/,""))}function ss(a,b){rs(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.Ii=b}else a.Ii=null}function ts(a,b,c){rs(a);b instanceof jj?(a.ud=b,a.ud.Xi(a.Lb)):(c||(b=os(b,ks)),a.ud=new jj(b,0,a.Lb))}function rs(a){if(a.Bt)throw Error("Tried to modify a read-only Uri");}e.Xi=function(a){this.Lb=a;this.ud&&this.ud.Xi(a);return this};function us(a){a.stopPropagation()}
function vs(){return'\x3cdiv\x3e\x3cdiv class\x3d"upload-form"\x3e\x3cspan class\x3d"small"\x3eUpload new file:\x3c/span\x3e\x3cbr /\x3e\x3cbr /\x3e\x3cbutton class\x3d"btn primary enabled upload-btn"\x3eSelect File\x3c/button\x3e\x3cspan class\x3d"small"\x3eor Drag\x26Drop\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"thumbs"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress hidden"\x3e\x3cdiv class\x3d"progress-bar"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress-bar-status"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'}
function ws(a){return'\x3cdiv\x3e\x3ca href\x3d"'+ef(a.url)+'" target\x3d"_blank"\x3eDownload\x3c/a\x3e\x3c/div\x3e'};function xs(a){Dk.call(this);this.Zn=a}C(xs,Dk);xs.prototype.f=function(){xs.c.f.call(this);var a=af(ws,{url:this.Zn.Cb});this.S().appendChild(a)};xs.prototype.d=function(){xs.c.d.call(this);Db(this.b(),"file-tile")};xs.prototype.Zm=function(){var a=this.Zn.Cb,b=jk(this.ph.fa).indexOf(a);this.dispatchEvent({type:"changed_tag",tagName:"",value:a,Oi:!0,xb:[b,b+a.length]})};var ys=!1,zs="";function As(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
if(navigator.plugins&&navigator.plugins.length){var Bs=navigator.plugins["Shockwave Flash"];Bs&&(ys=!0,Bs.description&&(zs=As(Bs.description)));navigator.plugins["Shockwave Flash 2.0"]&&(ys=!0,zs="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var Cs=navigator.mimeTypes["application/x-shockwave-flash"];(ys=Cs&&Cs.enabledPlugin)&&(zs=As(Cs.enabledPlugin.description))}else try{var Ds=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),ys=!0,zs=As(Ds.GetVariable("$version"))}catch(Es){try{Ds=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),ys=!0,zs="6.0.21"}catch(Fs){try{Ds=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),ys=!0,zs=As(Ds.GetVariable("$version"))}catch(Gs){}}}var Hs=zs;function Is(a,b){T.call(this,b);this.Gr=a;this.n=new R(this);this.Od=new Ed}C(Is,T);e=Is.prototype;e.Aq="window";e.Xq="#000000";e.Tm="sameDomain";function Js(a,b,c){a.zm=y(b)?b:Math.round(b)+"px";a.Kb=y(c)?c:Math.round(c)+"px";a.b()&&De(Ks(a),a.zm,a.Kb)}
e.d=function(){Is.c.d.call(this);var a=this.b(),b;b=G?'\x3cobject classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id\x3d"%s" name\x3d"%s" class\x3d"%s"\x3e\x3cparam name\x3d"movie" value\x3d"%s"/\x3e\x3cparam name\x3d"quality" value\x3d"high"/\x3e\x3cparam name\x3d"FlashVars" value\x3d"%s"/\x3e\x3cparam name\x3d"bgcolor" value\x3d"%s"/\x3e\x3cparam name\x3d"AllowScriptAccess" value\x3d"%s"/\x3e\x3cparam name\x3d"allowFullScreen" value\x3d"true"/\x3e\x3cparam name\x3d"SeamlessTabbing" value\x3d"false"/\x3e%s\x3c/object\x3e':'\x3cembed quality\x3d"high" id\x3d"%s" name\x3d"%s" class\x3d"%s" src\x3d"%s" FlashVars\x3d"%s" bgcolor\x3d"%s" AllowScriptAccess\x3d"%s" allowFullScreen\x3d"true" SeamlessTabbing\x3d"false" type\x3d"application/x-shockwave-flash" pluginspage\x3d"http://www.macromedia.com/go/getflashplayer" %s\x3e\x3c/embed\x3e';
for(var c=G?'\x3cparam name\x3d"wmode" value\x3d"%s"/\x3e':"wmode\x3d%s",c=ua(c,this.Aq),d=this.Od.bb(),f=this.Od.Ja(),g=[],h=0;h<d.length;h++)g.push(encodeURIComponent(String(d[h]))+"\x3d"+encodeURIComponent(String(f[h])));b=ua(b,this.U(),this.U(),"goog-ui-media-flash-object",Aa(this.Gr),Aa(g.join("\x26")),this.Xq,this.Tm,c);a.innerHTML=b;this.zm&&this.Kb&&Js(this,this.zm,this.Kb);this.n.a(this.b(),Lb(Lc),us)};
e.f=function(){if(null!=this.Ep&&!(0<=Ka(Hs,this.Ep)))throw Error("Method not supported");var a=this.s().createElement("div");a.className="goog-ui-media-flash";this.e=a};function Ks(a){return a.b()?a.b().firstChild:null}e.g=function(){Is.c.g.call(this);this.Od=null;this.n.l();this.n=null};e.af=function(){return this.w&&this.b()?Ks(this).readyState&&4==Ks(this).readyState||Ks(this).PercentLoaded&&100==Ks(this).PercentLoaded()?!0:!1:!1};function Ls(){T.call(this)}C(Ls,T);function Ms(a,b,c){this.name=a;this.size=b;this.wl=c};function Ns(){T.call(this);this.Ug=null;this.jm=this.U()+".swf";this.Ko=!1;Os.set(this.jm,this)}C(Ns,Ls);var Os=new Ed;e=Ns.prototype;e.m=function(a){Ns.c.m.call(this,a);a=new Is("asset/third-party/uploader.swf");a.Ep="10.0.45";a.Tm="always";a.Od.set("allowNetworking","all");a.Aq="transparent";a.Od.set("yId",this.jm);a.Od.set("YUIBridgeCallback","YUIBridgeCallback");a.Od.set("YUISwfId",this.jm);a.J(this.b());this.Ug=a};e.d=function(){Ns.c.d.call(this);var a=this.b();Js(this.Ug,a.offsetWidth,a.offsetHeight)};
e.Ih=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ms(a[c].fileReference.name,a[c].fileReference.size,a[c]));return b};e.send=function(a,b,c){try{var d=new ps(a);if(c)for(var f in c){a=d;var g=f,h=c[f];rs(a);a.ud.set(g,h)}for(c=0;c<b.length;c++){var k=b[c].wl;Ks(this.Ug).upload(k.fileId,d.toString(),[],"file"+c)}}catch(l){}};e.Pp=function(a){this.Ko=a;this.Uk&&Ks(this.Ug).setAllowMultipleFiles(a)};
ca("YUI.applyTo",function(a,b,c){a=Os.get(a);c=c[1];switch(c.type){case "swfReady":Ks(a.Ug).setAllowMultipleFiles(a.Ko);break;case "uploadprogress":var d=c.bytesLoaded;c=c.bytesTotal;a.dispatchEvent({type:"progress",gb:0<c?d/c:0});break;case "uploadcompletedata":try{d=td(c.data),a.dispatchEvent({type:"complete",data:d})}catch(f){}break;case "fileselect":a.dispatchEvent({type:"select",files:a.Ih(c.fileList)})}});function Ps(a,b){Q.call(this);this.n=new R(this);var c=a;b&&(c=M(a));this.n.a(c,"dragenter",this.Tt);c!=a&&this.n.a(c,"dragover",this.Ut);this.n.a(a,"dragover",this.Xt);this.n.a(a,"drop",this.Yt)}C(Ps,Q);e=Ps.prototype;e.Tf=!1;e.g=function(){Ps.c.g.call(this);this.n.l()};e.Tt=function(a){var b=a.O.dataTransfer;(this.Tf=!(!b||!(b.types&&(F(b.types,"Files")||F(b.types,"public.file-url"))||b.files&&0<b.files.length)))&&a.preventDefault()};
e.Ut=function(a){this.Tf&&(a.preventDefault(),a.O.dataTransfer.dropEffect="none")};e.Xt=function(a){this.Tf&&(a.preventDefault(),a.stopPropagation(),a=a.O.dataTransfer,a.effectAllowed="all",a.dropEffect="copy")};e.Yt=function(a){this.Tf&&(a.preventDefault(),a.stopPropagation(),a=new Nc(a.O),a.type="drop",this.dispatchEvent(a))};function Qs(){T.call(this);this.Hh=this.Gh=null}C(Qs,Ls);e=Qs.prototype;e.m=function(a){Qs.c.m.call(this,a);this.Hh=this.s().f("input",{type:"file"})};e.d=function(){Qs.c.d.call(this);var a=pb?"touchstart":"click";this.i().a(this.b(),a,this.Wa);this.i().a(this.Hh,"change",this.Xs)};e.Ih=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ms(a[c].name,a[c].size,a[c]));return b};e.Wa=function(){this.Hh.click()};e.ps=function(a){this.dispatchEvent({type:Rs,files:this.Ih(a.O.dataTransfer.files)})};
e.ys=function(a){this.dispatchEvent({type:"complete",data:td(a.target.responseText)})};e.Ks=function(a){a=a.O;this.dispatchEvent({type:"progress",gb:0<a.total?a.loaded/a.total:0})};e.Xs=function(a){this.dispatchEvent({type:"select",files:this.Ih(a.target.files)})};e.send=function(a,b,c){for(var d=new FormData,f=0;f<b.length;f++)d.append("file"+f,b[f].wl);if(c)for(f in c)d.append(f,c[f]);b=new XMLHttpRequest;b.open("POST",a,!0);this.i().a(b,"load",this.ys);this.i().a(b.upload,"progress",this.Ks);b.send(d)};
function Ss(a){var b=document.body;a.Gh&&a.Gh.l();a.Gh=new Ps(b,!0);a.i().a(a.Gh,"drop",a.ps)}e.Pp=function(a){this.Hh.multiple=a?"true":""};var Rs="drop";function Ts(){}Ts.prototype.h=function(){if(!u(Modernizr.filereader)||!u(Modernizr.draganddrop))throw Error("monin.ui.FileUploaderFactory: Modernizr.filereader / Modernizr.draganddrop properties are not defined.");return Modernizr.filereader&&Modernizr.draganddrop&&!G?new Qs:new Ns};function Us(){Dk.call(this);this.Vc=(new Ts).h();this.i().a(this.Vc,"select",this.tq).a(this.Vc,"drop",this.tq).a(this.Vc,"progress",function(a){Vs(this,a.gb)}).a(this.Vc,"complete",this.jt);this.Vc instanceof Qs&&Ss(this.Vc);this.Xk=!1}C(Us,Dk);Us.prototype.f=function(){Us.c.f.call(this);var a=af(vs);this.S().appendChild(a)};Us.prototype.d=function(){Us.c.d.call(this);Db(this.b(),"file-tile");this.Vc.R(this.j("upload-btn"));this.Vc.Pp(!1)};
function Vs(a,b){a.j("progress-bar").style.width=100*b+"%";var c=Math.round(100*b)+"%";a.j("progress-bar-status").innerHTML=c}Us.prototype.tq=function(a){console.log("da");this.Xk||(Eb(this.j("progress"),"hidden"),Db(this.j("upload-form"),"hidden"),this.Xk=!0,Vs(this,0),this.Vc.send("/files",a.files),Ws(this,a.files))};
function Ws(a,b){for(var c=a.j("thumbs"),d=0,f;f=b[d];d++)if(f=f.wl,f.type.match("image.*")){var g=new FileReader;g.onload=function(a){return function(b){var d=document.createElement("span");d.innerHTML=['\x3cimg class\x3d"thumb" src\x3d"',b.target.result,'" title\x3d"',escape(a.name),'"/\x3e'].join("");c.appendChild(d)}}(f);g.readAsDataURL(f)}}Us.prototype.jt=function(a){a=a.data[0];Vs(this,1);this.Xk=!1;this.dispatchEvent({type:"changed_tag",tagName:"",value:a.url})};function Xs(a){this.Cb=a;this.V=""}Xs.prototype.U=function(){this.V||(this.V=this.Cb.substr(this.Cb.lastIndexOf("/")+1));return this.V};Xs.prototype.Bc=function(a,b){Ej("/files/"+this.U(),"DELETE",void 0,a,b)};Xs.prototype.Ib=function(a){return!!a&&a.Cb===this.Cb};function Ys(){this.id="fileParser"}Ys.prototype.parse=function(a){var b=[];(a=a.kc.match(new RegExp("http(s)?://("+Zs.join("|")+")/files/\\w+","ig")))&&(b=Ra(a,function(a){return new Xs(a)}));return b};var Zs=["dev.hash5.com:8080",document.location.host];function $s(a,b){$m.call(this,a,b);this.di="/client/asset/common/img/sprite/attached.png";this.Sb="Files";this.Bn=[]}C($s,$m);$s.prototype.Ta=function(){this.i().a(this.fa,kk,this.Jc);at(this)};$s.prototype.ho=function(){return new Us};$s.prototype.Jc=function(){at(this)};function at(a){var b=a.fa.hd().Rh(Ys);if(!fb(a.Bn,b,function(a,b){return a.Ib(b)})){a.Bn=b;a.Bp();for(var c=0;c<b.length;c++){var d=new xs(b[c]);a.If(d)}}};function bt(){N.call(this)}C(bt,Ri);bt.prototype.ia=function(){lk.h().bd.push($s)};bt.prototype.po=function(a){a=a.target;for(var b=a.vg,c=a.hd().Rh(Ys),d=0;d<c.length;d++)var f=c[d].Cb,b=b.replace(f,'\x3ca href\x3d"'+f+'" target\x3d"_blank" class\x3d"file-link"\x3e\x3c/a\x3e');a.Wl(b)};Qi("files",bt);
//@ sourceURL=/asset/common/js-min/LANG/files.js