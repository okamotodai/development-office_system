import { getSession } from '../../../lib/iron'
import DispatchingCompany from '../../../models/Dispatching_company'

export default async function handler(req, res) {
  const session = await getSession(req)
  const companies = !session ? null : await DispatchingCompany.findAll({
    attributes: ['id', 'companyName', 'companyOverview', 'businessType', 'postalCode', 'address', 'phoneNumber', 'mailAddress'],
    order: [['id', 'ASC']]
  })

  res.status(200).json({ companies: companies || null })
}
