# vuejs

> Vue Single Page Application

## ECMAScript 6

### [Arrow Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
``` js

// Multiple parameters
(param1, param2, …, paramN) => { statements }

// Single parameter (Parentheses are optional when there's only one parameter)
(param) => { statements }
param => { statements }

// no parameters
() => { statements }

// Advanced Syntax
params => expression // eq: params => { return expression; }
params => void expression // eq: params => { expression; }
params => ({object: literal}) // eq: params => { return {object: literal}; }
```

<!--
## Install
``` bash
# vue-cli
npm install vue-cli -g

# init project
vue init webpack vue
```
-->

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](https://vuejs-templates.github.io/webpack/) and [docs for vue-loader](https://vuejs.github.io/vue-loader).

## JavaScript Style Guide
- [Standard JavaScript Style Guide](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://github.com/google/styleguide)

## Configuration
- [EditorConfig](http://editorconfig.org/)
- [ESLint](https://eslint.org/docs/user-guide/configuring)
- [babelrc](https://babeljs.io/docs/usage/api/#options)
- [postcssrc](https://github.com/michael-ciniawsky/postcss-load-config)
- [prettierrc](http://json.schemastore.org/prettierrc)
