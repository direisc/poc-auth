import * as JsCrypto from "jscrypto/es6";

// import crypto from 'node:crypto';

// declare global {
// namespace NodeJS  {
//   interface Global {
//     crypto: typeof crypto
//   }
// }
// }


const tmk = '0123456789ABCDEFFEDCBA9876543210'

const demoTrackKsn ="09120200630001E0004C"
const demoTrackIpek="5AF93691729D99703E3F2E386B619DFC"
const demoIpekKcv = JsCrypto.DES3.encrypt(demoTrackIpek, "0000000000000000");
//encDemoTrackIpek = FF811AB9745399D6A5096AC1E6EE0AA7
//demoIpekKcv = 377EE0
const encDemoTrackIpek = JsCrypto.DES3.encrypt(tmk, demoTrackIpek);
const demoEmvKsn ="09220200630001E0004C"
const demoEmvIpek="FA21E5290EE89881AF360574087496EA"
const demoEmvIpekKcv = JsCrypto.DES3.encrypt(demoEmvIpek, "0000000000000000");
//encDemoEmvIpek = 39A694D57E565D2BDB85447BF856F074
//demoIpekKcv = AE8F91
const encDemoEmvIpek = JsCrypto.DES3.encrypt(tmk, demoEmvIpek);
const demoPinKsn ="09320200630001E0004C"
const demoPinIpek="0F3E0B885C29062A5C32263A06FB7533"
const demoPinIpekKcv = JsCrypto.DES3.encrypt(demoPinIpek, "0000000000000000");
//encDemoIpek = E1AAE4AB1550A8776CF693BE6EA9C9FB
//demoIpekKcv = 7DD75C
const encDemoPinIpek = JsCrypto.DES3.encrypt(tmk, demoPinIpek);