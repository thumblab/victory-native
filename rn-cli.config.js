/**
 * Override RN CLI configuration file
 */
"use strict";

const path = require("path");
const blacklist = require("react-native/packager/blacklist");
const rootCfg = require("react-native/packager/rn-cli.config");

// Mutate and override config methods.
//
// **WARNING**: Fairly brittle since requires internal knowledge of RN packager.
module.exports = Object.assign(rootCfg, {
  getBlacklistRE(platform) {
    // Starting blacklist.
    const baseRE = blacklist(platform);

    // Now we're going to manually blacklist the react-native modules we don't
    // want coming in, namely:
    //
    // ```
    // victory-core-native/node_modules/react-native
    // victory-chart-native/node_modules/react-native
    // ```
    //
    // to preserve the one we **do** want:
    //
    // ```
    // victory-native/node_modules/react-native
    // ```
    //
    // The current regex below just luckily _happens_ to work, but it's not a
    // general purpose solution.
    //
    // TODO: extend to general purpose solution for choosing only
    // `ROOT_PROJECT/node_modules/react-native` and nothing else.
    const customRE = /victory-.*-native[/\\]node_modules[/\\]react-native[/\\].*/;

    return new RegExp(baseRE.source + "|" + customRE.source);
  }
});
