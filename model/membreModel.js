class membreModel {

    constructor (code, nom, postnom, prenom, username, password, telephone, sexe, email, type, adresse, quartier, commune, ville, district, province, province_origine, date_naissance, lieu_naissance, profession, photo, bio, status, dateCreate){

        this.code = code;
        this.nom = nom;
        this.postnom = postnom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;

        this.telephone = telephone;
        this.sexe = sexe;
        this.email = email;
        this.type = type
        this.adresse = adresse;
        this.quartier = quartier;
        this.commune = commune;
        this.ville = ville;
        this.district = district;
        this.province = province;
        this.province_origine = province_origine;
        this.date_naissance = date_naissance
        this.lieu_naissance = lieu_naissance
        this.profession = profession
        this.photo = photo;
        this.bio = bio;
        this.status = status;
        this.dateCreate = dateCreate

    }
}

//Nos requetes
const getMembreData = 'select * from adherent'
const insertMembre = 'INSERT INTO membre(nom, postnom, prenom, username, password, telephone, sexe, email, type, adresse, quartier, commune, ville, district, province, province_origine, date_naissance, lieu_naissance, profession, photo, bio, status, dateCreate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const getMembreCode = 'select * from membre where code = ?'
const checkMembreExist = 'select * from membre  where username = ? and password = ?'
const updatePhotoMembre = 'update membre set photo=? where code=?'
const deleteMembre = 'delete from membre where code=?'

const updateMembre = 'update membre set email=?, adresse=?, quartier=?, commune=?, ville=?, district=?, province=?, province_origine=?, profession=?, bio=? where code=?'

const updateNomMembre = 'update membre set nom=? where code=?'
const updatePostnomMembre = 'update membre set postnom=? where code=?'
const updatePrenomPrenom = 'update membre set prenom=? where code=?'
const updateUsernameMembre = 'update membre set username=? where code=?'
const updatePwdMembre = 'update membre set password=? where code=?'
const updatePhoneMembre = 'update membre set telephone=? where code=?'
const updateSexeMembre = 'update membre set sexe=? where code=?'
const updateEmailMembre = 'update membre set email=? where code=?'
const updateAdresseMembre = 'update membre set adresse=? where code=?'
const updateQuartierMembre = 'update membre set quartier=? where code=?'
const updateCommuneMembre = 'update membre set commune=? where code=?'
const updateVilleMembre = 'update membre set ville=? where code=?'
const updateDistrictMembre = 'update membre set district=? where code=?'
const updateProvinceMembre = 'update membre set province=? where code=?'
const updateProvinceOrigineMembre = 'update membre set province_origine=? where code=?'
const updateBioMembre = 'update membre set bio=? where code=?'
const updateTypeMembre = 'update membre set type=? where code=?'
const updateDateNaissanceMembre = 'update membre set date_naissance=? where code=?'
const updateLieuNaissanceMembre = 'update membre set lieu_naissance=? where code=?'
const updateProfessionMembre = 'update membre set profession=? where code=?'
const updateStatutMembre = 'update membre set status=? where code=?'

const deleteCompteMembre = 'delete from membre where code=?'


module.exports = {

    getMembreData, 
    insertMembre,
    getMembreCode,
    checkMembreExist,
    updatePhotoMembre,
    deleteMembre,

    updateMembre,
    updateNomMembre,
    updatePostnomMembre,
    updatePrenomPrenom,
    updateUsernameMembre,
    updatePwdMembre,
    updatePhoneMembre,
    updateSexeMembre,
    updateEmailMembre,
    updateTypeMembre,
    updateAdresseMembre,
    updateQuartierMembre,
    updateCommuneMembre,
    updateVilleMembre,
    updateDistrictMembre,
    updateProvinceMembre,
    updateProvinceOrigineMembre,
    updateDateNaissanceMembre,
    updateLieuNaissanceMembre,
    updateProfessionMembre,
    updateBioMembre,
    updateStatutMembre,

    deleteCompteMembre





}