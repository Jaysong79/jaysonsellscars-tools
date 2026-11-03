
(function(){
  /* ============ SETTINGS ============
     Leads go to the same Google Apps Script your Contact Us form uses
     (copied from your live site), so they arrive at info@ as
     "New lead — Contact Us" emails that your CRM already picks up.
     Nothing to fill in. */
  var CONFIG = {
    leadScriptUrl: "https://script.google.com/macros/s/AKfycbxiEU_tIiLuHzxYLGrF9EB-xGLU0WCW1DoyOz3STTlVWE_4AS27oWQfxr563EU3phhy9w/exec",
    formKind: "Contact Us",
    leadEmail: "info@jaysonsellscarsandtrucks.ca",
    consultantName: "Jayson Gazloff",
    phone: "778-363-1453",
    dealerName: "Valley Mitsubishi",
    dealerAddress: "2350 Enterprise Way, Kelowna, BC V1X 4H7",
    responseTime: "within one business day",
    source: "Website form - Build & Price"
  };

  /* ============ VEHICLE DATA ============
     Every trim, price, feature line, colour and image below was read from
     mitsubishi-motors.ca Build & Price with BC postal code V1X 4H7.
     Images load from Mitsubishi Canada; each one was checked to exist. */
  var AS_OF = "November 2, 2026";  /* Sportback colours re-checked 3 ways the same day */
  var DISCLAIMER = "Not applicable in Quebec. MSRP is the Manufacturer's Suggested Retail Price in Canadian dollars excluding taxes, freight and pre-delivery inspection charges, licence, insurance, registration and all other applicable fees, taxes, duties and charges. Pricing calculations for information only and not an offer. Dealer is free to set prices and may sell for less. Pricing may change without notice. Vehicle availability may vary. Vehicles shown may have optional equipment. See your local Mitsubishi Motors retailer for details.";
  var CDN = "https://www.mitsubishi-motors.ca/content/dam/mitsubishi-motors-ca/images/cars/";
  var ANGLES = [["0","Side"],["45","Front left"],["135","Front right"],["225","Rear left"],["315","Rear right"]];
  var VIEW = {
    lower:  {0:"side",45:"front-left",135:"front-right",225:"rear-left",315:"rear-right"},
    pascal: {0:"Side",45:"FrontLeft",135:"FrontRight",225:"RearLeft",315:"RearRight"},
    rvr:    {0:"Side",45:"front-left",135:"front-right",225:"rear-left",315:"rear-right"},
    ec:     {0:"side",45:"front-left",135:"front-right",225:"rear-right",315:"rear-left"},
    bare:   {0:"",45:"",135:"",225:"",315:""}
  };
  var COLOURS = {
    D14:"Cosmic Blue", P62:"Red Diamond", W85:"White Diamond", X42:"Labrador Black", U25:"Sterling Silver",
    U28:"Graphite Grey", X47:"Black Diamond", U35:"Moonstone Grey", XFU:"Graphite Grey / Black Roof",
    XGU:"Moonstone Grey / Black Roof", XW4:"White Diamond / Black Roof", U2X:"Black Diamond/ Silver Roof",
    XP2:"Red Diamond / Black Roof", U17:"Titanium Grey", D06:"Octane Blue", C22:"Oak Brown", M11:"Sunshine Orange"
  };
  var PHEV_COLS_ES = [["D14",150],["P62",450],["W85",450],["X42",300],["U25",0],["U28",150]];
  var LE_COLS = [["D14",150],["P62",450],["W85",450],["U25",0],["U28",150],["X47",450]];
  var SEL_COLS = [["D14",150],["P62",450],["W85",450],["U35",450],["U25",0],["U28",150],["X47",450]];
  var GT_COLS = [["D14",150],["XFU",600],["XGU",900],["P62",450],["XW4",900],["W85",450],["U35",450],["U25",0],["U28",150],["X47",450],["U2X",900],["XP2",900]];
  var GTP_COLS = [["D14",150],["XFU",600],["XGU",900],["XW4",900],["W85",450],["U35",450],["U25",0],["U28",150],["X47",450],["U2X",900]];
  var NOIR_COLS = [["XFU",600],["XW4",900],["X47",450],["XP2",900]];
  var EC_COLS = [["W85",450],["X42",300,"Tarmac Black"],["U25",0],["U17",150],["D06",300],["P62",450]];
  var SPB_COLS = [["GAT",300,"Galaxy Black"],["KAD",0,"Storm Grey"],["NAW",150,"Nebula Red"],["QBE",300,"Astral White"],["RCJ",300,"Midnight Blue"]];
  var RVR_COLS = [["C22",150],["W85",450],["X42",300],["U25",0],["U17",150],["D06",300],["M11",150],["P62",450]];
  var ALL5 = [0,1,2,3,4];

  var MODELS = [
    { key:"phev", name:"Outlander PHEV", year:2026, title:'2026 Outlander <em>PHEV</em>', cdn:"outlander-phev/2026/",
      stock:"https://www.valleymitsubishi.ca/new/2026-Mitsubishi-Outlander_PHEV.html",
      trims:[
        {key:"es", name:"ES S-AWC", from:46998, folder:"es-s-awc", mid:"26OutlanderPHEV-01", view:"lower", angles:ALL5, cols:PHEV_COLS_ES,
         feats:["Bonus Savings: You may be eligible for a $2,500 Federal rebate. Final transaction price must not exceed $50,000. Subject to rebate eligibility.","2.4L 4 Cylinder with PHEV Twin Electric Motor System including the standard features:","Super All-Wheel Control (S-AWC) with Drive Mode Selector","7 Passenger Seating (5+2)","12.3\" Full Digital Driver Display"]},
        {key:"se", name:"SE S-AWC", from:52598, folder:"se-s-awc", mid:"26OutlanderPHEV-02", view:"lower", angles:ALL5, cols:PHEV_COLS_ES,
         feats:["Includes all the features of the ES S-AWC, plus:","Power Panoramic Sunroof with Sunshade","3-Zone Automatic Climate Control","Heated Steering Wheel"]},
        {key:"le", name:"LE S-AWC", from:54798, folder:"le-s-awc", mid:"26OutlanderPHEV-03", view:"lower", angles:ALL5, cols:LE_COLS,
         feats:["Includes all the features of the SE S-AWC, plus:","Microsuede/Synthetic Leather Seats","18” Two-Tone Alloy Wheels","Multi View Camera System (MVCS) with Moving Object Detection","Mitsubishi Connect with Trial Included (Mobile App Enrollment Required)"]},
        {key:"sel", name:"SEL S-AWC", from:57598, folder:"sel-s-awc", mid:"26OutlanderPHEV-04", view:"lower", angles:ALL5, cols:SEL_COLS,
         feats:["Includes all the features of the LE S-AWC, plus:","20” Two-Tone Alloy Wheels","Leather-Appointed Seats","Ventilated Front Seats","Heated 2nd Row Seats"]},
        {key:"gt", name:"GT S-AWC", from:60598, folder:"gt-s-awc", mid:"26OutlanderPHEV-05", view:"lower", angles:ALL5, cols:GT_COLS, u2xSide:true,
         feats:["Includes all the features of the SEL S-AWC, plus:","Active Blind Spot Assist (ABSA)","Dynamic Sound Yamaha Ultimate with 12 Speakers","10.8\" Head-Up Display (HUD)","Adaptive Cruise Control (ACC) with Stop & Go"]},
        {key:"gtp", name:"GT PREMIUM S-AWC", from:61698, folder:"gt-p-s-awc", mid:"26OutlanderPHEV-06", view:"lower", angles:ALL5, cols:GTP_COLS, u2xSide:true,
         feats:["Includes all the features of the GT S-AWC, plus:","Semi-Aniline Leather-Appointed Seats","Brown Interior Stitch Accents","Front Seat Massage Function"]},
        {key:"noir", name:"GT NOIR S-AWC", from:63048, folder:"gt-noir-s-awc", mid:"26OutlanderPHEV-07", view:"lower", angles:ALL5, cols:NOIR_COLS,
         feats:["Includes all the features of the GT S-AWC, plus:","Special black exterior and interior features","Semi-Aniline Leather-Appointed Seats","Front Seat Massage Function"]}
      ]},
    { key:"outlander", name:"Outlander", year:2026, title:'2026 <em>Outlander</em>', cdn:"outlander/2026/",
      stock:"https://www.valleymitsubishi.ca/new/2026-Mitsubishi-Outlander.html",
      trims:[
        {key:"es", name:"ES S-AWC", from:36398, folder:"gm2wxtmczl3m-na-c61", mid:"26Outlander-01", view:"lower", angles:ALL5, cols:PHEV_COLS_ES,
         feats:["Super All-Wheel Control (S-AWC) with Drive Mode Selector","7 Passenger Seating (5+2)","12.3” Smartphone Link Display Audio","Dynamic Sound Yamaha Premium with 8 Speakers","Wireless Android Auto™ & Wireless Apple CarPlay"]},
        {key:"se", name:"SE S-AWC", from:39098, folder:"gm2wxtxczl3m-na-c62", mid:"26Outlander-02", view:"lower", angles:ALL5, cols:PHEV_COLS_ES,
         feats:["Includes all the equipment of the ES, plus:","Power Panoramic Sunroof with Sunshade","Hands-Free Power Liftgate with Adjustable Height","3-Zone Automatic Climate Control","Heated Steering Wheel","FAST-Key Keyless Entry"]},
        {key:"le", name:"LE S-AWC", from:42198, folder:"gm2wxtxczl3m-na-f63", mid:"26Outlander-03", view:"lower", angles:[0,1], cols:LE_COLS,
         feats:["Includes all the equipment of the SE, plus:","18” Two-Tone Alloy Wheels","Microsuede/Synthetic Leather Seats","8-Way Power Driver’s Seat (Sliding, Reclining, Height Adjustable, Tilt, Lumbar)","SiriusXM® 360L Satellite Radio with 3 Months Complimentary Service","Mitsubishi Connect with Trial Included (Mobile App Enrollment Required)"]},
        {key:"sel", name:"SEL S-AWC", from:44898, folder:"gm2wxtxczl3m-na-f65", mid:"26Outlander-04", view:"lower", angles:ALL5, cols:SEL_COLS,
         feats:["Includes all the equipment of the LE, plus:","20” Two-Tone Alloy Wheels","12.3\" Full Digital Driver Display","Leather-Appointed Seats","8-Way Power Driver’s Seat (Sliding, Reclining, Height Adjustable, Tilt, Lumbar) with Key-Linked Memory for Seat and Exterior Mirrors","Ventilated Front Seats"]},
        {key:"gt", name:"GT S-AWC", from:47398, folder:"gm2wxtuczl3m-na-f66", mid:"26Outlander-05", view:"lower", angles:ALL5, cols:GT_COLS,
         feats:["Includes all the equipment of the SEL, plus:","Dynamic Sound Yamaha Ultimate with 12 Speakers","10.8\" Head-Up Display (HUD)","Active Blind Spot Assist (ABSA)","Adaptive Cruise Control (ACC) with Stop & Go","Traffic Sign Recognition (TSR)"]},
        {key:"gtp", name:"GT PREMIUM S-AWC", from:48398, folder:"gm2wxtuczl3m-na-f67", mid:"26Outlander-06", view:"lower", angles:ALL5, cols:GTP_COLS,
         feats:["Includes all the equipment of the GT, plus:","Semi-Aniline Leather-Appointed Seats","Brown Interior Stitch Accents","Frameless Digital Rearview Mirror with Homelink®"]},
        {key:"noir", name:"NOIR S-AWC", from:49748, folder:"gm2wxtuczl3m-na-l61", mid:"26Outlander-07", view:"pascal", angles:ALL5, cols:NOIR_COLS,
         feats:["Includes all the equipment of the GT, plus:","20” Black-Painted Alloy Wheels","Black-Painted Dynamic Shield","Black Hood Emblem","Auto High Grade LED Headlights (NOIR)","Black Roof Rails"]}
      ]},
    { key:"eclipsecross", name:"Eclipse Cross", year:2026, title:'2026 Eclipse <em>Cross</em>', cdn:"eclipse-cross/2026/",
      stock:"https://www.valleymitsubishi.ca/new/2026-Mitsubishi-Eclipse_Cross.html",
      trims:[
        {key:"es", name:"ES S-AWC", from:29798, folder:"gk1wxtjuzl3m-na_c61", angles:[0,1,2,3,4], mid:"26ECLIPSECROSS", view:"ec", cols:EC_COLS,
         feats:["Super All-Wheel Control (S-AWC) with Drive Mode Selector","18” Alloy Wheels","Automatic Climate Control","Heated Front Seats","Android Auto™ & Apple CarPlay"]},
        {key:"se", name:"SE S-AWC", from:33298, folder:"gk1wxtxuzl3m-na_c62", angles:[0,1,2,3,4], mid:"26ECLIPSECROSS", view:"ec", cols:EC_COLS,
         feats:["Includes all the equipment of the ES, plus:","Heated Steering Wheel","Dual-Zone Automatic Climate Control","FAST-Key Keyless Entry","Hands-Free Power Liftgate with Adjustable Height","Heated & Power-Folding Side-View Mirrors with Integrated Turn Signal Light"]},
        {key:"noir", name:"NOIR S-AWC", from:36898, folder:"gk1wxtxuzl3m-na_l61", angles:[0,1,2,3,4], mid:"26ECLIPSECROSS", view:"ec", cols:[["W85",450],["X42",300,"Tarmac Black"],["U17",150],["P62",450]],
         feats:["Includes all the equipment of the SE, plus:","\"NOIR\" Badge","Black Hood Emblem","18” Black-Painted Alloy Wheels","Microsuede/Synthetic Leather Seats","6-Way Power Driver’s Seat (Sliding, Reclining & Height Adjustable)"]},
        {key:"gt", name:"GT S-AWC", from:38898, folder:"gk1wxtxuzl3m-na_c64", angles:[0,1,2,3,4], mid:"26ECLIPSECROSS", view:"ec", cols:EC_COLS,
         feats:["Includes all the equipment of the SE, plus:","Power Panoramic Sunroof with Dual Sunshades","Leather-Appointed Seats","6-Way Power Driver’s Seat (Sliding, Reclining & Height Adjustable)","4-Way Power Front Passenger Seat","Remote Starter"]}
      ]},
    { key:"rvr", name:"RVR", year:2027, title:'2027 <em>RVR</em>', cdn:"rvr/2027/",
      stock:"https://www.valleymitsubishi.ca/new/2027-Mitsubishi-RVR.html",
      trims:[
        {key:"esfwd", name:"ES FWD", from:25278, folder:"ga2wxtmhl3m-na-c71", mid:"ES-FWD-01", view:"rvr", angles:ALL5, cols:RVR_COLS,
         feats:["2.0L model with CVT including the standard features:","Automatic Climate Control","Heated Front Seats","Android Auto™ & Apple CarPlay"]},
        {key:"esawc", name:"ES AWC", from:27278, folder:"ga2wxtmhzl3m-na-c72", mid:"ES-AWC-02", view:"rvr", angles:ALL5, cols:RVR_COLS,
         feats:["Includes all the features of the ES FWD plus:","All-Wheel Control (AWC) with Drive Mode Selector"]},
        {key:"se", name:"SE AWC", from:29778, folder:"ga5wxtxhzl3m-na-c74", mid:"SE-AWC-03", view:"rvr", angles:ALL5, cols:RVR_COLS,
         feats:["2.4L engine and includes all the features of the ES AWC, plus:","Heated Steering Wheel","Blind Spot Warning (BSW)","Rear Cross Traffic Alert (RCTA)","Premium Fabric Seats"]},
        {key:"sel", name:"SEL AWC", from:31998, folder:"ga5wxtxhzl3m-na-c75", mid:"SEL-AWC-04", view:"rvr", angles:ALL5, cols:RVR_COLS,
         feats:["Includes all the features of the SE AWC, plus:","18” Alloy Wheels","Microsuede/Synthetic Leather Seats"]},
        {key:"noir", name:"NOIR AWC", from:33498, folder:"ga5wxtxhzl3m-na-l71", mid:"NOIR-AWC-05", view:"rvr", angles:ALL5, cols:[["W85",450],["X42",300],["U17",150],["P62",450]],
         feats:["Includes all the features of the SEL AWC, plus:","18” Black-Painted Alloy Wheels","Panoramic Fixed Glass Sunroof with Sunshade","Red Interior Stitch Accents"]},
        {key:"gt", name:"GT AWC", from:35958, folder:"ga5wxtxhzl3m-na-c76", mid:"GT-AWC-06", view:"rvr", angles:ALL5, cols:RVR_COLS,
         feats:["Includes all the features of the SEL AWC, plus:","Panoramic Fixed Glass Sunroof with Sunshade","Leather-Appointed Seats"]}
      ]},
    { key:"sportback", name:"Eclipse Sportback", year:2027, badge:"New EV", title:'2027 Eclipse <em>Sportback</em>', cdn:"eclipse-sportback/2027/", noSwatches:true,
      stock:"https://www.valleymitsubishi.ca/news-article/2027_mitsubishi_eclipse_sportback_pricing_announced-id4906.html",
      stockLabel:"Sportback news",
      trims:[
        {key:"ev", name:"EV", from:48998, folder:"c71", mid:"27EclipseSportback-wopkg", view:"lower", angles:ALL5, cols:SPB_COLS,
         feats:["Bonus Savings: You may be eligible for a $5,000 Federal rebate. Final transaction price must not exceed $50,000. Subject to rebate eligibility.","Battery Electric Vehicle","Up to 454 km driving range","214 horsepower/261 lb.-ft. torque","5 seats + flexible cargo","4 drive modes"]},
        {key:"evtech", name:"EV Tech Pkg", from:54098, folder:"c72", angles:[0,1,2,3,4], mid:"27EclipseSportback-wpkg", view:"bare", cols:SPB_COLS,
         feats:["Includes all the features of the EV, plus:","Panoramic Roof (fixed/e-dimming)","BOSE® Premium Sound System with 10 Speakers","Hands-Free Power Liftgate","Black Roof Rails"]}
      ]}
  ];

  /* ============ helpers ============ */
  var $ = function(id){ return document.getElementById(id); };
  var money = function(n){ return "$" + n.toLocaleString("en-CA"); };
  var addOn = function(n){ return n === 0 ? "No charge" : "+" + money(n); };
  var state = { m:0, t:0, c:"U25", a:0, mode:"drive" };
  function model(){ return MODELS[state.m]; }
  function trim(){ return model().trims[state.t]; }
  function colEntry(code){ return trim().cols.filter(function(x){ return x[0] === code; })[0]; }
  function colName(code){ var e = colEntry(code); return (e && e[2]) || COLOURS[code]; }
  function colPrice(){ var e = colEntry(state.c); return e ? e[1] : 0; }
  function total(){ return trim().from + colPrice(); }
  function plainModel(){ return model().year + " " + model().name; }
  function buildLabel(){ return plainModel() + " " + trim().name + " in " + colName(state.c); }
  function defaultColour(t){ var c = t.cols.filter(function(x){ return x[1] === 0; })[0]; return (c || t.cols[0])[0]; }
  function angleIdx(){ var list = trim().angles || []; return list.indexOf(state.a) >= 0 ? state.a : (list[0] || 0); }

  function imgUrl(t, code, ai){
    var a = ANGLES[ai][0];
    var file = (t.u2xSide && code === "U2X" && a === "0")
      ? "U2X_0__315_" + t.mid + "_rear-right__side.png"
      : code + "_" + a + "_" + t.mid + (VIEW[t.view][a] ? "_" + VIEW[t.view][a] : "") + ".png";
    return CDN + model().cdn + "primary/exterior/" + t.folder + "/" + file + "?width=1600&auto=webp&quality=75";
  }
  function swatchUrl(code){ return CDN + model().cdn + "color-picker/exterior/" + code + ".jpg"; }

  /* ============ link (hash) ============ */
  function buildHash(){ return "#build-" + model().key + "-" + trim().key + "-" + state.c + "-a" + ANGLES[angleIdx()][0]; }
  function readHash(){
    var h = location.hash || "", mi, ti, code, ang;
    var m = /^#build-([a-z]+)-([a-z]+)-([A-Z0-9]{3})-a(\d+)$/.exec(h);
    if(m){
      mi = MODELS.findIndex(function(x){ return x.key === m[1]; });
      if(mi < 0) return;
      ti = MODELS[mi].trims.findIndex(function(x){ return x.key === m[2]; });
      code = m[3]; ang = m[4];
    } else {
      var old = /^#build-([a-z-]+)-([A-Z0-9]{3})-a(\d+)$/.exec(h);   // links from the first PHEV-only version
      if(!old) return;
      mi = 0;
      ti = MODELS[0].trims.findIndex(function(x){ return x.folder === old[1]; });
      code = old[2]; ang = old[3];
    }
    if(ti < 0) ti = 0;
    state.m = mi; state.t = ti;
    var t = MODELS[mi].trims[ti];
    state.c = t.cols.some(function(x){ return x[0] === code; }) ? code : defaultColour(t);
    var ai = ANGLES.findIndex(function(a){ return a[0] === ang; });
    state.a = ai < 0 ? 0 : ai;
  }
  function writeHash(){ try{ history.replaceState(null, "", buildHash()); }catch(e){} }

  /* ============ stage ============ */
  var front = $("jsc-imgA"), back = $("jsc-imgB"), loadToken = 0;
  function showImage(){
    var t = trim(), tok = ++loadToken;
    $("jsc-stagemsg").hidden = true;
    if(t.noImages){
      front.classList.add("jsc-hide"); back.classList.add("jsc-hide");
      $("jsc-noimg").hidden = false;
      $("jsc-noimg-sw").hidden = !!model().noSwatches;
      if(!model().noSwatches){
        $("jsc-noimg-sw").src = swatchUrl(state.c);
        $("jsc-noimg-sw").alt = colName(state.c) + " paint swatch";
      }
      $("jsc-noimg-name").textContent = colName(state.c);
      $("jsc-stagetag").textContent = t.name;
      return;
    }
    $("jsc-noimg").hidden = true;
    var ai = angleIdx();
    back.onload = function(){
      if(tok !== loadToken) return;
      back.classList.remove("jsc-hide"); front.classList.add("jsc-hide");
      var tmp = front; front = back; back = tmp;
    };
    back.onerror = function(){ if(tok === loadToken){ front.classList.add("jsc-hide"); $("jsc-stagemsg").hidden = false; } };
    back.alt = buildLabel() + ", " + ANGLES[ai][1].toLowerCase() + " view";
    back.src = imgUrl(t, state.c, ai);
    $("jsc-stagetag").textContent = t.name + " · " + ANGLES[ai][1];
    t.angles.forEach(function(i){ if(i !== ai){ var im = new Image(); im.src = imgUrl(t, state.c, i); } });
  }

  /* ============ renderers ============ */
  function renderModels(){
    var box = $("jsc-models"); box.innerHTML = "";
    MODELS.forEach(function(md, i){
      var b = document.createElement("button");
      b.type = "button"; b.className = "jsc-model"; b.setAttribute("role","tab");
      b.setAttribute("aria-selected", i === state.m ? "true" : "false");
      var from = Math.min.apply(null, md.trims.map(function(t){ return t.from; }));
      var nb = document.createElement("b"); nb.textContent = md.year + " " + md.name;
      var ns = document.createElement("span"); ns.textContent = "MSRP from " + money(from);
      b.appendChild(nb); b.appendChild(ns);
      if(md.badge){ var bi = document.createElement("i"); bi.textContent = md.badge; b.appendChild(bi); }
      b.onclick = function(){
        if(state.m === i) return;
        state.m = i; state.t = 0; state.c = defaultColour(md.trims[0]); state.a = 0;
        update(true);
      };
      box.appendChild(b);
    });
  }
  function renderTrims(){
    var box = $("jsc-trims"); box.innerHTML = "";
    model().trims.forEach(function(t, i){
      var b = document.createElement("button");
      b.type = "button"; b.className = "jsc-trim"; b.setAttribute("role","radio");
      b.setAttribute("aria-checked", i === state.t ? "true" : "false");
      b.innerHTML = '<span class="jsc-trim-name"></span><span class="jsc-trim-price"><small>MSRP FROM<sup>1</sup></small></span>';
      b.querySelector(".jsc-trim-name").textContent = t.name;
      b.querySelector(".jsc-trim-price").appendChild(document.createTextNode(money(t.from)));
      b.onclick = function(){
        if(state.t === i) return;
        state.t = i;
        if(!t.cols.some(function(x){ return x[0] === state.c; })) state.c = defaultColour(t);
        update(true);
      };
      box.appendChild(b);
    });
    var ul = $("jsc-feats"); ul.innerHTML = "";
    trim().feats.forEach(function(f){
      var li = document.createElement("li"); li.textContent = f;
      if(/^Includes all the/.test(f) || /standard features:$/.test(f)) li.className = "jsc-lead";
      ul.appendChild(li);
    });
  }
  function renderColours(){
    var box = $("jsc-cols"); box.innerHTML = "";
    trim().cols.forEach(function(c){
      var b = document.createElement("button");
      b.type = "button"; b.className = "jsc-col"; b.setAttribute("role","radio");
      b.setAttribute("aria-checked", c[0] === state.c ? "true" : "false");
      b.setAttribute("aria-label", colName(c[0]) + ", " + addOn(c[1]));
      var s = document.createElement("span"); s.className = "jsc-col-name"; s.textContent = colName(c[0]);
      if(model().noSwatches){
        b.classList.add("jsc-col-text");
      } else {
        var img = document.createElement("img"); img.src = swatchUrl(c[0]); img.alt = ""; img.loading = "lazy";
        b.appendChild(img);
      }
      b.appendChild(s);
      b.onclick = function(){ state.c = c[0]; update(false); };
      box.appendChild(b);
    });
    var sel = $("jsc-colsel"); sel.innerHTML = "";
    var bb = document.createElement("b"); bb.textContent = colName(state.c);
    var sp = document.createElement("span"); sp.textContent = "  " + addOn(colPrice());
    sel.appendChild(bb); sel.appendChild(sp);
  }
  function renderAngles(){
    var box = $("jsc-angles"); box.innerHTML = "";
    var t = trim();
    box.hidden = !!t.noImages;
    if(t.noImages){ $("jsc-hint").textContent = model().noSwatches ? "Colour names and prices are official. Photos coming from Mitsubishi Canada." : "Shown: official Mitsubishi Canada paint swatch."; return; }
    $("jsc-hint").textContent = t.angles.length < 5
      ? "Mitsubishi Canada shows this trim from " + t.angles.length + " angles. Official images."
      : "Swipe the vehicle or tap a view. Official Mitsubishi Canada images.";
    var ai = angleIdx();
    t.angles.forEach(function(i){
      var b = document.createElement("button");
      b.type = "button"; b.className = "jsc-angle"; b.textContent = ANGLES[i][1];
      b.setAttribute("aria-pressed", i === ai ? "true" : "false");
      b.onclick = function(){ state.a = i; update(false); };
      box.appendChild(b);
    });
  }
  function renderSummary(){
    $("jsc-title").innerHTML = model().title;
    $("jsc-s-trim").textContent = plainModel() + " " + trim().name;
    $("jsc-s-trimp").textContent = money(trim().from);
    $("jsc-s-col").textContent = colName(state.c);
    $("jsc-s-colp").textContent = colPrice() ? "+" + money(colPrice()) : "$0";
    $("jsc-s-total").textContent = money(total());
    $("jsc-bar-name").textContent = model().name + " " + trim().name + " · " + colName(state.c);
    $("jsc-bar-price").textContent = money(total()) + " MSRP";
    $("jsc-buildchip").textContent = buildLabel() + " · " + money(total()) + " MSRP as built";
    $("jsc-stock").href = model().stock;
    $("jsc-stock").textContent = model().stockLabel || ("See " + model().name + " in stock");
  }
  function update(structural){
    state.a = angleIdx();
    if(structural){ renderModels(); renderTrims(); }
    else { [].forEach.call($("jsc-trims").children, function(b, i){ b.setAttribute("aria-checked", i === state.t ? "true" : "false"); }); }
    renderColours(); renderAngles(); renderSummary(); showImage(); writeHash();
  }

  /* ============ swipe ============ */
  (function(){
    var x0 = null, stage = $("jsc-stage");
    stage.addEventListener("touchstart", function(e){ x0 = e.touches[0].clientX; }, {passive:true});
    stage.addEventListener("touchend", function(e){
      if(x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      var list = trim().angles || [];
      if(Math.abs(dx) < 40 || list.length < 2) return;
      var pos = list.indexOf(angleIdx());
      state.a = list[(pos + (dx < 0 ? 1 : -1) + list.length) % list.length];
      update(false);
    });
  })();

  /* ============ share ============ */
  $("jsc-share").onclick = function(){
    var link = location.href.split("#")[0] + buildHash();
    var done = function(ok){ $("jsc-copied").textContent = ok ? "Build link copied. Paste it anywhere." : link; };
    try{ navigator.clipboard.writeText(link).then(function(){ done(true); }, function(){ done(false); }); }catch(e){ done(false); }
  };

  /* ============ lead form ============ */
  function setMode(m){
    state.mode = m;
    $("jsc-mode-drive").setAttribute("aria-pressed", m === "drive" ? "true" : "false");
    $("jsc-mode-send").setAttribute("aria-pressed", m === "send" ? "true" : "false");
    $("jsc-msg-label").textContent = m === "drive" ? "Best days or times for your drive (optional)" : "Questions for Jayson (optional)";
    $("jsc-lead-h").textContent = m === "drive" ? "Book a test drive in this build" : "Send this build to Jayson";
  }
  function goForm(m){
    setMode(m); $("jsc-form").hidden = false; $("jsc-done").hidden = true;
    $("jsc-lead-sec").scrollIntoView({behavior:"smooth", block:"start"});
    setTimeout(function(){ try{ $("jsc-name").focus({preventScroll:true}); }catch(e){} }, 400);
  }
  $("jsc-mode-drive").onclick = function(){ setMode("drive"); };
  $("jsc-mode-send").onclick = function(){ setMode("send"); };
  $("jsc-go-drive").onclick = function(){ goForm("drive"); };
  $("jsc-bar-go").onclick = function(){ goForm("drive"); };
  $("jsc-go-send").onclick = function(){ goForm("send"); };

  function digits(s){ return (s || "").replace(/\D/g, ""); }
  function validPhone(s){ var d = digits(s); if(d.length === 11 && d[0] === "1") d = d.slice(1); return d.length === 10; }
  function validEmail(s){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s); }
  function leadText(f){
    return [
      (state.mode === "drive" ? "Test drive request" : "Build enquiry") + " - " + buildLabel(),
      "Name: " + f.name,
      "Phone: " + (f.phone || "-"),
      "Email: " + (f.email || "-"),
      "Vehicle of interest: " + buildLabel(),
      "Trim MSRP from: " + money(trim().from) + " | Colour: " + addOn(colPrice()) + " | MSRP as built: " + money(total()),
      "Message: " + (f.message || "-"),
      "Source: " + CONFIG.source + " (" + model().name + ")",
      "Build link: " + location.href.split("#")[0] + buildHash()
    ].join("\n");
  }

  $("jsc-form").addEventListener("submit", function(e){
    e.preventDefault();
    var f = { name:$("jsc-name").value.trim(), phone:$("jsc-phone").value.trim(), email:$("jsc-email").value.trim(), message:$("jsc-msg").value.trim() };
    var ok = true;
    $("jsc-name-err").textContent = ""; $("jsc-contact-err").textContent = ""; $("jsc-consent-err").textContent = "";
    ["jsc-name","jsc-phone","jsc-email"].forEach(function(id){ $(id).removeAttribute("aria-invalid"); });
    if(f.name.length < 2){ $("jsc-name-err").textContent = "Enter your name so Jayson knows who to ask for."; $("jsc-name").setAttribute("aria-invalid","true"); ok = false; }
    if(!f.phone && !f.email){ $("jsc-contact-err").textContent = "Add a phone number or an email so Jayson can reply."; $("jsc-phone").setAttribute("aria-invalid","true"); ok = false; }
    if(f.phone && !validPhone(f.phone)){ $("jsc-contact-err").textContent = "Phone numbers need 10 digits, like 250-555-0123."; $("jsc-phone").setAttribute("aria-invalid","true"); ok = false; }
    if(f.email && !validEmail(f.email)){ $("jsc-contact-err").textContent = "That email doesn't look complete. Check it and try again."; $("jsc-email").setAttribute("aria-invalid","true"); ok = false; }
    if(!$("jsc-consent").checked){ $("jsc-consent-err").textContent = "Tick the box so Jayson has your OK to contact you about this build."; ok = false; }
    if(!ok) return;
    var first = f.name.split(/\s+/)[0];
    var link = location.href.split("#")[0] + buildHash();
    var p = {
      form_kind: CONFIG.formKind,
      inquiry_id: "BNP-" + Date.now().toString(36).toUpperCase().slice(-6),
      customer_name: f.name,
      customer_first_name: first,
      customer_email: f.email || "Not provided",
      to_email: f.email,
      reply_to: f.email,
      customer_phone: f.phone || "Not provided",
      contact_pref: f.phone ? "Phone" : "Email",
      best_time: state.mode === "drive" ? (f.message || "Not specified") : "Not specified",
      topic: state.mode === "drive" ? "Build & Price: Book a test drive" : "Build & Price: Send me details",
      vehicle_interest: buildLabel() + " · " + money(total()) + " MSRP as built · " + link,
      vehicle_stock: "", vehicle_vin: "", vehicle_url: link,
      message: leadText(f),
      response_time: CONFIG.responseTime,
      page_url: location.href,
      consultant_name: CONFIG.consultantName,
      consultant_phone: CONFIG.phone,
      dealer_name: CONFIG.dealerName,
      dealer_address: CONFIG.dealerAddress,
      dealer_phone: CONFIG.phone,
      submitted_at: new Date().toLocaleString("en-CA", { timeZone: "America/Vancouver" })
    };
    if(f.email){
      p.autoresponse_subject = state.mode === "drive" ? "Thanks — your test drive request is in" : "Thanks for reaching out — JaysonSellsCars";
      p.autoresponse_text = "Hi " + first + " — thanks for your " + (state.mode === "drive" ? "test drive request" : "message") + " about the " + buildLabel() + ". Jayson got it and will get back to you " + CONFIG.responseTime + ". Need him sooner? Call or text " + CONFIG.phone + ".\n\n— JaysonSellsCars, Valley Mitsubishi";
    }
    $("jsc-submit").disabled = true; $("jsc-submit").textContent = "Sending…";
    postLead(p).then(function(){ showDone(f, true); }, function(){ showDone(f, false); });
  });

  /* Same delivery method as the Contact Us form on the live site:
     a hidden form posts to the Apps Script inside a hidden frame. */
  function postLead(p){
    return new Promise(function(resolve, reject){
      var name = "jsc_bnp_" + Date.now(), submitted = false;
      var frame = document.createElement("iframe");
      frame.name = name; frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1;
      frame.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;top:0;border:0;";
      var form = document.createElement("form");
      var timer = setTimeout(function(){ cleanup(); reject(new Error("timeout")); }, 25000);
      function cleanup(){ clearTimeout(timer); setTimeout(function(){ if(frame.parentNode) frame.remove(); if(form.parentNode) form.remove(); }, 2000); }
      frame.onload = function(){ if(!submitted) return; cleanup(); resolve(true); };
      document.body.appendChild(frame);
      form.method = "POST"; form.action = CONFIG.leadScriptUrl; form.target = name; form.style.display = "none";
      Object.keys(p).forEach(function(k){
        if(p[k] == null) return;
        var i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = String(p[k]); form.appendChild(i);
      });
      document.body.appendChild(form);
      submitted = true;
      try{ form.submit(); }catch(e){ cleanup(); reject(e); }
    });
  }

  function showDone(f, sent){
    $("jsc-submit").disabled = false; $("jsc-submit").textContent = "Send to Jayson";
    $("jsc-form").hidden = true; $("jsc-done").hidden = false;
    $("jsc-done-build").textContent = buildLabel() + " · " + money(total()) + " MSRP as built";
    var body = leadText(f);
    if(sent){
      $("jsc-done-h").textContent = state.mode === "drive" ? "Request sent. Jayson will confirm your drive." : "Sent. Jayson will be in touch.";
      $("jsc-done-p").textContent = "You'll hear from Jayson directly, not a call centre.";
      $("jsc-copy-req").hidden = true; $("jsc-mailto").hidden = true;
    } else {
      $("jsc-done-h").textContent = "One more tap to send";
      $("jsc-done-p").textContent = "Your request is ready. Open it in your email app and press send, or copy it and text Jayson.";
      var m = $("jsc-mailto");
      m.href = "mailto:" + CONFIG.leadEmail + "?subject=" + encodeURIComponent((state.mode === "drive" ? "Test drive: " : "Build enquiry: ") + buildLabel()) + "&body=" + encodeURIComponent(body);
      m.hidden = false;
      var c = $("jsc-copy-req"); c.hidden = false; c.textContent = "Copy my request";
      c.onclick = function(){ try{ navigator.clipboard.writeText(body).then(function(){ c.textContent = "Copied"; }, function(){ c.textContent = "Copy not available here"; }); }catch(e){ c.textContent = "Copy not available here"; } };
    }
    $("jsc-done").scrollIntoView({behavior:"smooth", block:"center"});
  }

  /* ============ init ============ */
  $("jsc-disc").textContent = DISCLAIMER;
  $("jsc-asof").textContent = "Trims, colours and MSRP from mitsubishi-motors.ca for BC, checked " + AS_OF + ". Images © Mitsubishi Motor Sales of Canada.";
  state.c = defaultColour(trim());
  readHash();
  setMode("drive");
  update(true);
  window.addEventListener("hashchange", function(){ var before = buildHash(); readHash(); if(buildHash() !== before) update(true); });
})();
