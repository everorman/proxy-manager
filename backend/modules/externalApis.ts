

const axios = require('axios')

export default class {
  getIpDetails = async ()=> {
  const result = await axios.get(`https://ipqualityscore.com/api/json/ip/dNyiZ0Btm24v9PmFR3cfmZJVZYOPVytH/38.25.16.6`);
  return result.data;
  }
};
