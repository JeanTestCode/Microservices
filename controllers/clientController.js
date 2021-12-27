const getClients = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);

            conn.query('SELECT * FROM clients', (err,rows) =>{
                if(err) return res.send(err)
                res.json(rows)
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const getClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);

            conn.query('SELECT * FROM clients WHERE id = ?',[req.params.id], (err,rows) =>{
                if(err) return res.send(err)
                res.json(rows[0])
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const addClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);
            const data = req.body;
            data.createdAt = new Date();
            conn.query('INSERT INTO clients set ?', [req.body], (err,rows) =>{
                if(err) return res.send(err)
                res.send('client added')
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const deleteClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);                        
            conn.query('DELETE FROM clients where id = ?', [req.params.id], (err,rows) =>{
                if(err) return res.send(err)
                res.send('client deleted')
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const updateClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);                        
            conn.query('UPDATE clients set ? WHERE id = ?', [req.body, req.params.id], (err,rows) =>{
                if(err) return res.send(err)
                res.send('client updated')
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const kpiClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);
            conn.query('SELECT * FROM clients', (err,rows) =>{
                if(err) return res.send(err)                   
                
                var agesArr= [];
                rows.forEach((element) => {
                    agesArr.push(element.age)        
                });

                let mean = agesArr.reduce((acc, curr)=>{
                    return acc + curr
                },0) / agesArr.length;

                agesArr = agesArr.map((k)=>{
                    return (k - mean) ** 2
                })        
                let sum = agesArr.reduce((acc, curr)=> acc + curr, 0);      
                let ds = Math.sqrt(sum / agesArr.length)
                
                var response = {
                    average: mean,
                    standarDesviation: ds
                }
                res.json(response)
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

const deathDateClient = async(req,res) =>{
    try{        
        req.getConnection((err,conn)=>{
            if(err) return res.send(err);
            conn.query('SELECT * FROM clients', (err,rows) =>{
                if(err) return res.send(err)                                 
                
                var newDate = new Date(); 
                rows.forEach((element) => {                           
                    newDate.setDate(newDate.getDate()+ (Math.random()*(6000-4500)+4500));
                    var deathDate = newDate.toISOString().split('T')[0]
                    element.deathDate = deathDate        
                });
                res.json(rows)
            })

        })
    }catch (err){
        res.status(400).send(err.message);
    }
}

module.exports = {
    getClients,
    addClient,
    deleteClient,
    updateClient,
    getClient,
    kpiClient,
    deathDateClient
}




