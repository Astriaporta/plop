/**
 * Created by Astriaporta on 22/12/2016.
 * @version 2.0.0
 */
var Plop = (function (w, d) {

    'use strict';

    var eco, addEvent, setEventOn, setTittle, show, close, init, display, newElement, removeElement, css, setBtnClose, setValue,
        setSize, displayOverlay, setColorHeader, setBgHeader, setAlphaOverlay;
    var box, btnClose, $overlay, $header, title, aBody;

    eco = function (v) {
        console.log(v);
    }

    /**
     *
     * @param DOM obj
     * @param event evt
     * @param function fn
     * @returns void
     */
    addEvent = function (elem, evt, fn) {
        if (elem.addEventListener) {
            elem.addEventListener(evt, fn, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + evt, fn);
        }
    }

    /**
     * Trigger the "on" event on an element
     *
     * @param DOM dom | querySelector or getElementById
     * @param String event | click, change...
     * @param Function fn
     * @returns void
     */
    setEventOn = function (elem, event, fn) {
        if (null == elem)
            return;

        addEvent(elem, event, fn);
    }

    /**
	 * Return value or a default value
     * @param value
     * @param dflt  default value
     * @returns {*}
     */
    setValue = function (value, dflt) {
        return value || dflt;
    }

    /**
     * Applies a css style on element
     * @param {Element} elem
     * @param object styles
     */
    css = function (elem, styles) {
        styles = styles || {};

        if (typeof styles.opacity !== "undefined") {
            styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")";
        }

        for (var prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                elem.style[prop] = styles[prop];
            }
        }
    }

    /**
     * Create an element with attribute
     * @param string elem
     * @param object attrs
     * @returns {Element}
     */
    newElement = function (elem, attrs) {
        var el = d.createElement(elem);
        for (var prop in attrs) {
            el.setAttribute(prop, attrs[prop]);
        }
        return el;
    }

    /**
     * @param el
     */
    removeElement = function (elem) {
      if (null == elem)
          return;
        elem.parentNode.removeChild(elem);
    }

    /**
     * Set display to element
     * @param {Element} elem
     * @param string param
     */
    display = function (elem, param) {
        css(elem, {display: param});
    }

    /**
     * Initialize
     */
    init = function () {
        /* Creating elements */
        $overlay        = newElement("div", {id: "plopOverlay", class: "plop-overlay"});

        box  = newElement("div", {class: "plop-content"});

        $header         = newElement("div", {class: "plop-header"});

        aBody        = newElement("div", {id: "content", class: "plop-body"});

        /* Structuring */

        box.appendChild($header);
        box.appendChild(aBody);

        $overlay.appendChild(box);

        d.body.appendChild($overlay);

        display($overlay, "none");
    }

    /**
     * Hide popup
     */
    close = function () {
        removeElement(title);
        removeElement(btnClose);
        aBody.innerHTML = "";
        display($overlay, "none");
    }

    /**
     * If you want an overlay
     * @param display
     */
    displayOverlay = function (display) {
        if (display === false) {
            css($overlay, {backgroundColor: "rgba(0,0,0,0)"});
        }
    }

    setAlphaOverlay = function (alpha) {
        if (alpha !== "") {
            css($overlay, {backgroundColor: "rgba(0,0,0," + alpha + ")"});
        }
    }
    /**
	 * Set size of the box
     * @param wi
     * @param he
     */
    setSize = function (wi, he) {
        if (wi !== "" && typeof wi === "number") {
            wi = "" + wi + "px";
        }

        if (he !== "" && typeof he === "number") {
            he = "" + he + "px";
        }

        css(box, {width: wi, height: he});
    }

    /**
	 * Display a button close with event
	 *
     * @param bool display
     */
    setBtnClose = function (display) {
        if (display) {
            btnClose = newElement("span", {class: "close", title: "Close"});

            btnClose.innerHTML = "&times;";

            $header.appendChild(btnClose);

            /* Events */
            setEventOn(btnClose, "click", close);
        }
    }

    /**
     * Set a tittle but not mandatory
     * @param title
     * @param align
     */
    setTittle = function (title, align) {
        if (title !== "") {
            title = newElement("h2", {id: "plop-title", class: "plop-title"});

            $header.appendChild(title);

            title.innerHTML = title || "";

            align = align || "left";

            css(aBody, {textAlign: align});
        }
    }

    /**
     * Set color text in the header
     * @param c
     */
    setColorHeader = function (c) {
        if (c !== "") {
            css($header, {color: c});
        }
    }

    /**
     * Set backgroung color to the header
     * @param c
     */
    setBgHeader = function (c) {
        if (c !== "") {
            css($header, {backgroundColor: c});
        }
    }

    /**
     * Show popup
     * In object :
     * @param content
     * @param title
     * @param width         if empty => use max-width
     * @param height        if empty => use min-height
     * @param overlay       set display overlay (boolean)
     * @param headerColor
     * @param headerBgc     Background color of header
     * @param btnClose      set display cross close (boolean)
     */
    show = function (param) {
        var content, overlay, width, height, title, align, headerColor, headerBgc, btnClose, alphaOverlay;

        content         = setValue(param.content, "");
        width           = setValue(param.width, "");
        height          = setValue(param.height, "");
        overlay         = setValue(param.overlay, true);
        alphaOverlay    = setValue(param.alphaOverlay, "");
        title           = setValue(param.title, "");
        align           = setValue(param.align, "");
        headerColor     = setValue(param.headerColor, "");
        headerBgc       = setValue(param.headerBgc, "none");
        btnClose        = setValue(param.btnClose, false);

        displayOverlay(overlay);
        setAlphaOverlay(alphaOverlay);

        setSize(height, height);

        setTittle(title, align);

        setColorHeader(headerColor);
        setBgHeader(headerBgc);

        setBtnClose(btnClose);

        aBody.innerHTML = content;

        display($overlay, "");
    }

    // If click on the overlay : hide the box
    setEventOn(w, "click", function (e) {
        if (e.target == $overlay) {
            close();
        }
    });

    init();

    return {
        show: show,
        hide: close
    };
})(window, document);
