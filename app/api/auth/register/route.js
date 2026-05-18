import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signUser } from '@/lib/auth';
export async function POST(req){
 const {name,email,password}=await req.json();
 if(!name||!email||!password) return NextResponse.json({error:'Data belum lengkap'},{status:400});
 const exists=await prisma.user.findUnique({where:{email}});
 if(exists) return NextResponse.json({error:'Email sudah terdaftar'},{status:400});
 const user=await prisma.user.create({data:{name,email,password:await bcrypt.hash(password,10)}});
 const res=NextResponse.json({ok:true});
 res.cookies.set('token',signUser(user),{httpOnly:true,path:'/',maxAge:60*60*24*7});
 return res;
}
