# Claude Code Container Makefile
# 動的ポート検出とコンテナライフサイクル管理

SHELL := /bin/bash
export DOCKER_HOST := unix:///Users/$(USER)/.colima/default/docker.sock
.PHONY: help build build-with-token run test stop clean-containers clean-images clean-cache clean-all prepare-config

# デフォルトターゲット
help:
	@echo "🐳 Claude Code Container Management"
	@echo ""
	@echo "📋 Available commands:"
	@echo "  make build GITHUB_TOKEN=xxx   - コンテナイメージをビルド"
	@echo "  make run                       - コンテナを起動"
	@echo "  make test                      - Container Structure Testを実行"
	@echo "  make stop                      - 実行中のコンテナを停止"
	@echo "  make clean-containers          - 停止済みコンテナを削除"
	@echo "  make prepare-config            - 設定ファイルを準備"
	@echo ""
	@echo "💡 Usage example:"
	@echo "  make build GITHUB_TOKEN=gho_xxxxxxx"
	@echo "  make run"

# 設定
IMAGE_NAME := claude-code-webapp
CONTAINER_NAME_PREFIX := $(IMAGE_NAME)

# 設定ファイルの準備
prepare-config:
	@echo "📋 Preparing Claude Code configuration files..."
	@mkdir -p claude-code/config/.claude
	@mkdir -p claude-code/config/.config/claude-code
	@# Copy user Claude Code settings if they exist, otherwise create default
	@if [ -f ~/.claude/settings.json ]; then \
		echo "✅ Copying user settings from ~/.claude/settings.json"; \
		cp ~/.claude/settings.json claude-code/config/.claude/settings.json; \
	else \
		echo "📝 Creating default settings.json"; \
		echo '{"hooks": {"PreToolUse": [], "Stop": []}}' > claude-code/config/.claude/settings.json; \
	fi
	@# Copy hooks scripts if they exist (from both locations)
	@SCRIPTS_FOUND=false; \
	if [ -d ~/.claude ] && [ -n "$$(find ~/.claude -name '*.py' 2>/dev/null)" ]; then \
		echo "✅ Copying hooks scripts from ~/.claude/"; \
		find ~/.claude -name '*.py' | xargs -I {} cp {} claude-code/config/.config/claude-code/; \
		SCRIPTS_FOUND=true; \
	fi; \
	if [ -d ~/.config/claude-code ] && [ -n "$$(find ~/.config/claude-code -name '*.py' 2>/dev/null)" ]; then \
		echo "✅ Copying hooks scripts from ~/.config/claude-code/"; \
		find ~/.config/claude-code -name '*.py' | xargs -I {} cp {} claude-code/config/.config/claude-code/; \
		SCRIPTS_FOUND=true; \
	fi; \
	if [ "$$SCRIPTS_FOUND" = "false" ]; then \
		echo "📝 No hooks scripts found - using default empty configuration"; \
	fi
	@# Extract MCP servers configuration from ~/.claude.json or create default
	@if [ -f ~/.claude.json ] && command -v jq >/dev/null 2>&1; then \
		echo "✅ Extracting MCP servers from ~/.claude.json"; \
		jq '{mcpServers: (.mcpServers // {})}' ~/.claude.json > claude-code/config/.mcp.json; \
	else \
		echo "📝 Creating default .mcp.json with context7 and playwright"; \
		echo '{"mcpServers": {"context7": {"type": "stdio", "command": "npx", "args": ["-y", "@upstash/context7-mcp@latest"], "env": {}}, "playwright": {"type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"], "env": {}}}}' > claude-code/config/.mcp.json; \
	fi
	@echo "✅ Configuration preparation completed"

# イメージビルド（セキュアトークン指定）
build-with-token: prepare-config
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is required. Usage: make build-with-token GITHUB_TOKEN=gho_xxxxxxxxxxxx)
endif
	@echo "🔨 Building Claude Code container..."
	@echo "$(GITHUB_TOKEN)" > claude-code/.github_token_secret
	@docker buildx build \
		--secret id=github_token,src=claude-code/.github_token_secret \
		$(if $(GIT_USER_NAME),--build-arg GIT_USER_NAME="$(GIT_USER_NAME)") \
		$(if $(GIT_USER_EMAIL),--build-arg GIT_USER_EMAIL="$(GIT_USER_EMAIL)") \
		-t $(IMAGE_NAME):latest \
		-f claude-code/Dockerfile \
		..
	@rm -f claude-code/.github_token_secret
	@echo "✅ Build completed: $(IMAGE_NAME):latest"

# イメージビルド（自動トークン取得＋Git設定）
build:
	$(MAKE) build-with-token \
		GITHUB_TOKEN="$(shell gh auth token 2>/dev/null || echo "")" \
		GIT_USER_NAME="$(shell git config --global user.name 2>/dev/null || echo "")" \
		GIT_USER_EMAIL="$(shell git config --global user.email 2>/dev/null || echo "")"

# コンテナ実行
run:
	docker run -it --rm -p 3000:3000 -p 3001:3001 -p 54320:54320 $(IMAGE_NAME):latest

# Container Structure Test実行  
test:
	@which container-structure-test > /dev/null || (echo "❌ container-structure-test not installed" && exit 1)
	container-structure-test test --image $(IMAGE_NAME):latest --config claude-code/container-test.yaml

# コンテナ停止（名前指定コンテナ用）
stop:
	@echo "Note: 'make run' uses --rm flag, containers are auto-removed"
	@RUNNING=$$(docker ps -q --filter "name=$(CONTAINER_NAME_PREFIX)" 2>/dev/null || echo ""); \
	if [ -n "$$RUNNING" ]; then docker stop $$RUNNING; else echo "No containers to stop"; fi

# 停止済みコンテナ削除
clean-containers:
	@STOPPED=$$(docker ps -aq --filter "name=$(CONTAINER_NAME_PREFIX)" --filter "status=exited" 2>/dev/null || echo ""); \
	if [ -n "$$STOPPED" ]; then docker rm $$STOPPED; else echo "No containers to clean"; fi

# 未使用イメージ削除
clean-images:
	docker image prune -f

# ビルドキャッシュ削除
clean-cache:
	docker builder prune -f

# 全削除（危険）
clean-all: stop clean-containers
	@read -p "Remove ALL containers, images, and cache? [y/N] " -n 1 -r && echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker image rm $(IMAGE_NAME):latest 2>/dev/null || echo "Image not found"; \
		docker system prune -a -f; \
	fi