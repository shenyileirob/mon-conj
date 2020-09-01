
document.getElementById("info_enable_js").style.display = "none";
document.getElementById("content").style.display = "table";
function localize_ui(lan){
	console.log('checked:', lan);
	switch (lan) {
	case "zh":
		console.log('branch:', 'zh');
		document.getElementById("header_conj").innerHTML = "屈折器";
		document.getElementById("header_deconj").innerHTML = "逆屈折器";
		document.getElementById("label_cb_chn").innerHTML = "中国";
		document.getElementById("label_cb_infer_gender").innerHTML = "推测阴阳性";
		document.getElementById("label_cb_bare_stem").innerHTML = "接受秃词干";
		document.getElementById("input_cell").placeholder = "目标形";
		document.getElementById("input_lemma").placeholder = "词典形";
		document.getElementById("input_wordform").placeholder = "屈折形";
		document.getElementById("input_cell_pinyin").placeholder = "目标形（拼音）";
		document.getElementById("input_lemma_pinyin").placeholder = "词典形（拼音）";
		document.getElementById("input_wordform_pinyin").placeholder = "屈折形（拼音）";
		break;
	default:
		console.log('branch:', 'default');
		document.getElementById("header_conj").innerHTML = "Conjugator";
		document.getElementById("header_deconj").innerHTML = "Deconjugator";
		document.getElementById("label_cb_chn").innerHTML = "CHN";
		document.getElementById("label_cb_infer_gender").innerHTML = "infer gender";
		document.getElementById("label_cb_bare_stem").innerHTML = "accept bare stems";
		document.getElementById("input_cell").placeholder = "Target";
		document.getElementById("input_lemma").placeholder = "Lemma";
		document.getElementById("input_wordform").placeholder = "Wordform";
		document.getElementById("input_cell_pinyin").placeholder = "Target (pinyin)";
		document.getElementById("input_lemma_pinyin").placeholder = "Lemma (pinyin)";
		document.getElementById("input_wordform_pinyin").placeholder = "Wordform (pinyin)";
		break;
	}
}
localize_ui('en');
var parad = ['ᠪᡄᡅᡅᡍᡇ‌', 'ᠪᡄᡅ', 'ᠪᡄᡅᡅᡊᡃ', 'ᠪᡄᡅᡅᠪᡄᠯ', 'ᠪᡄᡅᡅᡍᡄᠷ', 'ᠪᡄᡅᡅᡑᡄᡍ', 'ᠪᡄᡅᡅᡔᡅ'];
var suffix_lists = [
	['ᡄ', 'ᡄᡘᡍᡄᡄ', 'ᡏᡄᡄ', 'ᡍᠰᡄᡄ', 'ᡊᡄᠷᡄᡄ', 'ᠯᡄᠷᡄᡄ', 'ᡏᡄᡄᡔᡅᡄ', 'ᡏᡄᡔᡅᡄ', 'ᡎᡄᡆᡄ', 'ᡍᡑᡆᡄ', 'ᠷᡆᡄ', 'ᠪᡄ', 'ᠯᡎᡃ', 'ᡄᡘᡎᡆᡑᡄ', 'ᡍᡆᡅᡅᠴᡄ', 'ᡏᡄᡍᠴᡄ', 'ᡅᡃ', 'ᡍᡆᡅᡃ', 'ᡊᡃ', 'ᡍᡆᡊᡃ', 'ᡎᡃ', 'ᠯᡆᡎᡃ', 'ᡄᡘᡎᡃ', 'ᡏᡃ', 'ᠯᡃ', 'ᡑᡄᠯᡃ', 'ᡍᡆᠯᡃ', 'ᠷᡃ', 'ᠪᡄᡅ', 'ᠰᡆᡎᡄᡅ', 'ᡑᡆᡎᡄᡅ', 'ᠯᡄᡅ', 'ᡎᡄᠰᡄᡅ', 'ᠰᡅᡑᡄᡅ', 'ᡎᡆᠰᡅᡑᡄᡅ', 'ᠯᡑᡄᡅ', 'ᡔᡄᡅ', 'ᡎᡆᡔᡄᡅ', 'ᡎᡄᠷᡄᡅ', 'ᡍᡆᡅ', 'ᡔᡆᡍᡆᡅ', 'ᡏᡆᡅ', 'ᡎᡄᡑᡆᡅ', 'ᡎᡄᠴᡅ', 'ᡏᡄᡅᡅᠴᡅ', 'ᡍᠴᡅ', 'ᡔᡅ', 'ᡍᡇ‌', 'ᡏᡇ‌', 'ᠰᡇ‌', 'ᠪᡄᠰᡇ‌', 'ᠪᡄᠴᡇ‌', 'ᡕᡄᠴᡇ‌', 'ᡔᡇ‌', 'ᡕᡇ‌', 'ᡍ', 'ᡑᡄᡍ', 'ᡊᡄᡏ', 'ᠪᡄᠯ', 'ᡍᡆᡊᡄᠷ', 'ᡍᡄᠷ', 'ᡍᠰᡄᡎᡄᠷ', 'ᡏᡄᠷ', 'ᡍᡆᠯᡄᠷ', 'ᠯᡑᡄ', 'ᠰᡅ', 'ᠯ', ''],
	['ᡔᡄᡊᡄᡍᡇ‌', 'ᡎᡄᡑᡄᡍᡄᡍᡇ‌', 'ᠴᡅᡍᡄᡍᡇ‌', 'ᠪᡘᡅᡍᡇ‌', 'ᠰᡘᡅᡘᡆ', 'ᠴᡅᡍᡇ‌'],
	['ᠯᡎᡄᡍᡇ‌', 'ᡎᡆᠯᡍᡇ‌'],
	['ᡑᡄᡍᡇ‌', 'ᡍᡑᡄᡍᡇ‌', 'ᠯᠴᡄᡍᡇ‌', 'ᡎᡄᡍᡇ‌', 'ᠴᡄᡎᡄᡍᡇ‌', 'ᡔᡄᡎᡄᡍᡇ‌', 'ᠯᡎᡄᡍᡇ‌', 'ᠯᡑᡆᡍᡇ‌', 'ᡎᡆᠯᡍᡇ‌']
];
refresh_TEXT_conj_wordform();
// console.log(['qwertyuiop', 'asdfghjkl']);
// console.log('finally:',set([1, 2, 3, 4, 3, 3, 4, 2, 1]));
refresh_LB_deconj_lemma();

