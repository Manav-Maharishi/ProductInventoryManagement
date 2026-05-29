import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

const navigate =
useNavigate();

const [username,setUsername]=
useState("");

const [password,setPassword]=
useState("");

async function signup(){

try{

const response=
await fetch(
"http://localhost:5037/api/Auth/register",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
username,
password
})
}
);

if(!response.ok){

alert(
"Username already exists"
);

return;

}

alert(
"Signup successful"
);

navigate(
"/login"
);

}

catch{

alert(
"Signup failed"
);

}

}

return(

<>

<style>{`

@import url(
'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap'
);

.signup-root{

min-height:100vh;

display:flex;

justify-content:center;

align-items:center;

padding:
40px
24px;

background:
#0a0b0f;

position:relative;

overflow:hidden;

font-family:
'DM Sans',
sans-serif;

}

.signup-root::before{

content:'';

position:fixed;

inset:0;

background:

radial-gradient(
ellipse
70%
50%
at
50%
0%,

rgba(
90,
100,
160,
0.14
),

transparent
70%
),

radial-gradient(
ellipse
55%
40%
at
85%
80%,

rgba(
60,
70,
120,
0.07
),

transparent
60%
);

pointer-events:none;

}

.signup-card{

position:relative;

z-index:1;

width:100%;

max-width:460px;

background:
rgba(
15,
17,
23,
0.80
);

backdrop-filter:
blur(
24px
);

border:
1px solid
rgba(
255,
255,
255,
0.06
);

border-radius:
28px;

padding:
54px
46px;

display:flex;

flex-direction:column;

box-shadow:
0
36px
72px
rgba(
0,
0,
0,
0.45
);

animation:
appear
.7s
cubic-bezier(
0.22,
1,
0.36,
1
);

}

@keyframes appear{

from{

opacity:0;

transform:
translateY(
20px
);

}

to{

opacity:1;

transform:
translateY(
0
);

}

}

.signup-eyebrow{

font-size:
11px;

font-weight:
600;

letter-spacing:
0.14em;

text-transform:
uppercase;

color:
rgba(
232,
234,
240,
0.30
);

margin-bottom:
24px;

}

.signup-title{

font-size:
44px;

font-weight:
700;

letter-spacing:
-.04em;

line-height:
1.05;

color:
rgba(
232,
234,
240,
0.95
);

margin-bottom:
14px;

}

.signup-sub{

font-size:
14px;

line-height:
1.8;

color:
rgba(
232,
234,
240,
0.42
);

margin-bottom:
36px;

}

.input{

height:
54px;

padding:
0
18px;

background:
rgba(
255,
255,
255,
0.03
);

border:
1px solid
rgba(
255,
255,
255,
0.07
);

border-radius:
14px;

outline:none;

color:
white;

font-size:
14px;

margin-bottom:
14px;

transition:
all
.25s
ease;

}

.input::placeholder{

color:
rgba(
232,
234,
240,
0.25
);

}

.input:focus{

background:
rgba(
255,
255,
255,
0.05
);

border-color:
rgba(
255,
255,
255,
0.16
);

box-shadow:
0
0
0
4px
rgba(
140,
160,
255,
0.08
);

}

.signup-btn{

margin-top:
10px;

height:
56px;

border:none;

border-radius:
14px;

background:
rgba(
232,
234,
240,
0.95
);

color:
#0a0b0f;

font-size:
15px;

font-weight:
600;

cursor:pointer;

transition:
all
.3s
cubic-bezier(
0.22,
1,
0.36,
1
);

}

.signup-btn:hover{

transform:
translateY(
-2px
);

background:
white;

box-shadow:
0
14px
30px
rgba(
0,
0,
0,
0.35
);

}

.signup-footer{

margin-top:
26px;

font-size:
12px;

text-align:center;

color:
rgba(
232,
234,
240,
0.22
);

}

`}</style>

<div className="signup-root">

<div className="signup-card">

<div className="signup-eyebrow">

Create Account

</div>

<h1 className="signup-title">

Join Inventory

</h1>

<p className="signup-sub">

Create your account and start managing inventory.

</p>

<input
className="input"

placeholder="Username"

value={username}

onChange={
e=>
setUsername(
e.target.value
)
}
/>

<input
className="input"

type="password"

placeholder="Password"

value={password}

onChange={
e=>
setPassword(
e.target.value
)
}
/>

<button
className="signup-btn"

onClick={signup}
>

Create Account

</button>

<div className="signup-footer">

Secure · Fast · Enterprise Ready

</div>

</div>

</div>

</>

);

}

export default Signup;