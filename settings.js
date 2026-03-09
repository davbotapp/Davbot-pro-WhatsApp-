/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/
const fs = require('fs-extra');
const path = require('path');
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}
const session = process.env.SESSION || 'KEITH;;;H4sIAAAAAAAAA5VUXZOiOBT9L3nVmgZUQKu6ahAQQW3ED1rdmocAAaIQMAkoTvnft7C7p+dhd7aXp3CTuvfcc869PwEpMEMz1IDRT1BSXEOO2iNvSgRGYFzFMaKgCyLIIRiBytSDvHR6Nu1wM6NEZsmkSpKLPnmdCNaLt0k6qXv2Ezz1nsG9C8oqyHD4h4T+pZf5uUT6sPbnhVfvnxqxV/TGGF2I0dNdSfP2e6anwlZ7Bvc2I8QUk8QsU5QjCrMZapYQ06/Blyx99rqzyeur4k5pnOWmI6j7SigF2DtVwlZVUmgGztEi7Gvwb0aiHU91mmEBMfsgGtvF7bBejFlVX7RDKlmVtpk9lbqVm2/wGU4IiuwIEY5582Xe+3ZzhquXqSw+LU/7+SIyzPRgvCQwPQ77gbuZ7JbYVueDYLv/GnBjk6v2sroO3COfa1V0rlQ4s7fCS25Vcbm67o/C1R3KzVoPfwe+pB9eOf0f3u2Zv7odXwdsdglWRCG7cGyfesr0RpiTULQTMk4HFbs6fvE1+FaixadogppMOej7sNQO0ja2cN4x4SIS4ORS22LqrTLDFD7hQ17RP6HcQC/W8oAYs1mRCbm97EBv6YWhb4wvSxRtslVyixSaa5ldy/1Fti79aOEPdybu8M0mX143jlhPHEguHcPfk2qSidH48vzo6IQaOwIj8d4FFCWYcQo5LkgbU/tdAKN6jUKK+INd0AzmKs78NOuHwc51yT6p7cp5mSOiqi7jcZlJlqdFpzFRn0EXlLQIEWMommLGC9osEGMwQQyM/vrRBQRd+ZtubbWe2AUxpoxvSVVmBYw+RP24hGFYVISvGxLq7QFRMBI+w4hzTBLW0lgRSMMU10hPIWdgFMOMoV8NIooiMOK0Qr+GVi+ilvetvFZtxVRBF+QPPXDUzma/N1QleagoA2kkfmffLm1WWJbfCOKgC7LHK3WgCLIiyYos9FV1JH5vw11AYJsJRLAOCg7LsqX8HXFbIEIc4oyBEdCXa9ph5sR0qqBSBcvSzETTEw18dvjhlDcpFpngRsPOWPTyXRJLm91FCY8qUdhYpsL6UF/8XL1d5NtEPD3/Q5J2RzwFayO9EtFxsYT8MCaK7LwuxprpmXPaqExWpZXu6Wh5O/H+ZaEKjj6bm2sr3BS7k4MMSzoOZLJzSFk5/QBHaXg1kue2WoRqHKLfi/nTgRj7CMsv8vU8ZZOn04xNgxseN2YN+5oEy811asXBuV6nXEgSY8rioey7kutWPpwW2WTgj8899zzJ+GFQemE62Brem4cfM5S97y78sFerXfsbY/RYBe86/JeWb7hbxwn37m8p3nfLv8zneONEBonjJNo6WX86PImq27OfnI6iofPQzAN1cqgXqsuu0QHc7z+6oMwgjwuagxGAJKLFwyu0qFoL2yQu/lBM1wR77CV623gGGdc+x2KDc8Q4zEswEhWlJ8i9wVB4e7WkRTmFLAUj0EuWW+fUerzRynLNIf+YMqC1n7O1wP1vX5qAj4AHAAA=';
const dev = process.env.OWNER_NUMBER || '243800182016';
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
