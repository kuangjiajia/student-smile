export default () => {
	return async (ctx,next) => {
		if(ctx.req.url !== "api") {
			ctx.response.redirect("/index.html")
		}
	}
}