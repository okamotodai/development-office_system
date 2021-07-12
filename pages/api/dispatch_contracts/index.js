import { getSession } from '../../../lib/iron'
import PersonalContractsYearly from '../../../models/Personal_contracts_yearly'

export default async function handler(req, res) {
  const session = await getSession(req)
  const dispatchContracts = !session ? null : await PersonalContractsYearly.findAll({
    where: req.query.dispatchedStaffId ? {dispatchedStaffId: req.query.dispatchedStaffId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ dispatchContracts: dispatchContracts || null })
}
