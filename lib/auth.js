var passport = require('passport');
var LocalStrategy = require('passport-local');

import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'


class Request {
  constructor() {
  }
}

class Response {
  constructor() {
  }
  
  end() {
    if (this.onEnd) { this.onEnd(); }
  }
}

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
//
// usable as a Server Action
export async function authenticate(strategy, formData) {
  'use server'
  
  return new Promise((resolve, reject) => {
    var req = new Request();
    
    // https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
    var body = {};
    if (formData) {
      formData.forEach((value, key) => body[key] = value);
      req.body = body;
      
    }
    req.cookieStore = cookies();
    
    var res = new Response();
    res.onEnd = function() {
      if (this.statusCode == 400) {
        // TODO: Error handling in a manner compatible with Next.js
        return reject(new Error('so wrong'))
      }
      return resolve(req.user)
    }
    
    passport.authenticate(strategy)(req, res, function(err) {
      if (err) { return reject(err); }
      
      // TODO: handle assignProperty option
      // TODO: handle authInfo
      // TODO: what happens with redirect options?
      
      resolve(req.user);
      
      //redirect('/')
      //reject(redirect('/'))
      
      /*
      try {
        redirect('/');
      } catch (ex) {
        console.log(ex)
      }
      */
    });
  })
}

class SessionStrategy {
  constructor() {
    
  }
  
  authenticate(req, options) {
    const username = req.cookieStore.get('username')
    if (username) {
      req.user = { username: username.value }
    }
    
    return this.pass();
  }
}

passport.use('session', new SessionStrategy());


passport.use(new LocalStrategy(function verify(username, password, cb) {
  process.nextTick(function() {
    return cb(null, { username: username })
  })
}));


class SessionManager {
  constructor() {
  }
  
  logIn(req, user, options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = {};
    }
    options = options || {};
    
    req.cookieStore.set('username', user.username);
    cb();
  }
}

passport._sm = new SessionManager();

