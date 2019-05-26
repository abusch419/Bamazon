module.exports = function (sequelize, DataTypes) {
    // build models

    const Product = sequelize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        
    },
        {
            freezeTableName: true,
            timestamps: false,
        })
    return Product
}