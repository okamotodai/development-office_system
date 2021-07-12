import sequelize from 'sequelize'
import { getSession } from '../../../lib/iron'
import Dispatch from '../../../models/Dispatched_staff'
import WorkTimesByMonth from '../../../models/Work_times_by_month'

export default async function handler(req, res) {
  const session = await getSession(req)
  const dispatch = !session ? null : await Dispatch.findAll({
    attributes: ['id', 'companyNumber', 'username', 'furigana'],
    order: [['companyNumber', 'ASC']],
    include:[{
      model:WorkTimesByMonth,
      // attributes: [[WorkTimesByMonth.sequelize.fn('sum', WorkTimesByMonth.sequelize.col('WorkTimesByMonth.overtimeWorkTime')), 'overtimeWorkTime']],
      as: "WorkTimesByMonth",
      // group: ['WorkTimesByMonth.dispatchedStaffId'],
      required: false
    }]
  })
  console.log(JSON.stringify(dispatch, null, 2));

  res.status(200).json({ dispatch: dispatch || null })
}
