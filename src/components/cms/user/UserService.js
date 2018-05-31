import Http from '@/components/util/Http';

const getUsers = ({ param = {}, page = 1, rows = 10 }) =>
  Http.get('/rest/cms/users', { params: { param, page, rows } });

export default {
  getUsers
};
