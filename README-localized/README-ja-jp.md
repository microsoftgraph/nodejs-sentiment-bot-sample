---
page_type: sample
products:
- ms-graph
languages:
- nodejs
- typescript
description: "Use Microsoft Graph, Microsoft Cognitive Services, and the Microsoft Bot Framework to do sentiment analysis in a NodeJS web application."
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  - Microsoft Bot Framework 
  createdDate: 9/13/2017 10:47:10 AM
---
# Microsoft Graph Sentiment Analysis Bot

## 目次

* [はじめに](#introduction)
* [前提条件](#prerequisites)
* [Text Analytics API のキーを取得する](#get-a-key-for-the-text-analytics-api) 
* [LUIS モデルを発行する](#publish-the-luis-model)
* [Web アプリケーションを登録する](#register-the-web-application)
* [サンプルをビルドする](#build-the-sample)
* [サンプルを実行する](#run-the-sample)
* [質問とコメント](#questions-and-comments)
* [投稿](#contributing)
* [その他のリソース](#additional-resources)

## はじめに

このサンプルでは、[Microsoft Bot Framework](https://dev.botframework.com/) ボットを作成する方法を示します。このボットは [Microsoft Graph](https://developer.microsoft.com/en-us/graph/) に接続し、メール メッセージを検索し、[Microsoft Text Analytics Cognitive Service](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start) を使用してこれらのメッセージに対して感情分析を実行します。このサンプルでは、[Language Understanding Intelligent Service](https://www.luis.ai) を活用して、ユーザーがボットに送信するクエリをボットが理解できるようにします。

## 前提条件

Node.js 用 Microsoft Graph Connect サンプルを使用するには、以下が必要です。

 * [Node.js](https://nodejs.org/)
 * [TypeScript](http://www.typescriptlang.org/)
 * [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * [Microsoft アカウント](https://www.outlook.com/)か[職場または学校アカウント](http://dev.office.com/devprogram)
 * [Microsoft Azure アカウント](https://azure.microsoft.com/en-us/free/)
 * [Language Understanding Intelligent Service アカウント](https://www.luis.ai/)

これらの前提条件に加えて、[Text Analytics API のサブスクリプション キーを取得](#get-a-key-for-the-text-analytics-api)し、[LUIS モデルを発行]()し、[Web クライアント アプリケーションを登録](#register-the-web-application)する必要があります。これらの追加リソースを取得する方法について、以下の 3 つのセクションで説明します。

## Text Analytics API のキーを取得する

1. [Azure ポータル](https://portal.azure.com)にサインインします。

2. ページの左側の列の下部にある [**その他のサービス**] を選択します。

3. [**その他のサービス**] 列の上部にある [**フィルター**] ボックスに、"**Cognitive Services**" と入力します。

4. [**Cognitive Services**] オプションが表示されたら、それを選択します。

5. ページの上部にある [**追加**] ボタンを選択します。

6. 右側のウィンドウで、[**Text Analytics API (preview)**] を選択します。

7. 右側のウィンドウの下部にある [**作成**] ボタンを選択します。

8. サブスクリプション名を入力し、プランを選択します。1 か月あたり 5,000 トランザクションまでの無料レベルを選択します。

9. ウィンドウの下部にある通知を読んで理解したことを確認し、一番下にある [**作成**] ボタンを選択します。

10. サブスクリプションを作成したら、サブスクリプションに移動し、中央のウィンドウの [**リソース管理**] セクションで [**キー**] を選択します。

11. 最初のキー ("Key 1") の値をコピーします。この値は、「[サンプルをビルドする](#build-the-sample)」 セクションで使用します。


## LUIS モデルを発行する

1. [Language Understanding Intelligent Service](https://www.luis.ai) (LUIS) のホーム ページに移動します。

2. LUIS アカウントがまだない場合は作成します。自動的にアカウントのダッシュボードに移動します。

3. ダッシュボード ページの左上隅にある [**My apps (マイ アプリ)**] を選択します。

4. [**Import App (アプリのインポート)**] を選択します。

5. ポップアップで、このリポジトリのルート ディレクトリにある [[SearchBotLUIS.json](./SearchBotLUIS.json)] ファイルを参照します。

6. [**Import (インポート)**] ボタンを選択します。自動的に新しいアプリのダッシュボード ページに移動します。

7. [**Publish App (アプリの発行)**] を選択します。

8. [**Endpoint key (エンドポイント キー)**] の値として既定の [**BootstrapKey**] オプションを選択し、[**Publish (発行)**] ボタンを選択します。
![Microsoft Graph Sentiment Bot のスクリーンショット](./readme-images/PublishLUISApp.png)

9. [**Endpoint url (エンドポイント URL)**] の値をコピーします。この値は、「[サンプルをビルドする](#build-the-sample)」 セクションで使用します。

10. 左のメニューで [**Train and Test (トレーニングとテスト)**] を選択し、発行されたモデルに対してテスト クエリを実行できるページに移動します。テストの発言ウィンドウに "**Search Office 365 for Graph**" と入力し、新しいアプリケーションがこのクエリの目的を検索することを確認します。

## Web アプリケーションを登録する

1. 個人用アカウントか職場または学校アカウントのいずれかを使用して、[Azure アプリケーション登録ポータル](https://go.microsoft.com/fwlink/?linkid=2083908)にサインインします。

2. [**新規登録**] を選択します。

3. アプリ名を入力します。[**サポートされているアカウントの種類**] で、[**任意の組織のディレクトリ内のアカウントと、個人用の Microsoft アカウント (Skype、 Xbox、Outlook.com など)**] を選択します。

4. リダイレクト URI (Web) として、"*https://localhost:3980/botauth/aadv2/callback*" と入力します。

5. [**登録**] を選択します。
	
   アプリの概要ページが表示され、アプリのプロパティが一覧表示されます。

6. 概要ページからアプリケーション (クライアント) ID をコピーします。これは、アプリの一意の識別子です。

7. [**管理**] の下にある [**証明書とシークレット**] ページに移動します。[**新しいクライアント シークレット**] を選択し、説明と有効期限を入力し、[**追加**] を選択します。

8. 新しいクライアント シークレットの値をコピーして保存します。クライアント シークレットが表示されるのは、このときだけです。

   次のセクションで、アプリケーション ID とクライアント シークレットを使用してサンプル アプリを構成します。

## サンプルをビルドする

1. このレポジトリをダウンロードするか、複製を作成します。

2. 任意の IDE を使用して、リポジトリのルート ディレクトリにある [**.env**] ファイルを開きます。

3. プレースホルダー **ENTER\_YOUR\_COG\_SERVICE\_SUBSCRIPTION\_KEY** の値を、「[Text Analytics API のキーを取得する](#get-a-key-for-the-text-analytics-api)」セクションでコピーした Text Analytics API のキーで置き換えます。

4. プレースホルダー **ENTER\_YOUR\_LUIS\_MODEL\_URL** の値を、「[LUIS モデルを発行する](#publish-the-luis-model)」セクションでコピーしたエンドポイント URL で置き換えます。

5. プレースホルダー **ENTER\_YOUR\_CLIENT\_ID** と **ENTER\_YOUR\_CLIENT\_SECRET** の値を、「[Web アプリケーションを登録する](#register-the-web-application)」セクションでコピーしたアプリケーション ID とアプリケーション シークレットで置き換えます。

6. コマンド プロンプトで、ルート ディレクトリで次のコマンドを実行します。これにより、プロジェクトの依存関係がインストールされます。

  ```npm install```

7. 次のコマンドを実行して開発用サーバーを起動します。

  ```npm start```

8. [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) を起動します。

9. このボット プロジェクトのメッセージング エンドポイント (https://localhost:3980/api/messages) を入力します。[Microsoft App ID] と [Microsoft App Password] の値は空白のままにします。これらは発行されたボット用です。

10. [**Connect (接続)**] ボタンを選択します。 

## サンプルを実行する

1. 次の形式で、Bot Framework Emulator にクエリを入力します:**Search Office 365 for Graph**。

2. エミュレーターに [**Connect (接続)**] ボタンが表示されます。このボタンを選択して、文字列を表示する Web ページをブラウザーで開きます。その文字列をエミュレーターのチャットに入力するように求められます。PC がサイトのセキュリティ証明書を信頼していないという警告がブラウザーに表示される場合があります。Web ページに進むオプションを選択します。

3. 文字列をチャットに入力すると、クエリの感情スコアを示すメッセージが届きます。
![Microsoft Graph Sentiment Bot のスクリーンショット](./readme-images/BotPreview.png)

4. 追加のクエリを入力して、Cognitive Servicese の感情分析の動作を確認してみます。

## 質問とコメント

Node.js 用 Microsoft Graph Connect のサンプルに関するフィードバックをお寄せください。質問や提案は、このリポジトリの「[問題](https://github.com/microsoftgraph/nodejs-sentiment-bot-sample/issues)」セクションで送信できます。

Microsoft Graph 開発全般の質問については、「[Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph)」に投稿してください。質問やコメントには、必ず "microsoftgraph" とタグを付けてください。

## 投稿 ##

このサンプルに投稿する場合は、[CONTRIBUTING.MD](/CONTRIBUTING.md) を参照してください。

このプロジェクトでは、[Microsoft Open Source Code of Conduct (Microsoft オープン ソース倫理規定)](https://opensource.microsoft.com/codeofconduct/) が採用されています。詳細については、「[Code of Conduct の FAQ](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。
  
## その他のリソース

- [Microsoft Graph の他のサンプル](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph](https://graph.microsoft.io)

## 著作権
Copyright (c) 2017 Microsoft.All rights reserved.
