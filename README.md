# Dynamic One-Page Website with React

This project is a dynamic one-page website built using React, with features to display a banner with a countdown timer and an internal dashboard to control the banner's visibility, description, timer, and link.

## Features

- **Banner Display**: Show a banner with a countdown timer that disappears after the timer expires.
- **Internal Dashboard**: 
  - Toggle the banner's visibility.
  - Update the banner's description.
  - Set and update the countdown timer.
  - Add a clickable link to the banner.


## Tech Stack

- **Frontend**:
  - React
  - Axios for API requests

- **Backend**:
  - Node.js
  - Express

## API Endpoints
GET /api/banner: Fetches the current banner settings.

POST /api/banner: Updates the banner settings (e.g., visibility, description, timer, link).

## Usage
Dashboard: Use the internal dashboard to control the banner's visibility, update the description, timer, and link. The banner will be visible on the main page and will display a countdown timer.

Banner: The banner is shown or hidden based on the settings from the dashboard. The countdown timer decreases every second until it reaches zero.


