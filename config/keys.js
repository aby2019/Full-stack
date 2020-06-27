//figure out what credentials to return

if(process.env.Node_ENV==='production'){
  module.exports = require('./prod');
}
else {
  //development environment
  module.exports = require('./dev');

}
