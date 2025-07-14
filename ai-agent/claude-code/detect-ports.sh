#!/bin/bash

# ポート検出ヘルパースクリプト
# プロジェクトの設定ファイルから使用ポートを自動検出

set -e

echo "🔍 Detecting ports from project configuration..."

DETECTED_PORTS=()

# Next.js アプリのポート検出
echo "📱 Scanning Next.js apps..."

# web app (デフォルト3000)
if [ -f "apps/web/package.json" ]; then
    WEB_PORT=$(grep -o '\-p [0-9]*' apps/web/package.json 2>/dev/null | grep -o '[0-9]*' || echo "3000")
    DETECTED_PORTS+=("$WEB_PORT")
    echo "  - Web app: $WEB_PORT"
fi

# admin app (明示的に3001)
if [ -f "apps/admin/package.json" ]; then
    ADMIN_PORT=$(grep -o '\-p [0-9]*' apps/admin/package.json 2>/dev/null | grep -o '[0-9]*' || echo "3001")
    DETECTED_PORTS+=("$ADMIN_PORT")
    echo "  - Admin app: $ADMIN_PORT"
fi

# Supabase設定からポート検出
echo "🗄️  Scanning Supabase configuration..."

if [ -f "supabase/config.toml" ]; then
    SUPABASE_PORTS=$(grep -o 'port = [0-9]*' supabase/config.toml | grep -o '[0-9]*' | sort -u)
    for port in $SUPABASE_PORTS; do
        DETECTED_PORTS+=("$port")
        echo "  - Supabase service: $port"
    done
fi

# 重複除去とソート
UNIQUE_PORTS=($(printf '%s\n' "${DETECTED_PORTS[@]}" | sort -u))

echo ""
echo "📋 Detected ports summary:"
printf '  %s\n' "${UNIQUE_PORTS[@]}"

echo ""
echo "🐳 Docker port mapping flags:"
for port in "${UNIQUE_PORTS[@]}"; do
    echo "  -p $port:$port"
done

# Makefileで使用するための環境変数エクスポート
echo ""
echo "📝 For Makefile usage:"
echo "PORTS=${UNIQUE_PORTS[*]}"