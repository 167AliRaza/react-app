# PDF Chat Frontend

A React application that allows users to upload PDF files and chat with their contents.

## Features

- PDF file upload
- Chat interface for interacting with PDF content
- Responsive design with Tailwind CSS

## Tech Stack

- React
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Build

Build for production:

```bash
npm run build
# or
yarn build
```

### Preview

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
pdf-chat-frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ FileUploader.jsx
│  │  └─ ChatWindow.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ .gitignore
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ vite.config.js
└─ README.md
```

## Next Steps

- Implement backend API for PDF processing
- Add authentication
- Enhance chat functionality with history and context
- Add PDF preview functionality