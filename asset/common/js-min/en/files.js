jj.prototype.ui=p(17,function(a){a&&!this.Bb&&(kj(this),this.mb=null,this.ja.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.setValues(d,a))},this));this.Bb=a});Ub.prototype.append=p(4,function(a,b){fc(N(a),a,arguments,1)});function xr(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var yr=/#/g,zr=/[\#\?@]/g,Ar=/[\#\?]/g,Br=/[\#\?:]/g,Cr=/[#\/\?@]/g;function Dr(a,b){return y(a)?encodeURI(a).replace(b,xr):null}
function Er(a,b){var c;if(a instanceof Er)this.Bb=u(b)?b:a.Bb,Fr(this,a.Ve),c=a.Ki,Gr(this),this.Ki=c,c=a.xf,Gr(this),this.xf=c,Hr(this,a.di),this.setPath(a.getPath()),Ir(this,a.kd.M()),c=a.oh,Gr(this),this.oh=c;else if(a&&(c=Rd(String(a)))){this.Bb=!!b;Fr(this,c[1]||"",!0);var d=c[2]||"";Gr(this);this.Ki=d?decodeURIComponent(d):"";d=c[3]||"";Gr(this);this.xf=d?decodeURIComponent(d):"";Hr(this,c[4]);this.setPath(c[5]||"",!0);Ir(this,c[6]||"",!0);c=c[7]||"";Gr(this);this.oh=c?decodeURIComponent(c):
""}else this.Bb=!!b,this.kd=new jj(null,0,this.Bb)}e=Er.prototype;e.Ve="";e.Ki="";e.xf="";e.di=null;e.so="";e.oh="";e.es=!1;e.Bb=!1;
e.toString=function(){var a=[],b=this.Ve;b&&a.push(Dr(b,Cr),":");if(b=this.xf){a.push("//");var c=this.Ki;c&&a.push(Dr(c,Cr),"@");a.push(encodeURIComponent(String(b)));b=this.di;null!=b&&a.push(":",String(b))}if(b=this.getPath())this.xf&&"/"!=b.charAt(0)&&a.push("/"),a.push(Dr(b,"/"==b.charAt(0)?Ar:Br));(b=this.kd.toString())&&a.push("?",b);(b=this.oh)&&a.push("#",Dr(b,yr));return a.join("")};e.M=function(){return new Er(this)};
function Fr(a,b,c){Gr(a);a.Ve=c?b?decodeURIComponent(b):"":b;a.Ve&&(a.Ve=a.Ve.replace(/:$/,""))}function Hr(a,b){Gr(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.di=b}else a.di=null}e.getPath=function(){return this.so};e.setPath=function(a,b){Gr(this);this.so=b?a?decodeURIComponent(a):"":a;return this};function Ir(a,b,c){Gr(a);b instanceof jj?(a.kd=b,a.kd.ui(a.Bb)):(c||(b=Dr(b,zr)),a.kd=new jj(b,0,a.Bb))}
function Gr(a){if(a.es)throw Error("Tried to modify a read-only Uri");}e.ui=function(a){this.Bb=a;this.kd&&this.kd.ui(a);return this};function Jr(a){a.stopPropagation()}
function Kr(){return'\x3cdiv\x3e\x3cdiv class\x3d"upload-form"\x3e\x3cspan class\x3d"small"\x3eUpload new file:\x3c/span\x3e\x3cbr /\x3e\x3cbr /\x3e\x3cbutton class\x3d"btn primary enabled upload-btn"\x3eSelect File\x3c/button\x3e\x3cspan class\x3d"small"\x3eor Drag\x26Drop\x3c/span\x3e\x3c/div\x3e\x3cdiv class\x3d"thumbs"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress hidden"\x3e\x3cdiv class\x3d"progress-bar"\x3e\x3c/div\x3e\x3cdiv class\x3d"progress-bar-status"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'}
function Lr(a){return'\x3cdiv\x3e\x3ca href\x3d"'+bf(a.url)+'" target\x3d"_blank"\x3eDownload\x3c/a\x3e\x3c/div\x3e'};function Mr(a){Bk.call(this);this.Vm=a}C(Mr,Bk);Mr.prototype.e=function(){Mr.c.e.call(this);var a={url:this.Vm.getUrl()},a=Ye(Lr,a);this.N().appendChild(a)};Mr.prototype.d=function(){Mr.c.d.call(this);K(this.b(),"file-tile")};Mr.prototype.dm=function(){var a=this.Vm.getUrl(),b=gk(this.Qg.ba).indexOf(a);this.dispatchEvent({type:"changed_tag",tagName:"",value:a,ki:!0,Xa:[b,b+a.length]})};var Nr=!1,Or="";function Pr(a){a=a.match(/[\d]+/g);if(!a)return"";a.length=3;return a.join(".")}
if(navigator.plugins&&navigator.plugins.length){var Qr=navigator.plugins["Shockwave Flash"];Qr&&(Nr=!0,Qr.description&&(Or=Pr(Qr.description)));navigator.plugins["Shockwave Flash 2.0"]&&(Nr=!0,Or="2.0.0.11")}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var Rr=navigator.mimeTypes["application/x-shockwave-flash"];(Nr=Rr&&Rr.enabledPlugin)&&(Or=Pr(Rr.enabledPlugin.description))}else try{var Sr=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),Nr=!0,Or=Pr(Sr.GetVariable("$version"))}catch(Tr){try{Sr=
new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),Nr=!0,Or="6.0.21"}catch(Ur){try{Sr=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),Nr=!0,Or=Pr(Sr.GetVariable("$version"))}catch(Vr){}}}var Wr=Or;function Xr(a,b){T.call(this,b);this.hq=a;this.n=new S(this);this.Fd=new Cd}C(Xr,T);e=Xr.prototype;e.up="window";e.Mp="#000000";e.Yl="sameDomain";function Yr(a,b,c){a.El=y(b)?b:Math.round(b)+"px";a.Ab=y(c)?c:Math.round(c)+"px";a.b()&&ze(Zr(a),a.El,a.Ab)}
e.d=function(){Xr.c.d.call(this);var a=this.b(),b;b=G?'\x3cobject classid\x3d"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id\x3d"%s" name\x3d"%s" class\x3d"%s"\x3e\x3cparam name\x3d"movie" value\x3d"%s"/\x3e\x3cparam name\x3d"quality" value\x3d"high"/\x3e\x3cparam name\x3d"FlashVars" value\x3d"%s"/\x3e\x3cparam name\x3d"bgcolor" value\x3d"%s"/\x3e\x3cparam name\x3d"AllowScriptAccess" value\x3d"%s"/\x3e\x3cparam name\x3d"allowFullScreen" value\x3d"true"/\x3e\x3cparam name\x3d"SeamlessTabbing" value\x3d"false"/\x3e%s\x3c/object\x3e':'\x3cembed quality\x3d"high" id\x3d"%s" name\x3d"%s" class\x3d"%s" src\x3d"%s" FlashVars\x3d"%s" bgcolor\x3d"%s" AllowScriptAccess\x3d"%s" allowFullScreen\x3d"true" SeamlessTabbing\x3d"false" type\x3d"application/x-shockwave-flash" pluginspage\x3d"http://www.macromedia.com/go/getflashplayer" %s\x3e\x3c/embed\x3e';
for(var c=G?'\x3cparam name\x3d"wmode" value\x3d"%s"/\x3e':"wmode\x3d%s",c=ua(c,this.up),d=this.Fd.ob(),f=this.Fd.Sa(),g=[],h=0;h<d.length;h++)g.push(encodeURIComponent(String(d[h]))+"\x3d"+encodeURIComponent(String(f[h])));b=ua(b,this.ga(),this.ga(),"goog-ui-media-flash-object",Aa(this.hq),Aa(g.join("\x26")),this.Mp,this.Yl,c);a.innerHTML=b;this.El&&this.Ab&&Yr(this,this.El,this.Ab);this.n.a(this.b(),Lb(Jc),Jr)};
e.e=function(){if(null!=this.Bo&&!(0<=Ka(Wr,this.Bo)))throw Error("Method not supported");var a=this.t().createElement("div");a.className="goog-ui-media-flash";this.f=a};function Zr(a){return a.b()?a.b().firstChild:null}e.h=function(){Xr.c.h.call(this);this.Fd=null;this.n.l();this.n=null};e.Ie=function(){return this.D&&this.b()?Zr(this).readyState&&4==Zr(this).readyState||Zr(this).PercentLoaded&&100==Zr(this).PercentLoaded()?!0:!1:!1};function $r(){T.call(this)}C($r,T);function as(a,b,c){this.name=a;this.size=b;this.Ek=c};function bs(){T.call(this);this.vg=null;this.nl=this.ga()+".swf";this.Fn=!1;cs.set(this.nl,this)}C(bs,$r);var cs=new Cd;e=bs.prototype;e.m=function(a){bs.c.m.call(this,a);a=new Xr("asset/third-party/uploader.swf");a.Bo="10.0.45";a.Yl="always";a.Fd.set("allowNetworking","all");a.up="transparent";a.Fd.set("yId",this.nl);a.Fd.set("YUIBridgeCallback","YUIBridgeCallback");a.Fd.set("YUISwfId",this.nl);a.L(this.b());this.vg=a};e.d=function(){bs.c.d.call(this);var a=this.b();Yr(this.vg,a.offsetWidth,a.offsetHeight)};
e.lh=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new as(a[c].fileReference.name,a[c].fileReference.size,a[c]));return b};e.send=function(a,b,c){try{var d=new Er(a);if(c)for(var f in c){a=d;var g=f,h=c[f];Gr(a);a.kd.set(g,h)}for(c=0;c<b.length;c++)Zr(this.vg).upload(b[c].Ek.fileId,d.toString(),[],"file"+c)}catch(k){}};e.Mo=function(a){this.Fn=a;this.ek&&Zr(this.vg).setAllowMultipleFiles(a)};
ca("YUI.applyTo",function(a,b,c){a=cs.get(a);c=c[1];switch(c.type){case "swfReady":Zr(a.vg).setAllowMultipleFiles(a.Fn);break;case "uploadprogress":var d=c.bytesLoaded;c=c.bytesTotal;a.dispatchEvent({type:"progress",Za:0<c?d/c:0});break;case "uploadcompletedata":try{d=rd(c.data),a.dispatchEvent({type:"complete",data:d})}catch(f){}break;case "fileselect":a.dispatchEvent({type:"select",files:a.lh(c.fileList)})}});function ds(a,b){R.call(this);this.n=new S(this);var c=a;b&&(c=N(a));this.n.a(c,"dragenter",this.us);c!=a&&this.n.a(c,"dragover",this.vs);this.n.a(a,"dragover",this.ys);this.n.a(a,"drop",this.zs)}C(ds,R);e=ds.prototype;e.wf=!1;e.h=function(){ds.c.h.call(this);this.n.l()};e.us=function(a){var b=a.P.dataTransfer;(this.wf=!(!b||!(b.types&&(F(b.types,"Files")||F(b.types,"public.file-url"))||b.files&&0<b.files.length)))&&a.preventDefault()};
e.vs=function(a){this.wf&&(a.preventDefault(),a.P.dataTransfer.dropEffect="none")};e.ys=function(a){this.wf&&(a.preventDefault(),a.stopPropagation(),a=a.P.dataTransfer,a.effectAllowed="all",a.dropEffect="copy")};e.zs=function(a){this.wf&&(a.preventDefault(),a.stopPropagation(),a=new Lc(a.P),a.type="drop",this.dispatchEvent(a))};function es(){T.call(this);this.kh=this.jh=null}C(es,$r);e=es.prototype;e.m=function(a){es.c.m.call(this,a);this.kh=this.t().e("input",{type:"file"})};e.d=function(){es.c.d.call(this);var a=pb?"touchstart":"click";this.i().a(this.b(),a,this.Ta);this.i().a(this.kh,"change",this.Ar)};e.lh=function(a){for(var b=[],c=0;c<a.length;c++)b.push(new as(a[c].name,a[c].size,a[c]));return b};e.Ta=function(){this.kh.click()};e.Rq=function(a){this.dispatchEvent({type:fs,files:this.lh(a.P.dataTransfer.files)})};
e.ar=function(a){this.dispatchEvent({type:"complete",data:rd(a.target.responseText)})};e.nr=function(a){a=a.P;this.dispatchEvent({type:"progress",Za:0<a.total?a.loaded/a.total:0})};e.Ar=function(a){this.dispatchEvent({type:"select",files:this.lh(a.target.files)})};e.send=function(a,b,c){for(var d=new FormData,f=0;f<b.length;f++)d.append("file"+f,b[f].Ek);if(c)for(f in c)d.append(f,c[f]);b=new XMLHttpRequest;b.open("POST",a,!0);this.i().a(b,"load",this.ar);this.i().a(b.upload,"progress",this.nr);b.send(d)};
function gs(a){var b=document.body;a.jh&&a.jh.l();a.jh=new ds(b,!0);a.i().a(a.jh,"drop",a.Rq)}e.Mo=function(a){this.kh.multiple=a?"true":""};var fs="drop";function hs(){}hs.prototype.g=function(){if(!u(Modernizr.filereader)||!u(Modernizr.draganddrop))throw Error("monin.ui.FileUploaderFactory: Modernizr.filereader / Modernizr.draganddrop properties are not defined.");return Modernizr.filereader&&Modernizr.draganddrop&&!G?new es:new bs};function is(){Bk.call(this);this.Pc=(new hs).g();this.i().a(this.Pc,"select",this.np).a(this.Pc,"drop",this.np).a(this.Pc,"progress",function(a){js(this,a.Za)}).a(this.Pc,"complete",this.Or);this.Pc instanceof es&&gs(this.Pc);this.hk=!1}C(is,Bk);is.prototype.e=function(){is.c.e.call(this);var a=Ye(Kr);this.N().appendChild(a)};is.prototype.d=function(){is.c.d.call(this);K(this.b(),"file-tile");this.Pc.R(this.j("upload-btn"));this.Pc.Mo(!1)};
function js(a,b){a.j("progress-bar").style.width=100*b+"%";var c=Math.round(100*b)+"%";a.j("progress-bar-status").innerHTML=c}is.prototype.np=function(a){this.hk||(Eb(this.j("progress"),"hidden"),K(this.j("upload-form"),"hidden"),this.hk=!0,js(this,0),this.Pc.send("/files",a.files),ks(this,a.files))};
function ks(a,b){for(var c=a.j("thumbs"),d=0,f;f=b[d];d++)if(f=f.Ek,f.type.match("image.*")){var g=new FileReader;g.onload=function(a){return function(b){var d=document.createElement("span");d.innerHTML=['\x3cimg class\x3d"thumb" src\x3d"',b.target.result,'" title\x3d"',escape(a.name),'"/\x3e'].join("");c.appendChild(d)}}(f);g.readAsDataURL(f)}}is.prototype.Or=function(a){a=a.data[0];js(this,1);this.hk=!1;this.dispatchEvent({type:"changed_tag",tagName:"",value:a.url})};function ls(a){this.kc=a;this.T=""}ls.prototype.getUrl=function(){return this.kc};ls.prototype.ga=function(){this.T||(this.T=this.kc.substr(this.kc.lastIndexOf("/")+1));return this.T};ls.prototype.rc=function(a,b){Dj("/files/"+this.ga(),"DELETE",void 0,a,b)};ls.prototype.equals=function(a){return!!a&&a.kc===this.kc};function ms(){this.id="fileParser"}ms.prototype.parse=function(a){var b=[];(a=a.fb.match(new RegExp("http(s)?://("+ns.join("|")+")/files/\\w+","ig")))&&(b=Ra(a,function(a){return new ls(a)}));return b};var ns=["dev.hash5.com:8080",document.location.host];function os(a,b){Om.call(this,a,b);this.Dh="icon-attachment";this.Hb="Files";this.ym=[]}C(os,Om);os.prototype.Ea=function(){this.i().a(this.ba,hk,this.Rb);ps(this)};os.prototype.Ej=function(){return new is};os.prototype.Rb=function(){ps(this)};function ps(a){var b=a.ba.xc().If(ms);if(!fb(a.ym,b,function(a,b){return a.equals(b)})){a.ym=b;a.Ok();for(var c=0;c<b.length;c++){var d=new Mr(b[c]);a.ke(d)}}};function qs(){O.call(this)}C(qs,aj);qs.prototype.ia=function(){jk(os)};qs.prototype.ln=function(a){a=a.target;for(var b=a.Xf,c=a.xc().If(ms),d=0;d<c.length;d++)var f=c[d].getUrl(),b=b.replace(f,'\x3ca href\x3d"'+f+'" target\x3d"_blank" class\x3d"file-link"\x3e\x3c/a\x3e');a.al(b)};Zi("files",qs);
//@ sourceURL=/asset/common/js-min/LANG/files.js