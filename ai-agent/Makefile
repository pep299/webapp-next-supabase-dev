# Claude Code Container Makefile
# 動的ポート検出とコンテナライフサイクル管理

SHELL := /bin/bash
.PHONY: help build build-with-token run test stop clean-containers clean-images clean-cache clean-all

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
	@echo ""
	@echo "💡 Usage example:"
	@echo "  make build GITHUB_TOKEN=gho_xxxxxxx"
	@echo "  make run"

# 設定
IMAGE_NAME := claude-code-webapp
CONTAINER_NAME_PREFIX := $(IMAGE_NAME)


# イメージビルド（トークン指定）
build-with-token:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is required. Usage: make build-with-token GITHUB_TOKEN=gho_xxxxxxxxxxxx)
endif
	echo "🔨 Building Claude Code container..."
	docker build \
		--build-arg GITHUB_TOKEN="$(GITHUB_TOKEN)" \
		-t $(IMAGE_NAME):latest \
		-f claude-code/Dockerfile \
		..
	echo "✅ Build completed: $(IMAGE_NAME):latest"

# イメージビルド（自動トークン取得）
build:
	$(MAKE) build-with-token GITHUB_TOKEN="$(shell gh auth token 2>/dev/null || echo "")"

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