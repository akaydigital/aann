import Link from 'next/link';
import { prisma } from '@/lib/prisma';
function rupiah(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)}
export default async function Product({params}){
 const p = await prisma.product.findUnique({where:{id:Number(params.id)}});
 if(!p) return <main className="container">Produk tidak ditemukan</main>;
 return <main className="container"><Link href="/">← Kembali</Link><div className="hero"><img className="card img" style={{height:420}} src={p.imageUrl}/><div><h1>{p.name}</h1><p className="muted">{p.description}</p><div className="price">{rupiah(p.price)}</div><br/><Link className="btn" href={`/checkout?productId=${p.id}`}>Beli Sekarang</Link></div></div></main>
}
