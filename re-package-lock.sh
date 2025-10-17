#!/bin/bash

# Script para regenerar package-lock.json
echo "🧹 Limpiando archivos anteriores..."
rm -rf package-lock.json node_modules

echo "📦 Instalando dependencias..."
npm install --loglevel=error

echo "✅ ¡Completado! package-lock.json regenerado."
