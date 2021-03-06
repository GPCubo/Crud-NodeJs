const connection = require("../../dbConnection/connection")
const conn = connection()

const controller = {}

controller.index = (req, res, next) => {
    conn.query('SELECT * FROM users', (err,rows) => {
        if(err) next(new Error(err))
        else res.render("index",{allUsers : rows})
    })
}
controller.updateUser = (req,res,next) =>{
    conn.query('UPDATE users SET ? WHERE id= ?',[req.body,req.params.userId],(err,rows)=>{
        if(err)next(new Error(err))
        res.redirect("/")
    })
};

controller.deleteUser = (req,res,next) =>{
    conn.query('DELETE FROM users WHERE id= ?',[req.params.userId],(err,rows)=>{
        if(err)next(new Error(err))
        res.send({ok:true})
    })
};
controller.addPublic = (req,res,next) =>{
    conn.query('SELECT * FROM users WHERE email= ?',[req.body.email] ,(err,rows) => {
        if(err) next(new Error(err))
        else if (rows[0] == undefined) {
            conn.query('INSERT INTO users SET ?',[req.body],(err,rows)=>{
                if(err)next(new Error(err))
                res.send({ok:true})
                })
        }
        else {res.send({ok:false})}
    })
};
controller.addUser = (req,res,next) =>{
    conn.query('INSERT INTO users SET ?',[req.body],(err,rows)=>{
    if(err)next(new Error(err))
    res.redirect("/")
    })

};


module.exports = controller