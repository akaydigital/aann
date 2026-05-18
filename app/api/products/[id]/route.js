import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
export async function PUT(req,{params}){const user=getUserFromRequest(req); if(user?.role!=='ADMIN') return NextResponse.json({error:'Admin only'},{status:403}); const d=await req.json(); return NextResponse.json(await prisma.product.update({where:{id:Number(params.id)},data:{name:d.name,description:d.description,price:Number(d.price),imageUrl:d.imageUrl,fileUrl:d.fileUrl,active:!!d.active}}));}
export async function DELETE(req,{params}){const user=getUserFromRequest(req); if(user?.role!=='ADMIN') return NextResponse.json({error:'Admin only'},{status:403}); await prisma.product.delete({where:{id:Number(params.id)}}); return NextResponse.json({ok:true});}
