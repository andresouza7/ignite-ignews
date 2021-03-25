import { query as q } from "faunadb"
import { NextApiRequest, NextApiResponse } from "next"
import { fauna } from "../../services/fauna"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = "cus_JBHEaPqxL2upwj"
    const userRef = await fauna.query(
      q.Select(
        "ref",
        q.Get(
          q.Match(
            q.Index("user_by_stripe_customer_id"
            ),
            user
          )
        )
      )
    )
    return res.json(userRef)
  } catch (error) {
    return res.json(error)
  }


}