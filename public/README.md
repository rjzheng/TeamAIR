Validations:

We have 7 errors and 31 warnings in total for the soundboard.css file. They all follow the pattern that the there are unknown vendor extensions such as -webkit, -o, -ms, and -moz.
After doing research online, we came to a conclusion that these errors and warnings are	ok to have because the validator does not recognize these extensions. However, we need to have them to make sure everything shows correctly on different browsers.

As for our html files we have two errors for both the vanilla and library versions.
The first is “Attribute http-equiv not allowed on element meta at this point”
And the second is “Element meta is missing one or more of the following attributes: itemprop, property”. We are not worried about these errors as we attempted to follow convention by using the following -> https://www.w3.org/TR/WCAG20-TECHS/H76.html
We placed the content in the noscript tag and are okay with the error as we definitely want to make sure the user has javascript enabled before going to our site. 


File Size and Performance Data:

Vanilla JS file size: jquerymin.js (87KB) + jquery.js (3KB) => 90KB
JQuery(library) file size: vanilla.js => 4KB

Mobile load times:
JQuery  	=> 2.4 - 5.6s
Vanilla   	=> 2.3 - 3.5s

Web load times:
JQuery  	=> 1.6 - 2.7s
Vanilla   	=> 1.5 - 2.7s

On Experience Overall:

Developing with JQuery was somewhat easier than vanilla Javascript. The reason being that a lot of functions such as making Ajax calls, show and hiding content are abbreviated  into callable functions instead of having to write out multiple lines of code. However, comparing to Javascript, everything has to be written out step by step, which would help people understand what they are doing and what needs to be done. In addition, we discovered that there may be more questions and help posted on sites such as StackOverflow discussion JQuery usages rather than vanilla JS, this may be that JQuery’s functions provide a better DX which developers would only have to invoke one function rather than writing multiple lines of code  to achieve the same result.
Though having a better DX, a UX/DX tradeoff occurs where the user would have to download ~80KB more js content while loading the web contents. This could result to a slower page load time and a bad UX if the user has slow internet connection.

Overall we believe it was an important step to do one version with vanilla javascript as it allowed us to fully understand what was going on underneath. For this small snippet of code we think it would have been better to just use javascript as there wasn’t too many more lines of code needed but can see how jQuery might be very useful on a much larger and more complicated project.
