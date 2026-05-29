import { useEffect, useState } from "react";

function Header() {

const [initial,setInitial]=
useState("");

const [username,setUsername]=
useState("");

const [authRefresh,
setAuthRefresh]=
useState(
0
);

useEffect(()=>{

function refreshAuth(){

const token=
localStorage.getItem(
"token"
);

if(
!token
)
{
setUsername(
""
);

setInitial(
""
);

return;
}

try{

const payload=
JSON.parse(

atob(
token
.split(".")[1]
)

);

const user=

payload[
"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
]

||

payload.name

||

"";

setUsername(
user
);

setInitial(

user
.charAt(0)
.toUpperCase()

);

}

catch{

setUsername(
""
);

setInitial(
""
);

}

}

refreshAuth();

window.addEventListener(
"storage",
refreshAuth
);

window.addEventListener(
"focus",
refreshAuth
);

return ()=>{

window.removeEventListener(
"storage",
refreshAuth
);

window.removeEventListener(
"focus",
refreshAuth
);

};

},[
authRefresh
]);

return(

<>

<style>{`

.header{

position:fixed;

top:0;

left:0;

right:0;

height:76px;

display:flex;

align-items:center;

justify-content:center;

padding:0 32px;

background:
rgba(12,14,19,.82);

backdrop-filter:
blur(24px);

border-bottom:
1px solid rgba(255,255,255,.06);

z-index:1000;

}

.header-title{

display:flex;

align-items:center;

gap:14px;

}

.header-logo{

width:40px;

height:40px;

border-radius:50%;

display:flex;

justify-content:center;

align-items:center;

background:

radial-gradient(
circle,

rgba(
140,
160,
255,
.95
),

rgba(
80,
100,
220,
.5
)
);

box-shadow:

0 0 40px

rgba(
140,
160,
255,
.45
);

font-size:18px;

font-weight:700;

color:white;

}

.header-name{

font-size:18px;

font-weight:700;

letter-spacing:-.02em;

color:
rgba(
232,
234,
240,
.92
);

}

.header-profile{

position:absolute;

right:30px;

display:flex;

align-items:center;

gap:12px;

}

.header-user{

font-size:13px;

color:
rgba(
232,
234,
240,
.55
);

}

.header-avatar{

width:42px;

height:42px;

border-radius:50%;

display:flex;

justify-content:center;

align-items:center;

font-weight:700;

background:

rgba(
79,
120,
200,
.22
);

border:

1px solid
rgba(
140,
160,
255,
.18
);

box-shadow:

0 0 32px

rgba(
140,
160,
255,
.22
);

color:white;

}

`}</style>

<div
className="header"
>

<div
style={{
width:"100px"
}}
/>

<div
className="header-title"
>

<div
className="header-logo"
>
I
</div>

<div
className="header-name"
>
Inventory Management
</div>

</div>

{
username && (

<div
className="header-profile"
>

<div
className="header-user"
>

{username}

</div>

<div
className="header-avatar"
>

{initial}

</div>

</div>

)

}

</div>

</>

);

}

export default Header;