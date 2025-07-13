# syntax=docker/dockerfile:1
#
# Claude Code用開発コンテナ
# 
# Base image contains: Node.js 20, git, zsh, fzf, jq, curl, git-delta, 
# GitHub CLI, and other dev tools
# See: https://github.com/anthropics/claude-code/blob/main/.devcontainer/Dockerfile

FROM ghcr.io/anthropics/devcontainer-features/claude-code:latest

# 必要なパッケージのインストール
# Note: curl, jq, git, fzf are already included in base image
RUN apt-get update && apt-get install -y \
    make \
    && rm -rf /var/lib/apt/lists/*

# UTF-8ロケール設定（日本語git diff文字化け対策）
# C.UTF-8は追加インストール不要で利用可能
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# corepackを有効化してpnpmを準備
RUN corepack enable && \
    corepack prepare pnpm@10.12.4 --activate

# 作業ディレクトリ設定
WORKDIR /workspace/webapp-next-supabase-dev

# GitHubトークン（build arg経由、必須）
ARG GITHUB_TOKEN
RUN test -n "$GITHUB_TOKEN" || (echo "ERROR: GITHUB_TOKEN is required" && exit 1)

# GitHubからリポジトリをクローン
RUN git clone https://token:$GITHUB_TOKEN@github.com/pep299/webapp-next-supabase-dev.git .

# 依存関係のインストール（frozen-lockfile使用）
RUN pnpm install --frozen-lockfile

# .envファイルをホストからコピー（動的設定対応）
COPY .env .env

# ポート公開（動的検出されたポート用）
# Next.js apps: 3000, 3001
EXPOSE 3000 3001
# Supabase services: 54320-54329
EXPOSE 54320 54321 54322 54323 54324 54325 54326 54327 54328 54329

# 最終作業ディレクトリ（開発開始位置）
WORKDIR /workspace/webapp-next-supabase-dev

# デフォルトシェル（zshに統一）
CMD ["/bin/zsh"]