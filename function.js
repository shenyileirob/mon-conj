
// Note: JS has no regressive assertion.
// Transforming (?<![SET])(STRING) -> $1 into (^|[^SET])(STRING) -> $1$2 will work in some cases.

function xlit2graph(s) {
	s = xlit2gbkey(s);
	s = gbkey2graph(s);
	return s;
}

function pinyin2graph(s) {
	s = pinyin2gbkey(s);
	s = unicode2gbkey(s); // this should follow pinyin2gbkey
	s = gbkey2graph(s);
	return s;
}

function xlit2gbkey(s) {
	s = s.replace(/ĉ/g, 'Q');
	s = s.replace(/ẑ/g, 'Z');
	s = s.replace(/ɬ/g, 'L');
	s = s.replace(/ř/g, 'R');
	s = s.replace(/ḳ/g, 'K');
	s = s.replace(/ǰ/g, 'j');
	s = s.replace(/ŋ/g, 'N');
	s = s.replace(/ë/g, 'E');
	s = s.replace(/c/g, 'C');
	s = s.replace(/č/g, 'c');
	s = s.replace(/h/g, 'H');
	s = s.replace(/x/g, 'h');
	s = s.replace(/š/g, 'x');
	s = s.replace(/u/g, 'v');
	s = s.replace(/ü/g, 'u');
	s = s.replace(/o/g, 'q');
	s = s.replace(/ö/g, 'o');
	return s;
}
function pinyin2gbkey(s) {
	s = s.replace(/J/g, 'Z');
	s = s.replace(/C/g, 'Q');
	s = s.replace(/;/g, 'N');
	s = s.replace(/c/g, 'C');
	s = s.replace(/q/g, 'c');
	s = s.replace(/o/g, 'q');
	s = s.replace(/v/g, '_a');
	s = s.replace(/ha$/g, 'h_a');
	s = s.replace(/ga$/g, 'g_a');
	s = s.replace(/-q/g, '-v');
	return s;
}
function unicode2gbkey(s) {
	// phon code -> s code
	s = s.replace(/͏/g, '~');
	s = s.replace(/᠋/g, "'");
	s = s.replace(/᠌/g, '"');
	s = s.replace(/᠍/g, '`');
	s = s.replace(/ /g, '-');
	s = s.replace(/᠎/g, '_');
	s = s.replace(/᠇/g, '$');
	s = s.replace(/᠊/g, '&');
	s = s.replace(/ᠠ/g, 'a');
	s = s.replace(/ᠡ/g, 'e');
	s = s.replace(/ᠢ/g, 'i');
	s = s.replace(/ᠣ/g, 'q');
	s = s.replace(/ᠤ/g, 'v');
	s = s.replace(/ᠥ/g, 'o');
	s = s.replace(/ᠦ/g, 'u');
	s = s.replace(/ᠧ/g, 'E');
	s = s.replace(/ᠨ/g, 'n');
	s = s.replace(/ᠩ/g, 'N');
	s = s.replace(/ᠪ/g, 'b');
	s = s.replace(/ᠫ/g, 'p');
	s = s.replace(/ᠬ/g, 'h');
	s = s.replace(/ᠭ/g, 'g');
	s = s.replace(/ᠮ/g, 'm');
	s = s.replace(/ᠯ/g, 'l');
	s = s.replace(/ᠰ/g, 's');
	s = s.replace(/ᠱ/g, 'x');
	s = s.replace(/ᠲ/g, 't');
	s = s.replace(/ᠳ/g, 'd');
	s = s.replace(/ᠴ/g, 'c');
	s = s.replace(/ᠵ/g, 'j');
	s = s.replace(/ᠶ/g, 'y');
	s = s.replace(/ᠷ/g, 'r');
	s = s.replace(/ᠸ/g, 'w');
	s = s.replace(/ᠹ/g, 'f');
	s = s.replace(/ᠺ/g, 'k');
	s = s.replace(/ᠻ/g, 'K');
	s = s.replace(/ᠼ/g, 'C');
	s = s.replace(/ᠽ/g, 'z');
	s = s.replace(/ᠾ/g, 'H');
	s = s.replace(/ᠿ/g, 'R');
	s = s.replace(/ᡀ/g, 'L');
	s = s.replace(/ᡁ/g, 'Z');
	s = s.replace(/ᡂ/g, 'Q');
	return s;
}

