/*I wrote a script to automate my job. Now I just sit back and watch Netflix while it runs.*/
const fs = require('fs-extra');
const path = require('path');
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}
const session = process.env.SESSION || 'KEITH;;;H4sIAAAAAAAAA5VU25KiSBD9l3rVGEFULhEdMQiIiBdQaNSNeSiguAgCUgUCE/77Bnb39DzszvbyVGRVZJ4852T+BFkeY6SjFgg/QVHGNSSoP5K2QEAA8yoIUAmGwIcEAgFUIi4y7EdX1e7qhj4yJ2eU01V3sLdzL1hfyKWjTH+wbGjuBTyGoKjcNPb+kHAhOjWk5iuGdejucjdkRz/fdpI+2HXL0/lUWbqyEV1k12PzBTz6jDAu4yxUighdUQlTHbUGjMuvwU80h26Xxlaxl+LFR683f9ucUWIHMx1ZEi3e7+v47npnTd18DX6WdJVsuiONzlwDu2JLbgRna93e5tpo5sr3XJxy8+Z8C9/h4zjMkK/5KCMxab/MuygvVQ7V5zYJMHNTZ+5I6xJeK5Kjv06j2Zms04MzbtrC+SLvyaiOtfko6sKFTVfcSnWNYG5sdVFL+S4kx6abWxbeziLZ+x24UX54Jfk/vE/kg7ezJtIrM2BFe3Dr5ns5Gfvh1FyqHH+6K6HRVlduxFHi1+Ara/na5J6kVUhWZ7WsDLj5ub6vts1lpZzdcVma6oCP2uUl/4QPSVX+CSV12XN8JfvSZLF3qQPJ6wTuN+KsYnQ1CS4oOt5MrDOwuR0ujpLo7itfiWvmpts7rE5j3RokoTO4UTH2zdExd71dkkfmy7OjBLWaDwT6MQQlCmNMSkjiPHvGxuwQQL8+IK9E5EkvaLb7LIUMEhfbfGDR3S4Vj8c7GhyxVK6rS22xRzsJK8ZOzRcwBEWZewhj5C9jTPKy3SCMYYgwEP76MQQZasibcH05hh6CIC4xsbOqSHPof6j6cQk9L68ycmgzT+oPqAQC9RlGhMRZiHseqwyWXhTXSIogwUAIYIrRrw5RiXwgkLJCv6ZWyv2e+LG0lzenFQ2G4PoUJPb76IThufGMZ9npWBh/x9/ufVZYFN8yRMAQpM9X3JSlZux4xs6oCccJ4+99eAgy2GcCPqzdnMCi6Dl/R9wX8BGBcYqBACTjNmNyU1J2tzbd3FVV1EJRCkXw2eGHVd6kWC9ZZrXzz4uAQr582hn3WE1dxNbR7hje7PaYYdNul2hmKS//kAQIQI+4Cz06l4c8rAK76HbYGfFVboWKpjrTTcnpaxFDDhZZc0C8USzHbj5qpCg1DbG1GoliryzLmYeBrV3sHNEL7vUqiS99NR/VsYd+L0bbhctTqHZm9yiJ7vXEDgkO6nbFSGVRdTGvHImd4JvBDKpLdjqneDGFHHS5KyosZfOKGsOuAo1fO7u1v1PDcbnZhe8mfg5R+r684qe9eu363yBGz13wrsN/afmGu3cc9Rj+luJ9ufzLgM4PzYBvrczZH/llZo7lC6dFhcNU7MRKJ3q6SaessthETJU04PH4MQRFCkmQl1cgAJj5Zf70SplXvYW1LMj/UEwSKW1uhlLfeAoxET/HwoqvCBN4LYBAsyzFMNSEY95eGWVeLCGOgACY0LBXSe/xViyKA4HkY8qA2H/SOgePvwGvHaVwgQcAAA==';
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
