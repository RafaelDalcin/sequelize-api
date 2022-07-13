import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

const BaseModel = sequelize.define(
    'nome_tabela',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
);

export default BaseModel;