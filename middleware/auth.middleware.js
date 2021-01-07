const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next()
  }

  try {
    
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    console.log('!token = ' + !token)
    
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации: token пуст' })
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (e) {
    console.log(e)
    // тут видимо нужно выбрасывать на страницу авторизации, если TokenExpiredError: jwt expired
    res.status(401).json({ message: 'Нет авторизации: она видимо протухла' })
  }
}
