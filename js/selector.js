// Black box highlight functionality from:
// http://stackoverflow.com/questions/11010569/highlight-a-dom-element-on-mouse-over-like-inspect-does
(function() {
  var prev;

  // Only using this in chrome extension, so forget about cross browser compatibility
  if (document.body.addEventListener) {
    document.body.addEventListener('mouseover', mouseOverHandler, false);
    document.body.addEventListener('click', mouseDownHandler, false);
  }

  function mouseOverHandler(event) {
    if (event.target === document.body ||
      (prev && prev === event.target)) {
        return;
      }
    if (prev) {
      prev.className = prev.className.replace(/\bchrome_html_selector_ext_highlight\b/, '');
      prev = undefined;
    }
    if (event.target) {
      prev = event.target;
      prev.className += " chrome_html_selector_ext_highlight";
    }
  }

  function mouseDownHandler(event) {
    if (event.target === document.body) { return; }
    if (event.target) {
      cleanHTML = $.htmlClean(event.target.innerHTML,
                              {format:true,
                               allowedTags:["a", "b", "i", "strong", "em", "p", "param", "h1", "h2", "h3", "h4", "h5", "h6", "br", "hr", "ul", "li", "img"],
                               allowedAttributes:["href", "name", "src", "type", "value"],
                               removeAttrs:["class"]});
      copyToClipboard(cleanHTML);
    }
  }

  // apparently copying to clipboard is hard in JS
  // http://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery 
  function copyToClipboard(text) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";

    // must use a temporary form element for the selection and copy
    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement("textarea");
      target.style.position = "absolute";
      target.style.left = "-9999px";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);
    }
    target.textContent = text;

    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
      succeed = document.execCommand("copy");
    } catch(e) {
      succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
    }

    // clear temporary content
    target.textContent = "";
    return succeed;
  }

})();
