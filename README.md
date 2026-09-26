# Project Dashboard Prototype

A prototype dashboard UI for browsing and editing a portfolio of projects, built with Angular 14 and Angular Material. It runs on mock data: a service simulates an HTTP backend, so the app works without a server.

## Features

- **Summary metrics.** Total and average budget, number of project owners, average projects per owner, and how many projects were created or modified in the last month and year. The metrics recompute whenever a project changes.
- **Filterable table.** Add filters through a dialog, and they appear as removable chips. The operators available depend on each column's type:
  - Text (title, project owner): *equals* and *contains*
  - Select (division, status): *equals*
  - Number (budget): *equals*, *greater than*, *less than*
  - Date (created, modified): *between*, using a date-range picker
- **Pagination** with page sizes of 5, 10, 15, or 20.
- **Inline editing.** Select a row to edit its title, division, owner, budget, and status. Saved fields are highlighted, and a check mark confirms the save.
- A loading state shows while each simulated request is in flight. The toolbar actions (view, export, create) open an "under construction" dialog.

## Tech stack

- Angular 14, TypeScript, RxJS
- Angular Material (dialog, chips, datepicker, paginator, and other components) with Moment.js
- SCSS
- Express, to serve the production build

## How it works

`ProjectService` loads 30 records from `src/app/data/mock-data.json`, gives each one a UUID, and exposes them through a `BehaviorSubject`. Filtering, pagination, and updates all push a new list through that subject. The table renders the stream with the `async` pipe, and an 800 ms `delay` simulates network latency. `MetadataService` derives the summary metrics from the full data set.

## Getting started

Requirements: Node.js (`package.json` pins 19.4.0 under `engines`).

```bash
npm install

# Development server at http://localhost:4200
npm run ng -- serve

# Production build, then serve it with Express
npm run build
npm start
```

`server.js` reads `PORT` and falls back to 8080. Run unit tests with `npm test`.

## Project structure

```
src/app/
  components/   Table, metadata, filters, filter dialog, navbar, spinner
  services/     ProjectService (mock backend), MetadataService
  interfaces/   Project, Column, ProjectFilter, ProjectMetadata
  pipes/        Display formatting for field names and filter values
  data/         Mock project data
server.js       Express server for the built app
```
