import axios, {AxiosError} from "axios";
import debug from "debug";

const logger = debug("web:v:api");
const baseURL = import.meta.env.VITE_API_URL ?? document.location.host + "/api";

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
	constructor() {
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
		return await this.axiosInstance
			.get("/images")
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}

	async image(filename) {
		return await this.axiosInstance
			.get(`/images/${filename}`)
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}

	async upload(formData, config = {}) {
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
