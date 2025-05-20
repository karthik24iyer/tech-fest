# CMS Tech Utsav - Golden Bell

A simple, elegant single-page website for the CMS Tech Utsav event featuring an interactive golden bell that visitors can ring to show their appreciation.

## Features

- Animated golden bell that rings when clicked
- Counter that tracks the number of times the bell has been rung
- Persistent count saved to browser cookies
- Modern material design with responsive layout

## Project Structure

```
tech-fest/
├── index.html      # Main HTML file
├── styles.css      # CSS styling with material design principles
└── script.js       # JavaScript for animation and cookie management
```

## How to Run

1. Clone or download this repository
2. Open the `index.html` file in a web browser to view the website
3. Click the golden bell to see the animation and hear the sound
4. The count will persist even if you refresh the page or close and reopen the browser

## Sound and Background

The website uses:

1. A background image (`background.jpeg`) with 50% opacity for a visually appealing backdrop
2. A bell sound effect (`bell.wav`) that plays when the bell is clicked
3. If the sound file is missing, a fallback sound is generated using the Web Audio API

- **Material Design**: Uses modern material design principles with card layouts, subtle shadows, and a clean color scheme
- **Responsive**: The layout adapts to different screen sizes
- **Vanilla JS**: Built with plain JavaScript, HTML, and CSS without frameworks for simplicity
- **Customizability**: Easy to modify colors by changing CSS variables

## Browser Compatibility

Works on all modern browsers that support:
- CSS animations
- ES6 JavaScript
- Cookies

## Future Enhancements (Optional)

- Add sound effects when the bell rings
- Implement server-side storage for global count tracking
- Add social sharing functionality
