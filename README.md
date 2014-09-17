# Nucleus Icons

This is an open source set of svg icons.  These icons are made with Sketch and the Sketch source files are included in this repository.

## Goals

There are a number of goals I hope to maintain with these icons:

- Designed with multi-color in mind
- Even spacing with-in the svg icons themselves
- Controlled purely through CSS and no reliance on JavaScript

Read below for more of a background on why I am building these icons.

## Why?

There are a bunch of free (and some paid) svg icon packs in the wild so why create another?  I originally purchased a license to the Iconic icon set because of the type of functionality that its javascript library provided but I started to run across issues when integrating it with an Angular 1.3 application.  Angular 1.3 requires the use of the `<base>` tag however a number of the smart Iconic icons make use of clipping paths and other svg attributes that use `url()` to be applied.  This causes issues for single page application that require the `<base>` tag (you can read through this [issue](https://github.com/angular/angular.js/issues/8934) on github).  Now I prefer to not to use the `<base>` tag as it always seems to cause more issues than it solves however I do like to use Angular so I guess I am stuck with it.  Now I know that Iconic is in the process of trying to resolves this issue, unfortunately I can't wait for that.

There are are still plenty of svg icons sets that don't involve the use of clipping path or other properties that use `url()`, so why not use them?  Well I have 2 main issues with other icon sets.  One issue stems from one of the main benefits in my view of using svg instead of icon fonts, multi-color.  A number of open source svg icons that I have downloaded in the past are not all built with this is mind.  The second issue is how some icons are spaced within the svg itself.  Most icons I imagine are design in a square grid (16x16, 32x32, 64x64, etc...) however not all icons are squarely dimensioned.  Some icons are taller than wide and others the other way around.  Now maybe this is just because of my lack of experience with icons and maybe this is a lesson I will learn the hard way but I often find some icons with weird spacing.  For example, an icon is 14x12 pixels.  The spacing within the exported svg file though has 2 pixel spacing on the top, bottom, and right, and no pixel spacing on the left.  This is an annoyance for me as a front-end engineer as if I have a number of icons that are are vertically positioned on top of each other and I want them to be centered with each other, that icon appears to be more to the left than the others.  Since the spacing is in the svg itself, I have to add spacing with css for that specific icon.  If I change the icon, I will probably have to change the css.  This is a pretty big issue for me as far as css maintainability.  Making the padding for the icon to be 2 pixels of the top and bottom and 1 pixel on the left and right would eliminate the needs for special icon specific css.

I have also wanted to make my own icons for a while and the reasons above are enough for me to pursue building these icons.

# LICENSE

[CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)