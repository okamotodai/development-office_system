import Link from 'next/link'
import Layout from '../../../components/layout'
import ObjectNavigation from '../../../components/object-navigation'
import { useUser,usePc } from '../../../lib/hooks'

const Pcs = () => {
  const user = useUser()
  const pc = usePc()
  const now = new Date();//今日

  const changeColor = (limitday, term, now) => {
    const limit = new Date(limitday);//期限

    if(limitday === null){
      return false
    }
    const before = limit.setDate(limit.getDate() - term );//期限から~日前
    const remainingTime = (now - before) / 86400000;//今日（ミリ秒）から期限から~日前（ミリ秒）を引く

　　//remainingTimeが0以上ならアラート出るようにする
    if(0 <= remainingTime){
      return true
    }else{
      return false
    }
  }


  if (!pc) {
    return null
  }

const tbody = !pc.lease_rental_pc ? null : pc.lease_rental_pc.map(p =>
  <Link href="/object/lease_rental_pc/[id_lease_rental_pc]" as={`/object/lease_rental_pc/${p.id}`} key={p.id}>
    <tr className="hover:bg-gray-200" style={changeColor(p.contractEnd, p.alert, now) === true ? { background:"#ffe4e1" }:{}}>
      <td className="p-2">{p.contracTnumber}</td>
      <td className="p-2">{p.productName}</td>
      <td className="p-2">{p.os}</td>
      <td className="p-2">{p.officeVer}</td>
      <td className="p-2">{p.pcName}</td>
      <td className="p-2">{p.contractStart}</td>
      <td className="p-2">{p.contractEnd}</td>
      <td className="p-2">{p.userName}</td>
      <td className="p-2">{p.ipAddress}</td>
      <td className="p-2">{p.vpn}</td>
      <td className="p-2">{p.monthly}</td>
      <td className="p-2">{p.alert}</td>
   </tr>
  </Link>
 )
 return (
   <Layout>
     <ObjectNavigation page="lease_rental_pc" />

     <Link href="/object/lease_rental_pc/[id_lease_rental_pc]" as="/object/lease_rental_pc/new">
       <div className="mb-4 flex justify-end">
        <button type="link" disabled={!user.data}
                className={user.data ? "btn" : "btn-disabled"}>新規作成</button>
       </div>

     </Link>
     <table className="block overflow-x-scroll whitespace-no-wrap">
       <thead>
         <tr>
           <th className="text-left p-2">契約番号</th>
           <th className="text-left p-2">品名</th>
           <th className="text-left p-2">OS</th>
           <th className="text-left p-2">Office Ver.</th>
           <th className="text-left p-2">コンピュータ名</th>
           <th className="text-left p-2">契約開始日</th>
           <th className="text-left p-2">契約終了日</th>
           <th className="text-left p-2">使用者</th>
           <th className="text-left p-2">IPアドレス</th>
           <th className="text-left p-2">SSL-VPN</th>
           <th className="text-left p-2">月額</th>
           <th className="text-left p-2">契約終了前アラート期間</th>
         </tr>
       </thead>
       <tbody className="divide-y">
         {tbody}
       </tbody>
     </table>
   </Layout>
 )
}

export default Pcs
