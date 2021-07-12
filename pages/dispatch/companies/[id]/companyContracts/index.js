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
  const [companies, setCompany] = useState()
  useEffect(() => {
    setCompany(Array.isArray(c.companies) ? c.companies[0] : '')
  }, [c.isLoading])
  const companyContracts = useDispatchCompanyContracts(companies && {companyId: companies.id} || '')

  if (!companies) {
    return null
  }

  const tbody = !companyContracts.companyContracts ? null : companyContracts.companyContracts.map(companyContract =>
    <Link href="/dispatch/companies/[id]/companyContracts/[id_companyContracts]"
          as={`/dispatch/companies/${companies.id}/companyContracts/${companyContract.id}`} key={companyContract.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{companyContract.companyContractEndDate}</td>
        <td className="p-2">{companyContract.dayOverWorkTime}</td>
        <td className="p-2">{companyContract.monthOverWorkTime}</td>
        <td className="p-2">{companyContract.yearOverWorkTime}</td>
        <td className="p-2">{companyContract.extentionsNumber}</td>
        <td className="p-2">{companyContract.holidayWorkNumber}</td>
      </tr>
    </Link>
  )

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

      <Link href="/dispatch/companies/[id]/companyContracts/[id_companyContracts]" as={`/dispatch/companies/${companies.id}/companyContracts/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="block overflow-x-scroll whitespace-no-wrap">
        <thead>
          <tr>
            <th colSpan="1"></th>
            <th colSpan="3">時間外勤務時間</th>
            <th colSpan="2"></th>
          </tr>
          <tr>
            <th className="text-left p-2 w-1/4">協定有効期限</th>
            <th className="text-left p-2 w-1/6">日</th>
            <th className="text-left p-2 w-1/6">月</th>
            <th className="text-left p-2 w-1/6">年</th>
            <th className="text-left p-2 w-1/4">延長回数/月</th>
            <th className="text-left p-2 w-1/4">労働可能法定休日/月</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default CompanyContracts
