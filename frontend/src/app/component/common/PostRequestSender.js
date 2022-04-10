const querystring = require('querystring');

const PostRequestSender = async (url, body, callback) => {
  let res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: querystring.stringify(body)
  });

  let data
  try {
      data = await res.json();
  } catch (error) {
    callback(error)
    return;
  }

  callback(null, data)
}

export default PostRequestSender