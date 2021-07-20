import { getSession } from '../../../lib/iron'
import CompanyContract from '../../../models/Company_contract'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ companyContracts: null })
        break
      }

      const companyContracts =
        req.query.id == 'new' ? [CompanyContract.build()] : await CompanyContract.findAll({where: {id: req.query.id}})
      res.status(200).json({companyContracts: companyContracts})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await CompanyContract.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await CompanyContract.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await CompanyContract.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
