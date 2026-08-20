# Weather App

A React Weather dashboard that lets users search any city and add it to a personal dashboard, built to learn React fundamentals from scratch.
Live site: [Here](https://https://weather-app-eight-iota-k98tkvufla.vercel.app/)

## What I'm Building
A dashboard-style weather app where users can search cities, preview their weather in a modal, add cities to a saved dashboard, and remove them. Saved cities persist across page refreshes using localStorage.

## Tech Stack
React
Vite
JavaScript (ES6+)
Open-Meteo API (geocoding + weather)
CSS3

## Dev Journal
- Installed Node.js and npm, learned the difference between them and React
- Learned what a linter is
- Created first React project using Vite
- Learned what JSX actually is and how it compiles to JS
- Learned components, useState, controlled inputs (dropdowns)
- Learned props and parent-to-child/child-to-parent data flow
- Built SearchBar component with controlled input
- Learned event handlers and conditional validation logic
- Learned async/await and chaining two fetch calls
- Learned destructuring to pull values out of API responses
- Added error handling for city-not-found searches
- Pushed weather-app to Github
- Mapped WMO weather codes to readable labels, icons and theme names
- Learned dynamic className with template literals
- Styled the app with its own sky-blue theme
- Restructured the state from a single object to an array to suppot multiple cities
- Learned useEffect and Promise.all to load defautl cities on page load
- Learned .map() to render a lsit of components, and why key is required
- Added preview/Add-to-Dashboard flow to stop searched cities auto-adding
- Fixed duplicate-city bug using .some()
- Built a modal overlay with blurred backdrop for the search preview
- Learned localStorage for persisting saved cities accross refreshes
- Debugged a useEffect timing bug that was wiping saved data on load
- Deployed weather-app live to Vercel, connected through Github
- Learned production vs preview deployment URLs
- INstalled EmailJS SDK via npm instead of CDN script tag
- Built ReviewForm component with a star rating system
- Learned emailjs.send() (object-based) vs sendForm() (reads from DOM directly)
- Learned ternary operators for conditional star styling
- Added a "Leave a Review" button in a footer
- Styled the review form to match the app's sky-blue theme
- Learned React Router
- Restructured app into pages
- Added local time display using Open-Meteo's API
- Added fallback pattern for unmapped WMO weather codes to prevent crashes
- Set up a firebase project and firesore database
- Installed and configured the firebase SDK
- Built public review display on the reviews page
- Confirmed full loop working