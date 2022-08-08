module.exports = {
  entry: "./client/src/index.jsx",
  mode: "development",
  output: {
    path: __dirname + "/client/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {presets: ["@babel/preset-env", "@babel/preset-react"]}
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
