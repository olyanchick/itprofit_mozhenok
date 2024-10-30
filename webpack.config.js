const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                    MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
                    'css-loader',               // Преобразует CSS в CommonJS
                    {
                        loader: 'sass-loader',  // Компилирует SASS в CSS
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Имя файла, куда будут записаны стили
        }),
    ],
};
