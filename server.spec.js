const request = require('supertest')
const db = require('./config')

const server = require('./server')


let token = ''

describe('backend test', ()=>{
    describe('auth routes', () => {
        describe('register endpoint', ()=>{
            it('should insert a user and return 201', async () => {

                const response = await request(server)
                    .post('/api/register')
                    .send({ username: 'brooks', password: '1234', fullName: 'Brooks Poltl' })
                const users = await db('users')
                expect(users.length).toBe(1)
                expect(response.status).toBe(201)
                expect(response.body).toEqual([1])
            })
            it('should throw 400 error and correct message', async () => {
                const response = await request(server)
                    .post('/api/register')
                    .send({ username: 'brooks', password: '1234', })

                expect(response.status).toBe(400)
                expect(response.body).toEqual({ errorMessage: 'missing users full name' })
            })
        })
        describe('login endpoint',()=>{
            it('returns 200 and gives token', async()=>{
                const response = await request(server)
                    .post('/api/login')
                    .send({
                        username: 'brooks',
                        password: '1234',
                        fullName: 'Brooks Poltl'
                    })
                    const users = await db('users')
                    token = response.body.token
                expect(response.status).toBe(200)
                expect(response.body.token).toBeTruthy()
            })
            it('returns 400 and correct error message', async()=>{
                const response = await request(server)
                    .post('/api/login')
                    .send({
                        username: 'brooks',
                        fullName: 'Brooks Poltl'
                    })
                expect (response.status).toBe(400)
                expect(response.body).toEqual({ message: 'missing password' })
            })
        })
    })
    describe('post routes', ()=>{
        it('can create a post and authenticate', async()=>{
            const post = {
                description: "cool new post",
                imageUrl: 'asdasdasd',
                postName: 'my post'
            }
            const response = await request(server)
                .post('/api/posts')
                .send(post).set('authorization', token)
            expect(response.status).toBe(201)
            expect(response.body).toEqual([1])
        })
    })
})
