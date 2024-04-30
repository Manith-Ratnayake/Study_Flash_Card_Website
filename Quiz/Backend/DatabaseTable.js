const { Sequelize, DataTypes } = require('sequelize');

// Assuming `sequelize` is your configured Sequelize instance
const sequelize = require('./database');

// Define the User_Detail model
const User_Detail = sequelize.define('User_Detail', {
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        validate: {
            isEmail: true
        }
    },
    Password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'User_Detail'
});

// Define the User_Subject model
const User_Subject = sequelize.define('User_Subject', {
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'User_Detail', // This is the table name of the model
            key: 'Email'
        }
    },
    Subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'User_Subject'
});

// Define the User_Subject_Question model
const User_Subject_Question = sequelize.define('User_Subject_Question', {
    Email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'User_Subject',
            key: 'Email'
        }
    },
    Subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'User_Subject',
            key: 'Subject'
        }
    },
    Question_No: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Question: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    Answer: {
        type: DataTypes.STRING(1000)
    }
}, {
    tableName: 'User_Subject_Question'
});

// Define relationships
User_Detail.hasMany(User_Subject, { foreignKey: 'Email', onDelete: 'CASCADE' });
User_Subject.belongsTo(User_Detail, { foreignKey: 'Email' });

User_Subject.hasMany(User_Subject_Question, { foreignKey: ['Email', 'Subject'], onDelete: 'CASCADE' });
User_Subject_Question.belongsTo(User_Subject, { foreignKey: ['Email', 'Subject'] });

// Synchronize all defined models to the DB
sequelize.sync({ force: true })  // Warning: `force: true` will drop existing tables!
    .then(() => {
        console.log('Database & tables created!');
    });

// Export models
module.exports = {
  User_Subject,
  User_Subject_Question,
  User_Detail
};
