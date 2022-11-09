import { DataTypes } from 'sequelize';
import db from './repository.js';

const PendingMatch = db.define('pendingMatches', {
    // define match model attributes
    socketid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
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
