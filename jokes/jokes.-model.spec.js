const db = require('../database/dbConfig')
const usersModel = require('./jokes-model.js')

describe('users model', ()=> {
    describe('insert', ()=> {
        beforeEach(async ()=> {
            await db('users').truncate()
        })
        it('should insert a user', async ()=> {
            await usersModel.add({username: 'IronHide', password: 'Decept!con'})

            const Users = await db('users');
            expect(Users).toHaveLength(6)
        })
    })  
}) 