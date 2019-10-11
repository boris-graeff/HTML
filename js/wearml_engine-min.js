var wearML=new function(){this.voiceCommandsCallBack;this.config={attributes:true,attributeFilter:["class","style"],childList:true,subtree:true,characterData:false};this.observer=new MutationObserver(function(mutations){console.log("DOM Mutation detected, re-acquiring WearML commands.");wmlNodes=$('button[id$="WML_NODE"]');if(wmlNodes!=null){wmlNodes.remove()}wearML.pollCommands()});window.addEventListener("load",function(){wearML.pollCommands()},false);this.wearMLElements=[];this.callbackElements=[];this.commandSet;this.root="--root";this.text_field="--text_field";this.overlay_show_number="--overlay_show_number";this.overlay_show_text="--overlay_show_text";this.overlay_persists="--overlay_persists";this.overlay_orientation="--overlay_orientation";this.overlay_background_color="--overlay_background_color";this.overlay_text_color="--overlay_text_color";this.overlay_border_color="--overlay_border_color";this.overlay_anchor_hv="--overlay_anchor_hv";this.overlay_show_dot="--overlay_show_dot";this.overlay_show_icon="--overlay_show_icon";this.overlay_offset="--overlay_offset";this.hf_scroll="--hf_scroll";this.barcode="--hf_barcode";this.global="--global_commands";this.hide_help="--hide_help";this.broadcast_results="--broadcast_results";this.root_text_field="";this.root_overlay_show_number="";this.root_overlay_show_text="";this.root_overlay_persists="";this.root_overlay_orientation="";this.root_overlay_background_color="";this.root_overlay_text_color="";this.root_overlay_border_color="";this.root_overlay_anchor_hv="";this.root_overlay_show_dot="";this.root_overlay_show_icon="";this.root_overlay_offset="";this.root_hf_scroll="";this.root_hide_help="";this.getCommands=function(){if(!navigator.userAgent.match(/Android/i)&&screen.width>480&&screen.height>854){console.log("This is not an HMT device, WearML commands will not be registered.");return}wearML.observer.disconnect();this.elements=wearML.getAllElementsWithAttribute("*");wearML.createOverrideDom();this.rootElement=document.documentElement;wearML.observer.observe(this.rootElement,wearML.config)};this.setCommandSet=function(cmdset){console.log("Changing commandSet from '"+this.commandSet+"' to '"+cmdset+"'.");this.commandSet=cmdset;this.pollCommands()};this.initCallbackBtn=function(command){var btn=document.createElement("BUTTON");btn.id=command+"WML_CB_NODE";btn.style.top=0;btn.style.left=0;btn.style.opacity="0.01";btn.style.position="fixed";btn.setAttribute("data-wml-speech-command",command);return btn};this.registerCallbackBtn=function(btn){var theFirstChild=document.body.firstChild;document.body.insertBefore(btn,theFirstChild);wearML.pollCommands()};this.addCallbackCommand=function(command,cmdset,callbackFunc){var btn=document.getElementById(command+"WML_CB_NODE");if(btn==null||btn==undefined){btn=wearML.initCallbackBtn(command)}btn.onclick=callbackFunc;if(cmdset){btn.setAttribute("data-wml-commandsets",cmdset)}wearML.registerCallbackBtn(btn)};this.removeCallbackCommand=function(command){var btn=document.getElementById(command+"WML_CB_NODE");if(btn!=null&&btn!=undefined){btn.remove()}wearML.pollCommands()};this.automaticCommandParsing=true;this.setAutomaticCommandParsing=function(bool){console.log("Setting automatic command parsing to "+bool);this.automaticCommandParsing=bool;this.pollCommands()};this.isElementParsable=function(el){if(this.automaticCommandParsing){return el.getAttribute("data-wml-style")!==null||el.getAttribute("data-wml-speech-command")!==null||el.tagName!="DIV"}else{return el.getAttribute("data-wml-style")!==null||el.getAttribute("data-wml-speech-command")!==null}};this.ASRPolling;this.isValidCommandSet=function(commandSets){var returnValue=false;if(this.commandSet==null){returnValue=true}else{var cmdSetArr=commandSets.split("|");returnValue=cmdSetArr.includes(wearML.commandSet)}return returnValue};this.getAllElementsWithAttribute=function(attribute){wearML.wearMLElements=[];this.allElements=document.body.getElementsByTagName(attribute);for(var i=0,n=this.allElements.length;i<n;i++){this.currentElement=this.allElements[i];try{if(this.isElementParsable(this.currentElement)){if($(this.currentElement)==null){continue}console.log("not null or hidden");if(this.currentElement.tagName!="SCRIPT"){this.styleId=this.currentElement.getAttribute("data-wml-style");this.elementCommandSets=this.currentElement.getAttribute("data-wml-commandsets");this.speech_command=this.currentElement.getAttribute("data-wml-speech-command");this.command=this.currentElement.text;if(this.speech_command==undefined||this.speech_command==" "||this.speech_command==""){}else{this.command=this.speech_command;if(this.currentElement.id===""){this.currentElement.id=this.guid()}console.log(this.speech_command+" / "+wearML.isValidCommandSet(this.elementCommandSets));if(wearML.commandSet==undefined||wearML.commandSet==null||wearML.isValidCommandSet(this.elementCommandSets)){console.log(this.speech_command+" passed");this.position=this.getPosition(this.currentElement);this.element={tag:this.command,id:this.currentElement.id,x:this.position.x,y:this.position.y,styleId:this.styleId};wearML.wearMLElements.push(this.element);this.createButton(this.element,this.currentElement)}}}}}catch(error){console.log("An error has occurred while parsing an HTML element and a WearML element will not be registered");console.error(error)}}return wearML.wearMLElements};this.onReceivedCommand=function(command){};this.pollCommands=function(){if(wearML.ASRPolling!=undefined){clearTimeout(wearML.ASRPolling);this.ASRPolling=null}wearML.ASRPolling=setTimeout(wearML.getCommands,500)};this.createOverrideDom=function(){this.btn=document.getElementById("wearHF_root_button");if(this.btn!=undefined){document.body.removeChild(this.btn)}this.btn=document.createElement("BUTTON");this.btn.id="wearHF_root_button";this.t=document.createTextNode("hf_wearml_override:"+this.generateXML());this.btn.appendChild(this.t);this.btn.style.top=0;this.btn.style.left=0;this.btn.style.opacity="0.01";this.btn.style.position="fixed";this.theFirstChild=document.body.firstChild;document.body.insertBefore(this.btn,this.theFirstChild)};this.createButton=function(element,node){this.btn=document.getElementById(element.tag+"WML_NODE");if(this.btn!=undefined){document.body.removeChild(this.btn)}this.btn=document.createElement("BUTTON");this.btn.id=element.tag+"WML_NODE";this.t=document.createTextNode(element.tag);this.btn.style.fontSize="0.01px";this.btn.appendChild(this.t);this.btn.style.top=node.getBoundingClientRect().top+"px";this.btn.style.left=node.getBoundingClientRect().left+"px";this.btn.onclick=function(element){for(var i=0,n=wearML.wearMLElements.length;i<n;i++){if(typeof element.srcElement==="undefined"||typeof element.srcElement.textContent==="undefined"){continue}if(element.srcElement.textContent===wearML.wearMLElements[i].tag){this.ele=document.getElementById(wearML.wearMLElements[i].id);if(this.ele.tagName==="INPUT"|this.ele.tagName==="TEXTAREA"){this.ele.focus();this.ele.click()}else if(this.ele.tagName==="SELECT"){this.event=document.createEvent("MouseEvents");this.event.initMouseEvent("mousedown",true,true,window);this.ele.dispatchEvent(this.event)}else{this.event=new MouseEvent("click",{view:window,bubbles:true,cancelable:true});this.ele.dispatchEvent(this.event)}}}};this.btn.style.opacity="0.01";this.btn.style.position="absolute";this.btn.style.width=node.offsetWidth;this.btn.style.height=node.offsetHeight;this.btn.style.zIndex="-1";var theFirstChild=document.body.firstChild;document.body.appendChild(this.btn)};this.generateXML=function(){this.xml='<WearML><Package>com.android.webview</Package><Language>en_GB</Language><UniqueIdentifier id="web_app"/> ';document.title="hf_no_number";parseElementIntoXml=function(el){el.command=el.tag;el.styleId=el.styleId;var resultXml="";resultXml+="<View ";resultXml+='id="'+el.id+'" ';if(el.command==undefined){resultXml+='speech_command="'+"no"+'" '}else{resultXml+='speech_command="'+el.command+'" '}el.style=wearML.getStyle(el.styleId);if(el.style!=undefined){resultXml+=wearML.wearMLParser(el.style,el)}resultXml+="/> ";return resultXml};for(var i=0,n=wearML.wearMLElements.length;i<n;i++){this.xml+=parseElementIntoXml(wearML.wearMLElements[i])}this.xml+="</WearML>";return this.utf8_to_b64(this.xml)};this.utf8_to_b64=function(str){return window.btoa(unescape(encodeURIComponent(str)))};this.getStyle=function(className){for(var i=0;i<document.styleSheets.length;i++){this.classes=document.styleSheets[i].rules||document.styleSheets[i].cssRules;if(this.classes!=null){for(var x=0;x<this.classes.length;x++){if(this.classes[x].selectorText==className){return this.classes[x].style}}}}};this.guid=function(){function s4(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()};this.getPosition=function(el){this.xPos=0;this.yPos=0;while(el){if(el.tagName=="BODY"){this.xScroll=el.scrollLeft||document.documentElement.scrollLeft;this.yScroll=el.scrollTop||document.documentElement.scrollTop;this.xPos+=el.offsetLeft-this.xScroll+el.clientLeft;this.yPos+=el.offsetTop-this.yScroll+el.clientTop}else{this.xPos+=el.offsetLeft-el.scrollLeft+el.clientLeft;this.yPos+=el.offsetTop-el.scrollTop+el.clientTop}el=el.offsetParent}return{x:this.xPos,y:this.yPos}};this.wearMLParser=function(e,element){var attributes="";var get_root=e!=undefined?e.getPropertyValue(this.root).trim():"";var get_text_field=e!=undefined?e.getPropertyValue(this.text_field).trim():this.root_text_field;var get_overlay_show_number=e!=undefined?e.getPropertyValue(this.overlay_show_number).trim():this.root_overlay_show_number;var get_overlay_show_text=e!=undefined?e.getPropertyValue(this.overlay_show_text).trim():this.root_overlay_show_text;var get_overlay_persists=e!=undefined?e.getPropertyValue(this.overlay_persists).trim():this.root_overlay_persists;var get_overlay_orientation=e!=undefined?e.getPropertyValue(this.overlay_orientation).trim():this.root_overlay_orientation;var get_overlay_background_color=e!=undefined?e.getPropertyValue(this.overlay_background_color).trim():this.root_overlay_background_color;var get_overlay_text_color=e!=undefined?e.getPropertyValue(this.overlay_text_color).trim():this.root_overlay_text_color;var get_overlay_border_color=e!=undefined?e.getPropertyValue(this.overlay_border_color).trim():this.root_overlay_border_color;var get_overlay_anchor_hv=e!=undefined?e.getPropertyValue(this.overlay_anchor_hv).trim():this.root_overlay_anchor_hv;var get_overlay_show_dot=e!=undefined?e.getPropertyValue(this.overlay_show_dot).trim():this.root_overlay_show_dot;var get_overlay_show_icon=e!=undefined?e.getPropertyValue(this.overlay_show_icon).trim():this.root_overlay_show_icon;var get_overlay_offset=e!=undefined?e.getPropertyValue(this.overlay_offset).trim():this.root_overlay_offset;var get_hf_scroll=e!=undefined?e.getPropertyValue(this.hf_scroll).trim():this.root_hf_scroll;var get_barcode=e!=undefined?e.getPropertyValue(this.barcode).trim():"";var get_global=e!=undefined?e.getPropertyValue(this.global).trim():"";var get_hide_help=e!=undefined?e.getPropertyValue(this.hide_help).trim():"";var get_broadcast_results=e!=undefined?e.getPropertyValue(this.broadcast_results).trim():"";if(get_root!=""){if(get_root=="true"){this.root_text_field=get_text_field;this.root_overlay_show_number=get_overlay_show_number;this.root_overlay_show_text=get_overlay_show_text;this.root_overlay_persists=get_overlay_persists;this.root_overlay_orientation=get_overlay_orientation;this.root_overlay_background_color=get_overlay_background_color;this.root_overlay_text_color=get_overlay_text_color;this.root_overlay_border_color=get_overlay_border_color;this.root_overlay_anchor_hv=get_overlay_anchor_hv;this.root_overlay_show_dot=get_overlay_show_dot;this.root_overlay_show_icon=get_overlay_show_icon;this.root_overlay_offset=get_overlay_offset;this.root_hf_scroll=get_hf_scroll;this.root_hide_help=get_hide_help}}if(get_text_field!=""){attributes+="text_field="+get_text_field+" "}if(get_overlay_show_number!=""){if(get_overlay_show_number=="true"){attributes+='overlay_show_number="yes" '}else{attributes+='overlay_show_number="no" '}}if(get_overlay_show_text!=""){if(get_overlay_show_text=="true")attributes+='overlay_show_text="yes" ';else{attributes+='overlay_show_text="no" '}}if(get_overlay_persists!=""){if(get_overlay_persists=="true")attributes+='overlay_persists="yes" ';else{attributes+='overlay_persists="no" '}}if(get_overlay_orientation!=""){attributes+="overlay_orientation="+get_overlay_orientation+" "}if(get_overlay_background_color!=""){attributes+="overlay_background_color="+get_overlay_background_color+" "}if(get_overlay_text_color!=""){attributes+="overlay_text_color="+get_overlay_text_color+" "}if(get_overlay_border_color!=""){attributes+="overlay_border_color="+get_overlay_border_color+" "}if(get_overlay_anchor_hv!=""){attributes+="overlay_anchor="+get_overlay_anchor_hv+" "}if(get_overlay_show_dot!=""){if(get_overlay_show_dot=="true")attributes+='overlay_show_dot="yes" ';else{attributes+='overlay_show_dot="no" '}}if(get_overlay_show_icon!=""){if(get_overlay_show_icon=="true")attributes+='overlay_show_icon="yes" ';else{attributes+='overlay_show_icon="no" '}}if(get_overlay_offset!=""){attributes+="overlay_offset="+get_overlay_offset+" "}if(get_hf_scroll!=""){attributes+="scroll="+get_hf_scroll+" "}if(get_barcode!=""){attributes+="barcode="+get_barcode+" "}if(get_hide_help!=""){attributes+="barcode="+get_barcode+" "}if(get_global!=""){if(get_global=="true")attributes+='global_commands="yes" ';else{attributes+='global_commands="no" '}}if(get_broadcast_results!=""){if(get_broadcast_results=="true")attributes+='broadcast_results="yes" ';else{attributes+='broadcast_results="no" '}}return attributes}};