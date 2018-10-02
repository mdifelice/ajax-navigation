Functions:

getKey: returns the key used to save page contents in queue
setContent: set contents from the queue (and updates queue with current
		content)
getActiveMediaPlayers: checks for players in DOM (audio and video)
setQueue: appends item to the queue (or updates)
fetchContent: returns an URL from the server
preloadContent: preloads content
isLinkAjaxable: checks if a item is ajaxable
closeModal: close modal dialog
setPosition: translates 3D an element
setTransform: sets CSS transform property
setTransition: sets CSS transition property
getPosition: returns 3D position of an element
isMobile: checks if visitor is mobile
init: prepare all

Globals:

settings: from the server
targetContainer: the container to be updated
isModal: modal mode
isSwipe: swipe mode
contentQueue: queue of contents
cacheTimeout: global cache timeout
linkSelector: which links should be filtered in
isDoingAjax: whether is calling server
isPreloading: whether is preloading content

To-Do:
- Send blacklist from server.
