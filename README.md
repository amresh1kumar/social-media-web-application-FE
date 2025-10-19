# Frontend Development Progress

This document summarizes the daily frontend development tasks for the **MERN Social Media Project** from **22/09/2025** to **Till now**.

---

## Day 1 – 22/09/2025

- Initialized React project.
- Installed dependencies like React Router, Axios.
- Created initial folder structure and basic components.

## Day 2 – 23/09/2025

- Developed Header and Footer components.
- Set up basic routing for Feed , Chat , Profile etc.
- Added placeholder content for initial pages.

## Day 3 – 24/09/2025

- Built Login and Registration components.
- Implemented basic form validation using React state.
- Enabled navigation between Login and Registration pages.

## Day 4 – 25/09/2025

- Implemented authentication state management using Context API.
- Connected frontend forms with mock API responses.
- Displayed error messages for invalid login or registration inputs.

## Day 5 – 26/09/2025

- Created PostCard component for displaying posts.
- Built Feed component with sample post data.
- Styled components using CSS modules.

## Day 6 – 27/09/2025

- continue day 5 work

## Day 7 – 28/09/2025

- continue day 5 work

## Day 8 – 29/09/2025

- Implemented user-specific feed in PostSection component.
- Handled conditional rendering for empty feeds.
- Started building notifications layout (frontend only).

## Day 9 – 30/09/2025

- Connected frontend with backend API for fetching posts.
- Displayed feed posts dynamically for logged-in users.
- Fixed data mapping issues between posts and user profiles.

## Day 10 – 01/10/2025

- Began chat component development.
- Displayed conversations and messages dynamically.
- Established initial socket connection for real-time chat.

## Day 11 – 02/10/2025

- Improved chat UI and message rendering.
- Handled selection of conversations and message history.
- Tested frontend socket events for sending/receiving messages.

## Day 12 – 03/10/2025

- Debugged post fetching and feed display issues.
- Ensured only logged-in user’s posts are displayed.
- Implemented basic notification display for messages and posts.

## Day 13 – 04/10/2025

- Finalized PostSection component.
- Completed conditional rendering for no-post scenarios.
- Tested integration of chat, feed, and notifications components.

## Day 14 – 05/10/2025

- Verified real-time updates with sockets for chat and notifications.
- Fixed minor styling issues and component alignment.
- Prepared frontend for deployment and final testing.

  ## Day 15 – til now

- Update Design 


---


How to Run the Project on Another System

Clone the repository:

you can you github desktop for GUI

or using cmd

git clone <repository-url>
cd <project-folder>

Install dependencies:

npm install

Start the development server:

npm start

Access the application: Open http://localhost:3000 in a web browser.

if you get problem from backend side then just comment the code in app.js that is
          <Route
            path="/feed"
            element={
              // <PrivateRoute>
                <Feed />
              // </PrivateRoute>
            }
          />
          
from every place then you can see the GUI of every components

#this is last step from down

Ensure backend is running: Make sure the Node.js/Express backend server is running on the configured port for API calls and socket connections.

Environment variables: Create a .env file in the root directory if required and configure API endpoints or keys as needed.
