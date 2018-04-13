const controller = {
	index: async (ctx,next) => {
		ctx.response.redirect("/index.html")
	}
}

export default controller