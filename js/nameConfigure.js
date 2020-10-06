export const config={
global:{screen:"rgba(231,245,249,0.8)"}
,bname:{fontName:"bname",fontSize:35,gemSize:14,gemRadius:14/2,pua:60000,cw:420,ch:250,chainWidth:240}
,cname:{fontName:"cname",fontSize:35,gemSize:14,gemRadius:14/2,pua:60000,cw:420,ch:250,chainWidth:240,prefixMap:(a)=>{return (a.length > 0 && a.substr(0,1).match(/[a-z]/g)) ? -126 : -142;}}
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
