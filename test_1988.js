const reduceNumber = (num, allowMasterNumbers = true) => {
  while (num > 9) {
    if (allowMasterNumbers && (num === 11 || num === 22 || num === 33)) {
      break;
    }
    num = num.toString().split('').reduce((acc, val) => acc + parseInt(val, 10), 0);
  }
  return num;
};

// Check all days in 1988
for (let m = 1; m <= 12; m++) {
  for (let d = 1; d <= 31; d++) {
    const dayStr = d.toString().padStart(2, '0');
    const monthStr = m.toString().padStart(2, '0');
    const yearStr = '1988';
    
    const fullDateStr = dayStr + monthStr + yearStr;
    const totalSum = fullDateStr.split('').reduce((acc, val) => acc + parseInt(val, 10), 0);
    const talento = reduceNumber(totalSum, true);
    
    if (talento === 9 && (totalSum === 26 || totalSum === 27 || totalSum === 35 || totalSum === 36 || totalSum === 45)) {
      console.log(`Date ${dayStr}/${monthStr}/${yearStr} has total linear sum ${totalSum} -> reduces to ${talento}`);
    }
  }
}
