export default {

	methods: {
		setAllInfo(){
			if(this.$store.getters.getAllInfo == ''){
			this.$store.dispatch('getAllDataFromDB' , this.$store.getters.modelProfile_basic);
		}
	}
	}

}

