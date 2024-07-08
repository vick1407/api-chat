


exports.get = async function(){
    const salaModel = required('../models/salaModel');
    return salaModel.listarSalas();
}