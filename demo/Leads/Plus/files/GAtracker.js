function trackFormClick(campCode, tracking, status){
	_gaq.push(['_trackEvent', campCode, tracking, status]);
}
function trackEvent(event){
	var page = window.location.href;
	if(getPage() !== undefined){
		page = 'strona '+getPage();
	}
	
	_gaq.push(['_trackEvent', page, event.category, event.object]);
	//alert('timeEvent page: '+page+' step: '+event.category+' interval: '+event.object+' time: '+event.time);
}

function trackTimeEvent(event){
	var page = window.location.href;
	if(getPage() !== undefined){
		page = 'strona '+getPage();
	}
	
	_gaq.push(['_trackEvent', page, event.category, event.object, event.time]);
	//alert('timeEvent page: '+page+' step: '+event.category+' interval: '+event.object+' time: '+event.time);
}

function getPage(){
	var array = getUrlVars();
	var page = array['page'];
	return page;
}

function getUrlVars(){

	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		//vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
}