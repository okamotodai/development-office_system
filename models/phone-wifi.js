import { DataTypes } from 'sequelize'
import sequelize from './db'
import Staff from './staff'

const PhoneWifis = sequelize.define('phone_wifi', {
  telephoneNumber:      { type: DataTypes.STRING, field: 'telephone_number', defaultValue: null, },
  carrier:              { type: DataTypes.STRING, field: 'carrier', defaultValue: null, },
  typeTelWifi:          { type: DataTypes.STRING, field: 'type_tel_wifi', defaultValue: null, },
  userName:               { type: DataTypes.STRING, field: 'user_name', defaultValue: null, },
  modelNumber:          { type: DataTypes.STRING, field: 'model_number', defaultValue: null, },
  modelName:            { type: DataTypes.STRING, field: 'model_name', defaultValue: null, },
  processName:          { type: DataTypes.STRING, field: 'process_name', defaultValue: null, },
  newBuyDate:           { type: DataTypes.DATEONLY, field: 'new_buy_date', defaultValue: null, },
  modelChangeDate:      { type: DataTypes.DATEONLY, field: 'model_change_date', defaultValue: null, },
  buyMethod:            { type: DataTypes.STRING, field: 'buy_method', defaultValue: null, },
  buyPrice:             { type: DataTypes.INTEGER, field: 'buy_price', defaultValue: null, },
  firstTimeModelPrice:  { type: DataTypes.INTEGER, field: 'first_time_model_price', defaultValue: null, },
  modelMonthly:         { type: DataTypes.INTEGER, field: 'model_monthly', defaultValue: null, },
  sharepackEntry:       { type: DataTypes.STRING, field: 'sharepack_entry', defaultValue: null, },
  contractStart:        { type: DataTypes.DATEONLY, field: 'contract_start', defaultValue: null, },
  contractEnd:          { type: DataTypes.DATEONLY, field: 'contract_end', defaultValue: null, },
  processReqDate:       { type: DataTypes.DATEONLY, field: 'process_req_date', defaultValue: null, },
  processCompDate:      { type: DataTypes.DATEONLY, field: 'process_comp_date', defaultValue: null, },
  note:                 { type: DataTypes.TEXT, field: 'note', defaultValue: null, },
  staffId:              { type: DataTypes.INTEGER, field: 'staff_id', defaultValue: null, },
  monthly:              { type: DataTypes.INTEGER, field: 'monthly', defaultValue: null, },
  createdAt:            { type: DataTypes.DATE, field: 'created_at', defaultValue: null, },
  updatedAt:            { type: DataTypes.DATE, field: 'updated_at', defaultValue: null, },
},{
  freezeTableName: true
});


PhoneWifis.belongsTo(Staff,{
  foreignKey:"staffId",
  targetKey:"staffId",
  as:"StaffId"
})


export default PhoneWifis
