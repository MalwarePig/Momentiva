
 function revolverStrings(str1, str2) {
    let resultado = '';

    const maxLen = Math.max(str1.length, str2.length);

    for (let i = 0; i < maxLen; i++) {
        if (i < str1.length) resultado += str1[i];
        if (i < str2.length) resultado += str2[i];
    }

    return resultado;
}

function desrevolverStrings(revuelto) {
  let str1 = '';
  let str2 = '';

  for (let i = 0; i < revuelto.length; i++) {
    if (i % 2 === 0) {
      str1 += revuelto[i];
    } else {
      str2 += revuelto[i];
    }
  }

  return [str1, str2];
}


module.exports = revolverStrings