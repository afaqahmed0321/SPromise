module.exports = {
    // other configs
    dependencies: {
      ...(process.env.NO_FLIPPER
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
    }
  };
  