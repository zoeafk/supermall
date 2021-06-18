export default{
	addcounter(state,payload){
		payload.count++
	},
	addToCart(state,payload){
		state.cartList.push(payload)
	}
}