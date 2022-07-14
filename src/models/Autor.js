import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

const Autor = sequelize.define(
    'autores',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
);

export default Autor;