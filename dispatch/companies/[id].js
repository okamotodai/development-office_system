import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../components/layout'
import DispatchNavigation from '../../../components/dispatch-navigation'
import DispatchCompanyNavigation from '../../../components/dispatch-company-navigation'
import { useCompany } from '../../../lib/hooks'

const Companies = () => {
  const router = useRouter()
  const c = useCompany(router.query.id)
  const [companies, setCompany] = useState()
  const [submittable, setSubmittable] = useState(false)
  const [deletable, setDeletable] = useState(false)


  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])

  useEffect(() => {
    setDeletable(!(router.query.id == 'new'))
  }, [router.query.id])

  if (!companies) {
    console.log('companies = null')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittable(false)
    const method = !companies.id ? 'POST' : 'PUT'
    const res = await fetch(`/api/dispatch_companies/${router.query.id}`, {method: method, body:JSON.stringify(companies)});
    !companies.id && router.push(`/dispatch/companies`)
  }

  function handleChange(e) {
    e.preventDefault()
    setSubmittable(true)
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name
    setCompany({ ...companies, [name]: value })
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (confirm('削除します')) {
      const res = await fetch(`/api/dispatch_companies/${router.query.id}`, {method: 'DELETE', body:JSON.stringify(companies)});
      router.push(`/dispatch/companies`)
    }
  }

  return (
    <Layout>
      <DispatchNavigation id={companies.id} page="companies" />
      <DispatchCompanyNavigation id={companies.id} page="companies" />

      <div className="detail">
        <form onSubmit={handleSubmit}>
          
          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyName" className="form-inline-label">会社名</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="companyName" value={companies.companyName || ''} onChange={handleChange} required
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="companyOverview" className="form-inline-label">会社概要</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="companyOverview" value={companies.companyOverview || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="businessType" className="form-inline-label">業務種類</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="businessType" value={companies.businessType || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="postalCode" className="form-inline-label">郵便番号</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="postalCode" value={companies.postalCode || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="address" className="form-inline-label">住所</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="address" value={companies.address || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="phoneNumber" className="form-inline-label">連絡先</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="phoneNumber" value={companies.phoneNumber || ''} onChange={handleChange}
                     className="form-inline-input"/>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <label htmlFor="mailAddress" className="form-inline-label">メールアドレス</label>
            </div>
            <div className="w-2/3">
              <input type="text" name="mailAddress" value={companies.mailAddress || ''} onChange={handleChange}
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

export default Companies
