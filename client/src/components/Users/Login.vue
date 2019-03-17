<template>
	<div class="card">
		<div class="card-body">
			<div class="card-header">
				<h1>Login</h1>
			</div>
			<div class="card-text">
				<div class="form-group">
					<label>Email</label>
					<input type="text" class="form-control">
				</div>
				<div class="form-group">
					<label>Password</label>
					<input type="password" class="form-control">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {UserService } from '@/services/UserService'
export default {
	data() {
		return {
			email: "",
			password:""
		}
	},
	methods: {
		async login: function(){
			const email = this.email;
			const pwd = this.password
			let user = await  UserService.login({email, pwd});
			if (!user){
				//Display the error message. 
				console.log("Failed to login.")
			}
		}
	}
}
</script>
