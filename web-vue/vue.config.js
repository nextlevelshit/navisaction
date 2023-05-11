const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,
	pwa: {
		name: "PEERHOF Fotoalbum ⛰️"
	},
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].title = "PEERHOF Fotoalbum ⛰️";
			return args;
		});
	},
	devServer: {
		proxy: {
			"^/(api|uploads)": {
				target: process.env.API_RELATIVE_PATH || "http://localhost:3000",
				changeOrigin: true
			}
		}
	}
});
