(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _page = _interopRequireDefault(require("./page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Container =
/*#__PURE__*/
function () {
  function Container(id) {
    _classCallCheck(this, Container);

    this.id = id;
    this.rootElement = document.getElementById(id) || document.body;
    this.currentPage = this.parsePage(document.location.href, document.title, document.body.className);
  }

  _createClass(Container, [{
    key: "render",
    value: function render(page) {
      this.currentPage.update();
      document.title = page.documentTitle;
      document.body.className = page.bodyClass;

      while (page.rootElement.firstChild) {
        this.rootElement.appendChild(page.rootElement.firstChild);
      }

      window.scrollTo(page.scrollX, page.scrollY);
      this.currentPage = page;
    }
  }, {
    key: "parsePage",
    value: function parsePage(href, html) {
      var parser = new DOMParser(),
          document = parser.parseFromString(html, 'text/html'),
          documentTitle = document.title,
          bodyClass = document.body.className,
          rootElement = null,
          page = null;

      if (this.id) {
        rootElement = document.getElementByID(this.id);
      } else {
        rootElement = document.body;
      }

      return new _page.default(href, documentTitle, bodyClass, rootElement);
    }
  }]);

  return Container;
}();

exports.default = Container;

},{"./page":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Events =
/*#__PURE__*/
function () {
  function Events() {
    _classCallCheck(this, Events);
  }

  _createClass(Events, null, [{
    key: "on",
    value: function on(selector, eventName, callback, container) {
      container = container || document;
      var elements = container.querySelectorAll(selector);
      elements.forEach(function (element) {
        element.addEventListener(eventName, callback);
      });
    }
  }, {
    key: "live",
    value: function live(selector, eventName, callback) {
      var _this = this;

      this.on(selector, eventName, callback);

      if (window.MutationObserver) {
        var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if ('childList' === mutation.type) {
              mutation.addedNodes.forEach(function (node) {
                if (node.matches && node.matches(selector)) {
                  node.addEventListener(eventName, callback);
                } else if (node.querySelectorAll) {
                  _this.on(selector, eventName, callback, node);
                }
              });
            }
          });
        });
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }
  }]);

  return Events;
}();

exports.default = Events;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var History =
/*#__PURE__*/
function () {
  function History(cacheTimeout) {
    _classCallCheck(this, History);

    this.cacheTimeout = cacheTimeout;
    this.pages = {};
  }

  _createClass(History, [{
    key: "getPage",
    value: function getPage(key) {
      var possiblePage = this.pages[key],
          page = null;

      if (undefined !== possiblePage) {
        if (!this.cacheTimeout || new Date().now - possiblePage.timestamp <= this.cacheTimeout) {
          page = possiblePage;
        }
      }

      return page;
    }
  }, {
    key: "setPage",
    value: function setPage(page) {
      var currentPage = this.getPage(page.key);

      if (currentPage) {
        page.timestamp = new Date().now;
      }

      this.pages[page.key] = page;
    }
  }]);

  return History;
}();

exports.default = History;

},{}],4:[function(require,module,exports){
"use strict";

var _container = _interopRequireDefault(require("./container"));

var _events = _interopRequireDefault(require("./events"));

var _history = _interopRequireDefault(require("./history"));

var _page = _interopRequireDefault(require("./page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  function filterAnchor(anchor) {
    var target = anchor.getAttribute('target') || '',
        filter = true;

    if ('_blank' !== target.toLowerCase()) {
      filter = filterUrl(anchor);
    }

    return filter;
  }

  function filterUrl(url) {
    var filter = true;

    if (window.location.hostname === url.hostname) {
      var pathName = url.pathname;

      if (window.location.pathname !== pathName || !url.hash) {
        var blacklist = settings.urlBlacklist;
        filter = false;

        for (var i in blacklist) {
          var pattern = new RegExp(blacklist[i]);

          if (pattern.test(pathName)) {
            filter = true;
            break;
          }
        }
      }
    }

    return filter;
  }

  function init() {
    var container = new _container.default(settings.containerId),
        history = new _history.default(settings.cacheTimeout);
    var currentPage = container.currentPage;
    history.setPage(currentPage);
    window.history.replaceState({
      key: currentPage.key
    }, currentPage.documentTitle, document.location.href);

    _events.default.live('a', 'click', function (e) {
      var anchor = this;

      if (!filterAnchor(anchor)) {
        e.preventDefault();
        var bodyClassList = document.body.classList; // Avoid double fetching by checking this body class.

        if (!bodyClassList.contains('ajax-navigation-fetching')) {
          bodyClassList.add('ajax-navigation-fetching');
          var href = anchor.href;

          var key = _page.default.generateKey(href),
              page = history.getPage(key);

          if (page) {
            container.render(page);
          } else {
            fetch(href).then(function (html) {
              var page = container.parsePage(href, html);
              bodyClassList.remove('ajax-navigation-fetching');
              history.setPage(page);
              container.render(page);
              window.history.pushState({
                key: page.key
              }, page.documentTitle, href);
            }).catch(function () {
              // In case of an error, it fallbacks in regular navigation.
              window.location.href = href;
            });
          }
        }
      }
    }); // When the user goes back or forward, we retrieve the content from the queue


    window.addEventListener('popstate', function (e) {
      var key = e.state ? e.state.key : null;

      if (key) {
        container.render(history.getPage(key));
      }
    });
  }

  if (undefined !== window.ajaxNavigation) {
    var settings = window.ajaxNavigation;
    var readyState = document.readyState;

    if ('complete' === readyState || 'interactive' === readyState) {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }
})();

},{"./container":1,"./events":2,"./history":3,"./page":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Page =
/*#__PURE__*/
function () {
  function Page(href, documentTitle, bodyClass, rootElement) {
    _classCallCheck(this, Page);

    this.key = Page.generateKey(href);
    this.documentTitle = documentTitle;
    this.bodyClass = bodyClass;
    this.rootElement = rootElement;
    this.timestamp = new Date().now;
    this.updateScroll();
  }

  _createClass(Page, [{
    key: "update",
    value: function update() {
      this.documentTitle = document.title;
      this.updateScroll();
    }
  }, {
    key: "updateScroll",
    value: function updateScroll() {
      this.scrollX = window.scrollX;
      this.scrollY = window.scrollY;
    }
  }], [{
    key: "generateKey",
    value: function generateKey(href) {
      var key = href.replace(document.location.origin, ''),
          appendSlash = false;

      if (key.length) {
        if ('/' !== key.charAt(key.length - 1)) {
          appendSlash = true;
        }
      } else {
        appendSlash = true;
      }

      if (appendSlash) {
        key += '/';
      }

      return key;
    }
  }]);

  return Page;
}();

exports.default = Page;

},{}]},{},[4]);
