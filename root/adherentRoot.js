const router = require('express').Router()

const service = require('../service/adherentService')

router.get('/getAll', service.getAll)
router.post('/getAdherentByCode', service.getByCodeAdherent )
router.post('/add', service.Add )
router.post('/connexion', service.getAdherentByUsernameAndPwd )
router.post('/delete', service.Delete )

//Les updates
router.post('/updateAdherent', service.UpdateAdherent )
router.post('/updatePhotoAdherent', service.UpdatePhotoAdherent )
router.post('/updateNomAdherent', service.UpdateNomAdherent )
router.post('/updatePostnomAdherent', service.UpdatePostnomAdherent )
router.post('/updatePrenomAdherent', service.UpdatePrenomAdherent )
router.post('/updateUsernameAdherent', service.UpdateUsernameAdherent )
router.post('/updatePwdAdherent', service.UpdatePwdAdherent )
router.post('/updatePhoneAdherent', service.UpdatePhoneAdherent )
router.post('/updateSexeAdherent', service.UpdateSexeAdherent )
router.post('/updateEmailAdherent', service.UpdateEmailAdherent )
router.post('/updateAdresseAdherent', service.UpdateAdresseAdherent )
router.post('/updateQuartierAdherent', service.UpdateQuartierAdherent )
router.post('/updateCommuneAdherent', service.UpdateCommuneAdherent )
router.post('/updateVilleAdherent', service.UpdateVilleAdherent )
router.post('/updateDistrictAdherent', service.UpdateDistrictAdherent )
router.post('/updateProvinceAdherent', service.UpdateProvinceAdherent )
router.post('/updateProvinceOrigineAdherent', service.UpdateProvinceOrigineAdherent )
router.post('/updateBioAdherent', service.UpdateBioAdherent )


//Toujours exporter l'objet router
module.exports = router;

