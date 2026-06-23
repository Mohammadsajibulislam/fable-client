import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'
import { headers } from 'next/headers'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const { ebookId, title, price, coverImage } = await request.json()

        const user = await getUserSession()
        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            images: coverImage ? [coverImage] : [],
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                ebookId,
                userId: user.id,
                userEmail: user.email,
                userName: user.name,
            },
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/ebooks/${ebookId}`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        )
    }
}