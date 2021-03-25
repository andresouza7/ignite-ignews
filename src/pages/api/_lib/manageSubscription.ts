import { query as q } from "faunadb"
import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe"

export async function saveSubscription(
  subscriptionId: string,
  customerId: string
) {
  console.log(subscriptionId, customerId)
  // search in db for customer with customerId
  let userRef;
  try {
    userRef = await fauna.query(
      q.Select(
        "ref",
        q.Get(
          q.Match(
            q.Index("user_by_stripe_customer_id",
              customerId
            )
          )
        )
      )
    )
  } catch (error) {
    console.log(error)
  }

  console.log(userRef)

  // save subscription data to fauna db
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    console.log(subscription)

    const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id
    }

    console.log(subscriptionData)

    await fauna.query(
      q.Create(
        q.Collection("subscriptions"),
        { data: subscriptionData }
      )
    )
  } catch (error) {
    console.log(error)
  }

}