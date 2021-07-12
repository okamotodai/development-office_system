import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStaff } from '../lib/hooks'

const DispatchStaffNavigation = ({ id, page }) => {
  const active = "text-center block border border-white hover:border-gray-200 \
                  text-white bg-gray-700 py-2 px-2"
  const inactive = "text-center block border border-white hover:border-gray-200 \
                    text-gray-700 hover:bg-gray-700 hover:text-white py-2 px-2"
                    
  return (
    <div className="mb-4">
      <ul className="flex">
        <li className="flex-1 mr-0">
          <Link href="/dispatch/staff/[id]" as={`/dispatch/staff/${id}`}>
            <a className={page == 'staff' ? active : inactive}>個人</a>
          </Link>
        </li>
        <li className="flex-1 mr-0">
          <Link href="/dispatch/staff/[id]/qualifications" as={`/dispatch/staff/${id}/qualifications`}>
            <a className={page == 'qualifications' ? active : inactive}>資格</a>
          </Link>
        </li>
        <li className="flex-1 mr-0">
          <Link href="/dispatch/staff/[id]/contracts" as={`/dispatch/staff/${id}/contracts`}>
            <a className={page == 'contracts' ? active : inactive}>契約条件</a>
          </Link>
        </li>
        <li className="flex-1 mr-0">
          <Link href="/dispatch/staff/[id]/projects" as={`/dispatch/staff/${id}/projects`}>
            <a className={page == 'projects' ? active : inactive}>プロジェクト</a>
          </Link>
        </li>
        <li className="flex-1 mr-0">
          <Link href="/dispatch/staff/[id]/working_status" as={`/dispatch/staff/${id}/working_status`}>
            <a className={page == 'working_status' ? active : inactive}>就業状況</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DispatchStaffNavigation