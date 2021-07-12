import { getSession } from '../../../lib/iron'
import PersonalContractsYearly from '../../../models/Personal_contracts_yearly'

export default async function staffHandler(req, res) {
  const session = await getSession(req)

  switch (req.method) {
    case 'GET':
      if (!session) {
        res.status(200).json({ dispatchContracts: null })
        break
      }

      const dispatchContracts =
        req.query.id == 'new' ? [PersonalContractsYearly.build()] : await PersonalContractsYearly.findAll({where: {id: req.query.id}})
      res.status(200).json({dispatchContracts: dispatchContracts})
      break

    case 'POST':
      const post = JSON.parse(req.body)
      console.log(post)
      await PersonalContractsYearly.create(post);
      res.status(200).json({})
      break

    case 'PUT':
      const put = JSON.parse(req.body)
      await PersonalContractsYearly.update(put, {where: {id: put.id}});
      res.status(200).json({})
      break

    case 'DELETE':
      const destroy = JSON.parse(req.body)
      await PersonalContractsYearly.destroy({where: {id: destroy.id}});
      res.status(200).json({})
      break

    default:
  }
}
