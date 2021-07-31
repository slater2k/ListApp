import {object} from "yup";

export default class Request {
  schema = object().shape();

  constructor(values = {}) {
    this.values = values;
  }

  async isValid() {
    return await this.schema.isValid(this.values)
  }

  toJSON() {
    return this.values || {};
  }
}
