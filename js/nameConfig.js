export const config={
global:{screen:"rgba(231,245,249,0.8)"}
,bname:{fontName:"bname",fontSize:35,gemSize:14,gemRadius:14/2,pua:60000,cw:420,ch:250,chainWidth:240}
,cname:
{
	fontName:"cname"
	,fontSize:35
	,gemSize:14
	,gemRadius:14/2
	,pua:60000
	,cw:420
	,ch:250
	,chainWidth:240
	,prefixMap:(a)=>{return (a.length > 0 && a.substr(0,1).match(/[a-z]/g)) ? -126 : -142;}
	,suffixMap:(accent,motif)=>
	{
		let n = {0:-127,1:-121,2:-127,3:-120,4:-121,5:-121,6:-127,7:-120};
		return (accent === 0) ? Object.values(n)[motif] : Object.values(n)[motif+4];
	}
	,accentMap:(z)=>{ let a = z.left+z.width;
	return {x:{0:0, 1:0, 2:0, 3:0, 4:(a-1),5:(a-8),6:(a-3),7:(a-11)}
	,y:{0:0, 1:0, 2:0, 3:0, 4:129,5:126,6:124,7:122}}//{0:0, 1:0, 2:0, 3:0, 4:122+radius,5:119+radius,6:117+radius,7:115+radius};
	}
}
,mname:{fontName:"mname",fontSize:35,gemSize:14,gemRadius:14/2,pua:60000,cw:420,ch:250,chainWidth:240}
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
