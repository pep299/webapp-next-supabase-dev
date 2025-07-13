# AI Agent Docker Containers

Claude CodeやGemini等のAIエージェント用のDockerコンテナ集。

## Claude Code Container

Claude Code開発用のimmutableコンテナ。

### 特徴

- **完全自己完結**: 依存関係とソースコードを全て含む
- **安全な認証**: BuildKit secretでGitHubトークンを安全に処理
- **動的ポート検出**: プロジェクト設定から必要ポートを自動検出
- **zsh統一**: ベースイメージに合わせてzshで統一
- **日本語対応**: UTF-8ロケール設定済み

### クイックスタート

```bash
# リポジトリクローン
git clone https://github.com/pep299/webapp-next-supabase-dev.git
cd webapp-next-supabase-dev/ai-agent

# .envファイル準備
cp ../.env.example ../.env
# .envを編集して必要な値を設定

# コンテナビルド
make build GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# コンテナ実行
make run

# テスト実行
make test
```

### 使用方法

#### ビルド

```bash
# プライベートリポジトリアクセス用
make build GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# パブリックリポジトリのみ（トークンなし）
make build GITHUB_TOKEN=""
```

#### 実行

```bash
# 新しいコンテナを起動してシェルに接続
make run

# 既存のコンテナにシェル接続（fzf TUI）
make shell
```

#### テスト

```bash
# Container Structure Test実行
make test

# 旧スクリプトベーステスト（デバッグ用）
make test-script
```

#### その他

```bash
# ポート設定確認
make detect-ports

# ログ表示
make logs

# コンテナ停止
make stop

# クリーンアップ
make clean-containers  # 停止済みコンテナ削除
make clean-images      # 未使用イメージ削除  
make clean-cache       # ビルドキャッシュ削除
make clean-all         # 全削除（要確認）
```

### 構成

```
ai-agent/
├── Makefile                 # コンテナ管理コマンド
└── claude-code/
    ├── Dockerfile           # Claude Codeコンテナ定義
    ├── detect-ports.sh      # ポート検出スクリプト
    ├── test-container.sh    # 旧テストスクリプト
    └── container-test.yaml  # Container Structure Test設定
```

### 公開ポート

自動検出される主要ポート:

- **3000**: Web app (Next.js)
- **3001**: Admin app (Next.js)
- **54320-54329**: Supabase services

### 環境要件

- Docker with BuildKit (v23.0+推奨)
- make
- fzf (shell選択UI用)
- container-structure-test (テスト実行用)

### トラブルシューティング

#### ビルドエラー

```bash
# Docker BuildKitが有効か確認
docker buildx version

# .envファイルが存在するか確認
ls -la ../.env
```

#### テストエラー

```bash
# container-structure-testインストール確認
container-structure-test version

# イメージが存在するか確認
docker images | grep claude-code-webapp
```

### 開発

新しいテストを追加する場合は `claude-code/container-test.yaml` を編集してください。

Container Structure Testの詳細な設定方法は[公式ドキュメント](https://github.com/GoogleContainerTools/container-structure-test)を参照してください。