module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: Sequelize.TEXT
    },
  });

  return Comment;
};