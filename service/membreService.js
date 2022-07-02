const db = require('../datasource/database')
const model = require('../model/membreModel')
const fs = require('fs')

module.exports = {

    Add: async (req, res)=>{

        try{
            const membre = req.body.membre
            const data = JSON.parse(membre)

                //le chemin de dossier à créér pour garder les images http://192.168.43.52:8600/
        
                const image_path="public"+ "/uploads/images/membre/" +new Date().getTime()+"_"+data.username+ ".png";

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

                            let rows = await db.pool.query(model.insertMembre, 
                                [
                                    data.nom, 
                                    data.postnom,
                                    data.prenom,

                                    data.username,
                                    data.password,

                                    data.telephone,
                                    data.sexe,
                                    data.email,
                                    data.type,
                                    data.adresse,
                                    data.quartier,
                                    data.commune,
                                    data.ville,
                                    data.district,
                                    data.province,
                                    data.province_origine,
                                    data.date_naissance,
                                    data.lieu_naissance,
                                    data.profession,

                                    url_photo,
                                    data.bio,
                                    data.status,
                                    data.dateCreate

                                ])
                            rows = await db.pool.query(model.getMembreCode, [rows[0].insertId])
                
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

            const rows = await db.pool.query(model.getMembreData, [])

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

    getByCodeMembre: async (req, res)=>{

        try{

            const codeMembre = req.body.codeMembre

            const rows = await db.pool.query(model.getMembreCode, [codeMembre])
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

    getMembreByUsernameAndPwd: async (req, res)=>{

        try{

            const user = req.body.user
            const data = JSON.parse(user)

            const rowsCheck = await db.pool.query(model.checkMembreExist, [data.username, data.password])

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

            const codeMembre = req.body.codeMembre
        
            let rows = await db.pool.query(model.deleteMembre, [codeMembre])
            if (rows[0].affectedRows > 0){
            
                return res.json({status:200})
            }

            return res.json({status:500})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateMembre, 
                [
                    data.email, 
                    data.adresse, 
                    data.quartier, 
                    data.commune, 
                    data.ville, 
                    data.district, 
                    data.province, 
                    data.province_origine, 
                    data.profession,
                    data.bio, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:405})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePhotoMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            const image_path="public"+ "/uploads/images/membre/" +new Date().getTime()+"_"+data.username+ ".png";

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

                    let rows = await db.pool.query(model.updatePhotoMembre, 
                        [  
                            url_photo,

                            data.code
                        
                        ])

                    if (rows[0].affectedRows > 0){
                        rows = await db.pool.query(model.getMembreCode, [data.code])
        
                        if(rows[0].length === 0){
                            return res.json({status:400})
                        }
                        const response = {
                            status: 200,
                            data: rows[0]
                        }
                        return res.json(response)
                    }
        
                    return res.json({status:400})

                }

            }
            ); 
        

        } catch(error){
            return res.json(error)
        }

    },

    UpdateNomMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateNomMembre, 
                [
                    data.nom, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePostnomMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updatePostnomMembre, 
                [
                    data.postnom, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePrenomMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updatePrenomMembre, 
                [
                    data.prenom, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateUsernameMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateUsernameMembre, 
                [
                    data.username, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePwdMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updatePwdMembre, 
                [
                    data.password, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },


    UpdateSexeMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updatePhoneMembre, 
                [
                    data.telephone, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdatePhoneMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateSexeMembre, 
                [
                    data.sexe, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateEmailMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateEmailMembre, 
                [
                    data.email, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateTypeMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateTypeMembre, 
                [
                    data.type, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateAdresseMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateAdresseMembre, 
                [
                    data.adresse, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateQuartierMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateQuartierMembre, 
                [
                    data.quartier, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateCommuneMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateCommuneMembre, 
                [
                    data.commune, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateVilleMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateVilleMembre, 
                [
                    data.ville, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateDistrictMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateDistrictMembre, 
                [
                    data.district, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateProvinceMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateProvinceMembre, 
                [
                    data.province, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateProvinceOrigineMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateProvinceOrigineMembre, 
                [
                    data.province_origine, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateDateNaissanceMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateDateNaissanceMembre, 
                [
                    data.date_naissance, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateLieuNaissanceMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateLieuNaissanceMembre, 
                [
                    data.lieu_naissance, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateProfessionMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateProfessionMembre, 
                [
                    data.profession, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateBioMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateBioMembre, 
                [
                    data.bio, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    UpdateStatutMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.updateStatutMembre, 
                [
                    data.status, 

                    data.code
                
                ])
            if (rows[0].affectedRows > 0){
                rows = await db.pool.query(model.getMembreCode, [data.code])

                if(rows[0].length === 0){
                    return res.json({status:400})
                }
                const response = {
                    status: 200,
                    data: rows[0]
                }
                return res.json(response)
            }

            return res.json({status:400})
        

        } catch(error){
            return res.json(error)
        }
    },

    deleteCompteMembre: async (req, res)=>{

        try{

            const membre = req.body.membre
            const data = JSON.parse(membre)

            let rows = await db.pool.query(model.deleteCompteMembre, [data.code])
            if (rows[0].affectedRows > 0){
            
                return res.json({status:200})
            }

            return res.json({status:500})
        

        } catch(error){
            return res.json(error)
        }
    },

}