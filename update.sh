#!/bin/bash
echo "🔨 Construyendo la app..."
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/fisica-atracciones run build
if [ $? -eq 0 ]; then
  echo "✅ Listo. Recarga el preview para ver los cambios."
else
  echo "❌ Error en el build. Revisa los mensajes de arriba."
fi
