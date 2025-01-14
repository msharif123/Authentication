const express= require ("express");

const bcrypt = require ("bcrypt")
const app = express();

app.use(express.json())
const PORT= process.env.PORT || 4001

let users=[]

app.get ("/users", (req, res)=>{
    res.json("Hello Jensen")
})



app.post("/users",async (req, res)=>{
   
    try { 
        // const salt= await bcrypt.genSalt()
        const hashedPassword= await bcrypt.hash(req.body.password,10) 
        // console.log(salt)
        // console.log(hashedPassword)
        const user = {"name": req.body.name, password: hashedPassword}

        users.push(user);

        res.status (200).json({Message: "users created successfully", user })
    } catch  (error) {
        res.status(500).send("somethin is wrong with this server")
     
        res.send(req.hashedPassword)
    }
    
   
})


    app.post("/users/login", async (req,res)=>{

        const user= users.find(user => user.name === req.body.name)
        if (user==null){
            return res.status(400).send("cannot find the user")        }
        
        try {
            if(await bcrypt.compare(req.body.password, user.password)){
                res.send ("user login successfully")
                

            }else{
                res.send("not allowed")
            }
        } catch (error) {
            res.status(500).send( )
            
        }

    
 })








app.listen (PORT, console.log ( `This server is listening on port ${PORT}`))