function gbkey2graph(s) {
	// s = s.replace(/(?<=[aqv])([*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1M');
	// s = s.replace(/(?<=[eouE])([*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F');
	s = s.replace(/([aqv][*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1M'); 
	s = s.replace(/((^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-])[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F'); // bleeding regressive propagation!!!!!!
	s = s.replace(/([eouE][*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F');
	s = s.replace(/g(?=[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*[Maqv])/g, 'M');
	s = s.replace(/g(?=[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*[FeouE])/g, 'F');
	s = s.replace(/_a%/g, 'a%');
	s = s.replace(/_e%/g, 'e%');
	// s = s.replace(/(?<![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$15$2');
	// s = s.replace(/(?<![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$17$2');
	s = s.replace(/(^|[^*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$1$25$3');
	s = s.replace(/(^|[^*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$1$27$3');
	s = s.replace(/([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])/g, '$19$2');
	s = s.replace(/([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$18$2');
	s = s.replace(/([qv])8['`]%/g, '$18~%');
	s = s.replace(/([ou])8[`]%/g, '$18~%');
	// s = s.replace(/(?<=[\-])a5/g, 'a19');
	// s = s.replace(/(?<=[\-])e5/g, 'e19');
	// s = s.replace(/(?<=[\-])a7/g, 'a28');
	// s = s.replace(/(?<=[\-])i5/g, 'i09');
	// s = s.replace(/(?<=[\-])i7y8/g, 'i08y08');
	// s = s.replace(/(?<=[\-])v5/g, 'v09');
	// s = s.replace(/(?<=[\-])v7/g, 'v08');
	// s = s.replace(/(?<=[\-])u5/g, 'u09');
	// s = s.replace(/(?<=[\-])u7/g, 'u08');
	// s = s.replace(/(?<=[\-])d7/g, 'd17');
	// s = s.replace(/(?<=[\-])y7i/g, 'y17i');
	s = s.replace(/([\-])a5/g, '$1a19');
	s = s.replace(/([\-])e5/g, '$1e19');
	s = s.replace(/([\-])a7/g, '$1a28');
	s = s.replace(/([\-])i5/g, '$1i09');
	s = s.replace(/([\-])i7y8/g, '$1i08y08');
	s = s.replace(/([\-])v5/g, '$1v09');
	s = s.replace(/([\-])v7/g, '$1v08');
	s = s.replace(/([\-])u5/g, '$1u09');
	s = s.replace(/([\-])u7/g, '$1u08');
	s = s.replace(/([\-])d7/g, '$1d17');
	s = s.replace(/([\-])y7i/g, '$1y17i');
	s = s.replace(/n9(?=[_])/g, 'n28');
	s = s.replace(/h9(?=[_])/g, 'h38');
	s = s.replace(/[gMF]9(?=[_])/g, 'g28');
	s = s.replace(/j5(?=[_])/g, 'j18');
	s = s.replace(/j9(?=[_])/g, 'j18');
	s = s.replace(/y9(?=[_])/g, 'y28');
	s = s.replace(/w9(?=[_])/g, 'w19');
	s = s.replace(/_a5/g, 'a19');
	s = s.replace(/_e5/g, 'e19');
	s = s.replace(/(%[aiqv])8/g, '$118');
	s = s.replace(/(%[ou])8/g, '$128');
	// s = s.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)o8/g, '$1o18');
	// s = s.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)u8/g, '$1u18');
	s = s.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)o8/g, '$1$2o18');
	s = s.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)u8/g, '$1$2u18');
	s = s.replace(/([bpfkK][0123]?[5789][~'"`]?[qv])9/g, '$139');
	s = s.replace(/([hgMFbpfkK][0123]?[5789][~'"`]?[ou])9/g, '$139');
	// Manchu compatible CO/U
	// s = s.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?[qvou])9/g, '$119'); // lookbehind
	s = s.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?[qvou])9/g, '$1$219');
	// Almas offglide I rules
	s = s.replace(/([aeqvE][0123]?[5789][~'"`]?)i8/g, '$1i28'); //  lookbehind
	// s = s.replace(/(?<![%])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[8][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1i28');
	s = s.replace(/(^|[^%])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[8][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1$2i28'); // lookbehind
	s = s.replace(/([aeiqvouE][0123]?[5789][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1i28');

	s = s.replace(/y8/g, 'y18');
	s = s.replace(/n8(?=[aeiqvouE][0123]?[5789][~'"`]?)/g, 'n18');
	s = s.replace(/n8/g, 'n08');
	s = s.replace(/d8(?=[aeiqvouE][0123]?[5789][~'"`]?)/g, 'd18');
	s = s.replace(/d8/g, 'd08');
	s = s.replace(/h7(?=[aqv][0123]?[5789][~'"`]?)/g, 'h07');
	s = s.replace(/h7/g, 'h05');
	s = s.replace(/h8(?=[aqv][0123]?[5789][~'"`]?)/g, 'h08');
	s = s.replace(/h8/g, 'h05');
	s = s.replace(/[gMF]7(?=[aqv][0123]?[5789][~'"`]?)/g, 'g07');
	s = s.replace(/[gMF]7/g, 'g05');
	s = s.replace(/[gMF]8(?=[aqv][0123]?[5789][~'"`]?)/g, 'g18');
	s = s.replace(/[gMF]8(?=[eiouE][0123]?[5789][~'"`]?)/g, 'g05');
	s = s.replace(/([aqv][0123]?[5789][~'"`]?)[gMF]8/g, '$1g08');
	s = s.replace(/([eouE][0123]?[5789][~'"`]?)[gMF]8/g, '$1g38');
	s = s.replace(/([aqv][0123]?[5789][~'"`]?)[gMF]9/g, '$1g09');
	s = s.replace(/([eouE][0123]?[5789][~'"`]?)[gMF]9/g, '$1g19');
	s = s.replace(/(i[0123]?[5789][~'"`]?)M8/g, '$1g08');
	s = s.replace(/(i[0123]?[5789][~'"`]?)F8/g, '$1g38');
	s = s.replace(/(i[0123]?[5789][~'"`]?)M9/g, '$1g09');
	s = s.replace(/(i[0123]?[5789][~'"`]?)F9/g, '$1g19');
	s = s.replace(/[MF]/g, 'g');
	s = s.replace(/g8/g, 'g38');
	s = s.replace(/g9/g, 'g19');
	s = s.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])~/g, '$10$2');
	s = s.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])'/g, '$11$2');
	s = s.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])"/g, '$12$2');
	s = s.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])`/g, '$13$2');
	s = s.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])([5789])/g, '$10$2');
	s = s.replace(/i28/g, 'II');
	s = s.replace(/g39/g, 'G');
	s = s.replace(/q39/g, 'O');
	s = s.replace(/v19/g, 'O');
	s = s.replace(/v39/g, 'O');
	s = s.replace(/o39/g, 'O');
	s = s.replace(/u39/g, 'O');
	s = s.replace(/n19/g, 'n');
	s = s.replace(/n29/g, 'n');
	s = s.replace(/v19/g, 'O');
	s = s.replace(/g29/g, 'G');
	s = s.replace(/o07/g, 'AOI');
	s = s.replace(/o18/g, 'OI');
	s = s.replace(/o28/g, 'AOI');
	s = s.replace(/u07/g, 'AOI');
	s = s.replace(/u18/g, 'OI');
	s = s.replace(/u28/g, 'AOI');
	s = s.replace(/Q07/g, 'OO');
	s = s.replace(/Q05/g, 'OO');
	s = s.replace(/Q08/g, 'OO');
	s = s.replace(/Q09/g, 'OO');
	s = s.replace(/d08/g, 'OA');
	s = s.replace(/d09/g, 'OA');
	s = s.replace(/a05/g, 'AA');
	s = s.replace(/a15/g, 'A');
	s = s.replace(/a07/g, 'AA');
	s = s.replace(/a28/g, 'A');
	s = s.replace(/a08/g, 'A');
	s = s.replace(/a18/g, 'AA');
	s = s.replace(/a09/g, 'A');
	s = s.replace(/a19/g, 'ɑ');
	s = s.replace(/e05/g, 'A');
	s = s.replace(/e07/g, 'A');
	s = s.replace(/e17/g, 'AA');
	s = s.replace(/e08/g, 'A');
	s = s.replace(/e09/g, 'A');
	s = s.replace(/e19/g, 'ɑ');
	s = s.replace(/i05/g, 'AI');
	s = s.replace(/i07/g, 'AI');
	s = s.replace(/i08/g, 'I');
	s = s.replace(/i18/g, 'AI');
	s = s.replace(/i09/g, 'I');
	s = s.replace(/q05/g, 'AO');
	s = s.replace(/q07/g, 'AO');
	s = s.replace(/q08/g, 'O');
	s = s.replace(/q18/g, 'AO');
	s = s.replace(/q19/g, 'O');
	s = s.replace(/q09/g, 'U');
	s = s.replace(/v05/g, 'AO');
	s = s.replace(/v07/g, 'AO');
	s = s.replace(/v08/g, 'O');
	s = s.replace(/v18/g, 'AO');
	s = s.replace(/v09/g, 'U');
	s = s.replace(/o05/g, 'Aü');
	s = s.replace(/o07/g, 'Aü');
	s = s.replace(/o18/g, 'ü');
	s = s.replace(/o08/g, 'O');
	s = s.replace(/o28/g, 'Aü');
	s = s.replace(/o19/g, 'ü');
	s = s.replace(/o09/g, 'U');
	s = s.replace(/u05/g, 'Aü');
	s = s.replace(/u15/g, 'AU');
	s = s.replace(/u07/g, 'Aü');
	s = s.replace(/u18/g, 'ü');
	s = s.replace(/u08/g, 'O');
	s = s.replace(/u28/g, 'Aü');
	s = s.replace(/u19/g, 'ü');
	s = s.replace(/u09/g, 'U');
	s = s.replace(/E05/g, 'AW');
	s = s.replace(/E07/g, 'AW');
	s = s.replace(/E08/g, 'W');
	s = s.replace(/E09/g, 'W');
	s = s.replace(/n07/g, 'n');
	s = s.replace(/n17/g, 'A');
	s = s.replace(/n18/g, 'n');
	s = s.replace(/n08/g, 'A');
	s = s.replace(/n38/g, 'n');
	s = s.replace(/n28/g, 'n');
	s = s.replace(/n09/g, 'A');
	s = s.replace(/N08/g, 'AG');
	s = s.replace(/N09/g, 'AG');
	s = s.replace(/b07/g, 'b');
	s = s.replace(/b08/g, 'b');
	s = s.replace(/b09/g, 'b');
	s = s.replace(/b19/g, 'b');
	s = s.replace(/p07/g, 'p');
	s = s.replace(/p08/g, 'p');
	s = s.replace(/p09/g, 'p');
	s = s.replace(/h07/g, 'X');
	s = s.replace(/h17/g, 'ġ');
	s = s.replace(/h05/g, 'G');
	s = s.replace(/h15/g, 'G');
	s = s.replace(/h08/g, 'X');
	s = s.replace(/h18/g, 'ġ');
	s = s.replace(/h28/g, 'ġ');
	s = s.replace(/h38/g, 'X');
	s = s.replace(/g07/g, 'ġ');
	s = s.replace(/g17/g, 'X');
	s = s.replace(/g05/g, 'G');
	s = s.replace(/g08/g, 'X');
	s = s.replace(/g18/g, 'ġ');
	s = s.replace(/g38/g, 'G');
	s = s.replace(/g28/g, 'ġ');
	s = s.replace(/g09/g, 'X');
	s = s.replace(/g19/g, 'G');
	s = s.replace(/m07/g, 'm');
	s = s.replace(/m08/g, 'm');
	s = s.replace(/m09/g, 'm');
	s = s.replace(/l07/g, 'L');
	s = s.replace(/l08/g, 'L');
	s = s.replace(/l09/g, 'L');
	s = s.replace(/s07/g, 's');
	s = s.replace(/s08/g, 's');
	s = s.replace(/s09/g, 's');
	s = s.replace(/s19/g, 's');
	s = s.replace(/s29/g, 's');
	s = s.replace(/x07/g, 'š');
	s = s.replace(/x08/g, 'š');
	s = s.replace(/x09/g, 'š');
	s = s.replace(/t07/g, 't');
	s = s.replace(/t08/g, 'd');
	s = s.replace(/t18/g, 't');
	s = s.replace(/t09/g, 't');
	s = s.replace(/d07/g, 't');
	s = s.replace(/d17/g, 'd');
	s = s.replace(/d08/g, 'ð');
	s = s.replace(/d18/g, 'd');
	s = s.replace(/d09/g, 'ð');
	s = s.replace(/d19/g, 'd');
	s = s.replace(/c07/g, 'č');
	s = s.replace(/c08/g, 'č');
	s = s.replace(/c09/g, 'č');
	s = s.replace(/j07/g, 'I');
	s = s.replace(/j08/g, 'ǰ');
	s = s.replace(/j18/g, 'I');
	s = s.replace(/j09/g, 'ǰ');
	s = s.replace(/y07/g, 'y');
	s = s.replace(/y17/g, 'I');
	s = s.replace(/y18/g, 'y');
	s = s.replace(/y08/g, 'I');
	s = s.replace(/y28/g, 'I');
	s = s.replace(/r07/g, 'r');
	s = s.replace(/r08/g, 'r');
	s = s.replace(/r09/g, 'r');
	s = s.replace(/w07/g, 'W');
	s = s.replace(/w08/g, 'W');
	s = s.replace(/w09/g, 'W');
	s = s.replace(/w19/g, 'U');
	s = s.replace(/f07/g, 'f');
	s = s.replace(/f08/g, 'f');
	s = s.replace(/f09/g, 'f');
	s = s.replace(/k07/g, 'k');
	s = s.replace(/k08/g, 'k');
	s = s.replace(/k09/g, 'k');
	s = s.replace(/K07/g, 'k');
	s = s.replace(/K08/g, 'k');
	s = s.replace(/K09/g, 'k');
	s = s.replace(/C07/g, 'c');
	s = s.replace(/C08/g, 'c');
	s = s.replace(/C09/g, 'c');
	s = s.replace(/z07/g, 'z');
	s = s.replace(/z08/g, 'z');
	s = s.replace(/z09/g, 'z');
	s = s.replace(/H07/g, 'AH');
	s = s.replace(/H08/g, 'H');
	s = s.replace(/H09/g, 'H');
	s = s.replace(/R07/g, 'ř');
	s = s.replace(/R08/g, 'ř');
	s = s.replace(/R09/g, 'ř');
	s = s.replace(/L07/g, 'LH');
	s = s.replace(/L08/g, 'LH');
	s = s.replace(/Z07/g, 'H');
	s = s.replace(/Q07/g, 'ĉ');
	s = s.replace(/i29/g, 'II');
	s = s.replace(/g39/g, 'G');
	s = s.replace(/q39/g, 'O');
	s = s.replace(/v19/g, 'O');
	s = s.replace(/v39/g, 'O');
	s = s.replace(/o39/g, 'O');
	s = s.replace(/u39/g, 'O');
	s = s.replace(/n19/g, 'n');
	s = s.replace(/n29/g, 'n');
	s = s.replace(/v19/g, 'O');
	s = s.replace(/g29/g, 'G');
	s = s.replace(/o05/g, 'AOI');
	s = s.replace(/o19/g, 'OI');
	s = s.replace(/o29/g, 'AOI');
	s = s.replace(/u05/g, 'AOI');
	s = s.replace(/u19/g, 'OI');
	s = s.replace(/u29/g, 'AOI');
	s = s.replace(/Q05/g, 'OO');
	s = s.replace(/Q05/g, 'OO');
	s = s.replace(/Q09/g, 'OO');
	s = s.replace(/Q09/g, 'OO');
	s = s.replace(/d09/g, 'OA');
	s = s.replace(/d09/g, 'OA');
	s = s.replace(/a05/g, 'AA');
	s = s.replace(/a15/g, 'A');
	s = s.replace(/a05/g, 'AA');
	s = s.replace(/a29/g, 'A');
	s = s.replace(/a09/g, 'A');
	s = s.replace(/a19/g, 'AA');
	s = s.replace(/a09/g, 'A');
	s = s.replace(/a19/g, 'ɑ');
	s = s.replace(/e05/g, 'A');
	s = s.replace(/e05/g, 'A');
	s = s.replace(/e15/g, 'AA');
	s = s.replace(/e09/g, 'A');
	s = s.replace(/e09/g, 'A');
	s = s.replace(/e19/g, 'ɑ');
	s = s.replace(/i05/g, 'AI');
	s = s.replace(/i05/g, 'AI');
	s = s.replace(/i09/g, 'I');
	s = s.replace(/i19/g, 'AI');
	s = s.replace(/i09/g, 'I');
	s = s.replace(/q05/g, 'AO');
	s = s.replace(/q05/g, 'AO');
	s = s.replace(/q09/g, 'O');
	s = s.replace(/q19/g, 'AO');
	s = s.replace(/q19/g, 'O');
	s = s.replace(/q09/g, 'U');
	s = s.replace(/v05/g, 'AO');
	s = s.replace(/v05/g, 'AO');
	s = s.replace(/v09/g, 'O');
	s = s.replace(/v19/g, 'AO');
	s = s.replace(/v09/g, 'U');
	s = s.replace(/o05/g, 'Aü');
	s = s.replace(/o05/g, 'Aü');
	s = s.replace(/o19/g, 'ü');
	s = s.replace(/o09/g, 'O');
	s = s.replace(/o29/g, 'Aü');
	s = s.replace(/o19/g, 'ü');
	s = s.replace(/o09/g, 'U');
	s = s.replace(/u05/g, 'Aü');
	s = s.replace(/u15/g, 'AU');
	s = s.replace(/u05/g, 'Aü');
	s = s.replace(/u19/g, 'ü');
	s = s.replace(/u09/g, 'O');
	s = s.replace(/u29/g, 'Aü');
	s = s.replace(/u19/g, 'ü');
	s = s.replace(/u09/g, 'U');
	s = s.replace(/E05/g, 'AW');
	s = s.replace(/E05/g, 'AW');
	s = s.replace(/E09/g, 'W');
	s = s.replace(/E09/g, 'W');
	s = s.replace(/n05/g, 'n');
	s = s.replace(/n15/g, 'A');
	s = s.replace(/n19/g, 'n');
	s = s.replace(/n09/g, 'A');
	s = s.replace(/n39/g, 'n');
	s = s.replace(/n29/g, 'n');
	s = s.replace(/n09/g, 'A');
	s = s.replace(/N09/g, 'AG');
	s = s.replace(/N09/g, 'AG');
	s = s.replace(/b05/g, 'b');
	s = s.replace(/b09/g, 'b');
	s = s.replace(/b09/g, 'b');
	s = s.replace(/b19/g, 'b');
	s = s.replace(/p05/g, 'p');
	s = s.replace(/p09/g, 'p');
	s = s.replace(/p09/g, 'p');
	s = s.replace(/h05/g, 'X');
	s = s.replace(/h15/g, 'ġ');
	s = s.replace(/h05/g, 'G');
	s = s.replace(/h15/g, 'G');
	s = s.replace(/h09/g, 'X');
	s = s.replace(/h19/g, 'ġ');
	s = s.replace(/h29/g, 'ġ');
	s = s.replace(/h39/g, 'X');
	s = s.replace(/g05/g, 'ġ');
	s = s.replace(/g15/g, 'X');
	s = s.replace(/g05/g, 'G');
	s = s.replace(/g09/g, 'X');
	s = s.replace(/g19/g, 'ġ');
	s = s.replace(/g39/g, 'G');
	s = s.replace(/g29/g, 'ġ');
	s = s.replace(/g09/g, 'X');
	s = s.replace(/g19/g, 'G');
	s = s.replace(/m05/g, 'm');
	s = s.replace(/m09/g, 'm');
	s = s.replace(/m09/g, 'm');
	s = s.replace(/l05/g, 'L');
	s = s.replace(/l09/g, 'L');
	s = s.replace(/l09/g, 'L');
	s = s.replace(/s05/g, 's');
	s = s.replace(/s09/g, 's');
	s = s.replace(/s09/g, 's');
	s = s.replace(/s19/g, 's');
	s = s.replace(/s29/g, 's');
	s = s.replace(/x05/g, 'š');
	s = s.replace(/x09/g, 'š');
	s = s.replace(/x09/g, 'š');
	s = s.replace(/t05/g, 't');
	s = s.replace(/t09/g, 'd');
	s = s.replace(/t19/g, 't');
	s = s.replace(/t09/g, 't');
	s = s.replace(/d05/g, 't');
	s = s.replace(/d15/g, 'd');
	s = s.replace(/d09/g, 'ð');
	s = s.replace(/d19/g, 'd');
	s = s.replace(/d09/g, 'ð');
	s = s.replace(/d19/g, 'd');
	s = s.replace(/c05/g, 'č');
	s = s.replace(/c09/g, 'č');
	s = s.replace(/c09/g, 'č');
	s = s.replace(/j05/g, 'I');
	s = s.replace(/j09/g, 'ǰ');
	s = s.replace(/j19/g, 'I');
	s = s.replace(/j09/g, 'ǰ');
	s = s.replace(/y05/g, 'y');
	s = s.replace(/y15/g, 'I');
	s = s.replace(/y19/g, 'y');
	s = s.replace(/y09/g, 'I');
	s = s.replace(/y29/g, 'I');
	s = s.replace(/r05/g, 'r');
	s = s.replace(/r09/g, 'r');
	s = s.replace(/r09/g, 'r');
	s = s.replace(/w05/g, 'W');
	s = s.replace(/w09/g, 'W');
	s = s.replace(/w09/g, 'W');
	s = s.replace(/w19/g, 'U');
	s = s.replace(/f05/g, 'f');
	s = s.replace(/f09/g, 'f');
	s = s.replace(/f09/g, 'f');
	s = s.replace(/k05/g, 'k');
	s = s.replace(/k09/g, 'k');
	s = s.replace(/k09/g, 'k');
	s = s.replace(/K05/g, 'k');
	s = s.replace(/K09/g, 'k');
	s = s.replace(/K09/g, 'k');
	s = s.replace(/C05/g, 'c');
	s = s.replace(/C09/g, 'c');
	s = s.replace(/C09/g, 'c');
	s = s.replace(/z05/g, 'z');
	s = s.replace(/z09/g, 'z');
	s = s.replace(/z09/g, 'z');
	s = s.replace(/H05/g, 'AH');
	s = s.replace(/H09/g, 'H');
	s = s.replace(/H09/g, 'H');
	s = s.replace(/R05/g, 'ř');
	s = s.replace(/R09/g, 'ř');
	s = s.replace(/R09/g, 'ř');
	s = s.replace(/L05/g, 'LH');
	s = s.replace(/L09/g, 'LH');
	s = s.replace(/Z05/g, 'H');
	s = s.replace(/Q05/g, 'ĉ');
	s = s.replace(/-/g, ' ');
	s = s.replace(/^ /g, '');
	s = s.replace(/\^/g, '‌');
	s = s.replace(/&/g, '᠊');
	s = s.replace(/\*/g, '‍');
	s = s.replace(/%/g, '‍');
	s = s.replace(/A/g, 'ᡄ');
	s = s.replace(/ɑ/g, 'ᡃ');
	s = s.replace(/I/g, 'ᡅ');
	s = s.replace(/O/g, 'ᡆ');
	s = s.replace(/U/g, 'ᡇ‌');
	s = s.replace(/ü/g, 'ᡉ');
	s = s.replace(/n/g, 'ᡊ');
	s = s.replace(/b/g, 'ᠪ');
	s = s.replace(/p/g, 'ᠫ');
	s = s.replace(/X/g, 'ᡍ');
	s = s.replace(/ġ/g, 'ᡎ');
	s = s.replace(/G/g, 'ᡘ');
	s = s.replace(/m/g, 'ᡏ');
	s = s.replace(/L/g, 'ᠯ');
	s = s.replace(/s/g, 'ᠰ');
	s = s.replace(/š/g, 'ᠱ');
	s = s.replace(/t/g, 'ᡐ');
	s = s.replace(/d/g, 'ᡑ');
	s = s.replace(/ð/g, 'ᡈ');
	s = s.replace(/č/g, 'ᠴ');
	s = s.replace(/ǰ/g, 'ᡔ');
	s = s.replace(/y/g, 'ᡕ');
	s = s.replace(/r/g, 'ᠷ');
	s = s.replace(/W/g, 'ᡖ');
	s = s.replace(/f/g, 'ᠹ');
	s = s.replace(/k/g, 'ᡗ');
	s = s.replace(/c/g, 'ᠼ');
	s = s.replace(/z/g, 'ᠽ');
	s = s.replace(/H/g, 'ᡁ');
	s = s.replace(/ř/g, 'ᠿ');
	s = s.replace(/ĉ/g, 'ᡂ');
	return s;
}

function len (list) {return list.length;}
function list (content) {return content;}
function tuple (content) {return content;}
function set (content) {
	for (i = 0; i < content.length-1; i++) {
		for (j = i+1; j < content.length; j++) {
			// console.log(i, j, content.length, content);
			while (content[i] == content[j]) {
				content.splice(j, 1);
				// console.log('shortened:', content);
			}
		}
	}
	return content;
}
function toregex(str) {
	// if (str == '') {return '';}
	// var str = str.replace(/\\(?=[0-9])/gi, "$");
	// console.log(str, ">", RegExp(str));
	return regex = new RegExp(str, 'g');
}
function toregex2(str) {
	// if (str == '') {return '';}
	var str = str.replace(/\\(?=[0-9])/g, "$");
	// console.log(str, ">", RegExp(str));
	return regex = str;
}
function re_sub(str1, str2, str) {
	// console.log("re_sub:", str, toregex(str1), toregex2(str2), ">", str.replace(toregex(str1), toregex2(str2)));
	return str.replace(toregex(str1), toregex2(str2));
}
function re_search(str1, str) {
	// console.log("re_search:", str, toregex(str1));
	return toregex(str1).test(str);//str.search(toregex(str1))+1;
}
function re_subn(str1, str2, str) {
	// console.log("re_subn:", str, toregex(str1), toregex2(str2), ">", str.replace(toregex(str1), toregex2(str2)));
	return [str.replace(toregex(str1), toregex2(str2)), toregex(str1).test(str)];
}
function conjugate(lemma, cell, if_chn) {
	var lemma = lemma.trim();
	var __left0__ = re_subn ('ᡍᡇ‌$|ᡄᡄᡇ‌$|ᡘᡆ$', '', lemma);
	var stem = __left0__ [0];
	var wf_stem = __left0__ [1];
	var __left0__ = re_subn ('^ᠪᡄᡅᡅ?', '', cell);
	var suffix = __left0__ [0];
	var wf_suffix = __left0__ [1];
	if (!(wf_stem * wf_suffix)) {
		return ['', 0];
	}
	var highlight = 0;
	// console.log('bb case:', stem.slice(-1));
	if (suffix == '') {
		var stem = re_sub ('ᡄᡘ$', 'ᡄ', stem);
		var stem = re_sub ('ᡆ$', 'ᡇ‌', stem);
		var stem = re_sub ('(^.)ᡆᡅ$', '\\1ᡉ', stem);
		var stem = re_sub ('ᡄᡅᡅ$', 'ᡄᡅ', stem);
		// var stem = re_sub ('(?<=..)ᡆᡅᡅ$', 'ᡆᡅ', stem); // lookbehind!!!!!!!!!!
		var stem = re_sub ('(..)ᡆᡅᡅ$', '$1ᡆᡅ', stem);
		if (!(re_search ('ᡘᡆ$', lemma))) {
			var stem = re_sub ('ᡆᡅᡅ$', 'ᡆᡅ', stem);
		}
		var stem = re_sub ('(^.)ᡇ‌$', '\\1ᡆ', stem);
	}
	else if (re_search ('^[ᡏᡎ]|^.ᡃ$|^[ᡍᠯᡄᠰᠪᠷᡈ](?![ᡄᡃᡅᡇᡆᡉ])|^ᡆᡄ|^ᡊᡄᡏ$|^ᠰᡅ$|^ᡕᡇ‌$|^ᠯᡆᡎᡃ$|^ᠷᡆᡄ$', suffix)) {
		var stem = re_sub ('^ᡄᡄᠪ$', 'ᡄᡄᠪᡆ', stem);
		var stem = re_sub ('ᡄᡘ$', 'ᡊᡆ', stem);
		var stem = re_sub ('ᡆᡄ$', 'ᡑᡆ', stem);
		var stem = re_sub ('ᡈ$', 'ᡑᡆ', stem);
		// var stem = re_sub ('ᡍ$', 'ᡎᡆ', stem);
		// var XO_irr = re_search ('ᡍ$', stem); // xiruG does'nt take an epenthetic vowel! (xiruGmui, xiruggul-, xiruGci)
		var __left0__ = re_subn ('ᡍ$', '᠊？᠊', stem);
		var stem = __left0__ [0];
		var XO_irr = __left0__ [1];
		
		var stem = re_sub ('([ᠯᠰᠷ])$', '\\1ᡆ', stem);
		var __left0__ = re_subn ('ᠪ$', 'ᠪᠪᡆ', stem);
		var stem = __left0__ [0];
		var BO_irr = __left0__ [1];
		var __left0__ = re_subn ('ᡘ$', 'ᡘᡘᡆ', stem);
		var stem = __left0__ [0];
		var GO_irr = __left0__ [1];
		var highlight = BO_irr || GO_irr || XO_irr;
	}
	else if (re_search ('ᡄᡘ$', stem)) {
		if (suffix [0] == 'ᡍ') {
			var highlight = 1;
		}
		else {
			var stem = re_sub ('ᡄᡘ$', 'ᡄ', stem);
		}
	}
	else if (re_search ('^ᡄᡄᠪ$', stem) && suffix [0] == 'ᠪ') {
		var stem = re_sub ('ᠪ$', 'ᠪᡆ', stem);
		var highlight = 1;
	}
	else if (stem.slice(-1) == 'ᠪ' && suffix [0] == 'ᠪ') {
		var stem = re_sub ('ᠪ$', 'ᠪᠪᡆ', stem);
		var highlight = 2;
	}
	else if (stem.slice(-1) == 'ᡘ' && suffix [0] == 'ᡍ' && !(re_search ('^ᡍᡇ‌$|^ᡍᡆ[ᡅᡄ]$|^ᡄᡄᡇ‌$|^ᡄᡄᡆ[ᡅᡄ]$|^ᡘᡆ[ᡅᡄ]?$', suffix))) {
		var stem = re_sub ('ᡘ$', 'ᡘᡘᡆ', stem);
		var highlight = 1;
	}
	if (if_chn && re_search ('ᠪᠪᡆ$', stem)) {
		var stem = re_sub ('ᠪᠪᡆ$', 'ᠪᡆ', stem);
		var highlight = highlight >= 2;
	}
	else {
		var highlight = !(!(highlight));
	}
	// console.log([333, stem, suffix]);
	if (re_search ('ᡘᡆ$', lemma)) {
		var suffix = re_sub ('[ᡍᡎ]', 'ᡘ', suffix);
	}
	// console.log([111, stem, suffix]);
	// if (re_search ('[ᠪᡍᠰᠷᡈ]$|(?<!ᡄ)ᡘ$|ᡆᡄ$', stem)) { // lookbehind
	if (re_search ('[ᠪᡍᠰᠷᡈ]$|(^|[^ᡄ])ᡘ$|ᡆᡄ$', stem)) {
		var suffix = re_sub ('^ᡔ', 'ᠴ', suffix);
	}
	var wordform = stem + suffix;
	var wordform = re_sub ('(^.)ᡇ‌$', '\\1ᡆ', wordform);
	var wordform = re_sub ('(.[ᡍᡎ])ᡄ$', '\\1ᡃ', wordform);
	var wordform = re_sub ('ᡘᡃ$', 'ᡘᡄ', wordform);
	var wordform = re_sub ('([ᠪᡘ])ᡇ‌$', '\\1ᡆ', wordform);
	// console.log([wordform, highlight]);
	return [wordform, highlight];
};
function deconjugate_suffix (wordform, suffix, if_infer_stem_mf, if_dict, if_bare_stem) {
	// console.log('param:', if_infer_stem_mf, if_dict, if_bare_stem);
	var lemma_list = [];

	var __left0__ = re_subn ('[ᡍᡎ]', 'ᡘ', suffix);
	var suffix_f = __left0__ [0];
	var mf_suffix = __left0__ [1];
	var mf_suffix = !(!(mf_suffix));
	if (mf_suffix) {
		var suffix_f = re_sub ('ᡘᡃ$', 'ᡘᡄ', suffix_f);
		var suffix_f = re_sub ('([ᠪᡘ])ᡇ‌$', '\\1ᡆ', suffix_f);
	}
	var __left0__ = re_subn ('^ᡔ', 'ᠴ', suffix);
	var suffix_c = __left0__ [0];
	var jc_suffix = __left0__ [1];
	var jc_suffix = !(!(jc_suffix));
	var flag_match = 0;
	if (re_search (suffix + '$', wordform)) {
		var flag_match = 1;
		var mf_form = mf_suffix;
		var jc_form = jc_suffix;
		var stem_raw = re_sub (suffix + '$', '', wordform);
		if (stem_raw == '') {
			return lemma_list;
		}
	}
	if (!(flag_match) && mf_suffix && re_search (suffix_f + '$', wordform)) {
		var flag_match = 1;
		var mf_form = 2;
		var jc_form = jc_suffix;
		var stem_raw = re_sub (suffix_f + '$', '', wordform);
		if (stem_raw == '') {
			return lemma_list;
		}
	}
	if (!(flag_match) && jc_suffix && re_search (suffix_c + '$', wordform)) {
		var flag_match = 1;
		var mf_form = mf_suffix;
		var jc_form = 2;
		var stem_raw = re_sub (suffix_c + '$', '', wordform);
		if (stem_raw == '') {
			return lemma_list;
		}
	}
	if (!(flag_match) && mf_suffix && jc_suffix) {
		var suffix_f_c = re_sub ('^ᡔ', 'ᠴ', suffix_f);
		if (re_search (suffix_f_c + '$', wordform)) {
			var flag_match = 1;
			var mf_form = 2;
			var jc_form = 2;
			var stem_raw = re_sub (suffix_f_c + '$', '', wordform);
			if (stem_raw == '') {
				return lemma_list;
			}
		}
	}
	if (!(flag_match)) {
		return lemma_list;
	}
	
	if (mf_form == 1) {
		var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
	}
	else if (mf_form == 2) {
		var suffix_xu_list = /*list*/ (['ᡘᡆ']);
	}
	else {
		var suffix_xu_list = /*list*/ (['ᡍᡇ‌', 'ᡘᡆ']);
		if (suffix == '') {
			if (re_search ('ᡆᡅᡅ$', stem_raw)) {
				var suffix_xu_list = /*list*/ (['ᡘᡆ']);
			}
			else if (re_search ('^.ᡆᡅ$', stem_raw)) {
				var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
			}
		}
		if (if_infer_stem_mf && !(if_dict)) {
			if (re_search ('[ᡍᡎ]', stem_raw) || re_search ('^ᡄᡄ(?![ᡑᡘ])', stem_raw) || re_search ('^.ᡆ(?!ᡅ)', stem_raw)) {
				var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
			}
			// else if (re_search ('(?<!ᡄ)ᡘ(?!ᡅ)', stem_raw) || re_search ('[ᡖᡊᠪᠫᡎᡏᠰᠱᡐᡑᠴᡔᡕᠷᠹᡗᠼᠽᠿᡍᡘᠯᡁ]ᡄᡘ(?!ᡅ)', stem_raw) || re_search ('^ᡄ(?![ᡄᡅᡆᡉ])', stem_raw) || re_search ('^ᡄᡄᡘᡅ', stem_raw) || re_search ('^.ᡆ(?!ᡅ)', stem_raw)) { // lookbehind
			else if (re_search ('(^|[^ᡄ])ᡘ(?!ᡅ)', stem_raw) || re_search ('[ᡖᡊᠪᠫᡎᡏᠰᠱᡐᡑᠴᡔᡕᠷᠹᡗᠼᠽᠿᡍᡘᠯᡁ]ᡄᡘ(?!ᡅ)', stem_raw) || re_search ('^ᡄ(?![ᡄᡅᡆᡉ])', stem_raw) || re_search ('^ᡄᡄᡘᡅ', stem_raw) || re_search ('^.ᡆ(?!ᡅ)', stem_raw)) {
				var suffix_xu_list = /*list*/ (['ᡘᡆ']);
			}
		}
	}
	var stem_list_temp = /*list*/ ([]);
	var stem_list = /*list*/ ([]);
	if (suffix == '') {
		if (re_search ('ᡃ$', stem_raw)) {
			// var __left0__ = re_subn ('(?<=[ᡍᡎ])ᡃ$', 'ᡄ', stem_raw); // lookbehind!!!!!!!!!!!!
			var __left0__ = re_subn ('([ᡍᡎ])ᡃ$', '$1ᡄ', stem_raw);
			var stem_raw = __left0__ [0];
			var flag_xa_ga = __left0__ [1];
			if (flag_xa_ga) {
				stem_list.push (stem_raw);
			}
			else {
				return lemma_list;
			}
		}
		else if (re_search ('ᡏ$|ᡄᡘ$', stem_raw)) {
			return lemma_list;
		}
		else {
			var stem_raw = re_sub ('(ᡄᡅ|ᡆᡅ)$', '\\1ᡅ', stem_raw);
			var stem_raw = re_sub ('ᡇ‌$', 'ᡆ', stem_raw);
			var stem_raw = re_sub ('^(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw); // javascript \b definition is strange
//			var stem_raw = re_sub ('\\b(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw);
			stem_list.push (stem_raw);
		}
	}
	else if (jc_form) {
		if (jc_form == 1) {
			// if (re_search ('[ᡅᡆᡉᠯ]$|(?<![ᡄᡆᡅ]ᡆ)ᡄ$', stem_raw)) {
			if (re_search ('[ᡅᡆᡉᠯ]$|(^|[^ᡄᡆᡅ])ᡆᡄ$|(^|[^ᡆ])ᡄ$', stem_raw)) {
				var stem_raw = re_sub ('^(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw); // javascript \b definition is strange
//				var stem_raw = re_sub ('\\b(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw);
				stem_list.push (stem_raw);
			}
		}
		else if (re_search ('[ᠪᡍᡘᠷᠰᡈ]$|.[ᡄᡆᡅ]ᡆᡄ$', stem_raw)) {
			stem_list.push (stem_raw);
		}
	}
	else if (re_search ('^[ᡏᡎ]|^.ᡃ$|^[ᡍᠯᡄᠰᠪᠷ](?![ᡄᡃᡅᡇᡆᡉ])|^ᡆᡄ|^ᡊᡄᡏ$|^ᠰᡅ$|^ᡕᡇ‌$|^ᠯᡆᡎᡃ$|^ᠷᡆᡄ$', suffix)) {
		if (!(re_search ('[ᡖᡊᠪᠫᡎᡏᠰᠱᡐᡑᠴᡔᡕᠷᠹᡗᠼᠽᠿᡍᡘᠯᡁ]ᡄ$|^[ᡄᡅ]ᡄ$|[ᡅᡆᡉ]$', stem_raw))) { // javascript \b definition is strange
//		if (!(re_search ('[ᡖᡊᠪᠫᡎᡏᠰᠱᡐᡑᠴᡔᡕᠷᠹᡗᠼᠽᠿᡍᡘᠯᡁ]ᡄ$|\\b[ᡄᡅ]ᡄ$|[ᡅᡆᡉ]$', stem_raw))) {
			return lemma_list;
		}
		var search_u = 0;
		if (re_search ('[ᠪᡘᡎᡊ]ᡆ$', stem_raw)) {
			if (re_search ('[ᠪ]ᡆ$', stem_raw)) {
				if (!(search_u)) {
					var __left0__ = re_subn ('^(ᡘᡆᡅᠪ)ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//					var __left0__ = re_subn ('\\b(ᡘᡆᡅᠪ)ᡆ$', '\\1', stem_raw);
					var stem_no_u = __left0__ [0];
					var search_u = __left0__ [1];
					if (search_u) {
						stem_list.push (stem_raw);
						stem_list.push (stem_no_u);
						var suffix_xu_list = /*list*/ (['ᡘᡆ']);
					}
				}
				if (!(search_u)) {
					var __left0__ = re_subn ('^(ᡅᡅᠪ|ᠴᡅᠪ|ᡘᡆᡅᠪ)ᠪ?ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//					var __left0__ = re_subn ('\\b(ᡅᡅᠪ|ᠴᡅᠪ|ᡘᡆᡅᠪ)ᠪ?ᡆ$', '\\1', stem_raw);
					var stem_no_u = __left0__ [0];
					var search_u = __left0__ [1];
					if (search_u) {
						stem_list.push (stem_no_u);
						var suffix_xu_list = /*list*/ (['ᡘᡆ']);
					}
				}
				if (!(search_u)) {
					var __left0__ = re_subn ('^(ᡄᡄᠪ)ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//					var __left0__ = re_subn ('\\b(ᡄᡄᠪ)ᡆ$', '\\1', stem_raw);
					var stem_no_u = __left0__ [0];
					var search_u = __left0__ [1];
					if (search_u) {
						stem_list.push (stem_no_u);
						var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
					}
				}
			}
			if (!(search_u)) {
				var __left0__ = re_subn ('^(ᡄᡆᡅᡘ)ᡘᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//				var __left0__ = re_subn ('\\b(ᡄᡆᡅᡘ)ᡘᡆ$', '\\1', stem_raw);
				var stem_no_u = __left0__ [0];
				var search_u = __left0__ [1];
				if (search_u) {
					stem_list.push (stem_no_u);
					var suffix_xu_list = /*list*/ (['ᡘᡆ']);
				}
			}
			if (!(search_u)) {
				var __left0__ = re_subn ('^(ᡘᡅᠷᡆ)ᡎᡆ$', '\\1ᡍ', stem_raw); // javascript \b definition is strange
//				var __left0__ = re_subn ('\\b(ᡘᡅᠷᡆ)ᡎᡆ$', '\\1ᡍ', stem_raw);
				var stem_no_u = __left0__ [0];
				var search_u = __left0__ [1];
				if (search_u) {
					stem_list.push (stem_no_u);
					var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
				}
			}
			if (!(search_u)) {
				var __left0__ = re_subn ('^(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡊᡆ$', '\\1ᡄᡘ', stem_raw); // javascript \b definition is strange
//				var __left0__ = re_subn ('\\b(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡊᡆ$', '\\1ᡄᡘ', stem_raw);
				var stem_no_u = __left0__ [0];
				var search_u = __left0__ [1];
				if (search_u) {
					stem_list.push (stem_no_u);
					var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
				}
			}
		}
		if (!(search_u)) {
			stem_list.push (stem_raw);
			var __left0__ = re_subn ('([ᠯᠰᡑᠷ])ᡆ$', '\\1', stem_raw);
			var stem_no_u = __left0__ [0];
			var search_u = __left0__ [1];
			if (search_u) {
				var stem_no_u = re_sub ('ᡑ$', 'ᡆᡄ', stem_no_u);
				stem_list.push (stem_no_u);
			}
		}
	}
	else if (suffix [0] == 'ᠪ') {
		var search_u = 0;
		if (!(search_u)) {
			var __left0__ = re_subn ('^(ᡘᡆᡅᠪ)ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//			var __left0__ = re_subn ('\\b(ᡘᡆᡅᠪ)ᡆ$', '\\1', stem_raw);
			var stem_no_u = __left0__ [0];
			var search_u = __left0__ [1];
			if (search_u) {
				stem_list.push (stem_raw);
				stem_list.push (stem_no_u);
				var suffix_xu_list = /*list*/ (['ᡘᡆ']);
			}
		}
		if (!(search_u)) {
			var __left0__ = re_subn ('^(ᡅᡅᠪ|ᠴᡅᠪ|ᡘᡆᡅᠪ)ᠪ?ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//			var __left0__ = re_subn ('\\b(ᡅᡅᠪ|ᠴᡅᠪ|ᡘᡆᡅᠪ)ᠪ?ᡆ$', '\\1', stem_raw);
			var stem_no_u = __left0__ [0];
			var search_u = __left0__ [1];
			if (search_u) {
				stem_list.push (stem_no_u);
				var suffix_xu_list = /*list*/ (['ᡘᡆ']);
			}
		}
		if (!(search_u)) {
			var __left0__ = re_subn ('^(ᡄᡄᠪ)ᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//			var __left0__ = re_subn ('\\b(ᡄᡄᠪ)ᡆ$', '\\1', stem_raw);
			var stem_no_u = __left0__ [0];
			var search_u = __left0__ [1];
			if (search_u) {
				stem_list.push (stem_no_u);
				var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
			}
		}
		if (!(search_u)) {
			var stem_raw = re_sub ('^(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw); // javascript \b definition is strange
			stem_list.push (stem_raw);
		}
	}
	else if (suffix [0] == 'ᡍ' && suffix != 'ᡍᡇ‌') {
		var __left0__ = re_subn ('^(ᡄᡆᡅᡘ)ᡘᡆ$', '\\1', stem_raw); // javascript \b definition is strange
//		var __left0__ = re_subn ('\\b(ᡄᡆᡅᡘ)ᡘᡆ$', '\\1', stem_raw);
		var stem_no_u = __left0__ [0];
		var search_u = __left0__ [1];
		if (search_u) {
			stem_list.push (stem_no_u);
			var suffix_xu_list = /*list*/ (['ᡘᡆ']);
		}
		else {
			stem_list.push (stem_raw);
		}
	}
	else {
		var stem_raw = re_sub ('^(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw); // javascript \b definition is strange
//		var stem_raw = re_sub ('\\b(ᡍᡄ|ᠰᡆ|ᡐᡆ)ᡄ$', '\\1ᡄᡘ', stem_raw);
		stem_list.push (stem_raw);
	}
	var __iterable0__ = stem_list;
	for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
		var stem = __iterable0__ [__index0__];
		var __iterable1__ = suffix_xu_list;
		for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
			var suffix_xu = __iterable1__ [__index1__];
			lemma_list.push (stem + suffix_xu);
		}
	}
	// console.log(lemma_list);
	return lemma_list;
};
function deconjugate (wordform, suffix_lists, if_infer_stem_mf, if_dict, if_bare_stem) {
	var lemma_list = list ([]);
	// console.log(1, lemma_list);
	if (wordform != '') {
		var __iterable0__ = suffix_lists [0];
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var suffix = __iterable0__ [__index0__];
			var lemma_list = lemma_list.concat(deconjugate_suffix (wordform, suffix, if_infer_stem_mf, if_dict, if_bare_stem));
			// console.log(2, lemma_list);
		}
		var __iterable0__ = suffix_lists.slice(1);
		for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
			var suffix_list = __iterable0__ [__index0__];
			var lemma_list_temp = list ([]);
			var __iterable1__ = lemma_list;
			for (var __index1__ = 0; __index1__ < len (__iterable1__); __index1__++) {
				var lemma = __iterable1__ [__index1__];
				var __iterable2__ = suffix_list;
				for (var __index2__ = 0; __index2__ < len (__iterable2__); __index2__++) {
					var suffix = __iterable2__ [__index2__];
					var lemma_list_temp = lemma_list_temp.concat(deconjugate_suffix (lemma, suffix, if_infer_stem_mf, if_dict, if_bare_stem));
				}
			}
			// console.log(3, lemma_list_temp);
			var lemma_list = lemma_list.concat(lemma_list_temp);
		}
	}
	// console.log(lemma_list);
	if (!if_bare_stem) {
		var lemma_set = new Set(lemma_list);
		var lemma_set_bare_stem = new Set(deconjugate_suffix (wordform, '', 0, 0, 1));
		return [...lemma_set].filter(x => !lemma_set_bare_stem.has(x)) // lemma_set - lemma_set_bare_stem
	}
	else {
		return lemma_list;
	}
};
