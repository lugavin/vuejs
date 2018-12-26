import Http from '@/components/util/Http';

const getUsers = ({ param, page = 1, rows = 10 }) =>
  Http.get('/api/cms/users', { params: Object.assign(param, { page, rows }) });

export default {
  getUsers
};
