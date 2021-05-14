import jwt from 'jsonwebtoken'

class JwtService {
    static generateAccessToken (data){
        return jwt.sign(data, process.env.TOKEN_SECRET);
    }

    static authenticateToken(req, res, next) {
        if(req.path === '/api/mysql/auth' || (req.path === '/api/mysql/users' && req.method === 'POST')){
            return next()
        }
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.send(401).json({message: "Unauthorized"})  
        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
          console.log(err)
          if (err) return res.send(403).josn({message: "Forbidden"})
          req.user = user
          next()
        })
      }
}
export {JwtService}