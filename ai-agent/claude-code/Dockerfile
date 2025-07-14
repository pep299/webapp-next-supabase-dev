# syntax=docker/dockerfile:1
#
# Claude Code用開発コンテナ
# Node.js 20ベースでClaude CLIを含む開発環境を構築

FROM node:20

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Tokyo

# UTF-8ロケール設定（日本語git diff文字化け対策）
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    make \
    vim \
    nano \
    jq \
    fzf \
    zsh \
    ca-certificates \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/*

# Claude Code CLIをインストール
RUN npm install -g @anthropic-ai/claude-code

# corepackを有効化してpnpmを準備
RUN corepack enable && \
    corepack prepare pnpm@10.12.4 --activate

# 作業ディレクトリ設定
WORKDIR /workspace/webapp-next-supabase-dev

# GitHubトークン（build arg経由、必須）
ARG GITHUB_TOKEN
RUN test -n "$GITHUB_TOKEN" || (echo "ERROR: GITHUB_TOKEN is required" && exit 1)

# Git設定（build arg経由、オプション）
ARG GIT_USER_NAME
ARG GIT_USER_EMAIL
RUN if [ -n "$GIT_USER_NAME" ]; then git config --global user.name "$GIT_USER_NAME"; fi
RUN if [ -n "$GIT_USER_EMAIL" ]; then git config --global user.email "$GIT_USER_EMAIL"; fi

# GitHubからリポジトリをクローン
RUN git clone https://token:$GITHUB_TOKEN@github.com/pep299/webapp-next-supabase-dev.git .

# 依存関係のインストール（frozen-lockfile使用）
RUN pnpm install --frozen-lockfile

# .envファイルをホストからコピー（動的設定対応）
COPY .env.local .env

# ポート公開（動的検出されたポート用）
# Next.js apps: 3000, 3001
EXPOSE 3000 3001
# Supabase services: 54320-54329
EXPOSE 54320 54321 54322 54323 54324 54325 54326 54327 54328 54329

# 最終作業ディレクトリ（開発開始位置）
WORKDIR /workspace/webapp-next-supabase-dev

# デフォルトシェル（zshに統一）
CMD ["/bin/zsh"]