import { Buffer } from 'buffer'
import request from 'superagent'

// Configuration Constants
const DEBUG = typeof process === 'object' && process.env && process.env['NODE_ENV'] === 'development'

// Mixpanel Service Constants
const MIXPANEL_REQUEST_PROTOCOL = 'https'
const MIXPANEL_HOST = 'api.mixpanel.com'

const sendMixpanelRequest = ({ endpoint, data }) => {
  const requestDataString = JSON.stringify(data)
  const requestDataBase64String = new Buffer(requestDataString).toString('base64')

  const requestUrl = `${MIXPANEL_REQUEST_PROTOCOL}://${MIXPANEL_HOST}${endpoint}?ip=1`
  const req = request
    .get(requestUrl)
    .query(`data=${requestDataBase64String}`)
    .end((error, res) => {
      if (!DEBUG) {
        return
      }

      if (error) {
        console.log('mixpanel error:', error)
      }
    })

  return req
}

export default sendMixpanelRequest
