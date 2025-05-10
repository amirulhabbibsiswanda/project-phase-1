'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      })
      Product.belongsToMany(models.User, {
        foreignKey: "ProductId",
        through: models.UserProduct
      })
    }
    static convertUrl(value){
      value = value.split('/')
      if(value.length === 4){
        return `https://www.youtube.com/watch?v=${value[3]}`
      }
      else{
        return `https://www.youtube.com/watch?v=${value[4]}`
      }
    }
  }
  Product.init({
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Title jangan kosong'
        },
        notNull:{
          msg:'Title jangan kosong'
        }
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Description jangan kosong'
        },
        notNull:{
          msg:'Description jangan kosong'
        }
      }
    }, price:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Minimal price 10000!'
        },
        notNull:{
          msg:'Minimal price 10000!'
        },
        min:{
          args:10000,
          msg:'Minimal price 10000!'
        }
      }
    }, url:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Url jangan kosong'
        },
        notNull:{
          msg:'Url jangan kosong'
        }
      }
    }, CategoryId:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'Category Id jangan kosong'
        },
        notNull:{
          msg:'Category Id jangan kosong'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  // Product.beforeCreate((instance)=>{
  //   let url = instance.url.split('/')
  //   if(url.length === 4){

  //     instance.url = `https://www.youtube.com/watch?v=${url[3]}`
  //   }
  //   else{
  //     instance.url = `https://www.youtube.com/watch?v=${url[4]}`

  //   }
  // })
  return Product;
};