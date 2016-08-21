# rform: React/Redux Forms - optimized for a Ruby on Rails backend

- inspired by Ruby on Rails forms (FormHelper/SimpleForm) and form objects
  (reform)
- works well with a rails backend, but it's not necessary
- uses redux for state updates

## Installlation

`npm install --save rform`

## Usage

`import { YourDesiredComponent } from 'rform'`

## Features for Ruby on Rails Interaction

- if an `authToken` is given or `state.authToken` is defined,
  a hidden field providing it will be generated
- if a method other than `GET` or `POST` is provided, a hidden `_method` field
  will be generated
- if you are using `i18n-js` and/or provide a global `I18n` object, rform
  will search it for translations

## License

MIT
