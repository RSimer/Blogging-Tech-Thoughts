const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model{}


Post.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    postURL:{
        type: DataTypes.STRING,
        
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Post;

// 'id','title','postURL','createdAt'