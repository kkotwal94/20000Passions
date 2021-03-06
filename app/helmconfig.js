/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: "link" | "meta",
 *  sizes: "widthxheight",
 *  rel: "rel value"
 *  filename: <Name of your file"
 * }
 */

// Import all your needed files first (webpack will grab the url)
import chromecon from 'file!images/chrome.png';
import lights from 'file!images/lights.png';
import applecon from 'file!images/apple-ninja152-precomposed.png';
import mscon from 'file!images/ms-ninja144-precomposed.png';
import favicon from 'file!images/favicon.png';
import tv from 'file!images/tv.png';
import img from 'file!images/pic.png';
import facebook from 'file!images/facebook.png';
import twitter from 'file!images/twitter.png';
import video from 'file!video/Dancing-Bulbs.mp4';
import videom from 'file!video/Dancing-Bulbs.webm';
import videoimg from 'file!video/Dancing-Bulbs.jpg';
import logo from 'file!images/20klogo.png';
//import backgroundvideo from 'file!video/Dancing-Bulbs.mp4';

const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { "rel": "icon", "href": favicon },
    { "rel": "icon", "sizes": "192x192", "href": chromecon },
    // Add to homescreen for Safari on IOS
    { "rel": "apple-touch-icon", "sizes": "152x152", applecon },
    { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto+Condensed", "type": "text/css" },
    { "rel": "stylesheet", "href": "/assets/styles/main.css" },
    { "rel": "stylesheet", "href": "https://fonts.googleapis.com/icon?family=Material+Icons"}
    // SEO: If your mobile URL is different from the desktop URL,
    // add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones
    // { "rel": "canonical", "href": "http://www.example.com/" }
  ],
  meta: [
    { "charset": "utf-8" },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { "http-equiv": "X-UA-Compatible", "content": "IE=edge" },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { "name": "description", "content": "An isomorphic React alt boilerplate with Express and MongoDB deployable to Heroku" },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { "name": "viewport", "content": "width=device-width, initial-scale=1" },
    // Add to homescreen for Chrome on Android
    { "name": "mobile-web-app-capable", "content": "yes" },
    // Add to homescreen for Safari on IOS
    { "name": "apple-mobile-web-app-capable", "content": "yes" },
    { "name": "apple-mobile-web-app-status-bar-style", "content": "black" },
    { "name": "apple-mobile-web-app-title", "content": "React Webpack Node" },
    // Tile icon for Win8 (144x144 + tile color)
    { "name": "msapplication-TileImage", "content": mscon },
    { "name": "msapplication-TileColor", "content": "#3372DF" }
  ]
};

export default config;
