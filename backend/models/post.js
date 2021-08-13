module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.TEXT
    },
    description: {
      type: Sequelize.TEXT
    },
    attachment: {
      type: Sequelize.STRING
    },
    report: {
      type: Sequelize.BOOLEAN
    }
  });

  return Post;
};