const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var BD = {
    contatos:[

        {id:1,'nome':'Amanda','telefone':'(87)94445-7788','Agenda':'Trabalho'},
        {id:2,'nome':'Alice','telefone':'(88)96867-4788','Agenda':'Casa'},
        {id:3,'nome':'Alex','telefone':'(97)95545-9288','Agenda':'Trabalho'},
        {id:4,'nome':'Bruno','telefone':'(87)91111-5588','Agenda':'Trabalho'},
        {id:6,'nome':'Brenda','telefone':'(22)95555-9988','Agenda':'Casa'},
        {id:7,'nome':'Braulio','telefone':'(11)98825-6644','Agenda':'Cidade'},
        {id:8,'nome':'Claudia','telefone':'(55)92200-2788','Agenda':'Cidade'}
    ]
}


//rota get contatos ok 
app.get('/contatos',(req,res)=>{

     res.send(BD.contatos);
     res.sendStatus(200);
});


//rota get contato unic concluida
app.get('/contato/:id',(req,res)=>{ 

  if(isNaN(req.body.id)){  
     
    req.sendStatus(400);

    }else{


    var id =parseInt(req.params.id);

    var contato = BD.contatos.find(c => c.id == id);

     if(contato != undefined){

        res.json(contato);

      }else{

         res.sendStatus(404);

      }
 
  }
});

//inserir contato rota OK

app.post('/contato',(req,res)=>{
   
    var{id,nome,telefone,Agenda} = req.body;

    BD.contatos.push({
        id:id,
        telefone:telefone,
        Agenda:Agenda
    });

    res.sendStatus(200);

});

//rota de apagar contato OK

app.delete('/contato/:id',(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);

        var index = BD.contatos.findIndex(c => c.id == id);

        if(index == -1){

            res.sendStatus(404);

        }else{

            BD.contatos.splice(index,1);
            res.sendStatus(200);


        }
    }

   
});



//rota para editar contato ok 

app.put('/contato/:id',(req,res)=>{

    if(isNaN(req.params.id)){

        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);

        var contato = BD.contatos.find(c => c.id == id);

        if(contato != undefined){

            var {nome,telefone,Agenda} = req.body;

            if(nome != undefined){
                contato.nome = nome;
            }
            
            if(telefone != undefined){
                contato.telefone = telefone;
            }
            
            if(Agenda != undefined){
                contato.Agenda = Agenda;
            }

            res.sendStatus(200);

            

        }else{

            res.sendStatus(404);
        }
    }


});






app.listen(8000,()=>{

    console.log('Api online');

})