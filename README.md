# Plop
A simple lightbox

For use:

* add in header plop.css (but you can use your own style)

* add plop.js

* and just do Plop.show();

The show function need an object in parameter that can contain:
     * content      the content of the box (text, html code, image...)
     * title         the title (but it's not an obligation)
     * width         if empty => use max-width
     * height        if empty => use min-height
     * overlay       set display overlay (boolean)
     * headerColor   Color font of the header (you must set title)
     * headerBgc     Background color of header (you must set title)
     * btnClose      set display cross close (boolean)

