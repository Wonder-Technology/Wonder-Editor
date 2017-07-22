# Boilerplate for React with rollup and typescript

## Install dependencies
Just run `npm install`.

## Building
Run `npm run watch` will build the sources, start watching for changes and serve the project.
It also will live reload the page when new changes are bundled.
The served page can be accessed via http://localhost:3000/.

### Production build
Running `npm run build` will create a production build, which doesn't include the server and livereload.
The production build will also be minified.

## Linting
The project includes tslint as a linter, which can be run with `npm run linter`.
