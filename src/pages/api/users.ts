import {NextApiRequest, NextApiResponse} from "next"

// JWT token
// Next Auth (social)
// AWS

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {id: 1, name: "andre"},
    {id: 2, name: "rodrigo"}
  ]

  return response.json(users)

}