import { getSession } from '../../../lib/iron'
import Dispatch from '../../../models/Dispatched_staff'
import WorkTimesByMonth from '../../../models/Work_times_by_month'

export default async function handler(req, res) {
  const { Op } = require("sequelize");
  const session = await getSession(req)
  const today = new Date();
  var year = today.getFullYear();
  const this_year_date = new Date(year, 3, 1);
  var this_date = year + '0401'

  if(today >= this_year_date){
    var date = year　+ 1 + '0331'

    const dispatch = !session ? null : await Dispatch.findAll({
      attributes: ['id', 'companyNumber', 'username', 'furigana',
      [WorkTimesByMonth.sequelize.fn('to_char', WorkTimesByMonth.sequelize.col('dates'), 'YYYY-mm'), 'dates_month'],
      [WorkTimesByMonth.sequelize.fn('sum', WorkTimesByMonth.sequelize.col('overtime_work_time')), 'overtimeWorkTime']
    ],
      group: ['Dispatched_staff.id', 'WorkTimesByMonth.id', 'dates_month', 'plan_result_flag'],
      order: [['companyNumber', 'ASC']],
      include:[{
        model:WorkTimesByMonth,
        attributes: ['plan_result_flag'],
        where:{dates:{[Op.between]:[this_date, date]}},
        as: "WorkTimesByMonth",
        required: false
      }]
    })

    res.status(200).json({ dispatch: dispatch || null })
  }else{
    this_date = year + '0331'
    var date = year　- 1 + '0401'
    
    const dispatch = !session ? null : await Dispatch.findAll({
      attributes: ['id', 'companyNumber', 'username', 'furigana',
      [WorkTimesByMonth.sequelize.fn('to_char', WorkTimesByMonth.sequelize.col('dates'), 'YYYY-mm'), 'dates_month'],
      [WorkTimesByMonth.sequelize.fn('sum', WorkTimesByMonth.sequelize.col('overtime_work_time')), 'overtimeWorkTime']
    ],
      group: ['Dispatched_staff.id', 'WorkTimesByMonth.id', 'dates_month', 'plan_result_flag'],
      order: [['companyNumber', 'ASC']],
      include:[{
        model:WorkTimesByMonth,
        attributes: ['plan_result_flag'],
        where:{dates:{[Op.between]:[date, this_date]}},
        as: "WorkTimesByMonth",
        required: false
      }]
    })

    res.status(200).json({ dispatch: dispatch || null })
  }
}
