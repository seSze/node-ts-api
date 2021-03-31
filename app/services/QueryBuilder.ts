export default class {
  protected parts: string[] = []

  select(fields = ['*']) {
    this.parts.push('SELECT')
    this.parts.push(fields.join(', '))

    return this
  }

  from(table: string) {
    this.parts.push(`FROM ${table}`)
   return this
  }

  where(conditions: string[]) {
    if (conditions.length) {
      this.parts.push('WHERE')
      this.parts.push(conditions.join(' AND '))
    }

    return this
  }

  order(orderBy: string|null = null, order: string|null = null) {
    if (orderBy) {
      this.parts.push(`ORDER BY ${orderBy} ${order}`)
    }
    return this
  }

  limit(limit: number|null = null) {
    if (limit) {
      this.parts.push(`LIMIT ${limit}`)
    }
    return this
  }

  build() {
    return this.parts.join(' ')
  }
}
