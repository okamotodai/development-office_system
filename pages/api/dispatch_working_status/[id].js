import { getSession } from '../../../lib/iron'
import WorkTimesByMonth from '../../../models/Work_times_by_month'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ dispatchWorkingStatus: null })
        break
      }
      
      const dispatchWorkingStatus =
        req.query.id == 'new' ? [WorkTimesByMonth.build()] : await WorkTimesByMonth.findAll({where: {id: req.query.id}})
      res.status(200).json({dispatchWorkingStatus: dispatchWorkingStatus})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      await WorkTimesByMonth.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await WorkTimesByMonth.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await WorkTimesByMonth.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
