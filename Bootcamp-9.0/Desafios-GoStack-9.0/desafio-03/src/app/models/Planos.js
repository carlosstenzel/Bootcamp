import Sequelize, { Model } from "sequelize";

class Planos extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this;
  }
}
export default Planos;
