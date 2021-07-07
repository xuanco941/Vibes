const authSchema = require('../model/Schema/authSchema') ;

class authController {
    getsignin (req , res) {
        res.render('auth' , {layout: false});
      
    }
    getsignup (req , res) {
        res.render('auth_signup' , {layout: false});
      
    }
    postsignup (req , res) {
        let username = req.body.username;
        let password = req.body.password;
        let _name = req.body._name;
       authSchema.findOne({username : username})
       .then(data => {
           if (data) 
            {res.send('Tai khoan nay da ton tai');}
            else{
                authSchema.create({
                    username : username , password: password , _name : _name
                })
                setTimeout(() => {
                    res.redirect('/');
                }, 2000);
            }   
       })
      }
    postsignin (req , res ){
        let username = req.body.username;
        let password = req.body.password;
        authSchema.findOne({username : username , password: password })
        .then(data => {
            if(data)
            {
            res.cookie('userCookie' , data._id.toString() , {expires: new Date (Date.now + (24*60*60*1000))});
            res.redirect('/home');    
            
        }
            else
            res.redirect('/');
       })
       .catch(err => {
           res.send('ERROR!!!');
       })
       
      
    }
}

module.exports = new authController;