const router = require('express').Router()
const Prompts = require('../db/models/prompts')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
      console.log('***INSIDE GET ROUTE')
    const prompts = await Prompts.findAll()
    console.log(prompts, 'all prompts from db')
    let randomIndex = Math.floor(Math.random() * prompts.length)
    console.log(randomIndex, 'random index')
    let randomPrompt = prompts[randomIndex]

    res.json(randomPrompt)
  } catch (err) {
    next(err)
  }
})
