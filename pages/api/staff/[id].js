import { getSession } from '../../../lib/iron'
import Staff from '../../../models/staff'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ staff: null })
        break
      }
      const staff = req.query.id == 'new' ? [Staff.build()] : await Staff.findAll({where: {id: req.query.id}})
      res.status(200).json({staff: staff})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      await Staff.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await Staff.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await Staff.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
