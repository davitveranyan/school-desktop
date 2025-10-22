# school-desktop

**EduVerse** - Universe of Knowledge in Every School

## Description

EduVerse is a desktop application built with Electron that provides a comprehensive educational platform with server management, teacher panel, and student panel features.

## Features

- **Server Panel**: Centralized system management, user administration, and content management
- **Teacher Panel**: Create tests, manage classes, view statistics
- **Student Panel**: Take tests, study materials, track progress

## Installation

### Download Pre-built Installers

Download the latest installer for your operating system from the [Releases](https://github.com/davitveranyan/school-desktop/releases) page:

- **Windows**: Download the `.exe` installer
- **macOS**: Download the `.dmg` file
- **Linux**: Download the `.AppImage` or `.deb` package

### Build from Source

#### Prerequisites

- Node.js 18 or higher
- npm or yarn

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/davitveranyan/school-desktop.git
   cd school-desktop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm start
   ```

4. Build installer for your platform:
   ```bash
   # For Windows
   npm run build:win
   
   # For macOS
   npm run build:mac
   
   # For Linux
   npm run build:linux
   
   # For all platforms
   npm run build
   ```

The installers will be created in the `dist/` directory.

## Development

### Project Structure

```
school-desktop/
├── docs/               # Web application files
│   ├── index.html      # Main HTML file
│   ├── script.js       # JavaScript code
│   └── styles.css      # Styles
├── src/                # React components
│   └── components/
├── main.js             # Electron main process
├── package.json        # Project configuration
└── .github/workflows/  # CI/CD workflows
```

### Running the Application

```bash
npm start
```

### Building Installers

The project uses `electron-builder` to create installers. The configuration is in `package.json` under the `build` section.

## CI/CD

The project uses GitHub Actions for automated builds:

- **build-installer.yml**: Builds installers for Windows, macOS, and Linux on push to main branch or tags
- Artifacts are uploaded and available for download
- Releases are automatically created for version tags (e.g., `v1.0.0`)

## License

MIT

## Author

davitveranyan