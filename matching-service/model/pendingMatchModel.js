import { DataTypes } from 'sequelize';
import db from './repository.js';

const PendingMatch = db.define('pendingMatches', {
    // define match model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'pendingMatches',
});

export default PendingMatch;
