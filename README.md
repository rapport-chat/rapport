<img src="https://rapport-chat.github.io/rapport-logo.svg" width="auto" height="100" />
### What is Rapport?

Rapport is a simple chat application written in react-native by [David Caudill](https://github.com/Kirboy) and [Kai Herrmann](https://github.com/kaiherrman) for a school project at the Berufliche Schulen Groß-Gerau.
___ 
### Trying the app out
We currently do not have the app in any "App Stores". So you will have to build it yourself 😅. Just follow the steps for <b>Building the app</b>.

Rapport chat works with a [Parse-Server](https://github.com/parse-community/parse-server) backend.
For trying this app out you can follow the steps for getting started in the parse repository. You will have a running backend in no time.

After that you can clone the [administration-tool](https://github.com/rapport-chat/administration-tool) repository for generating the authentication code which is required to register in the app.

___ 
### Building the app

The first step is to clone the repository.

```bash
git pull https://github.com/rapport-chat/rapport.git
```

After that you need to install the node modules.

```bash
cd rapport
npm install
```

You can now run the application with:

```bash
npm start
```

On your phone you need to install the Expo Client. Scan the QR-Code that will be shown after running the application.
___ 
### Contributing
Please use the [Prettier Formatter](https://github.com/prettier/prettier-vscode) for [Visual Studio Code](https://github.com/Microsoft/vscode) when contributing to this project.
