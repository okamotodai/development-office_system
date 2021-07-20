import { useState, useEffect } from 'react';
import Link from 'next/link'
import Layout from '../../../components/layout'
import DispatchNavigation from '../../../components/dispatch-navigation'
import { useUser, useDispatch } from '../../../lib/hooks'

const Dispatch = () => {
  const user = useUser()
  const dispatch = useDispatch()
  var fileterWordsAry = [{target_name:"companyNumber", target_value:""}, {target_name:"username", target_value:""}, {target_name:"furigana", target_value:""}];
  // const [fileterWordsAry, setFileterWordsAry] = useState(fileterWordsAry_default)
  // console.log('fileterWordsAry = ' + JSON.stringify(fileterWordsAry, null, 2))
  const [fileterWords, setFileterWords] = useState()
  const today = new Date();
  var year = today.getFullYear()
  const this_year_date = new Date(year, 3, 1);
  
  if (!dispatch) {
    return null
  }

  if(today < this_year_date){
    var year_int = parseInt(year)
    year_int = year_int -1
    year = String( year_int )
  }


  if(!(dispatch.dispatch == null)){
    //idの種類（派遣社員の数）の数だけ雛形作成

    var before_id = 0;
    var add_times = 0;
    var loop_times = 0;
    var month;
    const dispatch_length = dispatch.dispatch.length;
    dispatch.dispatch.some(function(value){
      if(before_id == 0 || value.id !== before_id){
        const default_dispatch = {id:null, companyNumber:null, username:null, furigana:null, dates_month_04_plan:null, dates_month_04_result:null, dates_month_05_plan:null, dates_month_05_result:null, dates_month_06_plan:null, dates_month_06_result:null, dates_month_07_plan:null, dates_month_07_result:null, dates_month_08_plan:null, dates_month_08_result:null, dates_month_09_plan:null, dates_month_09_result:null, dates_month_10_plan:null, dates_month_10_result:null, dates_month_11_plan:null, dates_month_11_result:null, dates_month_12_plan:null, dates_month_12_result:null, dates_month_01_plan:null, dates_month_01_result:null, dates_month_02_plan:null, dates_month_02_result:null, dates_month_03_plan:null, dates_month_03_result:null, dates_month_total_plan:null, dates_month_total_result:null}
        dispatch.dispatch.push(default_dispatch);
        dispatch.dispatch[dispatch.dispatch.length -1].id = value.id
        dispatch.dispatch[dispatch.dispatch.length -1].companyNumber = value.companyNumber
        dispatch.dispatch[dispatch.dispatch.length -1].username = value.username
        dispatch.dispatch[dispatch.dispatch.length -1].furigana = value.furigana
        add_times += 1;
      }

      if(!(value.overtimeWorkTime == null)){
        var dates_month = value.dates_month
        var overtimeWorkTime = value.overtimeWorkTime
        var WorkTimesByMonth = value.WorkTimesByMonth

        month = (value.dates_month).slice(-2)

        switch(month){
          case '01':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_plan.overtimeWorkTime
              }
              const dates_month_01_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_plan = dates_month_01_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_result.overtimeWorkTime
              }
              const dates_month_01_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_01_result = dates_month_01_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }
            
            break;

          case '02':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_plan.overtimeWorkTime
              }
              const dates_month_02_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_plan = dates_month_02_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_result.overtimeWorkTime
              }
              const dates_month_02_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_02_result = dates_month_02_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '03':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_plan.overtimeWorkTime
              }
              const dates_month_03_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_plan = dates_month_03_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_result.overtimeWorkTime
              }
              const dates_month_03_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_03_result = dates_month_03_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '04':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_plan.overtimeWorkTime
              }
              const dates_month_04_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_plan = dates_month_04_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_result.overtimeWorkTime
              }
              const dates_month_04_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_04_result = dates_month_04_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '05':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_plan.overtimeWorkTime
              }
              const dates_month_05_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_plan = dates_month_05_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_result.overtimeWorkTime
              }
              const dates_month_05_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_05_result = dates_month_05_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '06':
          if(value.WorkTimesByMonth.plan_result_flag == 1){
            if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_plan == null)){
              overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_plan.overtimeWorkTime
            }
              const dates_month_06_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_plan = dates_month_06_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_result.overtimeWorkTime
              }
              const dates_month_06_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_06_result = dates_month_06_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '07':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_plan.overtimeWorkTime
              }
              const dates_month_07_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_plan = dates_month_07_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_result.overtimeWorkTime
              }
              const dates_month_07_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_07_result = dates_month_07_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '08':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_plan.overtimeWorkTime
              }
              const dates_month_08_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_plan = dates_month_08_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_result.overtimeWorkTime
              }
              const dates_month_08_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_08_result = dates_month_08_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '09':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_plan.overtimeWorkTime
              }
              const dates_month_09_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_plan = dates_month_09_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_result.overtimeWorkTime
              }
              const dates_month_09_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_09_result = dates_month_09_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '10':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_plan.overtimeWorkTime
              }
              const dates_month_10_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_plan = dates_month_10_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_result.overtimeWorkTime
              }
              const dates_month_10_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_10_result = dates_month_10_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '11':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_plan.overtimeWorkTime
              }
              const dates_month_11_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_plan = dates_month_11_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_result.overtimeWorkTime
              }
              const dates_month_11_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_11_result = dates_month_11_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

            case '12':
            if(value.WorkTimesByMonth.plan_result_flag == 1){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_plan == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_plan.overtimeWorkTime
              }
              const dates_month_12_plan = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_plan = dates_month_12_plan;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_plan += value.overtimeWorkTime;
            }else if(value.WorkTimesByMonth.plan_result_flag == 2){
              if(!(dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_result == null)){
                overtimeWorkTime += dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_result.overtimeWorkTime
              }
              const dates_month_12_result = {dates_month:dates_month, overtimeWorkTime:overtimeWorkTime, WorkTimesByMonth:WorkTimesByMonth}
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_12_result = dates_month_12_result;
              dispatch.dispatch[dispatch.dispatch.length -1].dates_month_total_result += value.overtimeWorkTime;
            }

            break;

        }      
      }

      before_id = value.id;

      loop_times += 1;
      if(loop_times == dispatch_length){
        dispatch.dispatch.splice(0, dispatch_length);
        return true;
      }
    })
  }


  var tbody = !dispatch.dispatch ? null : dispatch.dispatch.map(d =>
    <Link href="/dispatch/staff/[id]" as={`/dispatch/staff/${d.id}`} key={d.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{d.companyNumber}</td>
        <td className="p-2">{d.username}</td>
        <td className="p-2">{d.furigana}</td>
        <td className="p-2">{d.dates_month_04_plan?d.dates_month_04_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_04_result?d.dates_month_04_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_05_plan?d.dates_month_05_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_05_result?d.dates_month_05_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_06_plan?d.dates_month_06_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_06_result?d.dates_month_06_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_07_plan?d.dates_month_07_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_07_result?d.dates_month_07_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_08_plan?d.dates_month_08_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_08_result?d.dates_month_08_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_09_plan?d.dates_month_09_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_09_result?d.dates_month_09_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_10_plan?d.dates_month_10_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_10_result?d.dates_month_10_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_11_plan?d.dates_month_11_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_11_result?d.dates_month_11_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_12_plan?d.dates_month_12_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_12_result?d.dates_month_12_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_01_plan?d.dates_month_01_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_01_result?d.dates_month_01_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_02_plan?d.dates_month_02_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_02_result?d.dates_month_02_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_03_plan?d.dates_month_03_plan.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_03_result?d.dates_month_03_result.overtimeWorkTime:0}</td>
        <td className="p-2">{d.dates_month_total_plan?d.dates_month_total_plan:0}</td>
        <td className="p-2">{d.dates_month_total_result?d.dates_month_total_result:0}</td>
      </tr>
    </Link>
  )


  return (
    <Layout>
      <DispatchNavigation page="staff" />

      <Link href="/dispatch/staff/[id]" as="/dispatch/staff/new">
        <div className="mb-4 flex justify-end">
          <button type="link" disabled={!user.data}
                  className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
        </div>
      </Link>
      <table className="block overflow-x-scroll whitespace-no-wrap">
        <thead>
          <tr>
            <th colSpan="3"></th>
            <th colSpan="26">{year}年度時間外勤務時間</th>
          </tr>
          <tr>
            <th colSpan="3"></th>
            <th colSpan="2">4月</th>
            <th colSpan="2">5月</th>
            <th colSpan="2">6月</th>
            <th colSpan="2">7月</th>
            <th colSpan="2">8月</th>
            <th colSpan="2">9月</th>
            <th colSpan="2">10月</th>
            <th colSpan="2">11月</th>
            <th colSpan="2">12月</th>
            <th colSpan="2">1月</th>
            <th colSpan="2">2月</th>
            <th colSpan="2">3月</th>
            <th colSpan="2">合計</th>
          </tr>
          <tr>
            {/* <th className="text-left p-2 w-1/3" >
              <form action="">
                  <input type="button" value="カンパニー番号" />
              </form>
            </th> */}
            <th className="text-left p-2 w-1/3">カンパニー番号</th>
            <th className="text-left p-2 w-1/3">氏名</th>
            <th className="text-left p-2 w-1/3">フリガナ</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
            <th className="text-left p-2 w-1/3">予定</th>
            <th className="text-left p-2 w-1/3">実績</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Dispatch
