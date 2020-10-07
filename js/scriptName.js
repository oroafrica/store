import {res} from "./resources.js";
import {config, inputs} from "./nameConfig.js";

export class Store
{
	constructor(myStyle)
	{
		this.dev=true;
		this.renderBounds=false;
		this.con = config[myStyle.toLowerCase()];  
		this.canvas = new fabric.Canvas(config.global.canvasId,{backgroundColor:config.global.screen,width:this.con.cw,height:this.con.ch,objectCaching:false,hoverCursor:"pointer"});
		this.user = inputs();
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
			,allfix:this.allfix
			,config:this.con
		}
		this.msg(JSON.stringify(report));
	}

	getUserInput()
	{
		this.allfix = "";
		let a = $(this.user.txt1).val();
		if(a.substring(0,1).match(/^[\&|\-]/g) || a === "" || a === "Enteryournamehere" || a === "Enter your name here") return;
		a = this.regex(a.split(" ").join(""));
		let b = ($(this.user.accent).prop("selectedIndex") === 0) ? this.con.suffixFn($(this.user.motif).prop("selectedIndex")) : this.con.suffixFn($(this.user.motif).prop("selectedIndex") + 4);
this.msg("test a: "+ (typeof b));

		this.allfix = (a.length > 0) ? this.con.prefixFn(a).concat(this.con.infixFn(a)).concat(b) : ""; 
	}

	setBounds()
	{	
		this.item.pendant =  new fabric.Text(this.allfix,{fontFamily:this.con.fontName,fontSize:this.con.fontSize,fill:"#b4b4b4",objectCaching:false});		
		this.canvas.add(this.item.pendant);
		this.item.pendant.center();
		this.item.bounds = this.item.pendant.getBoundingRect();
		if(!this.renderBounds){this.canvas.remove(this.item.pendant)};
	}
	
	drawRegion(bnd)
	{
		let aBox, bBox, cBox;
		aBox = new fabric.Rect({
			left:bnd.left - this.con.chainWidth
			,top:bnd.top - this.con.chainWidth
			,width:this.con.chainWidth
			,height:this.con.chainWidth
			,selectable:false
			,fill:""
			,stroke:"#f00"
			,strokeWidth:0.25
		});

		bBox = new fabric.Rect(this.item.bounds);
			bBox.stroke="#0f0";
			bBox.fill="";
			bBox.strokeWidth=0.25;

		cBox = new fabric.Rect({
			left:bnd.width + bnd.left
			,top:bnd.top - this.con.chainWidth
			,width:this.con.chainWidth
			,height:this.con.chainWidth
			,selectable:false
			,fill:""
			,stroke:"#00f"
			,strokeWidth:0.25
		});

		if(this.renderBounds) this.canvas.add(aBox).add(bBox).add(cBox);
	}

	gemMap()
	{
		let tg = $(this.user.motif).prop("selectedIndex");
		let plain = this.con.accentMap(this.item.bounds,tg);
		let accent = this.con.accentMap(this.item.bounds,tg+4);
		return ($(this.user.accent).prop("selectedIndex") === 0) ? {x:plain.x,y:plain.y} : {x:accent.x,y:accent.y};
		
	}
	draw()
	{
		this.canvas.clear();
		this.canvas.set({backgroundColor:config.global.screen});
		this.getUserInput();
		this.setBounds();
		this.drawRegion(this.item.bounds);

		this.item.pendant =  new fabric.Text(this.allfix,
			{
				fontFamily:this.con.fontName
				,fontSize:this.con.fontSize
				,fill:res.alloy($(this.user.alloy).prop("selectedIndex"))
				,left:this.item.bounds.left
				,top:this.item.bounds.top
				,selectable:false
				,shadow: `${res.shadow($(this.user.alloy).prop("selectedIndex"))} -1 -1 0`
				
			});		
		this.canvas.add(this.item.pendant);

		fabric.Image.fromURL(res.chain($(this.user.alloy).prop("selectedIndex")),(im)=>
		{
			im.scaleToWidth(this.con.chainWidth);
			im.set({left:this.item.bounds.left-this.con.chainWidth-3,top:this.con.prefixMap($(this.user.txt1).val()),objectCaching:false,selectable:false});
			if(this.allfix !== "") this.canvas.add(im);
		});

		fabric.Image.fromURL(res.chain($(this.user.alloy).prop("selectedIndex")),(im)=>
		{
			im.scaleToWidth(this.con.chainWidth);
			im.set({left:this.item.bounds.left+this.item.bounds.width+3,top:this.con.suffixMap($(this.user.accent).prop("selectedIndex"),$(this.user.motif).prop("selectedIndex")),flipX:true,objectCaching:false,selectable:false});
			if(this.allfix !== "") this.canvas.add(im);
		});
		
		fabric.Image.fromURL(res.accent($(this.user.accent).prop("selectedIndex")),(im)=>
		{
			im.scaleToWidth(this.con.gemSize);
			im.set({left:this.gemMap().x,top:this.gemMap().y,originX:"center",originY:"center",objectCaching:false,noScaleCache:false,selectable:false
			,shadow:"rgba(0,0,0,1) 0 0 2"});
			if(this.allfix !== "") 
			{
				this.canvas.add(im);
				im.animate("angle",360,
				{from:0,duration:7200,easing:fabric.util.ease.easeIn,onChange:this.canvas.renderAll.bind(this.canvas)});
			}
		});

		this.dropShadow = new fabric.Circle(
			{
				shadow:"rgba(0,0,0,1) 1 1 10",opacity:0.2,radius:(this.item.bounds.width * 0.5)
				,left:this.con.cw *0.5
				,top:this.con.ch*0.9
				,fill:"#efefef"
				,originX:"center"
				,originY:"center"
				,scaleY:0.01
				,objectCaching:false
				,selectable:false
			});
		
			this.canvas.add(this.dropShadow);
	}

	render()
	{	
		$(document).on("keyup",$(this.user.txt1),(e)=>
		{	
			this.user = inputs();
			this.draw();
			this.debug();
		})
		.on("change",$(this.user.alloy),(e)=>
		{
			this.user = inputs();
			this.draw();
			this.debug();
		});
	}
}