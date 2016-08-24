import reducer, { initialState } from './reducers/index'

import Form from './containers/Form'
import FormButton from './containers/FormButton'
import InputSet from './wrappers/InputSet'
import Input from './wrappers/Input'
import Button from './wrappers/Button'
import Label from './wrappers/Label'
import Errors from './wrappers/Errors'
import FormObject from './FormObject'

import updateAction from './actions/updateAction'
import { getId, getName } from './utils/modelParams'

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
  updateAction,
  getId,
  getName,
}
