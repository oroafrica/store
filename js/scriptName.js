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
		this.msg($(inputs().user.txt1).val());
	}
	setBounds(ok)
	{	

	}
	
	draw()
	{
		
	}

	render()
	{	
		$(document).on("keyup",$(inputs.txt1),(e)=>
		{
			
			this.draw();
			this.debug();
		})
		.on("change",$(inputs.alloy),(e)=>
		{
			this.draw();
			this.debug();
		});
	}
}