// checkExists
// import db from '../firebase/firebase';

// const checkExists = (fundCode) => {
//     var error;
//     db.ref().orderByChild('FundservCode').equalTo(fundCode).once("value", function(snapshot) {
//         if (!snapshot.exists()) {
//             error = 'RETURN VALUE PASSED';
//             console.log('got here')
//         }
//     }).then(() => {
//         console.log('error in selector:', error);
//         return error;
//     })
// }

// export default checkExists;