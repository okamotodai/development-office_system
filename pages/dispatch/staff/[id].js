import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import DispatchNavigation from '../../../components/dispatch-navigation'
import DispatchStaffNavigation from '../../../components/dispatch-staff-navigation'
import { useDispatch, useCompany } from '../../../lib/hooks'

const Dispatch = () => {
  const router = useRouter()
  const company = useCompany()
  const d = useDispatch(router.query.id)
  const [dispatch, setDispatch] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id == 'new'))
  }, [router.query.id])
  
  if (!dispatch) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !dispatch.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/dispatch/${router.query.id}`, {method: method, body:JSON.stringify(dispatch)});
    !dispatch.id && router.push('/dispatch/staff')
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setDispatch({ ...dispatch, [name]: value });
  }


  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/dispatch/${router.query.id}`, {method: 'DELETE', body:JSON.stringify(dispatch)});
      router.push('/dispatch/staff')
    }
  }

  const cbody = !company.companies ? null : company.companies.map(c =>
    <option value={c.id} key={c.id}>{c.companyName}</option>
  )

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="staff" />
      <DispatchStaffNavigation id={dispatch.id} page="staff" />

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyNumber" className="form-inline-label">カンパニー番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="companyNumber" value={dispatch.companyNumber || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="username" className="form-inline-label">氏名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="username" value={dispatch.username || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="furigana" className="form-inline-label">フリガナ</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="furigana" value={dispatch.furigana || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="maidenName" className="form-inline-label">旧姓</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="maidenName" value={dispatch.maidenName || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="sex" className="form-inline-label">性別</label>
            </div>
            <div className="w-2/3">
              <select name="sex" value={dispatch.sex || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                <option value="1">男</option>
                <option value="2">女</option>
              </select>
              <input type="hidden"/>
            </div>
          </div>

            {/* <div className="w-1/6">
              <input type="radio" name="sex" value={1 || ''} onChange={handleChange}
                      className="mr-2 leading-tight"/> 男
            </div>
            <div className="w-1/6">
              <input type="radio" name="sex" value={2 || ''} onChange={handleChange}
                      className="mr-2 leading-tight"/> 女
            </div>
          </div> */}
          
          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="blood_type" className="form-inline-label">血液型</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="blood_type" value={dispatch.blood_type || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="birthDate" className="form-inline-label">生年月日</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="birthDate" value={dispatch.birthDate || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="inserviceRetired" className="form-inline-label">在退職</label>
            </div>
            <div className="w-2/3">
              <select name="inserviceRetired" value={dispatch.inserviceRetired || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                <option value="1">在職</option>
                <option value="2">退職</option>
              </select>
              <input type="hidden"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyId" className="form-inline-label">会社名</label>
            </div>
            <div className="w-2/3">
              <select name="companyId" value={dispatch.companyId || ''} onChange={handleChange}
              className="form-inline-input">
                <option value=""></option>
                {cbody}
              </select>
              <input type="hidden"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="employedCategory" className="form-inline-label">所属部門</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="employedCategory" value={dispatch.employedCategory || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="devide">
            契約
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="joinDate" className="form-inline-label">入社年月日</label>
              </div>
              <div className="w-2/3">
                <input type="date" name="joinDate" value={dispatch.joinDate || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div> 

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="retiredDate" className="form-inline-label">退職年月日</label>
              </div>
              <div className="w-2/3">
                <input type="date" name="retiredDate" value={dispatch.retiredDate || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="contractEndDate" className="form-inline-label">契約満了年月日</label>
              </div>
              <div className="w-2/3">
                <input type="date" name="contractEndDate" value={dispatch.contractEndDate || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
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

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Dispatch
