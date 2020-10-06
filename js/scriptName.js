import {res} from "./resources.js";
import {config, inputs} from "./nameConfig.js";

export class Store
{
	constructor(myStyle)
	{
		//boolean
		this.dev=true;
		this.renderBounds=false;
		this.con = config[myStyle.toLowerCase()];  
		this.canvas = new fabric.Canvas('canvas',{backgroundColor:config.global.screen,width:this.con.cw,height:this.con.ch,objectCaching:false,hoverCursor:"pointer"});
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
			,allfix:this.allfix
			,config:this.con
		}
		this.msg(JSON.stringify(report));
	}

	getUserInput()
	{
		let a = $(this.user.txt1).val();
		if(a.substring(0,1).match(/^[\&|\-]/g) || a === "" || a === "Enteryournamehere") return;
		a = this.regex(a.split(" ").join(""));
		let b = ($(this.user.accent).prop("selectedIndex") === 0) ? this.suffixFn($(this.user.motif).prop("selectedIndex")) : this.suffixFn($(this.user.motif).prop("selectedIndex") + 4);
		this.allfix = (a.length > 0) ? this.prefixFn(a).concat(this.infixFn(a)).concat(b) : ""; 
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
		let radius = this.con.gemRadius;
		let z = this.item.bounds.width+this.item.bounds.left;
		let gx = {0:0, 1:0, 2:0, 3:0, 4:122+radius,5:119+radius,6:117+radius,7:115+radius};
		let gy = {0:0, 1:0, 2:0, 3:0, 4:(z-15+radius),5:(z-22+radius),6:(z-17+radius),7:(z-25+radius)};
		let tg = $(this.user.motif).prop("selectedIndex");
		return ($(this.user.accent).prop("selectedIndex") === 0) ? {y:Object.values(gx)[tg],x:Object.values(gy)[tg]} : {y:Object.values(gx)[tg+4],x:Object.values(gy)[tg+4]};
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
			im.set({left:this.gemMap().x,top:150,originX:"center",originY:"center",objectCaching:false,noScaleCache:false,selectable:false
			,shadow:"rgba(0,0,0,1) 0 0 2"});
			if(this.allfix !== "") 
			{
				this.canvas.add(im);
				this.activeGem.animate("angle",720,
				{from:0,duration:3600,easing:fabric.util.ease.easeOutBounce,onChange:this.canvas.renderAll.bind(this.canvas)});
			}
		});
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