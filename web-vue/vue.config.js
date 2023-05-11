const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,
	pwa: {
		name: "PEERHOF Fotoalbum ⛰️"
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
