import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../../components/layout'
import DispatchNavigation from '../../../../../components/dispatch-navigation'
import DispatchStaffNavigation from '../../../../../components/dispatch-staff-navigation'
import { useDispatch, useDispatchWorkingStatus, useDispatchProject } from '../../../../../lib/hooks'

const WorkingStatus = () => {
  const router = useRouter()
  const dispatchProject = useDispatchProject()
  const d = useDispatch(router.query.id)
  const w = useDispatchWorkingStatus({id: router.query.id_workingStatus})
  const [dispatch, setDispatch] = useState()
  const [dispatchWorkingStatus, setDispatchWorkingStatus] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setDispatchWorkingStatus(Array.isArray(w.dispatchWorkingStatus) ? w.dispatchWorkingStatus[0] : '')
  }, [w.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_workingStatus == 'new'))
  }, [router.query.id_workingStatus])

  if (!dispatchWorkingStatus) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !dispatchWorkingStatus.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/dispatch_working_status/${router.query.id_workingStatus}`, {method: method, body:JSON.stringify(dispatchWorkingStatus)});
    !dispatchWorkingStatus.id && router.push(`/dispatch/staff/${router.query.id}/working_status`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setDispatchWorkingStatus({ ...dispatchWorkingStatus, [name]: value, dispatchedStaffId: dispatch.id  })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/dispatch_working_status/${router.query.id_workingStatus}`, {method: 'DELETE', body:JSON.stringify(dispatchWorkingStatus)});
      router.push(`/dispatch/staff/${router.query.id}/working_status`)
    }
  }

  const pbody = !dispatchProject.dispatchProjects ? null : dispatchProject.dispatchProjects.map(p =>
    <option value={p.id}>{p.projectName}</option>
  )

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="working_status" />
      <DispatchStaffNavigation id={dispatch.id} page="working_status" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">カンパニー番号</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.companyNumber}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">氏名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {dispatch.username}
          </div>
        </div>
      </div>

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="projectId" className="form-inline-label">プロジェクト名</label>
            </div>
            <div className="w-2/3">
              <select name="projectId" value={dispatchWorkingStatus.projectId || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                {pbody}
              </select>
              <input type="hidden"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="dates" className="form-inline-label">年度月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="dates" value={dispatchWorkingStatus.dates || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="planResultFlag" className="form-inline-label">予定実績</label>
            </div>
            <div className="w-2/3">
              <select  name="planResultFlag" value={dispatchWorkingStatus.planResultFlag || ''} onChange={handleChange} required
              className="form-inline-input">
                <option value=""></option>
                <option value="1">予定</option>
                <option value="2">実績</option>
              </select>
              <input type="hidden"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="overtimeWorkTime" className="form-inline-label">時間外時間</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="overtimeWorkTime" value={dispatchWorkingStatus.overtimeWorkTime || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3"></div>
            <div className="w-1/3">
              <button type="submit" disabled={!submittable}
                      className={submittable ? "btn px-8" : "btn-disabled px-8"}>更新</button>
            </div>
            <div className="w-1/3 flex justify-end">
              <button type="submit" disabled={!deletable} onClick={handleDelete}
                      className={deletable ? "btn px-8" : "btn-disabled px-8"}>削除</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default WorkingStatus
