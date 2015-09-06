# Tesseract

Minimalistic web-based presentation framework using vanilla HTML5 / JS / CSS

## Concept

Presentation frameworks and presentation creation services are as numerous as Ruby gems online, but all of them are heavily reliant on barely-supported features, browser polyfills, and heavy JavaScript work, are expensive and/or proprietary, not to mention a lot of computing horsepower or browser optimizations to run smoothly. They require a lot of design work, user configuration, and break easily.

The same goes for document authoring -- everything from Microsoft Word to Google Docs, while fairly usable, are definitely not _lightweight_. But we've solved that already -- we have Markdown and LaTeX to typeset complex _or_ simple documents remarkably easily and semantically. So why not bring the same semantic markup-based authoring to presentations? That's what Tesseract does.

## Specs

Tesseract is a family of semantic HTML markups that comprise a single presentationt to run inside a (currently webkit-only) browser. Briefly, an example presentation may look something like below. (DOM elements abbreviated).

    #tesseract-toolbar
      // elements inside the toolbar fall here
    #presentation
      .slide // single presentation slide
        .bt // title slide block (headers appear vertically centered)
          h1.tC // Presentation title
          h2.tC // Presentation subtitle
      .slide 
        .h1 // slide title
        .txt // text box filling the rest of the slide
      .slide
        .txt .noh // text box without margin up top for title
      .slide
        .h1
        .txt .x2 // text box filling 1/2 of the slide horizontally
        .txt .x2
      .slide
        .h1
        .txt .x3 // text box filling 1/3 of the slide (1/4 also possible with .x4
        .txt .x3-2 // fills 2/3 or about 66.7% of the slide horizontally
      .slide 
        .h1
        .txt
          h2 // subtitles may be added
            .li // list with no headers
                // headers may be .bullet, .roman, .numbered (arabic), or .alpha


For more information and samples, please refer to __demo.html__.

## Project Roadmap

There are several features and patches in development

* Broader browser compatibility, esp. with FireFox, Edge, IE10+, and Opera
* Animating elements
* Slide transitions
* Styling toolbar

## How to use

Because Tesseract is written entirely in vanilla HTML / CSS / JavaScript, applying Tesseract to an HTML markup is simply loading [tesseract.js](http://random.thelifelongtraveler.com/inactives/tesseract/tesseract.js) and [tesseract.css](http://random.thelifelongtraveler.com/inactives/tesseract/tesseract.css) script and stylesheet onto the page.

For information how to make a presentation with Tesseract please refer to the __Specs__ section above.

Other configuration options are available and either described within the script file or will be added to the documentation in the future.

