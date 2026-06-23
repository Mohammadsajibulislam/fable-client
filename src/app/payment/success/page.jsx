import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MdCheckCircle } from 'react-icons/md'

export default async function PaymentSuccessPage({ searchParams }) {
    const { session_id } = await searchParams

    if (!session_id) redirect('/')

    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.status !== 'complete') redirect('/')

    const { ebookId, userId, userEmail, userName } = session.metadata

    // Purchase save করো
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ebookId,
            userId,
            userEmail,
            userName,
            amount: session.amount_total / 100,
            stripeSessionId: session_id,
            status: 'completed',
        }),
    })

    // Transaction save করো
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'purchase',
            userId,
            userEmail,
            ebookId,
            amount: session.amount_total / 100,
            stripeSessionId: session_id,
            status: 'completed',
        }),
    })

    // Ebook isSold update করো
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ebooks/${ebookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSold: true }),
    })

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: '#0A1A0F' }}
        >
            <div className="text-center space-y-6 max-w-md">

                {/* Success Icon */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                    style={{
                        backgroundColor: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.3)',
                    }}
                >
                    <MdCheckCircle size={40} style={{ color: '#22C55E' }} />
                </div>

                <div>
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#F0FDF4',
                        }}
                    >
                        Payment Successful!
                    </h1>
                    <p className="text-sm" style={{ color: '#6B9E7A' }}>
                        Your ebook has been added to your library.
                    </p>
                </div>

                {/* Info */}
                <div
                    className="rounded-2xl p-5 text-left space-y-3"
                    style={{
                        backgroundColor: '#111F16',
                        border: '1px solid #1E3A26',
                    }}
                >
                    <div className="flex justify-between text-sm">
                        <span style={{ color: '#6B9E7A' }}>Amount paid</span>
                        <span
                            className="font-semibold"
                            style={{ color: '#22C55E' }}
                        >
                            ${(session.amount_total / 100).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: '#6B9E7A' }}>Email</span>
                        <span style={{ color: '#F0FDF4' }}>
                            {session.customer_details?.email}
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                    <Link
                        href="/dashboard/user/my-books"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{
                            backgroundColor: '#22C55E',
                            color: '#0A1A0F',
                        }}
                    >
                        Go to My Books
                    </Link>
                    <Link
                        href="/ebooks"
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                        style={{
                            backgroundColor: '#111F16',
                            border: '1px solid #1E3A26',
                            color: '#86EFAC',
                        }}
                    >
                        Browse More
                    </Link>
                </div>
            </div>
        </div>
    )
}