<template>
  <div class="posts">
    <h1>Add Employees</h1>
    <div class="form">
      <div>
        <input type="text" name="title" placeholder="TITLE" v-model="employee.first_name">
      </div>
	  <div>
        <input type="text" name="last name" placeholder="TITLE" v-model="employee.last_name">
      </div>
	  <div>
        <input type="text" name="age" placeholder="TITLE" v-model="employee.age">
      </div>
	  <div>
        <input type="text" name="address" placeholder="TITLE" v-model="employee.address">
      </div>
	  <div>
        <input type="text" name="city" placeholder="TITLE" v-model="employee.city">
      </div>
	  <div>
        <input type="text" name="state" placeholder="TITLE" v-model="employee.state">
      </div>
	  <div>
        <input type="text" name="zipcode" placeholder="TITLE" v-model="employee.zipcode">
      </div>
      <div>
        <button class="app_post_btn" @click="addEmployee">Add</button>
      </div>
    </div>
  </div>
</template>

<script>

import EmployeesService from '@/services/EmployeesService'

export default {
  name: 'addEmployee',
  data () {
    return {
      employee: {
        first_name: '',
        last_name: '',
        age: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
      }
    }
  },
  methods: {
    async addEmployee () {
      await EmployeesService.add(this.employee)
      this.$swal('Great!', `Your post has been added!`, 'success')
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

