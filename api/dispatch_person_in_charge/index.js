import { getSession } from '../../../lib/iron'
import PersonsInCharge from '../../../models/Persons_in_charge'

export default async function handler(req, res) {
  const session = await getSession(req)
  console.log('indexmethod')
  const personInCharge = !session ? null : await PersonsInCharge.findAll({
    where: req.query.companyId ? {companyId: req.query.companyId} : {},
    order: [['id', 'ASC']]
  })

  res.status(200).json({ personInCharge: personInCharge || null })
}
