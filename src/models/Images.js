
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('images',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING(255),
      unique: true
    },
    mimetype: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return Images
}