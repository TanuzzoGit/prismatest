const express = require('express');
const app = express();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
app.use(express.json());

app.listen(3001, () => console.log('running on port ${3001}!'))

//QUESTO L'HO SCRITTO DI MIA INIZIATIVA APPUNTO è MOLTO BRUTTO PERò 
//NE VADO FIERO SE LO VEDRAI MAI PER FAVORE NON INSULTARMI 
//GRAZIE FLAVIO , CON AMORE TANO
app.get('/', async (req,res) =>{

    const {q} = req.query
        if(q) {
           const allUser= await prisma.user.findMany().then((result) => {
                
              return users =  result.find((user) => {
                    return users = user.name === q ? user : null
                })
                
            })
        res.json(allUser);
    }
    else {const allUser = await prisma.user.findMany();
    res.json(allUser);}
});

app.post('/', async (req,res) =>{
    const AddedUser = await prisma.user.create({data: req.body})
res.json(AddedUser);
})
app.put('/:id', async (req,res) =>{
    const {id} = req.params;
    const {age} = req.body;

    const AddedUser = await prisma.user.update({where: {id: id}, data: {age: age}})
    res.json(AddedUser);
})
app.get('/house' , async(req,res) =>{
    const allHouses = await prisma.house.findMany({include:{
        owner:true,
        builtBy:true
    }})
    res.json(allHouses);
})
app.post('/house', async (req,res)=>{
    const AddedHouse = await prisma.House.create({data: req.body})
    res.json(AddedHouse);
})
app.delete('/', async (req,res)=>{
    await prisma.user.deleteMany();
    const persone = prisma.user.findMany();
    res.json(persone);
})

/*{
    
    "address":"largo carmelo mendola 2"
    "ownerId": 
    
} */
