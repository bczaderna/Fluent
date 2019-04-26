const db = require('./server/db/_db')
const {green, red} = require('chalk')
const {Prompts, Users, Records} = require('./server/db/models')

// let succeededAircraft = Aircrafts.getAircraft();

//get rid of primary keys -- sequelize auto-generates. But I need to put in the association id's
const prompts = [{
    text: 'Describe the town in which you live.'
}]

const records = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      Users.map(user => {
        return Users.create(user)
      })
    )
    await Prompts.all(
      Prompts.map(prompt => {
        return Prompts.create(prompt)
      })
    )
    await records.all(
      Records.map(record => {
        return Records.create(record)
      })
    )

    console.log(green('Seeding success!'))
    db.close()
  } catch (err) {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  }
}

seed()
