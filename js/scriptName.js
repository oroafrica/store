import {res} from "./resources.js";
import {config, inputs} from "./nameConfigure.js";

export class Store
{
	constructor()
	{
		//boolean
		this.dev=true;
		this.canvas = new fabric.Canvas('canvas',{backgroundColor:"rgba(231,245,249,0.8)",width:config.global.cw,height:config.global.ch,objectCaching:false});
		this.user = inputs();
		this.pendant;
	
	}
	
	msg(a)
	{
		console.log(a);
	}
	
	debug()
	{
		this.msg("Hello name store");
		this.msg($(this.user.txt1).prop("selectedIndex"));
		this.msg($(this.user.alloy).prop("selectedIndex"));
		this.msg($(this.user.motif).prop("selectedIndex"));
		this.msg($(this.user.accent).prop("selectedIndex"));
		
	}
	setBounds(ok)
	{	

	}
	
	draw()
	{
		
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