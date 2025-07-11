# Unix Timestamp Converter

A modern, responsive web application for converting between Unix timestamps and human-readable dates. Built with React, TypeScript, and Vite, this tool provides precision and ease for developers, system administrators, and anyone working with timestamps.

![Unix Timestamp Converter](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)

## ✨ Features

- **Live Timestamp Display**: Real-time current Unix timestamp with automatic updates
- **Bidirectional Conversion**: 
  - Convert Unix timestamps to human-readable date and time
  - Convert date and time to Unix timestamps
- **Timezone Aware**: All conversions respect your local timezone settings
- **Modern UI**: Clean, responsive design with dark mode support
- **Precision**: Accurate timestamp conversions with millisecond precision
- **Developer Friendly**: Perfect for debugging, logging, and system administration tasks

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zhouhao/unix-timestamp-converter.git
cd unix-timestamp-converter
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

### Linting

Run ESLint to check code quality:
```bash
pnpm lint
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Language**: TypeScript 5.6.2
- **Build Tool**: Vite 6.0.1
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Package Manager**: pnpm

## 📱 Usage

### Live Timestamp
The application displays the current Unix timestamp in real-time, updating every second.

### Timestamp to DateTime
1. Enter a Unix timestamp (in seconds or milliseconds)
2. View the converted human-readable date and time
3. The conversion respects your local timezone

### DateTime to Timestamp
1. Select or enter a date and time
2. View the corresponding Unix timestamp
3. Copy the result for use in your applications

## 🌟 What is Unix Timestamp?

Unix timestamp represents the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (also known as the Unix epoch). It's widely used in programming and system administration for:

- Database timestamps
- Log file entries
- API responses
- System scheduling
- File modification times

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
