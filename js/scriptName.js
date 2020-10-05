import {res} from "./resources.js";
import {config, inputs} from "./nameConfigure.js";

export class Store
{
	constructor()
	{
		//boolean
		this.dev=true;
		this.canvas = new fabric.Canvas('canvas',{backgroundColor:"rgba(231,245,249,0.8)",width:config.global.cw,height:config.global.ch,objectCaching:false});
		
		this.pendant;
	
	}
	
	msg(a)
	{
		console.log(a);
	}
	
	debug()
	{
		this.msg("Hello name store");
	}
	setBounds(ok)
	{	

	}
	
	draw()
	{
		
	}

	render()
	{	
		$(document).on("keyup",$(this.uTxt),(e)=>
		{
			this.draw();
			this.debug();
		})
		.on("change",$(this.uAlloy),(e)=>
		{
			this.draw();
			this.debug();
		});
	}
}