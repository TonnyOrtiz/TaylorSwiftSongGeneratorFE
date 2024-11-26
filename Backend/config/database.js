import{ Sequelize } from 'sequelize';
import configjson from '../config/config.json' assert { type: "json" };

const env = process.env.NODE_ENV || 'development';
const config = configjson[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Exportar la instancia para usarla en otros archivos
export default sequelize;
