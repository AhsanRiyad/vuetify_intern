export default {

	methods: {
		setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		getCookie(cname) {
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		checkCookie() {
			var email = this.getCookie("email");
			var crypto = this.getCookie("crypto");
			if (email != '') {

				this.$axios.post( this.$store.getters.modelProfile_basic , {
					purpose : 'getProfileBasicInfo',
					email: email , 
				})
				.then( function(response){

					console.log(response);

					if(response.data !=0 ){
						if(response.data.forgot_password_crypto == crypto)
						this.$store.commit('set_user_info' , response.data);

						return true;
					}
					}.bind(this))
				.catch(function () {

				}.bind(this));

				alert("Welcome again ");
			}else{
				alert("not set");
				return false;

			}
		}


	}

}

