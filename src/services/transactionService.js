import axios from "./http-config";

/**
 * Get all transactions
 *
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAll = () => {
  return axios.get("/transactions?pageNumber=1&pageSize=1000&sortDirection=ASC");
};

/**
 * Get a transaction by id
 *
 * @param transaction
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const create = (transaction) => {
  return axios.post("/transaction", transaction);
};

/**
 * Update a transaction
 *
 * @param id The transaction id
 * @param transaction
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const update = (id, transaction) => {
  return axios.put(`/transaction/${id}`, transaction);
};

/**
 * Remove a transaction
 *
 * @param id The transaction id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const remove = (id) => {
  return axios.delete(`/transaction/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
}