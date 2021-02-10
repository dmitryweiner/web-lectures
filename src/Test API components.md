https://www.npmjs.com/package/msw

https://testing-library.com/docs/react-testing-library/example-intro/

const server = setupServer(
rest.get('/greeting', (req, res, ctx) => {
return res(ctx.json({ greeting: 'hello there' }))
})
)