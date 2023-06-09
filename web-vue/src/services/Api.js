import axios, { AxiosError } from "axios";
import debug from "debug";

const logger = debug("web:v:api");
const baseURL = process.env.API_RELATIVE_PATH || "/api";

logger("NODE_ENV", process.env.NODE_ENV);
logger("API_RELATIVE_PATH", process.env.API_RELATIVE_PATH);
logger("baseUrl", baseURL);

function parseResponseOrError(res) {
	if (res instanceof AxiosError) {
		logger(res.message);
		throw res;
	} else if (res.status >= 400) {
		logger(res);
		throw res;
	} else {
		return res.data;
	}
}

class Api {
	async bootstrap() {
		this.axiosInstance = new axios.create({
			baseURL
		})
	}

	async withDebounce(ms = 420) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		})
	}

	async allImages(page = 1) {
		const limit = process.env.IMAGES_PER_PAGE || 1000;
		logger(`Fetching images - page: ${page} - limit: ${limit}`);
		await this.bootstrap();
		await this.withDebounce();
		return await this.axiosInstance
			.get("/images", {
				params: {
					page,
					limit
				}
			})
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}

	async image(filename) {
		await this.bootstrap();
		return await this.axiosInstance
			.get(`/images/${filename}`)
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}

	async upload(formData, config = {}) {
		await this.bootstrap();
		return await this.axiosInstance
			.post("/upload", formData, {
				...config,
				headers: {
					"Content-Type": "multipart/form-data",
				}
			})
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}
}

const apiInstance = new Api();
export default apiInstance;
