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
            directory: path.join(__dirname, 'dist'), // Обслуживаем статические файлы из 'dist'
        },
        port: 9000, // Порт сервера (по умолчанию 8080, можно изменить)
        open: true, // Открыть браузер при запуске сервера
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
};
