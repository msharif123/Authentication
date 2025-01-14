const express= require ("express");

const bcrypt = require ("bcrypt")
const app = express();

app.use( express.json())
const PORT= process.env.PORT || 4001



app.get ("/users", (req, res)=>{
    res.send("Hello Jensen")
})



app.post("/users",async (req, res)=>{
    
    try { const salt= await bcrypt.genSalt()
        const hashedPassword= await bcrypt.hash(req.body.password,salt) 
        console.log(salt)
        console.log(hashedPassword)
        const user = {"name": req.body.name, password: hashedPassword}
        res.status (200).json({Message: "users created successfully", user })
    } catch  (error) {
        res.status(500).send("somethin is wrong with this server")
        
    }
   
    res.send(req.hashedPassword)
    
})








app.listen (PORT, console.log ( `This server is listening on port ${PORT}`))