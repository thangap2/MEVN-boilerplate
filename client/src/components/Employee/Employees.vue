<template>
  <div>
    <h1>Employees</h1>
    <div v-if="employees.length > 0">
      <div>
        <router-link v-bind:to="{ name: 'addEmployee' }">Add employee</router-link>
      </div>
      <table class="table table-bordered">
        <tr>
          <td>First Name</td>
          <td>Last Name</td>
          <td align="center">Action</td>
        </tr>
        <tr v-for="employee in employees">
          <td>{{ employee.first_name }}</td>
          <td>{{ employee.last_name }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'editEmployee', params: { id: employee._id } }">Edit</router-link> |
            <a href="#" @click="deleteEmployee(employee._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'addEmployee' }" class="add_post_link">Add employee</router-link>
    </div>
  </div>
</template>

<script>
import EmployeeService from '@/services/EmployeesService'
export default {
  name: 'employees',
  data () {
    return {
      employees: []
    }
  },
  mounted () {
    this.getEmployees()
  },
  methods: {
    async getEmployees () {
      const response = await EmployeeService.fetch()
      this.employees = response.data
    },
    async deleteEmployee (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        EmployeeService.delete(id)
        $this.$router.go({
          path: '/'
        })
      })
    }
  }
}
</script>
<style type="text/css">
</style>
