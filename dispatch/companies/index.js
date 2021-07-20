import Link from 'next/link'
import Layout from '../../../components/layout'
import DispatchNavigation from '../../../components/dispatch-navigation'
import { useUser, useCompany } from '../../../lib/hooks'

const Companies = () => {
  const user = useUser()
  const companies = useCompany()

  if (!companies) {
    return null
  }

  const tbody = !companies.companies ? null : companies.companies.map(company =>
    <Link href="/dispatch/companies/[id]"
          as={`/dispatch/companies/${company.id}`} key={company.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{company.companyName}</td>
        <td className="p-2">{company.companyOverview}</td>
        <td className="p-2">{company.businessType}</td>

      </tr>
    </Link>
  )

  return (
    <Layout>
      <DispatchNavigation page="companies" />

      <Link href="/dispatch/companies/[id]" as={`/dispatch/companies/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" disabled={!user.data} className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th className="text-left p-2 w-1/3">会社名</th>
            <th className="text-left p-2 w-1/3">会社概要</th>
            <th className="text-left p-2 w-1/3">業務種類</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Companies
