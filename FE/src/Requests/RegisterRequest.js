import {object, string} from "yup";
import Request from "./Request";
import * as yup from 'yup';

export default class RegisterRequest extends Request {
  schema = object().shape({
    username: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
}
