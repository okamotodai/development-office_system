import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'

const DispatchCompanyNavigation = ({ id, page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-4"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-4"
                    
  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-1">
          <Link href="/dispatch/companies/[id]" as={`/dispatch/companies/${id}`}>
            <a className={page == 'companies' ? active : inactive}>会社</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/companies/[id]/personInCharge" as={`/dispatch/companies/${id}/personInCharge`}>
            <a className={page == 'personInCharge' ? active : inactive}>担当者</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/companies/[id]/companyContracts" as={`/dispatch/companies/${id}/companyContracts`}>
            <a className={page == 'companyContracts' ? active : inactive}>36協定</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DispatchCompanyNavigation