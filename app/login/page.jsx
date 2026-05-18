'use client';
import {useState} from 'react';
import Link from 'next/link';
export default function Login(){const [err,setErr]=useState('');async function submit(e){e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch('/api/auth/login',{method:'POST',body:JSON.stringify(data)});if(r.ok) location.href='/'; else setErr((await r.json()).error)}return <form className="form" onSubmit={submit}><h2>Login</h2><input className="input" name="email" type="email" placeholder="Email" required/><input className="input" name="password" type="password" placeholder="Password" required/>{err&&<p style={{color:'red'}}>{err}</p>}<button className="btn">Masuk</button><p>Belum punya akun? <Link href="/register">Daftar</Link></p></form>}
