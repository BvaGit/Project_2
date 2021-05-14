import jwt from 'jsonwebtoken'

class JwtService {
    static generateAccessToken (data){
      // console.log(data);
      var expTime = Math.floor(Date.now() / 1000) + (60 * 60)
        return jwt.sign({
          exp: expTime,
          data: data
        }, process.env.TOKEN_SECRET);
    }

    static authenticateToken(req, res, next) {
        if(req.path === '/api/mysql/auth' || (req.path === '/api/mysql/users' && req.method === 'POST')){
            return next()
        }
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.send(401).json({message: "Unauthorized"})  
        var decodedToken = jwt.decode(token)
        console.log( "decodedToken:", decodedToken);
        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
          console.log(err)
          if (err) return res.send(403).josn({message: "Forbidden"})
          req.user = user
          next()
        })
    }
}
export {JwtService}