

const axios = require('axios')

export class ExternalApis {
  getIpDetails = async (ip: string) => {
    const result = await axios.get(`https://ipqualityscore.com/api/json/ip/dNyiZ0Btm24v9PmFR3cfmZJVZYOPVytH/${ip}`);
    return result.data;
  }
};
