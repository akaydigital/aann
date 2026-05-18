const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main(){
 const email = process.env.ADMIN_EMAIL || 'admin@akay.web.id';
 const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin12345', 10);
 await prisma.user.upsert({ where:{email}, update:{role:'ADMIN'}, create:{name:'Admin', email, password, role:'ADMIN'} });
 await prisma.product.createMany({ data:[
  {name:'Template Website Company Profile', description:'File source code HTML/CSS/JS siap upload hosting.', price:150000, imageUrl:'https://images.unsplash.com/photo-1498050108023-c5249f4df085', fileUrl:'https://example.com/file-template.zip'},
  {name:'Desain Feed Instagram UMKM', description:'Paket 20 template desain Canva untuk promosi digital.', price:99000, imageUrl:'https://images.unsplash.com/photo-1611162617474-5b21e879e113', fileUrl:'https://example.com/desain-canva.zip'}
 ]});
}
main().finally(()=>prisma.$disconnect());
