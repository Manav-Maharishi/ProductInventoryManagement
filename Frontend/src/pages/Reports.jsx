import { useEffect, useState } from "react";

function Reports() {

const [products, setProducts] =
useState([]);

const token =
localStorage.getItem("token");

useEffect(() => {

loadProducts();

const interval =
setInterval(
loadProducts,
5000
);

return () =>
clearInterval(interval);

}, []);

function loadProducts() {

fetch(
"http://localhost:5037/api/products",
{
headers:{
Authorization:
`Bearer ${token}`
}
}
)

.then(r=>r.json())

.then(data=>
setProducts(data)
);

}

const lowest =
[...products]

.sort(
(a,b)=>
a.quantity-b.quantity
)

.slice(
0,
5
);

const highest =
[...products]

.sort(
(a,b)=>
b.quantity-a.quantity
)

.slice(
0,
5
);

return(

<>

<style>{`

@import url(
'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'
);

.report-root{

min-height:100vh;

padding:
110px
32px
90px;

background:
#0a0b0f;

font-family:
'DM Sans',
sans-serif;

color:
rgba(
232,
234,
240,
0.92
);

}

.report-root::before{

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
0.12
),

transparent
70%
),

radial-gradient(
ellipse
50%
40%
at
90%
80%,

rgba(
60,
70,
120,
0.06
),

transparent
60%
);

pointer-events:none;

}

.report-content{

position:relative;

z-index:1;

max-width:
900px;

margin:
auto;

}

.report-title{

font-size:
56px;

font-weight:
700;

letter-spacing:
-0.04em;

margin-bottom:
16px;

}

.report-sub{

color:
rgba(
232,
234,
240,
0.42
);

margin-bottom:
70px;

}

.report-grid{

display:grid;

grid-template-columns:
1fr
1fr;

gap:
24px;

}

.report-card{

background:
rgba(
15,
17,
23,
0.78
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
24px;

padding:
34px;

}

.report-card h2{

color:
white;

margin-bottom:
26px;

font-size:
26px;

}

.report-list{

display:flex;

flex-direction:column;

gap:
16px;

}

.report-item{

padding:
14px;

border-radius:
14px;

background:
rgba(
255,
255,
255,
0.03
);

}

.name{

font-size:
18px;

font-weight:
600;

}

.qty{

margin-top:
4px;

color:
rgba(
232,
234,
240,
0.45
);

}

.warn{

color:
#ff8c8c;

}

.good{

color:
#9ed8ff;

}

.time{

margin-top:
50px;

opacity:
0.35;

}

@media(max-width:800px){

.report-grid{

grid-template-columns:
1fr;

}

}

`}</style>

<div className="report-root">

<div className="report-content">

<h1 className="report-title">
Inventory Reports
</h1>

<p className="report-sub">

Live inventory analysis —
updates automatically.

</p>

<div className="report-grid">

<div className="report-card">

<h2>
⚠ Low Stock Alert
</h2>

<div className="report-list">

{
lowest.map(
p=>(

<div
key={p.id}
className="report-item"
>

<div className="name">

•
{p.name}

</div>

<div className="qty warn">

Only
{" "}
{p.quantity}
{" "}
left
—
Restock recommended!

</div>

</div>

)
)

}

</div>

</div>

<div className="report-card">

<h2>

✓ Highest Availability

</h2>

<div className="report-list">

{

highest.map(
p=>(

<div
key={p.id}
className="report-item"
>

<div className="name">

•
{p.name}

</div>

<div className="qty good">

Quantity:
{" "}

{p.quantity}

</div>

</div>

)
)

}

</div>

</div>

</div>

<div className="time">

Generated from current inventory

</div>

</div>

</div>

</>

);

}

export default Reports;