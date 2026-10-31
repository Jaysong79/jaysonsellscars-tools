/* JaysonSellsCars Build & Price — build summary + payment calculator.
   Loaded by the /build-price embed block; renders into #jscv-summary using the block's bridge.
   Data: Mitsubishi Canada configurator, BC (Kelowna), harvested Oct 30-31, 2026 (programs to Nov 2, 2026).
   Lease formula verified exact vs Mitsubishi's calculator; finance is standard amortization. */
(function(){
  const B=window.__jscvBridge; if(!B) return;
  const builder=B.builder, VEHICLES=B.VEHICLES, money=B.money;
  const root=builder.querySelector('#jscv-summary'); if(!root) return;
  const PAYDATA={"fees":{"ehc":5.24,"air":100,"admin":799,"leaseAdmin":350},"leaseRateExceptions":{"eclipse-cross":{"24":2.99}},"models":{"outlander-phev":{"freight":2125,"tire":26.0,"leaseRate":5.99,"finRates":{"36":4.99,"48":4.99,"60":4.99,"72":4.99,"84":4.99},"finDefault":84,"trims":{"ES S-AWC":{"rebate":0,"res":{"60":22150.35,"48":25595.96,"36":30026.03,"24":32979.41},"paint":{"U25":0,"P62":450,"W85":450,"X42":300,"D14":150,"U28":150}},"SE S-AWC":{"rebate":4250,"res":{"60":23025.66,"48":26863.27,"36":31249.11,"24":34538.49},"paint":{"U25":0,"P62":450,"W85":450,"X42":300,"D14":150,"U28":150}},"LE S-AWC":{"rebate":4250,"res":{"60":23949.66,"48":27941.27,"36":32503.11,"24":35924.49},"paint":{"U25":0,"P62":450,"W85":450,"D14":150,"U28":150,"X47":450}},"SEL S-AWC":{"rebate":4250,"res":{"60":25314.66,"48":29313.27,"36":34099.11,"24":37688.49},"paint":{"U25":0,"P62":450,"W85":450,"U35":450,"D14":150,"U28":150,"X47":450}},"GT S-AWC":{"rebate":4250,"res":{"60":26385.66,"48":30783.27,"36":35809.11,"24":39578.49},"paint":{"U25":0,"XP2":900,"D14":150,"XFU":600,"XGU":900,"P62":450,"XW4":900,"W85":450,"U35":450,"U2X":900,"U28":150,"X47":450}},"GT Premium S-AWC":{"rebate":4250,"res":{"60":26847.66,"48":31322.27,"36":36436.11,"24":40271.49},"paint":{"U25":0,"D14":150,"XFU":600,"XGU":900,"XW4":900,"W85":450,"U35":450,"U2X":900,"U28":150,"X47":450}},"GT NOIR S-AWC":{"rebate":4250,"res":{"60":27666.66,"48":32277.77,"36":37547.61,"24":41499.99},"paint":{"XP2":900,"XFU":600,"XW4":900,"X47":450}}}},"outlander":{"freight":2125,"tire":26.0,"leaseRate":2.9,"finRates":{"36":1.99,"48":0.49,"60":0.49,"72":0.49,"84":1.99},"finDefault":84,"trims":{"ES S-AWC":{"rebate":0,"res":{"60":15835.43,"48":18925.27,"36":22401.34,"24":24718.72},"paint":{"U25":0,"P62":450,"W85":450,"X42":300,"D14":150,"U28":150}},"SE S-AWC":{"rebate":0,"res":{"60":16942.43,"48":20248.27,"36":23967.34,"24":26859.95},"paint":{"U25":0,"P62":450,"W85":450,"X42":300,"D14":150,"U28":150}},"LE S-AWC":{"rebate":0,"res":{"60":17769.2,"48":20878.81,"36":25765.34,"24":28874.95},"paint":{"U25":0,"P62":450,"W85":450,"D14":150,"U28":150,"X47":450}},"SEL S-AWC":{"rebate":0,"res":{"60":18377.97,"48":22619.04,"36":27331.34,"24":30629.95},"paint":{"U25":0,"P62":450,"W85":450,"U35":450,"D14":150,"U28":150,"X47":450}},"GT S-AWC":{"rebate":0,"res":{"60":21337.89,"48":24811.5,"36":28781.34,"24":33743.64},"paint":{"U25":0,"XFU":600,"XGU":900,"P62":450,"XW4":900,"W85":450,"U35":450,"D14":150,"U28":150,"X47":450,"U2X":900,"XP2":900}},"GT Premium S-AWC":{"rebate":0,"res":{"60":21261.66,"48":24805.27,"36":29361.34,"24":32398.72},"paint":{"U25":0,"XFU":600,"XGU":900,"XW4":900,"W85":450,"U35":450,"D14":150,"U28":150,"X47":450,"U2X":900}},"NOIR S-AWC":{"rebate":0,"res":{"60":22017.66,"48":25687.27,"36":30405.34,"24":33550.72},"paint":{"X47":450,"XW4":900,"XFU":600,"XP2":900}}}},"eclipse-cross":{"freight":2255,"tire":32.5,"leaseRate":3.49,"finRates":{"36":3.99,"48":2.49,"60":2.99,"72":2.99,"84":3.99,"96":3.99},"finDefault":96,"trims":{"ES S-AWC":{"rebate":500,"res":{"60":13504.26,"48":16719.56,"36":19291.8,"24":21542.51},"paint":{"U25":0,"X42":300,"W85":450,"U17":150,"D06":300,"P62":450}},"SE S-AWC":{"rebate":500,"res":{"60":14974.26,"48":18539.56,"36":21391.8,"24":23530.98},"paint":{"U25":0,"X42":300,"W85":450,"U17":150,"D06":300,"P62":450}},"NOIR S-AWC":{"rebate":500,"res":{"60":16612.26,"48":20567.56,"36":24127.33,"24":26896.04},"paint":{"X42":300,"W85":450,"U17":150,"P62":450}},"GT S-AWC":{"rebate":500,"res":{"60":16913.73,"48":20626.5,"36":24339.27,"24":27226.98},"paint":{"U25":0,"X42":300,"W85":450,"U17":150,"D06":300,"P62":450}}}},"rvr":{"freight":2125,"tire":32.5,"leaseRate":3.49,"finRates":{"36":2.99,"48":0.0,"60":1.99,"72":1.99,"84":1.99,"96":2.99},"finDefault":96,"trims":{"ES FWD":{"rebate":0,"res":{"60":11433.66,"48":13611.5,"36":16061.57,"24":18511.64},"paint":{"U25":0,"W85":450,"X42":300,"C22":150,"U17":150,"D06":300,"M11":150,"P62":450}},"ES AWC":{"rebate":0,"res":{"60":12273.66,"48":14611.5,"36":17241.57,"24":19871.64},"paint":{"U25":0,"W85":450,"X42":300,"C22":150,"U17":150,"D06":300,"M11":150,"P62":450}},"SE AWC":{"rebate":0,"res":{"60":13113.66,"48":15611.5,"36":18421.57,"24":21231.64},"paint":{"U25":0,"W85":450,"X42":300,"C22":150,"U17":150,"D06":300,"M11":150,"P62":450}},"SEL AWC":{"rebate":0,"res":{"60":13489.2,"48":16187.04,"36":19222.11,"24":21919.95},"paint":{"U25":0,"W85":450,"X42":300,"C22":150,"U17":150,"D06":300,"M11":150,"P62":450}},"NOIR AWC":{"rebate":0,"res":{"60":15630.12,"48":18471.96,"36":21313.8,"24":24510.87},"paint":{"X42":300,"W85":450,"U17":150,"P62":450}},"GT AWC":{"rebate":0,"res":{"60":15671.43,"48":18729.27,"36":22551.57,"24":25609.41},"paint":{"U25":0,"W85":450,"X42":300,"C22":150,"U17":150,"D06":300,"M11":150,"P62":450}}}},"eclipse-sportback":{"freight":2255,"tire":26.0,"leaseRate":5.99,"finRates":{"36":4.99,"48":4.99,"60":4.99,"72":4.99,"84":4.99},"finDefault":84,"trims":{"EV":{"rebate":0,"res":{"60":17460.02,"48":23108.85,"36":29271.21,"24":30811.8},"paint":{"GAT":300,"KAD":0,"NAW":150,"QBE":300,"RCJ":300}},"EV Tech Pkg":{"rebate":0,"res":{"60":19194.02,"48":25403.85,"36":32178.21,"24":33871.8},"paint":{"GAT":300,"KAD":0,"NAW":150,"QBE":300,"RCJ":300}}}}}};
  const money2=value=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
  root.innerHTML="          <span class=\"jscv-label\">3. Your build summary</span>\n          <div class=\"jscv-sum-lines\">\n            <div class=\"jscv-sum-line\"><span id=\"jscv-sum-colour-name\">Colour</span><span id=\"jscv-sum-colour-price\">Included</span></div>\n            <div class=\"jscv-sum-line jscv-sum-total\"><span>MSRP as built</span><strong id=\"jscv-sum-msrp\">\u2014</strong></div>\n            <p class=\"jscv-sum-pay\" id=\"jscv-sum-lease-line\"></p>\n            <p class=\"jscv-sum-pay\" id=\"jscv-sum-fin-line\"></p>\n          </div>\n          <button type=\"button\" class=\"jscv-calc-toggle\" id=\"jscv-calc-toggle\" aria-expanded=\"false\">Payment calculator</button>\n          <div class=\"jscv-calc\" id=\"jscv-calc\" hidden>\n            <div class=\"jscv-tabs\" role=\"tablist\" aria-label=\"Payment type\">\n              <button type=\"button\" class=\"jscv-tab is-active\" data-tab=\"lease\" role=\"tab\">Lease<strong id=\"jscv-tab-lease\"></strong></button>\n              <button type=\"button\" class=\"jscv-tab\" data-tab=\"finance\" role=\"tab\">Finance<strong id=\"jscv-tab-fin\"></strong></button>\n              <button type=\"button\" class=\"jscv-tab\" data-tab=\"cash\" role=\"tab\">Cash<strong id=\"jscv-tab-cash\"></strong></button>\n            </div>\n            <div id=\"jscv-calc-controls\"></div>\n            <fieldset class=\"jscv-rebates\">\n              <legend>Available rebates (for eligible customers)</legend>\n              <label><input type=\"checkbox\" id=\"jscv-reb-ratered\"> Loyalty rate reduction (1%)</label>\n              <label><input type=\"checkbox\" id=\"jscv-reb-loyalty\"> Loyalty rebate ($500)</label>\n              <label><input type=\"checkbox\" id=\"jscv-reb-edu\"> Education Edge ($500)</label>\n              <label><input type=\"checkbox\" id=\"jscv-reb-mob\"> Mobility ($500)</label>\n              <label><input type=\"checkbox\" id=\"jscv-reb-mil\"> Military / First Responders ($500)</label>\n            </fieldset>\n            <div class=\"jscv-calc-result\" id=\"jscv-calc-result\"></div>\n            <button type=\"button\" class=\"jscv-break-toggle\" id=\"jscv-break-toggle\" aria-expanded=\"false\">Cost breakdown</button>\n            <div class=\"jscv-breakdown\" id=\"jscv-breakdown\" hidden></div>\n            <p class=\"jscv-calc-note\">Payment estimates use Mitsubishi Canada's published programs with freight, fees and BC taxes (5% GST + 7% PST) included. Estimates only \u2014 not an offer or an approval of credit, and programs can change. The dealer may sell for less. Jayson will confirm your final price, payment and rebate eligibility.</p>\n          </div>\n        ";
  const style=document.createElement('style'); style.textContent=".jscv-summary{margin-top:26px;border-top:1px solid var(--jscv-line);padding-top:20px}\n.jscv-sum-lines{margin:10px 0 4px}\n.jscv-sum-line{display:flex;justify-content:space-between;gap:14px;padding:7px 0;border-bottom:1px dashed var(--jscv-line);font-size:.98rem}\n.jscv-sum-total{border-bottom:2px solid #15191d;font-size:1.05rem}\n.jscv-sum-pay{margin:8px 0 0;font-weight:600}\n.jscv-calc-toggle,.jscv-break-toggle{margin-top:14px;background:#15191d;color:#fff;border:0;border-radius:10px;padding:11px 18px;font:inherit;font-weight:600;cursor:pointer}\n.jscv-break-toggle{background:#fff;color:#15191d;border:1px solid var(--jscv-line)}\n.jscv-calc{margin-top:16px;border:1px solid var(--jscv-line);border-radius:14px;padding:16px;background:#fafbfc}\n.jscv-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}\n.jscv-tab{background:#fff;border:1px solid var(--jscv-line);border-radius:10px;padding:9px 6px;font:inherit;cursor:pointer;display:flex;flex-direction:column;gap:2px;align-items:center}\n.jscv-tab strong{font-size:.92rem}\n.jscv-tab.is-active{border-color:var(--jscv-red);box-shadow:inset 0 0 0 1px var(--jscv-red)}\n.jscv-ctl{margin-bottom:12px}\n.jscv-ctl>span,.jscv-ctl>label{display:block;font-size:.85rem;font-weight:600;margin-bottom:6px}\n.jscv-btnrow{display:flex;flex-wrap:wrap;gap:6px}\n.jscv-cbtn{background:#fff;border:1px solid var(--jscv-line);border-radius:999px;padding:7px 13px;font:inherit;cursor:pointer}\n.jscv-cbtn.is-on{background:var(--jscv-red);border-color:var(--jscv-red);color:#fff}\n.jscv-money{width:100%;max-width:220px;padding:9px 11px;border:1px solid var(--jscv-line);border-radius:9px;font:inherit;background:#fff}\n.jscv-freqsel{max-width:220px}\n.jscv-rebates{border:1px solid var(--jscv-line);border-radius:10px;padding:10px 12px;margin:4px 0 14px;background:#fff}\n.jscv-rebates legend{font-size:.85rem;font-weight:600;padding:0 4px}\n.jscv-rebates label{display:block;padding:4px 0;font-size:.95rem}\n.jscv-calc-result{border-top:1px solid var(--jscv-line);padding-top:12px}\n.jscv-calc-big{font-size:1.7rem;font-weight:700;margin:0}\n.jscv-calc-big span{font-size:1rem;font-weight:600}\n.jscv-calc-sub{margin:5px 0 0;color:#3c434a}\n.jscv-breakdown{margin-top:12px}\n.jscv-btable{width:100%;border-collapse:collapse;font-size:.94rem}\n.jscv-btable td{padding:6px 2px;border-bottom:1px dashed var(--jscv-line)}\n.jscv-btable td:last-child{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}\n.jscv-btable tr.jscv-btotal td{border-bottom:2px solid #15191d;font-weight:700}\n.jscv-calc-note{font-size:.82rem;color:#3c434a;margin:14px 0 0}\n"; root.appendChild(style);
  const calcState={tab:'lease',leaseTerm:60,finTerm:0,km:16000,down:'',trade:'',freq:'weekly',rateRed:false,rebLoyalty:false,rebEdu:false,rebMob:false,rebMil:false,open:false,breakOpen:false};
  let payModelSeen='';
  const sumColourName=root.querySelector('#jscv-sum-colour-name'),sumColourPrice=root.querySelector('#jscv-sum-colour-price'),
        sumMsrp=root.querySelector('#jscv-sum-msrp'),sumLeaseLine=root.querySelector('#jscv-sum-lease-line'),
        sumFinLine=root.querySelector('#jscv-sum-fin-line'),calcToggle=root.querySelector('#jscv-calc-toggle'),
        calcPanel=root.querySelector('#jscv-calc'),calcControls=root.querySelector('#jscv-calc-controls'),
        calcResult=root.querySelector('#jscv-calc-result'),breakToggle=root.querySelector('#jscv-break-toggle'),
        breakBox=root.querySelector('#jscv-breakdown');
  const tabBtns=[...root.querySelectorAll('.jscv-tab')];
  const tabFig={lease:root.querySelector('#jscv-tab-lease'),fin:root.querySelector('#jscv-tab-fin'),cash:root.querySelector('#jscv-tab-cash')};
  const rebBoxes={rateRed:root.querySelector('#jscv-reb-ratered'),loyalty:root.querySelector('#jscv-reb-loyalty'),
        edu:root.querySelector('#jscv-reb-edu'),mob:root.querySelector('#jscv-reb-mob'),mil:root.querySelector('#jscv-reb-mil')};
  function freqWord(f){return f==='weekly'?'Weekly':f==='biweekly'?'Biweekly':'Monthly'}
  function payParts(monthly,f){const pre=f==='weekly'?monthly*12/52:f==='biweekly'?monthly*12/24:monthly;return{pre,gst:pre*0.05,pst:pre*0.07,incl:pre*1.12}}
  function computeBuild(s,st){
    const v=VEHICLES[st.model],t=v.trims[st.trimIndex],M=PAYDATA.models[st.model],pd=M.trims[t.name]||{rebate:0,res:{},paint:{}};
    const cp=(st.code&&pd.paint&&pd.paint[st.code]!=null)?pd.paint[st.code]:0;
    const asBuilt=t.msrp+cp;
    const feeRows=[['Environment Handling Fee (EHC)',PAYDATA.fees.ehc],['Tire Recycling Fee',M.tire],['Air Tax',PAYDATA.fees.air],['Dealer Admin fee',PAYDATA.fees.admin],['Freight & PDI',M.freight]];
    const feesSum=feeRows.reduce((a,f)=>a+f[1],0);
    const progRebate=pd.rebate||0;
    const extra=(s.rebLoyalty?500:0)+(s.rebEdu?500:0)+(s.rebMob?500:0)+(s.rebMil?500:0);
    const down=Math.max(0,parseFloat(s.down)||0),trade=Math.max(0,parseFloat(s.trade)||0);
    const lTerm=s.leaseTerm;let lRate=M.leaseRate;
    if(PAYDATA.leaseRateExceptions[st.model]&&PAYDATA.leaseRateExceptions[st.model][lTerm]!=null)lRate=PAYDATA.leaseRateExceptions[st.model][lTerm];
    if(s.rateRed)lRate=Math.max(0,lRate-1);
    const lTSP=asBuilt+feesSum+PAYDATA.fees.leaseAdmin-trade;
    const capAdj=Math.max(0,lTSP-progRebate-extra-down);
    let resid=pd.res[lTerm]||0;const dKm=0.01*(asBuilt+M.freight+100);
    if(s.km===20000)resid-=dKm;else if(s.km===24000)resid-=3*dKm;
    resid=Math.max(0,resid);
    const lMonthly=Math.max(0,(capAdj-resid)/lTerm+(capAdj+resid)*(lRate/2400));
    const lp=payParts(lMonthly,s.freq);
    const paysPerYear=s.freq==='weekly'?52:s.freq==='biweekly'?24:12;
    const lTotal=lp.incl*(lTerm*paysPerYear/12);
    const fTerm=s.finTerm||M.finDefault;let fRate=M.finRates[fTerm];
    if(s.rateRed)fRate=Math.max(0,Math.round((fRate-1)*100)/100);
    const subTotal=asBuilt+feesSum-trade,gst=subTotal*0.05,pst=subTotal*0.07,tSell=subTotal+gst+pst;
    const principal=Math.max(0,tSell-progRebate-extra-down);
    const n=Math.round(fTerm*paysPerYear/12),r=fRate/100/paysPerYear;
    const pmt=principal===0?0:(r===0?principal/n:principal*r/(1-Math.pow(1+r,-n)));
    const cob=Math.max(0,pmt*n-principal);
    const cTotal=Math.max(0,tSell-progRebate-extra);
    return{v,t,M,pd,cp,asBuilt,feeRows,feesSum,progRebate,extra,down,trade,
      lease:{term:lTerm,rate:lRate,TSP:lTSP,capAdj,resid,monthly:lMonthly,pay:lp,total:lTotal,due:lp.incl},
      fin:{term:fTerm,rate:fRate,subTotal,gst,pst,tSell,principal,pmt,cob,due:down},
      cash:{total:cTotal,subTotal,gst,pst,tSell}};
  }
  function rowsHtml(rows){return '<table class="jscv-btable"><tbody>'+rows.map(r=>'<tr'+(r[2]?' class="jscv-btotal"':'')+'><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join('')+'</tbody></table>'}
  function neg(x){return x>0?'-'+money2(x):money2(0)}
  function breakdownHtml(f){
    const base=[['Price As Configured',money2(f.t.msrp)],['Options',money2(f.cp)],...f.feeRows.map(x=>[x[0],money2(x[1])])];
    if(calcState.tab==='lease'){
      const L=f.lease;
      return rowsHtml([...base,['Lease Administration fee',money2(PAYDATA.fees.leaseAdmin)],['Trade In',neg(f.trade)],['Total Selling Price',money2(L.TSP),1],
        ['Effective Interest Rate',L.rate.toFixed(2)+'%'],['End Value',money2(L.resid)],['GST (per payment)',money2(L.pay.gst)],['PST (per payment)',money2(L.pay.pst)],
        ['Rebates',neg(f.extra)],['Customer Rebate',neg(f.progRebate)],['Down Payment',f.down>0?neg(f.down):'--'],
        [freqWord(calcState.freq),money2(L.pay.incl)],['Total Payable',money2(L.total),1],['Total Due On Delivery',money2(L.due),1]]);
    }
    if(calcState.tab==='finance'){
      const F=f.fin;
      return rowsHtml([...base,['Trade In',neg(f.trade)],['Subtotal',money2(F.subTotal),1],['GST',money2(F.gst)],['PST',money2(F.pst)],['Total Selling Price',money2(F.tSell),1],
        ['Effective Interest Rate',F.rate.toFixed(2)+'%'],['Rebates',neg(f.extra)],['Customer Rebate',neg(f.progRebate)],['Down Payment',f.down>0?neg(f.down):'--'],
        ['Total Purchase (financed)',money2(F.principal),1],[freqWord(calcState.freq),money2(F.pmt)],['Cost Of Borrowing',money2(F.cob)],['Total Due On Delivery',money2(F.due),1]]);
    }
    const C=f.cash;
    return rowsHtml([...base,['Trade In',neg(f.trade)],['Subtotal',money2(C.subTotal),1],['GST',money2(C.gst)],['PST',money2(C.pst)],
      ['Rebates',neg(f.extra)],['Customer Rebate',neg(f.progRebate)],['Total Tax and Rebates',money2(C.gst+C.pst-f.extra-f.progRebate)],
      ['Payment (due at delivery)',money2(C.total),1]]);
  }
  function resultHtml(f){
    if(calcState.tab==='lease'){const L=f.lease;return '<p class="jscv-calc-big">'+money2(L.pay.incl)+' <span>'+freqWord(calcState.freq).toLowerCase()+'</span></p>'+
      '<p class="jscv-calc-sub">Lease at '+L.rate.toFixed(2)+'% for '+L.term+' months · '+calcState.km.toLocaleString('en-CA')+' km/year</p>'+
      '<p class="jscv-calc-sub">End value '+money2(L.resid)+' · Total payable '+money2(L.total)+' · '+money2(L.due)+' due on delivery</p>'}
    if(calcState.tab==='finance'){const F=f.fin;return '<p class="jscv-calc-big">'+money2(F.pmt)+' <span>'+freqWord(calcState.freq).toLowerCase()+'</span></p>'+
      '<p class="jscv-calc-sub">Finance at '+F.rate.toFixed(2)+'% for '+F.term+' months · '+money2(F.principal)+' financed</p>'+
      '<p class="jscv-calc-sub">Cost of borrowing '+money2(F.cob)+' · '+money2(F.due)+' due on delivery</p>'}
    const C=f.cash;return '<p class="jscv-calc-big">'+money2(C.total)+' <span>cash</span></p>'+
      '<p class="jscv-calc-sub">Total due at delivery, taxes and fees included'+(f.progRebate+f.extra>0?', after rebates':'')+'</p>';
  }
  function buildCalcControls(){
    const st=B.state();const M=PAYDATA.models[st.model];if(!M)return;
    let h='';
    if(calcState.tab==='lease'){
      h+='<div class="jscv-ctl"><span>Term (months)</span><div class="jscv-btnrow">'+[24,36,48,60].map(x=>'<button type="button" class="jscv-cbtn'+(calcState.leaseTerm===x?' is-on':'')+'" data-lease-term="'+x+'">'+x+'</button>').join('')+'</div></div>';
      h+='<div class="jscv-ctl"><span>Annual mileage</span><div class="jscv-btnrow">'+[16000,20000,24000].map(x=>'<button type="button" class="jscv-cbtn'+(calcState.km===x?' is-on':'')+'" data-km="'+x+'">'+x.toLocaleString('en-CA')+' km</button>').join('')+'</div></div>';
    }
    if(calcState.tab==='finance'){
      const terms=Object.keys(M.finRates).map(Number).sort((a,b)=>a-b);
      h+='<div class="jscv-ctl"><span>Term (months)</span><div class="jscv-btnrow">'+terms.map(x=>'<button type="button" class="jscv-cbtn'+((calcState.finTerm||M.finDefault)===x?' is-on':'')+'" data-fin-term="'+x+'">'+x+'</button>').join('')+'</div></div>';
    }
    if(calcState.tab!=='cash')h+='<div class="jscv-ctl"><label for="jscv-down">Down payment</label><input id="jscv-down" class="jscv-money" type="text" inputmode="decimal" placeholder="$0" value="'+calcState.down+'"></div>';
    h+='<div class="jscv-ctl"><label for="jscv-trade">Trade-in value</label><input id="jscv-trade" class="jscv-money" type="text" inputmode="decimal" placeholder="$0" value="'+calcState.trade+'"></div>';
    if(calcState.tab!=='cash')h+='<div class="jscv-ctl"><label for="jscv-freq">Payment frequency</label><select id="jscv-freq" class="jscv-select jscv-freqsel">'+['weekly','biweekly','monthly'].map(x=>'<option value="'+x+'"'+(calcState.freq===x?' selected':'')+'>'+freqWord(x)+'</option>').join('')+'</select></div>';
    calcControls.innerHTML=h;
    calcControls.querySelectorAll('[data-lease-term]').forEach(b=>b.addEventListener('click',()=>{calcState.leaseTerm=+b.dataset.leaseTerm;buildCalcControls();renderSummary()}));
    calcControls.querySelectorAll('[data-fin-term]').forEach(b=>b.addEventListener('click',()=>{calcState.finTerm=+b.dataset.finTerm;buildCalcControls();renderSummary()}));
    calcControls.querySelectorAll('[data-km]').forEach(b=>b.addEventListener('click',()=>{calcState.km=+b.dataset.km;buildCalcControls();renderSummary()}));
    const dn=calcControls.querySelector('#jscv-down');if(dn)dn.addEventListener('input',()=>{calcState.down=dn.value;renderSummary()});
    const tr=calcControls.querySelector('#jscv-trade');if(tr)tr.addEventListener('input',()=>{calcState.trade=tr.value;renderSummary()});
    const fq=calcControls.querySelector('#jscv-freq');if(fq)fq.addEventListener('change',()=>{calcState.freq=fq.value;renderSummary()});
    if(rebBoxes.rateRed)rebBoxes.rateRed.disabled=(calcState.tab==='cash');
  }
  function renderSummary(){
    const st=B.state();if(!st||!VEHICLES[st.model])return;
    if(payModelSeen!==st.model){payModelSeen=st.model;calcState.finTerm=0;calcState.leaseTerm=60;calcState.km=16000;buildCalcControls()}
    const f=computeBuild(calcState,st);
    sumColourName.textContent=st.colour||'Colour';
    sumColourPrice.textContent=f.cp>0?money2(f.cp):'Included';
    sumMsrp.textContent=money(f.asBuilt);
    B.priceValue.textContent=money(f.asBuilt);
    if(B.priceLabel)B.priceLabel.textContent='MSRP as built';
    const L=f.lease,F=f.fin;
    sumLeaseLine.textContent='Lease for '+money(L.pay.incl)+' '+freqWord(calcState.freq)+' at '+L.rate.toFixed(2)+'% ('+L.term+' months)';
    sumFinLine.textContent='Finance for '+money(F.pmt)+' '+freqWord(calcState.freq)+' at '+F.rate.toFixed(2)+'% ('+F.term+' months)';
    tabFig.lease.textContent=money(L.pay.incl)+' '+freqWord(calcState.freq);
    tabFig.fin.textContent=money(F.pmt)+' '+freqWord(calcState.freq);
    tabFig.cash.textContent=money(f.cash.total);
    calcResult.innerHTML=resultHtml(f);
    if(calcState.breakOpen)breakBox.innerHTML=breakdownHtml(f);
    const tabSummary=calcState.tab==='lease'?('Lease '+money2(L.pay.incl)+'/'+calcState.freq+' @ '+L.rate.toFixed(2)+'% '+L.term+'mo '+calcState.km.toLocaleString('en-CA')+'km/yr')
      :calcState.tab==='finance'?('Finance '+money2(F.pmt)+'/'+calcState.freq+' @ '+F.rate.toFixed(2)+'% '+F.term+'mo')
      :('Cash '+money2(f.cash.total));
    const vehicle=((f.v.year||2026)+' Mitsubishi '+f.v.name+' '+f.t.name+', '+(st.colour||'colour: open to options')+', '+money(f.asBuilt)+' MSRP as built · '+tabSummary);
    if(B.primaryLink)B.primaryLink.href='https://www.jaysonsellscarsandtrucks.ca/contact-us?topic='+encodeURIComponent('Book a test drive')+'&vehicle='+encodeURIComponent(vehicle)+'#jsccf-topic';
  }
  calcToggle.addEventListener('click',()=>{calcState.open=!calcState.open;calcPanel.hidden=!calcState.open;calcToggle.setAttribute('aria-expanded',String(calcState.open));calcToggle.textContent=calcState.open?'Hide payment calculator':'Payment calculator';if(calcState.open){buildCalcControls();renderSummary()}});
  breakToggle.addEventListener('click',()=>{calcState.breakOpen=!calcState.breakOpen;breakBox.hidden=!calcState.breakOpen;breakToggle.setAttribute('aria-expanded',String(calcState.breakOpen));if(calcState.breakOpen)renderSummary()});
  tabBtns.forEach(b=>b.addEventListener('click',()=>{calcState.tab=b.dataset.tab;tabBtns.forEach(x=>x.classList.toggle('is-active',x===b));buildCalcControls();renderSummary()}));
  Object.entries(rebBoxes).forEach(([k,el])=>{if(!el)return;el.addEventListener('change',()=>{
    if(k==='rateRed'){calcState.rateRed=el.checked;if(el.checked&&rebBoxes.loyalty){rebBoxes.loyalty.checked=false;calcState.rebLoyalty=false}}
    else if(k==='loyalty'){calcState.rebLoyalty=el.checked;if(el.checked&&rebBoxes.rateRed){rebBoxes.rateRed.checked=false;calcState.rateRed=false}}
    else calcState['reb'+k[0].toUpperCase()+k.slice(1)]=el.checked;
    renderSummary()})});
  window.__jscvRenderSummary=renderSummary;
  buildCalcControls();
  renderSummary();
})();
