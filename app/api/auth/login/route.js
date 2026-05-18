import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signUser } from '@/lib/auth';
export async function POST(req){
 const {email,password}=await req.json();
 const user=await prisma.user.findUnique({where:{email}});
 if(!user||!(await bcrypt.compare(password,user.password))) return NextResponse.json({error:'Email atau password salah'},{status:401});
 const res=NextResponse.json({ok:true,user:{name:user.name,role:user.role}});
 res.cookies.set('token',signUser(user),{httpOnly:true,path:'/',maxAge:60*60*24*7});
 return res;
}
