import config from 'config'
import mysql from 'mysql'

const { host, user, password, database } = config.get('server.database')

const query = (query: string): Promise<any> => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host, user, password, database
  })
  connection.connect()
  connection.query(query, (error, results, fields) => {
    if (error) {
      return reject(error)
    }

    return resolve({
      data: results,
      fields
    })
  })

  connection.end()
})

export default { query }
