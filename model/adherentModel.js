class adherentModel {

    constructor (code, nom, postnom, prenom, username, password, telephone, sexe, email, adresse, quartier, commune, ville, district, province, province_origine, photo, bio, status, dateCreate){

        this.code = code;
        this.nom = nom;
        this.postnom = postnom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;

        this.telephone = telephone;
        this.sexe = sexe;
        this.email = email;
        this.adresse = adresse;
        this.quartier = quartier;
        this.commune = commune;
        this.ville = ville;
        this.district = district;
        this.province = province;
        this.province_origine = province_origine;
        this.photo = photo;
        this.bio = bio;
        this.status = status;
        this.dateCreate = dateCreate

    }
}

//Nos requetes
const getAdherentData = 'select * from adherent'
const insertAdherent = 'INSERT INTO adherent(nom, postnom, prenom, username, password, telephone, sexe, email, adresse, quartier, commune, ville, district, province, province_origine, photo, bio, status, dateCreate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
const getAdherentCode = 'select * from adherent where code = ?'
const checkAdherentExist = 'select * from adherent  where username = ? and password = ?'
const updatePhotoAdherent = 'update adherent set photo=? where code=?'
const deleteAdherent = 'delete from adherent where code=?'

const updateAdherent = 'update adherent set email=?, adresse=?, quartier=?, commune=?, ville=?, district=?, province=?, province_origine=?, bio=? where code=?'
const updateNomAdherent = 'update adherent set nom=? where code=?'
const updatePostnomAdherent = 'update adherent set postnom=? where code=?'
const updatePrenomAdherent = 'update adherent set prenom=? where code=?'
const updateUsernameAdherent = 'update adherent set username=? where code=?'
const updatePwdAdherent = 'update adherent set password=? where code=?'
const updatePhoneAdherent = 'update adherent set telephone=? where code=?'
const updateSexeAdherent = 'update adherent set sexe=? where code=?'
const updateEmailAdherent = 'update adherent set email=? where code=?'
const updateAdresseAdherent = 'update adherent set adresse=? where code=?'
const updateQuartierAdherent = 'update adherent set quartier=? where code=?'
const updateCommuneAdherent = 'update adherent set commune=? where code=?'
const updateVilleAdherent = 'update adherent set ville=? where code=?'
const updateDistrictAdherent = 'update adherent set district=? where code=?'
const updateProvinceAdherent = 'update adherent set province=? where code=?'
const updateProvinceOrigineAdherent = 'update adherent set province_origine=? where code=?'
const updateBioAdherent = 'update adherent set bio=? where code=?'


module.exports = {

    getAdherentData, 
    insertAdherent,
    getAdherentCode,
    checkAdherentExist,
    updatePhotoAdherent,
    deleteAdherent,
    updateAdherent,
    updateNomAdherent,
    updatePostnomAdherent,
    updatePrenomAdherent,
    updateUsernameAdherent,
    updatePwdAdherent,
    updatePhoneAdherent,
    updateSexeAdherent,
    updateEmailAdherent,
    updateAdresseAdherent,
    updateQuartierAdherent,
    updateCommuneAdherent,
    updateVilleAdherent,
    updateDistrictAdherent,
    updateProvinceAdherent,
    updateProvinceOrigineAdherent,
    updateBioAdherent






}