const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9001,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.sass$/, // Правило для файлов .sass
                use: [
                    'style-loader',  // Встраивает CSS в DOM
                    'css-loader',    // Преобразует CSS в CommonJS
                    {
                        loader: 'sass-loader', // Компилирует SASS в CSS
                        options: {
                            sassOptions: {
                                indentedSyntax: true, // Включает поддержку синтаксиса .sass
                            },
                        },
                    }
                ]
            }
        ]
    },
};
