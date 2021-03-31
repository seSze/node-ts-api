export default (req: any, res: any, next: any) => {
  const header = req.headers.authorization
  const token = header && header.split(' ')[1]
 // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
  if (!token) {

  }

}
