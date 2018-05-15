<template>
    <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="#">Components</a></li>
                <li class="is-active"><a href="#" aria-current="page">User</a></li>
            </ul>
        </nav>
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>id</th>
                        <th>name</th>
                        <th>pass</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in users" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.pass}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <nav class="pagination is-small" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                    <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                    <li>
                        <a class="pagination-link is-current"
                           aria-label="Page 46"
                           aria-current="page">
                            46
                        </a>
                    </li>
                    <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    users: [
      { id: 1001, name: 'Alan', pass: '******' },
      { id: 1002, name: 'Ann', pass: '******' }
    ]
  })
};
</script>

<style scoped>

</style>
