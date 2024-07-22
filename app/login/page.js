var passport = require('passport');
import { authenticate } from '@/lib/auth'

import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'

// https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations

export default function Page() {
  
  return (
    <section>
      <h1>Sign in</h1>
      <form action={myLogin} method="post">
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required />
        </section>
        <button type="submit">Sign in</button>
      </form>
    </section>
  )
}

async function myLogin(formData) {
  'use server'
  
  console.log('myLogin....')
  console.log('headers:');
  console.log(headers())
  console.log('cookies:')
  console.log(cookies())
  
  var user = await authenticate('local', formData)
  console.log(user);
  redirect('/')
}
