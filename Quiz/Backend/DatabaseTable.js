const { DataTypes } = require('sequelize');
const sequelize = require('./database');  // Ensure this imports your configured Sequelize instance

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});
const Subject = sequelize.define('Subject', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'email'
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'subjects'
  });
  const Question = sequelize.define('Question', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'email'
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Subject,
        key: 'subject'
      }
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true  // assuming answers may be null initially
    }
  }, {
    tableName: 'questions'
  });
// Users have many Subjects
User.hasMany(Subject, { foreignKey: 'email' });
Subject.belongsTo(User, { foreignKey: 'email' });

// Subjects have many Questions
Subject.hasMany(Question, { foreignKey: 'subject' });
Question.belongsTo(Subject, { foreignKey: 'subject' });

// Users have many Questions through Subjects
User.hasMany(Question, { foreignKey: 'email' });
Question.belongsTo(User, { foreignKey: 'email' });


sequelize.sync({ force: true })  // Warning: `force: true` will drop existing tables!
  .then(() => {
    console.log('Database & tables created!');
  });
    

// Export all models
module.exports = {
    sequelize, // Optionally export the sequelize instance
    User,
    Subject,
    Question
  };