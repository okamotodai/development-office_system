import { getSession } from '../../../lib/iron'
import PersonsInCharge from '../../../models/Persons_in_charge'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ personInCharge: null })
        break
      }

      console.log('getmethod')
      const personInCharge =
        req.query.id == 'new' ? [PersonsInCharge.build()] : await PersonsInCharge.findAll({where: {id: req.query.id}})
      res.status(200).json({personInCharge: personInCharge})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await PersonsInCharge.create(post);
      console.log('postmethod')
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await PersonsInCharge.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await PersonsInCharge.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
