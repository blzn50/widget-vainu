const widgetRouter = require('express').Router();
const axios = require('axios');
const { VAINU_ROOT_API_URL } = require('../constants');

widgetRouter.get('/:businessId', async (req, res) => {
  const businessId = req.params.businessId;
  const { VAINU_KEY } = res.locals;

  if (!VAINU_KEY) {
    return res.status(403).send();
  }

  try {
    const vainuData = await axios.get(`${VAINU_ROOT_API_URL}/?key=${VAINU_KEY}&id=${businessId}`);
    return res.status(200).send(vainuData.data);
  } catch (error) {
    return res.status(500).send();
  }
});

module.exports = widgetRouter;
