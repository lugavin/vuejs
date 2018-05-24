import Http from '@/components/util/http';

const getUser = (id, callback) =>
  Http.get(`/rest/cms/users/${id}`).then((resp) => {
    callback(resp.body);
  }).catch(error => console.error(error));

const getUsers = ({ param = {}, page = 1, rows = 10 }, callback) =>
  Http.get('/rest/cms/users', {
    params: { param, page, rows }
  }).then((resp) => {
    callback(resp.body);
  }).catch(error => console.error(error));

export default {
  getUser,
  getUsers
};
