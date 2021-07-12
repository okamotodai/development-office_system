import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../../components/layout'
import DispatchNavigation from '../../../../../components/dispatch-navigation'
import DispatchCompanyNavigation from '../../../../../components/dispatch-company-navigation'
import { useCompany, useDispatchPersonInCharge } from '../../../../../lib/hooks'

const DispatchPersonInCharge = () => {
  const router = useRouter()
  const c = useCompany(router.query.id)
  const p = useDispatchPersonInCharge({id: router.query.id_personInCharge})
  const [companies, setCompany] = useState()
  const [dispatchPersonInCharge, setDispatchPersonInCharge] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)

  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])

  useEffect(() => {
    setDispatchPersonInCharge(Array.isArray(p.personInCharge) ? p.personInCharge[0] : '')
  }, [p.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id_personInCharge == 'new'))
  }, [router.query.id_personInCharge])

  console.log('dispatchPersonInCharge = ' + dispatchPersonInCharge)
  if (!dispatchPersonInCharge) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !dispatchPersonInCharge.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/dispatch_person_in_charge/${router.query.id_personInCharge}`, {method: method, body:JSON.stringify(dispatchPersonInCharge)});
    !dispatchPersonInCharge.id && router.push(`/dispatch/companies/${router.query.id}/personInCharge`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setDispatchPersonInCharge({ ...dispatchPersonInCharge, [name]: value, companyId: companies.id })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/dispatch_person_in_charge/${router.query.id_personInCharge}`, {method: 'DELETE', body:JSON.stringify(dispatchPersonInCharge)});
      router.push(`/dispatch/companies/${router.query.id}/personInCharge`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={companies.id} page="personInCharge" />
      <DispatchCompanyNavigation id={companies.id} page="personInCharge" />

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
              <label htmlFor="personInChargeName" className="form-inline-label">担当者氏名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="personInChargeName" value={dispatchPersonInCharge.personInChargeName || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="department" className="form-inline-label">担当部門</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="department" value={dispatchPersonInCharge.department || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="devide">
          担当期間
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="periodStart" className="form-inline-label">開始</label>
              </div>
              <div className="w-2/3">
                <input type="date" name="periodStart" value={dispatchPersonInCharge.periodStart || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="periodEnd" className="form-inline-label">終了</label>
              </div>
              <div className="w-2/3">
                <input type="date" name="periodEnd" value={dispatchPersonInCharge.periodEnd || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
          </div>

          <div className="devide">
          　
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="postalCode" className="form-inline-label">郵便番号</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="postalCode" value={dispatchPersonInCharge.postalCode || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="address" className="form-inline-label">住所</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="address" value={dispatchPersonInCharge.address || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>
          </div>
    
          <div className="devide">
          連絡先
            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="workPhoneNumber" className="form-inline-label">会社TEL</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="workPhoneNumber" value={dispatchPersonInCharge.workPhoneNumber || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="personalPhoneNumber" className="form-inline-label">携帯</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="personalPhoneNumber" value={dispatchPersonInCharge.personalPhoneNumber || ''} onChange={handleChange}
                      className="form-inline-input"/>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-1/3">
                <label htmlFor="mailAddress" className="form-inline-label">メールアドレス</label>
              </div>
              <div className="w-2/3">
                <input type="text" name="mailAddress" value={dispatchPersonInCharge.mailAddress || ''} onChange={handleChange}
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

export default DispatchPersonInCharge
