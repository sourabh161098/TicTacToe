# Tic Tac Toe

A Tic Tac Toe game built with React and Vite.

Check Live Here - https://start-tictactoe.netlify.app/

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # lint with oxlint
```

## Project structure

```
src/
├── app/                  # App root (App.jsx), app-wide providers
├── assets/               # Static assets imported by code (images, icons, fonts)
├── components/           # Shared, reusable UI components
├── constants/            # App-wide constants
├── features/             # Feature modules, each self-contained
│   └── game/
│       ├── components/   # Game-specific UI (Board, Square, ...)
│       ├── hooks/        # useGame, useGameMode, useScoreboard, useComputerOpponent
│       ├── state/        # gameReducer: move history, undo, reset
│       └── utils/        # Pure helpers: board, win/draw, computer strategy, scoreboard storage
├── hooks/                # Shared custom hooks
├── styles/               # Global styles
├── utils/                # Shared helper functions
└── main.jsx              # Entry point
```

Use the `@/` alias for imports from `src`, e.g. `import App from '@/app/App'`.
