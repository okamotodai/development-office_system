import { getSession } from '../../../lib/iron'
import WorkTimesByMonth from '../../../models/Work_times_by_month'
import DispatchProject from '../../../models/Dispatch_project'

export default async function handler(req, res) {
  const session = await getSession(req)
  const dispatchWorkingStatus = !session ? null : await WorkTimesByMonth.findAll({
    where: req.query.dispatchedStaffId ? {dispatchedStaffId: req.query.dispatchedStaffId} : {},
    order: [['id', 'ASC']],
    include:[{
      model:DispatchProject,
      required: true
    }]
  })

  res.status(200).json({ dispatchWorkingStatus: dispatchWorkingStatus || null })
}
