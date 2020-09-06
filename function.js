
// Note: JS has no regressive assertion.
// Transforming (?<![SET])(STRING) -> $1 into (^|[^SET])(STRING) -> $1$2 will work in some cases.
function pinyin2graph(pinyin) {
	var graph = pinyin;
	graph = graph.replace(/J/g, 'Z');
	graph = graph.replace(/C/g, 'Q');
	graph = graph.replace(/;/g, 'N');
	graph = graph.replace(/c/g, 'C');
	graph = graph.replace(/q/g, 'c');
	graph = graph.replace(/o/g, 'q');
	graph = graph.replace(/v/g, '_');
	graph = graph.replace(/-q/g, '-v');
	
	// phon code -> graph code
	graph = graph.replace(/͏/g, '~');
	graph = graph.replace(/᠋/g, "'");
	graph = graph.replace(/᠌/g, '"');
	graph = graph.replace(/᠍/g, '`');
	graph = graph.replace(/ /g, '-');
	graph = graph.replace(/᠎/g, '_');
	graph = graph.replace(/᠇/g, '$');
	graph = graph.replace(/᠊/g, '&');
	graph = graph.replace(/ᠠ/g, 'a');
	graph = graph.replace(/ᠡ/g, 'e');
	graph = graph.replace(/ᠢ/g, 'i');
	graph = graph.replace(/ᠣ/g, 'q');
	graph = graph.replace(/ᠤ/g, 'v');
	graph = graph.replace(/ᠥ/g, 'o');
	graph = graph.replace(/ᠦ/g, 'u');
	graph = graph.replace(/ᠧ/g, 'E');
	graph = graph.replace(/ᠨ/g, 'n');
	graph = graph.replace(/ᠩ/g, 'N');
	graph = graph.replace(/ᠪ/g, 'b');
	graph = graph.replace(/ᠫ/g, 'p');
	graph = graph.replace(/ᠬ/g, 'h');
	graph = graph.replace(/ᠭ/g, 'g');
	graph = graph.replace(/ᠮ/g, 'm');
	graph = graph.replace(/ᠯ/g, 'l');
	graph = graph.replace(/ᠰ/g, 's');
	graph = graph.replace(/ᠱ/g, 'x');
	graph = graph.replace(/ᠲ/g, 't');
	graph = graph.replace(/ᠳ/g, 'd');
	graph = graph.replace(/ᠴ/g, 'c');
	graph = graph.replace(/ᠵ/g, 'j');
	graph = graph.replace(/ᠶ/g, 'y');
	graph = graph.replace(/ᠷ/g, 'r');
	graph = graph.replace(/ᠸ/g, 'w');
	graph = graph.replace(/ᠹ/g, 'f');
	graph = graph.replace(/ᠺ/g, 'k');
	graph = graph.replace(/ᠻ/g, 'K');
	graph = graph.replace(/ᠼ/g, 'C');
	graph = graph.replace(/ᠽ/g, 'z');
	graph = graph.replace(/ᠾ/g, 'H');
	graph = graph.replace(/ᠿ/g, 'R');
	graph = graph.replace(/ᡀ/g, 'L');
	graph = graph.replace(/ᡁ/g, 'Z');
	graph = graph.replace(/ᡂ/g, 'Q');

	// console.log(graph);
	// graph = graph.replace(/(?<=[aqv])([*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1M');
	// graph = graph.replace(/(?<=[eouE])([*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F');
	graph = graph.replace(/([aqv][*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1M'); 
	graph = graph.replace(/((^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-])[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F'); // bleeding regressive propagation!!!!!!
	graph = graph.replace(/([eouE][*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*)g/g, '$1F');
	graph = graph.replace(/g(?=[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*[Maqv])/g, 'M');
	graph = graph.replace(/g(?=[*&_~'"`inNbphgMFmlsxtdcjyrwfkKCzRHLZQ]*[FeouE])/g, 'F');
	graph = graph.replace(/_a%/g, 'a%');
	graph = graph.replace(/_e%/g, 'e%');
	// graph = graph.replace(/(?<![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$15$2');
	// graph = graph.replace(/(?<![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$17$2');
	graph = graph.replace(/(^|[^*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$1$25$3');
	graph = graph.replace(/(^|[^*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$1$27$3');
	graph = graph.replace(/([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?![*&%~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ5789])/g, '$19$2');
	graph = graph.replace(/([abcdefgMFhijklmnopqrstuvwxyzCEHKLNQRZ])([~'"`]?)(?=[*&%aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ])/g, '$18$2');
	graph = graph.replace(/([qv])8['`]%/g, '$18~%');
	graph = graph.replace(/([ou])8[`]%/g, '$18~%');
	// graph = graph.replace(/(?<=[\-])a5/g, 'a19');
	// graph = graph.replace(/(?<=[\-])e5/g, 'e19');
	// graph = graph.replace(/(?<=[\-])a7/g, 'a28');
	// graph = graph.replace(/(?<=[\-])i5/g, 'i09');
	// graph = graph.replace(/(?<=[\-])i7y8/g, 'i08y08');
	// graph = graph.replace(/(?<=[\-])v5/g, 'v09');
	// graph = graph.replace(/(?<=[\-])v7/g, 'v08');
	// graph = graph.replace(/(?<=[\-])u5/g, 'u09');
	// graph = graph.replace(/(?<=[\-])u7/g, 'u08');
	// graph = graph.replace(/(?<=[\-])d7/g, 'd17');
	// graph = graph.replace(/(?<=[\-])y7i/g, 'y17i');
	graph = graph.replace(/([\-])a5/g, '$1a19');
	graph = graph.replace(/([\-])e5/g, '$1e19');
	graph = graph.replace(/([\-])a7/g, '$1a28');
	graph = graph.replace(/([\-])i5/g, '$1i09');
	graph = graph.replace(/([\-])i7y8/g, '$1i08y08');
	graph = graph.replace(/([\-])v5/g, '$1v09');
	graph = graph.replace(/([\-])v7/g, '$1v08');
	graph = graph.replace(/([\-])u5/g, '$1u09');
	graph = graph.replace(/([\-])u7/g, '$1u08');
	graph = graph.replace(/([\-])d7/g, '$1d17');
	graph = graph.replace(/([\-])y7i/g, '$1y17i');
	graph = graph.replace(/n9(?=[_])/g, 'n28');
	graph = graph.replace(/h9(?=[_])/g, 'h38');
	graph = graph.replace(/[gMF]9(?=[_])/g, 'g28');
	graph = graph.replace(/j5(?=[_])/g, 'j18');
	graph = graph.replace(/j9(?=[_])/g, 'j18');
	graph = graph.replace(/y9(?=[_])/g, 'y28');
	graph = graph.replace(/w9(?=[_])/g, 'w19');
	graph = graph.replace(/_a5/g, 'a19');
	graph = graph.replace(/_e5/g, 'e19');
	graph = graph.replace(/(%[aiqv])8/g, '$118');
	graph = graph.replace(/(%[ou])8/g, '$128');
	// graph = graph.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)o8/g, '$1o18');
	// graph = graph.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)u8/g, '$1u18');
	graph = graph.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)o8/g, '$1$2o18');
	graph = graph.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?)u8/g, '$1$2u18');
	graph = graph.replace(/([bpfkK][0123]?[5789][~'"`]?[qv])9/g, '$139');
	graph = graph.replace(/([hgMFbpfkK][0123]?[5789][~'"`]?[ou])9/g, '$139');
	// Manchu compatible CO/U
	console.log(graph);
	// graph = graph.replace(/(?<![*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?[qvou])9/g, '$119'); // lookbehind
	graph = graph.replace(/(^|[^*&~'"`aqveouEinNbphgMFmlsxtdcjyrwfkKCzRHLZQ_\-5789])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[5789][~'"`]?[qvou])9/g, '$1$219');
	console.log(graph);
	// Almas offglide I rules
	graph = graph.replace(/([aeqvE][0123]?[5789][~'"`]?)i8/g, '$1i28'); //  lookbehind
	// graph = graph.replace(/(?<![%])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[8][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1i28');
	graph = graph.replace(/(^|[^%])([nNbphgMFmlsxtdcjyrwfkKCzRHLZQ][0123]?[8][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1$2i28'); // lookbehind
	graph = graph.replace(/([aeiqvouE][0123]?[5789][~'"`]?[ou][0123]?[5789][~'"`]?)i8/g, '$1i28');

	graph = graph.replace(/y8/g, 'y18');
	graph = graph.replace(/n8(?=[aeiqvouE][0123]?[5789][~'"`]?)/g, 'n18');
	graph = graph.replace(/n8/g, 'n08');
	graph = graph.replace(/d8(?=[aeiqvouE][0123]?[5789][~'"`]?)/g, 'd18');
	graph = graph.replace(/d8/g, 'd08');
	graph = graph.replace(/h7(?=[aqv][0123]?[5789][~'"`]?)/g, 'h07');
	graph = graph.replace(/h7/g, 'h05');
	graph = graph.replace(/h8(?=[aqv][0123]?[5789][~'"`]?)/g, 'h08');
	graph = graph.replace(/h8/g, 'h05');
	graph = graph.replace(/[gMF]7(?=[aqv][0123]?[5789][~'"`]?)/g, 'g07');
	graph = graph.replace(/[gMF]7/g, 'g05');
	graph = graph.replace(/[gMF]8(?=[aqv][0123]?[5789][~'"`]?)/g, 'g18');
	graph = graph.replace(/[gMF]8(?=[eiouE][0123]?[5789][~'"`]?)/g, 'g05');
	graph = graph.replace(/([aqv][0123]?[5789][~'"`]?)[gMF]8/g, '$1g08');
	graph = graph.replace(/([eouE][0123]?[5789][~'"`]?)[gMF]8/g, '$1g38');
	graph = graph.replace(/([aqv][0123]?[5789][~'"`]?)[gMF]9/g, '$1g09');
	graph = graph.replace(/([eouE][0123]?[5789][~'"`]?)[gMF]9/g, '$1g19');
	graph = graph.replace(/(i[0123]?[5789][~'"`]?)M8/g, '$1g08');
	graph = graph.replace(/(i[0123]?[5789][~'"`]?)F8/g, '$1g38');
	graph = graph.replace(/(i[0123]?[5789][~'"`]?)M9/g, '$1g09');
	graph = graph.replace(/(i[0123]?[5789][~'"`]?)F9/g, '$1g19');
	graph = graph.replace(/[MF]/g, 'g');
	graph = graph.replace(/g8/g, 'g38');
	graph = graph.replace(/g9/g, 'g19');
	graph = graph.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])~/g, '$10$2');
	graph = graph.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])'/g, '$11$2');
	graph = graph.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])"/g, '$12$2');
	graph = graph.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])[0123]?([5789])`/g, '$13$2');
	graph = graph.replace(/([abcdefghijklmnopqrstuvwxyzCEHKLNQRZ])([5789])/g, '$10$2');
	graph = graph.replace(/i28/g, 'II');
	graph = graph.replace(/g39/g, 'G');
	graph = graph.replace(/q39/g, 'O');
	graph = graph.replace(/v19/g, 'O');
	graph = graph.replace(/v39/g, 'O');
	graph = graph.replace(/o39/g, 'O');
	graph = graph.replace(/u39/g, 'O');
	graph = graph.replace(/n19/g, 'n');
	graph = graph.replace(/n29/g, 'n');
	graph = graph.replace(/v19/g, 'O');
	graph = graph.replace(/g29/g, 'G');
	graph = graph.replace(/o07/g, 'AOI');
	graph = graph.replace(/o18/g, 'OI');
	graph = graph.replace(/o28/g, 'AOI');
	graph = graph.replace(/u07/g, 'AOI');
	graph = graph.replace(/u18/g, 'OI');
	graph = graph.replace(/u28/g, 'AOI');
	graph = graph.replace(/Q07/g, 'OO');
	graph = graph.replace(/Q05/g, 'OO');
	graph = graph.replace(/Q08/g, 'OO');
	graph = graph.replace(/Q09/g, 'OO');
	graph = graph.replace(/d08/g, 'OA');
	graph = graph.replace(/d09/g, 'OA');
	graph = graph.replace(/a05/g, 'AA');
	graph = graph.replace(/a15/g, 'A');
	graph = graph.replace(/a07/g, 'AA');
	graph = graph.replace(/a28/g, 'A');
	graph = graph.replace(/a08/g, 'A');
	graph = graph.replace(/a18/g, 'AA');
	graph = graph.replace(/a09/g, 'A');
	graph = graph.replace(/a19/g, 'ɑ');
	graph = graph.replace(/e05/g, 'A');
	graph = graph.replace(/e07/g, 'A');
	graph = graph.replace(/e17/g, 'AA');
	graph = graph.replace(/e08/g, 'A');
	graph = graph.replace(/e09/g, 'A');
	graph = graph.replace(/e19/g, 'ɑ');
	graph = graph.replace(/i05/g, 'AI');
	graph = graph.replace(/i07/g, 'AI');
	graph = graph.replace(/i08/g, 'I');
	graph = graph.replace(/i18/g, 'AI');
	graph = graph.replace(/i09/g, 'I');
	graph = graph.replace(/q05/g, 'AO');
	graph = graph.replace(/q07/g, 'AO');
	graph = graph.replace(/q08/g, 'O');
	graph = graph.replace(/q18/g, 'AO');
	graph = graph.replace(/q19/g, 'O');
	graph = graph.replace(/q09/g, 'U');
	graph = graph.replace(/v05/g, 'AO');
	graph = graph.replace(/v07/g, 'AO');
	graph = graph.replace(/v08/g, 'O');
	graph = graph.replace(/v18/g, 'AO');
	graph = graph.replace(/v09/g, 'U');
	graph = graph.replace(/o05/g, 'Aü');
	graph = graph.replace(/o07/g, 'Aü');
	graph = graph.replace(/o18/g, 'ü');
	graph = graph.replace(/o08/g, 'O');
	graph = graph.replace(/o28/g, 'Aü');
	graph = graph.replace(/o19/g, 'ü');
	graph = graph.replace(/o09/g, 'U');
	graph = graph.replace(/u05/g, 'Aü');
	graph = graph.replace(/u15/g, 'AU');
	graph = graph.replace(/u07/g, 'Aü');
	graph = graph.replace(/u18/g, 'ü');
	graph = graph.replace(/u08/g, 'O');
	graph = graph.replace(/u28/g, 'Aü');
	graph = graph.replace(/u19/g, 'ü');
	graph = graph.replace(/u09/g, 'U');
	graph = graph.replace(/E05/g, 'AW');
	graph = graph.replace(/E07/g, 'AW');
	graph = graph.replace(/E08/g, 'W');
	graph = graph.replace(/E09/g, 'W');
	graph = graph.replace(/n07/g, 'n');
	graph = graph.replace(/n17/g, 'A');
	graph = graph.replace(/n18/g, 'n');
	graph = graph.replace(/n08/g, 'A');
	graph = graph.replace(/n38/g, 'n');
	graph = graph.replace(/n28/g, 'n');
	graph = graph.replace(/n09/g, 'A');
	graph = graph.replace(/N08/g, 'AG');
	graph = graph.replace(/N09/g, 'AG');
	graph = graph.replace(/b07/g, 'b');
	graph = graph.replace(/b08/g, 'b');
	graph = graph.replace(/b09/g, 'b');
	graph = graph.replace(/b19/g, 'b');
	graph = graph.replace(/p07/g, 'p');
	graph = graph.replace(/p08/g, 'p');
	graph = graph.replace(/p09/g, 'p');
	graph = graph.replace(/h07/g, 'X');
	graph = graph.replace(/h17/g, 'ġ');
	graph = graph.replace(/h05/g, 'G');
	graph = graph.replace(/h15/g, 'G');
	graph = graph.replace(/h08/g, 'X');
	graph = graph.replace(/h18/g, 'ġ');
	graph = graph.replace(/h28/g, 'ġ');
	graph = graph.replace(/h38/g, 'X');
	graph = graph.replace(/g07/g, 'ġ');
	graph = graph.replace(/g17/g, 'X');
	graph = graph.replace(/g05/g, 'G');
	graph = graph.replace(/g08/g, 'X');
	graph = graph.replace(/g18/g, 'ġ');
	graph = graph.replace(/g38/g, 'G');
	graph = graph.replace(/g28/g, 'ġ');
	graph = graph.replace(/g09/g, 'X');
	graph = graph.replace(/g19/g, 'G');
	graph = graph.replace(/m07/g, 'm');
	graph = graph.replace(/m08/g, 'm');
	graph = graph.replace(/m09/g, 'm');
	graph = graph.replace(/l07/g, 'L');
	graph = graph.replace(/l08/g, 'L');
	graph = graph.replace(/l09/g, 'L');
	graph = graph.replace(/s07/g, 's');
	graph = graph.replace(/s08/g, 's');
	graph = graph.replace(/s09/g, 's');
	graph = graph.replace(/s19/g, 's');
	graph = graph.replace(/s29/g, 's');
	graph = graph.replace(/x07/g, 'š');
	graph = graph.replace(/x08/g, 'š');
	graph = graph.replace(/x09/g, 'š');
	graph = graph.replace(/t07/g, 't');
	graph = graph.replace(/t08/g, 'd');
	graph = graph.replace(/t18/g, 't');
	graph = graph.replace(/t09/g, 't');
	graph = graph.replace(/d07/g, 't');
	graph = graph.replace(/d17/g, 'd');
	graph = graph.replace(/d08/g, 'ð');
	graph = graph.replace(/d18/g, 'd');
	graph = graph.replace(/d09/g, 'ð');
	graph = graph.replace(/d19/g, 'd');
	graph = graph.replace(/c07/g, 'č');
	graph = graph.replace(/c08/g, 'č');
	graph = graph.replace(/c09/g, 'č');
	graph = graph.replace(/j07/g, 'I');
	graph = graph.replace(/j08/g, 'ǰ');
	graph = graph.replace(/j18/g, 'I');
	graph = graph.replace(/j09/g, 'ǰ');
	graph = graph.replace(/y07/g, 'y');
	graph = graph.replace(/y17/g, 'I');
	graph = graph.replace(/y18/g, 'y');
	graph = graph.replace(/y08/g, 'I');
	graph = graph.replace(/y28/g, 'I');
	graph = graph.replace(/r07/g, 'r');
	graph = graph.replace(/r08/g, 'r');
	graph = graph.replace(/r09/g, 'r');
	graph = graph.replace(/w07/g, 'W');
	graph = graph.replace(/w08/g, 'W');
	graph = graph.replace(/w09/g, 'W');
	graph = graph.replace(/w19/g, 'U');
	graph = graph.replace(/f07/g, 'f');
	graph = graph.replace(/f08/g, 'f');
	graph = graph.replace(/f09/g, 'f');
	graph = graph.replace(/k07/g, 'k');
	graph = graph.replace(/k08/g, 'k');
	graph = graph.replace(/k09/g, 'k');
	graph = graph.replace(/K07/g, 'k');
	graph = graph.replace(/K08/g, 'k');
	graph = graph.replace(/K09/g, 'k');
	graph = graph.replace(/C07/g, 'c');
	graph = graph.replace(/C08/g, 'c');
	graph = graph.replace(/C09/g, 'c');
	graph = graph.replace(/z07/g, 'z');
	graph = graph.replace(/z08/g, 'z');
	graph = graph.replace(/z09/g, 'z');
	graph = graph.replace(/H07/g, 'AH');
	graph = graph.replace(/H08/g, 'H');
	graph = graph.replace(/H09/g, 'H');
	graph = graph.replace(/R07/g, 'ř');
	graph = graph.replace(/R08/g, 'ř');
	graph = graph.replace(/R09/g, 'ř');
	graph = graph.replace(/L07/g, 'LH');
	graph = graph.replace(/L08/g, 'LH');
	graph = graph.replace(/Z07/g, 'H');
	graph = graph.replace(/Q07/g, 'ĉ');
	graph = graph.replace(/i29/g, 'II');
	graph = graph.replace(/g39/g, 'G');
	graph = graph.replace(/q39/g, 'O');
	graph = graph.replace(/v19/g, 'O');
	graph = graph.replace(/v39/g, 'O');
	graph = graph.replace(/o39/g, 'O');
	graph = graph.replace(/u39/g, 'O');
	graph = graph.replace(/n19/g, 'n');
	graph = graph.replace(/n29/g, 'n');
	graph = graph.replace(/v19/g, 'O');
	graph = graph.replace(/g29/g, 'G');
	graph = graph.replace(/o05/g, 'AOI');
	graph = graph.replace(/o19/g, 'OI');
	graph = graph.replace(/o29/g, 'AOI');
	graph = graph.replace(/u05/g, 'AOI');
	graph = graph.replace(/u19/g, 'OI');
	graph = graph.replace(/u29/g, 'AOI');
	graph = graph.replace(/Q05/g, 'OO');
	graph = graph.replace(/Q05/g, 'OO');
	graph = graph.replace(/Q09/g, 'OO');
	graph = graph.replace(/Q09/g, 'OO');
	graph = graph.replace(/d09/g, 'OA');
	graph = graph.replace(/d09/g, 'OA');
	graph = graph.replace(/a05/g, 'AA');
	graph = graph.replace(/a15/g, 'A');
	graph = graph.replace(/a05/g, 'AA');
	graph = graph.replace(/a29/g, 'A');
	graph = graph.replace(/a09/g, 'A');
	graph = graph.replace(/a19/g, 'AA');
	graph = graph.replace(/a09/g, 'A');
	graph = graph.replace(/a19/g, 'ɑ');
	graph = graph.replace(/e05/g, 'A');
	graph = graph.replace(/e05/g, 'A');
	graph = graph.replace(/e15/g, 'AA');
	graph = graph.replace(/e09/g, 'A');
	graph = graph.replace(/e09/g, 'A');
	graph = graph.replace(/e19/g, 'ɑ');
	graph = graph.replace(/i05/g, 'AI');
	graph = graph.replace(/i05/g, 'AI');
	graph = graph.replace(/i09/g, 'I');
	graph = graph.replace(/i19/g, 'AI');
	graph = graph.replace(/i09/g, 'I');
	graph = graph.replace(/q05/g, 'AO');
	graph = graph.replace(/q05/g, 'AO');
	graph = graph.replace(/q09/g, 'O');
	graph = graph.replace(/q19/g, 'AO');
	graph = graph.replace(/q19/g, 'O');
	graph = graph.replace(/q09/g, 'U');
	graph = graph.replace(/v05/g, 'AO');
	graph = graph.replace(/v05/g, 'AO');
	graph = graph.replace(/v09/g, 'O');
	graph = graph.replace(/v19/g, 'AO');
	graph = graph.replace(/v09/g, 'U');
	graph = graph.replace(/o05/g, 'Aü');
	graph = graph.replace(/o05/g, 'Aü');
	graph = graph.replace(/o19/g, 'ü');
	graph = graph.replace(/o09/g, 'O');
	graph = graph.replace(/o29/g, 'Aü');
	graph = graph.replace(/o19/g, 'ü');
	graph = graph.replace(/o09/g, 'U');
	graph = graph.replace(/u05/g, 'Aü');
	graph = graph.replace(/u15/g, 'AU');
	graph = graph.replace(/u05/g, 'Aü');
	graph = graph.replace(/u19/g, 'ü');
	graph = graph.replace(/u09/g, 'O');
	graph = graph.replace(/u29/g, 'Aü');
	graph = graph.replace(/u19/g, 'ü');
	graph = graph.replace(/u09/g, 'U');
	graph = graph.replace(/E05/g, 'AW');
	graph = graph.replace(/E05/g, 'AW');
	graph = graph.replace(/E09/g, 'W');
	graph = graph.replace(/E09/g, 'W');
	graph = graph.replace(/n05/g, 'n');
	graph = graph.replace(/n15/g, 'A');
	graph = graph.replace(/n19/g, 'n');
	graph = graph.replace(/n09/g, 'A');
	graph = graph.replace(/n39/g, 'n');
	graph = graph.replace(/n29/g, 'n');
	graph = graph.replace(/n09/g, 'A');
	graph = graph.replace(/N09/g, 'AG');
	graph = graph.replace(/N09/g, 'AG');
	graph = graph.replace(/b05/g, 'b');
	graph = graph.replace(/b09/g, 'b');
	graph = graph.replace(/b09/g, 'b');
	graph = graph.replace(/b19/g, 'b');
	graph = graph.replace(/p05/g, 'p');
	graph = graph.replace(/p09/g, 'p');
	graph = graph.replace(/p09/g, 'p');
	graph = graph.replace(/h05/g, 'X');
	graph = graph.replace(/h15/g, 'ġ');
	graph = graph.replace(/h05/g, 'G');
	graph = graph.replace(/h15/g, 'G');
	graph = graph.replace(/h09/g, 'X');
	graph = graph.replace(/h19/g, 'ġ');
	graph = graph.replace(/h29/g, 'ġ');
	graph = graph.replace(/h39/g, 'X');
	graph = graph.replace(/g05/g, 'ġ');
	graph = graph.replace(/g15/g, 'X');
	graph = graph.replace(/g05/g, 'G');
	graph = graph.replace(/g09/g, 'X');
	graph = graph.replace(/g19/g, 'ġ');
	graph = graph.replace(/g39/g, 'G');
	graph = graph.replace(/g29/g, 'ġ');
	graph = graph.replace(/g09/g, 'X');
	graph = graph.replace(/g19/g, 'G');
	graph = graph.replace(/m05/g, 'm');
	graph = graph.replace(/m09/g, 'm');
	graph = graph.replace(/m09/g, 'm');
	graph = graph.replace(/l05/g, 'L');
	graph = graph.replace(/l09/g, 'L');
	graph = graph.replace(/l09/g, 'L');
	graph = graph.replace(/s05/g, 's');
	graph = graph.replace(/s09/g, 's');
	graph = graph.replace(/s09/g, 's');
	graph = graph.replace(/s19/g, 's');
	graph = graph.replace(/s29/g, 's');
	graph = graph.replace(/x05/g, 'š');
	graph = graph.replace(/x09/g, 'š');
	graph = graph.replace(/x09/g, 'š');
	graph = graph.replace(/t05/g, 't');
	graph = graph.replace(/t09/g, 'd');
	graph = graph.replace(/t19/g, 't');
	graph = graph.replace(/t09/g, 't');
	graph = graph.replace(/d05/g, 't');
	graph = graph.replace(/d15/g, 'd');
	graph = graph.replace(/d09/g, 'ð');
	graph = graph.replace(/d19/g, 'd');
	graph = graph.replace(/d09/g, 'ð');
	graph = graph.replace(/d19/g, 'd');
	graph = graph.replace(/c05/g, 'č');
	graph = graph.replace(/c09/g, 'č');
	graph = graph.replace(/c09/g, 'č');
	graph = graph.replace(/j05/g, 'I');
	graph = graph.replace(/j09/g, 'ǰ');
	graph = graph.replace(/j19/g, 'I');
	graph = graph.replace(/j09/g, 'ǰ');
	graph = graph.replace(/y05/g, 'y');
	graph = graph.replace(/y15/g, 'I');
	graph = graph.replace(/y19/g, 'y');
	graph = graph.replace(/y09/g, 'I');
	graph = graph.replace(/y29/g, 'I');
	graph = graph.replace(/r05/g, 'r');
	graph = graph.replace(/r09/g, 'r');
	graph = graph.replace(/r09/g, 'r');
	graph = graph.replace(/w05/g, 'W');
	graph = graph.replace(/w09/g, 'W');
	graph = graph.replace(/w09/g, 'W');
	graph = graph.replace(/w19/g, 'U');
	graph = graph.replace(/f05/g, 'f');
	graph = graph.replace(/f09/g, 'f');
	graph = graph.replace(/f09/g, 'f');
	graph = graph.replace(/k05/g, 'k');
	graph = graph.replace(/k09/g, 'k');
	graph = graph.replace(/k09/g, 'k');
	graph = graph.replace(/K05/g, 'k');
	graph = graph.replace(/K09/g, 'k');
	graph = graph.replace(/K09/g, 'k');
	graph = graph.replace(/C05/g, 'c');
	graph = graph.replace(/C09/g, 'c');
	graph = graph.replace(/C09/g, 'c');
	graph = graph.replace(/z05/g, 'z');
	graph = graph.replace(/z09/g, 'z');
	graph = graph.replace(/z09/g, 'z');
	graph = graph.replace(/H05/g, 'AH');
	graph = graph.replace(/H09/g, 'H');
	graph = graph.replace(/H09/g, 'H');
	graph = graph.replace(/R05/g, 'ř');
	graph = graph.replace(/R09/g, 'ř');
	graph = graph.replace(/R09/g, 'ř');
	graph = graph.replace(/L05/g, 'LH');
	graph = graph.replace(/L09/g, 'LH');
	graph = graph.replace(/Z05/g, 'H');
	graph = graph.replace(/Q05/g, 'ĉ');
	graph = graph.replace(/-/g, ' ');
	graph = graph.replace(/^ /g, '');
	graph = graph.replace(/\^/g, '‌');
	graph = graph.replace(/&/g, '᠊');
	graph = graph.replace(/\*/g, '‍');
	graph = graph.replace(/%/g, '‍');
	graph = graph.replace(/A/g, 'ᡄ');
	graph = graph.replace(/ɑ/g, 'ᡃ');
	graph = graph.replace(/I/g, 'ᡅ');
	graph = graph.replace(/O/g, 'ᡆ');
	graph = graph.replace(/U/g, 'ᡇ‌');
	graph = graph.replace(/ü/g, 'ᡉ');
	graph = graph.replace(/n/g, 'ᡊ');
	graph = graph.replace(/b/g, 'ᠪ');
	graph = graph.replace(/p/g, 'ᠫ');
	graph = graph.replace(/X/g, 'ᡍ');
	graph = graph.replace(/ġ/g, 'ᡎ');
	graph = graph.replace(/G/g, 'ᡘ');
	graph = graph.replace(/m/g, 'ᡏ');
	graph = graph.replace(/L/g, 'ᠯ');
	graph = graph.replace(/s/g, 'ᠰ');
	graph = graph.replace(/š/g, 'ᠱ');
	graph = graph.replace(/t/g, 'ᡐ');
	graph = graph.replace(/d/g, 'ᡑ');
	graph = graph.replace(/ð/g, 'ᡈ');
	graph = graph.replace(/č/g, 'ᠴ');
	graph = graph.replace(/ǰ/g, 'ᡔ');
	graph = graph.replace(/y/g, 'ᡕ');
	graph = graph.replace(/r/g, 'ᠷ');
	graph = graph.replace(/W/g, 'ᡖ');
	graph = graph.replace(/f/g, 'ᠹ');
	graph = graph.replace(/k/g, 'ᡗ');
	graph = graph.replace(/c/g, 'ᠼ');
	graph = graph.replace(/z/g, 'ᠽ');
	graph = graph.replace(/H/g, 'ᡁ');
	graph = graph.replace(/ř/g, 'ᠿ');
	graph = graph.replace(/ĉ/g, 'ᡂ');
	return graph;
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
	if (suffix == '') {
		if (if_bare_stem == 0 && if_dict == 0) {
			return lemma_list;
		}
		else {
			var mf_form = 0;
			var stem_raw = wordform;
		}
	}
	else {
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
	}
	if (mf_form == 1) {
		var suffix_xu_list = /*list*/ (['ᡍᡇ‌']);
	}
	else if (mf_form == 2) {
		var suffix_xu_list = /*list*/ (['ᡘᡆ']);
	}
	else {
		var suffix_xu_list = /*list*/ (['ᡍᡇ‌', 'ᡘᡆ']);
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
	return list (set (lemma_list));
};
