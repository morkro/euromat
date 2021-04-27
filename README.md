# EUROMAT [![Netlify Status](https://api.netlify.com/api/v1/badges/ab25f2eb-228a-421f-b143-5c2f7affb90b/deploy-status)](https://app.netlify.com/sites/euromat/deploys)

A Vue.js-powered, progressive web voting application for European elections. EUROMAT is hosted on _Netlify_ and uses the **Netlify CMS** for easier collaboration. 

## Calculation Model

The calculation model for voting has been defined by the German Federal Agency for Civic Education _(Bundeszentrale für politische Bildung)_. A good overview can be found in this PDF: [`resources/Rechenmodell des Wahl-O-Mat.pdf`](resources/Rechenmodell%20des%20Wahl-O-Mat.pdf).

## Embedding Euromat

It's possible to embed Euromat via an iframe and setting query parameters:

```html
<iframe
  id="euromat-2019"
  title="Euromat 2019"
  width="500"
  height="300"
  src="https://euromat.info/de/theses?embedded=iframe">
</iframe>
```

## ⌨️ Development

This is a Vue.js progressive web application, developed with [`@vue/cli`](https://github.com/vuejs/vue-cli).

| Command | Description |
| ------- | ----------- |
| `npm install` | Installs dependencies |
| `npm run serve` | Serve with hot reload at localhost:8080 |
| `npm run build` | Build for production with minification |
| `npm run test:unit` | Run all unit tests |
| `npm run lint` | Runs `standard` over all `.js` and `.vue` files |
| `npm run svg` | Creates all SVG files used in the application |
| `npm run admin` | Creates `config.yml` for Netlify CMS admin UI |
