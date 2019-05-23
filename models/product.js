module.exports = function(sequelize, DataTypes) {
    // build models

    const Product = sequelize.define("Product", {
        name: DataTypes.STRING,
        department: DataTypes.STRING,
        name: DataTypes.INTEGER,
        department: DataTypes.INTEGER,
        
    })
}