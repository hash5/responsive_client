dg.prototype.Zi=X(23,function(a){a&&!this.Sb&&(eg(this),this.zb=null,this.ta.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.setValues(d,a))},this));this.Sb=a});var hs="P T G M K  m u n".split(" ");function is(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var js=/#/g,ks=/[\#\?@]/g,ls=/[\#\?]/g,ms=/[\#\?:]/g,ns=/[#\/\?@]/g;function os(a,b){return v(a)?encodeURI(a).replace(b,is):null}
function ps(a,b){var c;if(a instanceof ps)this.Sb=s(b)?b:a.Sb,qs(this,a.tf),c=a.mj,rs(this),this.mj=c,c=a.Vf,rs(this),this.Vf=c,ss(this,a.Hi),this.setPath(a.getPath()),ts(this,a.Bd.V()),c=a.Sh,rs(this),this.Sh=c;else if(a&&(c=sd(String(a)))){this.Sb=!!b;qs(this,c[1]||"",!0);var d=c[2]||"";rs(this);this.mj=d?decodeURIComponent(d):"";d=c[3]||"";rs(this);this.Vf=d?decodeURIComponent(d):"";ss(this,c[4]);this.setPath(c[5]||"",!0);ts(this,c[6]||"",!0);c=c[7]||"";rs(this);this.Sh=c?decodeURIComponent(c):
""}else this.Sb=!!b,this.Bd=new dg(null,0,this.Sb)}e=ps.prototype;e.tf="";e.mj="";e.Vf="";e.Hi=null;e.cp="";e.Sh="";e.ft=!1;e.Sb=!1;
e.toString=function(){var a=[],b=this.tf;b&&a.push(os(b,ns),":");if(b=this.Vf){a.push("//");var c=this.mj;c&&a.push(os(c,ns),"@");a.push(encodeURIComponent(String(b)));b=this.Hi;null!=b&&a.push(":",String(b))}if(b=this.getPath())this.Vf&&"/"!=b.charAt(0)&&a.push("/"),a.push(os(b,"/"==b.charAt(0)?ls:ms));(b=this.Bd.toString())&&a.push("?",b);(b=this.Sh)&&a.push("#",os(b,js));return a.join("")};e.V=function(){return new ps(this)};
function qs(a,b,c){rs(a);a.tf=c?b?decodeURIComponent(b):"":b;a.tf&&(a.tf=a.tf.replace(/:$/,""))}function ss(a,b){rs(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.Hi=b}else a.Hi=null}e.getPath=function(){return this.cp};e.setPath=function(a,b){rs(this);this.cp=b?a?decodeURIComponent(a):"":a;return this};function ts(a,b,c){rs(a);b instanceof dg?(a.Bd=b,a.Bd.Zi(a.Sb)):(c||(b=os(b,ks)),a.Bd=new dg(b,0,a.Sb))}
function rs(a){if(a.ft)throw Error("Tried to modify a read-only Uri");}e.Zi=function(a){this.Sb=a;this.Bd&&this.Bd.Zi(a);return this};function us(a){a.stopPropagation()}
function vs(){return'\x3cdiv\x3e\x3cdiv class\x3d"upload-form"\x3e\x3cspan class\x3d"small"\x3eDatei hochladen:\x3c/span\x3e\x3cbr /\x3e\x3cbr /\x3e\x3cbutton class\x3d"btn primary enabled upload-btn"\x3eDatei auswählen\x3c/button\x3e\x3cspan class\x3d"small"\x3eoder Drag\x26Drop\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"thumbs"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress hidden"\x3e\x3cdiv class\x3d"progress-bar"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress-bar-status"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'}
function ws(a){return"\x3cdiv\x3e"+Kj(a.fileName)+" ("+Kj(a.fileSize)+')\x3cbr /\x3e\x3ca href\x3d"'+Kj(a.url)+'" target\x3d"_blank"\x3eDownload\x3c/a\x3e\x3c/div\x3e'};function xs(a){Vk.call(this);this.dk=a}B(xs,Vk);xs.prototype.d=function(){xs.c.d.call(this);var a=this.dk.ik(),b=a.filename,c;c="";s(!1)||(c="B");var d=a.length,a=d,f="",g=1;0>d&&(d=-d);for(var h=0;h<hs.length;h++){var k=hs[h],g=be[k];if(d>=g||1>=g&&d>0.1*g){f=k;break}}f?c&&(f+=c):g=1;c=Math.pow(10,s(void 0)?void 0:2);c=Math.round(a/g*c)/c+""+f;b={fileName:b,fileSize:c,url:this.dk.getUrl()};b=ee(ws,b);this.S().appendChild(b)};xs.prototype.e=function(){xs.c.e.call(this);I(this.b(),"file-tile")};
xs.prototype.mh=function(){var a=this.dk.getUrl(),b=Sk(this.vh.fa).indexOf(a);this.dispatchEvent({type:"changed_tag",tagName:"",value:a,Eg:!0,ib:[b,b+a.length]})};var ys=!1,zs="";function As(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
if(navigator.plugins&&navigator.plugins.length){var Bs=navigator.plugins["Shockwave Flash"];Bs&&(ys=!0,Bs.description&&(zs=As(Bs.description)));navigator.plugins["Shockwave Flash 2.0"]&&(ys=!0,zs="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var Cs=navigator.mimeTypes["application/x-shockwave-flash"];(ys=Cs&&Cs.enabledPlugin)&&(zs=As(Cs.enabledPlugin.description))}else try{var Ds=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),ys=!0,zs=As(Ds.GetVariable("$version"))}catch(Es){try{Ds=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),ys=!0,zs="6.0.21"}catch(Fs){try{Ds=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),ys=!0,zs=As(Ds.GetVariable("$version"))}catch(Gs){}}}var Hs=zs;function Is(a,b){Q.call(this,b);this.br=a;this.r=new P(this);this.be=new fd}B(Is,Q);e=Is.prototype;e.hq="window";e.Iq="#000000";e.Jm="sameDomain";function Js(a,b,c){a.lm=v(b)?b:Math.round(b)+"px";a.Rb=v(c)?c:Math.round(c)+"px";a.b()&&Mj(Ks(a),a.lm,a.Rb)}
e.e=function(){Is.c.e.call(this);var a=this.b(),b;b=E?'\x3cobject classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id\x3d"%s" name\x3d"%s" class\x3d"%s"\x3e\x3cparam name\x3d"movie" value\x3d"%s"/\x3e\x3cparam name\x3d"quality" value\x3d"high"/\x3e\x3cparam name\x3d"FlashVars" value\x3d"%s"/\x3e\x3cparam name\x3d"bgcolor" value\x3d"%s"/\x3e\x3cparam name\x3d"AllowScriptAccess" value\x3d"%s"/\x3e\x3cparam name\x3d"allowFullScreen" value\x3d"true"/\x3e\x3cparam name\x3d"SeamlessTabbing" value\x3d"false"/\x3e%s\x3c/object\x3e':'\x3cembed quality\x3d"high" id\x3d"%s" name\x3d"%s" class\x3d"%s" src\x3d"%s" FlashVars\x3d"%s" bgcolor\x3d"%s" AllowScriptAccess\x3d"%s" allowFullScreen\x3d"true" SeamlessTabbing\x3d"false" type\x3d"application/x-shockwave-flash" pluginspage\x3d"http://www.macromedia.com/go/getflashplayer" %s\x3e\x3c/embed\x3e';
for(var c=E?'\x3cparam name\x3d"wmode" value\x3d"%s"/\x3e':"wmode\x3d%s",c=hk(c,this.hq),d=this.be.Bb(),f=this.be.Sa(),g=[],h=0;h<d.length;h++)g.push(encodeURIComponent(String(d[h]))+"\x3d"+encodeURIComponent(String(f[h])));b=hk(b,this.qa(),this.qa(),"goog-ui-media-flash-object",ya(this.br),ya(g.join("\x26")),this.Iq,this.Jm,c);a.innerHTML=b;this.lm&&this.Rb&&Js(this,this.lm,this.Rb);this.r.a(this.b(),Eb(qc),us)};
e.d=function(){if(null!=this.op&&!(0<=Ga(Hs,this.op)))throw Error("Method not supported");var a=this.w().createElement("div");a.className="goog-ui-media-flash";this.h=a};function Ks(a){return a.b()?a.b().firstChild:null}e.i=function(){Is.c.i.call(this);this.be=null;this.r.p();this.r=null};e.ef=function(){return this.H&&this.b()?Ks(this).readyState&&4==Ks(this).readyState||Ks(this).PercentLoaded&&100==Ks(this).PercentLoaded()?!0:!1:!1};function Ls(){Q.call(this)}B(Ls,Q);function Ms(a,b,c){this.name=a;this.size=b;this.ml=c};function Ns(){Q.call(this);this.Vg=null;this.Vl=this.qa()+".swf";this.no=!1;Os.set(this.Vl,this)}B(Ns,Ls);var Os=new fd;e=Ns.prototype;e.o=function(a){Ns.c.o.call(this,a);a=new Is("asset/third-party/uploader.swf");a.op="10.0.45";a.Jm="always";a.be.set("allowNetworking","all");a.hq="transparent";a.be.set("yId",this.Vl);a.be.set("YUIBridgeCallback","YUIBridgeCallback");a.be.set("YUISwfId",this.Vl);a.L(this.b());this.Vg=a};e.e=function(){Ns.c.e.call(this);var a=this.b();Js(this.Vg,a.offsetWidth,a.offsetHeight)};
e.Ph=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ms(a[c].fileReference.name,a[c].fileReference.size,a[c]));return b};e.send=function(a,b,c){try{var d=new ps(a);if(c)for(var f in c){a=d;var g=f,h=c[f];rs(a);a.Bd.set(g,h)}for(c=0;c<b.length;c++)Ks(this.Vg).upload(b[c].ml.fileId,d.toString(),[],"file"+c)}catch(k){}};e.yp=function(a){this.no=a;this.Mk&&Ks(this.Vg).setAllowMultipleFiles(a)};
ca("YUI.applyTo",function(a,b,c){a=Os.get(a);c=c[1];switch(c.type){case "swfReady":Ks(a.Vg).setAllowMultipleFiles(a.no);break;case "uploadprogress":var d=c.bytesLoaded;c=c.bytesTotal;a.dispatchEvent({type:"progress",nb:0<c?d/c:0});break;case "uploadcompletedata":try{d=Xc(c.data),a.dispatchEvent({type:"complete",data:d})}catch(f){}break;case "fileselect":a.dispatchEvent({type:"select",files:a.Ph(c.fileList)})}});function Ps(a,b){O.call(this);this.r=new P(this);var c=a;b&&(c=K(a));this.r.a(c,"dragenter",this.xt);c!=a&&this.r.a(c,"dragover",this.yt);this.r.a(a,"dragover",this.Bt);this.r.a(a,"drop",this.Ct)}B(Ps,O);e=Ps.prototype;e.Uf=!1;e.i=function(){Ps.c.i.call(this);this.r.p()};e.xt=function(a){var b=a.Y.dataTransfer;(this.Uf=!(!b||!(b.types&&(D(b.types,"Files")||D(b.types,"public.file-url"))||b.files&&0<b.files.length)))&&a.preventDefault()};
e.yt=function(a){this.Uf&&(a.preventDefault(),a.Y.dataTransfer.dropEffect="none")};e.Bt=function(a){this.Uf&&(a.preventDefault(),a.stopPropagation(),a=a.Y.dataTransfer,a.effectAllowed="all",a.dropEffect="copy")};e.Ct=function(a){this.Uf&&(a.preventDefault(),a.stopPropagation(),a=new sc(a.Y),a.type="drop",this.dispatchEvent(a))};function Qs(){Q.call(this);this.Oh=this.Nh=null}B(Qs,Ls);e=Qs.prototype;e.o=function(a){Qs.c.o.call(this,a);this.Oh=this.w().d("input",{type:"file"})};e.e=function(){Qs.c.e.call(this);var a=jb?"touchstart":"click";this.g().a(this.b(),a,this.Ta);this.g().a(this.Oh,"change",this.ys)};e.Ph=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new Ms(a[c].name,a[c].size,a[c]));return b};e.Ta=function(){this.Oh.click()};e.Kr=function(a){this.dispatchEvent({type:Rs,files:this.Ph(a.Y.dataTransfer.files)})};
e.Wr=function(a){this.dispatchEvent({type:"complete",data:Xc(a.target.responseText)})};e.js=function(a){a=a.Y;this.dispatchEvent({type:"progress",nb:0<a.total?a.loaded/a.total:0})};e.ys=function(a){this.dispatchEvent({type:"select",files:this.Ph(a.target.files)})};e.send=function(a,b,c){for(var d=new FormData,f=0;f<b.length;f++)d.append("file"+f,b[f].ml);if(c)for(f in c)d.append(f,c[f]);b=new XMLHttpRequest;b.open("POST",a,!0);this.g().a(b,"load",this.Wr);this.g().a(b.upload,"progress",this.js);b.send(d)};
function Ss(a){var b=document.body;a.Nh&&a.Nh.p();a.Nh=new Ps(b,!0);a.g().a(a.Nh,"drop",a.Kr)}e.yp=function(a){this.Oh.multiple=a?"true":""};var Rs="drop";function Ts(){}Ts.prototype.f=function(){if(!s(Modernizr.filereader)||!s(Modernizr.draganddrop))throw Error("monin.ui.FileUploaderFactory: Modernizr.filereader / Modernizr.draganddrop properties are not defined.");return Modernizr.filereader&&Modernizr.draganddrop&&!E?new Qs:new Ns};function Us(){Vk.call(this);this.bd=(new Ts).f();this.g().a(this.bd,"select",this.aq).a(this.bd,"drop",this.aq).a(this.bd,"progress",function(a){Vs(this,a.nb)}).a(this.bd,"complete",this.Ms);this.bd instanceof Qs&&Ss(this.bd);this.Pk=!1}B(Us,Vk);Us.prototype.d=function(){Us.c.d.call(this);var a=ee(vs);this.S().appendChild(a)};Us.prototype.e=function(){Us.c.e.call(this);I(this.b(),"file-tile");this.bd.Z(this.j("upload-btn"));this.bd.yp(!1)};
function Vs(a,b){a.j("progress-bar").style.width=100*b+"%";var c=Math.round(100*b)+"%";a.j("progress-bar-status").innerHTML=c}Us.prototype.aq=function(a){this.Pk||(yb(this.j("progress"),"hidden"),I(this.j("upload-form"),"hidden"),this.Pk=!0,Vs(this,0),this.bd.send(ug()+"/files",a.files),Ws(this,a.files))};
function Ws(a,b){for(var c=a.j("thumbs"),d=0,f;f=b[d];d++)if(f=f.ml,f.type.match("image.*")){var g=new FileReader;g.onload=function(a){return function(b){var d=document.createElement("span");d.innerHTML=['\x3cimg class\x3d"thumb" src\x3d"',b.target.result,'" title\x3d"',escape(a.name),'"/\x3e'].join("");c.appendChild(d)}}(f);g.readAsDataURL(f)}}Us.prototype.Ms=function(a){a=a.data[0];Xs[a._id]=a;Vs(this,1);this.Pk=!1;this.dispatchEvent({type:"changed_tag",tagName:"",value:a.url})};function Ys(a,b,c){this.Kd=b;this.ga=a;this.bt=c}e=Ys.prototype;e.getUrl=function(){return this.Kd};e.qa=function(){return this.ga};e.ik=function(){return this.bt};e.ld=function(a,b){Fj("/files/"+this.qa(),"DELETE",void 0,a,b)};e.equals=function(a){return!!a&&a.Kd===this.Kd};function Zs(){this.id="fileParser"}Zs.prototype.parse=function(a){var b=[],c=a.wa.match(new RegExp("http(s)?://("+$s.join("|")+")"+(ug()+"/files/")+"\\w+","ig"));if(c)var d=a.od.Dl,b=La(c,function(a){var b=a.substr(a.lastIndexOf("/")+1),c=this.ik(b,d);return null!=c?new Ys(b,a,c):null},this);return Ka(b,function(a){return null!=a})};Zs.prototype.ik=function(a,b){if(b&&s(b.attachedFiles))for(var c=0;c<b.attachedFiles.length;c++){var d=b.attachedFiles[c];if(d._id===a)return d}return Xs[a]||null};
var Xs={},$s=["dev.hash5.com:8080",document.location.host];function at(a,b){tq.call(this,a,b);this.hi="icon-attachment";this.Jb="Datei";this.hn=[]}B(at,tq);at.prototype.sa=function(){this.g().a(this.fa,Rk,this.fc);bt(this)};at.prototype.lk=function(){return new Us};at.prototype.fc=function(){bt(this)};function bt(a){var b=Gm(a.fa.sc(),Zs);if(!gk(a.hn,b,function(a,b){return a.equals(b)})){a.hn=b;uq(a);for(var c=0;c<b.length;c++){var d=new xs(b[c]);a.Ie(d)}}};function ct(){L.call(this)}B(ct,si);ct.prototype.ma=function(){ll(at)};ct.prototype.Vn=function(a){a=a.target;for(var b=a.pe,c=Gm(a.sc(),Zs),d=0;d<c.length;d++)var f=c[d].getUrl(),b=b.replace(f,'\x3ca href\x3d"'+f+'" target\x3d"_blank" class\x3d"file-link"\x3e\x3c/a\x3e');a.pe=b};qi("files",ct);
//@ sourceURL=/asset/common/js-min/de/files.js