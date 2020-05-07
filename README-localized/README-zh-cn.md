---
page_type: sample
products:
- ms-graph
languages:
- nodejs
- typescript
description: "使用 Microsoft Graph、Microsoft 认知服务和 Microsoft Bot Framework 在 NodeJS Web 应用程序中进行情绪分析。"
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  - Microsoft Bot Framework 
  createdDate: 9/13/2017 10:47:10 AM
---
# Microsoft Graph Sentiment Analysis Bot

## 目录

* [简介](#introduction)
* [先决条件](#prerequisites)
* [获取文本分析 API 密钥](#get-a-key-for-the-text-analytics-api) 
* [发布 LUIS 模型](#publish-the-luis-model)
* [注册 Web 应用](#register-the-web-application)
* [生成示例](#build-the-sample)
* [运行示例](#run-the-sample)
* [问题和意见](#questions-and-comments)
* [参与](#contributing)
* [其他资源](#additional-resources)

## 简介

此示例显示如何创建 [Microsoft Bot Framework](https://dev.botframework.com/) 机器人，它连接至 [Microsoft Graph](https://developer.microsoft.com/en-us/graph/)，搜索电子邮件，并使用 “[Microsoft 文本分析认知服务](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start)”对这些邮件进行情感分析。它利用“[语言理解智能服务](https://www.luis.ai)”，帮助你的机器人理解发送给它的查询。

## 先决条件

若要使用针对 Node.js 的 Microsoft Graph 连接示例，需满足以下条件：

 * [Node.js](https://nodejs.org/)
 * [TypeScript](http://www.typescriptlang.org/)
 * [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * 一个 [Microsoft 帐户](https://www.outlook.com/)或者一个[工作或学校帐户](http://dev.office.com/devprogram)
 * 一个 [Microsoft Azure 账户](https://azure.microsoft.com/en-us/free/)
 * 一个[语言理解智能服务账户](https://www.luis.ai/)

除这些先决条件外，还需要“[获取文本分析 API 订阅密钥](#get-a-key-for-the-text-analytics-api))”、“[发布 LUIS 模型]()”和“[注册 Web 客户端应用程序](#register-the-web-application)”。下列三个部分叙述如何获取这些附加资源。

## 获取文本分析 API 密钥

1. 登录到 [Azure 门户](https://portal.azure.com)。

2. 在页面左列的底部选择“**更多服务**”。

3. 在“**更多服务**”列顶部的“**筛选器**”框中，输入“**认知服务**”。

4. 出现时，选择“**认知服务**”选项。

5. 在窗格顶部选择“**添加**”按钮。

6. 选择右窗格中的“**文本分析 API （预览版）**”选项。

7. 选择右窗格底部的“**创建**”按钮。

8. 输入订阅的名称并选择一项计划。对于每月 5,000 交易，可选择免费层。

9. 阅读并确认已理解窗格底部附近的通知，然后选择最底部的“**创建**”按钮。

10. 创建订阅后，导航至订阅并选择左窗格“**资源管理**”部分下的“**密钥**”。

11. 复制第一个密钥的数值（"Key 1"）。该数值将在“[生成示例](#build-the-sample)”部分使用。


## 发布 LUIS 模型

1. 导航到“[语言理解智能服务](https://www.luis.ai)”（LUIS）主页。

2. 如果还没有 LUIS 账户，请创建一个。系统自动导航至账户仪表板。

3. 选择仪表板页面左上角的“**我的应用程序**”。

4. 选择“**导入应用**”

5. 在弹出窗口中，浏览此存储库根目录中的 [SearchBotLUIS.json](./SearchBotLUIS.json) 文件。

6. 选择“**导入**”按钮。系统自动导航至新应用程序的仪表板页面。

7. 选择左侧菜单中的“**发布应用程序**”。

8. 选择默认“**BootstrapKey**”选项作为“**终结点密钥**”值，然后选择“**发布**”按钮。
![Microsoft Graph Sentiment Bot 截屏](./readme-images/PublishLUISApp.png)

9. 复制“**终结点 URL**”值。该数值将在“[生成示例](#build-the-sample)”部分使用。

10. 选择左侧菜单中的“**培训和测试**”，以转至针对已发布模型运行查询的页面。在测试言语窗格中输入“**Search Office 365 for Graph** ”，以验证新应用程序正在查找此查询的意图。

## 注册 Web 应用

1. 使用个人帐户或者工作或学校帐户登录到 [Azure 应用注册门户](https://go.microsoft.com/fwlink/?linkid=2083908)。

2. 选择“**新注册**”。

3. 输入应用程序的名称。对于“**支持的帐户类型**”，选择“**任何组织目录中的帐户和 Microsoft 个人帐户”（例如，Skype、Xbox、Outlook.com）**。

4. 输入 *https://localhost:3980/botauth/aadv2/callback* 作为重定向 URI (Web)。

5. 选择“**注册**”。
	
   应用程序概述页面显示，列出应用程序的属性。

6. 从 概述页面复制应用程序（客户端） ID。这是应用的唯一标识符。

7. 转至“**管理**”下的“**证书和密码**”页面。选择“**新建客户端密码**”，并输入描述和到期日期，随后选择“**添加**”。

8. 复制并保存新的客户端密码值。这是你能查看客户端密码的唯一时间。

   使用应用程序 ID 和客户端密码在下一部分中配置示例应用。

## 生成示例

1. 下载或克隆该存储库。

2. 使用喜欢的 IDE，在存储库的根目录中打开 **.env** 文件。

3. 使用复制至“[获取文本分析 API 密钥](#get-a-key-for-the-text-analytics-api)”部分中的文本分析 API 密钥，替换 **ENTER\_YOUR\_COG\_SERVICE\_SUBSCRIPTION\_KEY** 占位符值。

4. 使用复制至 “[发布 LUIS 模型](#publish-the-luis-model)”中的终结点 URL，替换 **ENTER\_YOUR\_LUIS\_MODEL\_URL** 占位符值。

5. 使用复制至“[注册 Web 应用程序](#register-the-web-application)”中的应用程序密码，替换 **ENTER\_YOUR\_CLIENT\_ID** 和 **ENTER\_YOUR\_CLIENT\_SECRET** 占位符值。

6. 在命令提示窗口的根目录中运行以下命令。这将安装项目依赖项。

  ```npm install```

7. 运行以下命令以启动开发服务器。

  ``` npm start ```

8. 启动 [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)。

9. 输入此机器人项目的消息终结点： https://localhost:3980/api/messages。将 Microsoft App ID 和 Microsoft App Password 值保留为空白。它们用于机器人。

10. 选择“**连接**”按钮。 

## 运行示例

1. 采用这种形式在 Bot Framework Emulator 中输入查询:**Search Office 365 for Graph**。

2. 你将在模拟器中看到“**连接**”按钮。选择此按钮，以启动在浏览器中显示字符串的 Web 页面。系统将提示在仿真器聊天中输入字符串。注意，浏览器可能会警告你的计算机不信任网站的安全证书。选择选项，以继续至 Web 页面。

3. 在聊天中输入字符串后，将获得指示查询情绪分数的消息。
![Microsoft Graph Sentiment Bot 截屏](./readme-images/BotPreview.png)

4. 输入附加查询，以在工作时查看认知服务的情绪分析。

## 问题和意见

对于针对 Node.js 的 Microsoft Graph 连接示例，我们非常乐意收到你的相关反馈。你可以在该存储库中的“[问题](https://github.com/microsoftgraph/nodejs-sentiment-bot-sample/issues)”部分将问题和建议发送给我们。

与 Microsoft Graph 开发相关的一般问题应发布到 [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph)。请确保你的问题或意见标记有 \[microsoftgraph]。

## 参与 ##

如果想要参与本示例，请参阅 [CONTRIBUTING.MD](/CONTRIBUTING.md)。

此项目已采用 [Microsoft 开放源代码行为准则](https://opensource.microsoft.com/codeofconduct/)。有关详细信息，请参阅[行为准则常见问题解答](https://opensource.microsoft.com/codeofconduct/faq/)。如有其他任何问题或意见，也可联系 [opencode@microsoft.com](mailto:opencode@microsoft.com)。
  
## 其他资源

- [其他 Microsoft Graph 示例](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph](https://graph.microsoft.io)

## 版权信息
版权所有 (c) 2017 Microsoft。保留所有权利。
