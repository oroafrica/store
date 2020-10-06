import {res} from "./resources.js";
import {config, inputs} from "./nameConfigure.js";

export class Store
{
	constructor()
	{
		//boolean
		this.dev=true;
		this.renderBounds=true;
		this.canvas = new fabric.Canvas('canvas',{backgroundColor:"rgba(231,245,249,0.8)",width:config.global.cw,height:config.global.ch,objectCaching:false});
		this.user = inputs();
		this.prefixFn = (d)=> {return (d.length >= 1) ? String.fromCharCode(d.substring(0,1).charCodeAt(0) + 60000) : "";};
	    this.infixFn = (a)=> {return (a.length > 1) ? a.substring(1,a.length) : "";};
        this.suffixFn = (a)=> {return String.fromCharCode(Object.values({0:61, 1:60091, 2:60040, 3:60123, 4:60062,5:60093,6:60041,7:60125})[a]);};
	    this.regex = (a)=> {return a.replace(/[\(\)\[\]:;#@\^\|\?\",<>\!\\_=\+\*~`\.\{\}']/g,"");};
	    this.allfix = "";
		this.item={chainLeft:"",chainRight:"",bounds:"",pendant:""};
	}
	
	msg(a){console.log(a);}
	
	debug()
	{
		if(!this.dev) return;
		let report=
		{
			init:"Hello from scriptName"
			,userTxt:$(this.user.txt1).val()
			,alloy:$(this.user.alloy).prop("selectedIndex")
			,motif:$(this.user.motif).prop("selectedIndex")
			,accent:$(this.user.accent).prop("selectedIndex")
			,bounds:this.item.bounds
			
		}
		this.msg(JSON.stringify(report));
	}

	getUserInput()
	{
		let a = $(this.user.txt1).val();
		if(a.substring(0,1).match(/^[\&|\-]/g) || a === "" || a === "Enteryournamehere") return;
		a = this.regex(a.split(" ").join(""));
		let b = ($(this.user.accent).prop("selectedIndex") === 0) ? this.suffixFn(this.user.motif.prop("selectedIndex")) : this.suffixFn(this.user.motif.prop("selectedIndex") + 4);
		this.allfix = (a.length > 0) ? this.prefixFn(a).concat(this.infixFn(a)).concat(b) : ""; 
	}

	setBounds()
	{	
		this.item.pendant =  new fabric.Text(this.allfix,{fontFamily:config.cname.fontName,fontSize:config.cname.fontSize,fill:"#b4b4b4",objectCaching:false});		
		this.canvas.add(this.item.pendant);
		this.item.pendant.center();
		this.item.bounds = this.item.pendant.getBoundingRect();
		if(!this.renderBounds){this.canvas.remove(this.item.pendant)};
	}
	
	draw()
	{
		this.canvas.clear();
		this.canvas.set({backgroundColor:config.global.screen,hoverCursor:"pointer",width:config.cname.cw,height:config.cname.ch,objectCaching:false});
		this.getUserInput();
		this.setBounds();
	}

	render()
	{	
		$(document).on("keyup",$(this.user.txt1),(e)=>
		{
			
			this.draw();
			this.debug();
		})
		.on("change",$(this.user.alloy),(e)=>
		{
			this.draw();
			this.debug();
		});
	}
}