const axios = require('axios')

const getProducts = async (req, res) => {
  try {
    const baseUrl = process.env.WC_BASE_URL || req.query.baseUrl
    const key = process.env.WC_KEY || req.query.key
    const secret = process.env.WC_SECRET || req.query.secret
    const params = req.query || {}
    // remove our custom query keys
    delete params.baseUrl; delete params.key; delete params.secret

    if (!baseUrl) return res.status(400).json({ message: 'baseUrl required' })
    if (!key || !secret) return res.status(400).json({ message: 'key/secret required' })

    const url = String(baseUrl).replace(/\/$/, '') + '/wp-json/wc/v3/products'
    const resp = await axios.get(url, {
      auth: { username: key, password: secret },
      params,
      timeout: 15000
    })
    res.json(resp.data)
  } catch (e) {
    console.error(e.message || e)
    res.status(500).json({ message: 'Error fetching from WooCommerce' })
  }
}

module.exports = { getProducts }
