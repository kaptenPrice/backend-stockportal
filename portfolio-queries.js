const pool = require('./connection-pool');

const getPortfolio = (request, response) => {
  pool.query('SELECT * FROM public.portfolio JOIN public.companies ON portfolio.companyid=companies.companyid JOIN categories ON companies.catid=categories.catid', (error, results) => {
    if (error) {
      throw error; 
    } 
    response.status(200).json(results.rows); 
  });
};

module.exports = {
    getPortfolio,
  };