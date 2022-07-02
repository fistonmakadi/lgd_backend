const router = require('express').Router()

const service = require('../service/membreService')

router.get('/getAll', service.getAll)
router.post('/getMembreByCode', service.getByCodeMembre )
router.post('/add', service.Add )
router.post('/connexion', service.getMembreByUsernameAndPwd )
router.post('/delete', service.Delete )

//Les updates
router.post('/updateMembre', service.UpdateMembre )
router.post('/updatePhotoMembre', service.UpdatePhotoMembre )
router.post('/updateNomMembre', service.UpdateNomMembre )

router.post('/updatePostnomMembre', service.UpdatePostnomMembre )
router.post('/updatePrenomMembre', service.UpdatePrenomMembre )
router.post('/updateUsernameMembre', service.UpdateUsernameMembre )
router.post('/updatePwdMembre', service.UpdatePwdMembre )
router.post('/updatePhoneMembre', service.UpdatePhoneMembre )
router.post('/updateSexeMembre', service.UpdateSexeMembre )
router.post('/updateEmailMembre', service.UpdateEmailMembre )
router.post('/updateAdresseMembre', service.UpdateAdresseMembre)
router.post('/updateQuartierMembre', service.UpdateQuartierMembre )
router.post('/updateCommuneMembre', service.UpdateCommuneMembre )
router.post('/updateVilleMembre', service.UpdateVilleMembre )
router.post('/updateDistrictMembre', service.UpdateDistrictMembre )
router.post('/updateProvinceMembre', service.UpdateProvinceMembre)
router.post('/updateProvinceOrigineMembre', service.UpdateProvinceOrigineMembre )
router.post('/updateBioMembre', service.UpdateBioMembre )
router.post('/updateDateNaissanceMembre', service.UpdateDateNaissanceMembre )
router.post('/updateLieuNaissanceMembre', service.UpdateLieuNaissanceMembre )
router.post('/updateProfessionMembre', service.UpdateProfessionMembre )
router.post('/updateStatutMembre', service.UpdateStatutMembre )
router.post('/updateTypeMembre', service.UpdateTypeMembre)

router.post('/deleteCompteMembre', service.deleteCompteMembre)


//Toujours exporter l'objet router
module.exports = router;

