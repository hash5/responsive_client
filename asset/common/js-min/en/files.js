dg.prototype.aj=X(23,function(a){a&&!this.Sb&&(eg(this),this.Bb=null,this.ta.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.setValues(d,a))},this));this.Sb=a});var ks="P T G M K  m u n".split(" ");function ls(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var ms=/#/g,ns=/[\#\?@]/g,os=/[\#\?]/g,ps=/[\#\?:]/g,qs=/[#\/\?@]/g;function rs(a,b){return v(a)?encodeURI(a).replace(b,ls):null}
function ss(a,b){var c;if(a instanceof ss)this.Sb=s(b)?b:a.Sb,ts(this,a.uf),c=a.oj,us(this),this.oj=c,c=a.Xf,us(this),this.Xf=c,vs(this,a.Ki),this.setPath(a.getPath()),ws(this,a.Ed.V()),c=a.Uh,us(this),this.Uh=c;else if(a&&(c=sd(String(a)))){this.Sb=!!b;ts(this,c[1]||"",!0);var d=c[2]||"";us(this);this.oj=d?decodeURIComponent(d):"";d=c[3]||"";us(this);this.Xf=d?decodeURIComponent(d):"";vs(this,c[4]);this.setPath(c[5]||"",!0);ws(this,c[6]||"",!0);c=c[7]||"";us(this);this.Uh=c?decodeURIComponent(c):
""}else this.Sb=!!b,this.Ed=new dg(null,0,this.Sb)}e=ss.prototype;e.uf="";e.oj="";e.Xf="";e.Ki=null;e.gp="";e.Uh="";e.$s=!1;e.Sb=!1;
e.toString=function(){var a=[],b=this.uf;b&&a.push(rs(b,qs),":");if(b=this.Xf){a.push("//");var c=this.oj;c&&a.push(rs(c,qs),"@");a.push(encodeURIComponent(String(b)));b=this.Ki;null!=b&&a.push(":",String(b))}if(b=this.getPath())this.Xf&&"/"!=b.charAt(0)&&a.push("/"),a.push(rs(b,"/"==b.charAt(0)?os:ps));(b=this.Ed.toString())&&a.push("?",b);(b=this.Uh)&&a.push("#",rs(b,ms));return a.join("")};e.V=function(){return new ss(this)};
function ts(a,b,c){us(a);a.uf=c?b?decodeURIComponent(b):"":b;a.uf&&(a.uf=a.uf.replace(/:$/,""))}function vs(a,b){us(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.Ki=b}else a.Ki=null}e.getPath=function(){return this.gp};e.setPath=function(a,b){us(this);this.gp=b?a?decodeURIComponent(a):"":a;return this};function ws(a,b,c){us(a);b instanceof dg?(a.Ed=b,a.Ed.aj(a.Sb)):(c||(b=rs(b,ns)),a.Ed=new dg(b,0,a.Sb))}
function us(a){if(a.$s)throw Error("Tried to modify a read-only Uri");}e.aj=function(a){this.Sb=a;this.Ed&&this.Ed.aj(a);return this};function xs(a){a.stopPropagation()}
function ys(){return'\x3cdiv\x3e\x3cdiv class\x3d"upload-form"\x3e\x3cspan class\x3d"small"\x3eUpload new file:\x3c/span\x3e\x3cbr /\x3e\x3cbr /\x3e\x3cbutton class\x3d"btn primary enabled upload-btn"\x3eSelect File\x3c/button\x3e\x3cspan class\x3d"small"\x3eor Drag\x26Drop\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"thumbs"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress hidden"\x3e\x3cdiv class\x3d"progress-bar"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress-bar-status"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'}
function zs(a){return"\x3cdiv\x3e"+Lj(a.fileName)+" ("+Lj(a.fileSize)+')\x3cbr /\x3e\x3cbr /\x3e\x3ca href\x3d"'+Lj(a.url)+'" target\x3d"_blank"\x3eDownload\x3c/a\x3e\x3c/div\x3e'};function As(a){Wk.call(this);this.fk=a}B(As,Wk);As.prototype.d=function(){As.c.d.call(this);var a=this.fk.kk(),b=a.filename,c;c="";s(!1)||(c="B");var d=a.length,a=d,f="",g=1;0>d&&(d=-d);for(var h=0;h<ks.length;h++){var k=ks[h],g=be[k];if(d>=g||1>=g&&d>0.1*g){f=k;break}}f?c&&(f+=c):g=1;c=Math.pow(10,s(void 0)?void 0:2);c=Math.round(a/g*c)/c+""+f;b={fileName:b,fileSize:c,url:this.fk.getUrl()};b=ee(zs,b);this.S().appendChild(b)};As.prototype.e=function(){As.c.e.call(this);I(this.b(),"file-tile")};
As.prototype.ph=function(){var a=this.fk.getUrl(),b=Tk(this.yh.fa).indexOf(a);this.dispatchEvent({type:"changed_tag",tagName:"",value:a,Gg:!0,jb:[b,b+a.length]})};var Bs=!1,Cs="";function Ds(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
if(navigator.plugins&&navigator.plugins.length){var Es=navigator.plugins["Shockwave Flash"];Es&&(Bs=!0,Es.description&&(Cs=Ds(Es.description)));navigator.plugins["Shockwave Flash 2.0"]&&(Bs=!0,Cs="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var Fs=navigator.mimeTypes["application/x-shockwave-flash"];(Bs=Fs&&Fs.enabledPlugin)&&(Cs=Ds(Fs.enabledPlugin.description))}else try{var Gs=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),Bs=!0,Cs=Ds(Gs.GetVariable("$version"))}catch(Hs){try{Gs=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),Bs=!0,Cs="6.0.21"}catch(Is){try{Gs=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),Bs=!0,Cs=Ds(Gs.GetVariable("$version"))}catch(Js){}}}var Ks=Cs;function Ls(a,b){Q.call(this,b);this.Xq=a;this.s=new P(this);this.de=new fd}B(Ls,Q);e=Ls.prototype;e.kq="window";e.Dq="#000000";e.Mm="sameDomain";function Ms(a,b,c){a.qm=v(b)?b:Math.round(b)+"px";a.Rb=v(c)?c:Math.round(c)+"px";a.b()&&Nj(Ns(a),a.qm,a.Rb)}
e.e=function(){Ls.c.e.call(this);var a=this.b(),b;b=E?'\x3cobject classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id\x3d"%s" name\x3d"%s" class\x3d"%s"\x3e\x3cparam name\x3d"movie" value\x3d"%s"/\x3e\x3cparam name\x3d"quality" value\x3d"high"/\x3e\x3cparam name\x3d"FlashVars" value\x3d"%s"/\x3e\x3cparam name\x3d"bgcolor" value\x3d"%s"/\x3e\x3cparam name\x3d"AllowScriptAccess" value\x3d"%s"/\x3e\x3cparam name\x3d"allowFullScreen" value\x3d"true"/\x3e\x3cparam name\x3d"SeamlessTabbing" value\x3d"false"/\x3e%s\x3c/object\x3e':'\x3cembed quality\x3d"high" id\x3d"%s" name\x3d"%s" class\x3d"%s" src\x3d"%s" FlashVars\x3d"%s" bgcolor\x3d"%s" AllowScriptAccess\x3d"%s" allowFullScreen\x3d"true" SeamlessTabbing\x3d"false" type\x3d"application/x-shockwave-flash" pluginspage\x3d"http://www.macromedia.com/go/getflashplayer" %s\x3e\x3c/embed\x3e';
for(var c=E?'\x3cparam name\x3d"wmode" value\x3d"%s"/\x3e':"wmode\x3d%s",c=ik(c,this.kq),d=this.de.Db(),f=this.de.Ta(),g=[],h=0;h<d.length;h++)g.push(encodeURIComponent(String(d[h]))+"\x3d"+encodeURIComponent(String(f[h])));b=ik(b,this.qa(),this.qa(),"goog-ui-media-flash-object",ya(this.Xq),ya(g.join("\x26")),this.Dq,this.Mm,c);a.innerHTML=b;this.qm&&this.Rb&&Ms(this,this.qm,this.Rb);this.s.a(this.b(),Eb(qc),xs)};
e.d=function(){if(null!=this.sp&&!(0<=Ga(Ks,this.sp)))throw Error("Method not supported");var a=this.w().createElement("div");a.className="goog-ui-media-flash";this.h=a};function Ns(a){return a.b()?a.b().firstChild:null}e.i=function(){Ls.c.i.call(this);this.de=null;this.s.p();this.s=null};e.ff=function(){return this.H&&this.b()?Ns(this).readyState&&4==Ns(this).readyState||Ns(this).PercentLoaded&&100==Ns(this).PercentLoaded()?!0:!1:!1};function Os(){Q.call(this)}B(Os,Q);function Ps(a,b,c){this.name=a;this.size=b;this.pl=c};function Qs(){Q.call(this);this.Xg=null;this.Yl=this.qa()+".swf";this.qo=!1;Rs.set(this.Yl,this)}B(Qs,Os);var Rs=new fd;e=Qs.prototype;e.o=function(a){Qs.c.o.call(this,a);a=new Ls("asset/third-party/uploader.swf");a.sp="10.0.45";a.Mm="always";a.de.set("allowNetworking","all");a.kq="transparent";a.de.set("yId",this.Yl);a.de.set("YUIBridgeCallback","YUIBridgeCallback");a.de.set("YUISwfId",this.Yl);a.L(this.b());this.Xg=a};e.e=function(){Qs.c.e.call(this);var a=this.b();Ms(this.Xg,a.offsetWidth,a.offsetHeight)};
e.Sh=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ps(a[c].fileReference.name,a[c].fileReference.size,a[c]));return b};e.send=function(a,b,c){try{var d=new ss(a);if(c)for(var f in c){a=d;var g=f,h=c[f];us(a);a.Ed.set(g,h)}for(c=0;c<b.length;c++)Ns(this.Xg).upload(b[c].pl.fileId,d.toString(),[],"file"+c)}catch(k){}};e.Cp=function(a){this.qo=a;this.Pk&&Ns(this.Xg).setAllowMultipleFiles(a)};
ca("YUI.applyTo",function(a,b,c){a=Rs.get(a);c=c[1];switch(c.type){case "swfReady":Ns(a.Xg).setAllowMultipleFiles(a.qo);break;case "uploadprogress":var d=c.bytesLoaded;c=c.bytesTotal;a.dispatchEvent({type:"progress",pb:0<c?d/c:0});break;case "uploadcompletedata":try{d=Xc(c.data),a.dispatchEvent({type:"complete",data:d})}catch(f){}break;case "fileselect":a.dispatchEvent({type:"select",files:a.Sh(c.fileList)})}});function Ss(a,b){O.call(this);this.s=new P(this);var c=a;b&&(c=K(a));this.s.a(c,"dragenter",this.rt);c!=a&&this.s.a(c,"dragover",this.st);this.s.a(a,"dragover",this.vt);this.s.a(a,"drop",this.wt)}B(Ss,O);e=Ss.prototype;e.Wf=!1;e.i=function(){Ss.c.i.call(this);this.s.p()};e.rt=function(a){var b=a.Y.dataTransfer;(this.Wf=!(!b||!(b.types&&(D(b.types,"Files")||D(b.types,"public.file-url"))||b.files&&0<b.files.length)))&&a.preventDefault()};
e.st=function(a){this.Wf&&(a.preventDefault(),a.Y.dataTransfer.dropEffect="none")};e.vt=function(a){this.Wf&&(a.preventDefault(),a.stopPropagation(),a=a.Y.dataTransfer,a.effectAllowed="all",a.dropEffect="copy")};e.wt=function(a){this.Wf&&(a.preventDefault(),a.stopPropagation(),a=new sc(a.Y),a.type="drop",this.dispatchEvent(a))};function Ts(){Q.call(this);this.Rh=this.Qh=null}B(Ts,Os);e=Ts.prototype;e.o=function(a){Ts.c.o.call(this,a);this.Rh=this.w().d("input",{type:"file"})};e.e=function(){Ts.c.e.call(this);var a=jb?"touchstart":"click";this.g().a(this.b(),a,this.Ua);this.g().a(this.Rh,"change",this.rs)};e.Sh=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ps(a[c].name,a[c].size,a[c]));return b};e.Ua=function(){this.Rh.click()};e.Dr=function(a){this.dispatchEvent({type:Us,files:this.Sh(a.Y.dataTransfer.files)})};
e.Pr=function(a){this.dispatchEvent({type:"complete",data:Xc(a.target.responseText)})};e.cs=function(a){a=a.Y;this.dispatchEvent({type:"progress",pb:0<a.total?a.loaded/a.total:0})};e.rs=function(a){this.dispatchEvent({type:"select",files:this.Sh(a.target.files)})};e.send=function(a,b,c){for(var d=new FormData,f=0;f<b.length;f++)d.append("file"+f,b[f].pl);if(c)for(f in c)d.append(f,c[f]);b=new XMLHttpRequest;b.open("POST",a,!0);this.g().a(b,"load",this.Pr);this.g().a(b.upload,"progress",this.cs);b.send(d)};
function Vs(a){var b=document.body;a.Qh&&a.Qh.p();a.Qh=new Ss(b,!0);a.g().a(a.Qh,"drop",a.Dr)}e.Cp=function(a){this.Rh.multiple=a?"true":""};var Us="drop";function Ws(){}Ws.prototype.f=function(){if(!s(Modernizr.filereader)||!s(Modernizr.draganddrop))throw Error("monin.ui.FileUploaderFactory: Modernizr.filereader / Modernizr.draganddrop properties are not defined.");return Modernizr.filereader&&Modernizr.draganddrop&&!E?new Ts:new Qs};function Xs(){Wk.call(this);this.cd=(new Ws).f();this.g().a(this.cd,"select",this.dq).a(this.cd,"drop",this.dq).a(this.cd,"progress",function(a){Ys(this,a.pb)}).a(this.cd,"complete",this.Gs);this.cd instanceof Ts&&Vs(this.cd);this.Sk=!1}B(Xs,Wk);Xs.prototype.d=function(){Xs.c.d.call(this);var a=ee(ys);this.S().appendChild(a)};Xs.prototype.e=function(){Xs.c.e.call(this);I(this.b(),"file-tile");this.cd.Z(this.j("upload-btn"));this.cd.Cp(!1)};
function Ys(a,b){a.j("progress-bar").style.width=100*b+"%";var c=Math.round(100*b)+"%";a.j("progress-bar-status").innerHTML=c}Xs.prototype.dq=function(a){this.Sk||(yb(this.j("progress"),"hidden"),I(this.j("upload-form"),"hidden"),this.Sk=!0,Ys(this,0),this.cd.send(ug()+"/files",a.files),Zs(this,a.files))};
function Zs(a,b){for(var c=a.j("thumbs"),d=0,f;f=b[d];d++)if(f=f.pl,f.type.match("image.*")){var g=new FileReader;g.onload=function(a){return function(b){var d=document.createElement("span");d.innerHTML=['\x3cimg class\x3d"thumb" src\x3d"',b.target.result,'" title\x3d"',escape(a.name),'"/\x3e'].join("");c.appendChild(d)}}(f);g.readAsDataURL(f)}}Xs.prototype.Gs=function(a){a=a.data[0];$s[a._id]=a;Ys(this,1);this.Sk=!1;this.dispatchEvent({type:"changed_tag",tagName:"",value:a.url})};function at(a,b,c){this.Nd=b;this.ga=a;this.Ws=c}e=at.prototype;e.getUrl=function(){return this.Nd};e.qa=function(){return this.ga};e.kk=function(){return this.Ws};e.nd=function(a,b){Gj("/files/"+this.qa(),"DELETE",void 0,a,b)};e.equals=function(a){return!!a&&a.Nd===this.Nd};function bt(){this.id="fileParser"}bt.prototype.parse=function(a){var b=[],c=a.wa.match(new RegExp("http(s)?://("+ct.join("|")+")"+(ug()+"/files/")+"\\w+","ig"));if(c)var d=a.rd.Gl,b=Ma(c,function(a){var b=a.substr(a.lastIndexOf("/")+1),c=this.kk(b,d);return null!=c?new at(b,a,c):null},this);return Ka(b,function(a){return null!=a})};bt.prototype.kk=function(a,b){if(b&&s(b.attachedFiles))for(var c=0;c<b.attachedFiles.length;c++){var d=b.attachedFiles[c];if(d._id===a)return d}return $s[a]||null};
var $s={},ct=["dev.hash5.com:8080",document.location.host];function dt(a,b){vq.call(this,a,b);this.ki="icon-attachment";this.Jb="Files";this.ln=[]}B(dt,vq);dt.prototype.sa=function(){this.g().a(this.fa,Sk,this.gc);et(this)};dt.prototype.nk=function(){return new Xs};dt.prototype.gc=function(){et(this)};function et(a){var b=Hm(a.fa.ec(),bt);if(!hk(a.ln,b,function(a,b){return a.equals(b)})){a.ln=b;wq(a);for(var c=0;c<b.length;c++){var d=new As(b[c]);a.Ke(d)}}};function ft(){L.call(this)}B(ft,ti);ft.prototype.ha=function(){ml(dt)};ft.prototype.Yn=function(a){a=a.target;for(var b=a.re,c=Hm(a.ec(),bt),d=0;d<c.length;d++)var f=c[d].getUrl(),b=b.replace(f,'\x3ca href\x3d"'+f+'" target\x3d"_blank" class\x3d"file-link"\x3e\x3c/a\x3e');a.re=b};ri("files",ft);
//@ sourceURL=/asset/common/js-min/en/files.js