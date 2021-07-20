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
  const [companies, setCompany] = useState()
  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])
  const dispatchPersonInCharge = useDispatchPersonInCharge(companies && {companyId: companies.id} || '')

  if (!companies) {
    return null
  }

  const tbody = !dispatchPersonInCharge.personInCharge ? null : dispatchPersonInCharge.personInCharge.map(personInCharge =>
    <Link href="/dispatch/companies/[id]/personInCharge/[id_personInCharge]"
          as={`/dispatch/companies/${companies.id}/personInCharge/${personInCharge.id}`} key={personInCharge.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{personInCharge.personInChargeName}</td>
        <td className="p-2">{personInCharge.department}</td>
        <td className="p-2">{personInCharge.periodStart}</td>
        <td className="p-2">{personInCharge.periodEnd}</td>
        <td className="p-2">{personInCharge.workPhoneNumber}</td>
        <td className="p-2">{personInCharge.mailAddress}</td>
      </tr>
    </Link>
  )

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

      <Link href="/dispatch/companies/[id]/personInCharge/[id_personInCharge]" as={`/dispatch/companies/${companies.id}/personInCharge/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="block overflow-x-scroll whitespace-no-wrap">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th colSpan="2">時間外勤務時間　</th>
            <th colSpan="2"></th>
          </tr>
          <tr>
            <th className="text-left p-2 w-1/4">担当者氏名</th>
            <th className="text-left p-2 w-1/4">担当部門</th>
            <th className="text-left p-2 w-1/4">開始</th>
            <th className="text-left p-2 w-1/4">終了</th>
            <th className="text-left p-2 w-1/4">連絡先（会社TEL）</th>
            <th className="text-left p-2 w-1/4">メールアドレス</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default DispatchPersonInCharge
