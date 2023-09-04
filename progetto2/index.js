const express = require('express');
const app = express();
const {PrismaClient} =  require('@prisma/client')
const prisma = new PrismaClient()
app.listen(3000);

app.use(express.json());

app.post('/figli', async(req,res) =>{

    const addedChildren = await prisma.figli.create({data: req.body});
    res.json(addedChildren)
})

app.post('/genitori', async(req,res) =>{

    const addedParents = await prisma.genitore.create({data: req.body});
    res.json(addedParents)

})
app.get("/genitori", async(req,res) =>{
    const allParents = await prisma.genitore.findMany({include:{children:true, job:true}})
    res.json(allParents)
})
app.get("/figli", async(req,res) =>{
    const allChildrens = await prisma.figli.findMany({include : {FirstParent:true}});
    res.json(allChildrens)
})
app.post("/job", async(req,res) =>{
    const addedJob = await prisma.job.create({data:req.body})
    res.json(addedJob)
})/*{
    "name": "Scuola Media Aristotele Bastardo",
    "address":"Via Scimmia 98",
    "employeeId":"8e07b38a-e7ff-461c-955a-93e22a063253"
}*/