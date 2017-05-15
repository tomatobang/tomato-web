const execSync = require('child_process').execSync;
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');

//const REPO_NAME_RE = /Push {2}URL: https:\/\/github\.com\/.*\/(.*)\.git/;
const REPO_NAME_RE = /Push {2}URL: git@github\.com:pengkobe\/(.*)\.git/;

/**
 * 获取 webpack 配置文件
 * @param {*} options 
 */
function getWebpackConfigModule(options) {
   if (options.prod) {
    return require('../webpack.prod.js');
  } else {
    throw new Error('Invalid compile option.');
  }
}

/**
 * 
 * @param {*}  
 */
function getServerURL() {

}

/**
 * [ stripTrailing 字符串截取 ]
 * @param {*} str 字符串
 * @param {*} char 开始字符
 */
function stripTrailing(str, char) {

  if (str[0] === char) {
    str = str.substr(1);
  }

  if (str.substr(-1) === char) {
    str = str.substr(0, str.length - 1);
  }

  return str;
}

/**
 * Given a string remove trailing slashes and adds 1 slash at the end of the string.
 *
 * Example:
 * safeUrl('/value/')
 * // 'value/'
 *
 * @param url
 * @returns {string}
 */
function safeUrl(url) {
  const stripped = stripTrailing(url || '', '/');
  return stripped ? stripped + '/' : '';
}


function replaceHtmlWebpackPlugin(plugins) {
  for (var i=0; i<plugins.length; i++) {
    if (plugins[i] instanceof HtmlWebpackPlugin) {
      // remove the old instance of the html plugin
      const htmlPlug = plugins.splice(i, 1)[0];
      const METADATA = htmlPlug.options.metadata;

      // add the new instance of the html plugin.
      plugins.splice(i, 0, new HtmlWebpackPlugin({
        template: htmlPlug.options.template,
        title: htmlPlug.options.title,
        chunksSortMode: htmlPlug.options.chunksSortMode,
        metadata: METADATA,
        inject: htmlPlug.options.inject
      }));
      return;
    }
  }
}
exports.getWebpackConfigModule = getWebpackConfigModule;
exports.getServerURL = getServerURL;
exports.safeUrl = safeUrl;
exports.replaceHtmlWebpackPlugin = replaceHtmlWebpackPlugin;

