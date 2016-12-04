/**
 * Created by auffr on 04/12/2016.
 */
window.sr = ScrollReveal();
var oddTitleOptions = { duration: 1000, origin: 'right', reset: true }
sr.reveal('.odd-title', oddTitleOptions);

var oddParagraphOptions = { delay : 1000, duration : 1000, origin: 'right'}
sr.reveal('.odd-paragraph', oddParagraphOptions);

var bulletListOddOptions = { delay : 2000, duration : 750, origin: 'right'}
sr.reveal('.bullet-list-odd', bulletListOddOptions);

var fastListLineOptions = { delay : 2000, duration: 750, origin: 'right'}
sr.reveal('.fast-list-line', fastListLineOptions, 750);

var listLineOptions = { delay: 3500, duration: 1000, origin: 'right'}
sr.reveal('.list-line', listLineOptions, 2000);

var evenTitleOptions = { duration: 1000, origin: 'left', reset: true }
sr.reveal('.even-title', evenTitleOptions);

var prizesParagraphOptions = { delay: 1000, duration: 1000, origin: 'left'}
sr.reveal('.prizes-paragraph', prizesParagraphOptions, 1000);

var prizesHTOptions = { delay: 3000, duration: 500, origin: 'left'}
sr.reveal('.prizes-h3', prizesHTOptions);