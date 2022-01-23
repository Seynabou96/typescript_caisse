// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/classes/caisse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caisse = void 0;

var Caisse =
/** @class */
function () {
  function Caisse(solde) {
    this.transactions = [];
    this.observers = [];
    this.solde = solde;
  }

  Caisse.prototype.subscribeObserver = function (obs) {
    this.observers.push(obs);
    obs.update(this);
    console.log('subscribe');
  };

  Caisse.prototype.unSubscribeObserver = function (obs) {
    var index = this.observers.indexOf(obs);
    this.observers.splice(index, 1);
    console.log('unsubscribe');
  };

  Caisse.prototype.notifyObserver = function () {
    var _this = this;

    this.observers.forEach(function (obs) {
      return obs.update(_this);
    });
    console.log('notify');
  };

  Caisse.prototype.addTransac = function (transac) {
    this.transactions.push(transac);
    console.log('addtransaction');

    if (transac.getType() === 'debit') {
      this.solde -= transac.getSomme();
    } else {
      this.solde += transac.getSomme();
    }

    this.notifyObserver();
  };

  Caisse.prototype.getTransac = function () {
    return this.transactions;
  };

  Caisse.prototype.getSolde = function () {
    return this.solde;
  };

  return Caisse;
}();

exports.Caisse = Caisse;
},{}],"src/classes/etatCompteView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.etatCompte = void 0;

var etatCompte =
/** @class */
function () {
  function etatCompte() {
    this.div = document.querySelector('#etatCompte');
  }

  etatCompte.prototype.update = function (caisse) {
    this.div.className = 'debit';
    var solde = caisse.getSolde();

    if (solde < 0) {
      this.div.className = 'debit';
      this.div.innerText = 'A découvert';
    } else {
      this.div.className = 'credit';
      this.div.innerText = 'A crédit';
    }
  };

  return etatCompte;
}();

exports.etatCompte = etatCompte;
},{}],"src/classes/listeTransactionView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listeTransactionView = void 0;

var listeTransactionView =
/** @class */
function () {
  function listeTransactionView() {
    this.ul = document.querySelector('.ulListeTransac');
  }

  listeTransactionView.prototype.update = function (caisse) {
    var _this = this;

    var transac = caisse.getTransac();
    this.ul.innerHTML = '';
    transac.forEach(function (trsc) {
      var liHtml = document.createElement('li');
      var headHtml = document.createElement('h4');
      var paraHtml = document.createElement('p');
      liHtml.className = trsc.getType();
      headHtml.innerText = trsc.getType() === 'debit' ? 'Debit' : 'Credit';
      paraHtml.innerHTML = trsc.setText();

      _this.ul.append(liHtml);

      liHtml.append(headHtml);
      liHtml.append(paraHtml);
    });
  };

  return listeTransactionView;
}();

exports.listeTransactionView = listeTransactionView;
},{}],"src/classes/nombreDeTransactionsView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nombreDeTransactions = void 0;

var nombreDeTransactions =
/** @class */
function () {
  function nombreDeTransactions() {
    this.td1 = document.querySelector('#countDebit');
    this.td2 = document.querySelector('#countCredit');
  }

  nombreDeTransactions.prototype.update = function (caisse) {
    var transac = caisse.getTransac();
    var totaldebit = 0;
    var totalcredit = 0;
    transac.forEach(function (trs) {
      if (trs.getType() === 'debit') {
        totaldebit++;
      } else {
        totalcredit++;
      }
    });
    this.td1.innerText = totaldebit.toString();
    this.td2.innerText = totalcredit.toString();
    console.log(totaldebit);
  };

  return nombreDeTransactions;
}();

exports.nombreDeTransactions = nombreDeTransactions;
},{}],"src/classes/personalArray.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personalArray = void 0;

