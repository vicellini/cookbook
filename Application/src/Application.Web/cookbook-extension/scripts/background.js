let addRecipeEl = document.querySelector("#add-recipe");
let toSiteEl = document.querySelector('#to-cookbook');

_getActiveTabInfo = function(tabs){
  console.log('hello???')
  activeTab = tabs[0]
  let url = activeTab.url
  let title = activeTab.title
  console.log(url, title)
  console.assert(typeof url == 'string', 'tab.url should be a string');
  }

_sendPostRequest = function(someObj){
	$.post("http://localhost:5000/api/bookmarks");

	$.ajax({
	    type: "POST",
	    dataType: "JSON",
	    url: "http://localhost:5000/api/bookmarks"
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:5000/api/bookmarks");
	xhr.send();
}

toSiteEl.addEventListener('click', function(evt){
    console.log('event heard')
    var newURL = "http://localhost:5000";
    chrome.tabs.create({ url: newURL });
})

addRecipeEl.addEventListener('click', function(evt){
  console.log('wired up')
    let queryInfo = {
      active: true,
      currentWindow: true,
    }

    chrome.tabs.query(queryInfo, function(tabs){
			console.log('hello???')
			let dataObj = {
				
			}
		  activeTab = tabs[0]
		  let url = activeTab.url
		  let title = activeTab.title
		  console.log(url, title)
		  console.assert(typeof url == 'string', 'tab.url should be a string');
		})

    let cookieQuery = {
      domain: 'localhost'
    }

    chrome.cookies.getAll(cookieQuery, function(cookies){
      console.log(cookies)
    })
})
