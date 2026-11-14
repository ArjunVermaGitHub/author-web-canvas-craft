import React, { useState } from 'react';
import BookButton from '@/components/BookButton';

export type Order = {
  orderId: string; createdAt: string; name: string; phone: string; email?: string; address?: string;
  pincode?: string; amount: number; status?: string; message?: string | null;
  paymentMethod?: string; paymentId?: string; paidAt?: string;
};
type Filter = 'pending_verification' | 'paid' | 'cancelled' | 'all';
const FILTERS: [Filter, string][] = [['all', 'All'], ['pending_verification', 'Pending'], ['paid', 'Paid'], ['cancelled', 'Cancelled']];
const LABEL: Record<string, string> = { pending_verification: 'Pending', paid: 'Paid', cancelled: 'Cancelled' };
const statusOf = (o: Order) => (o.status === 'paid' || o.status === 'cancelled' ? o.status : 'pending_verification');
const indiaTime = (d: string) =>
  new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const OrderLog = ({ code, orders, setOrders }: { code: string; orders: Order[]; setOrders: (fn: (o: Order[]) => Order[]) => void }) => {
  const [filter, setFilter] = useState<Filter>('pending_verification');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const change = async (orderId: string, status: string) => {
    setError('');
    setBusy(orderId);
    try {
      const res = await fetch('/api/owner-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, orderId, status }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setOrders((list) => list.map((o) => (o.orderId === orderId ? { ...o, status: body.status } : o)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy('');
    }
  };

  const shown = orders.filter((o) => filter === 'all' || statusOf(o) === filter);

  return (
    <section className="border-t-4 border-lapis pt-4 mt-2" aria-labelledby="orderlog-heading">
      <h2 id="orderlog-heading" className="font-serif text-2xl mb-3">Order log</h2>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter orders">
        {FILTERS.map(([key, label]) => (
          <BookButton key={key} type="button" variant={filter === key ? 'primary' : 'outline'} onClick={() => setFilter(key)}>
            {label}
          </BookButton>
        ))}
      </div>
      {error && <p role="alert" className="mb-3 border-l-4 border-carnelian pl-4">{error}</p>}
      {shown.length === 0 ? <p>No orders here.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b-2 border-lapis">
                <th className="py-2 pr-4">Order ID</th><th className="py-2 pr-4">Date and time (India)</th><th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Phone</th><th className="py-2 pr-4">Amount</th><th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Payment method</th><th className="py-2 pr-4">Payment ID</th>
                <th className="py-2 pr-4">Message for the cover</th><th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => {
                const s = statusOf(o);
                return (
                  <tr key={o.orderId} className="border-b border-lapis/30 align-top">
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">{o.orderId}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{indiaTime(o.createdAt)}</td>
                    <td className="py-2 pr-4">
                      {o.name}
                      <details className="mt-1">
                        <summary className="cursor-pointer underline underline-offset-4">Address and email</summary>
                        <p className="break-words">{o.address}{o.pincode ? ` – ${o.pincode}` : ''}</p>
                        <p className="break-all">{o.email || '–'}</p>
                      </details>
                    </td>
                    <td className="py-2 pr-4 whitespace-nowrap">{o.phone}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">₹{o.amount}</td>
                    <td className="py-2 pr-4">{LABEL[s]}</td>
                    <td className="py-2 pr-4">{o.paymentMethod || 'phonepe'}</td>
                    <td className="py-2 pr-4 break-all">{o.paymentId || '–'}</td>
                    <td className="py-2 pr-4 break-words min-w-[10rem]">{o.message || '–'}</td>
                    <td className="py-2">
                      <div className="flex flex-col gap-2 min-w-[9rem]">
                        {s === 'pending_verification' ? (
                          <>
                            <BookButton type="button" disabled={busy === o.orderId} onClick={() => change(o.orderId, 'paid')}>Mark paid</BookButton>
                            <BookButton type="button" variant="outline" disabled={busy === o.orderId} onClick={() => change(o.orderId, 'cancelled')}>Cancel</BookButton>
                          </>
                        ) : (
                          <BookButton type="button" variant="outline" disabled={busy === o.orderId} onClick={() => change(o.orderId, 'pending_verification')}>Back to pending</BookButton>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default OrderLog;
