---
page_type: sample
products:
- ms-graph
languages:
- nodejs
- typescript
description: "Usar Microsoft Graph, Microsoft Cognitive Services y el Microsoft Bot Framework para hacer análisis de sentimientos en una aplicación web de NodeJS"
extensions:
  contentType: samples
  technologies:
  - Microsoft Graph
  - Microsoft Bot Framework 
  createdDate: 9/13/2017 10:47:10 AM
---
# Bot de análisis de Microsoft Graph Sentiment 

## Tabla de contenido

* [Introducción](#introduction)
* [Requisitos previos](#prerequisites)
* [Obtener una clave para la API de análisis de texto](#get-a-key-for-the-text-analytics-api) 
* [Publicar el modelo LUIS](#publish-the-luis-model)
* [Registrar la aplicación web](#register-the-web-application)
* [Compile el ejemplo](#build-the-sample)
* [Ejecutar el ejemplo](#run-the-sample)
* [Preguntas y comentarios](#questions-and-comments)
* [Colaboradores](#contributing)
* [Recursos adicionales](#additional-resources)

## Introducción

Este ejemplo muestra cómo construir unMicrosoft Bot Framework bot que se conecta a Microsoft Graph, busca a través de los mensajes de correo electrónico, y realiza un análisis de los sentimientos en esos mensajes utilizando el[Servicio cognitivo de Microsoft Text Analytics](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quick-start). Se aprovecha el[Servicio Inteligente de Comprensión del Lenguaje](https://www.luis.ai)para ayudar a tu robot a entender las preguntas que le envías.

## Requisitos previos

Para usar la muestra de Microsoft Graph Connect para Node.js, necesitas lo siguiente:

 * [Node.js](https://nodejs.org/)
 * [TypeScript](http://www.typescriptlang.org/)
 * El[Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)
 * Ya sea una [cuenta de Microsoft](https://www.outlook.com/) o una [cuenta de trabajo o educativa](http://dev.office.com/devprogram)
 * Una [cuenta de Microsoft Azure](https://azure.microsoft.com/en-us/free/)
 * Una [cuenta Language Understanding Intelligent Service](https://www.luis.ai/)

Además de estos prerrequisitos, tendrá que[obtener una clave de suscripción para la API de análisis de texto](#get-a-key-for-the-text-analytics-api)), [publicar un modelo de LUIS](),y [registrar una aplicación de cliente web](#register-the-web-application). En las tres secciones siguientes se describe cómo obtener estos recursos adicionales.

## Obtener una clave para la API de análisis de texto

1. Inicie sesión en[Azure Portal](https://portal.azure.com).

2. Elija**Más servicios**en la parte inferior de la columna izquierda de la página. 

3. En el**filtro**, en la parte superior de la columna **más servicios**, escriba **servicios cognitivos**.

4. Elija la opción **servicios cognitivos** cuando aparezca.

5. Elija el botón **Agregar**en la parte superior de la página.

6. Elija la opción**Text Analytics API (vista previa)**en el panel derecho.

7. Elija el botón**Crear**en la parte inferior del panel derecho.

8. Escriba un nombre para su suscripción y seleccione un plan. Puede seleccionar el nivel gratuito para 5 000 transacciones al mes.

9. Lea y confirme que ha entendido el aviso cerca de la parte inferior del panel, y luego seleccione el botón**Crear**en la parte inferior.

10. Una vez que haya creado su suscripción, navegue hasta ella y seleccione **Tecla** en la sección** Administración de recursos** del panel central.

11. Copia el valor de la primera tecla ("Tecla 1"). Usará este valor en el [construir la sección](#build-the-sample) de ejemplo.


## Publicar el modelo LUIS

1. Navegue a la página principal del [Language Understanding Intelligent Service](https://www.luis.ai) (LUIS).

2. Cree una cuenta LUIS si no tienes ya una. Navegará automáticamente hasta el panel de control de tu cuenta.

3. Elija **Mis aplicaciones**en la esquina superior izquierda de la página del tablero.

4. Elija **Importar aplicación**

5. En la ventana emergente, busque el[SearchBotLUIS. JSON](./SearchBotLUIS.json) en el directorio raíz de este repositorio.

6. Elija el botón **Importar**.  Navegará automáticamente a la página del panel de control de tu nueva aplicación.

7. Elija **publicar aplicación** en el menú de la izquierda.

8. Seleccione la opción predeterminada **BootstrapKey** como el valor de **Clave del punto final**y luego seleccione el botón **publicar**.
![Captura de pantalla de Microsoft Graph Sentiment Bot](./readme-images/PublishLUISApp.png)

9. Copie el valor de la dirección** URL del extremo **. Usará este valor en el [construir la sección](#build-the-sample) de ejemplo.

10. Seleccione**entrenar y probar** en el menú de la izquierda para ir a una página donde se pueden hacer consultas de prueba contra su modelo publicado. Tipo**búsqueda de Office 365 para el gráfico**en el panel de expresión de prueba para verificar que su nueva aplicación está encontrando una intención para esta consulta.

## Registrar la aplicación web

1. Inicie sesión en el [Portal de registro de aplicaciones el Azure](https://go.microsoft.com/fwlink/?linkid=2083908) usando su cuenta personal, de trabajo o de la escuela.

2. Seleccione **Nuevo registro**.

3. Introduzca un nombre para la aplicación. Para **Tipos de cuenta admitidos**,seleccione**Cuentas en cualquier directorio de la organización y cuentas personales de Microsoft (por ejemplo, Skype, Xbox, Outlook.com)**.

4. Escriba *https://localhost:3980/botauth/aadv2/callback* como URI de redireccionamiento (Web).

5. Elija **Registrar**.
	
   Se muestra la página de resumen de la aplicación, con una lista de las propiedades de tu aplicación.

6. Copie la identificación de la solicitud (cliente) de la página de resumen. Este es el identificador único de su aplicación.

7. Diríjase a**certificados y secretos**página en **administrar**. Elija **nuevo cliente secreto**, dele una descripción y una fecha de caducidad, y luego seleccione **agregar**.

8. Copie y guarde el valor del nuevo secreto del cliente. Esta es la única vez que podrá ver el cliente secreto.

   Usará el ID de la aplicación y el cliente secreto para configurar la aplicación de muestra en la siguiente sección.

## Compile el ejemplo

1. Descargue o clone este repo.

2. Usando tu IDE favorito, abre el archivo**.env** en el directorio raíz del repo.

3. Reemplace el valor **ENTER\_YOUR\_COG\_SERVICE\_SUBSCRIPTION\_KEY** valor del marcador de posición con la tecla de la API de análisis de texto que has copiado en el[obtener una tecla para la sección de la API de análisis de texto](#get-a-key-for-the-text-analytics-api).

4. Reemplace el **ENTER\_YOUR\_LUIS\_MODEL\_URL** valor del marcador de posición por la dirección URL del extremo que copió en el [publicar la sección del modelo LUIS](#publish-the-luis-model).

5. Reemplace la **ENTER\_YOUR\_CLIENT\_ID** y **ENTER\_YOUR\_CLIENT\_SECRET** valores de marcador de posición con el identificador de la aplicación y el secreto de la aplicación que copió en la [sección registrar la aplicación web](#register-the-web-application).

6. En un símbolo del sistema, ejecute el siguiente comando en el directorio raíz. Esto instala las dependencias del proyecto.

  ```Instalar npm```

7. Ejecute el siguiente comando para iniciar el servidor de desarrollo.

  ```inicio npm```

8. Lanzar el[Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator)

9. Introduzca el punto final de mensajería para este proyecto de bot: https://localhost:3980/api/messages. Deja los valores de Microsoft App ID y Microsoft App Password en blanco. Estos son para bots publicados.

10. Elija el botón **conectar**. 

## Ejecutar el ejemplo

1. Escriba una consulta en el Bot Framework Emulator en este formulario: **Búsqueda de Office 365 para el gráfico**.

2. Verá un botón **conectar** en el emulador. Elija este botón para iniciar una página web que muestre una cadena en el navegador. Se le pedirá que escriba la cadena en el chat del emulador. Ten en cuenta que tu navegador puede advertirte que tu PC no confía en el certificado de seguridad del sitio. Elija la opción de continuar a la página web.

3. Después de escribir la cadena en el chat, recibirás un mensaje indicando la puntuación de sentimiento para tu consulta.
![Captura de pantalla de Microsoft Graph Sentiment Bot](./readme-images/BotPreview.png)

4. Escriba las preguntas adicionales para ver el análisis sentimental del servicio cognitivo en funcionamiento.

## Preguntas y comentarios

Nos encantaría recibir sus comentarios sobre la muestra de Microsoft Graph Connect para Node.js. Puede enviar sus preguntas y sugerencias en la sección[asuntos](https://github.com/microsoftgraph/nodejs-sentiment-bot-sample/issues)de este repositorio.

Las preguntas sobre el desarrollo de Microsoft Graph en general deben enviarse a [Stack Overflow](https://stackoverflow.com/questions/tagged/microsoftgraph). Asegúrate de que tus preguntas o comentarios estén etiquetados con \[microsoftgraph].

## Colaboradores ##

Si quiere hacer su aportación a este ejemplo, vea [CONTRIBUTING.MD](/CONTRIBUTING.md).

Este proyecto ha adoptado el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/). Para obtener más información, vea [Preguntas frecuentes sobre el código de conducta](https://opensource.microsoft.com/codeofconduct/faq/) o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.
  
## Recursos adicionales

- [Otros ejemplos de código de Microsoft Graph](https://github.com/microsoftgraph?utf8=%E2%9C%93&q=sample)
- [Microsoft Graph](https://graph.microsoft.io)

## Derechos de autor
Copyright (c) 2017 Microsoft. Todos los derechos reservados.
