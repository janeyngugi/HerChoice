const { Sequelize } = require('sequelize');

module.exports = async (req, res) => {
    try {
        if (!process.env.POSTGRES_URL) {
            return res.status(500).json({ error: 'POSTGRES_URL is not defined' });
        }

        const sequelize = new Sequelize(process.env.POSTGRES_URL + '?sslmode=require', {
            dialect: 'postgres',
            dialectModule: require('pg'),
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        });

        await sequelize.authenticate();
        res.json({ status: 'Connected successfully to Postgres.' });
    } catch (error) {
        res.status(500).json({
            error: 'Connection failed',
            message: error.message,
            name: error.name,
            stack: error.stack
        });
    }
};
