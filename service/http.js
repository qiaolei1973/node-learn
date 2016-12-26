const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;
const KEY = 'session_id';
const EXPIRES = 3 * 60 * 1000;
let sessions = {};

http.createServer(function (req, res) {
    let
        _url = urlDispatch(req.url),
        sessionStatus;
    if (!_url) {
        methodDispatch(req.method);
        req.cookies = cookieParse(req.headers.cookie);
        //cookieDispatch(req.cookies, res);
        sessionDispatch(req, res);
        sessionStatus = sessionCheck(req, res);
        //session id 写入cookie
        writeHead(req, res);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (!sessionStatus) {
        res.end('first come!\n');
    } else {
        res.end('come again!\n');
    }
}).listen(PORT, 'localhost');

console.log('Service running at %d', PORT);

//请求格式分析
const methodDispatch = method => {
    switch (method) {
        case "POST":
            console.log("POST")
        case "GET":
        default:
            console.log("GET/other")
    }
}
//路径分析
const urlDispatch = path => {
    const
        _url = url.parse(path),
        query = url.parse(path, true).query;
    if (_url.pathname === '/favicon.ico') {
        return 1;
    }
    console.log("path:%s", _url.pathname);
    console.log("querystring:", Object.assign({}, query));
}

//解析cookie
const cookieParse = cookie => {
    let
        cookies = {},
        list,
        pair;
    if (!cookie) {
        return cookies;
    }
    list = cookie.split(';');
    list.map(item => {
        pair = item.split('=');
        cookies[pair[0].trim()] = pair[1];
    })
    return cookies;
}

//生成cookie格式报文
const seralizeCookie = (name, val, opt = {}) => {
    let pairs = [name + '=' + val];

    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');
    return pairs.join(';');
}

//cookie分析
const cookieDispatch = (cookie, res) => {
    console.log('cookie:', cookie);
    if (!cookie || cookie && !cookie.isVisit) {
        res.setHeader('Set-Cookie', seralizeCookie('isVisit', 1));
        return 1;
    }
    return 0;
}

//生成session
const sessionGenerate = () => {
    let session = {};

    session.id = + new Date() + Math.random();
    session.cookie = {
        expire: + new Date + EXPIRES
    };
    sessions[session.id] = session;
    return session;
}

const sessionDispatch = (req, res) => {
    const id = req.cookies[KEY];
    let
        session,
        expire;
    if (!id) {
        req.session = sessionGenerate();
    } else {
        session = sessions[id];
        if (session) {
            expire = session.cookie.expire;
            if (expire > +new Date()) {
                expire = new Date + EXPIRES;
                req.session = session;
            } else {
                delete session[id];
                req.session = sessionGenerate();
            }
        } else {
            req.session = sessionGenerate();
        }
    }
}

const sessionCheck = (req, res) => {
    let session = req.session;
    if (!session || session && !session.isVisit) {
        req.session.isVisit = true;
        return false;
    }
    return true;
}

const writeHead = (req, res) => {
    let cookies = res.getHeader('Set-Cookie');
    let session = seralizeCookie(KEY, req.session.id);
    if (cookies) {
        cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    } else {
        cookies = session;
    }
    res.setHeader('Set-Cookie', cookies);
}