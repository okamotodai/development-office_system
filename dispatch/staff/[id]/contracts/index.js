import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../../../../components/layout'
import DispatchNavigation from '../../../../../components/dispatch-navigation'
import DispatchStaffNavigation from '../../../../../components/dispatch-staff-navigation'
import { useDispatch, useContract } from '../../../../../lib/hooks'

const Contracts = () => {
  const router = useRouter()
  const d = useDispatch(router.query.id)
  const [dispatch, setDispatch] = useState()
  useEffect(() => {
    setDispatch(Array.isArray(d.dispatch) ? d.dispatch[0] : '')
  }, [d.isLoading])
  const dispatchContracts = useContract(dispatch && {dispatchedStaffId: dispatch.id} || '')

  if (!dispatch) {
    return null
  }

  const tbody = !dispatchContracts.dispatchContracts ? null : dispatchContracts.dispatchContracts.map(contract =>
    <Link href="/dispatch/staff/[id]/contracts/[id_contract]"
          as={`/dispatch/staff/${dispatch.id}/contracts/${contract.id}`} key={contract.id}>
      <tr className="hover:bg-gray-200">
        <td className="p-2">{contract.dates}</td>
        <td className="p-2">{contract.basicSalary}</td>
        <td className="p-2">{contract.maxWorkTime}</td>
        <td className="p-2">{contract.maxWorkTime}</td>
        <td className="p-2">{contract.individualUnitPrice}</td>
      </tr>
    </Link>
  )

  return (
    <Layout>
      <DispatchNavigation id={dispatch.id} page="contracts" />
      <DispatchStaffNavigation id={dispatch.id} page="contracts" />

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

      <Link href="/dispatch/staff/[id]/contracts/[id_contract]" as={`/dispatch/staff/${dispatch.id}/contracts/new`}>
        <div className="mb-4 flex justify-end">
          <button type="link" className="btn">新規作成</button>
        </div>
      </Link>

      <table className="container table-fixed">
        <thead>
          <tr>
            <th colSpan="2"></th>
            <th colSpan="2">勤務時間 　　</th>
            <th colSpan="1"></th>
          </tr>
          <tr>
            <th className="text-left p-2 w-1/4">年度</th>
            <th className="text-left p-2 w-1/4">基本額</th>
            <th className="text-left p-2 w-1/4">上限</th>
            <th className="text-left p-2 w-1/4">下限</th>
            <th className="text-left p-2 w-1/4">精算単価</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tbody}
        </tbody>
      </table>
    </Layout>
  )
}

export default Contracts
