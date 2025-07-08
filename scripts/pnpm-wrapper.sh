#!/bin/bash

# Claude Code環境判定（環境変数で判断）
if [ "$CLAUDE_CODE" = "true" ]; then
    # Claude Code環境では mise exec を使用
    mise exec -- pnpm "$@"
else
    # 通常環境では直接 pnpm を使用
    pnpm "$@"
fi