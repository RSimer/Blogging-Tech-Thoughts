const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Comment extends Model{}

Comment.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    commentText:{
        type: DataTypes.STRING,

    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        },
    },
    post_id:{
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        },
    },
},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
    }
);

// 'id','commentText','createdAt'

module.exports = Comment;