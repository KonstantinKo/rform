import reducer, { initialState } from './reducers/index'

import Form from './containers/Form'
import FormButton from './containers/FormButton'
import InputSet from './wrappers/InputSet'
import Input from './wrappers/Input'
import Button from './wrappers/Button'
import Label from './wrappers/Label'
import Errors from './wrappers/Errors'

import FormObject from './object/FormObject'
import FormDataAdapter from './object/adapters/FormData'
import JsonApiAdapter from './object/adapters/JsonApi'

import updateAction from './actions/updateAction'
import setupAction from './actions/setupAction'
import registerSubmodelForm from './actions/registerSubmodelForm'
import unregisterSubmodelForm from './actions/unregisterSubmodelForm'
import { getId, getName } from './utils/modelParams'
import { navigateThroughSubmodels } from './utils/stateNavigation'

export {
  reducer,
  initialState,
  Form,
  FormButton,
  Input,
  InputSet,
  Button,
  Label,
  Errors,
  FormObject,
  FormDataAdapter,
  JsonApiAdapter,
  updateAction,
  setupAction,
  registerSubmodelForm,
  unregisterSubmodelForm,
  getId,
  getName,
  navigateThroughSubmodels,
}
