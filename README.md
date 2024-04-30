> ⚠️ As of April 2024, this project is no longer maintained by me and development continues with a different team on a different platform.

# EUROMAT [![Netlify Status](https://api.netlify.com/api/v1/badges/ab25f2eb-228a-421f-b143-5c2f7affb90b/deploy-status)](https://app.netlify.com/sites/euromat/deploys)

A Vue.js-powered, progressive web voting application for European (or German) elections. EUROMAT is hosted on _Netlify_ and uses the **Netlify CMS** for easier collaboration.

## Calculation Model

The calculation model for voting has been defined by the German Federal Agency for Civic Education _(Bundeszentrale für politische Bildung)_. A good overview can be found in this PDF: [`resources/Rechenmodell des Wahl-O-Mat.pdf`](resources/Rechenmodell%20des%20Wahl-O-Mat.pdf).

## Embedding Euromat

It's possible to embed Euromat via an `iframe` and setting query parameters. Note if you don't set the `embedded=iframe` parameters, the website will render the header and footer.

```html
<iframe
  id="euromat-2021"
  title="Euromat 2021"
  width="500"
  height="300"
  src="https://euromat.info/de/theses?embedded=iframe"
>
</iframe>
```

## Results

The application creates a semi-unique, shareable deep-link for each voting result. To not reveal a users theses choices, the shareable identifier is created based on the results. Omitting the unique results from the URL, the application will try to get the resulst from a users sessionStorage.

```txt
# Full example
https://euromat.info/en/theses/results/s:48,10:31,11:29,6:27,4:27,1:27,9:26,3:26,2:24,5:23,8:22,7:17,0:15

# Syntax
https://euromat.info/.../s:scoreNumber,partyId:score,partyId:score,...
```

The query is comma-separated and prefixed with the total score (`s:48`) that is being used to calculate the overall percentage of each party score. The rest (`10:31`,...) are the individual scoring results per party.

## Development

This is a Vue.js progressive web application, developed with [`@vue/cli`](https://github.com/vuejs/vue-cli).

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `npm install`       | Installs dependencies                           |
| `npm run serve`     | Serve with hot reload at localhost:8080         |
| `npm run build`     | Build for production with minification          |
| `npm run test:unit` | Run all unit tests                              |
| `npm run lint`      | Runs `standard` over all `.js` and `.vue` files |
| `npm run svg`       | Creates all SVG files used in the application   |
| `npm run admin`     | Creates `config.yml` for Netlify CMS admin UI   |
