import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import Autor from "./Autor";
import Categoria from "./Categoria";

const Livro = sequelize.define(
    'livros',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sinopse: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idCategoria: {
            type: DataTypes.INTEGER,
        },
        idAutor: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'created_at'
        
    }
);

Livro.belongsTo(Categoria, {
    as: 'categoria',
    foreignKey: {
        name: 'idCategoria',
        allowNull: false,
        field: 'id_categoria'
    }
  });
Livro.belongsTo(Autor, {
    as: 'autor',
    foreignKey: {
        name: 'idAutor',
        allowNull: false,
        field: 'id_autor'
    }
  });

export default Livro;