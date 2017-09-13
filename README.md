# Microsoft Graph Sentiment Analysis Bot

## Table of contents

* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Register the web application](#register-the-web-application)
* [Build the sample](#build-and-run-the-sample)
* [Run the sample](#run-the-sample)
* [Questions and comments](#questions-and-comments)
* [Contributing](#contributing)
* [Additional resources](#additional-resources)

## Introduction

This sample shows how to build a [Microsoft Bot Framework](https://dev.botframework.com/) bot that connects to [Microsoft Graph](https://developer.microsoft.com/en-us/graph/), searches through email messages, and performs sentiment analysis on those messages by using the [Microsoft Text Analytics cognitive service](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start).

![Microsoft Graph Connect Sample for Node.js screenshot](./readme-images/BotPreview.png)

## Prerequisites

To use the Microsoft Graph Connect Sample for Node.js, you need the following:

 * [Node.js](https://nodejs.org/).
 * The [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * Either a [Microsoft account](https://www.outlook.com/) or a [work or school account](http://dev.office.com/devprogram)
 * A [Microsoft Azure Account](https://azure.microsoft.com/en-us/free/)
 * A [Language Understanding Intelligent Service Account](https://www.luis.ai/)

## Register the web application

1. Sign into the [App Registration Portal](https://apps.dev.microsoft.com/) using either your personal or work or school account.

2. Choose **Add an app**.

3. Enter a name for the app, and choose **Create application**. 
	
   The registration page displays, listing the properties of your app.

4. Copy the Application Id. This is the unique identifier for your app. 

5. Under **Application Secrets**, choose **Generate New Password**. Copy the password from the **New password generated** dialog.

   You'll use the application ID and secret to configure the sample app in the next section. 

6. Under **Platforms**, choose **Add Platform**.

7. Choose **Web**.

8. Enter *https://localhost:3980/botauth/aadv2/callback* as the Redirect URI. 

9. Choose **Save**.

## Build the sample

1. Download or clone this repo.

2. Using your favorite IDE, open the **.env** file in the root directory of the repo.

3. Replace the **ENTER_YOUR_CLIENT_ID** and **ENTER_YOUR_CLIENT_SECRET** placeholder values with the application Id and application secret that you copied when you created your web application registration.

4. In a command prompt, run the following command in the root directory. This installs the project dependencies.

  ```npm install```

5. Run the following command to start the development server.

  ```npm start```

6. Launch the [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator).

7. Choose the **Connect** button.

8. Enter the messaging endpoint for the bot project: https://localhost:3980/api/messages but could be a different port. Leave the Microsoft App ID and Microsoft App Password values blank. These are for published bots.

9. Choose the **Connect** button. 

## Run the sample

1. Type a query in this form: **Search Office 365 for Graph**.
2. Follow the prompts to log in. Type additional queries to see the cognitive service's sentimental analysis at work.

## Questions and comments

We'd love to get your feedback about the Microsoft Graph Connect Sample for Node.js. You can send your questions and suggestions in the [Issues](https://github.com/microsoftgraph/nodejs-connect-rest-sample/issues) section of this repository.

Questions about Microsoft Graph development in general should be posted to [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Make sure that your questions or comments are tagged with [microsoftgraph].

## Contributing ##

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
  
## Additional resources

- [Other Microsoft Graph Connect samples](https://github.com/MicrosoftGraph?utf8=%E2%9C%93&query=-Connect)
- [Microsoft Graph](https://graph.microsoft.io)

## Copyright
Copyright (c) 2016 Microsoft. All rights reserved.
