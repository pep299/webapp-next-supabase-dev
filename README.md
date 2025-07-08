# Next.js + Supabase Full Stack Web Application

モダンなWebアプリケーション開発のためのモノレポ構成プロジェクト。

## 技術スタック

- フロントエンド: Next.js 14 (App Router)
- データベース: Supabase (PostgreSQL)
- ORM: Drizzle ORM
- UI: Mantine UI
- 認証: Supabase Auth
- エラー監視: Sentry
- テスト: Vitest
- リント・フォーマット: Biome, TypeScript-eslint, tsc
- CI/CD: GitHub Actions
- デプロイ: Vercel
- IaC: Terraform
- パッケージマネージャー: pnpm + Turborepo

## プロジェクト構造

```
monorepo/
├── apps/
│   ├── web/          # Next.js（ユーザー向けWebアプリ）
│   ├── admin/        # Next.js（管理画面）
│   └── mobile/       # React Native（将来追加予定）
├── packages/
│   ├── db/           # Drizzle ORM スキーマ
│   ├── core/         # ビジネスロジック
│   └── ui/           # 共通UIコンポーネント
├── package.json      # pnpm workspace設定
└── turbo.json        # Turborepo設定
```

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

各アプリケーションで必要な環境変数を設定してください。

```bash
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# apps/admin/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# packages/db/.env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
```

### 3. データベースの初期化

```bash
# データベーススキーマの生成
pnpm db:generate

# データベースへのプッシュ
pnpm db:push
```

### 4. 開発サーバーの起動

```bash
# 全てのアプリケーションを並行起動
pnpm dev

# 個別起動
pnpm --filter web dev      # Web (localhost:3000)
pnpm --filter admin dev    # Admin (localhost:3001)
```

## 利用可能なスクリプト

### 全体操作

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # 全てのアプリケーションをビルド
pnpm test         # テスト実行
pnpm lint         # リント実行
pnpm format       # フォーマット実行
pnpm typecheck    # 型チェック
pnpm clean        # ビルドファイルの削除
```

### データベース操作

```bash
pnpm db:generate  # Drizzleスキーマの生成
pnpm db:push      # データベースへのプッシュ
pnpm db:studio    # Drizzle Studio起動
```

## 主要機能

### 認証・認可
- ソーシャルログイン（Google, GitHub等）
- メール認証
- パスワードリセット
- ロールベースアクセス制御

### ユーザー管理
- ユーザー登録・ログイン
- プロフィール管理
- 権限管理

### ファイル管理
- ファイルアップロード
- ファイルダウンロード
- 画像の最適化

### 通知・メール
- お知らせ機能
- メール送信
- プッシュ通知

### フォーム
- バリデーション
- ファイルアップロード
- 多段階フォーム

## 開発フロー

### 1. フィーチャー開発

```bash
# 新しいブランチの作成
git checkout -b feature/new-feature

# 開発
pnpm dev

# テスト
pnpm test

# リント・フォーマット
pnpm lint
pnpm format

# 型チェック
pnpm typecheck
```

### 2. パッケージの追加

```bash
# 特定のアプリケーションに追加
pnpm --filter web add package-name

# 全てのワークスペースに追加
pnpm add -w package-name
```

### 3. デプロイ

```bash
# Vercelへのデプロイ
pnpm build
# GitHub Actionsで自動デプロイ
```

## ドキュメント

- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Mantine UI](https://mantine.dev/)
- [Turborepo](https://turbo.build/repo/docs)

## 貢献

1. このリポジトリをフォーク
2. フィーチャーブランチを作成
3. 変更をコミット
4. プルリクエストを作成

## ライセンス

MIT License