import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../../components/layout'
import DispatchNavigation from '../../../../../components/dispatch-navigation'
import DispatchCompanyNavigation from '../../../../../components/dispatch-company-navigation'
import { useCompany, useDispatchCompanyContracts } from '../../../../../lib/hooks'

const CompanyContracts = () => {
  const router = useRouter()
  const c = useCompany(router.query.id)
  const ccon = useDispatchCompanyContracts({id: router.query.id_companyContracts})
  const [companies, setCompany] = useState()
  const [dispatchCompanyContracts, setDispatchCompanyContracts] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])

  useEffect(() => {
    setDispatchCompanyContracts(Array.isArray(ccon.companyContracts) ? ccon.companyContracts[0] : '')
  }, [ccon.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_companyContracts == 'new'))
  }, [router.query.id_companyContracts])

  console.log('dispatchCompanyContracts = ' + dispatchCompanyContracts)
  if (!dispatchCompanyContracts) {
    console.log('dispatchCompanyContracts = null')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !dispatchCompanyContracts.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/dispatch_company_contracts/${router.query.id_companyContracts}`, {method: method, body:JSON.stringify(dispatchCompanyContracts)});
    !dispatchCompanyContracts.id && router.push(`/dispatch/companies/${router.query.id}/companyContracts`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setDispatchCompanyContracts({ ...dispatchCompanyContracts, [name]: value, companyId: companies.id })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/dispatch_company_contracts/${router.query.id_companyContracts}`, {method: 'DELETE', body:JSON.stringify(dispatchCompanyContracts)});
      router.push(`/dispatch/companies/${router.query.id}/companyContracts`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={companies.id} page="companyContracts" />
      <DispatchCompanyNavigation id={companies.id} page="companyContracts" />

      <div className="flex items-center mb-2">
        <div className="w-1/3">
          <label className="form-inline-label">会社名</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {companies.companyName}
          </div>
        </div>
      </div>

      <div className="flex items-center mb-8">
        <div className="w-1/3">
          <label className="form-inline-label">業務種類</label>
        </div>
        <div className="w-2/3">
          <div className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
            {companies.businessType}
          </div>
        </div>
      </div>

      <div className="detail">
        <form onSubmit={handleSubmit}>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyContractEndDate" className="form-inline-label">協定有効期限</label>
            </div>
            <div className="w-2/3">
              <input type="date" name="companyContractEndDate" value={dispatchCompanyContracts.companyContractEndDate || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="devide">
            時間外勤務時間
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="dayOverWorkTime" className="form-inline-label">1日</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="dayOverWorkTime" value={dispatchCompanyContracts.dayOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="daySpecialOverWorkTime" className="form-inline-label">1日特別</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="daySpecialOverWorkTime" value={dispatchCompanyContracts.daySpecialOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="monthOverWorkTime" className="form-inline-label">月</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="monthOverWorkTime" value={dispatchCompanyContracts.monthOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="monthSpecialOverWorkTime" className="form-inline-label">月特別</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="monthSpecialOverWorkTime" value={dispatchCompanyContracts.monthSpecialOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="yearOverWorkTime" className="form-inline-label">年</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="yearOverWorkTime" value={dispatchCompanyContracts.yearOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="yearSpecialOverWorkTime" className="form-inline-label">年特別</label>
              </div>
              <div className="w-2/3">
                <input type="float" name="yearSpecialOverWorkTime" value={dispatchCompanyContracts.yearSpecialOverWorkTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
            　
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="extentionsNumber" className="form-inline-label">延長回数/月</label>
              </div>
              <div className="w-2/3">
                <input type="integer" name="extentionsNumber" value={dispatchCompanyContracts.extentionsNumber || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="holidayWorkNumber" className="form-inline-label">労働可能法定休日/月</label>
              </div>
              <div className="w-2/3">
                <input type="integer" name="holidayWorkNumber" value={dispatchCompanyContracts.holidayWorkNumber || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="holiday" className="form-inline-label">所定休日</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="holiday" value={dispatchCompanyContracts.holiday || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
            所定勤務時間
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="workStartTime" className="form-inline-label">開始</label>
              </div>
              <div className="w-2/3">
                <input type="time" name="workStartTime" value={dispatchCompanyContracts.workStartTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="workEndTime" className="form-inline-label">終了</label>
              </div>
              <div className="w-2/3">
                <input type="time" name="workEndTime" value={dispatchCompanyContracts.workEndTime || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
            　
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="remarks" className="form-inline-label">備考</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="remarks" value={dispatchCompanyContracts.remarks || ''} onChange={handleChange}
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
    </Layout>
  )
}

export default CompanyContracts
