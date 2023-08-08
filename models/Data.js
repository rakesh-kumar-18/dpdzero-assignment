const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Data = sequelize.define('Data', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Data;