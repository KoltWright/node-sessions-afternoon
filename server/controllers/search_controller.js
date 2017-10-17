const swag = require('../models/swag.js');

module.exports = {
  search: (req, res, next) => {
    const {category} = req.query;
    let index = swag.map(item => item.category).indexOf(category);
    
    if (index === -1) {
      res.status(200).send(swag);
    } else {
      let filteredSwag = swag.filter(item => {
        return item.category === category;
      });
      res.status(200).send(filteredSwag);
    }
  }
}
