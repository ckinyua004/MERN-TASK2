import 'dotenv/config'
import { db } from './libs/dbConnect'

try{
    // Seeding users
    let collection = await db.collection('users')
    console.log('[seed]', 'Seeding Users..... ')

    const result = await collection.insertMany(users)
    console.log(result.insertedIds)
    console.log('[seed]', 'Seeding Users Done.')

    // Seeding Tasks
    tasks[0].owner = result.insertedIds[0]
    tasks[1].owner = result.insertedIds[1]

    collection = await db.collection('tasks')
    console.log('[seed]', 'Seeding Tasks... ')
    await collection.insertMany(tasks)
    console.log('[seed]', 'Seeding tasks done')

    console.log('[seed]', 'All Done')
} catch(err) {
    console.log('[seed]', 'Error: ', err)
}

process.exit()