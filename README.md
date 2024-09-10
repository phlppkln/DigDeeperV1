# Dig Deeper

## About the app

Dig Deeper is ...

## How-To-Develop

**&nbsp;ℹ&nbsp;Note**:

- We recommend a Chromium-based web browser for local development with HTTP. Safari enforces HTTPS; therefore, it doesn't allow localhost through HTTP.
- For more information, visit the [Miro developer documentation](https://developers.miro.com).
- Built using the [`create-miro-app`](https://www.npmjs.com/package/create-miro-app) template.
- This app uses [Vite](https://vitejs.dev/) and [React](https://https://react.dev/). It uses [Mirotone](https://mirotone.xyz) for styling.

### How to start locally in developer mode

- Run `npm i` to install dependencies.
- Run `npm start` to start developing. \
  Your URL should be similar to this example:

 ```[]
 http://localhost:3000
 ```

- Paste the URL under **App URL** in your
  [app settings](https://developers.miro.com/docs/build-your-first-hello-world-app#step-3-configure-your-app-in-miro).
- Open a board; you should see your app in the app toolbar or in the **Apps**
  panel.

### How to build a Miro app

- Run `npm run build`. \
  This generates a static output inside [`dist/`](./dist), which you can host on a static hosting
  service.

### Folder structure

```[]

├── src
│  ├── assets
│  │  └── style.css
|  ├── help-modal
│  │  └── components
│  │  └── views
│  │  └── HelpModalMain.tsx       // entry point for help modal
|  ├── helper-scripts     // helper scripts for things such as debugging and data analysis
|  ├── interfaces         // reusable typescript interfaces
|  ├── panel
│  │  └── components
│  │  └── views
│  │  └── PanelMain.tsx           // entry point for the panel
|  ├── vis-modal
│  │  └── components
│  │  └── views
│  │  └── VisModalMain.tsx           // entry point for the visualization modal
│  └── index.ts    // The code for the app entry point lives here
└── index.html     // The app entry point. This is what you specify in the 'App URL' box in the Miro app settings
```
