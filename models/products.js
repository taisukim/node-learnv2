module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products',
        {
            id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true}
            , name : {type : DataTypes.String}
            , price : {type : DataTypes.INTEGER}
            , description : {type : DataTypes.TEXT}
        });
    return Products;
}