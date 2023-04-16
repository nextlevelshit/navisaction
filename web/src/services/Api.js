import axios, {AxiosError} from "axios";
import debug from "debug";

const logger = debug("web:v:api");

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
			baseURL: process.env.API_URL ?? "http://localhost:3000"
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

	async upload() {
		await this.bootstrap();
		return await this.axiosInstance
			.get(`/carts?filters[fingerprint][$eq]=${store.fingerprint}&populate=*`, {
				data: {
					fingerprint: store.fingerprint
				}
			})
			.then(parseResponseOrError)
			.catch(parseResponseOrError);
	}
}

const apiInstance = new Api();
export default apiInstance;
