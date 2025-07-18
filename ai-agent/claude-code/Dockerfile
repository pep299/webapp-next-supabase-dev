# syntax=docker/dockerfile:1
#
# Claude Code用開発コンテナ
# Node.js 20ベースでClaude CLIを含む開発環境を構築

FROM node:20

ENV TZ=Asia/Tokyo
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
RUN apt-get update && apt-get install -y \
    make \
    vim \
    jq \
    fzf \
    ca-certificates \
    sudo \
    gnupg \
    wget \
    python3 \
    python3-pip \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/python3 /usr/bin/python

RUN wget -q https://github.com/GoogleContainerTools/container-structure-test/releases/download/v1.19.1/container-structure-test-linux-arm64 -O /usr/local/bin/container-structure-test \
    && chmod +x /usr/local/bin/container-structure-test

RUN usermod -l claude -d /home/claude node && \
    groupmod -n claude node && \
    mkdir -p /home/claude && \
    chown claude:claude /home/claude && \
    usermod -aG sudo claude && \
    echo "claude ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN npm install -g @anthropic-ai/claude-code

RUN corepack enable && \
    corepack prepare pnpm@10.12.4 --activate

WORKDIR /workspace/webapp-next-supabase-dev

ARG GIT_USER_NAME
ARG GIT_USER_EMAIL
RUN --mount=type=secret,id=github_token test -f /run/secrets/github_token || (echo "ERROR: GITHUB_TOKEN secret is required" && exit 1)
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN=$(cat /run/secrets/github_token) && \
    git clone https://token:$GITHUB_TOKEN@github.com/pep299/webapp-next-supabase-dev.git . && \
    git config credential.helper store && \
    echo "https://token:$GITHUB_TOKEN@github.com" > /tmp/.git-credentials && \
    chown claude:claude /tmp/.git-credentials

RUN chown -R claude:claude /workspace/webapp-next-supabase-dev

USER claude

RUN if [ -n "$GIT_USER_NAME" ]; then git config --global user.name "$GIT_USER_NAME"; fi
RUN if [ -n "$GIT_USER_EMAIL" ]; then git config --global user.email "$GIT_USER_EMAIL"; fi
RUN git config --global credential.helper "store --file=/tmp/.git-credentials"

RUN mkdir -p /home/claude/.claude /home/claude/.config/claude-code
COPY --chown=claude:claude ai-agent/claude-code/config/.claude/settings.json /home/claude/.claude/settings.json

RUN claude mcp add -s user context7 npx @upstash/context7-mcp@latest
RUN claude mcp add -s user playwright npx @playwright/mcp@latest

COPY --chown=claude:claude ai-agent/claude-code/config/.config/claude-code/ /home/claude/.config/claude-code/ 

RUN pnpm install --frozen-lockfile --fetch-timeout=300000 || pnpm install --frozen-lockfile --fetch-timeout=300000

COPY --chown=claude:claude .env.local .env
EXPOSE 3000 3001
EXPOSE 54320 54321 54322 54323 54324 54325 54326 54327 54328 54329
WORKDIR /workspace/webapp-next-supabase-dev
CMD ["/bin/bash"]