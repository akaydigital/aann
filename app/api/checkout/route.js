import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { snap } from '@/lib/midtrans';
export async function POST(req){
 const user=getUserFromRequest(req); if(!user) return NextResponse.json({error:'Silakan login dulu'},{status:401});
 const {productId}=await req.json();
 const product=await prisma.product.findUnique({where:{id:Number(productId)}});
 if(!product) return NextResponse.json({error:'Produk tidak ditemukan'},{status:404});
 const orderId='AKAY-'+Date.now()+'-'+user.id;
 const parameter={transaction_details:{order_id:orderId,gross_amount:product.price},item_details:[{id:String(product.id),price:product.price,quantity:1,name:product.name.slice(0,50)}],customer_details:{first_name:user.name,email:user.email},callbacks:{finish:`${process.env.NEXT_PUBLIC_APP_URL}/checkout-success?order_id=${orderId}`,error:`${process.env.NEXT_PUBLIC_APP_URL}/checkout-failed?order_id=${orderId}`}};
 const trx=await snap().createTransaction(parameter);
 await prisma.order.create({data:{orderId,status:'pending',amount:product.price,snapToken:trx.token,snapUrl:trx.redirect_url,userId:user.id,productId:product.id}});
 return NextResponse.json({token:trx.token,redirect_url:trx.redirect_url,orderId});
}
