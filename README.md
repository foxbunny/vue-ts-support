# vue-ts-support

This package provides support tooling for managing a
[Vue.js](https://vuejs.org/) project build. It is a quick way to get off the
ground, but also a very opinionated one.

## Status

This project is in early development. It's currently a bit rough around the
edges and may not provide the smooth experience offered by `create-react-app`
and similar projects. It is published in the hope that it will be useful to
you, without any warranties or promises.

## Goals and ideas

The following are the guiding principles behind vue-ts-support:

- One dependency
- Easy configuration
- Easy to fork and extend
- Production-ready

This project is heavily influenced by
[create-react-app](https://github.com/facebookincubator/create-react-app) and
[create-cycle-app](https://github.com/cyclejs-community/create-cycle-app).

## Supported technologies

This is a list of supported technologies:

- Webpack 2
- TypeScript (linting and type checking)
- Single-file components
- Autoprefixer
- Jest unit testing

## Installation

Before you can use `vue-ts-support` scripts, you will need to install
[Yarn](https://www.npmjs.com/package/yarn). You don't need to use it but the
script that scaffolds new projects will call it.

    npm install --global yarn

To install `vue-ts-support` package itself, you can use either yarn:

    yarn global add vue-ts-support

or npm:

    npm install --global vue-ts-support

## Usage

Create a directory where you want to init your Vue.js project. In the directory,
run the following command:

    create-vue-project

This will run `npm init` in the directory and install `vue-ts-support` package
as a development dependency. It will also copy the `vue-ts-support` template
into the application directory, and create a `.gitignore` file.

Once the script is done, you will see a message showing a handful of commands
you can run to get started.

## Customization

`vue-ts-support` can be customized using options in the `package.json` file.

All options for customizing `vue-ts-support` are under the `vueTS` key:

    {
      ....
      "vueTS": {
        .... <-- options go here
      }
    }

### Webpack configuration

Webpack configuration can be customized to some extent. Before you do that,
however, you will want to get familiar with
[webpack-blocks](https://github.com/andywer/webpack-blocks).

To customize webpack setup, you will define a module that exports an array of
additional blocks. You will then point to this module in your `package.json`
file using the `webpackExtra` key. For example:

    {
      ....
      "vueTS": {
        "webpackExtra": "webpack.extra.js" 
      }
    }

### Development server API proxy URL

To add a proxy target URL, add a `proxy` key to your `package.json`. For
example:

    {
      ....
      "vueTS": {
        "proxy": "http://localhost:3000/"
      }
    }

This URL will be available as `/api/` (not customizable) to your front end code.

### Development server port

The port on which the development server will listen can be changed using the
`port` option in your `package.json`. By default, this port is 8080.

    {
      ....
      "vueTS": {
        "port": 8000
      }
    }

**NOTE:** Port number is a numeric value, so do not quote it.

## TODO

This is a list of items that are going to be in the final 1.0.0 release.

- [ ] Allow creating projects in locations other than the current directory
- [ ] More complete Jest support (e.g., .vue files)
- [ ] Option to include vue-router and vuex out of the box
- [ ] Option to scaffold i18n support
- [ ] Scripts to update and/or enhance existing projects
- [ ] Simple code generator scripts (e.g., generate .vue skeletons)
- [ ] Eject command
- [ ] Support CSS preprocessors
- [ ] Babel fallback for those that don't want TypeScript
- [ ] JSX support for those that need it