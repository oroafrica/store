import {accents} from "./accents.jsm";

export function test()
{
	console.log("hi from test");
	
	var im = $("body").append("<img id='im'src='' width='200' height='200' />");
	
	$("#im")
	.attr("src","https://www.thoughtco.com/thmb/19F0cna2JSUcDnkuv7oUiSYALBQ=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lotus-flower-828457262-5c6334b646e0fb0001dcd75a.jpg");
}