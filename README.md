# Holidaze

A booking platform built with React, using the Noroff Holidaze API.

## Overview

Holidaze is a front-end application where users can:

- Browse available venues
- View detailed venue information
- Book stays
- Manage bookings in their profile
- Register as a customer or venue manager
- Create venues as a manager
- Update their avatar

## Features

### Authentication

- Register with `@stud.noroff.no` email
- Login with JWT authentication
- Role-based users (Customer / Venue Manager)

### Venues

- Fetch venues from API
- Search and filter venues
- View detailed venue page
- Display facilities, pricing, and availability

### Booking System

- Create bookings
- Validate date range, guest limits, and overlapping bookings
- Show unavailable dates
- Display bookings in profile

### Profile

- View upcoming and past bookings
- Dynamic stats
- Update avatar via modal

### UI / UX

- Responsive layout
- Reusable component structure
- Styled-components for styling
- Dashboard layout for Profile and Manager pages

## Tech Stack

- React
- React Router
- Styled Components
- Noroff Holidaze API

## Project Structure (current)

```text
src/
  api/

  components/


  pages/


  utils/

```

## API

This project uses the Noroff Holidaze API.

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/SanderNilsen/project-exam-2-holidaze
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm start
```

## Environment / API Key

This project requires a Noroff API key for authenticated requests.

The API key is created after login and stored in localStorage.

```js
localStorage.setItem("apiKey", key);
```

## Known Improvements

- Calendar UI with visual availability
- Cancel booking functionality
- Venue manager dashboard
- Create and edit venues
- Pagination for venues
- Better error handling

## Screenshots

## Status

Work in progress. Core functionality is implemented, but UI and features are still evolving.