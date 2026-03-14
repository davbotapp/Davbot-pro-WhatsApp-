/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/
const fs = require('fs-extra');
const path = require('path');
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}
const session = process.env.SESSION || 'KEITH;;;H4sIAAAAAAAAA5VUW46jRhTdSlS/tsaAeRiklgawjTG2Bxsb3I7moxoKXObposCPUX9E2UKknh9vIdlAsicvIcLdPdMfyaSDhFRcSueee8+59wvIclwiC52A8gUUBNeQouZITwUCCtCqMEQEtEEAKQQKYOwpfy4STGprWJjLEbtXaZTgCWem+XHQt4aLzDnTntXqzu/AYxsU1UOC/R8AdrYZYyNNdivY3WND8PZJfu8Vrk+Y/bAfTbx9XovmXDh0e3fgsUGEmOAsGhRblCICEwudbIjJe+lb584WzZf+2InloBWPq9yt1FZslT2P6pt6vkde9DDucOr76B/95Ci37idTwqvxtJPp451MpYMQyc79xtnpg8zqb/KRXBvzZ/oljjIUmAHKKKand/ddnWrsiMMtYz8rameuDhfirCz4ZTCc8bAIhUkqDFbLhOsaq/cRn4l6bHK0CJbjdTUPGF5K+fQwl9OFYKcny1ha1el8yPiZHr8lbpNXr8T/p+97qy7IQEOO6vWXtYih47LIdeNorbs+xveho7kLuSd4sfk++mWY7oarKoA7YQpdDmrTczhH5+1YJ3Eue4vZJC0/sarhvO07pBX5EUuja0fTUNf5eEOyRVJvJms8/mRo9cqbscLhtIAVQcLK1WgwTdnhwdHGjqELpjbyg0I49UXYaU0mAh/60+5xmjK9eW7r87tbRTE6mQFQ2Mc2ICjCJSWQ4jxrYhzXawMY1A7yCaK39oLRQYM7QSu1KOHt9a4jLMrhdJWuj63czq2zTLRAmGeDvgYHd6ANCpL7qCxRMMIlzclpisoSRqgEys+f2yBDR/osXJNOZNsgxKSkq6wqkhwGr6q+/oS+n1cZdU6ZrzcHRIDCfA8jSnEWlU0fqwwSf4trpG8hLYESwqRE3ypEBAVAoaRC36ZWz4Om8U7fME3eGYE2SG+C4AAogOO7co8TZUkSOIX7WH44NKiwKD5kiII2SG63eoLEiBInSiLD93oK97EJt0EGGyRwvTw9XS9Pv18vX3+9Xp7+uF6e/rxevv7y0/Xy9Nv18vRX8zZ6vFTTJA8QhTgpgQJ0i1i7B2Y4sM866zOGoQ4iVY9U8L36Vxs9yxQwuF6s9/NMdLd7n52lyEWY39tDH/oit9F2D3anljvhhDXv/gEEKMAyx4kxnRBfakUaMwgLd8gRMtaTShypXDf2hIJkJo/58f0OI5ZJ/Mj2uq3pQ2Hp7HSsehtnG1pJuWUyJGu57tFz3G881wYBqrGP3iZ7CAXHNpJctipf2tWl5jF9Pj1tUCwVtSRSxpGE1mi88EbUt71yFrm2aKI1S3CX6onLd2Ky2DmCrXYd4+yOVnVHNfovBr8NWPKy2PDNeo2uzWeI0W1PvGj0Xzo/827cyDy230C8LJ5/GV5tHZiEccV43EruYTZbbrJknVfW7rg2sk80nd9z547UCbsn2QGPj5/boEggDXOSAgXALCD5zUckrxp7m1mY/yCZrjKmNo/0pvAEllT9PjJLnKKSwrQACitJXV7mRZF7vmWTvBjBcgsU0I3s1Thu/H9Si8KhkL5OIFCbp59p4PFv0f1fHp0HAAA=';
const dev = process.env.OWNER_NUMBER || '243803511496';
const { Sequelize } = require('sequelize'); 
const DATABASE_URL = process.env.DATABASE_URL || './database.db'; 
const database =
  DATABASE_URL === './database.db'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
      })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
      });

module.exports = {  
  database,  
  dev,
  session,
};

//must run
