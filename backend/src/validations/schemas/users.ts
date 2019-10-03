const getById : Object = {
  type: 'object',
  required: true,
  properties: {
    id: {
      type: 'number',
      required: true
    }
  }
}

const create : Object = {
  type: 'object',
  required: true,
  properties: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }
}

export = {
  getById,
  create
}