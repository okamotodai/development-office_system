import { DataTypes } from 'sequelize'
import sequelize from './db'
import DispatchProject from './Dispatch_project'

const WorkTimesByMonth = sequelize.define('Work_times_by_month', {
  dispatchedStaffId:   { type: DataTypes.INTEGER, field: 'dispatched_staff_id', allowNull: false, defaultValue: null, },
  projectId:           { type: DataTypes.INTEGER, field: 'project_id', allowNull: false, defaultValue: null, },
  dates:               { type: DataTypes.DATEONLY, allowNull: false, defaultValue: null, },
  planResultFlag:      { type: DataTypes.INTEGER, field: 'plan_result_flag', allowNull: false, defaultValue: null, },
  overtimeWorkTime:    { type: DataTypes.FLOAT, field: 'overtime_work_time', defaultValue: null, },
  createdAt:           { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:           { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, }
}, {
  freezeTableName: true
});

WorkTimesByMonth.belongsTo(DispatchProject,{
  foreignKey:"projectId",
  targetKey:"id"
})


export default WorkTimesByMonth
