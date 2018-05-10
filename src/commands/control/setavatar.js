const { getGuildString } = require('../../localeEngine.js');
const logger = require('../../logger.js');
module.exports = {
  variants: ['setavatar', 'setav'],
  usage: 'setavatar http://link.to/avatar.png',
  permissions: ['OWNER'],
  async action(message, args) {
    const l = getGuildString(message.guild);
    let url;
    if (args !== undefined) {
      url = args;
    } else if (message.attachments.size > 0) {
      url = message.attachments.first().url;
    } else {
      message.channel.send(l('setavatar_no_picture'));
      return false;
    }
    const clientUser = message.client.user;
    clientUser.setAvatar(url)
    .then(user => {
      message.channel.send(l('setavatar_done'));
      logger.log('New avatar has been set')
    })
    .catch(logger.warn);
  }
}
