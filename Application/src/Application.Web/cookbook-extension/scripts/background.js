
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
	    type: "POST",
      data: JSON.stringify(someObj),
	    dataType: "JSON",
	    url: "http://localhost:5000/api/bookmarks"
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:5000/api/bookmarks");
	xhr.send();
}

toSiteEl.addEventListener('click', function(evt){
    console.log('event heard')
    var newURL = "http://localhost:5000/#cookbook";
    chrome.tabs.create({ url: newURL });
})

addRecipeEl.addEventListener('click', function(evt){
  console.log('wired up')
    let queryInfo = {
      active: true,
      currentWindow: true,
    }

    chrome.tabs.query(queryInfo, function(tabs){
		  activeTab = tabs[0]
      let dataObj = {
        bookmarkname: activeTab.title,
        link: activeTab.url
      }
		  console.log(dataObj)
      _sendPostRequest(dataObj)
		})

    let cookieQuery = {
      domain: 'localhost'
    }
    chrome.cookies.getAll(cookieQuery, function(cookies){
      console.log(cookies[0].value)
    })


})
