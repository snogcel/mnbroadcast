'use strict';

var Bitcore = require('bitcore-lib-dash');
var ripemd160 = Bitcore.crypto.Hash.ripemd160;

var Message = require('bitcore-message-dash');

var privateKey = new Bitcore.PrivateKey('testnet'); // 1000 Dash Collateral
var mnPrivateKey = new Bitcore.PrivateKey.fromWIF('92ptYNcW8Jyhw8VKe6auXxGs6z5QLHPW22jzJz9RLyq8gkTTnPc', 'testnet'); // Generated with "genkey" command
var masternode = '133.130.103.78:19999';

var time = Math.floor(Date.now() / 1000);
var protocol = '70206';

var publicKeyHash = ripemd160(privateKey.publicKey.toBuffer());
var mnPublicKeyHash = ripemd160(mnPrivateKey.publicKey.toBuffer());

var message = masternode+time+publicKeyHash.toString('hex')+mnPublicKeyHash.toString('hex')+protocol; // unsigned masternode start message
console.log("message: "+message);

var signature = Message(message).sign(privateKey); // sign masternode start message with private key
console.log("signature: "+signature);

var mnb = new Buffer(message+signature); // combine message and signature

console.log(mnb.toString('hex')); // hex encode
