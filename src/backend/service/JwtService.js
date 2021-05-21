import jwt from 'jsonwebtoken'

class JwtService {
  
  static generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '10000s' });
  }

  static authenticateToken(req, res, next) {
    if (req.path === '/api/mysql/auth' || (req.path === '/api/mysql/users' && req.method === 'POST')) {
      return next()
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.status(401).json({message: 'unauthorized'})

    jwt.verify(token,process.env.TOKEN_SECRET, (err, user) => {
      
      if (err) return res.status(403).json({message: 'forbidden'})

      req.user = user

      next()
    })
  }
}
export { JwtService }