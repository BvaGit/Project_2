import colors from 'colors'

export const logger = ( req,res,next ) =>{
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const hh = String(today.getHours()).padStart(2,'0');
  const mm = String(today.getMinutes()).padStart(2,'0');
  const ss = String(today.getSeconds()).padStart(2,'0')

  today = MM + '/' + dd + '/' + yyyy + ' ' + hh + ':' + mm + ':' + ss;

  switch ( req.method ) {
    case 'GET':
      console.log(colors.bgBlack(`[${today}] ${colors.green('[GET]')} [${req.path}] [${req.ip}]`))
      break
    case 'POST':
      console.log(colors.bgBlack(`[${today}] ${colors.yellow('[POST]')} [${req.path}] [${req.ip}]`))
      break   
    case 'PUT':
      console.log(colors.bgBlack(`[${today}] ${colors.blue('[PUT]')} [${req.path}] [${req.ip}]`))
      break     
    case 'DELETE':
      console.log(colors.bgBlack(`[${today}] ${colors.red('[DELETE]')} [${req.path}] [${req.ip}]`))
      break     
  }
  
  next()
}
