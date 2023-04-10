module.exports = {
  reactStrictMode: true,
  env: {
    BASEURL: process.env.BASEURL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
}
