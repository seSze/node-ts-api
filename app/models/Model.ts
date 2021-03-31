import config from 'config'
import pluralize from 'pluralize'
import Database from '../services/Database'
import QueryBuilder from '../services/QueryBuilder'

class Model {
  protected _conditions: string[] = []
  protected _order = 'ASC'
  protected _orderBy: string|null = null
  protected _limit: number|null = null
  protected _fields = ['*']

  public get table() {
    const tablePrefix = config.get('server.database.tablePrefix') || ''
    const table = pluralize(this.constructor.name.toLocaleLowerCase())

    return `${tablePrefix}${table}`
  }

  protected get fieldMap(): Record<string, string> {
    return {}
  }

  protected get hidden(): string[] {
    return []
  }

  public get keyName(): string {
    return 'id'
  }

  public where(condition: string|Record<string, any>, value?: string) {
    if (typeof condition === 'string') {
      this._conditions.push(`${condition}='${value}'`)
    }

    return this
  }
  public create(payload: Record<string, unknown>) {}
  public order(orderBy: string, order: string = 'ASC') {
    this._order = order
    this._orderBy = orderBy
    return this
  }

  public select(fields: string[]) {
    this._fields = fields.map((field: string) => {
      const mapped = Object.keys(this.fieldMap).find((_key: string) => this.fieldMap[_key] === field)

      return mapped || field
    })

    return this
  }
  public limit(limit: number): Model {
    this._limit = limit
    return this
  }
  public all() {}
  public find() {}
  public first() {

  }
  public async get() {
    const query = new QueryBuilder()
      .select(this._fields)
      .from(this.table)
      .where(this._conditions)
      .order(this._orderBy, this._order)
      .limit(this._limit)
      .build()

    console.log('Query: ', query)

    const { data } = await Database.query(query)
    data.map((item: object) => this.decorate(item))
    return {data}
  }

  protected decorate(data: Record<string, any>) {
    for(const key in data) {
      if (this.hidden.includes(key)) {
        delete data[key]
      }

      if (Object.keys(this.fieldMap).includes(key)) {
        const newKey = this.fieldMap[key]

        data[newKey] = data[key]
        delete data[key]
      }


    }
    return data
  }
}

export default Model
