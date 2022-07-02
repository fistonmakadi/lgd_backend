const db = require('../datasource/database')
const model = require('../model/adherentModel')
const fs = require('fs')

module.exports = {

    Add: async (req, res)=>{

        try{
            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

                //le chemin de dossier à créér pour garder les images http://192.168.43.52:8600/
        
                const image_path="public"+ "/uploads/images/adherent/" +new Date().getTime()+"_"+data.username+ ".png";

                fs.writeFile (image_path, data.photo, 'base64', async function (err) {

                        if (err){
                        
                            const response = {
                                status: 401,
                                data: "Echec de création de l'image"
                            }
                                
                            res.status(201).json(response);
                        }
                        else{

                            //une fois l'image bien créé alors on continue notre parcours

                            const url_photo = "http://192.168.43.53:8800/" + image_path

                            let rows = await db.pool.query(model.insertAdherent, 
                                [
                                    data.nom, 
                                    data.postnom,
                                    data.prenom,

                                    data.username,
                                    data.password,

                                    data.telephone,
                                    data.sexe,
                                    data.email,
                                    data.adresse,
                                    data.quartier,
                                    data.commune,
                                    data.ville,
                                    data.district,
                                    data.province,
                                    data.province_origine,

                                    url_photo,
                                    data.bio,
                                    data.status,
                                    data.dateCreate

                                ])
                            rows = await db.pool.query(model.getAdherentCode, [rows[0].insertId])
                
                            if(rows[0].length === 0){
                                return res.json({status:400})
                            }
                            const response = {
                                status: 200,
                                data: rows[0]
                            }
                            return res.json(response)

                        }

                    }
                    ); 


        } catch(error){
            return res.json(error)
        }
    },

    getAll: async (req, res)=>{

        try{

            const rows = await db.pool.query(model.getAdherentData, [])

            if(rows[0].length === 0){
                return res.json({status:400})
            }
            const response = {
                status: 200,
                data: rows[0]
            }
            return res.json(response)

        } catch(error){
            return res.json(error)
        }
    },

    getByCodeAdherent: async (req, res)=>{

        try{

            const codeAdherent = req.body.codeAdherent

            const rows = await db.pool.query(model.getAdherentCode, [codeAdherent])
            if(rows[0].length === 0){
                return res.json({status:400})
            }
            const response = {
                status: 200,
                data: rows[0][0]
            }

            return res.json(response)

        } catch(error){
            return res.json(error)
        }
    },

    getAdherentByUsernameAndPwd: async (req, res)=>{

        try{

            const user = req.body.user
            const data = JSON.parse(user)

            const rowsCheck = await db.pool.query(model.checkAdherentExist, [data.username, data.password])

            if(rowsCheck[0].length === 0){
                return res.json({status:400})
            }
            const response = {
                status: 200,
                data: rowsCheck[0]
            }
            return res.json(response)

        } catch(error){
            return res.json(error)
        }

    },

    Delete: async (req, res)=>{

        try{

            const codeAdherent = req.body.codeAdherent
        
            let rows = await db.pool.query(model.deleteAdherent, [codeAdherent])
            if (rows[0].affectedRows > 0){
            
                return res.json({status:200})
            }

            return res.json({status:500})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateAdherent, 
                [
                    data.email, 
                    data.adresse, 
                    data.quartier, 
                    data.commune, 
                    data.ville, 
                    data.district, 
                    data.province, 
                    data.province_origine, 
                    data.bio, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.code])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePhotoAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            const image_path="public"+ "/uploads/images/adherent/" +new Date().getTime()+"_"+data.username+ ".png";

            fs.writeFile (image_path, data.photo, 'base64', async function (err) {

                if (err){
                
                    const response = {
                        status: 401,
                        data: "Echec de création de l'image"
                    }
                        
                    res.status(201).json(response);
                }
                else{

                    //une fois l'image bien créé alors on continue notre parcours

                    const url_photo = "http://192.168.43.52:8800/" + image_path

                    let rows = await db.pool.query(model.updatePhotoAdherent, 
                        [  
                            url_photo,

                            data.code
                        
                        ])
        
                    if (rows[0].affectedRows > 0){
                        return res.json({status:200})
                    }
        
                    return res.json({status:400})

                }

            }
            ); 
        

        } catch(error){
            return res.json(error)
        }

    },

    UpdateNomAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateNomAdherent, 
                [
                    data.nom, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePostnomAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updatePostnomAdherent, 
                [
                    data.postnom, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePrenomAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updatePrenomAdherent, 
                [
                    data.prenom, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateUsernameAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateUsernameAdherent, 
                [
                    data.username, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePwdAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updatePwdAdherent, 
                [
                    data.password, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePhoneAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updatePhoneAdherent, 
                [
                    data.telephone, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateSexeAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateSexeAdherent, 
                [
                    data.sexe, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateEmailAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateEmailAdherent, 
                [
                    data.email, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateAdresseAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateAdresseAdherent, 
                [
                    data.adresse, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateQuartierAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateQuartierAdherent, 
                [
                    data.quartier, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateCommuneAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateCommuneAdherent, 
                [
                    data.commmune, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateVilleAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateVilleAdherent, 
                [
                    data.ville, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateDistrictAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateDistrictAdherent, 
                [
                    data.district, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateProvinceAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateProvinceAdherent, 
                [
                    data.province, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateProvinceOrigineAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateProvinceOrigineAdherent, 
                [
                    data.province_origine, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateBioAdherent: async (req, res)=>{

        try{

            const adherent = req.body.adherent
            const data = JSON.parse(adherent)

            let rows = await db.pool.query(model.updateBioAdherent, 
                [
                    data.bio, 

                    data.codeAdherent
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getAdherentCode, [data.codeAdherent])

                const response = {
                    status: 200,
                    data: rows[0][0]
                }
    
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },


}