import axios, {AxiosError} from "axios";
import debug from "debug";

const logger = debug("web:v:api");
const baseURL = process.env.VUE_APP_API_URL || "/api";

logger(process.env.VUE_APP_API_URL);
logger("API_URL", process.env.API_URL);
logger("NODE_ENV", process.env.NODE_ENV);
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

	async allImages() {
		await this.bootstrap();
		return await this.axiosInstance
			.get("/images")
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
