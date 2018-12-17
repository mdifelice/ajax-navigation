"use strict";

var _this = void 0;

module.exports = {
  on: function on(selector, eventName, callback, container) {
    var elements = container.querySelectorAll(selector);
    container = container || document;
    elements.forEach(function (element) {
      element.addEventListener(eventName, callback);
    });
  },
  live: function live(selector, eventName, callback) {
    _this.on(selector, eventName, callback);

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
};

(function () {
  var _this2 = this;

  var events = require('./events.js');

  var historyQueue = {};

  var filterAnchor = function filterAnchor(anchor) {
    var filter = true;

    if (window.location.hostname === anchor.hostname) {
      var pathName = anchor.pathname;

      if (window.location.pathname !== pathName || !anchor.hash) {
        var target = anchor.getAttribute('target') || '';

        if ('_blank' !== target.toLowerCase()) {
          filter = false;
          var blacklist = [/^\/wp-login\.php$/, /^\/wp-admin\/?/, /\/feed\/?$/];

          for (var i in blacklist) {
            var pattern = blacklist[i];

            if (pattern.test(pathName)) {
              console.log(1);
              filter = true;
              break;
            }
          }
        }
      }
    }

    return filter;
  };

  var init = function init() {
    var cacheTimeout = parseInt(settings.cache_timeout) || 0;
    var container = document.getElementById(settings.container_id) || document.body;
    window.history.replaceState({
      key: document.location.href
    }, document.title, document.location.href); //setQueue( ... );

    events.live('a', 'click', function (e) {
      var anchor = _this2;

      if (!filterAnchor(anchor)) {
        e.preventDefault();

        if (!document.body.classList.contains('ajax-navigation-fetching')) {
          document.body.classList.add('ajax-navigation-fetching');
          var url = anchor.href;
          fetch(url).then(function (response) {
            setContent(key);
          }).catch(function () {
            window.location.href = url;
          });
        }
      }
    });
    window.addEventListener('popstate', function (e) {
      var key = e.state && e.state.key ? e.state.key : null;

      if (key) {
        setContent(key, false);
      }
    });
  };

  if ('undefined' !== typeof window.ajax_navigation) {
    var _settings = window.ajax_navigation;
    var readyState = document.readyState;

    if ('complete' === readyState || 'interactive' === readyState) {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }
})();
