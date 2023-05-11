const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			'^/(api|uploads)': {
				target: process.env.API_RELATIVE_PATH || 'http://localhost:3000',
				changeOrigin: true
			},
		}
	}
});
