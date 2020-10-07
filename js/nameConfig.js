export const config={
	global:{canvasId:"canvas",screen:"rgba(231,245,249,0.8)"}
	,bname:
	{
		fontName:"bname"
		,fontSize:35
		,gemSize:14
		,cw:420
		,ch:250
		,chainWidth:240
		,prefixMap:(a)=>{return (a.length > 0 && a.substr(0,1).match(/[a-z]/g)) ? -127 : -150;}
		,suffixMap:(accent,motif)=>
		{
			let n = {0:-132, 1:-123, 2:-132, 3:-122,4:-124,5:-123,6:-132,7:-122};
			return (accent === 0) ? Object.values(n)[motif] : Object.values(n)[motif+4];
		}
		,accentMap:(bounds,i)=>{ let a = bounds.left+bounds.width;
		return {
			x:Object.values({0:0, 1:0, 2:0, 3:0, 4:(a-10),5:(a-22),6:(a-12.5),7:(a-25)})[i]
			,y:Object.values({0:0, 1:0, 2:0, 3:0, 4:127,5:125,6:122,7:120})[i]}
		}
		,prefixFn:(d)=> {return (d.length >= 1) ? String.fromCharCode(d.substring(0,1).charCodeAt(0) + 60000) : "";}
		,infixFn:(a)=> {return (a.length > 1) ? a.substring(1,a.length) : "";}
		,suffixFn:(a)=> {return String.fromCharCode(Object.values({0:61, 1:60091, 2:60040, 3:60123, 4:60062,5:60093,6:60041,7:60125})[a]);}
	}
	,cname:
	{
		fontName:"cname"
		,fontSize:35
		,gemSize:14
		,cw:420
		,ch:250
		,chainWidth:240
		,prefixMap:(a)=>{return (a.length > 0 && a.substr(0,1).match(/[a-z]/g)) ? -126 : -142;}
		,suffixMap:(accent,motif)=>
		{
			let n = {0:-127,1:-121,2:-127,3:-120,4:-121,5:-121,6:-127,7:-120};
			return (accent === 0) ? Object.values(n)[motif] : Object.values(n)[motif+4];
		}
		,accentMap:(bounds,i)=>{ let a = bounds.left+bounds.width;
		return {
			x:Object.values({0:0, 1:0, 2:0, 3:0, 4:(a-8),5:(a-15),6:(a-10),7:(a-18)})[i]
			,y:Object.values({0:0, 1:0, 2:0, 3:0, 4:129,5:126,6:124,7:122})[i]}
		}
		,prefixFn:(d)=> {return (d.length >= 1) ? String.fromCharCode(d.substring(0,1).charCodeAt(0) + 60000) : "";}
		,infixFn:(a)=> {return (a.length > 1) ? a.substring(1,a.length) : "";}
		,suffixFn:(a)=> {return String.fromCharCode(Object.values({0:61, 1:60091, 2:60040, 3:60123, 4:60062,5:60093,6:60041,7:60125})[a]);}
	}
	,mname:
	{
		fontName:"mname"
		,fontSize:35
		,gemSize:14
		,cw:420
		,ch:250
		,chainWidth:240
		,prefixMap:(a)=>{return (a.length > 0 && a.substr(0,1).match(/[a-z]/g)) ? -119 : -118;}
		,suffixMap:(accent,motif)=>
		{
			let n = {0:-119, 1:-119, 2:-119, 3:-119, 4:-119,5:-119,6:-119,7:-119};
			return (accent === 0) ? Object.values(n)[motif] : Object.values(n)[motif+4];
		}
		,accentMap:(bounds,i)=>{ let a = bounds.left+bounds.width;
		return {
			x:Object.values({0:0, 1:0, 2:0, 3:0, 4:(a-6),5:(a-13),6:(a-9),7:(a-15)})[i]
			,y:Object.values({0:0, 1:0, 2:0, 3:0, 4:131,5:131,6:130,7:128})[i]}
		}
		,prefixFn:(d)=> {return (d.length >= 1) ? String.fromCharCode(d.substring(0,1).charCodeAt(0) + 60000) : "";}
		,infixFn:(a)=> {return (a.length > 1) ? a.substring(1,a.length) : "";}
		,suffixFn:(a)=> {return String.fromCharCode(Object.values({0:61, 1:60091, 2:60040, 3:60123, 4:60062,5:60093,6:60041,7:60125})[a]);}
	}
}

export function inputs()
{
	let user = {};
	user.txt1 = $("input[title='Enter your name here']");
		
	let tgt = $('select').toArray();
	$.each(tgt, (index)=> 
	{
		if($(tgt).eq(index).find("option").length > 2 && $(tgt)[index].options[1].text === "Silver")
		{
			user.alloy = $(tgt)[index];
		}
		if($(tgt).eq(index).find("option").length > 2 && $(tgt)[index].options[1].text === "Heart")
		{
			user.motif = $(tgt)[index];
		}
		if($(tgt).eq(index).find("option").length > 2 && $(tgt)[index].options[1].text === "Genuine Diamond")
		{
			user.accent = $(tgt)[index];
		}
	}); 
	return user;
}
