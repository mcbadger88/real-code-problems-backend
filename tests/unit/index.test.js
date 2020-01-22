const { index } = require('../../controllers/challengesController')
const Challenge = require('../../models/Challenge')

test('status code of 200 for /challenges', async () => {
    const res = {
        send: jest.fn()
    }
    const challenges = [{
        name: "harrison's challenge"
    }]
    Challenge.find = jest.fn().mockResolvedValue(challenges)
    await index(null, res)
    expect(res.send).toBeCalledWith(challenges)
})