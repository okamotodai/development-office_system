import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'

const DispatchNavigation = ({ id, page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-4"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-4"
                    
  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-1">
          <Link href="/dispatch/staff" as={`/dispatch/staff/${id}`}>
            <a className={page == 'staff' ? active : inactive}>派遣社員</a>
          </Link>
        </li>
        <li className="flex-1 mr-1">
          <Link href="/dispatch/companies" as={`/dispatch/companies/${id}`}>
            <a className={page == 'companies' ? active : inactive}>派遣元会社</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DispatchNavigation