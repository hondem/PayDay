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
      required: true,
      format: 'email'
    },
    password: {
      type: 'string',
      required: true
    }
  }
}

const update : Object = {
  type: 'object',
  required: true,
  properties: {
    id: {
      type: 'number',
      required: true
    },
    email: {
      type: 'string',
      format: 'email'
    }
  }
}

export = {
  getById,
  create,
  update
}