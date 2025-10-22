# Build Assets

This directory contains build assets for the Electron application.

## Icon Files

To properly build installers with custom icons, you need to provide icon files in the following formats:

### Windows
- **icon.ico**: 256x256 pixels or multi-resolution .ico file

### macOS
- **icon.icns**: Multi-resolution .icns file (16x16 to 512x512)

### Linux
- **icon.png**: 512x512 pixels PNG file

## How to Create Icons

1. Start with a high-resolution square image (at least 1024x1024 pixels)
2. Use online tools or applications to convert to the required formats:
   - For .ico: Use tools like https://convertico.com/ or ImageMagick
   - For .icns: Use `png2icns` on macOS or online converters
   - For .png: Resize your image to 512x512 pixels

## Fallback

If no icon files are provided, electron-builder will use default icons. The application will still build successfully.
