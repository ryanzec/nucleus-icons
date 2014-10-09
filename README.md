# Nucleus Icons

This is an open source set of svg icons.  These icons are made with Sketch and the Sketch source files are included in this repository.

## Goals

There are a number of goals I hope to maintain with these icons:

- Designed with multi-color in mind
- Even spacing with-in the svg icons themselves
- Controlled purely through CSS and no reliance on JavaScript

Read below for more of a background on why I am building these icons.

## Usage

There are 2 primary ways to interact with this icons, embedded them inline and loading them externally.

### Embed Inline

The svg folder contains all the icons as indivually files.  Simple copy that content into you html and you are ready to go.  To simplify this process I would probably add something to a build process that does this automatically.

The benefit of this method is that you have the real svg content in the html so you have full control with it with css (including of an instance by instance case) however the pricing you pay for that is with additional html size when you have the same icon used multiple times of the page since you need the svg content for each instance (though with gzipping, is should be minimized).

### External

The svg folder also contains a `svg-sprite.svg` file that contains all the icons in one file.  You can then use the svg icons by including the following in your code:

```html
<svg>
  <use xlink:href="/svg-sprite.svg#checkmark-small"></use>
</svg>
```

The value of after the `#` matches the file name of the individual icons minus the extension.

The benefit of this method is that you don't duplicate content and therefore have a some html file size when you have duplicate icons on the same page.  The down side is that you don't have full css control of the svg inner parts on an instance by instance level since the `<use>` tag use the shadow dom which right now can't be controlled by external css.

### Both

Of course you could just use both method.  Use the external method when you only need css on the main svg element and use the inline method when you need to tweak the svg inner parts for that instance, giving you the best of both methods.

## Why?

There are a bunch of free (and some paid) svg icon packs in the wild so why create another?  I originally purchased a license to the Iconic icon set because of the type of functionality that its javascript library provided but I started to run across issues when integrating it with an Angular 1.3 application.  Angular 1.3 requires the use of the `<base>` tag however a number of the smart Iconic icons make use of clipping paths and other svg attributes that use `url()` to be applied.  This causes issues for single page application that require the `<base>` tag (you can read through this [issue](https://github.com/angular/angular.js/issues/8934) on github).  Now I prefer to not to use the `<base>` tag as it always seems to cause more issues than it solves however I do like to use Angular so I guess I am stuck with it.  Now I know that Iconic is in the process of trying to resolves this issue, unfortunately I can't wait for that.

There are are still plenty of svg icons sets that don't involve the use of clipping path or other properties that use `url()`, so why not use them?  Well I have 2 main issues with other icon sets.  One issue stems from one of the main benefits in my view of using svg instead of icon fonts, multi-color.  A number of open source svg icons that I have downloaded in the past are not all built with this is mind.  The second issue is how some icons are spaced within the svg itself.  Most icons I imagine are design in a square grid (16x16, 32x32, 64x64, etc...) however not all icons are squarely dimensioned.  Some icons are taller than wide and others the other way around.  Now maybe this is just because of my lack of experience with icons and maybe this is a lesson I will learn the hard way but I often find some icons with weird spacing.  For example, an icon is 14x12 pixels.  The spacing within the exported svg file though has 2 pixel spacing on the top, bottom, and right, and no pixel spacing on the left.  This is an annoyance for me as a front-end engineer as if I have a number of icons that are are vertically positioned on top of each other and I want them to be centered with each other, that icon appears to be more to the left than the others.  Since the spacing is in the svg itself, I have to add spacing with css for that specific icon.  If I change the icon, I will probably have to change the css.  This is a pretty big issue for me as far as css maintainability.  Making the padding for the icon to be 2 pixels of the top and bottom and 1 pixel on the left and right would eliminate the needs for special icon specific css.

I have also wanted to make my own icons for a while and the reasons above are enough for me to pursue building these icons.

# LICENSE

[CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)