# ZENITH TERMINAL Extension Icons

Iconos estilo retro de los 90 para la extensión de Chrome.

## Para usar los iconos:

1. Abre cualquier editor de imágenes (Photoshop, GIMP, etc.)
2. Crea imágenes con las siguientes especificaciones:

### icon16.png (16x16 pixels)
- Color de fondo: #000000 (negro)
- Texto "Z" en color #00FF41 (verde terminal)
- Fuente estilo pixel/monospace
- Bordes pixelados

### icon48.png (48x48 pixels)
- Misma temática que icon16.png pero más grande
- Puede incluir efectos de scanlines
- Texto "ZENITH" o logo retro

### icon128.png (128x128 pixels)
- Versión detallada del logo
- Efectos CRT y glow
- Texto "ZENITH TERMINAL"
- Efectos de profundidad 3D estilo Windows 95

## Instrucciones para crear iconos:

```bash
# Para generar placeholder icons temporalmente:
# En un entorno con ImageMagick o similar
convert -size 16x16 xc:black -fill "#00FF41" -font "Courier" -pointsize 12 -gravity center -annotate +0+0 "Z" icon16.png
convert -size 48x48 xc:black -fill "#00FF41" -font "Courier-Bold" -pointsize 24 -gravity center -annotate +0+0 "ZENITH" icon48.png
convert -size 128x128 xc:black -fill "#00FF41" -font "Courier-Bold" -pointsize 20 -gravity center -annotate +0-20 "ZENITH" -annotate +0+20 "TERMINAL" icon128.png
```

O puedes usar estas imágenes SVG base y convertirlas: