require('dotenv').config();

const conf = {
  production: {
    url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-oba0u.gcp.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
  }
};

module.exports = conf[process.env.NODE_ENV] || conf.local;
