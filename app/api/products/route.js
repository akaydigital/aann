import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
export async function GET(){return NextResponse.json(await prisma.product.findMany({orderBy:{createdAt:'desc'}}));}
export async function POST(req){
 const user=getUserFromRequest(req); if(user?.role!=='ADMIN') return NextResponse.json({error:'Admin only'},{status:403});
 const d=await req.json();
 const product=await prisma.product.create({data:{name:d.name,description:d.description,price:Number(d.price),imageUrl:d.imageUrl,fileUrl:d.fileUrl,active:d.active!==false}});
 return NextResponse.json(product);
}
