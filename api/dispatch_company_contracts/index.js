import { getSession } from '../../../lib/iron'
import CompanyContract from '../../../models/Company_contract'

export default async function handler(req, res) {
  const session = await getSession(req)
  const companyContracts = !session ? null : await CompanyContract.findAll({
    where: req.query.companyId ? {companyId: req.query.companyId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ companyContracts: companyContracts || null })
}
