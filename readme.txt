=== AJAX Navigation ===
Contributors: mdifelice
Tags: ajax
Tested up to: 5.0.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

This plugin transforms any regular WordPress sites into a fully AJAX-navigable
one. What does this mean? It means that whenever you click in a link that
points to a page inside your website, that request will be done by AJAX and it
will only be refreshed the portions of the page that changed avoiding a full
rendering thus, this way, the transitions between pages will be faster.

=== Frequently Asked Questions ===

= What should I take into account when enabling it? =

Some plugins may add some JavaScript functionality that may not work when
navigating the website with this plugin enabled. In future releases, it is
planned to add support for those kind of plugins.

= What the Advanced Settings mean? =

There are two settings: *Cache timeout* and *Container ID*.

**Cache timeout* allows to specify the number of seconds a page will be cached
before requesting it again to the server in case the visitors wants to
navigate it. So, if a visitor visits a cached page it will retrieved for local
memory instead of making a request to the server. If you do not provide this
value or leave it in zero, it means no cache operation will be performed.

**Container ID** refers to the ID of some HTML element that you want to
specifically be refreshed when requesting a new page. For example, in case
you know your site header and footer are the same for each of your website and
the content only changes inside some specific HTML element, you may provide
such element ID and only that element will be refreshed. If you do not
complete this setting the whole *BODY* element will be replaced when updating
the page.

= I do not like the transition effect between pages, how do I change it? =

This plugin enqueues a CSS file which provides the transition effect when
navigating to a new page. You can disable or modify this effect by overriding
the classes such CSS file defines.
