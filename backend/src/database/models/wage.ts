import { Model } from 'objection'

class Wage extends Model {
  static get tableName(){
    return 'm.udaje'
  }
}

export = Wage