function refresh_LB_deconj_lemma()
{
	var wordform = document.getElementById("input_wordform").value;
	var if_infer_stem_mf = !!document.getElementById("if_infer_mf").checked;
	var if_dict = !!document.getElementById("if_dict").checked;
	var if_bare_stem = !!document.getElementById("if_bare_stem").checked;
	var list_wordform = deconjugate (wordform, suffix_lists , if_infer_stem_mf, if_dict, if_bare_stem);
	console.log(if_infer_stem_mf, if_dict, if_bare_stem);
	console.log(list_wordform);
 	var innerHTML = '';
/*	for (i=0; i<list_wordform.length; i++) {
		innerHTML = innerHTML + '<option>' + list_wordform[i] +'</option>';
	} */
	if (list_wordform.length){
		innerHTML = '<span>' + list_wordform[0] + '</span>';
		for (i=1; i<list_wordform.length; i++) {
			innerHTML = innerHTML + '<br><span>' + list_wordform[i] + '</span>';
		}	
	}
	// console.log(innerHTML);
	document.getElementById("lemmas").innerHTML = innerHTML;
}
function keybind(event, object)
{
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==27){ // press Esc
		object.value = "";
	} // clear input
	else if(e && e.keyCode==13){ // press Enter
		if(object.id == "input_cell_pinyin"){
			document.getElementById("input_cell").value = pinyin2graph(object.value); // commit cell
		}
		else if(object.id == "input_lemma_pinyin"){
			document.getElementById("input_lemma").value = pinyin2graph(object.value); // commit lemma
		}
		else if(object.id == "input_wordform_pinyin"){
			document.getElementById("input_wordform").value = pinyin2graph(object.value); // commit wordform
		} // deconj
		
		if (object.id == "input_wordform_pinyin" || object.id == "input_wordform") {refresh_LB_deconj_lemma();} // deconj
		else {refresh_TEXT_conj_wordform();}
	} // conj
	else {
		if(object.id == "input_cell_pinyin"){
			document.getElementById("input_cell").value = pinyin2graph(object.value); // commit cell
		}
		else if(object.id == "input_lemma_pinyin"){
			document.getElementById("input_lemma").value = pinyin2graph(object.value); // commit lemma
		}
		else if(object.id == "input_wordform_pinyin"){
			document.getElementById("input_wordform").value = pinyin2graph(object.value); // commit wordform
		} // deconj		
	}
};
function refresh_TEXT_conj_wordform()
{
	var cell = document.getElementById("input_cell").value;
	var lemma = document.getElementById("input_lemma").value;
	var if_chn = document.getElementById("cb_chn").checked;
	document.getElementById("wordforms").innerHTML = conjugate_parad(lemma, cell, parad, if_chn);
	// console.log(lemma, cell, parad, if_chn);
}
function conjugate_parad(lemma, cell, parad, if_chn)
{
	var innerHTML = '';
	
		var __left0__ = conjugate(lemma, cell, if_chn);
		// console.log('lemma: ', lemma, cell, if_chn)
		// console.log('__left0__: ', __left0__)
		var wordform = __left0__[0];
		var highlight = __left0__[1];
		if(highlight)
		{
			innerHTML = '<span style="color:red;">' + wordform +'</span>';
		}
		else
		{
			innerHTML = wordform;
		}
		// console.log('innerHTML: ', innerHTML)
	for (var i=0; i < parad.length; i++)
	{
		var __left0__ = conjugate(lemma, parad[i], if_chn);
		var wordform = __left0__[0];
		var highlight = __left0__[1];
		if(highlight)
		{
			innerHTML += '<br><span style="color:red;">' + wordform +'</span>';
		}
		else
		{
			innerHTML += '<br>' + wordform;
		}		
		// console.log('innerHTML: ', innerHTML)
	}
	return innerHTML;
}