var personalArray =
/** @class */
function () {
  function personalArray() {
    this.table = document.querySelector('#cumulesSommes');
  }

  personalArray.prototype.update = function (caisse) {
    var _this = this;

    var transac = caisse.getTransac();
    var personnesArray = [];
    transac.forEach(function (trs) {
      var db = personnesArray.filter(function (element) {
        return element.name === trs.getName();
      }).length;

      if (db === 0) {
        var personne = {
          name: trs.getName(),
          debit: trs.getType() === 'debit' ? trs.getSomme() : 0,
          credit: trs.getType() === 'credit' ? trs.getSomme() : 0
        };
        personnesArray.push(personne);
      } else {
        for (var _i = 0, personnesArray_1 = personnesArray; _i < personnesArray_1.length; _i++) {
          var ele = personnesArray_1[_i];
          var index = personnesArray.findIndex(function (pers) {
            return pers.name === trs.getName();
          });

          if (trs.getType() === 'debit') {
            personnesArray[index].debit += trs.getSomme();
          } else {
            personnesArray[index].credit += trs.getSomme();
          }
        }
      }

      _this.table.innerHTML = "\n            <table id=\"cumulesSommes\">\n                <thead>\n                    <th>Personnel</th>\n                    <th>Debit</th>\n                    <th>Credit</th>\n                </thead>\n            </table>";

      for (var _a = 0, personnesArray_2 = personnesArray; _a < personnesArray_2.length; _a++) {
        var personne = personnesArray_2[_a];
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        td1.innerText = personne.name;
        td2.innerText = personne.debit.toString();
        td3.innerText = personne.credit.toString();

        _this.table.append(tr);

        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
      }
    });
  };

  return personalArray;
}();

exports.personalArray = personalArray;
},{}],"src/classes/soldeView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soldeView = void 0;

var soldeView =
/** @class */
function () {
  function soldeView() {
    this.div = document.querySelector('#divSolde');
  }

  soldeView.prototype.update = function (caisse) {
    var solde = caisse.getSolde();
    this.div.innerHTML = solde.toString();
  };

  return soldeView;
}();

exports.soldeView = soldeView;
},{}],"src/classes/transaction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction(nom, montant, type, motif) {
    this.nomPersonne = nom;
    this.sommeTtransaction = montant;
    this.typeTransaction = type;
    this.motifTransaction = motif;
  }

  Transaction.prototype.getName = function () {
    return this.nomPersonne;
  };

  Transaction.prototype.getType = function () {
    return this.typeTransaction;
  };

  Transaction.prototype.getSomme = function () {
    return this.sommeTtransaction;
  };

  Transaction.prototype.getMotif = function () {
    return this.motifTransaction;
  };

  Transaction.prototype.setText = function () {
    return "".concat(this.getSomme(), " a \xE9t\xE9 ").concat(this.getType() === 'debit' ? 'retiré' : 'déposé', " par ").concat(this.getName(), " suite a ").concat(this.getMotif());
  };

  return Transaction;
}();

exports.Transaction = Transaction;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var caisse_1 = require("./src/classes/caisse");

var etatCompteView_1 = require("./src/classes/etatCompteView");

var listeTransactionView_1 = require("./src/classes/listeTransactionView");

var nombreDeTransactionsView_1 = require("./src/classes/nombreDeTransactionsView");

var personalArray_1 = require("./src/classes/personalArray");

var soldeView_1 = require("./src/classes/soldeView");

var transaction_1 = require("./src/classes/transaction"); //instanciation de la caisse(subject)


var caisse = new caisse_1.Caisse(10000); //instanciation des views(observers)

var solde = new soldeView_1.soldeView();
var listeTransaction = new listeTransactionView_1.listeTransactionView();
var nombreTransaction = new nombreDeTransactionsView_1.nombreDeTransactions();
var etat = new etatCompteView_1.etatCompte();
var personnalAccount = new personalArray_1.personalArray(); //inscription des views à la caisse

caisse.subscribeObserver(solde);
caisse.subscribeObserver(listeTransaction);
caisse.subscribeObserver(nombreTransaction);
caisse.subscribeObserver(etat);
caisse.subscribeObserver(personnalAccount); //Déclaration et Ecoute de l'événement sur le bouton ADD

var buttonADD = document.querySelector('#buttonSubmit');
buttonADD.addEventListener('click', function (e) {
  e.preventDefault(); //déclaration des différents champs du formulaire

  var name = document.querySelector('#name');
  var somme = document.querySelector('#somme');
  var type = document.querySelector('#type');
  var motif = document.querySelector('#motif'); //instanciation de la transaction

  var transaction = new transaction_1.Transaction(name.value, parseInt(somme.value), type.value, motif.value); //  ajout de la transaction dans la caisse

  caisse.addTransac(transaction);
});
},{"./src/classes/caisse":"src/classes/caisse.ts","./src/classes/etatCompteView":"src/classes/etatCompteView.ts","./src/classes/listeTransactionView":"src/classes/listeTransactionView.ts","./src/classes/nombreDeTransactionsView":"src/classes/nombreDeTransactionsView.ts","./src/classes/personalArray":"src/classes/personalArray.ts","./src/classes/soldeView":"src/classes/soldeView.ts","./src/classes/transaction":"src/classes/transaction.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65356" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map