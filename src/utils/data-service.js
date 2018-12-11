import axios from './axios';

const url = 'to-do-list.json';

export default class ToDoService {
	static fetch() {
		return axios.get(url)
			.then(({ data }) => data);
	}

	static add(data) {
		return axios.post(url, data);
	}

	static edit(id, data) {
		return axios.put(`to-do-list/${id}.json`, data);
	}

	static delete(id) {
		return axios.delete(`to-do-list/${id}.json`);
	}
};