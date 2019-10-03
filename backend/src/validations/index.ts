import JSONSchema from 'jsonschema'

const validate = (data, schema) => {
  const validationErrors = JSONSchema.validate(data, schema).errors
  if(validationErrors.length > 0){
    //TODO: Importovat tady errors util!
    throw new Error('VALIDATION ERROR')
  }
}

export = validate