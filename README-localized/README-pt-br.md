---
page_type: sample
products:
- ms-graph
languages:
- nodejs
- typescript
description: "Use o Microsoft Graph, os Serviços Cognitivos da Microsoft e Microsoft Bot Framework para realizar uma análise de sentimento em um aplicativo Web NodeJS."
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  - Microsoft Bot Framework 
  createdDate: 9/13/2017 10:47:10 AM
---
# Bot de análise de sentimento do Microsoft Graph

## Sumário

* [Introdução](#introduction)
* [Pré-requisitos](#prerequisites)
* [Obter uma chave para a API de Análise de Texto](#get-a-key-for-the-text-analytics-api) 
* [Publicar o modelo LUIS](#publish-the-luis-model)
* [Registrar o aplicativo Web](#register-the-web-application)
* [Criar o exemplo](#build-the-sample)
* [Executar o exemplo](#run-the-sample)
* [Perguntas e comentários](#questions-and-comments)
* [Colaboração](#contributing)
* [Recursos adicionais](#additional-resources)

## Introdução

Esse exemplo mostrar como criar um bot do [Microsoft Bot Framework](https://dev.botframework.com/) que se conecta ao [Microsoft Graph](https://developer.microsoft.com/en-us/graph/), pesquisa mensagens de email e realiza análise de sentimento nessas mensagens usando o [serviço cognitivo da Análise de Texto da Microsoft](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start). Ele utiliza o [Serviço Inteligente de Reconhecimento de Voz](https://www.luis.ai) para ajudar seu bot a entender as consultas que você enviar.

## Pré-requisitos

Para usar o exemplo de conexão do Microsoft Graph para node.js, você precisará do seguinte:

 * [Node.js](https://nodejs.org/)
 * [TypeScript](http://www.typescriptlang.org/)
 * O [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * Uma [conta da Microsoft](https://www.outlook.com/) ou uma [conta corporativa ou de estudante](http://dev.office.com/devprogram)
 * Uma [conta do Microsoft Azure](https://azure.microsoft.com/en-us/free/)
 * Uma [conta do Serviço Inteligente de Reconhecimento de Voz](https://www.luis.ai/)

Além desses pré-requisitos, você precisará [obter uma chave de assinatura para a API de Análise de Texto](#get-a-key-for-the-text-analytics-api)), [publicar um modelo LUIS]() e [registrar um aplicativo de cliente Web](#register-the-web-application). As três seções a seguir descrevem como obter esses recursos adicionais.

## Obter uma chave para a API de Análise de Texto

1. Entre no [Portal do Azure](https://portal.azure.com).

2. Escolha **Mais serviços** na parte inferior da coluna esquerda da página.

3. Na caixa **Filtrar** na parte superior da coluna **Mais serviços**, digite **Serviços Cognitivos**.

4. Escolha a opção **Serviços Cognitivos** quando ela for exibida.

5. Escolha o botão **Adicionar** na parte superior da página.

6. Escolha a opção **API de Análise de Texto (visualização)** no painel direito.

7. Escolha o botão **Criar** na parte inferior do painel direito.

8. Digite um nome para a assinatura e selecione um plano. Você pode selecione a camada gratuita para 5.000 transações por mês.

9. Leia e confirme que você entendeu o aviso na parte inferior do painel e, em seguida, selecione o botão **Criar** na parte inferior.

10. Depois de criar sua assinatura, navegue até ela e selecione **Chaves** na seção **Gerenciamento de Recursos** do painel central.

11. Copie o valor da primeira chave (“Chave 1”) Você usará esse valor na seção [Criar o exemplo](#build-the-sample).


## Publicar o modelo LUIS

1. Navegue até a página inicial do [Serviço Inteligente de Reconhecimento de Voz](https://www.luis.ai) (LUIS).

2. Se você ainda não tiver uma conta LUIS, crie uma agora. Você navegará automaticamente até o painel da sua conta.

3. Escolha **Meus aplicativos** no canto superior esquerdo da página do painel.

4. Escolha **Importar Aplicativo**

5. Na janela pop-up, navegue até o arquivo [SearchBotLUIS.json](./SearchBotLUIS.json) no diretório raiz deste repositório.

6. Escolha o botão **Importar**. Você navegará automaticamente até a página de painel do novo aplicativo.

7. Escolha **Publish Aplicativo** no menu à esquerda.

8. Selecione a opção padrão **BootstrapKey** como o valor da **chave de ponto de extremidade** e, em seguida, selecione o botão **Publish**.
![Captura de tela do bot de sentimento do Microsoft Graph](./readme-images/PublishLUISApp.png)

9. Copie o valor da **URL de ponto de extremidade**. Você usará esse valor na seção [Criar o exemplo](#build-the-sample).

10. Selecione **Treinar e Testar** no menu à esquerda para ir a uma página onde você pode executar as consultas no modelo publicado. Digite **Pesquisar o Office 365 para Graph** no painel de teste enunciado para verificar se o novo aplicativo está encontrando uma intenção para essa consulta.

## Registrar o aplicativo Web

1. Entre no [portal de registro de aplicativos do Azure](https://go.microsoft.com/fwlink/?linkid=2083908) usando sua conta pessoal ou uma conta corporativa ou de estudante.

2. Escolha **Novo registro**.

3. Digite um nome para o aplicativo. Para **tipos de conta com suporte**, selecione **contas em qualquer diretório organizacional e contas pessoais da Microsoft (por exemplo, Skype, Xbox, Outlook.com)**.

4. Insira *https://localhost:3980/botauth/aadv2/callback* como URI de redirecionamento (Web).

5. Escolha **Registrar**.
	
   A página de visão geral do aplicativo será exibida, listando as propriedades do seu aplicativo.

6. Copie a ID do aplicativo (cliente) da página visão geral. Esse é o identificador exclusivo do aplicativo.

7. Vá para a página **Certificados e segredos** em **Gerenciar**. Escolha **Novo segredo do cliente**, dê uma descrição e data de validade a ele e, em seguida, selecione **Adicionar**.

8. Copie e salve o valor do novo segredo do cliente. Esta é a única vez que você poderá ver o segredo do cliente.

   Você usará a ID do aplicativo e o segredo do cliente para configurar o aplicativo de exemplo na próxima seção.

## Criar o exemplo

1. Baixe ou clone este repositório.

2. Usando seu IDE favorito, abra o arquivo **.env** no diretório raiz do repositório.

3. Substitua o valor de espaço reservado **ENTER\_YOUR\_COG\_SERVICE\_SUBSCRIPTION\_KEY** com a API de Análise de Texto que você copiou na seção [Obter uma chave para a API de Análise de Texto](#get-a-key-for-the-text-analytics-api).

4. Substitua o valor de espaço reservado **ENTER\_YOUR\_LUIS\_MODEL\_URL** com a URL de ponto de extremidade que você copiou na seção [Publicar o modelo LUIS](#publish-the-luis-model).

5. Substitua os valores de espaço reservado **ENTER\_YOUR\_CLIENT\_ID** e **ENTER\_YOUR\_CLIENT\_SECRET** com a ID do aplicativo e o segredo do aplicativo que você copiou na seção [Registrar o aplicativo de cliente Web](#register-the-web-application).

6. Em um prompt de comando, execute o seguinte comando no diretório raiz. Isso instala as dependências do projeto.

  ```instalação npm```

7. Execute o seguinte comando para iniciar o servidor de desenvolvimento.

  ```início do npm```

8. Inicie o [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator).

9. Insira o ponto de extremidade de envio de mensagens para este projeto de bot: https://localhost:3980/api/messages. Deixe em branco os valores da ID do Aplicativo da Microsoft e da Senha do Aplicativo da Microsoft. Esses são para bots publicados.

10. Escolha o botão **Conectar**. 

## Executar o exemplo

1. Digite uma consulta no Bot Framework Emulator neste formulário: **Pesquisar o Office 365 para Graph**.

2. Você verá um botão **Conectar** no emulador. Escolha este botão para iniciar uma página da Web que exibe uma cadeia de caracteres no navegador. Você será solicitado a digitar essa cadeia de caracteres no chat do emulador. Observe que o seu navegador poderá avisar que seu computador não confia no certificado de segurança do site. Escolha a opção de continuar à página da Web.

3. Depois de digitar a cadeia de caracteres no chat, você receberá uma mensagem indicando a pontuação de sentimento da consulta.
![Captura de tela do bot de sentimento do Microsoft Graph](./readme-images/BotPreview.png)

4. Digite consultas adicionais para ver a análise de sentimento do serviço cognitivo em ação.

## Perguntas e comentários

Adoraríamos receber seus comentários sobre o exemplo de conexão do Microsoft Graph para Node.js. Você pode enviar perguntas e sugestões na seção [Problemas](https://github.com/microsoftgraph/nodejs-sentiment-bot-sample/issues) deste repositório.

As perguntas sobre o desenvolvimento do Microsoft Graph em geral devem ser postadas no [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Não deixe de marcar as perguntas ou comentários com \[microsoftgraph].

## Colaboração ##

Se quiser contribuir para esse exemplo, confira [CONTRIBUTING.MD](/CONTRIBUTING.md).

Este projeto adotou o [Código de Conduta de Código Aberto da Microsoft](https://opensource.microsoft.com/codeofconduct/).  Para saber mais, confira as [Perguntas frequentes sobre o Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/) ou entre em contato pelo [opencode@microsoft.com](mailto:opencode@microsoft.com) se tiver outras dúvidas ou comentários.
  
## Recursos adicionais

- [Outros exemplos do Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph](https://graph.microsoft.io)

## Direitos autorais
Copyright (c) 2017 Microsoft. Todos os direitos reservados.
