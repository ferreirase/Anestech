import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        status: Sequelize.STRING,
        date_begin: Sequelize.DATE,
        date_finish: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'responsible_id',
      as: 'responsible',
    });
  }
}

export default Task;
