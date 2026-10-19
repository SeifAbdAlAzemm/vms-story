// One-off generator: renders Lucide icons (via react-icons) into src/assets/icons/sprite.svg
const React=require("react"),RDS=require("react-dom/server"),lu=require("react-icons/lu"),fs=require("fs");
const names=process.argv.slice(2); let out='<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>\n';
for(const n of names){const C=lu[n]; if(!C) throw new Error('missing '+n);
  const inner=RDS.renderToStaticMarkup(React.createElement(C,{})).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'');
  const id=n.replace(/^Lu/,'').replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
  out+=`<symbol id="i-${id}" viewBox="0 0 24 24">${inner}</symbol>\n`;}
fs.writeFileSync('src/assets/icons/sprite.svg',out+'</defs></svg>\n'); console.log(names.length,'icons');
