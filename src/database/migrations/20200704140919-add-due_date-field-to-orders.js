module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'due_date', {
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'due_date');
  },
};
