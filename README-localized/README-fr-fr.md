---
page_type: sample
products:
- ms-graph
languages:
- nodejs
- typescript
description: "Utiliser Microsoft Graph, Microsoft Cognitive Services et Microsoft Bot Framework pour analyser les sentiments dans une application web NodeJS."
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  - Microsoft Bot Framework 
  createdDate: 9/13/2017 10:47:10 AM
---
# Robot d'analyse des sentiments Microsoft Graph

## Table des matières

* [Introduction](#introduction)
* [Conditions préalables](#prerequisites)
* [Obtenir une clé pour l’API d’Analyse texte](#get-a-key-for-the-text-analytics-api) 
* [Publier le modèle LUIS](#publish-the-luis-model)
* [Inscription de l’application web](#register-the-web-application)
* [Créer l’exemple](#build-the-sample)
* [Exécuter l’exemple](#run-the-sample)
* [Questions et commentaires](#questions-and-comments)
* [Contribution](#contributing)
* [Ressources supplémentaires](#additional-resources)

## Introduction

Cet exemple présente comment créer une [Microsoft Bot Framework](https://dev.botframework.com/), un robot qui se connecte à [Microsoft Graph](https://developer.microsoft.com/en-us/graph/), effectue une recherche dans les courriers électroniques et effectue une analyse des sentiments sur ces messages à l’aide du [service cognitif Microsoft Text Analytics](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start). Il tire parti du [Language Understanding Intelligent Service](https://www.luis.ai) pour permettre à votre robot de comprendre les requêtes que vous lui envoyez.

## Conditions préalables

Pour utiliser l’exemple de connexion Microsoft Graph pour Node.js, vous avez besoin des éléments suivants :

 * [Node.js](https://nodejs.org/)
 * [TypeScript](http://www.typescriptlang.org/)
 * Le [Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * Un [compte Microsoft](https://www.outlook.com/) ou un [compte professionnel ou scolaire](http://dev.office.com/devprogram)
 * Un [compte Microsoft Azure](https://azure.microsoft.com/en-us/free/)
 * Un [compte Language Understanding Intelligent Service](https://www.luis.ai/)

Outre ces conditions préalables, vous devez [obtenir une clé d’abonnement pour l’API Text Analytics](#get-a-key-for-the-text-analytics-api), [publier un modèle LUIS]()et [enregistrer une application cliente web](#register-the-web-application). Les trois sections ci-après décrivent comment obtenir ces ressources supplémentaires.

## Obtenir une clé pour l’API d’Analyse texte

1. Connectez-vous au [Portail Azure](https://portal.azure.com).

2. Sélectionnez **Autres services** en bas de la colonne de gauche de la page.

3. Dans la boîte de dialogue **Filtre** en haut de la colonne **Autres services**, tapez **Services cognitifs**.

4. Choisissez l’option **Services cognitifs** lorsqu'elle apparaît.

5. Choisissez le bouton **Ajouter** en haut de la page.

6. Choisissez l’option **Text Analytics API (préversion)** dans le volet droit.

7. Choisissez le bouton **Créer** en bas du volet droit.

8. Tapez un nom pour votre inscription, puis sélectionnez une offre. Vous pouvez sélectionner le niveau Gratuit comprenant 5 000 transactions par mois.

9. Lisez et confirmez que vous avez compris l’information préalable dans la partie inférieure du volet, puis sélectionnez le bouton **Créer** tout en haut.

10. Une fois votre abonnement créé, accédez à votre abonnement, puis sélectionnez **Clés** sous la section **Gestion des ressources** du volet central.

11. Copiez la valeur de la première clé (« Clé 1 »). Vous utiliserez cette valeur dans la section [Créer l'exemple](#build-the-sample).


## Publier le modèle LUIS

1. Accédez à la page d’accueil de ](https://www.luis.ai)Language Understanding Intelligent Service[ (LUIS).

2. Si vous n’en avez pas déjà un, créez un compte LUIS. Vous accédez automatiquement au tableau de bord de votre compte.

3. Choisissez **Mes applications** dans le coin supérieur gauche de la page du tableau de bord.

4. Sélectionnez **Importer une application**

5. Dans le menu contextuel, accédez au fichier [SearchBotLUIS.JSON](./SearchBotLUIS.json) dans le répertoire racine de ce référentiel.

6. Choisissez le bouton **Importer**. Vous accédez automatiquement au tableau de bord de votre nouvelle application.

7. Sélectionnez **Publier une application** dans le menu de gauche.

8. Sélectionnez l’option **BootstrapKey** par défaut comme valeur pour la **Clé de point de terminaison**, puis sélectionnez le bouton **Publier**.
![Capture d'écran de Microsoft Graph Sentiment Bot](./readme-images/PublishLUISApp.png)

9. Copier la valeur de l’**URL du point de terminaison**. Vous utiliserez cette valeur dans la section [Créer l'exemple](#build-the-sample).

10. Sélectionnez **Former et tester** dans le menu de gauche pour accéder à une page dans laquelle vous pouvez exécuter des requêtes de test sur votre modèle publié. Tapez **Rechercher Office 365 pour Graph** dans le volet d’énoncé de tests pour vérifier que votre nouvelle application recherche une intention pour cette requête.

## Inscription de l’application web

1. Connectez-vous au [portail d’inscription de l'application Azure](https://go.microsoft.com/fwlink/?linkid=2083908) en utilisant votre compte personnel, professionnel ou scolaire.

2. Sélectionnez **Nouvelle inscription**.

3. Tapez un nom pour l'application. Pour les **Types de comptes pris en charge**, sélectionnez **Comptes dans un annuaire organisationnel et comptes personnels Microsoft (par ex. Skype, Xbox et Outlook.com)**.

4. Entrez *https://localhost :3980/botauth/aadv2/callback* comme URI de redirection (web).

5. Choisissez **S'inscrire**.
	
   La page de vue d'ensemble de l'application s’affiche, répertoriant les propriétés de votre application.

6. Copiez l’ID de l’application (client) à partir de la page de vue d’ensemble. Il s’agit de l’identificateur unique de votre application.

7. Accédez à la page **Certificats et secrets** sous **Gérer**. Sélectionnez **Nouvelle clé secrète client**, faites-en une description et donnez-lui une date d’expiration, puis sélectionnez **Ajouter**.

8. Copiez et enregistrez la valeur de la nouvelle clé secrète client. C'est la seule fois où vous pourrez visualiser la clé secrète client.

   Vous utiliserez l’ID de l’application et la clé secrète client pour configurer l’exemple d’application dans la section suivante.

## Créer l’exemple

1. Téléchargez ou clonez ce référentiel.

2. À l’aide de votre environnement IDE favori, ouvrez le fichier **.env** dans le répertoire racine du référentiel.

3. Remplacez la valeur de l’espace réservé **ENTER\_YOUR\_COG\_SERVICE\_SUBSCRIPTION\_KEY** par la clé API Text Analytics que vous avez copiée dans la section [Obtenir une clé pour l'API Text Analytics](#get-a-key-for-the-text-analytics-api).

4. Remplacez la valeur de l’espace réservé **ENTER\_YOUR\_LUIS\_MODEL\_URL** par l’URL du point de terminaison que vous avez copiée dans la section [Publier le modèle LUIS](#publish-the-luis-model).

5. Remplacez les valeurs de l'espace réservé **ENTER\_YOUR\_CLIENT\_ID** et **ENTER\_YOUR\_CLIENT\_SECRET** par l’ID d’application et le secret de l’application que vous avez copiés dans la section [Inscrivez l'application web](#register-the-web-application).

6. Dans une invite de commandes, exécutez la commande suivante dans le répertoire racine. Cette procédure installe les dépendances du projet.

  ```npm install```

7. Entrez la commande suivante pour démarrer le serveur de développement.

  ```npm start```

8. Lancez le ](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)Bot Framework Emulator[.

9. Entrez le point de terminaison de la messagerie pour ce projet de robot : https://localhost:3980/api/messages. Laissez les valeurs ID de l’application Microsoft et mot de passe de l’application Microsoft vierges. Il s’agit de robots publiés.

10. Sélectionnez le bouton **Se connecter**. 

## Exécutez l’exemple

1. Tapez une requête dans le Bot Framework Emulator dans ce formulaire : **Rechercher Office 365 pour Graph**.

2. Le bouton **Se connecter** s’affiche dans l’émulateur. Sélectionnez ce bouton pour ouvrir une page web affichant une chaîne dans le navigateur. Vous êtes invité à taper cette chaîne dans la conversation de votre émulateur. Veuillez noter que votre navigateur peut vous avertir que votre PC ne fait pas confiance au certificat de sécurité du site. Choisissez l’option pour accéder vers la page web.

3. Après avoir entré la chaîne dans votre conversation, vous recevez un message indiquant le score d’un sentiment pour votre requête.
![Capture d'écran de Microsoft Graph Sentiment Bot](./readme-images/BotPreview.png)

4. Tapez d’autres requêtes pour afficher l’analyse sentimental du service cognitif au travail.

## Questions et commentaires

Nous serions ravis de connaître votre opinion sur l’exemple de connexion Microsoft Graph Connect pour Node.js. Vous pouvez nous faire part de vos questions et suggestions dans la rubrique [Problèmes](https://github.com/microsoftgraph/nodejs-sentiment-bot-sample/issues) de ce référentiel.

Les questions générales sur le développement de Microsoft Graph doivent être publiées sur [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Veillez à poser vos questions ou à rédiger vos commentaires en utilisant les balises \[microsoftgraph].

## Contribution ##

Si vous souhaitez contribuer à cet exemple, voir [CONTRIBUTING.MD](/CONTRIBUTING.md).

Ce projet a adopté le [code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour en savoir plus, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.
  
## Ressources supplémentaires

- [Autres exemples Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph](https://graph.microsoft.io)

## Copyright
Copyright (c) 2017 Microsoft. Tous droits réservés.
