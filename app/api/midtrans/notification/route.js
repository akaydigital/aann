import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { snap } from '@/lib/midtrans';
export async function POST(req){
 const body=await req.json();
 const status=await snap().transaction.notification(body);
 const orderId=status.order_id;
 const paid=['capture','settlement'].includes(status.transaction_status);
 const failed=['cancel','deny','expire','failure'].includes(status.transaction_status);
 await prisma.order.update({where:{orderId},data:{status: paid?'paid': failed?'failed': status.transaction_status}}).catch(()=>null);
 return NextResponse.json({ok:true});
}
